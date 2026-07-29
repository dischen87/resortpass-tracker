import {
  defaultLocale,
  getLocaleDefinition,
  isLocaleCode,
  localeCodes,
  type LocaleCode,
} from './locales';

export type RoutePaths = Partial<Record<LocaleCode, string>>;

interface RouteDefinition {
  /** Paths listed here are published. Missing locales must not receive alternates. */
  paths: RoutePaths;
  indexable: boolean;
}

type LocalizedSlugs = Record<LocaleCode, string>;

function localizedGuidePaths(slugs: LocalizedSlugs): Record<LocaleCode, string> {
  return Object.fromEntries(localeCodes.map((locale) => {
    const prefix = getLocaleDefinition(locale).pathPrefix;
    const path = [prefix, slugs[locale]].filter(Boolean).join('/');
    return [locale, `/${path}/`];
  })) as Record<LocaleCode, string>;
}

export const guideRouteKeys = [
  'parkGuide',
  'visitPlanner',
  'costCalculator',
  'familyGuide',
  'rulanticaGuide',
  'stayGuide',
  'restaurantGuide',
  'resortPassGuide',
  'resortPassCompare',
  'resortPassPrices',
  'resortPassReservation',
  'resortPassRulantica',
] as const;

export type GuideRouteKey = (typeof guideRouteKeys)[number];

/**
 * Semantic route keys are the single source of truth for localized URLs.
 *
 * Adding a localized slug here is an explicit publication step: Layout and the
 * language switcher will start advertising it immediately. Do not add a path
 * until the corresponding Astro page exists.
 */
