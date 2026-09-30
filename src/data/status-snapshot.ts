import { createUnknownSnapshot, snapshotFromPayload, type StatusSnapshot } from './status-format';
export { normalizeCheckTimestamp } from './status-format';
export type { PassState, PassSnapshot, StatusSnapshot } from './status-format';

/**
 * The last known ResortPass state, committed to the repository.
 *
 * Every availability branch used to sit in the HTML at once, hidden by CSS
 * classes, with JavaScript picking one at runtime. That meant the served markup
 * contained the sentence "Jetzt verfügbar! Jetzt kaufen" with a live shop link
 * on a day when nothing was for sale, while the only static answer — a frozen
 * "Nein." in the FAQ markup — could contradict reality on the one day that
 * matters. Crawlers and answer engines, which do not run JavaScript, saw both.
 *
 * Historical record only. It is never used as a fallback for current
 * availability; an inconclusive current check remains unknown.
 */
export const COMMITTED_STATUS: StatusSnapshot = {
  silver: { state: 'sold_out', lastCheck: '2026-08-01T07:46:00.000Z' },
  gold: { state: 'sold_out', lastCheck: '2026-08-01T07:46:00.000Z' },
  capturedAt: '2026-08-01T07:46:00.000Z',
  live: false,
};

interface BuildStatusOptions {
  endpoint?: string;
  offline?: boolean;
  fetcher?: typeof fetch;
  now?: () => Date;
}

/** A failed or inconclusive current check is unknown, never yesterday's state. */
export async function resolveBuildTimeStatus(options: BuildStatusOptions = {}): Promise<StatusSnapshot> {
  const now = options.now ?? (() => new Date());
  if (options.offline) return createUnknownSnapshot(now().toISOString());
  try {
    const response = await (options.fetcher ?? fetch)(options.endpoint ?? 'https://www.resortpass-europapark.ch/api/status', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return snapshotFromPayload(await response.json(), now().toISOString());
  } catch {
    return createUnknownSnapshot(now().toISOString(), true);
  }
}

let cached: Promise<StatusSnapshot> | null = null;

/** Resolve once per build so every language and component shares one request. */
export function getBuildTimeStatus(): Promise<StatusSnapshot> {
  return cached ??= resolveBuildTimeStatus({
    endpoint: process.env.BUILD_STATUS_URL,
    offline: process.env.BUILD_STATUS_OFFLINE === '1',
  });
}
