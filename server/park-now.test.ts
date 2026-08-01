import { describe, expect, test } from 'bun:test';
import {
  BULK_REFURBISHMENT_SHARE,
  buildParkNow,
  parkDate,
  refurbishmentShare,
  resolveDataQuality,
  resolveParkState,
} from './park-now';
import type { CrowdCalendarResponse } from './crowd-calendar';
import type { WaitTimeRide, WaitTimesResponse } from './wait-times';

function calendar(days: Array<Partial<CrowdCalendarResponse['days'][number]> & { date: string }>): CrowdCalendarResponse {
  return {
    updatedAt: '2026-08-01T07:00:00.000Z',
    fetchedAt: '2026-08-01T07:00:00.000Z',
    stale: false,
    park: { name: 'Europa-Park', timezone: 'Europe/Berlin', status: 'open' },
    days: days.map((day) => ({
      crowdPercent: 50,
      openingTime: `${day.date}T07:00:00.000Z`, // 09:00 Europe/Berlin in August
      closingTime: `${day.date}T16:00:00.000Z`, // 18:00 Europe/Berlin
      isOpen: true,
      ...day,
    })),
    source: { name: 'ParkQueueTimes.com', url: 'https://parkqueuetimes.com/' },
  } as CrowdCalendarResponse;
}

function ride(overrides: Partial<WaitTimeRide>): WaitTimeRide {
  return {
    id: 1,
    name: 'blue fire Megacoaster',
    land: 'Iceland',
    status: 'OPERATING',
    isOpen: true,
    waitTime: 20,
    lastUpdated: '2026-08-01T09:00:00.000Z',
    ...overrides,
  };
}

function waitTimes(rides: WaitTimeRide[], stale = false): WaitTimesResponse {
  return {
    updatedAt: '2026-08-01T09:00:00.000Z',
    fetchedAt: '2026-08-01T09:00:00.000Z',
    stale,
    rides,
    summary: { openRides: rides.length, closedRides: 0, averageWait: 20, longestWait: 40 },
    source: { name: 'ParkQueueTimes.com', url: 'https://parkqueuetimes.com/' },
  } as WaitTimesResponse;
}

describe('park date', () => {
  test('uses Europe/Berlin, not the server timezone', () => {
    // 22:30 UTC on 31 July is already 1 August in the park.
    expect(parkDate(new Date('2026-07-31T22:30:00.000Z'))).toBe('2026-08-01');
    // 00:30 UTC on 1 January is still 1 January in the park (CET = UTC+1).
    expect(parkDate(new Date('2026-01-01T00:30:00.000Z'))).toBe('2026-01-01');
    // 23:30 UTC on 31 December is already 1 January in the park.
    expect(parkDate(new Date('2026-12-31T23:30:00.000Z'))).toBe('2027-01-01');
  });
});

describe('park state', () => {
  const today = calendar([{ date: '2026-08-01' }, { date: '2026-08-02' }, { date: '2026-08-03' }]);

  test('OPEN between opening and closing time', () => {
    const result = resolveParkState(today, new Date('2026-08-01T09:14:00.000Z')); // 11:14 local
    expect(result.state).toBe('OPEN');
    expect(result.closesInMs).toBeGreaterThan(0);
    expect(result.opensInMs).toBeNull();
  });

  test('BEFORE_OPEN well before opening', () => {
    const result = resolveParkState(today, new Date('2026-08-01T04:00:00.000Z')); // 06:00 local
    expect(result.state).toBe('BEFORE_OPEN');
    expect(result.opensInMs).toBe(3 * 60 * 60 * 1000);
  });

  test('OPENING_SOON within 90 minutes — this is the 08:16 case from the audit', () => {
    const result = resolveParkState(today, new Date('2026-08-01T06:16:00.000Z')); // 08:16 local
    expect(result.state).toBe('OPENING_SOON');
    expect(result.opensInMs).toBe(44 * 60 * 1000);
  });

  test('exactly at the 90-minute boundary counts as OPENING_SOON', () => {
    const result = resolveParkState(today, new Date('2026-08-01T05:30:00.000Z'));
    expect(result.state).toBe('OPENING_SOON');
  });

  test('exactly at opening time is OPEN, not BEFORE_OPEN', () => {
    expect(resolveParkState(today, new Date('2026-08-01T07:00:00.000Z')).state).toBe('OPEN');
  });

  test('exactly at closing time is AFTER_CLOSE, not OPEN', () => {
    expect(resolveParkState(today, new Date('2026-08-01T16:00:00.000Z')).state).toBe('AFTER_CLOSE');
  });

  test('AFTER_CLOSE points at tomorrow', () => {
    const result = resolveParkState(today, new Date('2026-08-01T20:00:00.000Z'));
    expect(result.state).toBe('AFTER_CLOSE');
    expect(result.next?.date).toBe('2026-08-02');
  });

  test('CLOSED_TODAY when today is not an operating day but the season runs', () => {
    const mixed = calendar([
      { date: '2026-08-01', isOpen: false, openingTime: null, closingTime: null },
      { date: '2026-08-05' },
    ]);
    const result = resolveParkState(mixed, new Date('2026-08-01T09:00:00.000Z'));
    expect(result.state).toBe('CLOSED_TODAY');
    expect(result.next?.date).toBe('2026-08-05');
  });

  test('SEASON_BREAK when no operating day is known at all', () => {
    const closed = calendar([
      { date: '2026-08-01', isOpen: false, openingTime: null, closingTime: null },
      { date: '2026-08-02', isOpen: false, openingTime: null, closingTime: null },
    ]);
    const result = resolveParkState(closed, new Date('2026-08-01T09:00:00.000Z'));
    expect(result.state).toBe('SEASON_BREAK');
    expect(result.next).toBeNull();
  });

  test('a missing calendar never guesses an opening time', () => {
    const result = resolveParkState(null, new Date('2026-08-01T09:00:00.000Z'));
    expect(result.state).toBe('SEASON_BREAK');
    expect(result.opensInMs).toBeNull();
    expect(result.upcoming).toEqual([]);
  });

  test('a day flagged open without hours is not treated as an operating day', () => {
    const broken = calendar([{ date: '2026-08-01', isOpen: true, openingTime: null }]);
    expect(resolveParkState(broken, new Date('2026-08-01T09:00:00.000Z')).state).toBe('SEASON_BREAK');
  });

  test('upcoming lists at most seven operating days and never past ones', () => {
    const many = calendar(
      Array.from({ length: 12 }, (_, i) => ({ date: `2026-08-${String(i + 1).padStart(2, '0')}` })),
    );
    const result = resolveParkState(many, new Date('2026-08-03T09:00:00.000Z'));
    expect(result.upcoming).toHaveLength(7);
    expect(result.upcoming[0].date).toBe('2026-08-03');
  });
});

