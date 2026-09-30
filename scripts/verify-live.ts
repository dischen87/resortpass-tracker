/**
 * Asserts things about the running site that no build-time check can see.
 *
 * `verify-seo-build.ts` is 1 500 lines and does not contain a single `fetch` —
 * by construction it cannot notice that production answers 200 for every
 * invented URL, that a redirect never fires, or that an endpoint is serving
 * licensed provider data to anyone who asks. Those were all true while the
 * build-time checks passed.
 *
 *   bun scripts/verify-live.ts [baseUrl]
 */

export {};

const BASE = (process.argv[2] || 'https://www.resortpass-europapark.ch').replace(/\/$/, '');

interface Result {
  name: string;
  ok: boolean;
  detail: string;
  /** Warnings do not fail the run; they are drift worth looking at. */
  warnOnly?: boolean;
}

const results: Result[] = [];

function record(name: string, ok: boolean, detail: string, warnOnly = false) {
  results.push({ name, ok, detail, warnOnly });
}

async function head(path: string) {
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(10_000) });
  return { status: response.status, location: response.headers.get('location'), response };
}

async function text(path: string, headers: Record<string, string> = {}) {
  const response = await fetch(`${BASE}${path}`, { headers, signal: AbortSignal.timeout(10_000) });
  return { status: response.status, body: await response.text(), response };
}

// --------------------------------------------------------------- assertions

async function checkSoftFourOhFour() {
  const { status, response } = await head('/diese-seite-gibt-es-nicht-xyz123/');
  const ok = status === 404;
  record('Unknown URL returns 404', ok, `got ${status}`);

  if (!ok) {
    const body = await response.text();
    const indexable = /name="robots"[^>]*content="[^"]*\bindex\b/.test(body);
    record(
      'Unknown URL is not marked indexable',
      !indexable,
      indexable ? 'served 200 AND index,follow — every invented URL is a duplicate' : 'not indexable',
    );
  }
}

async function checkRedirects() {
  const bare = await head('/wartezeiten');
  record('Path without trailing slash redirects', bare.status === 308 || bare.status === 301, `got ${bare.status}`);

  /*
   * The redirect above must not eat the query string. It did: every
   * confirmation mail links to /confirm?token=…, Caddy answered 308 with a
   * bare `/confirm/`, and the token never reached the page. Not one subscriber
   * could confirm, and the subscriber counter sat at 890 until it was found.
   */
  const withQuery = await head('/confirm?token=verify-live-probe');
  const keptToken = (withQuery.location || '').includes('token=verify-live-probe');
  record(
    'Trailing-slash redirect keeps the query string',
    keptToken,
    keptToken ? `-> ${withQuery.location}` : `token dropped: ${withQuery.status} -> ${withQuery.location}`,
  );

  const sitemap = await head('/sitemap.xml');
  record('/sitemap.xml redirects to the index', sitemap.status === 308 || sitemap.status === 301, `got ${sitemap.status}`);

  // Retired URLs must stay redirected forever; they were indexed for months.
  const retired: [string, string][] = [
    ['/en/wartezeiten/', '/en/wait-times/'],
    ['/fr/wartezeiten/', '/fr/temps-d-attente/'],
    ['/it/wartezeiten/', '/it/tempi-di-attesa/'],
    ['/en/impressum/', '/en/legal-notice-and-privacy/'],
    ['/fr/impressum/', '/fr/mentions-legales-et-confidentialite/'],
    ['/it/impressum/', '/it/note-legali-e-privacy/'],
  ];
  for (const [from, to] of retired) {
    const hop = await head(from);
    const ok = hop.status === 301 && (hop.location || '').endsWith(to);
    record(`${from} still redirects`, ok, ok ? `301 -> ${to}` : `got ${hop.status} -> ${hop.location}`);
  }

  const nonWww = await fetch('https://resortpass-europapark.ch/', { redirect: 'manual' });
  record(
    'Bare domain redirects to www',
    nonWww.status === 301 && (nonWww.headers.get('location') || '').includes('www.'),
    `got ${nonWww.status} -> ${nonWww.headers.get('location')}`,
  );
}

