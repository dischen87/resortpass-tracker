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
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return { status: response.status, location: response.headers.get('location'), response };
}

async function text(path: string, headers: Record<string, string> = {}) {
  const response = await fetch(`${BASE}${path}`, { headers });
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
  record(
    'Home page states a real availability answer',
    /Ausverkauft|Jetzt verfügbar/.test(home.body),
    'answer present',
  );
  // Scripts are stripped first on purpose. The island carries the label as a
  // string so it can build the panel the moment the shop opens; what must not
  // exist is a rendered, crawlable purchase link while the pass is sold out.
  const homeMarkup = home.body.replace(/<script[\s\S]*?<\/script>/g, '');
  const hasRenderedCta = /class="[^"]*status-available/.test(homeMarkup) || homeMarkup.includes('Jetzt kaufen');
  record(
    'Home page does not render a purchase call to action while sold out',
    !hasRenderedCta,
    hasRenderedCta ? 'buy CTA present in markup' : 'absent from markup',
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
  const liveState = payload.silver?.state;
  const renderedSoldOut = home.body.includes('Ausverkauft');
  const agrees = liveState === 'sold_out' ? renderedSoldOut : liveState === 'available' ? !renderedSoldOut : true;
  record(
    'Rendered status matches the live endpoint',
    agrees,
    agrees
      ? `both say ${liveState}`
      : `endpoint says ${liveState} but the page was built with a different snapshot — update src/data/status-snapshot.ts and redeploy`,
    true,
  );
}

// -------------------------------------------------------------------- runner

const checks = [
  checkSoftFourOhFour,
  checkRedirects,
  checkRenderedContent,
  checkProviderEndpoints,
  checkMachineReadable,
  checkStatusDrift,
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