export const routeRegistry = {
  home: {
    indexable: true,
    paths: {
      de: '/',
      fr: '/fr/',
      it: '/it/',
      en: '/en/',
    },
  },
  waitTimes: {
    indexable: true,
    paths: {
      de: '/wartezeiten/',
      fr: '/fr/wartezeiten/',
      it: '/it/wartezeiten/',
      en: '/en/wartezeiten/',
    },
  },
  crowdCalendar: {
    indexable: true,
    paths: {
      de: '/besucherprognose/',
      fr: '/fr/affluence/',
      it: '/it/affluenza/',
      en: '/en/crowd-calendar/',
    },
  },
  imprint: {
    indexable: true,
    paths: {
      de: '/impressum/',
      fr: '/fr/impressum/',
      it: '/it/impressum/',
      en: '/en/impressum/',
    },
  },
  confirm: {
    indexable: false,
    paths: {
      de: '/confirm/',
      fr: '/fr/confirm/',
      it: '/it/confirm/',
      en: '/en/confirm/',
    },
  },
  unsubscribe: {
    indexable: false,
    paths: {
      de: '/unsubscribe/',
      fr: '/fr/unsubscribe/',
      it: '/it/unsubscribe/',
      en: '/en/unsubscribe/',
    },
  },
  communityNew: {
    indexable: false,
    paths: {
      de: '/community/neu/',
      fr: '/fr/community/neu/',
      it: '/it/community/neu/',
      en: '/en/community/neu/',
    },
  },
  parkGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'europa-park-guide',
      fr: 'guide-europa-park',
      it: 'guida-europa-park',
      en: 'europa-park-guide',
      nl: 'europa-park-gids',
      es: 'guia-europa-park',
      sv: 'europa-park-guide',
      ro: 'ghid-europa-park',
      cs: 'pruvodce-europa-park',
      pl: 'przewodnik-europa-park',
      tr: 'europa-park-rehberi',
      da: 'europa-park-guide',
      el: 'odigos-europa-park',
      pt: 'guia-europa-park',
      nb: 'europa-park-guide',
      he: 'מדריך-europa-park',
      hu: 'europa-park-utmutato',
    }),
  },
  visitPlanner: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'europa-park-besuchsplaner',
      fr: 'planificateur-visite-europa-park',
      it: 'pianifica-visita-europa-park',
      en: 'europa-park-visit-planner',
      nl: 'europa-park-bezoekplanner',
      es: 'planificador-visita-europa-park',
      sv: 'europa-park-besoksplanerare',
      ro: 'planificator-vizita-europa-park',
      cs: 'planovac-navstevy-europa-park',
      pl: 'planer-wizyty-europa-park',
      tr: 'europa-park-ziyaret-planlayici',
      da: 'europa-park-besogsplanlaegger',
      el: 'schediasmos-episkepsis-europa-park',
      pt: 'planeador-visita-europa-park',
      nb: 'europa-park-besoksplanlegger',
      he: 'מתכנן-ביקור-europa-park',
      hu: 'europa-park-latogatas-tervezo',
    }),
  },
  costCalculator: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'europa-park-kostenrechner',
      fr: 'calculateur-budget-europa-park',
      it: 'calcolatore-costi-europa-park',
      en: 'europa-park-cost-calculator',
      nl: 'europa-park-kostencalculator',
      es: 'calculadora-costes-europa-park',
      sv: 'europa-park-kostnadskalkylator',
      ro: 'calculator-costuri-europa-park',
      cs: 'kalkulacka-nakladu-europa-park',
      pl: 'kalkulator-kosztow-europa-park',
      tr: 'europa-park-maliyet-hesaplayici',
      da: 'europa-park-prisberegner',
      el: 'ypologistis-kostous-europa-park',
      pt: 'calculadora-custos-europa-park',
      nb: 'europa-park-kostnadskalkulator',
      he: 'מחשבון-עלויות-europa-park',
      hu: 'europa-park-koltsegkalkulator',
    }),
  },
  familyGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'europa-park-mit-kindern',
      fr: 'europa-park-avec-enfants',
      it: 'europa-park-con-bambini',
      en: 'europa-park-with-kids',
      nl: 'europa-park-met-kinderen',
      es: 'europa-park-con-ninos',
      sv: 'europa-park-med-barn',
      ro: 'europa-park-cu-copii',
      cs: 'europa-park-s-detmi',
      pl: 'europa-park-z-dziecmi',
      tr: 'cocuklarla-europa-park',
      da: 'europa-park-med-born',
      el: 'europa-park-me-paidia',
      pt: 'europa-park-com-criancas',
      nb: 'europa-park-med-barn',
      he: 'europa-park-עם-ילדים',
      hu: 'europa-park-gyerekekkel',
    }),
  },
  rulanticaGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'rulantica-guide',
      fr: 'guide-rulantica',
      it: 'guida-rulantica',
      en: 'rulantica-guide',
      nl: 'rulantica-gids',
      es: 'guia-rulantica',
      sv: 'rulantica-guide',
      ro: 'ghid-rulantica',
      cs: 'pruvodce-rulantica',
      pl: 'przewodnik-rulantica',
      tr: 'rulantica-rehberi',
      da: 'rulantica-guide',
      el: 'odigos-rulantica',
      pt: 'guia-rulantica',
      nb: 'rulantica-guide',
      he: 'מדריך-rulantica',
      hu: 'rulantica-utmutato',
    }),
  },
  stayGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'uebernachten-europa-park',
      fr: 'hebergement-europa-park',
      it: 'dove-dormire-europa-park',
      en: 'where-to-stay-europa-park',
      nl: 'overnachten-bij-europa-park',
      es: 'donde-alojarse-europa-park',
      sv: 'boende-nara-europa-park',
      ro: 'cazare-langa-europa-park',
      cs: 'ubytovani-u-europa-park',
      pl: 'noclegi-blisko-europa-park',
      tr: 'europa-park-yakininda-konaklama',
      da: 'overnatning-naer-europa-park',
      el: 'diamoni-konta-sto-europa-park',
      pt: 'alojamento-perto-europa-park',
      nb: 'overnatting-naer-europa-park',
      he: 'לינה-ליד-europa-park',
      hu: 'szallas-europa-park-kozeleben',
    }),
  },
  restaurantGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'restaurants-europa-park-rust',
      fr: 'restaurants-europa-park-rust',
      it: 'ristoranti-europa-park-rust',
      en: 'restaurants-near-europa-park',
      nl: 'restaurants-bij-europa-park',
      es: 'restaurantes-cerca-europa-park',
      sv: 'restauranger-nara-europa-park',
      ro: 'restaurante-langa-europa-park',
      cs: 'restaurace-u-europa-park',
      pl: 'restauracje-blisko-europa-park',
      tr: 'europa-park-yakininda-restoranlar',
      da: 'restauranter-naer-europa-park',
      el: 'estiatoria-konta-sto-europa-park',
      pt: 'restaurantes-perto-europa-park',
      nb: 'restauranter-naer-europa-park',
      he: 'מסעדות-ליד-europa-park',
      hu: 'ettermek-europa-park-kozeleben',
    }),
  },
  resortPassGuide: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'resortpass-guide',
      fr: 'guide-resortpass',
      it: 'guida-resortpass',
      en: 'resortpass-guide',
      nl: 'resortpass-gids',
      es: 'guia-resortpass',
      sv: 'resortpass-guide',
      ro: 'ghid-resortpass',
      cs: 'pruvodce-resortpass',
      pl: 'przewodnik-resortpass',
      tr: 'resortpass-rehberi',
      da: 'resortpass-guide',
      el: 'odigos-resortpass',
      pt: 'guia-resortpass',
      nb: 'resortpass-guide',
      he: 'מדריך-resortpass',
      hu: 'resortpass-utmutato',
    }),
  },
  resortPassCompare: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'resortpass-silver-oder-gold',
      fr: 'resortpass-silver-ou-gold',
      it: 'resortpass-silver-o-gold',
      en: 'resortpass-silver-vs-gold',
      nl: 'resortpass-silver-of-gold',
      es: 'resortpass-silver-o-gold',
      sv: 'resortpass-silver-eller-gold',
      ro: 'resortpass-silver-sau-gold',
      cs: 'resortpass-silver-nebo-gold',
      pl: 'resortpass-silver-czy-gold',
      tr: 'resortpass-silver-veya-gold',
      da: 'resortpass-silver-eller-gold',
      el: 'resortpass-silver-i-gold',
      pt: 'resortpass-silver-ou-gold',
      nb: 'resortpass-silver-eller-gold',
      he: 'resortpass-silver-או-gold',
      hu: 'resortpass-silver-vagy-gold',
    }),
  },
  resortPassPrices: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'resortpass-preise',
      fr: 'prix-resortpass',
      it: 'prezzi-resortpass',
      en: 'resortpass-prices',
      nl: 'resortpass-prijzen',
      es: 'precios-resortpass',
      sv: 'resortpass-priser',
      ro: 'preturi-resortpass',
      cs: 'ceny-resortpass',
      pl: 'ceny-resortpass',
      tr: 'resortpass-fiyatlari',
      da: 'resortpass-priser',
      el: 'times-resortpass',
      pt: 'precos-resortpass',
      nb: 'resortpass-priser',
      he: 'מחירי-resortpass',
      hu: 'resortpass-arak',
    }),
  },
  resortPassReservation: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'resortpass-reservierung',
      fr: 'reservation-resortpass',
      it: 'prenotazione-resortpass',
      en: 'resortpass-reservation',
      nl: 'resortpass-reserveren',
      es: 'reserva-resortpass',
      sv: 'resortpass-bokning',
      ro: 'rezervare-resortpass',
      cs: 'rezervace-resortpass',
      pl: 'rezerwacja-resortpass',
      tr: 'resortpass-rezervasyonu',
      da: 'resortpass-reservation',
      el: 'kratisi-resortpass',
      pt: 'reserva-resortpass',
      nb: 'resortpass-reservasjon',
      he: 'הזמנת-resortpass',
      hu: 'resortpass-foglalas',
    }),
  },
  resortPassRulantica: {
    indexable: true,
    paths: localizedGuidePaths({
      de: 'resortpass-rulantica',
      fr: 'resortpass-rulantica',
      it: 'resortpass-rulantica',
      en: 'resortpass-rulantica',
      nl: 'resortpass-rulantica',
      es: 'resortpass-rulantica',
      sv: 'resortpass-rulantica',
      ro: 'resortpass-rulantica',
      cs: 'resortpass-rulantica',
      pl: 'resortpass-rulantica',
      tr: 'resortpass-rulantica',
      da: 'resortpass-rulantica',
      el: 'resortpass-rulantica',
      pt: 'resortpass-rulantica',
      nb: 'resortpass-rulantica',
      he: 'resortpass-rulantica',
      hu: 'resortpass-rulantica',
    }),
  },
} as const satisfies Record<string, RouteDefinition>;

