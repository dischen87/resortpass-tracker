import { Hono } from 'hono';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import * as z from 'zod/v4';
import { getPlanningPack } from '../src/content/planning';
import { guideSourceUrls } from '../src/data/guide-sources';
import { EDITORIAL_CHECKED_AT } from '../src/data/review-dates';
import { normalizeCheckTimestamp } from '../src/data/status-format';
import { localeCodes, type LocaleCode } from '../src/i18n/locales';
import { getRoutePath, guideRouteKeys, type GuideRouteKey } from '../src/i18n/routes';
import { getAllDayRange, getRecommendedVisitDays } from '../src/lib/visit-calendar';

type ObservedPass = { available: boolean; lastCheck: string } | null;
export interface McpOptions {
  siteUrl: string;
  /** Only the two public checker observations; never subscriber or provider records. */
  readStatus: () => { silver: ObservedPass; gold: ObservedPass };
  now?: () => number;
}

const language = z.enum(localeCodes).default('de').describe('Language of the editorial content and site links.');
const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

function result(payload: Record<string, unknown>) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(payload) }], structuredContent: payload };
}

/** Whitelist the response and retain unknown for missing, invalid, old or future observations. */
export function publicMcpPass(value: ObservedPass, now: number) {
  const lastCheck = normalizeCheckTimestamp(value?.lastCheck);
  const ageMs = lastCheck ? now - Date.parse(lastCheck) : null;
  const fresh = ageMs !== null && ageMs >= -60_000 && ageMs <= 45 * 60_000 && typeof value?.available === 'boolean';
  return {
    state: fresh ? (value!.available ? 'available' : 'sold_out') : 'unknown',
    available: fresh ? value!.available : null,
    lastCheck,
    ageMinutes: ageMs === null ? null : Math.max(0, Math.round(ageMs / 60_000)),
    fresh,
  };
}

function normalizeSearch(value: string) {
  return value.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase();
}

