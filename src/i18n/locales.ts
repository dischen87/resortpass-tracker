export const localeCodes = [
  'de',
  'fr',
  'it',
  'en',
  'nl',
  'es',
  'sv',
  'ro',
  'cs',
  'pl',
  'tr',
  'da',
  'el',
  'pt',
  'nb',
  'he',
  'hu',
] as const;

export type LocaleCode = (typeof localeCodes)[number];
export type TextDirection = 'ltr' | 'rtl';

export interface LocaleDefinition {
  code: LocaleCode;
  /** BCP 47 tag used by HTML and Intl APIs. */
  bcp47: string;
  /** Language-only tag used for hreflang clusters. */
  hreflang: string;
  /** Open Graph locale uses an underscore between language and territory. */
  ogLocale: string;
  nativeName: string;
  direction: TextDirection;
  /** Empty for the default locale, otherwise the first URL path segment. */
  pathPrefix: string;
}

export const defaultLocale = 'de' as const satisfies LocaleCode;

export const localeRegistry: Record<LocaleCode, LocaleDefinition> = {
  de: {
    code: 'de',
    bcp47: 'de-CH',
    hreflang: 'de',
    ogLocale: 'de_CH',
    nativeName: 'Deutsch',
    direction: 'ltr',
    pathPrefix: '',
  },
  fr: {
    code: 'fr',
    bcp47: 'fr-CH',
    hreflang: 'fr',
    ogLocale: 'fr_CH',
    nativeName: 'Français',
    direction: 'ltr',
    pathPrefix: 'fr',
  },
  it: {
    code: 'it',
    bcp47: 'it-CH',
    hreflang: 'it',
    ogLocale: 'it_CH',
    nativeName: 'Italiano',
    direction: 'ltr',
    pathPrefix: 'it',
  },
  en: {
    code: 'en',
    bcp47: 'en-GB',
    hreflang: 'en',
    ogLocale: 'en_GB',
    nativeName: 'English',
    direction: 'ltr',
    pathPrefix: 'en',
  },
  nl: {
    code: 'nl',
    bcp47: 'nl-NL',
    hreflang: 'nl',
    ogLocale: 'nl_NL',
    nativeName: 'Nederlands',
    direction: 'ltr',
    pathPrefix: 'nl',
  },
  es: {
    code: 'es',
    bcp47: 'es-ES',
    hreflang: 'es',
    ogLocale: 'es_ES',
    nativeName: 'Español',
    direction: 'ltr',
    pathPrefix: 'es',
  },
  sv: {
    code: 'sv',
    bcp47: 'sv-SE',
    hreflang: 'sv',
    ogLocale: 'sv_SE',
    nativeName: 'Svenska',
    direction: 'ltr',
    pathPrefix: 'sv',
  },
  ro: {
    code: 'ro',
    bcp47: 'ro-RO',
    hreflang: 'ro',
    ogLocale: 'ro_RO',
    nativeName: 'Română',
    direction: 'ltr',
    pathPrefix: 'ro',
  },
  cs: {
    code: 'cs',
    bcp47: 'cs-CZ',
    hreflang: 'cs',
    ogLocale: 'cs_CZ',
    nativeName: 'Čeština',
    direction: 'ltr',
    pathPrefix: 'cs',
  },
  pl: {
    code: 'pl',
    bcp47: 'pl-PL',
    hreflang: 'pl',
    ogLocale: 'pl_PL',
    nativeName: 'Polski',
    direction: 'ltr',
    pathPrefix: 'pl',
  },
  tr: {
    code: 'tr',
    bcp47: 'tr-TR',
    hreflang: 'tr',
    ogLocale: 'tr_TR',
    nativeName: 'Türkçe',
    direction: 'ltr',
    pathPrefix: 'tr',
  },
  da: {
    code: 'da',
    bcp47: 'da-DK',
    hreflang: 'da',
    ogLocale: 'da_DK',
    nativeName: 'Dansk',
    direction: 'ltr',
    pathPrefix: 'da',
  },
  el: {
    code: 'el',
    bcp47: 'el-GR',
    hreflang: 'el',
    ogLocale: 'el_GR',
    nativeName: 'Ελληνικά',
    direction: 'ltr',
    pathPrefix: 'el',
  },
  pt: {
    code: 'pt',
    bcp47: 'pt-PT',
    hreflang: 'pt',
    ogLocale: 'pt_PT',
    nativeName: 'Português',
    direction: 'ltr',
    pathPrefix: 'pt',
  },
  nb: {
    code: 'nb',
    bcp47: 'nb-NO',
    hreflang: 'nb',
    ogLocale: 'nb_NO',
    nativeName: 'Norsk bokmål',
    direction: 'ltr',
    pathPrefix: 'nb',
  },
  he: {
    code: 'he',
    bcp47: 'he-IL',
    hreflang: 'he',
    ogLocale: 'he_IL',
    nativeName: 'עברית',
    direction: 'rtl',
    pathPrefix: 'he',
  },
  hu: {
    code: 'hu',
    bcp47: 'hu-HU',
    hreflang: 'hu',
    ogLocale: 'hu_HU',
    nativeName: 'Magyar',
    direction: 'ltr',
    pathPrefix: 'hu',
  },
};

const localeCodeSet = new Set<string>(localeCodes);
const localeByPathPrefix = new Map(
  localeCodes
    .map((code) => localeRegistry[code])
    .filter((locale) => locale.pathPrefix)
    .map((locale) => [locale.pathPrefix, locale.code] as const),
);

export function isLocaleCode(value: string | undefined | null): value is LocaleCode {
  return typeof value === 'string' && localeCodeSet.has(value);
}

export function getLocaleDefinition(locale: LocaleCode): LocaleDefinition {
  return localeRegistry[locale];
}

export function getLocaleFromPathname(pathname: string): LocaleCode {
  const firstSegment = pathname.split(/[?#]/, 1)[0].split('/').filter(Boolean)[0];
  return (firstSegment && localeByPathPrefix.get(firstSegment)) || defaultLocale;
}
