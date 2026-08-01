import { rides as rideInventory } from '../src/data/rides';

const PARK_QUEUE_TIMES_URL = 'https://api.parkqueuetimes.com/v1/parks/31/live';
const EUROPA_PARK_ID = 31;
const CACHE_TTL_MS = 5 * 60 * 1000;
const PROVIDER_STALE_MS = 15 * 60 * 1000;
const MAX_STALE_MS = 30 * 60 * 1000;

// ParkQueueTimes park 31 also contains Rulantica and resort attractions. The
// ride inventory in src/data/rides.ts is the single allowlist: a name absent
// there is never published, so water slides, pools and saunas cannot pollute
// the park summary. Keeping one list also means the statically rendered
// directory and this feed can never disagree.
const EUROPA_PARK_RIDE_LANDS: Readonly<Record<string, string>> = Object.fromEntries(
  rideInventory.map((ride) => [ride.providerName, ride.land]),
);

export interface WaitTimeRide {
  id: number;
  name: string;
  land: string;
  status: 'OPERATING' | 'DOWN' | 'CLOSED' | 'REFURBISHMENT';
  isOpen: boolean;
  waitTime: number | null;
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
    averageWait: number | null;
    longestWait: number | null;
  };
  source: {
    name: 'ParkQueueTimes.com';
    url: 'https://parkqueuetimes.com/';
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

function normalizeRide(value: unknown): WaitTimeRide | null {
  if (!isRecord(value)
    || typeof value.id !== 'number'
    || !Number.isInteger(value.id)
    || typeof value.name !== 'string'
    || value.name.trim().length === 0
    || !['OPERATING', 'DOWN', 'CLOSED', 'REFURBISHMENT'].includes(String(value.status))
    || (value.waitMinutes !== null && (typeof value.waitMinutes !== 'number'
      || !Number.isFinite(value.waitMinutes)
      || value.waitMinutes < 0
      || value.waitMinutes > 300))) return null;

  const name = value.name.trim();
  const land = EUROPA_PARK_RIDE_LANDS[name];
  if (!land) return null;

  const status = value.status as WaitTimeRide['status'];
  const isOpen = status === 'OPERATING';
  const waitTime = isOpen && typeof value.waitMinutes === 'number' ? Math.round(value.waitMinutes) : null;
  const lastUpdated = typeof value.lastUpdated === 'string' && Number.isFinite(Date.parse(value.lastUpdated))
    ? new Date(value.lastUpdated).toISOString()
    : null;

  return {
    id: value.id,
    name,
    land,
    status,
    isOpen,
    waitTime,
    lastUpdated,
  };
}

export function normalizeWaitTimes(payload: unknown, fetchedAt = new Date()): WaitTimesResponse {
  if (!isRecord(payload)
    || payload.success !== true
    || !isRecord(payload.data)
    || payload.data.parkId !== EUROPA_PARK_ID
    || !Array.isArray(payload.data.rides)) throw new Error('Invalid ParkQueueTimes response.');

  const rides = payload.data.rides.map(normalizeRide).filter((ride): ride is WaitTimeRide => ride !== null);
  if (payload.data.rides.length > 0 && rides.length === 0) {
    throw new Error('ParkQueueTimes returned no supported Europa-Park rides.');
  }

  rides.sort((a, b) => {
    if (a.isOpen !== b.isOpen) return a.isOpen ? -1 : 1;
    if (a.isOpen && a.waitTime !== b.waitTime) return (b.waitTime ?? -1) - (a.waitTime ?? -1);
    return a.name.localeCompare(b.name);
  });

  const openRides = rides.filter((ride) => ride.isOpen);
  const measuredRides = openRides.filter(
    (ride): ride is WaitTimeRide & { waitTime: number } => ride.waitTime !== null,
  );
  const updatedAt = isRecord(payload.meta)
    && typeof payload.meta.generated === 'string'
    && Number.isFinite(Date.parse(payload.meta.generated))
    ? new Date(payload.meta.generated).toISOString()
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
        : null,
      longestWait: measuredRides.length > 0 ? Math.max(...measuredRides.map((ride) => ride.waitTime)) : null,
    },
    source: {
      name: 'ParkQueueTimes.com',
      url: 'https://parkqueuetimes.com/',
    },
  };
}

export async function getWaitTimes(
  fetcher: Fetcher = fetch,
  now = Date.now(),
  apiKey = process.env.PARK_QUEUE_TIMES_API_KEY,
): Promise<WaitTimesResponse> {
  if (cached && now - cachedAt < CACHE_TTL_MS) return cached;
  if (lastFailure && now - lastAttemptAt < CACHE_TTL_MS) {
    if (cached && now - cachedAt <= MAX_STALE_MS) return { ...cached, stale: true };
    throw lastFailure;
  }

  if (!refreshInFlight) {
    lastAttemptAt = now;
    refreshInFlight = (async () => {
      if (!apiKey?.trim()) throw new Error('PARK_QUEUE_TIMES_API_KEY is not configured.');
      const response = await fetcher(PARK_QUEUE_TIMES_URL, {
        headers: {
          Accept: 'application/json',
          'x-api-key': apiKey.trim(),
          'User-Agent': 'ResortPass-Tracker/1.0 (+https://www.resortpass-europapark.ch)',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`ParkQueueTimes request failed with ${response.status}.`);

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
  const age = now - cachedAt;
  const state = age > MAX_STALE_MS
    ? 'unavailable' as const
    : cached.stale || age > CACHE_TTL_MS ? 'stale' as const : 'fresh' as const;
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
