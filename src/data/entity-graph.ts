import { localeCodes, getLocaleDefinition, type LocaleCode } from '../i18n/locales';

/**
 * The site's entity anchors, emitted once per page.
 *
 * Answer engines have to work out who is speaking before they will name a
 * source. Until now nothing on the site said so in machine-readable form:
 * there was no Organization, no author, and not a single `sameAs` in the whole
 * build — while "Open Source" appeared twice in the visible copy without ever
 * linking to the repository.
 *
 * Just as important, this is the strongest available statement that the project
 * is *not* Europa-Park: `publisher` is always us, while the park and the shop
 * appear as separate entities we merely write about.
 */

export const SITE_URL = 'https://www.resortpass-europapark.ch';
export const REPO_URL = 'https://github.com/dischen87/resortpass-tracker';

/** Stable @id values so nodes can be referenced instead of repeated. */
export const ENTITY_IDS = {
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  author: `${SITE_URL}/#author`,
  europaPark: `${SITE_URL}/#europa-park`,
} as const;

export function buildEntityGraph(locale: LocaleCode, methodologyPath: string) {
  const localeTag = getLocaleDefinition(locale).bcp47;

  return [
    {
      '@type': 'Organization',
      '@id': ENTITY_IDS.organization,
      name: 'ResortPass Tracker',
      url: SITE_URL,
      description:
        'Independent, non-commercial community project that monitors Europa-Park ResortPass availability and publishes attraction wait times, a crowd forecast and trip-planning guides.',
      sameAs: [REPO_URL],
      founder: { '@id': ENTITY_IDS.author },
      // No advertising, no affiliate income, no tracking — stated in a form a
      // machine can read, because it is the reason to trust the price pages.
      nonprofitStatus: 'NonprofitType',
      knowsAbout: [
        'Europa-Park',
        'Europa-Park ResortPass',
        'Europa-Park wait times',
        'Europa-Park crowd forecast',
        'Rulantica',
      ],
      publishingPrinciples: `${SITE_URL}${methodologyPath}`,
    },
    {
      '@type': 'Person',
      '@id': ENTITY_IDS.author,
      name: 'Mathias Graf',
      url: `${SITE_URL}${methodologyPath}`,
      sameAs: [REPO_URL],
    },
    {
      '@type': 'WebSite',
      '@id': ENTITY_IDS.website,
      name: 'ResortPass Tracker',
      alternateName: 'Europa-Park ResortPass availability tracker',
      url: SITE_URL,
      inLanguage: localeCodes.map((code) => getLocaleDefinition(code).bcp47),
      publisher: { '@id': ENTITY_IDS.organization },
      // Declared here so pages can point `about` at one shared node instead of
      // each minting its own idea of what Europa-Park is.
      about: { '@id': ENTITY_IDS.europaPark },
    },
    {
      '@type': 'AmusementPark',
      '@id': ENTITY_IDS.europaPark,
      name: 'Europa-Park',
      url: 'https://www.europapark.de/',
      sameAs: ['https://www.wikidata.org/wiki/Q327180', 'https://en.wikipedia.org/wiki/Europa-Park'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Europa-Park-Straße 2',
        postalCode: '77977',
        addressLocality: 'Rust',
        addressRegion: 'Baden-Württemberg',
        addressCountry: 'DE',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 48.2660, longitude: 7.7220 },
      // This node exists as the subject we write about. It is deliberately not
      // the publisher of anything on this site.
      inLanguage: localeTag,
    },
  ];
}
