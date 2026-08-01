import {
  getDb,
  logStatus,
  logHistory,
  getPreviousStatus,
  getConfirmedSubscribers,
  getLatestStatus,
  getHistoryStats,
  cleanupOldHistory,
} from './db';
import { localizedSiteUrl, sendAlertEmail } from './email';

const OVERVIEW_URL = 'https://tickets.mackinternational.de/de/resortpass/uebersicht';

const DETAIL_URLS = {
  silver: 'https://tickets.mackinternational.de/de/ticket/resortpass-silver',
  gold: 'https://tickets.mackinternational.de/de/ticket/resortpass-gold',
};

// Sold-out indicator on detail pages
const DETAIL_SOLD_OUT = 'Leider ist dieses Produkt derzeit nicht verfügbar';
// A buyable detail page exposes the product configurator's add-to-basket URL.
const DETAIL_AVAILABLE = '&quot;addToBasketUrl&quot;';

// Sold-out indicator on overview page
const OVERVIEW_SOLD_OUT = 'Derzeit nicht verfügbar';

// Bot-gate / JS-redirect pages are tiny and contain this marker.
const BOT_GATE_MARKER = 'document.location.href';
// Real shop pages must contain a product-related keyword to be trusted.
const REAL_SHOP_MARKER = 'mackinternational';
const MIN_REAL_PAGE_SIZE = 5000;

// Delay between first and confirmation check (ms)
const CONFIRM_DELAY_MS = 30_000;
const FETCH_TIMEOUT_MS = 15_000;

export type AvailabilityResult = 'sold_out' | 'available' | 'unknown';