async function checkRenderedContent() {
  const wait = await text('/wartezeiten/');
  // The whole point of rendering the directory at build time: a crawler that
  // does not run JavaScript must still see what exists.
  const rides = ['blue fire', 'Poseidon', 'Euro-Mir', 'Silver Star'];
  const missing = rides.filter((ride) => !wait.body.includes(ride));
  record(
    'Wait-times page names its attractions in the served HTML',
    missing.length === 0,
    missing.length ? `missing: ${missing.join(', ')}` : `all ${rides.length} present`,
  );
  record(
    'Wait-times page does not fall back to "enable JavaScript"',
    !/Aktiviere JavaScript/i.test(wait.body) || wait.body.includes('ride-row'),
    'directory present',
  );

  const home = await text('/');
  const homeMarkup = home.body.replace(/<script[\s\S]*?<\/script>/g, '');
  record(
    'Home page states a real availability answer',
    /Ausverkauft|Jetzt verfügbar|Unbekannt/.test(homeMarkup),
    'answer present',
  );
  // Scripts are stripped first on purpose. The island carries the label as a
  // string so it can build the panel the moment the shop opens; what must not
  // exist is a rendered, crawlable purchase link while the pass is sold out.
  const renderedAvailable = /data-pass-state="available"/.test(homeMarkup);
  const hasRenderedCta = /class="[^"]*status-available/.test(homeMarkup) || homeMarkup.includes('Jetzt kaufen');
  record(
    'Purchase actions agree with the rendered pass state',
    renderedAvailable || !hasRenderedCta,
    renderedAvailable ? 'at least one pass is available' : hasRenderedCta ? 'buy CTA without an available pass' : 'absent for unavailable/unknown passes',
  );

  /*
   * The confirm page's island gets its strings inlined by `define:vars`. When
   * one was missing the lookup fell through to the key, so a failed
   * confirmation read "confirm.error" — in every language.
   */
  const confirm = await text('/confirm/');
  const hasRawKeys = /confirm\.(error|title)|unsub\.(error|title)/.test(confirm.body);
  record(
    'Confirm page ships translated copy, not translation keys',
    !hasRawKeys && confirm.body.includes('ungültig oder abgelaufen'),
    hasRawKeys ? 'raw i18n key inlined in the page' : 'translated error string present',
  );
}

async function checkProviderEndpoints() {
  // No Sec-Fetch-Site, no Origin, no Referer — a bare API client.
  for (const path of ['/api/wait-times', '/api/crowd-calendar', '/api/park-now']) {
    const { status } = await text(path);
    record(`${path} refuses anonymous clients`, status === 403, `got ${status}`);
  }
  const own = await text('/api/park-now', { 'Sec-Fetch-Site': 'same-origin' });
  record('/api/park-now still answers our own pages', own.status === 200, `got ${own.status}`);
}

async function checkMachineReadable() {
  const llms = await text('/llms.txt');
  record('llms.txt has no unresolved placeholders', !llms.body.includes('{year}'), 'no {year}');

  const full = await text('/llms-full.txt');
  record(
    'llms-full.txt is the larger of the two',
    full.body.length > llms.body.length,
    `llms.txt ${llms.body.length} B vs llms-full.txt ${full.body.length} B`,
  );
  record(
    'llms-full.txt covers the live services',
    /wait time/i.test(full.body),
    'wait times documented',
  );

  const robots = await text('/robots.txt');
  // Directives only. The file explains in a comment *why* anthropic-ai and
  // Claude-Web were removed, and a naive search for the strings flagged that
  // explanation as the very problem it documents.
  const userAgents = robots.body
    .split('\n')
    .filter((line) => /^\s*User-agent:/i.test(line))
    .join('\n');
  record(
    'robots.txt does not list dead tokens',
    !/anthropic-ai|Claude-Web/i.test(userAgents),
    'no retired user-agents declared',
  );
  record('robots.txt keeps provider data out of the index', /Disallow: \/api\//.test(robots.body), 'api disallowed');
}

async function checkStatusDrift() {
  const [live, home] = await Promise.all([text('/api/status'), text('/')]);
  if (live.status !== 200) {
    record('Status endpoint reachable', false, `got ${live.status}`, true);
    return;
  }
  const payload = JSON.parse(live.body) as Record<string, { state?: string }>;
  for (const type of ['silver', 'gold']) {
    const pill = home.body.match(new RegExp(`<[^>]+id="hero-pill-${type}"[^>]*>`))?.[0];
    const renderedState = pill?.match(/data-pass-state="([^"]+)"/)?.[1];
    const liveState = payload[type]?.state;
    const agrees = liveState === renderedState;
    record(`Rendered ${type} status matches the live endpoint`, agrees,
      `API ${liveState}; build ${renderedState || 'missing'}`, true);
  }
}

