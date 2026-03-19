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
  getSubscriberCount,
  getSubscriberByCommunityToken,
  createCommunityPost,
  getApprovedPosts,
  getApprovedPostCount,
  getPendingPosts,
  moderatePost,
  getPostCountBySubscriberToday,
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

// Get subscriber count
app.get('/api/subscriber-count', (c) => {
  const count = getSubscriberCount();
  return c.json({ count });
});

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

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

// --- Community endpoints ---

app.get('/api/community', (c) => {
  const limit = Math.min(parseInt(c.req.query('limit') || '20'), 50);
  const offset = parseInt(c.req.query('offset') || '0');
  const posts = getApprovedPosts(limit, offset);
  const total = getApprovedPostCount();
  return c.json({ posts, total });
});

app.post('/api/community/submit', async (c) => {
  try {
    const body = await c.req.json();
    const { token, author_name, title, body: postBody } = body;

    if (!token || typeof token !== 'string') {
      return c.json({ error: 'Ungültiger Community-Link.' }, 401);
    }

    const subscriber = getSubscriberByCommunityToken(token);
    if (!subscriber) {
      return c.json({ error: 'Ungültiger oder abgelaufener Link. Bist du noch als Abonnent angemeldet?' }, 401);
    }

    if (!author_name || typeof author_name !== 'string' || author_name.trim().length < 1) {
      return c.json({ error: 'Bitte gib einen Namen ein.' }, 400);
    }
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
      return c.json({ error: 'Bitte gib einen Titel ein (mind. 3 Zeichen).' }, 400);
    }
    if (!postBody || typeof postBody !== 'string' || postBody.trim().length < 10) {
      return c.json({ error: 'Dein Beitrag ist zu kurz (mind. 10 Zeichen).' }, 400);
    }
    if (title.length > 100) {
      return c.json({ error: 'Titel ist zu lang (max. 100 Zeichen).' }, 400);
    }
    if (postBody.length > 2000) {
      return c.json({ error: 'Beitrag ist zu lang (max. 2000 Zeichen).' }, 400);
    }

    const todayCount = getPostCountBySubscriberToday(subscriber.id);
    if (todayCount >= 3) {
      return c.json({ error: 'Du hast heute schon 3 Beiträge eingereicht. Probier es morgen nochmal!' }, 429);
    }

    createCommunityPost(subscriber.id, author_name.trim(), title.trim(), postBody.trim());

    return c.json({
      success: true,
      message: 'Danke für deinen Tipp! Er wird geprüft und erscheint bald auf der Seite.',
    });
  } catch (err) {
    console.error('Community submit error:', err);
    return c.json({ error: 'Ein Fehler ist aufgetreten.' }, 500);
  }
});

app.get('/api/community/pending', (c) => {
  const adminToken = c.req.query('admin_token');
  if (!ADMIN_TOKEN || adminToken !== ADMIN_TOKEN) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const posts = getPendingPosts();
  return c.json({ posts });
});

app.post('/api/community/moderate', async (c) => {
  try {
    const body = await c.req.json();
    const { id, action, admin_token } = body;

    if (!ADMIN_TOKEN || admin_token !== ADMIN_TOKEN) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    if (!id || !['approve', 'reject'].includes(action)) {
      return c.json({ error: 'Ungültige Anfrage.' }, 400);
    }

    const status = action === 'approve' ? 'approved' : 'rejected';
    const ok = moderatePost(id, status as 'approved' | 'rejected');
    if (ok) {
      return c.json({ success: true, message: `Beitrag ${action === 'approve' ? 'genehmigt' : 'abgelehnt'}.` });
    }
    return c.json({ error: 'Beitrag nicht gefunden oder bereits moderiert.' }, 404);
  } catch (err) {
    console.error('Moderate error:', err);
    return c.json({ error: 'Ein Fehler ist aufgetreten.' }, 500);
  }
});

const PORT = parseInt(process.env.API_PORT || '3000');

console.log(`API server starting on port ${PORT}...`);
export default {
  port: PORT,
  fetch: app.fetch,
};
