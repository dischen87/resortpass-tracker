import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  addSubscriber,
  confirmSubscriber,
  unsubscribe,
  getLatestStatus,
  getHistoryStats,
  getMonthlyHeatmap,
  getRecentChecks,
  getDb,
} from './db';
import { sendConfirmationEmail, sendUnsubscribeConfirmation } from './email';

const app = new Hono();

// Rate limiting
const rateLimits = new Map<string, number[]>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 3600000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimits.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < WINDOW_MS);
  rateLimits.set(ip, recent);

  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  return false;
}

// Cleanup old rate limit entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimits.entries()) {
    const recent = timestamps.filter((t) => now - t < WINDOW_MS);
    if (recent.length === 0) rateLimits.delete(ip);
    else rateLimits.set(ip, recent);
  }
}, WINDOW_MS);

// CORS
app.use('*', cors({ origin: '*' }));

// Initialize DB on start
getDb();

// Health check
app.get('/api/health', (c) => c.json({ ok: true }));

// Get current status
app.get('/api/status', (c) => {
  const status = getLatestStatus();
  return c.json({
    silver: status.silver || { available: false, lastCheck: new Date().toISOString() },
    gold: status.gold || { available: false, lastCheck: new Date().toISOString() },
  });
});

// Get history stats (aggregate statistics)
app.get('/api/history-stats', (c) => {
  const stats = getHistoryStats();
  return c.json(stats);
});

// Get monthly heatmap for a specific pass type
app.get('/api/history/:type', (c) => {
  const type = c.req.param('type');
  if (type !== 'silver' && type !== 'gold') {
    return c.json({ error: 'Ungültiger Pass-Typ. Erlaubt: silver, gold.' }, 400);
  }
  const heatmap = getMonthlyHeatmap(type);
  return c.json(heatmap);
});

// Get recent checks (last 24h by default)
app.get('/api/recent-checks', (c) => {
  const hours = parseInt(c.req.query('hours') || '24');
  const checks = getRecentChecks(Math.min(hours, 168)); // max 7 days
  return c.json(checks);
});

// Subscribe
app.post('/api/subscribe', async (c) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    return c.json({ error: 'Zu viele Anfragen. Bitte versuche es später erneut.' }, 429);
  }

  try {
    const body = await c.req.json();
    const { email, notify_silver, notify_gold } = body;

    if (!email || typeof email !== 'string') {
      return c.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, 400);
    }

    if (!notify_silver && !notify_gold) {
      return c.json({ error: 'Bitte wähle mindestens einen Pass-Typ aus.' }, 400);
    }

    const result = addSubscriber(email.toLowerCase().trim(), notify_silver, notify_gold);

    // Send confirmation email
    try {
      await sendConfirmationEmail(email, result.confirmToken);
    } catch (err) {
      console.error('Failed to send confirmation email:', err);
      return c.json({ error: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.' }, 500);
    }

    return c.json({
      success: true,
      message: 'Bitte prüfe deine E-Mails und bestätige dein Abo.',
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return c.json({ error: 'Ein Fehler ist aufgetreten.' }, 500);
  }
});

// Confirm subscription
app.get('/api/confirm', (c) => {
  const token = c.req.query('token');
  if (!token) {
    return c.json({ error: 'Ungültiger Bestätigungslink.' }, 400);
  }

  const confirmed = confirmSubscriber(token);
  if (confirmed) {
    return c.json({ success: true, message: 'E-Mail bestätigt!' });
  }
  return c.json({ error: 'Der Bestätigungslink ist ungültig oder wurde bereits verwendet.' }, 400);
});

// Unsubscribe
app.get('/api/unsubscribe', async (c) => {
  const token = c.req.query('token');
  if (!token) {
    return c.json({ error: 'Ungültiger Abmelde-Link.' }, 400);
  }

  // Get email before deleting for confirmation email
  const db = getDb();
  const sub = db
    .query('SELECT email FROM subscribers WHERE unsubscribe_token = ?')
    .get(token) as { email: string } | null;

  const removed = unsubscribe(token);
  if (removed && sub) {
    try {
      await sendUnsubscribeConfirmation(sub.email);
    } catch {
      // Non-critical -- subscriber is already removed
    }
    return c.json({ success: true, message: 'Erfolgreich abgemeldet.' });
  }
  return c.json({ error: 'Der Abmelde-Link ist ungültig.' }, 400);
});

const PORT = parseInt(process.env.API_PORT || '3000');

console.log(`API server starting on port ${PORT}...`);
export default {
  port: PORT,
  fetch: app.fetch,
};
