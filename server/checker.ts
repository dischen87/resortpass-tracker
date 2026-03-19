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
import { sendAlertEmail } from './email';

const OVERVIEW_URL = 'https://tickets.mackinternational.de/de/resortpass/uebersicht';

const DETAIL_URLS = {
  silver: 'https://tickets.mackinternational.de/de/ticket/resortpass-silver',
  gold: 'https://tickets.mackinternational.de/de/ticket/resortpass-gold',
};

// Sold-out indicator on detail pages
const DETAIL_SOLD_OUT = 'Leider ist dieses Produkt derzeit nicht verfügbar';

// Sold-out indicator on overview page
const OVERVIEW_SOLD_OUT = 'Derzeit nicht verfügbar';

// Bot-gate / JS-redirect pages are tiny and contain this marker.
const BOT_GATE_MARKER = 'document.location.href';
// Queue-it waiting room pages contain this marker instead of real shop content.
const QUEUE_IT_MARKER = 'queue-it.net';
// Real shop pages must contain a product-related keyword to be trusted.
const REAL_SHOP_MARKER = 'mackinternational';
const MIN_REAL_PAGE_SIZE = 5000;

// Delay between first and confirmation check (ms)
const CONFIRM_DELAY_MS = 30_000;

const FETCH_HEADERS = {
  'User-Agent': 'ResortPassTracker/1.0 (Community Tool; resortpass-europapark.ch)',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
};

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS, redirect: 'follow' });
    if (!res.ok) {
      console.error(`HTTP ${res.status} for ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    return null;
  }
}

function isRealShopPage(html: string): boolean {
  if (html.includes(BOT_GATE_MARKER)) return false;
  if (html.includes(QUEUE_IT_MARKER)) return false;
  if (html.length < MIN_REAL_PAGE_SIZE) return false;
  if (!html.toLowerCase().includes(REAL_SHOP_MARKER)) return false;
  return true;
}

function checkDetailPage(type: 'silver' | 'gold', html: string): 'sold_out' | 'available' | 'unknown' {
  if (!isRealShopPage(html)) {
    const reason = html.includes(BOT_GATE_MARKER) ? 'bot-gate' : html.includes(QUEUE_IT_MARKER) ? 'queue-it' : html.length < MIN_REAL_PAGE_SIZE ? 'too-small' : 'no-shop-marker';
    console.log(`[${type}] Detail page: not real shop content (${html.length} bytes, reason=${reason})`);
    return 'unknown';
  }

  if (html.includes(DETAIL_SOLD_OUT)) {
    return 'sold_out';
  }
  return 'available';
}

function checkOverviewPage(type: 'silver' | 'gold', html: string): 'sold_out' | 'available' | 'unknown' {
  if (!isRealShopPage(html)) {
    console.log(`[${type}] Overview page: not real shop content (${html.length} bytes)`);
    return 'unknown';
  }

  const typeLabel = type === 'silver' ? 'Silver' : 'Gold';
  const overviewLower = html.toLowerCase();
  const soldOutLower = OVERVIEW_SOLD_OUT.toLowerCase();

  const typeIndex = overviewLower.indexOf(typeLabel.toLowerCase());
  if (typeIndex !== -1) {
    const searchRegion = overviewLower.substring(typeIndex, typeIndex + 500);
    if (searchRegion.includes(soldOutLower)) {
      return 'sold_out';
    }
  }
  return 'available';
}

async function singleCheck(type: 'silver' | 'gold'): Promise<boolean | null> {
  const detailHtml = await fetchPage(DETAIL_URLS[type]);
  if (detailHtml === null) return false;

  const detailResult = checkDetailPage(type, detailHtml);
  if (detailResult === 'unknown') return null;
  if (detailResult === 'sold_out') return false;

  const overviewHtml = await fetchPage(OVERVIEW_URL);
  if (overviewHtml === null) {
    console.log(`[${type}] Overview fetch failed, trusting detail page`);
    return true;
  }

  const overviewResult = checkOverviewPage(type, overviewHtml);
  if (overviewResult === 'sold_out') return false;
  if (overviewResult === 'unknown') {
    console.log(`[${type}] Overview not real content, trusting detail page`);
    return true;
  }

  return true;
}

async function checkAvailability(type: 'silver' | 'gold'): Promise<boolean> {
  // First check
  const first = await singleCheck(type);
  if (first === null) {
    console.log(`[${type}] First check: unknown (bot-gate/redirect), assuming unavailable`);
    return false;
  }
  if (first === false) {
    console.log(`[${type}] First check: sold out`);
    return false;
  }

  // First check says available -- do a confirmation check after a delay
  console.log(`[${type}] First check: available. Waiting ${CONFIRM_DELAY_MS / 1000}s for confirmation check...`);
  await new Promise((r) => setTimeout(r, CONFIRM_DELAY_MS));

  const second = await singleCheck(type);
  if (second === null) {
    console.log(`[${type}] Confirmation check: unknown (bot-gate/redirect), NOT confirming availability`);
    return false;
  }
  if (second === false) {
    console.log(`[${type}] Confirmation check: sold out (first was false positive)`);
    return false;
  }

  console.log(`[${type}] Available (confirmed by two consecutive checks)`);
  return true;
}

async function sendAlerts(passType: 'silver' | 'gold') {
  const subscribers = getConfirmedSubscribers(passType);
  console.log(`[${passType}] Sending alerts to ${subscribers.length} subscribers`);

  for (const sub of subscribers) {
    try {
      await sendAlertEmail(sub.email, passType, sub.unsubscribe_token);
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
      const available = await checkAvailability(type);
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

run().catch((err) => {
  console.error('Checker failed:', err);
  process.exit(1);
});
