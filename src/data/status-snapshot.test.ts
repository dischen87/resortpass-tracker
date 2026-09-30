import { expect, test } from 'bun:test';
import { normalizeCheckTimestamp } from './status-snapshot';

test('build timestamps preserve the API UTC instant regardless of host timezone', () => {
  expect(normalizeCheckTimestamp('2026-09-30 12:16:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('2026-09-30T12:16:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('2026-09-30T14:16:00+02:00')).toBe('2026-09-30T12:16:00.000Z');
  expect(normalizeCheckTimestamp('invalid')).toBeNull();
  expect(normalizeCheckTimestamp(null)).toBeNull();
});
