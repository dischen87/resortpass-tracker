import { describe, expect, test } from 'bun:test';
import {
  getCrowdCalendar,
  getCrowdCalendarCacheHealth,
  normalizeCrowdCalendar,
} from './crowd-calendar';

const detailPayload = {
  success: true,
  data: {
    id: 31,
    name: 'Europa Park',
    timezone: 'Europe/Berlin',
    status: 'OPEN',
    hours: {
      date: '2026-07-18',
      openingTime: '2026-07-18T09:00:00+02:00',
      closingTime: '2026-07-18T23:59:00+02:00',
    },
    internalNote: 'must not leak',
  },
  meta: { generated: '2026-07-18T10:01:00Z', requestId: 'must-not-leak' },
};

const schedulePayload = {
  success: true,
  data: {
    schedule: [
      { date: '2026-07-17', openingTime: '2026-07-17T09:00:00+02:00', closingTime: '2026-07-17T18:00:00+02:00', type: 'OPERATING' },
      { date: '2026-07-18', openingTime: '2026-07-18T09:00:00+02:00', closingTime: '2026-07-18T19:00:00+02:00', type: 'OPERATING', extra: 'ignored' },
      { date: '2026-07-19', openingTime: 'invalid', closingTime: null, type: 'CLOSED' },
      { date: '2026-07-24', openingTime: '2026-07-24T09:00:00+02:00', closingTime: '2026-07-24T18:00:00+02:00', type: 'OPERATING' },
      { date: '2026-07-25', openingTime: null, closingTime: null, type: 'MAINTENANCE' },
    ],
  },
  meta: { generated: '2026-07-18T10:02:00Z', requestId: 'must-not-leak' },
};

const calendarPayload = {
  success: true,
  data: {
    days: [
      { date: '2026-07-17', crowdPercent: 88 },
      { date: '2026-07-18', crowdPercent: 0, providerOnly: 'ignored' },
      { date: '2026-07-19', crowdPercent: null },
      { date: '2026-07-20', crowdPercent: 100 },
      { date: '2026-07-21', crowdPercent: -1 },
      { date: '2026-07-22', crowdPercent: 101 },
      { date: '2026-07-23', crowdPercent: 42.6 },
    ],
  },
  meta: { generated: '2026-07-18T10:03:00Z', requestId: 'must-not-leak' },
};

function responseFor(url: string) {
  if (url.endsWith('/schedule')) return schedulePayload;
  if (url.endsWith('/calendar')) return calendarPayload;
  return detailPayload;
}

