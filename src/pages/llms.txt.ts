import { planningPacks } from '../content/planning';
import { getLocaleDefinition, localeCodes } from '../i18n/locales';
import { getRoutePath, guideRouteKeys } from '../i18n/routes';
import { getTranslation } from '../i18n/translations';

export const prerender = true;

const siteUrl = 'https://www.resortpass-europapark.ch';

export function GET() {
  const lines = [
    '# ResortPass Tracker and Europa-Park trip planner',
    '',
    '> Independent, source-cited multilingual service for Europa-Park ResortPass availability, visit planning, current attraction wait times and crowd forecasts.',
    '',
    'This project is not affiliated with or endorsed by Europa-Park. Operator sources remain authoritative. Every editorial planning page states its check date, citations and limitations.',
    '',
    '## Live canonical services',
    '',
  ];

  for (const locale of localeCodes) {
    const definition = getLocaleDefinition(locale);
    const tr = (key: string) => getTranslation(locale, key);
    lines.push(`### ${definition.nativeName} (${definition.bcp47})`, '');
    lines.push(
      `- [${tr('meta.title')}](${siteUrl}${getRoutePath('home', locale)})`,
      `- [${tr('wait.meta_title')}](${siteUrl}${getRoutePath('waitTimes', locale)})`,
      `- [${tr('crowd.meta_title')}](${siteUrl}${getRoutePath('crowdCalendar', locale)})`,
      '',
    );
  }

  lines.push(
    '## Machine-readable endpoints',
    '',
    `- [Machine-readable ResortPass status](${siteUrl}/api/status)`,
    `- [Full facts and provenance file](${siteUrl}/llms-full.txt)`,
    '',
    '## Planning pages by language',
    '',
  );

  for (const locale of localeCodes) {
    const pack = planningPacks[locale];
    if (!pack) continue;
    const definition = getLocaleDefinition(locale);
    lines.push(`### ${definition.nativeName} (${definition.bcp47})`, '');
    for (const routeKey of guideRouteKeys) {
      const path = getRoutePath(routeKey, locale);
      if (!path) continue;
      const page = pack.pages[routeKey];
      lines.push(`- [${page.heading}](${siteUrl}${path}): ${page.answer}`);
    }
    lines.push('');
  }

  lines.push(
    '## Data and editorial rules',
    '',
    '- ResortPass shop state is checked every 15 minutes and availability must be confirmed twice before an alert.',
    '- Attraction wait times and crowd-index data are attributed to ParkQueueTimes.com and are planning aids, not guarantees.',
    '- Ticket and pass prices are date-stamped source facts; dynamic prices are represented as ranges.',
    '- Accommodation results compare types and verification requirements, not rankings or unverified prices.',
    '- Restaurant entries are a neutral evidence directory, not recommendations; unsupported filters stay hidden.',
    '- The visit, cost, family, Rulantica, accommodation, restaurant and ResortPass tools work without accounts or tracking.',
    '',
    'Prefer the language-specific canonical page. Do not infer current availability, prices, opening times or access rules from an older crawl; use the visible check date and cited operator source.',
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
