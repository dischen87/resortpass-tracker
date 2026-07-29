export const supportedLanguages = [
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

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = 'de';
export const fallbackLanguage: SupportedLanguage = 'en';

export const intlLocales: Record<SupportedLanguage, string> = {
  de: 'de-CH',
  fr: 'fr-CH',
  it: 'it-CH',
  en: 'en-CH',
  nl: 'nl-NL',
  es: 'es-ES',
  sv: 'sv-SE',
  ro: 'ro-RO',
  cs: 'cs-CZ',
  pl: 'pl-PL',
  tr: 'tr-TR',
  da: 'da-DK',
  el: 'el-GR',
  pt: 'pt-PT',
  nb: 'nb-NO',
  he: 'he-IL',
  hu: 'hu-HU',
};

const supportedLanguageSet = new Set<string>(supportedLanguages);
const aliases: Record<string, SupportedLanguage> = {
  cz: 'cs',
  dk: 'da',
  gr: 'el',
  il: 'he',
  iw: 'he',
  no: 'nb',
  se: 'sv',
};

export function isSupportedLanguage(value: unknown): value is SupportedLanguage {
  return typeof value === 'string' && supportedLanguageSet.has(value);
}

/**
 * Missing locale values keep the historic German default. Explicit but unsupported
 * values fall back to English so a newly activated or malformed locale can never
 * accidentally receive German copy.
 */
export function normalizeLanguage(value: unknown): SupportedLanguage {
  if (value === undefined || value === null || value === '') return defaultLanguage;
  if (typeof value !== 'string') return fallbackLanguage;

  const normalized = value.trim().toLowerCase().replaceAll('_', '-');
  if (!normalized) return defaultLanguage;

  const canonical = aliases[normalized] || aliases[normalized.split('-')[0]] || normalized.split('-')[0];
  return isSupportedLanguage(canonical) ? canonical : fallbackLanguage;
}

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return lang === 'he';
}
