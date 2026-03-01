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

const FETCH_HEADERS = {
  'User-Agent': 'ResortPassTracker/1.0 (Community Tool; resortpass-europapark.ch)',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
};

async function fetchPage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: FETCH_HEADERS });
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

async function checkAvailability(type: 'silver' | 'gold'): Promise<boolean> {
  // Check the detail page
  const detailHtml = await fetchPage(DETAIL_URLS[type]);
  if (detailHtml === null) {
    return false; // Assume unavailable on error -- no false alarms
  }

  const detailSoldOut = detailHtml.includes(DETAIL_SOLD_OUT);
  if (detailSoldOut) {
    console.log(`[${type}] Detail page: sold out`);
    return false;
  }

  // Also check overview page for extra confidence
  const overviewHtml = await fetchPage(OVERVIEW_URL);
  if (overviewHtml === null) {
    // If overview fails but detail says available, trust the detail page
    console.log(`[${type}] Overview page fetch failed, trusting detail page result`);
    return true;
  }

  // The overview page may list both pass types. We look for the sold-out indicator
  // near the relevant pass type. As a simple heuristic, if the overview contains
  // the sold-out string at all, we check the detail page result as the authority.
  // The detail page already passed, so we return available.
  // However, if the overview specifically marks this type as unavailable, we note it.
  const typeLabel = type === 'silver' ? 'Silver' : 'Gold';
  const overviewLower = overviewHtml.toLowerCase();
  const soldOutLower = OVERVIEW_SOLD_OUT.toLowerCase();

  // Find sections related to this pass type in the overview
  const typeIndex = overviewLower.indexOf(typeLabel.toLowerCase());
  if (typeIndex !== -1) {
    // Check if the sold-out indicator appears near (within 500 chars after) the type mention
    const searchRegion = overviewLower.substring(typeIndex, typeIndex + 500);
    if (searchRegion.includes(soldOutLower)) {
      console.log(`[${type}] Overview page: sold out for ${typeLabel}`);
      return false;
    }
  }

  console.log(`[${type}] Available (confirmed by detail + overview pages)`);
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
