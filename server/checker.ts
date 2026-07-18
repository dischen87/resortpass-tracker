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

async function sendAlerts(passType: 'silver' | 'gold') {
  const subscribers = getConfirmedSubscribers(passType);
  console.log(`[${passType}] Sending alerts to ${subscribers.length} subscribers`);

  for (const sub of subscribers) {
    try {
      const communityUrl = sub.community_token
        ? `${localizedSiteUrl(sub.lang, 'community/neu')}?token=${encodeURIComponent(sub.community_token)}`
        : undefined;
      await sendAlertEmail(sub.email, passType, sub.unsubscribe_token, sub.lang, communityUrl);
      console.log(`[${passType}] Alert sent to ${sub.email}`);
    } catch (err) {
      console.error(`[${passType}] Failed to send to ${sub.email}:`, err);
    }
    // Small delay between emails to avoid overwhelming SMTP
    await new Promise((r) => setTimeout(r, 500));
  }
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

      // If status changed from unavailable to available, send alerts
      if (available && previous === false) {
        console.log(`[${type}] STATUS CHANGE: Now available! Sending alerts...`);
        await sendAlerts(type);
      }
    } catch (err) {
      console.error(`[${type}] Check failed:`, err);
    }
  }

  // Write status.json and history-stats.json
  await writeStatusJson();
  await writeHistoryStatsJson();

  console.log(`[${new Date().toISOString()}] Check complete.`);
}

if (import.meta.main) {
  run().catch((err) => {
    console.error('Checker failed:', err);
    process.exit(1);
  });
}
