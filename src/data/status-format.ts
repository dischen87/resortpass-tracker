import type { StatusContextCopy } from '../i18n/status-copy';

export type PassState = 'available' | 'sold_out' | 'unknown';

export interface PassSnapshot {
  state: PassState;
  /** Most recent confirmed check. It may be historical when state is unknown. */
  lastCheck: string | null;
}

export interface StatusSnapshot {
  silver: PassSnapshot;
  gold: PassSnapshot;
  /** When the current status request completed, not the historical check time. */
  capturedAt: string;
  live: boolean;
  fetchFailed?: boolean;
}

export interface StatusCopy extends StatusContextCopy {
  available: string;
  soldOut: string;
  unknown: string;
  error: string;
  lastCheck: string;
  refreshInterval: string;
}

/** SQLite timestamps from our API are UTC even when no offset is included. */
export function normalizeCheckTimestamp(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const normalized = value.trim().replace(' ', 'T');
  const timestamp = new Date(/[zZ]|[+-]\d\d:\d\d$/.test(normalized) ? normalized : `${normalized}Z`);
  return Number.isNaN(timestamp.getTime()) ? null : timestamp.toISOString();
}

export function normalizePassSnapshot(value: unknown, capturedAt: string): PassSnapshot {
  if (!value || typeof value !== 'object') return { state: 'unknown', lastCheck: null };
  const record = value as { state?: unknown; available?: unknown; lastCheck?: unknown; fresh?: unknown };
  const lastCheck = normalizeCheckTimestamp(record.lastCheck);
  const ageMinutes = lastCheck ? (Date.parse(capturedAt) - Date.parse(lastCheck)) / 60_000 : Infinity;
  // Match the API's 45-minute freshness window. Unknown is authoritative even
  // when a legacy `available` flag or a previous timestamp is also present.
  const fresh = record.fresh !== false && ageMinutes >= -5 && Math.round(Math.max(0, ageMinutes)) <= 45;
  if (!fresh || record.state === 'unknown') return { state: 'unknown', lastCheck };
  const state = record.state === 'available' || record.state === 'sold_out'
    ? record.state
    : record.state === undefined && typeof record.available === 'boolean'
      ? record.available ? 'available' : 'sold_out'
      : 'unknown';
  return { state, lastCheck };
}

export function createUnknownSnapshot(capturedAt: string, fetchFailed = false): StatusSnapshot {
  return {
    silver: { state: 'unknown', lastCheck: null },
    gold: { state: 'unknown', lastCheck: null },
    capturedAt, live: false, fetchFailed,
  };
}

export function snapshotFromPayload(payload: unknown, capturedAt: string): StatusSnapshot {
  const data = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  return {
    silver: normalizePassSnapshot(data.silver, capturedAt),
    gold: normalizePassSnapshot(data.gold, capturedAt),
    capturedAt, live: true, fetchFailed: false,
  };
}

export function formatStatusDate(value: string | null, localeTag: string): string | null {
  const normalized = normalizeCheckTimestamp(value);
  if (!normalized) return null;
  return new Date(normalized).toLocaleString(localeTag, {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Zurich', timeZoneName: 'short',
  });
}

export function formatPassLabel(pass: PassSnapshot, copy: StatusCopy): string {
  return pass.state === 'available' ? copy.available : pass.state === 'sold_out' ? copy.soldOut : copy.unknown;
}

export function formatPassCheck(pass: PassSnapshot, copy: StatusCopy, localeTag: string): string {
  const checked = pass.state !== 'unknown' ? formatStatusDate(pass.lastCheck, localeTag) : null;
  return checked ? `${copy.lastCheck}: ${checked}` : copy.currentUnknown;
}

export function formatStatusRequest(snapshot: StatusSnapshot, copy: StatusCopy, localeTag: string): string {
  const fetched = formatStatusDate(snapshot.capturedAt, localeTag);
  const parts = [fetched ? `${copy.fetchedAt}: ${fetched}` : null, snapshot.fetchFailed ? copy.error : null, copy.refreshInterval];
  return parts.filter(Boolean).join(' · ');
}

export function formatStatusDescription(snapshot: StatusSnapshot, copy: StatusCopy): string {
  return `ResortPass Silver: ${formatPassLabel(snapshot.silver, copy)} · ResortPass Gold: ${formatPassLabel(snapshot.gold, copy)} · ${copy.refreshInterval}`;
}

/** The same per-pass answer is used for visible copy and FAQ JSON-LD. */
export function formatStatusAnswer(snapshot: StatusSnapshot, copy: StatusCopy, localeTag: string): string {
  const answers = (['silver', 'gold'] as const).map((type) => {
    const pass = snapshot[type];
    const checked = pass.state !== 'unknown' ? formatStatusDate(pass.lastCheck, localeTag) : null;
    const detail = pass.state === 'unknown'
      ? ` (${copy.currentUnknown})`
      : checked ? ` (${copy.lastCheck}: ${checked})` : '';
    return `ResortPass ${type === 'silver' ? 'Silver' : 'Gold'}: ${formatPassLabel(pass, copy)}${detail}`;
  });
  if (snapshot.silver.state === 'unknown' || snapshot.gold.state === 'unknown') {
    const fetched = formatStatusDate(snapshot.capturedAt, localeTag);
    if (fetched) answers.push(`${copy.fetchedAt}: ${fetched}`);
  }
  if (snapshot.fetchFailed) answers.push(copy.error);
  return answers.join(' · ');
}

export function updateAvailabilityFaq(schema: Record<string, unknown>, answer: string): Record<string, unknown> {
  const questions = Array.isArray(schema.mainEntity) ? schema.mainEntity : [];
  return {
    ...schema,
    mainEntity: questions.map((question, index) => {
      if (index !== 1 || !question || typeof question !== 'object') return question;
      const entry = question as Record<string, unknown>;
      return { ...entry, acceptedAnswer: { '@type': 'Answer', text: answer } };
    }),
  };
}