describe('bulk-refurbishment guard', () => {
  test('measures the share of maintenance reports', () => {
    expect(refurbishmentShare([])).toBe(0);
    expect(
      refurbishmentShare([ride({ status: 'REFURBISHMENT' }), ride({ status: 'OPERATING' })]),
    ).toBe(0.5);
  });

  test('a healthy open park stays fresh — 34 of 36 operating, as measured at 09:14', () => {
    const rides = [
      ...Array.from({ length: 34 }, (_, i) => ride({ id: i, status: 'OPERATING' })),
      ...Array.from({ length: 2 }, (_, i) => ride({ id: 100 + i, status: 'REFURBISHMENT' })),
    ];
    expect(resolveDataQuality(waitTimes(rides), 'OPEN')).toBe('fresh');
  });

  test('26 of 36 reported as maintenance is flagged unreliable, not rendered as fact', () => {
    const rides = [
      ...Array.from({ length: 26 }, (_, i) => ride({ id: i, status: 'REFURBISHMENT' })),
      ...Array.from({ length: 10 }, (_, i) => ride({ id: 100 + i, status: 'CLOSED' })),
    ];
    expect(refurbishmentShare(rides)).toBeGreaterThan(BULK_REFURBISHMENT_SHARE);
    expect(resolveDataQuality(waitTimes(rides), 'OPEN')).toBe('unreliable');
  });

  test('a stale but plausible feed is stale, not unreliable', () => {
    const rides = Array.from({ length: 20 }, (_, i) => ride({ id: i }));
    expect(resolveDataQuality(waitTimes(rides, true), 'OPEN')).toBe('stale');
  });

  test('outside opening hours the feed carries no meaning', () => {
    const rides = Array.from({ length: 36 }, (_, i) => ride({ id: i, status: 'REFURBISHMENT' }));
    for (const state of ['BEFORE_OPEN', 'OPENING_SOON', 'AFTER_CLOSE', 'CLOSED_TODAY', 'SEASON_BREAK'] as const) {
      expect(resolveDataQuality(waitTimes(rides), state)).toBe('unavailable');
    }
  });

  test('no payload at all is unavailable', () => {
    expect(resolveDataQuality(null, 'OPEN')).toBe('unavailable');
  });
});

describe('buildParkNow', () => {
  const today = calendar([{ date: '2026-08-01' }, { date: '2026-08-02' }]);

  test('drops the ride payload entirely when the park is closed', () => {
    const rides = Array.from({ length: 36 }, (_, i) => ride({ id: i, status: 'REFURBISHMENT' }));
    const result = buildParkNow(today, waitTimes(rides), new Date('2026-08-01T06:16:00.000Z'));
    expect(result.state).toBe('OPENING_SOON');
    expect(result.waitTimes).toBeNull();
    expect(result.dataQuality).toBe('unavailable');
  });

  test('serves the ride payload while the park is open', () => {
    const rides = Array.from({ length: 34 }, (_, i) => ride({ id: i }));
    const result = buildParkNow(today, waitTimes(rides), new Date('2026-08-01T09:14:00.000Z'));
    expect(result.state).toBe('OPEN');
    expect(result.waitTimes?.rides).toHaveLength(34);
    expect(result.dataQuality).toBe('fresh');
  });

  test('always names the provider, even with both caches empty', () => {
    const result = buildParkNow(null, null, new Date('2026-08-01T09:14:00.000Z'));
    expect(result.source.name).toBe('ParkQueueTimes.com');
    expect(result.state).toBe('SEASON_BREAK');
  });
});
