import { describe, expect, test } from 'bun:test';
import { getWaitTimes, normalizeWaitTimes } from './wait-times';

const providerPayload = {
  lands: [
    {
      name: 'Iceland',
      rides: [
        { id: 1, name: 'blue fire', is_open: true, wait_time: 20, last_updated: '2026-07-18T10:00:00Z' },
        { id: 2, name: 'WODAN', is_open: true, wait_time: 40, last_updated: '2026-07-18T10:05:00Z' },
        { id: 3, name: 'VirtualLine: WODAN', is_open: false, wait_time: 0, last_updated: '2026-07-18T10:05:00Z' },
        { id: 5, name: 'Malformed ride', wait_time: 999, last_updated: '2026-07-18T10:05:00Z' },
        { id: 6, name: 'Coastiality', is_open: true, wait_time: 0, last_updated: '2026-07-18T10:05:00Z' },
      ],
    },
    {
      name: 'Switzerland',
      rides: [{ id: 4, name: 'Matterhorn-Blitz', is_open: false, wait_time: 0, last_updated: '2026-07-18T10:05:00Z' }],
    },
  ],
  rides: [],
};

describe('wait-time normalization', () => {
  test('filters VirtualLine entries, sorts useful results and calculates the summary', () => {
    const result = normalizeWaitTimes(providerPayload, new Date('2026-07-18T10:06:00Z'));

    expect(result.rides.map((ride) => ride.name)).toEqual(['WODAN', 'blue fire', 'Coastiality', 'Matterhorn-Blitz']);
    expect(result.summary).toEqual({ openRides: 3, closedRides: 1, averageWait: 30, longestWait: 40 });
    expect(result.updatedAt).toBe('2026-07-18T10:05:00.000Z');
  });

  test('serves the last known result as stale when an upstream refresh fails', async () => {
    let calls = 0;
    const successfulFetch = async () => {
      calls += 1;
      return new Response(JSON.stringify(providerPayload));
    };
    const first = await getWaitTimes(successfulFetch, 1000);
    const failingFetch = async () => {
      calls += 1;
      throw new Error('offline');
    };
    const stale = await getWaitTimes(failingFetch, 5 * 60 * 1000 + 1001);
    await getWaitTimes(failingFetch, 5 * 60 * 1000 + 2000);
    await getWaitTimes(failingFetch, 5 * 60 * 1000 + 3000);

    expect(first.stale).toBe(false);
    expect(stale.stale).toBe(true);
    expect(stale.rides).toEqual(first.rides);
    expect(calls).toBe(2);
    await expect(getWaitTimes(failingFetch, 30 * 60 * 1000 + 1002)).rejects.toThrow('offline');
    const oldProviderData = await getWaitTimes(successfulFetch, Date.parse('2026-07-18T11:00:00Z'));
    expect(oldProviderData.stale).toBe(true);
  });

  test('rejects empty payloads', () => {
    expect(() => normalizeWaitTimes({ lands: [], rides: [] })).toThrow('no rides');
  });
});
