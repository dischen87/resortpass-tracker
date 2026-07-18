import { Hono } from 'hono';
import {
  addSubscriber,
  confirmSubscriber,
  unsubscribe,
  getLatestStatus,
  getHistoryStats,
  getMonthlyHeatmap,
  getRecentChecks,
  getDailyAvailabilityAggregates,
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
import { localizedSiteUrl, sendConfirmationEmail, sendUnsubscribeConfirmation } from './email';
import { buildRss, formatDailyDigest, normalizeFeedLanguage } from './feed';

const app = new Hono();
const SITE_URL = process.env.SITE_URL || 'https://www.resortpass-europapark.ch';
const CHECKER_FRESH_MINUTES = 45;

function statusFreshness(value: { available: boolean; lastCheck: string } | null) {
  if (!value?.lastCheck) return { lastCheck: null, ageMinutes: null, fresh: false };
  const normalized = value.lastCheck.includes('T') ? value.lastCheck : value.lastCheck.replace(' ', 'T');
  const timestamp = new Date(/[zZ]|[+-]\d\d:\d\d$/.test(normalized) ? normalized : `${normalized}Z`).getTime();
  if (!Number.isFinite(timestamp)) return { lastCheck: value.lastCheck, ageMinutes: null, fresh: false };
  const ageMinutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  return { lastCheck: value.lastCheck, ageMinutes, fresh: ageMinutes <= CHECKER_FRESH_MINUTES };
}

const apiCopy = {
  de: {
    rate: 'Zu viele Anfragen. Bitte versuche es später erneut.',
    email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    pass: 'Bitte wähle mindestens einen Pass-Typ aus.',
    send: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.',
    general: 'Ein Fehler ist aufgetreten.',
    subscribed: 'Falls die Adresse noch nicht angemeldet war, haben wir eine Bestätigungs-E-Mail geschickt.',
  },
  fr: {
    rate: 'Trop de demandes. Veuillez réessayer plus tard.',
    email: 'Veuillez saisir une adresse e-mail valide.',
    pass: 'Veuillez sélectionner au moins un type de pass.',
    send: 'Impossible d’envoyer l’e-mail. Veuillez réessayer plus tard.',
    general: 'Une erreur est survenue.',
    subscribed: 'Si l’adresse n’était pas encore inscrite, nous avons envoyé un e-mail de confirmation.',
  },
  it: {
    rate: 'Troppe richieste. Riprova più tardi.',
    email: 'Inserisci un indirizzo e-mail valido.',
    pass: 'Seleziona almeno un tipo di pass.',
    send: 'Impossibile inviare l’e-mail. Riprova più tardi.',
    general: 'Si è verificato un errore.',
    subscribed: 'Se l’indirizzo non era ancora registrato, abbiamo inviato un’e-mail di conferma.',
  },
  en: {
    rate: 'Too many requests. Please try again later.',
    email: 'Please enter a valid email address.',
    pass: 'Please select at least one pass type.',
    send: 'The email could not be sent. Please try again later.',
    general: 'Something went wrong.',
    subscribed: 'If the address was not already subscribed, we sent a confirmation email.',
  },
} as const;

const communityCopy = {
  de: {
    token: 'Ungültiger oder abgelaufener Community-Link.',
    name: 'Bitte gib einen Namen mit höchstens 50 Zeichen ein.',
    title: 'Bitte gib einen Titel mit 3 bis 100 Zeichen ein.',
    body: 'Bitte gib einen Beitrag mit 10 bis 2.000 Zeichen ein.',
    limit: 'Du hast heute schon 3 Beiträge eingereicht. Probier es morgen noch einmal.',
    success: 'Danke für deinen Tipp! Er wird geprüft und erscheint bald auf der Seite.',
    general: 'Ein Fehler ist aufgetreten.',
  },
  fr: {
    token: 'Le lien communautaire est invalide ou expiré.',
    name: 'Veuillez saisir un nom de 50 caractères maximum.',
    title: 'Veuillez saisir un titre de 3 à 100 caractères.',
    body: 'Veuillez saisir un texte de 10 à 2 000 caractères.',
    limit: 'Vous avez déjà envoyé 3 contributions aujourd’hui. Réessayez demain.',
    success: 'Merci pour votre conseil ! Il sera vérifié avant sa publication.',
    general: 'Une erreur est survenue.',
  },
  it: {
    token: 'Il link della community non è valido o è scaduto.',
    name: 'Inserisci un nome di massimo 50 caratteri.',
    title: 'Inserisci un titolo da 3 a 100 caratteri.',
    body: 'Inserisci un testo da 10 a 2.000 caratteri.',
    limit: 'Hai già inviato 3 contributi oggi. Riprova domani.',
    success: 'Grazie per il consiglio! Verrà verificato prima della pubblicazione.',
    general: 'Si è verificato un errore.',
  },
  en: {
    token: 'The community link is invalid or expired.',
    name: 'Please enter a name with no more than 50 characters.',
    title: 'Please enter a title between 3 and 100 characters.',
    body: 'Please enter a post between 10 and 2,000 characters.',
    limit: 'You have already submitted 3 posts today. Please try again tomorrow.',
    success: 'Thanks for your tip! It will be reviewed before publication.',
    general: 'Something went wrong.',
  },
} as const;

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

// Initialize DB on start
getDb();

// Health check
app.get('/api/health', (c) => {
  const status = getLatestStatus();
  const passes = {
    silver: statusFreshness(status.silver),
    gold: statusFreshness(status.gold),
  };
  const fresh = passes.silver.fresh && passes.gold.fresh;
  const knownAges = [passes.silver.ageMinutes, passes.gold.ageMinutes].filter((age): age is number => age !== null);
  const body = {
    ok: fresh,
    database: true,
    checker: {
      fresh,
      ageMinutes: knownAges.length ? Math.max(...knownAges) : null,
      passes,
    },
  };
  return c.json(body, fresh ? 200 : 503);
});

// Get subscriber count
app.get('/api/subscriber-count', (c) => {
  const count = getSubscriberCount();
  return c.json({ count });
});

// Get current status
app.get('/api/status', (c) => {
  const status = getLatestStatus();
  const response = (value: typeof status.silver) => {
    const freshness = statusFreshness(value);
    if (!value || !freshness.fresh) {
      return { state: 'unknown', available: null, ...freshness };
    }
    return { state: value.available ? 'available' : 'sold_out', ...value, ...freshness };
  };
  return c.json({
    silver: response(status.silver),
    gold: response(status.gold),
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
  const requested = Number.parseInt(c.req.query('hours') || '24', 10);
  const hours = Number.isFinite(requested) ? Math.max(1, Math.min(requested, 168)) : 24;
  const checks = getRecentChecks(hours); // max 7 days
  return c.json(checks);
});

// Deterministic daily prose generated from the latest 30 recorded history days.
app.get('/api/news', (c) => {
  const lang = normalizeFeedLanguage(c.req.query('lang'));
  const items = getDailyAvailabilityAggregates().map((row) => formatDailyDigest(row, lang));
  c.header('Cache-Control', 'public, max-age=300');
  c.header('Content-Language', lang);
  return c.json({ lang, updatedAt: items[0]?.updatedAt || null, items });
});

app.get('/api/feed.xml', (c) => {
  const lang = normalizeFeedLanguage(c.req.query('lang'));
  const items = getDailyAvailabilityAggregates().map((row) => formatDailyDigest(row, lang));
  c.header('Content-Type', 'application/rss+xml; charset=utf-8');
  c.header('Cache-Control', 'public, max-age=300');
  c.header('Content-Language', lang);
  return c.body(buildRss(lang, items, SITE_URL));
});

// Subscribe
app.post('/api/subscribe', async (c) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';

  let lang = normalizeFeedLanguage(undefined);

  if (isRateLimited(ip)) {
    return c.json({ error: apiCopy[lang].rate }, 429);
  }

  try {
    const body = await c.req.json();
    const { email, notify_silver, notify_gold } = body;
    lang = normalizeFeedLanguage(body.lang);
    const copy = apiCopy[lang];

    if (!email || typeof email !== 'string') {
      return c.json({ error: copy.email }, 400);
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: copy.email }, 400);
    }

    if (!notify_silver && !notify_gold) {
      return c.json({ error: copy.pass }, 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const result = addSubscriber(normalizedEmail, !!notify_silver, !!notify_gold, lang);

    // Keep the response generic while preserving an already-confirmed account.
    if (result.alreadyConfirmed) {
      return c.json({ success: true, message: copy.subscribed });
    }

    // Send confirmation email
    try {
      const communityUrl = `${localizedSiteUrl(lang, 'community/neu')}?token=${encodeURIComponent(result.communityToken)}`;
      await sendConfirmationEmail(normalizedEmail, result.confirmToken, lang, communityUrl);
    } catch (err) {
      console.error('Failed to send confirmation email:', err);
      return c.json({ error: copy.send }, 500);
    }

    return c.json({
      success: true,
      message: copy.subscribed,
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return c.json({ error: apiCopy[lang].general }, 500);
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

// Unsubscribe is POST-only so mail-link scanners cannot delete subscriptions.
app.post('/api/unsubscribe', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const token = typeof body.token === 'string' ? body.token : '';
  const lang = normalizeFeedLanguage(body.lang);
  if (!token) {
    return c.json({ error: 'Ungültiger Abmelde-Link.' }, 400);
  }

  // Get email before deleting for confirmation email
  const db = getDb();
  const sub = db
    .query('SELECT email, lang FROM subscribers WHERE unsubscribe_token = ?')
    .get(token) as { email: string; lang: 'de' | 'fr' | 'it' | 'en' } | null;

  const removed = unsubscribe(token);
  if (removed && sub) {
    try {
      await sendUnsubscribeConfirmation(sub.email, sub.lang || lang);
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
  const requestedLimit = Number.parseInt(c.req.query('limit') || '20', 10);
  const requestedOffset = Number.parseInt(c.req.query('offset') || '0', 10);
  const limit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(requestedLimit, 50)) : 20;
  const offset = Number.isFinite(requestedOffset) ? Math.max(0, requestedOffset) : 0;
  const posts = getApprovedPosts(limit, offset);
  const total = getApprovedPostCount();
  return c.json({ posts, total });
});

app.post('/api/community/submit', async (c) => {
  let lang = normalizeFeedLanguage(undefined);
  try {
    const body = await c.req.json();
    const { token, author_name, title, body: postBody } = body;
    lang = normalizeFeedLanguage(body.lang);
    const copy = communityCopy[lang];

    if (!token || typeof token !== 'string') {
      return c.json({ error: copy.token }, 401);
    }

    const subscriber = getSubscriberByCommunityToken(token);
    if (!subscriber) {
      return c.json({ error: copy.token }, 401);
    }

    if (!author_name || typeof author_name !== 'string' || author_name.trim().length < 1 || author_name.trim().length > 50) {
      return c.json({ error: copy.name }, 400);
    }
    if (!title || typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 100) {
      return c.json({ error: copy.title }, 400);
    }
    if (!postBody || typeof postBody !== 'string' || postBody.trim().length < 10 || postBody.trim().length > 2000) {
      return c.json({ error: copy.body }, 400);
    }

    const todayCount = getPostCountBySubscriberToday(subscriber.id);
    if (todayCount >= 3) {
      return c.json({ error: copy.limit }, 429);
    }

    createCommunityPost(subscriber.id, author_name.trim(), title.trim(), postBody.trim());

    return c.json({
      success: true,
      message: copy.success,
    });
  } catch (err) {
    console.error('Community submit error:', err);
    return c.json({ error: communityCopy[lang].general }, 500);
  }
});

app.get('/api/community/pending', (c) => {
  if (!ADMIN_TOKEN || c.req.header('authorization') !== `Bearer ${ADMIN_TOKEN}`) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const posts = getPendingPosts();
  return c.json({ posts });
});

app.post('/api/community/moderate', async (c) => {
  try {
    const body = await c.req.json();
    const { id, action } = body;

    if (!ADMIN_TOKEN || c.req.header('authorization') !== `Bearer ${ADMIN_TOKEN}`) {
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
