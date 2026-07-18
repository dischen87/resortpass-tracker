const PARK_URL = 'https://api.parkqueuetimes.com/v1/parks/31';
const SCHEDULE_URL = `${PARK_URL}/schedule`;
const CALENDAR_URL = `${PARK_URL}/calendar`;
const PARK_ID = 31;
const PARK_TIMEZONE = 'Europe/Berlin';
const CACHE_TTL_MS = 60 * 60 * 1000;
const RETRY_BACKOFF_MS = 5 * 60 * 1000;
const MAX_STALE_MS = 48 * 60 * 60 * 1000;

export interface CrowdCalendarDay {
  date: string;
  crowdPercent: number | null;
  openingTime: string | null;
  closingTime: string | null;
  isOpen: boolean | null;
}

export interface CrowdCalendarResponse {
  updatedAt: string;
  fetchedAt: string;
  stale: boolean;
  park: {
    name: 'Europa-Park';
    timezone: 'Europe/Berlin';
    status: 'open' | 'closed' | 'unknown';
  };
  days: CrowdCalendarDay[];
  source: {
    name: 'ParkQueueTimes.com';
    url: 'https://parkqueuetimes.com/';
  };
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

let cached: CrowdCalendarResponse | null = null;
let cachedAt = 0;
let refreshInFlight: Promise<CrowdCalendarResponse> | null = null;
let lastAttemptAt = 0;
let lastFailure: unknown = null;
let pollerStarted = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function validDate(value: unknown): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value ? value : null;
}

function isoDateTime(value: unknown): string | null {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) return null;
  return new Date(value).toISOString();
}