describe('crowd-calendar normalization', () => {
  test('joins crowds and opening hours without leaking raw fields', () => {
    const result = normalizeCrowdCalendar(
      detailPayload,
      schedulePayload,
      calendarPayload,
      new Date('2026-07-18T10:04:00Z'),
    );

    expect(result.updatedAt).toBe('2026-07-18T10:03:00.000Z');
    expect(result.park).toEqual({ name: 'Europa-Park', timezone: 'Europe/Berlin', status: 'open' });
    expect(result.days.map((day) => [day.date, day.crowdPercent])).toEqual([
      ['2026-07-18', 0],
      ['2026-07-19', null],
      ['2026-07-20', 100],
      ['2026-07-21', null],
      ['2026-07-22', null],
      ['2026-07-23', 43],
      ['2026-07-24', null],
      ['2026-07-25', null],
    ]);
    expect(result.days[0]).toEqual({
      date: '2026-07-18',
      crowdPercent: 0,
      openingTime: '2026-07-18T07:00:00.000Z',
      closingTime: '2026-07-18T21:59:00.000Z',
      isOpen: true,
    });
    expect(result.days[1]).toMatchObject({ openingTime: null, closingTime: null, isOpen: false });
    expect(result.days.at(-2)).toMatchObject({ date: '2026-07-24', crowdPercent: null, isOpen: true });
    expect(result.days.at(-1)).toMatchObject({ date: '2026-07-25', crowdPercent: null, isOpen: null });
    expect(JSON.stringify(result)).not.toContain('requestId');
    expect(JSON.stringify(result)).not.toContain('must not leak');
    expect(JSON.stringify(result)).not.toContain('providerOnly');
  });

  test('uses the Europe/Berlin calendar date when removing past days', () => {
    const result = normalizeCrowdCalendar(
      detailPayload,
      schedulePayload,
      calendarPayload,
      new Date('2026-07-18T22:30:00Z'),
    );
    expect(result.days[0]?.date).toBe('2026-07-19');
  });

  test('does not confuse the live off-hours status with an all-day park closure', () => {
    const result = normalizeCrowdCalendar(
      { ...detailPayload, data: { ...detailPayload.data, status: 'CLOSED' } },
      schedulePayload,
      calendarPayload,
      new Date('2026-07-18T04:00:00Z'),
    );

    expect(result.park.status).toBe('closed');
    expect(result.days[0]).toMatchObject({
      date: '2026-07-18',
      crowdPercent: 0,
      isOpen: true,
    });
  });

  test('coalesces parallel refreshes and serves cached data stale for at most 48 hours', async () => {
    const base = Date.parse('2026-07-18T10:04:00Z');
    let calls = 0;
    const successfulFetch = async (input: string | URL | Request, init?: RequestInit) => {
      calls += 1;
      expect(new Headers(init?.headers).get('x-api-key')).toBe('test-key');
      await Promise.resolve();
      return new Response(JSON.stringify(responseFor(String(input))));
    };

    const [first, parallel] = await Promise.all([
      getCrowdCalendar(successfulFetch, base, 'test-key'),
      getCrowdCalendar(successfulFetch, base, 'test-key'),
    ]);
    expect(first).toEqual(parallel);
    expect(first.stale).toBe(false);
    expect(calls).toBe(3);
    expect(getCrowdCalendarCacheHealth(base)).toMatchObject({ state: 'fresh', ageMinutes: 0 });
    expect(getCrowdCalendarCacheHealth(base + 2 * 60 * 60 * 1000)).toMatchObject({ state: 'stale' });

    const cached = await getCrowdCalendar(async () => { throw new Error('should not fetch'); }, base + 1, 'test-key');
    expect(cached).toBe(first);

    const failingFetch = async () => {
      calls += 1;
      return new Response('offline', { status: 503 });
    };
    const stale = await getCrowdCalendar(failingFetch, base + 60 * 60 * 1000 + 1, 'test-key');
    const staleAgain = await getCrowdCalendar(failingFetch, base + 61 * 60 * 1000, 'test-key');
    expect(stale.stale).toBe(true);
    expect(stale.days).toEqual(first.days);
    expect(staleAgain.stale).toBe(true);
    expect(calls).toBe(6);

    await expect(getCrowdCalendar(
      failingFetch,
      base + 48 * 60 * 60 * 1000 + 1,
      'test-key',
    )).rejects.toThrow('503');
    expect(getCrowdCalendarCacheHealth(base + 48 * 60 * 60 * 1000 + 1)).toMatchObject({ state: 'unavailable' });
  });

  test('refreshes across the Berlin date boundary and removes past days from stale fallback', async () => {
    const beforeMidnight = Date.parse('2026-07-31T21:30:00Z');
    const afterMidnight = Date.parse('2026-07-31T22:15:00Z');
    const payloadsForDate = (date: string) => ({
      detail: {
        ...detailPayload,
        data: {
          ...detailPayload.data,
          hours: {
            date,
            openingTime: `${date}T09:00:00+02:00`,
            closingTime: `${date}T19:00:00+02:00`,
          },
        },
      },
      schedule: {
        ...schedulePayload,
        data: {
          schedule: [{
            date,
            openingTime: `${date}T09:00:00+02:00`,
            closingTime: `${date}T19:00:00+02:00`,
            type: 'OPERATING',
          }],
        },
      },
      calendar: {
        ...calendarPayload,
        data: { days: [{ date, crowdPercent: 35 }] },
      },
    });
    let calls = 0;
    let fail = false;
    let activeDate = '2026-07-31';
    const fetcher = async (input: string | URL | Request) => {
      calls += 1;
      if (fail) return new Response('offline', { status: 503 });
      const payloads = payloadsForDate(activeDate);
      const url = String(input);
      const payload = url.endsWith('/schedule')
        ? payloads.schedule
        : url.endsWith('/calendar') ? payloads.calendar : payloads.detail;
      return new Response(JSON.stringify(payload));
    };

    const july = await getCrowdCalendar(fetcher, beforeMidnight, 'test-key');
    expect(july.days.map((day) => day.date)).toEqual(['2026-07-31']);
    expect(calls).toBe(3);

    fail = true;
    const stale = await getCrowdCalendar(fetcher, afterMidnight, 'test-key');
    expect(stale.stale).toBe(true);
    expect(stale.days).toEqual([]);
    expect(calls).toBe(6);
    expect(getCrowdCalendarCacheHealth(afterMidnight)).toMatchObject({ state: 'stale' });

    fail = false;
    activeDate = '2026-08-01';
    const august = await getCrowdCalendar(fetcher, afterMidnight + 6 * 60 * 1000, 'test-key');
    expect(august.stale).toBe(false);
    expect(august.days.map((day) => day.date)).toEqual(['2026-08-01']);
    expect(calls).toBe(9);
  });
});
