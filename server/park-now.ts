import type { CrowdCalendarDay, CrowdCalendarResponse } from './crowd-calendar';
import type { WaitTimesResponse, WaitTimeRide } from './wait-times';

/**
 * The park's operating state, decided server-side from the schedule.
 *
 * The wait-times page used to infer everything from the wait-time feed alone,
 * which cannot tell "nobody is queueing at 03:00" apart from "the provider is
 * down". Europa-Park is closed for roughly 15 of 24 hours plus the winter
 * break, so that ambiguity covers most of the year.
 *
 * The state always comes from the schedule, never from the ride list.
 */
export type ParkState =
  | 'SEASON_BREAK' // no operating day anywhere in the known window
  | 'CLOSED_TODAY' // season is running but today is not an operating day
  | 'BEFORE_OPEN' // operating day, before opening time
  | 'OPENING_SOON' // BEFORE_OPEN and within OPENING_SOON_MS
  | 'OPEN'
  | 'AFTER_CLOSE';

/**
 * How far we trust the wait-time payload. Kept separate from `ParkState`
 * because a stale feed during opening hours and a closed park are different
 * problems with different copy.
 */
export type DataQuality =
  | 'fresh'
  | 'stale' // provider data ageing but still shown
  | 'unreliable' // implausible in aggregate, see bulk-refurbishment guard
  | 'unavailable'; // no usable payload at all

export const OPENING_SOON_MS = 90 * 60 * 1000;

/**
 * Above this share of "under maintenance" we stop believing the feed.
 *
 * On 2026-08-01 at 08:16, with the park closed, the provider reported 26 of 36
 * rides as REFURBISHMENT — including Silver Star and Pirates in Batavia. At
 * 09:14 the same rides were operating. Rendering that as "under maintenance"
 * turns a provider artefact into a false factual claim about the park.
 */
export const BULK_REFURBISHMENT_SHARE = 0.6;

export interface ParkDaySchedule {
  date: string;
  openingTime: string | null;
  closingTime: string | null;
  crowdPercent: number | null;
}

export interface ParkNowResponse {
  state: ParkState;
  dataQuality: DataQuality;
  now: string;
  /** Milliseconds until the park opens. Only set for BEFORE_OPEN/OPENING_SOON. */
  opensInMs: number | null;
  /** Milliseconds until the park closes. Only set for OPEN. */
  closesInMs: number | null;
  today: ParkDaySchedule | null;
  next: ParkDaySchedule | null;
  upcoming: ParkDaySchedule[];
  /** Only present when the park is open and the feed is usable. */
  waitTimes: WaitTimesResponse | null;
  source: { name: string; url: string };
}

function toDay(day: CrowdCalendarDay): ParkDaySchedule {
  return {
    date: day.date,
    openingTime: day.openingTime,
    closingTime: day.closingTime,
    crowdPercent: day.crowdPercent,
  };
}

