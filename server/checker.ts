import { getDb, logStatus, getPreviousStatus, getConfirmedSubscribers } from './db';
import { sendAlertEmail } from './email';

const URLS = {
  silver: 'https://tickets.mackinternational.de/de/ticket/resortpass-silver',
  gold: 'https://tickets.mackinternational.de/de/ticket/resortpass-gold',
};

const SOLD_OUT_INDICATORS = [
  'nicht verfügbar',
  'not available',
  "isn't available",
  'ausverkauft',
  'sold out',
  'derzeit nicht',
  'zurzeit nicht',
];

async function checkAvailability(type: 'silver' | 'gold'): Promise<boolean> {
  const res = await fetch(URLS[type], {
    headers: {
      'User-Agent': 'ResortPassTracker/1.0 (Community Tool; resortpass-europapark.ch)',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
    },
  });

  if (!res.ok) {
    console.error(`[${type}] HTTP ${res.status}: ${res.statusText}`);
    return false; // Assume unavailable on error — no false alarms
  }

  const html = await res.text();
  const htmlLower = html.toLowerCase();

  // Available if NONE of the sold-out indicators are found
  const isSoldOut = SOLD_OUT_INDICATORS.some((indicator) => htmlLower.includes(indicator));
  return !isSoldOut;
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

async function run() {
  console.log(`[${new Date().toISOString()}] Starting availability check...`);

  // Initialize DB
  getDb();

  for (const type of ['silver', 'gold'] as const) {
    try {
      const available = await checkAvailability(type);
      const previous = getPreviousStatus(type);

      console.log(`[${type}] Available: ${available} (was: ${previous})`);

      // Log current status
      logStatus(type, available);

      // If status changed from unavailable to available → send alerts
      if (available && previous === false) {
        console.log(`[${type}] STATUS CHANGE: Now available! Sending alerts...`);
        await sendAlerts(type);
      }

      // Write status.json for the static site
      await writeStatusJson();
    } catch (err) {
      console.error(`[${type}] Check failed:`, err);
    }
  }

  console.log(`[${new Date().toISOString()}] Check complete.`);
}

async function writeStatusJson() {
  const { getLatestStatus } = await import('./db');
  const status = getLatestStatus();
  const statusJson = JSON.stringify(status, null, 2);
  const path = process.env.STATUS_JSON_PATH || './dist/api/status.json';

  // Ensure directory exists
  const dir = path.substring(0, path.lastIndexOf('/'));
  await Bun.write(path, statusJson);
  console.log(`Status written to ${path}`);
}

run().catch((err) => {
  console.error('Checker failed:', err);
  process.exit(1);
});