const FETCH_HEADERS = {
  'User-Agent': 'ResortPassTracker/1.0 (Community Tool; resortpass-europapark.ch)',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
};

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`HTTP ${res.status} for ${url}`);
      return null;
    }
    if (!isTrustedShopUrl(res.url)) {
      console.error(`Unexpected final URL for ${url}: ${res.url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    return null;
  }
}

export function isTrustedShopUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname === 'tickets.mackinternational.de';
  } catch {
    return false;
  }
}

export function isRealShopPage(html: string): boolean {
  if (html.includes(BOT_GATE_MARKER)) return false;
  if (html.length < MIN_REAL_PAGE_SIZE) return false;
  if (!html.toLowerCase().includes(REAL_SHOP_MARKER)) return false;
  return true;
}

export function checkDetailPage(type: 'silver' | 'gold', html: string): AvailabilityResult {
  if (!isRealShopPage(html)) {
    const reason = html.includes(BOT_GATE_MARKER) ? 'bot-gate' : html.length < MIN_REAL_PAGE_SIZE ? 'too-small' : 'no-shop-marker';
    console.log(`[${type}] Detail page: not real shop content (${html.length} bytes, reason=${reason})`);
    return 'unknown';
  }

  if (html.includes(DETAIL_SOLD_OUT)) {
    return 'sold_out';
  }
  if (html.includes(DETAIL_AVAILABLE)) {
    return 'available';
  }
  console.log(`[${type}] Detail page has no explicit sold-out or buyable marker`);
  return 'unknown';
}

export function checkOverviewPage(type: 'silver' | 'gold', html: string): AvailabilityResult {
  if (!isRealShopPage(html)) {
    console.log(`[${type}] Overview page: not real shop content (${html.length} bytes)`);
    return 'unknown';
  }

  const productPath = `/de/ticket/resortpass-${type}`;
  let occurrence = html.indexOf(`href="${productPath}"`);
  let productCard: string | null = null;

  while (occurrence !== -1) {
    const articleStart = html.lastIndexOf('<article', occurrence);
    const articleEnd = html.indexOf('</article>', occurrence);
    if (articleStart !== -1 && articleEnd !== -1) {
      const article = html.slice(articleStart, articleEnd + '</article>'.length);
      const openingTag = article.slice(0, article.indexOf('>') + 1);
      if (openingTag.includes('is-teaser-type-product')) {
        productCard = article;
        break;
      }
    }
    occurrence = html.indexOf(`href="${productPath}"`, occurrence + 1);
  }

  if (!productCard || !productCard.toLowerCase().includes(type)) {
    console.log(`[${type}] Overview page does not contain the matching product card`);
    return 'unknown';
  }

  if (productCard.toLowerCase().includes(OVERVIEW_SOLD_OUT.toLowerCase())) {
    return 'sold_out';
  }
  return 'available';
}

export function resolveConfirmation(
  first: AvailabilityResult,
  confirmation?: AvailabilityResult,
): AvailabilityResult {
  if (first !== 'available') return first;
  return confirmation ?? 'unknown';
}

export function toAvailabilityValue(result: AvailabilityResult): boolean | null {
  if (result === 'unknown') return null;
  return result === 'available';
}

async function singleCheck(type: 'silver' | 'gold'): Promise<AvailabilityResult> {
  const detailHtml = await fetchPage(DETAIL_URLS[type]);
  if (detailHtml === null) return 'unknown';

  const detailResult = checkDetailPage(type, detailHtml);
  if (detailResult !== 'available') return detailResult;

  const overviewHtml = await fetchPage(OVERVIEW_URL);
  if (overviewHtml === null) {
    console.log(`[${type}] Overview fetch failed; result is unknown`);
    return 'unknown';
  }

  const overviewResult = checkOverviewPage(type, overviewHtml);
  if (overviewResult === 'unknown') {
    console.log(`[${type}] Overview not real content; result is unknown`);
  }
  return overviewResult;
}

async function checkAvailability(type: 'silver' | 'gold'): Promise<AvailabilityResult> {
  // First check
  const first = await singleCheck(type);
  if (first === 'unknown') {
    console.log(`[${type}] First check: unknown; preserving the previous status`);
    return first;
  }
  if (first === 'sold_out') {
    console.log(`[${type}] First check: sold out`);
    return first;
  }

  // First check says available -- do a confirmation check after a delay
  console.log(`[${type}] First check: available. Waiting ${CONFIRM_DELAY_MS / 1000}s for confirmation check...`);
  await new Promise((r) => setTimeout(r, CONFIRM_DELAY_MS));

  const second = await singleCheck(type);
  const result = resolveConfirmation(first, second);
  if (result === 'unknown') {
    console.log(`[${type}] Confirmation check: unknown; preserving the previous status`);
    return result;
  }
  if (result === 'sold_out') {
    console.log(`[${type}] Confirmation check: sold out (first was false positive)`);
    return result;
  }

  console.log(`[${type}] Available (confirmed by two consecutive checks)`);
  return result;
}

/** Concurrent sends. Kept low so the relay is never the thing that breaks. */
const ALERT_CONCURRENCY = Number(process.env.ALERT_CONCURRENCY || 3);
/** Pacing between messages on one worker; the pool removes the handshake cost. */
const ALERT_DELAY_MS = Number(process.env.ALERT_DELAY_MS || 150);
/** Set to 1 to exercise the whole path without sending anything. */
const ALERT_DRY_RUN = process.env.ALERT_DRY_RUN === '1';

/**
 * Fans the alert out to every confirmed subscriber.
 *
 * This used to be strictly sequential with a fixed 500 ms pause, on an
 * unpooled transport: 885 subscribers meant at least 442 seconds of pure
 * waiting before the last person heard anything, plus a full SMTP handshake
 * each. Worse, the checker awaits this call inside its polling loop, so the
 * next availability check could not run until the whole run finished — during
 * exactly the window where a sell-out is most likely.
 *
 * Returns a summary so the caller can log one line instead of one per address.
 */
export async function sendAlerts(passType: 'silver' | 'gold') {
  const subscribers = getConfirmedSubscribers(passType);
  const started = Date.now();
  console.log(
    `[${passType}] Sending alerts to ${subscribers.length} subscribers` +
      (ALERT_DRY_RUN ? ' (dry run — nothing will be sent)' : ''),
  );

  let sent = 0;
  const failed: string[] = [];
  let cursor = 0;

  const worker = async () => {
    while (cursor < subscribers.length) {
      const sub = subscribers[cursor++];
      try {
        const communityUrl = sub.community_token
          ? `${localizedSiteUrl(sub.lang, 'community/neu')}?token=${encodeURIComponent(sub.community_token)}`
          : undefined;
        if (!ALERT_DRY_RUN) {
          await sendAlertEmail(sub.email, passType, sub.unsubscribe_token, sub.lang, communityUrl);
        }
        sent += 1;
      } catch (err) {
        // One bad address must never stop the run — the remaining subscribers
        // are the whole point.
        failed.push(sub.email);
        console.error(`[${passType}] Failed to send to ${sub.email}:`, err);
      }
      if (ALERT_DELAY_MS > 0) await new Promise((r) => setTimeout(r, ALERT_DELAY_MS));
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(ALERT_CONCURRENCY, subscribers.length || 1) }, worker),
  );

  const seconds = Math.round((Date.now() - started) / 1000);
  console.log(
    `[${passType}] Alert run finished in ${seconds}s — ${sent} sent, ${failed.length} failed`,
  );
  if (failed.length > 0) {
    console.error(`[${passType}] Addresses that failed: ${failed.join(', ')}`);
  }
  return { total: subscribers.length, sent, failed: failed.length, seconds };
}

async function writeStatusJson() {
  const status = getLatestStatus();
  const statusJson = JSON.stringify(status, null, 2);
  const path = process.env.STATUS_JSON_PATH || './dist/api/status.json';

  await Bun.write(path, statusJson);
  console.log(`Status written to ${path}`);
}

async function writeHistoryStatsJson() {
  const stats = getHistoryStats();
  const statsJson = JSON.stringify(stats, null, 2);
  const statusPath = process.env.STATUS_JSON_PATH || './dist/api/status.json';
  const dir = statusPath.substring(0, statusPath.lastIndexOf('/'));
  const historyPath = `${dir}/history-stats.json`;

  await Bun.write(historyPath, statsJson);
  console.log(`History stats written to ${historyPath}`);
}

/**
 * Alert runs still in flight.
 *
 * The checker must not block on the mail run, but the process must not exit
 * while one is unfinished either — under systemd the unit would be torn down
 * mid-send.
 */
const pendingAlertRuns: Promise<unknown>[] = [];

async function run() {
  console.log(`[${new Date().toISOString()}] Starting availability check...`);

  // Initialize DB
  getDb();

  // Cleanup old history records (older than 5 years)
  cleanupOldHistory();
  console.log('Old history records cleaned up.');

  for (const type of ['silver', 'gold'] as const) {
    try {
      const result = await checkAvailability(type);
      const available = toAvailabilityValue(result);
      if (available === null) {
        console.warn(`[${type}] Check inconclusive; skipping status/history persistence and alerts.`);
        continue;
      }

      const previous = getPreviousStatus(type);

      console.log(`[${type}] Available: ${available} (was: ${previous})`);

      // Log current status and history
      logStatus(type, available);
      logHistory(type, available);

      // If status changed from unavailable to available, send alerts.
      //
      // Deliberately not awaited: the mail run takes minutes, and blocking here
      // would stall the next availability check during the one window where the
      // shop state changes fastest. Failures are logged inside sendAlerts.
      if (available && previous === false) {
        console.log(`[${type}] STATUS CHANGE: Now available! Sending alerts...`);
        pendingAlertRuns.push(
          sendAlerts(type).catch((err) => {
            console.error(`[${type}] Alert run crashed:`, err);
            return null;
          }),
        );
      }
    } catch (err) {
      console.error(`[${type}] Check failed:`, err);
    }
  }

  // Write status.json and history-stats.json
  await writeStatusJson();
  await writeHistoryStatsJson();

  // Drain any alert run before the process is allowed to finish, so a one-shot
  // invocation cannot exit halfway through the send.
  if (pendingAlertRuns.length > 0) {
    console.log(`Waiting for ${pendingAlertRuns.length} alert run(s) to finish…`);
    await Promise.all(pendingAlertRuns.splice(0));
  }

  console.log(`[${new Date().toISOString()}] Check complete.`);
}

if (import.meta.main) {
  run().catch((err) => {
    console.error('Checker failed:', err);
    process.exit(1);
  });
}
