const QUEUE_TIMES_URL = 'https://queue-times.com/parks/51/queue_times.json';
const CACHE_TTL_MS = 5 * 60 * 1000;
const PROVIDER_STALE_MS = 15 * 60 * 1000;
const MAX_STALE_MS = 30 * 60 * 1000;

export interface WaitTimeRide {
  id: number;
  name: string;
  land: string;
  isOpen: boolean;
  waitTime: number;
  lastUpdated: string | null;
}

export interface WaitTimesResponse {
  updatedAt: string;
  fetchedAt: string;
  stale: boolean;
  rides: WaitTimeRide[];
  summary: {
    openRides: number;
    closedRides: number;
    averageWait: number;
    longestWait: number;
  };
  source: {
    name: 'Queue-Times.com';
    url: 'https://queue-times.com/';
  };
}

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

let cached: WaitTimesResponse | null = null;
let cachedAt = 0;
let refreshInFlight: Promise<WaitTimesResponse> | null = null;
let lastAttemptAt = 0;
let lastFailure: unknown = null;
let pollerStarted = false;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeRide(value: unknown, land: string): WaitTimeRide | null {
  if (!isRecord(value)
    || typeof value.id !== 'number'
    || !Number.isInteger(value.id)
    || typeof value.name !== 'string'
    || value.name.trim().length === 0
    || typeof value.is_open !== 'boolean'
    || typeof value.wait_time !== 'number'
    || !Number.isFinite(value.wait_time)
    || value.wait_time < 0
    || value.wait_time > 300) return null;
  if (value.name.toLowerCase().startsWith('virtualline:')) return null;

  const waitTime = Math.round(value.wait_time);
  const lastUpdated = typeof value.last_updated === 'string' && Number.isFinite(Date.parse(value.last_updated))
    ? new Date(value.last_updated).toISOString()
    : null;

  return {
    id: value.id,
    name: value.name.trim(),
    land,
    isOpen: value.is_open,
    waitTime,
    lastUpdated,
  };
}

export function normalizeWaitTimes(payload: unknown, fetchedAt = new Date()): WaitTimesResponse {
  if (!isRecord(payload)) throw new Error('Invalid Queue-Times response.');

  const rides: WaitTimeRide[] = [];
  if (Array.isArray(payload.lands)) {
    for (const landValue of payload.lands) {
      if (!isRecord(landValue) || typeof landValue.name !== 'string' || !Array.isArray(landValue.rides)) continue;
      for (const rideValue of landValue.rides) {
        const ride = normalizeRide(rideValue, landValue.name.trim());
        if (ride) rides.push(ride);
      }
    }
  }

  if (Array.isArray(payload.rides)) {
    for (const rideValue of payload.rides) {
      const ride = normalizeRide(rideValue, 'Europa-Park');
      if (ride) rides.push(ride);
    }
  }

  if (rides.length === 0) throw new Error('Queue-Times returned no rides.');

  rides.sort((a, b) => {
    if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1;
    if (a.isOpen && a.waitTime !== b.waitTime) return b.waitTime - a.waitTime;
    return a.name.localeCompare(b.name);
  });

  const openRides = rides.filter((ride) => ride.isOpen);
  const measuredRides = openRides.filter((ride) => ride.waitTime > 0);
  const lastUpdates = rides
    .map((ride) => ride.lastUpdated ? Date.parse(ride.lastUpdated) : Number.NaN)
    .filter(Number.isFinite);
  const updatedAt = lastUpdates.length > 0
    ? new Date(Math.max(...lastUpdates)).toISOString()
    : fetchedAt.toISOString();

  return {
    updatedAt,
    fetchedAt: fetchedAt.toISOString(),
    stale: false,
    rides,
    summary: {
      openRides: openRides.length,
      closedRides: rides.length - openRides.length,
      averageWait: measuredRides.length > 0
        ? Math.round(measuredRides.reduce((sum, ride) => sum + ride.waitTime, 0) / measuredRides.length)
        : 0,
      longestWait: openRides.length > 0 ? Math.max(...openRides.map((ride) => ride.waitTime)) : 0,
    },
    source: {
      name: 'Queue-Times.com',
      url: 'https://queue-times.com/',
    },
  };
}

export async function getWaitTimes(fetcher: Fetcher = fetch, now = Date.now()): Promise<WaitTimesResponse> {
  if (cached && now - cachedAt < CACHE_TTL_MS) return cached;
  if (lastFailure && now - lastAttemptAt < CACHE_TTL_MS) {
    if (cached && now - cachedAt <= MAX_STALE_MS) return { ...cached, stale: true };
    throw lastFailure;
  }

  if (!refreshInFlight) {
    lastAttemptAt = now;
    refreshInFlight = (async () => {
      const response = await fetcher(QUEUE_TIMES_URL, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'ResortPass-Tracker/1.0 (+https://www.resortpass-europapark.ch)',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Queue-Times request failed with ${response.status}.`);

      const normalized = normalizeWaitTimes(await response.json(), new Date(now));
      const providerAge = Math.max(0, now - Date.parse(normalized.updatedAt));
      const result = providerAge > PROVIDER_STALE_MS ? { ...normalized, stale: true } : normalized;
      cached = result;
      cachedAt = now;
      lastFailure = null;
      return result;
    })().finally(() => {
      refreshInFlight = null;
    });
  }

  try {
    return await refreshInFlight;
  } catch (error) {
    lastFailure = error;
    if (cached && now - cachedAt <= MAX_STALE_MS) return { ...cached, stale: true };
    throw error;
  }
}

export function getWaitTimesCacheHealth(now = Date.now()) {
  if (!cached) return { state: 'unavailable' as const, ageMinutes: null, updatedAt: null };
  const ageMinutes = Math.max(0, Math.floor((now - cachedAt) / 60000));
  const state = cached.stale
    ? 'stale' as const
    : now - cachedAt <= CACHE_TTL_MS
    ? 'fresh' as const
    : now - cachedAt <= MAX_STALE_MS ? 'stale' as const : 'unavailable' as const;
  return { state, ageMinutes, updatedAt: cached.updatedAt };
}

export function startWaitTimesPoller() {
  if (pollerStarted) return;
  pollerStarted = true;

  const refresh = () => {
    void getWaitTimes().catch((error) => console.error('Wait-times refresh failed:', error));
  };
  refresh();
  const timer = setInterval(refresh, CACHE_TTL_MS);
  timer.unref?.();
}
