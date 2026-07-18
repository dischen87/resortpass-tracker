import { describe, expect, test } from 'bun:test';
import { getWaitTimes, getWaitTimesCacheHealth, normalizeWaitTimes } from './wait-times';

const providerPayload = {
  success: true,
  data: {
    parkId: 31,
    rides: [
      { id: 1, name: 'blue fire Megacoaster', status: 'OPERATING', waitMinutes: 20, lastUpdated: '2026-07-18T10:00:00Z' },
      { id: 2, name: 'WODAN - Timburcoaster', status: 'OPERATING', waitMinutes: 40, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 3, name: 'Silver Star', status: 'DOWN', waitMinutes: null, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 4, name: 'Eurosat Coastiality', status: 'REFURBISHMENT', waitMinutes: null, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 5, name: 'ARTHUR', status: 'OPERATING', waitMinutes: 999, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 6, name: 'Whale Adventures - Northern Lights', status: 'OPERATING', waitMinutes: 0, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 7, name: 'Matterhorn-Blitz', status: 'CLOSED', waitMinutes: null, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 8, name: 'Euro-Tower', status: 'OPERATING', waitMinutes: null, lastUpdated: '2026-07-18T10:05:00Z' },
      { id: 9, name: 'Svalgur Rytt', status: 'OPERATING', waitMinutes: 25, lastUpdated: '2026-07-18T10:05:00Z' },
    ],
  },
  meta: {
    generated: '2026-07-18T10:05:30Z',
    attribution: 'Powered by ParkQueueTimes.com - https://parkqueuetimes.com',
  },
};

describe('wait-time normalization', () => {
  test('normalizes statuses, null waits and calculates the summary', () => {
    const result = normalizeWaitTimes(providerPayload, new Date('2026-07-18T10:06:00Z'));

    expect(result.rides.map((ride) => ride.name)).toEqual([
      'WODAN - Timburcoaster', 'blue fire Megacoaster', 'Whale Adventures - Northern Lights', 'Euro-Tower',
      'Eurosat Coastiality', 'Matterhorn-Blitz', 'Silver Star',
    ]);
    expect(result.summary).toEqual({ openRides: 4, closedRides: 3, averageWait: 20, longestWait: 40 });
    expect(result.updatedAt).toBe('2026-07-18T10:05:30.000Z');
    expect(result.source.name).toBe('ParkQueueTimes.com');
    expect(result.rides.find((ride) => ride.name === 'Whale Adventures - Northern Lights')?.waitTime).toBe(0);
    expect(result.rides.find((ride) => ride.name === 'Euro-Tower')?.waitTime).toBeNull();
    expect(result.rides.find((ride) => ride.name === 'Silver Star')?.status).toBe('DOWN');
    expect(result.rides.find((ride) => ride.name === 'blue fire Megacoaster')?.land).toBe('Iceland');
    expect(result.rides.some((ride) => ride.name === 'Svalgur Rytt')).toBe(false);
  });

  test('serves the last known result as stale when an upstream refresh fails', async () => {
    let calls = 0;
    const successfulFetch = async (input: string | URL | Request, init?: RequestInit) => {
      calls += 1;
      expect(String(input)).toBe('https://api.parkqueuetimes.com/v1/parks/31/live');
      expect(new Headers(init?.headers).get('x-api-key')).toBe('test-key');
      return new Response(JSON.stringify(providerPayload));
    };
    const first = await getWaitTimes(successfulFetch, 1000, 'test-key');
    const failingFetch = async () => {
      calls += 1;
      throw new Error('offline');
    };
    const stale = await getWaitTimes(failingFetch, 5 * 60 * 1000 + 1001, 'test-key');
    await getWaitTimes(failingFetch, 5 * 60 * 1000 + 2000, 'test-key');
    await getWaitTimes(failingFetch, 5 * 60 * 1000 + 3000, 'test-key');

    expect(first.stale).toBe(false);
    expect(stale.stale).toBe(true);
    expect(stale.rides).toEqual(first.rides);
    expect(calls).toBe(2);
    await expect(getWaitTimes(failingFetch, 30 * 60 * 1000 + 1002, 'test-key')).rejects.toThrow('offline');
    const oldProviderData = await getWaitTimes(successfulFetch, Date.parse('2026-07-18T11:00:00Z'), 'test-key');
    expect(oldProviderData.stale).toBe(true);
    expect(getWaitTimesCacheHealth(Date.parse('2026-07-18T11:30:00.001Z')).state).toBe('unavailable');
  });

  test('accepts a valid empty off-hours response and rejects the wrong park', () => {
    const empty = normalizeWaitTimes({ success: true, data: { parkId: 31, rides: [] } });
    expect(empty.rides).toEqual([]);
    expect(empty.summary.openRides).toBe(0);
    expect(empty.summary.averageWait).toBeNull();
    expect(empty.summary.longestWait).toBeNull();
    expect(() => normalizeWaitTimes({ success: true, data: { parkId: 2, rides: [] } })).toThrow('Invalid');
  });
});
