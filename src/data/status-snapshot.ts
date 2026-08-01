export type PassState = 'available' | 'sold_out' | 'unknown';

export interface PassSnapshot {
  state: PassState;
  lastCheck: string | null;
}

export interface StatusSnapshot {
  silver: PassSnapshot;
  gold: PassSnapshot;
  /** When this snapshot was taken. Rendered visibly so nothing looks live that isn't. */
  capturedAt: string;
  /** True when the build reached the live API; false when the committed value was used. */
  live: boolean;
}

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
 * Now exactly one branch is rendered, chosen at build time. This constant is
 * the floor: if the build cannot reach the API, the page still states a real,
 * dated position instead of "checking…".
 *
 * Update it whenever the state genuinely changes. `scripts/verify-live.ts`
 * warns when it drifts from production.
 */
export const COMMITTED_STATUS: StatusSnapshot = {
  silver: { state: 'sold_out', lastCheck: '2026-08-01T07:46:00.000Z' },
  gold: { state: 'sold_out', lastCheck: '2026-08-01T07:46:00.000Z' },
  capturedAt: '2026-08-01T07:46:00.000Z',
  live: false,
};

const STATUS_ENDPOINT =
  process.env.BUILD_STATUS_URL || 'https://www.resortpass-europapark.ch/api/status';

function coerce(value: unknown): PassSnapshot {
  if (!value || typeof value !== 'object') return { state: 'unknown', lastCheck: null };
  const record = value as { state?: unknown; lastCheck?: unknown };
  const state = record.state === 'available' || record.state === 'sold_out' ? record.state : 'unknown';
  const lastCheck = typeof record.lastCheck === 'string' ? record.lastCheck : null;
  return { state, lastCheck };
}

let cached: Promise<StatusSnapshot> | null = null;

/**
 * Resolves the status to render into the HTML.
 *
 * Deliberately forgiving: a build must never fail, and must never hang, because
 * a status endpoint is slow. Two seconds, then the committed value. Resolved
 * once per build and shared across all 324 pages.
 */
export function getBuildTimeStatus(): Promise<StatusSnapshot> {
  if (cached) return cached;

  cached = (async (): Promise<StatusSnapshot> => {
    if (process.env.BUILD_STATUS_OFFLINE === '1') return COMMITTED_STATUS;
    try {
      const response = await fetch(STATUS_ENDPOINT, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(2000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = (await response.json()) as Record<string, unknown>;
      const silver = coerce(payload.silver);
      const gold = coerce(payload.gold);
      // An endpoint that answers "unknown" for both tells us nothing the
      // committed value does not already say, and it is worse: it would render
      // "checking…" into the static HTML, which is what we set out to remove.
      if (silver.state === 'unknown' && gold.state === 'unknown') return COMMITTED_STATUS;
      return {
        silver,
        gold,
        capturedAt: silver.lastCheck || gold.lastCheck || new Date().toISOString(),
        live: true,
      };
    } catch {
      return COMMITTED_STATUS;
    }
  })();

  return cached;
}