export function createResortPassMcpServer(options: McpOptions) {
  const siteUrl = new URL(options.siteUrl).origin;
  const url = (key: GuideRouteKey | 'home', lang: LocaleCode) => new URL(getRoutePath(key, lang)!, siteUrl).href;
  const server = new McpServer({ name: 'resortpass-tracker', version: '1.1.0' });

  server.registerTool('get_status', {
    title: 'ResortPass availability',
    description: 'Read the tracker’s own current ResortPass Silver/Gold sale observations, check times and freshness. Use for whether a pass is on sale. Unknown or stale is not sold out. No personal reservations, subscriptions, purchases, wait times or crowd data.',
    inputSchema: z.object({ language }).strict(), annotations,
  }, async ({ language: lang }) => {
    try {
      const status = options.readStatus();
      const now = (options.now ?? Date.now)();
      return result({
        silver: publicMcpPass(status.silver, now), gold: publicMcpPass(status.gold, now),
        generatedAt: new Date(now).toISOString(), url: url('home', lang),
        source: 'ResortPass Tracker: own ticket-shop observations, maximum age 45 minutes.',
        officialShopUrl: 'https://tickets.mackinternational.de/de/resortpass/uebersicht',
        disclaimer: 'An observation is not a booking or guarantee. Verify the official shop before purchase.',
      });
    } catch {
      return { isError: true, content: [{ type: 'text' as const, text: 'The tracker status is temporarily unavailable. Check the official ticket shop; do not infer availability.' }] };
    }
  });

  server.registerTool('find_guide', {
    title: 'Find an editorial planning guide',
    description: 'Find the tracker’s own sourced editorial guide by topic ID or words from a localized title. For prices, families, restaurants, stays, Rulantica or ResortPass rules. Returns dated editorial excerpts, canonical links and official sources. For current sale status use get_status. No provider live data or private accounts.',
    inputSchema: z.object({
      language,
      topic: z.enum(guideRouteKeys).optional(),
      query: z.string().trim().min(2).max(200).optional().describe('Words from the desired guide title, in the requested language.'),
    }).strict().refine((value) => value.topic || value.query, { message: 'Choose a topic or search query.' }), annotations,
  }, async ({ language: lang, topic, query }) => {
    const pack = getPlanningPack(lang);
    const terms = normalizeSearch(query || '').split(/\s+/).filter(Boolean);
    const matches = guideRouteKeys.map((key) => {
      const page = pack.pages[key];
      const searchable = normalizeSearch(`${key} ${page.title} ${page.heading} ${page.description}`);
      return { key, page, score: terms.filter((term) => searchable.includes(term)).length };
    }).filter((entry) => topic ? entry.key === topic : entry.score > 0)
      .sort((a, b) => b.score - a.score).slice(0, 3);
    return result({
      language: lang,
      guides: matches.map(({ key, page }) => ({
        topic: key, title: page.title, description: page.description, excerpt: page.answer,
        url: url(key, lang), editorialCheckedAt: EDITORIAL_CHECKED_AT, sourceUrl: guideSourceUrls[key],
      })),
      ...(matches.length === 0 ? { availableTopics: [...guideRouteKeys] } : {}),
      disclaimer: 'Editorial excerpts carry their own review date. They are not current live status. Use get_status for availability and verify official conditions before booking.',
    });
  });

  server.registerTool('plan_visit', {
    title: 'Create a personal visit outline',
    description: 'Create the same deterministic editorial outline as the website’s visit planner, from personal preferences. Crowd level is supplied by the user, not a forecast. Optional dates are personal planning dates. Does not check opening hours, ticket availability, live queues or reservations, create bookings, or write to a calendar.',
    inputSchema: z.object({
      language,
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Optional personal start date, YYYY-MM-DD. Opening days are not checked.'),
      days: z.number().int().min(1).max(3).default(2),
      group: z.enum(['balanced', 'family', 'thrill', 'shows']).default('balanced'),
      arrival: z.enum(['opening', 'early', 'late']).default('opening'),
      crowd: z.enum(['low', 'medium', 'high']).default('medium').describe('User-selected planning assumption, never fetched from a provider.'),
      includesRulantica: z.boolean().default(false),
    }).strict(), annotations,
  }, async ({ language: lang, date, days, group, arrival, crowd, includesRulantica }) => {
    const copy = getPlanningPack(lang).visitPlanner;
    const recommendedDays = getRecommendedVisitDays(days, crowd, arrival, includesRulantica);
    let range;
    try { range = date ? getAllDayRange(date, recommendedDays) : undefined; }
    catch { return { isError: true, content: [{ type: 'text' as const, text: 'Use a valid calendar start date; the recommended end date must fit within year 9999.' }] }; }
    const labels = [copy.morning, copy.midday, copy.afternoon, copy.evening];
    const notes = [arrival === 'late' ? copy.notes.late : copy.notes.early];
    if (crowd === 'high') notes.push(copy.notes.busy);
    if (includesRulantica) notes.push(copy.notes.rulantica);
    if (group !== 'balanced') notes.push(copy.notes[group]);
    return result({
      language: lang, requestedDays: days, recommendedDays, includesRulantica,
      ...(range ? { dates: { start: date, endExclusive: range.end.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3') } } : {}),
      route: copy.routes[group].map((text, index) => ({ dayPart: labels[index], text })),
      notes, disclaimer: copy.disclaimer, editorialCheckedAt: EDITORIAL_CHECKED_AT,
      assumptions: 'Crowd and arrival are user preferences. No live data, opening-day verification or bookings.',
      url: `${url('visitPlanner', lang)}#visit-planner`,
      calendar: 'Use the website’s local .ics export to save a tentative plan. No calendar account is accessed by this tool.',
    });
  });
  return server;
}

/** Stateless request/response transport: no sessions, event subscriptions or long-lived streams. */
export function createResortPassMcpApp(options: McpOptions) {
  const app = new Hono();
  const siteUrl = new URL(options.siteUrl);
  app.use('*', async (c, next) => {
    c.header('Cache-Control', 'no-store');
    c.header('X-Robots-Tag', 'noindex, nofollow');
    const host = c.req.header('host') || new URL(c.req.url).host;
    const origin = c.req.header('origin');
    if (host.toLowerCase() !== siteUrl.host.toLowerCase() ||
      (origin && ![siteUrl.origin, 'https://chatgpt.com', 'https://chat.openai.com'].includes(origin))) {
      return c.json({ error: 'Invalid MCP host or origin.' }, 403);
    }
    if (origin) {
      c.header('Access-Control-Allow-Origin', origin);
      c.header('Vary', 'Origin');
    }
    await next();
  });
  app.options('/', (c) => {
    c.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, MCP-Protocol-Version');
    return c.body(null, 204);
  });
  app.post('/', async (c) => {
    const server = createResortPassMcpServer(options);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined, enableJsonResponse: true, maxRequestBodySize: 8 * 1024,
    });
    try {
      await server.connect(transport);
      return await transport.handleRequest(c.req.raw);
    } finally { await server.close(); }
  });
  app.all('/', (c) => { c.header('Allow', 'POST, OPTIONS'); return c.json({ error: 'This read-only MCP endpoint uses POST requests; event streams and sessions are not offered.' }, 405); });
  return app;
}