/** Calendar date in the park's timezone, not the server's. */
export function parkDate(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function timestamp(value: string | null): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * A day counts as an operating day only if the source says so *and* publishes
 * an opening time. A day flagged open without hours cannot drive a countdown
 * and would produce "opens at Invalid Date".
 */
function isOperatingDay(day: CrowdCalendarDay): boolean {
  return day.isOpen === true && Boolean(day.openingTime);
}

export function resolveParkState(
  calendar: CrowdCalendarResponse | null,
  now: Date,
): {
  state: ParkState;
  today: ParkDaySchedule | null;
  next: ParkDaySchedule | null;
  upcoming: ParkDaySchedule[];
  opensInMs: number | null;
  closesInMs: number | null;
} {
  const nowMs = now.getTime();
  const todayKey = parkDate(now);
  const days = calendar?.days ?? [];

  const operating = days.filter(isOperatingDay);
  const upcoming = operating
    .filter((day) => day.date >= todayKey)
    .slice(0, 7)
    .map(toDay);

  const todayRaw = days.find((day) => day.date === todayKey) ?? null;
  const today = todayRaw ? toDay(todayRaw) : null;

  // Without a schedule we must not guess. Callers render the directory and say
  // the forecast is unavailable rather than inventing an opening time.
  if (operating.length === 0) {
    return {
      state: 'SEASON_BREAK',
      today,
      next: null,
      upcoming: [],
      opensInMs: null,
      closesInMs: null,
    };
  }

  const nextOperating = operating.find((day) => {
    if (day.date > todayKey) return true;
    if (day.date < todayKey) return false;
    const opens = timestamp(day.openingTime);
    return opens !== null && opens > nowMs;
  });
  const next = nextOperating ? toDay(nextOperating) : null;

  if (!todayRaw || !isOperatingDay(todayRaw)) {
    return {
      state: next ? 'CLOSED_TODAY' : 'SEASON_BREAK',
      today,
      next,
      upcoming,
      opensInMs: null,
      closesInMs: null,
    };
  }

  const opens = timestamp(todayRaw.openingTime);
  const closes = timestamp(todayRaw.closingTime);

  if (opens !== null && nowMs < opens) {
    const opensInMs = opens - nowMs;
    return {
      state: opensInMs <= OPENING_SOON_MS ? 'OPENING_SOON' : 'BEFORE_OPEN',
      today,
      next: today,
      upcoming,
      opensInMs,
      closesInMs: null,
    };
  }

  if (closes !== null && nowMs >= closes) {
    // The park is done for today; `next` already points at the following day.
    return { state: 'AFTER_CLOSE', today, next, upcoming, opensInMs: null, closesInMs: null };
  }

  return {
    state: 'OPEN',
    today,
    next,
    upcoming,
    opensInMs: null,
    closesInMs: closes !== null ? closes - nowMs : null,
  };
}

/** Share of the feed reporting maintenance. Empty feed counts as zero. */
export function refurbishmentShare(rides: readonly WaitTimeRide[]): number {
  if (rides.length === 0) return 0;
  return rides.filter((ride) => ride.status === 'REFURBISHMENT').length / rides.length;
}

export function resolveDataQuality(
  waitTimes: WaitTimesResponse | null,
  state: ParkState,
): DataQuality {
  if (!waitTimes) return 'unavailable';
  // Outside opening hours the feed carries no meaning, so its freshness is not
  // a question we ask. Callers drop the payload entirely.
  if (state !== 'OPEN') return 'unavailable';
  if (refurbishmentShare(waitTimes.rides) > BULK_REFURBISHMENT_SHARE) return 'unreliable';
  return waitTimes.stale ? 'stale' : 'fresh';
}

/**
 * Combines both provider caches into the single state the page renders from.
 *
 * `waitTimes` is deliberately nulled outside opening hours: a per-ride status
 * is only a statement about the ride while the park is running. When the feed
 * is implausible the rides are kept but the quality flag tells the UI to show
 * the directory without per-ride causes.
 */
export function buildParkNow(
  calendar: CrowdCalendarResponse | null,
  waitTimes: WaitTimesResponse | null,
  now: Date = new Date(),
): ParkNowResponse {
  const schedule = resolveParkState(calendar, now);
  const dataQuality = resolveDataQuality(waitTimes, schedule.state);
  const usableWaitTimes = schedule.state === 'OPEN' && waitTimes ? waitTimes : null;

  return {
    state: schedule.state,
    dataQuality,
    now: now.toISOString(),
    opensInMs: schedule.opensInMs,
    closesInMs: schedule.closesInMs,
    today: schedule.today,
    next: schedule.next,
    upcoming: schedule.upcoming,
    waitTimes: usableWaitTimes,
    source: waitTimes?.source ??
      calendar?.source ?? { name: 'ParkQueueTimes.com', url: 'https://parkqueuetimes.com' },
  };
}