function berlinDate(at: Date): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: PARK_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(at);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function generatedAt(payload: unknown): number | null {
  if (!isRecord(payload) || !isRecord(payload.meta) || typeof payload.meta.generated !== 'string') return null;
  const timestamp = Date.parse(payload.meta.generated);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function normalizeCrowdCalendar(
  detailPayload: unknown,
  schedulePayload: unknown,
  calendarPayload: unknown,
  fetchedAt = new Date(),
): CrowdCalendarResponse {
  if (!isRecord(detailPayload)
    || detailPayload.success !== true
    || !isRecord(detailPayload.data)
    || detailPayload.data.id !== PARK_ID
    || detailPayload.data.timezone !== PARK_TIMEZONE
    || !isRecord(schedulePayload)
    || schedulePayload.success !== true
    || !isRecord(schedulePayload.data)
    || !Array.isArray(schedulePayload.data.schedule)
    || !isRecord(calendarPayload)
    || calendarPayload.success !== true
    || !isRecord(calendarPayload.data)
    || !Array.isArray(calendarPayload.data.days)) {
    throw new Error('Invalid ParkQueueTimes crowd-calendar response.');
  }

  const today = berlinDate(fetchedAt);
  const schedules = new Map<string, { openingTime: string | null; closingTime: string | null; isOpen: boolean | null }>();
  for (const value of schedulePayload.data.schedule) {
    if (!isRecord(value)) continue;
    const date = validDate(value.date);
    if (!date || date < today) continue;
    schedules.set(date, {
      openingTime: isoDateTime(value.openingTime),
      closingTime: isoDateTime(value.closingTime),
      isOpen: value.type === 'OPERATING' ? true : value.type === 'CLOSED' ? false : null,
    });
  }

  // The park-detail endpoint carries today's most current hours. Prefer those
  // over the broader monthly schedule when they are complete and date-aligned.
  if (isRecord(detailPayload.data.hours)) {
    const date = validDate(detailPayload.data.hours.date);
    const openingTime = isoDateTime(detailPayload.data.hours.openingTime);
    const closingTime = isoDateTime(detailPayload.data.hours.closingTime);
    if (date === today && openingTime && closingTime) {
      const scheduledDay = schedules.get(date);
      schedules.set(date, {
        openingTime,
        closingTime,
        // The detail status is live, so CLOSED before opening or after closing
        // must not turn a scheduled operating day into an all-day closure.
        isOpen: detailPayload.data.status === 'OPEN' ? true : scheduledDay?.isOpen ?? true,
      });
    }
  }

  const crowds = new Map<string, number | null>();
  for (const value of calendarPayload.data.days) {
    if (!isRecord(value)) continue;
    const date = validDate(value.date);
    if (!date || date < today) continue;
    const crowdPercent = value.crowdPercent;
    crowds.set(date, typeof crowdPercent === 'number'
      && Number.isFinite(crowdPercent)
      && crowdPercent >= 0
      && crowdPercent <= 100
      ? Math.round(crowdPercent)
      : null);
  }

  const dates = [...new Set([...crowds.keys(), ...schedules.keys()])].sort();
  const timestamps = [detailPayload, schedulePayload, calendarPayload]
    .map(generatedAt)
    .filter((value): value is number => value !== null);
  const status = detailPayload.data.status === 'OPEN'
    ? 'open'
    : detailPayload.data.status === 'CLOSED' ? 'closed' : 'unknown';

  return {
    updatedAt: new Date(timestamps.length ? Math.max(...timestamps) : fetchedAt.getTime()).toISOString(),
    fetchedAt: fetchedAt.toISOString(),
    stale: false,
    park: { name: 'Europa-Park', timezone: PARK_TIMEZONE, status },
    days: dates.map((date) => {
      const schedule = schedules.get(date);
      return {
        date,
        crowdPercent: crowds.get(date) ?? null,
        openingTime: schedule?.openingTime ?? null,
        closingTime: schedule?.closingTime ?? null,
        isOpen: schedule?.isOpen ?? null,
      };
    }),
    source: { name: 'ParkQueueTimes.com', url: 'https://parkqueuetimes.com/' },
  };
}

async function fetchPayload(fetcher: Fetcher, url: string, apiKey: string, signal: AbortSignal) {
  const response = await fetcher(url, {
    headers: {
      Accept: 'application/json',
      'x-api-key': apiKey,
      'User-Agent': 'ResortPass-Tracker/1.0 (+https://www.resortpass-europapark.ch)',
    },
    signal,
  });
  if (!response.ok) throw new Error(`ParkQueueTimes request failed with ${response.status}.`);
  return response.json();
}

export async function getCrowdCalendar(
  fetcher: Fetcher = fetch,
  now = Date.now(),
  apiKey = process.env.PARK_QUEUE_TIMES_API_KEY,
): Promise<CrowdCalendarResponse> {
  const today = berlinDate(new Date(now));
  const cacheIsFromToday = cached && berlinDate(new Date(cachedAt)) === today;
  const staleForToday = () => cached && ({
    ...cached,
    stale: true,
    days: cached.days.filter((day) => day.date >= today),
  });

  if (cached && cacheIsFromToday && now - cachedAt < CACHE_TTL_MS) return cached;
  if (lastFailure && now - lastAttemptAt < RETRY_BACKOFF_MS) {
    if (cached && now - cachedAt <= MAX_STALE_MS) return staleForToday()!;
    throw lastFailure;
  }

  if (!refreshInFlight) {
    lastAttemptAt = now;
    refreshInFlight = (async () => {
      if (!apiKey?.trim()) throw new Error('PARK_QUEUE_TIMES_API_KEY is not configured.');
      const signal = AbortSignal.timeout(8000);
      const headersKey = apiKey.trim();
      const [detail, schedule, calendar] = await Promise.all([
        fetchPayload(fetcher, PARK_URL, headersKey, signal),
        fetchPayload(fetcher, SCHEDULE_URL, headersKey, signal),
        fetchPayload(fetcher, CALENDAR_URL, headersKey, signal),
      ]);
      const normalized = normalizeCrowdCalendar(detail, schedule, calendar, new Date(now));
      cached = normalized;
      cachedAt = now;
      lastFailure = null;
      return normalized;
    })().finally(() => {
      refreshInFlight = null;
    });
  }

  try {
    return await refreshInFlight;
  } catch (error) {
    lastFailure = error;
    if (cached && now - cachedAt <= MAX_STALE_MS) return staleForToday()!;
    throw error;
  }
}

export function getCrowdCalendarCacheHealth(now = Date.now()) {
  if (!cached) return { state: 'unavailable' as const, ageMinutes: null, updatedAt: null };
  const age = Math.max(0, now - cachedAt);
  const ageMinutes = Math.floor(age / 60000);
  const crossedBerlinDate = berlinDate(new Date(cachedAt)) !== berlinDate(new Date(now));
  const state = age > MAX_STALE_MS
    ? 'unavailable' as const
    : cached.stale || crossedBerlinDate || age > CACHE_TTL_MS ? 'stale' as const : 'fresh' as const;
  return { state, ageMinutes, updatedAt: cached.updatedAt };
}

export function startCrowdCalendarPoller() {
  if (pollerStarted) return;
  pollerStarted = true;

  const refresh = () => {
    void getCrowdCalendar().catch((error) => console.error('Crowd-calendar refresh failed:', error));
  };
  refresh();
  const timer = setInterval(refresh, CACHE_TTL_MS);
  timer.unref?.();
}
