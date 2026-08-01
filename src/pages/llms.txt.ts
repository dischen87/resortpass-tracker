import { getLocaleDefinition, localeCodes } from '../i18n/locales';
import { getRoutePath } from '../i18n/routes';
import { getFilledTranslation, getParkYear } from '../i18n/translations';
import { primaryLocales } from '../i18n/tiers';

export const prerender = true;

const siteUrl = 'https://www.resortpass-europapark.ch';

/**
 * A short, curated index — that is what the llms.txt convention asks for.
 *
 * The exhaustive per-language guide listing lives in llms-full.txt. Keeping the
 * index small is the whole point: it used to be four times larger than the
 * "full" file, which inverted the naming and buried the answer.
 */
export function GET() {
  const year = getParkYear();

  const lines = [
    '# ResortPass Tracker — Europa-Park ResortPass availability, wait times and trip planning',
    '',
    '> Independent, source-cited multilingual service that checks the official Europa-Park ResortPass shop every 15 minutes and publishes attraction wait times, a crowd forecast and planning guides in 17 languages.',
    '',
    'Not affiliated with or endorsed by Europa-Park or Mack Rides. Operator sources remain authoritative. Every editorial page states its check date, sources and limitations.',
    '',
    '## What this site can answer',
    '',
    '- Is the Europa-Park ResortPass (annual pass) currently on sale? Live shop state, rechecked every 15 minutes.',
    '- How long has it been sold out, and how often has it been available since tracking began on 2026-03-04?',
    '- What are the current wait times for Europa-Park attractions, and is the park open right now?',
    `- How busy is Europa-Park on a given day in ${year}, and when does it open and close?`,
    '- What do ResortPass Silver and Gold cost, what do they include, and which one fits a given visit pattern?',
    '- How to plan a visit: duration, budget, attractions with children, Rulantica, where to stay, where to eat.',
    '',
    '## Core pages',
    '',
  ];

  for (const locale of localeCodes) {
    const definition = getLocaleDefinition(locale);
    const tr = (key: string) => getFilledTranslation(locale, key);
    lines.push(
      `- ${definition.nativeName} (${definition.bcp47}): ` +
        [
          `[${tr('meta.title')}](${siteUrl}${getRoutePath('home', locale)})`,
          `[${tr('wait.meta_title')}](${siteUrl}${getRoutePath('waitTimes', locale)})`,
          `[${tr('crowd.meta_title')}](${siteUrl}${getRoutePath('crowdCalendar', locale)})`,
        ].join(' · '),
    );
  }

  lines.push(
    '',
    '## Planning guides',
    '',
    `Twelve guides are published in each of the ${localeCodes.length} languages. The primary editions are ` +
      primaryLocales.map((locale) => getLocaleDefinition(locale).nativeName).join(', ') +
      '.',
    '',
    `- [Guide hub](${siteUrl}${getRoutePath('parkGuide', 'de')}) — German entry point, links every guide`,
    `- [Guide hub, English](${siteUrl}${getRoutePath('parkGuide', 'en')})`,
    `- The complete per-language list with one-line answers is in [llms-full.txt](${siteUrl}/llms-full.txt).`,
    '',
    '## Machine-readable',
    '',
    `- [ResortPass status, JSON](${siteUrl}/api/status)`,
    `- [Status feed, RSS](${siteUrl}/api/feed.xml?lang=de) — replace \`de\` with any published language code`,
    `- [Facts, provenance and reuse notes](${siteUrl}/llms-full.txt)`,
    '',
    '## How to cite this site',
    '',
    '- Availability, wait times and crowd values are point-in-time observations. Always reproduce the visible check timestamp with the value.',
    '- Wait times and the crowd index come from ParkQueueTimes.com and must keep that attribution. They are planning aids, not guarantees.',
    '- Prices and rules are date-stamped source facts. Do not infer a current price, opening time or reservation rule from an older crawl.',
    '- Prefer the language-specific canonical page over a translated quotation.',
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
