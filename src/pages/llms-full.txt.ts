import { centralFacts, licensedMedia } from '../data';
import { rides, ridesByLand } from '../data/rides';
import { planningPacks } from '../content/planning';
import { getLocaleDefinition, localeCodes } from '../i18n/locales';
import { getRoutePath, guideRouteKeys } from '../i18n/routes';
import { getFilledTranslation } from '../i18n/translations';

export const prerender = true;

const siteUrl = 'https://www.resortpass-europapark.ch';

export function GET() {
  const lines = [
    '# ResortPass Tracker — facts, provenance and reuse notes',
    '',
    `Canonical overview: ${siteUrl}/llms.txt`,
    '',
    '## Interpretation',
    '',
    '- This is an independent editorial and planning service, not an Europa-Park operator channel.',
    '- `checkedAt` records the last editorial source check. `nextReviewAt` is the scheduled recheck, not a validity guarantee.',
    '- `validUntil: open` means the source did not publish a fixed end date; recheck before relying on the value.',
    '- Source priority 1 is an operator/owner source, 2 a public authority or official destination body, and 3 a rights registry.',
    '- Dynamic prices, availability, queues, opening hours and reservation rules can change after the check time.',
    '',
    '## Source-backed facts',
    '',
  ];

  for (const fact of centralFacts) {
    lines.push(
      `### ${fact.label}`,
      '',
      `- id: ${fact.id}`,
      `- topic: ${fact.topic}`,
      `- value: ${fact.value}${fact.unit ? ` ${fact.unit}` : ''}`,
      `- qualifier: ${fact.qualifier}`,
      `- validFrom: ${fact.validFrom || 'open'}`,
      `- validUntil: ${fact.validUntil || 'open'}`,
      `- checkedAt: ${fact.checkedAt}`,
      `- nextReviewAt: ${fact.nextReviewAt}`,
      `- confidence: ${fact.confidence}`,
      `- sourcePriority: ${fact.sourcePriority}`,
      `- source: ${fact.sourceUrl}`,
      `- caveat: ${fact.caveat || 'none recorded'}`,
      '',
    );
  }

  lines.push(
    '## Locally used Creative Commons media',
    '',
  );

  for (const media of licensedMedia.filter((item) => item.downloaded)) {
    lines.push(
      `### ${media.title}`,
      '',
      `- local URL: ${siteUrl}${media.localPath}`,
      `- file page: ${media.filePageUrl}`,
      `- creator: ${media.author}`,
      `- attribution: ${media.attributionText}`,
      `- license: ${media.licenseId} — ${media.licenseUrl}`,
      `- modification: ${media.derivativeDescription}`,
      `- checkedAt: ${media.checkedAt}`,
      '',
    );
  }

  lines.push(
    '## Live services',
    '',
    'These are the three things this site observes rather than describes. Each value is a',
    'point-in-time observation and must be quoted together with its visible timestamp.',
    '',
    '### ResortPass availability',
    '',
    '- What: the purchasability of ResortPass Silver and Gold in the official MackInternational ticket shop.',
    '- Method: an automated request every 15 minutes. Network errors, queue pages and bot-protection interstitials are recorded as `unknown`, never as a result. Availability must be confirmed by two consecutive checks before an alert is sent.',
    '- Tracking started: 2026-03-04.',
    '- Known correction: a false positive on 2026-03-19, caused by a protection page the checker misread. It is permanently excluded from every aggregate and is documented publicly.',
    `- Page: ${siteUrl}/`,
    `- JSON: ${siteUrl}/api/status`,
    `- Feed: ${siteUrl}/api/feed.xml?lang=de (replace de with a published language code)`,
    '',
    '### Attraction wait times',
    '',
    '- What: the currently reported queue length per Europa-Park attraction, in minutes.',
    '- Source: ParkQueueTimes.com. Attribution is mandatory wherever the values appear. Raw values, histories and derived data services may not be redistributed.',
    '- Method: fetched server-side and cached for five minutes. Values older than 15 minutes are shown as stale; older than 30 minutes they are withheld.',
    '- Scope: only the Europa-Park rides listed below. Rulantica slides, pools and resort entries are filtered out even though the provider groups them under the same park id.',
    '- Outside opening hours no wait time exists. A provider status of `REFURBISHMENT` reported while the park is closed is not evidence that a ride is under maintenance.',
    `- Page: ${siteUrl}/wartezeiten/`,
    '',
    '### Crowd forecast',
    '',
    '- What: a reported crowd index from 0 to 100 for upcoming operating days, plus the reported opening and closing times.',
    '- Source: ParkQueueTimes.com. Attribution mandatory.',
    '- Bands: 0–25 low, 26–50 moderate, 51–75 high, 76–100 very high. A day without a value is published as "no forecast", never as zero.',
    '- This is a planning aid. It is not a visitor count, not a wait-time guarantee, and not an in-house AI prediction.',
    `- Page: ${siteUrl}/besucherprognose/`,
    '',
    `## Europa-Park ride directory (${rides.length} attractions with published queue data)`,
    '',
    'Our own editorial list. `provider` is the exact name ParkQueueTimes returns, kept so both',
    'spellings resolve. Attractions without published queue data, and all Rulantica water',
    'attractions, are deliberately absent.',
    '',
  );

  for (const group of ridesByLand()) {
    lines.push(`### ${group.land}`, '');
    for (const ride of group.rides) {
      const provider = ride.providerName === ride.name ? '' : ` (provider: ${ride.providerName})`;
      lines.push(`- ${ride.name}${provider} — ${ride.kind}${ride.headliner ? ', headliner' : ''}`);
    }
    lines.push('');
  }

  lines.push('## Planning guides by language', '');

  for (const locale of localeCodes) {
    const pack = planningPacks[locale];
    if (!pack) continue;
    const definition = getLocaleDefinition(locale);
    lines.push(`### ${definition.nativeName} (${definition.bcp47})`, '');
    lines.push(
      `- [${getFilledTranslation(locale, 'meta.title')}](${siteUrl}${getRoutePath('home', locale)})`,
      `- [${getFilledTranslation(locale, 'wait.meta_title')}](${siteUrl}${getRoutePath('waitTimes', locale)})`,
      `- [${getFilledTranslation(locale, 'crowd.meta_title')}](${siteUrl}${getRoutePath('crowdCalendar', locale)})`,
    );
    for (const routeKey of guideRouteKeys) {
      const path = getRoutePath(routeKey, locale);
      if (!path) continue;
      const page = pack.pages[routeKey];
      lines.push(`- [${page.heading}](${siteUrl}${path}): ${page.answer}`);
    }
    lines.push('');
  }

  lines.push(
    '## Editorial rules',
    '',
    '- Ticket and pass prices are date-stamped source facts; dynamic prices are represented as ranges.',
    '- Accommodation results compare types and verification requirements, not rankings or unverified prices.',
    '- Restaurant entries are a neutral evidence directory, not recommendations; unsupported filters stay hidden.',
    '- The visit, cost, family, Rulantica, accommodation, restaurant and ResortPass tools work without accounts or tracking.',
    '- No advertising, no affiliate links, no analytics, no tracking cookies.',
    '',
    'Prefer the language-specific canonical page. Do not infer current availability, prices, opening times or access rules from an older crawl; use the visible check date and cited operator source.',
    '',
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