async function checkReleaseFeatures() {
  const home = await text('/');
  const answer = home.body.match(/<p[^>]*data-availability-answer[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim();
  const faqText = home.body.match(/<script[^>]*id="availability-faq-schema"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  const faqAnswer = faqText ? JSON.parse(faqText).mainEntity?.[1]?.acceptedAnswer?.text : undefined;
  record('Visible availability answer and FAQ schema agree', Boolean(answer) && answer === faqAnswer,
    answer === faqAnswer ? 'identical per-pass answer' : 'missing or divergent answer');
  record('Mobile navigation and licensed hero photo are published',
    home.body.includes('mobile-dock') && home.body.includes('/images/ep-voltron-') && home.body.includes('creativecommons.org/licenses/by-sa/4.0/'),
    'dock, local photo and license credit');
  const planner = await text('/europa-park-besuchsplaner/');
  record('Planner includes the local calendar export',
    planner.status === 200 && planner.body.includes('name="visit-date"') && planner.body.includes('data-calendar-download'),
    'optional date and explicit calendar button');
  const full = await text('/llms-full.txt');
  record('Machine-readable context documents both false alarms',
    full.body.includes('2026-03-19') && full.body.includes('2026-06-09'), 'March and June documented');
  if (process.env.DEPLOY_EXPECTED_REVISION) {
    const release = await text('/release.json');
    const revision = release.status === 200 ? JSON.parse(release.body).revision : null;
    record('Live release is the requested Git revision', revision === process.env.DEPLOY_EXPECTED_REVISION,
      `expected ${process.env.DEPLOY_EXPECTED_REVISION}; got ${revision}`);
  }
}

async function checkMcp() {
  if (process.env.DEPLOY_VERIFY_MCP !== '1') return;
  const { Client } = await import('@modelcontextprotocol/sdk/client/index.js');
  const { StreamableHTTPClientTransport } = await import('@modelcontextprotocol/sdk/client/streamableHttp.js');
  const client = new Client({ name: 'resortpass-release-check', version: '1.1.0' });
  try {
    await client.connect(new StreamableHTTPClientTransport(new URL(`${BASE}/api/mcp`), {
      requestInit: { signal: AbortSignal.timeout(15_000) },
    }));
    const { tools } = await client.listTools();
    const expected = ['get_status', 'find_guide', 'plan_visit'];
    record('MCP exposes exactly three read-only tools', tools.length === 3 && expected.every((name) =>
      tools.some((tool) => tool.name === name && tool.annotations?.readOnlyHint === true && tool.annotations?.destructiveHint === false)),
      tools.map((tool) => tool.name).join(', '));
    const status = await client.callTool({ name: 'get_status', arguments: { language: 'de' } });
    const result = status.structuredContent as { silver?: { state?: string }; gold?: { state?: string } } | undefined;
    record('MCP returns the public status', !status.isError && Boolean(result?.silver?.state && result?.gold?.state),
      `silver ${result?.silver?.state}; gold ${result?.gold?.state}`);
    const guide = await client.callTool({ name: 'find_guide', arguments: { language: 'de', topic: 'visitPlanner' } });
    record('MCP guide lookup succeeds', !guide.isError && Boolean(guide.structuredContent), 'own editorial guide');
    const plan = await client.callTool({ name: 'plan_visit', arguments: {
      language: 'de', date: '2026-12-31', days: 1, crowd: 'high', includesRulantica: true,
    } });
    const outline = plan.structuredContent as { recommendedDays?: number; dates?: { endExclusive?: string } } | undefined;
    record('MCP plan handles recommended duration and year boundary', !plan.isError && outline?.recommendedDays === 3 && outline.dates?.endExclusive === '2027-01-03',
      'three-day outline ending exclusively on January 3');
  } finally {
    await client.close();
  }
}

// -------------------------------------------------------------------- runner

const checks = [
  checkSoftFourOhFour,
  checkRedirects,
  checkRenderedContent,
  checkProviderEndpoints,
  checkMachineReadable,
  checkStatusDrift,
  checkReleaseFeatures,
  checkMcp,
];

for (const check of checks) {
  try {
    await check();
  } catch (error) {
    record(check.name, false, `threw: ${error instanceof Error ? error.message : String(error)}`);
  }
}

let failed = 0;
let warned = 0;
for (const result of results) {
  if (result.ok) {
    console.log(`  ok    ${result.name} — ${result.detail}`);
  } else if (result.warnOnly) {
    warned += 1;
    console.warn(`  warn  ${result.name} — ${result.detail}`);
  } else {
    failed += 1;
    console.error(`  FAIL  ${result.name} — ${result.detail}`);
  }
}

console.log(
  `\n${results.length - failed - warned} passed, ${warned} warning(s), ${failed} failed against ${BASE}`,
);
process.exit(failed > 0 ? 1 : 0);
