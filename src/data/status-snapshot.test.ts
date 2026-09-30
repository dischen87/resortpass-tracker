import { expect, test } from 'bun:test';
import { COMMITTED_STATUS, normalizeCheckTimestamp, resolveBuildTimeStatus } from './status-snapshot';

test('build timestamps preserve the API UTC instant regardless of host timezone', () => {
  expect(normalizeCheckTimestamp('2026-09-30 12:16:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('2026-09-30T12:16:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('2026-09-30T14:16:00+02:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('invalid')).toBeNull();
  expect(normalizeCheckTimestamp(null)).toBeNull();
});

const capturedAt = '2026-09-30T12:30:00.000Z';
const now = () => new Date(capturedAt);

test('explicit unknown API results remain current unknown rather than historical sold out', async () => {
  const fetcher = (async () => Response.json({
    silver: { state: 'unknown', available: false, lastCheck: COMMITTED_STATUS.silver.lastCheck, fresh: false },
    gold: { state: 'unknown', available: false, lastCheck: COMMITTED_STATUS.gold.lastCheck, fresh: false },
  })) as unknown as typeof fetch;
  const snapshot = await resolveBuildTimeStatus({ fetcher, now });
  expect(snapshot.silver.state).toBe('unknown');
  expect(snapshot.gold.state).toBe('unknown');
  expect(snapshot.capturedAt).toBe(capturedAt);
  expect(snapshot.live).toBe(true);
  expect(snapshot.fetchFailed).toBe(false);
});

test('failed fetch and offline builds never present a committed state as current', async () => {
  for (const fetcher of [
    async () => { throw new Error('Network unavailable'); },
    async () => new Response('', { status: 503 }),
    async () => new Response('{ invalid json'),
  ]) {
    const snapshot = await resolveBuildTimeStatus({ fetcher: fetcher as unknown as typeof fetch, now });
    expect(snapshot.silver).toEqual({ state: 'unknown', lastCheck: null });
    expect(snapshot.gold).toEqual({ state: 'unknown', lastCheck: null });
    expect(snapshot.capturedAt).toBe(capturedAt);
    expect(snapshot.fetchFailed).toBe(true);
  }
  let called = false;
  const snapshot = await resolveBuildTimeStatus({ offline: true, now, fetcher: (async () => { called = true; throw new Error(); }) as unknown as typeof fetch });
  expect(called).toBe(false);
  expect(snapshot.silver.state).toBe('unknown');
  expect(snapshot.gold.state).toBe('unknown');
});