export type RouteKey = keyof typeof routeRegistry;

export interface RouteAlternate {
  locale: LocaleCode;
  path: string;
}

export interface ResolvedRouteAlternates {
  routeKey?: RouteKey;
  alternates: RouteAlternate[];
  xDefaultPath?: string;
}

export function normalizeRoutePath(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || '/';
  const withLeadingSlash = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  if (withLeadingSlash === '/') return withLeadingSlash;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function getRoutePath(routeKey: RouteKey, locale: LocaleCode): string | undefined {
  const paths = routeRegistry[routeKey].paths as RoutePaths;
  const path = paths[locale];
  return path ? normalizeRoutePath(path) : undefined;
}

export function getRouteAlternates(routeKey: RouteKey): RouteAlternate[] {
  return localeCodes.flatMap((locale) => {
    const path = getRoutePath(routeKey, locale);
    return path ? [{ locale, path }] : [];
  });
}

export function getXDefaultPath(routeKey: RouteKey): string | undefined {
  return getRoutePath(routeKey, defaultLocale);
}

export function findRouteKeyByPath(pathname: string): RouteKey | undefined {
  const normalizedPath = normalizeRoutePath(pathname);
  for (const routeKey of Object.keys(routeRegistry) as RouteKey[]) {
    if (getRouteAlternates(routeKey).some(({ path }) => path === normalizedPath)) {
      return routeKey;
    }
  }
  return undefined;
}

function normalizedExplicitPaths(paths?: RoutePaths): RoutePaths {
  if (!paths) return {};
  const normalized: RoutePaths = {};
  for (const [locale, path] of Object.entries(paths)) {
    if (isLocaleCode(locale) && typeof path === 'string' && path.trim()) {
      normalized[locale] = normalizeRoutePath(path);
    }
  }
  return normalized;
}

/**
 * Resolves only explicitly published paths. Unlike the previous implementation,
 * this never invents a same-slug URL for another locale.
 */
export function resolveRouteAlternates({
  pathname,
  routeKey,
  explicitPaths,
}: {
  pathname: string;
  routeKey?: RouteKey;
  explicitPaths?: RoutePaths;
}): ResolvedRouteAlternates {
  const resolvedRouteKey = routeKey || findRouteKeyByPath(pathname);
  const registryPaths: RoutePaths = resolvedRouteKey
    ? { ...(routeRegistry[resolvedRouteKey].paths as RoutePaths) }
    : {};
  const paths = { ...registryPaths, ...normalizedExplicitPaths(explicitPaths) };

  const alternates = localeCodes.flatMap((locale) => {
    const path = paths[locale];
    return path ? [{ locale, path: normalizeRoutePath(path) }] : [];
  });

  return {
    routeKey: resolvedRouteKey,
    alternates,
    xDefaultPath: paths[defaultLocale]
      ? normalizeRoutePath(paths[defaultLocale])
      : resolvedRouteKey
        ? getXDefaultPath(resolvedRouteKey)
        : undefined,
  };
}

export function getRequiredRoutePaths<const Locales extends readonly LocaleCode[]>(
  routeKey: RouteKey,
  locales: Locales,
): { [Locale in Locales[number]]: string } {
  const result: Partial<Record<LocaleCode, string>> = {};
  for (const locale of locales) {
    const path = getRoutePath(routeKey, locale);
    if (!path) {
      throw new Error(`Missing published path for route "${routeKey}" and locale "${locale}"`);
    }
    result[locale] = path;
  }
  return result as { [Locale in Locales[number]]: string };
}
