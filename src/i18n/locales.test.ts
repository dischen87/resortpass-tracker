import { describe, expect, test } from 'bun:test';
import {
  defaultLocale,
  getLocaleDefinition,
  getLocaleFromPathname,
  isLocaleCode,
  localeCodes,
  localeRegistry,
} from './locales';
import {
  getLangFromUrl,
  getLocaleFromUrl,
  getTranslation,
  hasTranslations,
  languages,
  t,
} from './translations';

describe('locale registry', () => {
  test('contains every target locale exactly once', () => {
    expect(localeCodes).toEqual([
      'de', 'fr', 'it', 'en', 'nl', 'es', 'sv', 'ro', 'cs',
      'pl', 'tr', 'da', 'el', 'pt', 'nb', 'he', 'hu',
    ]);
    expect(new Set(localeCodes).size).toBe(localeCodes.length);
    expect(Object.keys(localeRegistry).sort()).toEqual([...localeCodes].sort());
  });

  test('uses valid, unique locale metadata', () => {
    const prefixes = new Set<string>();
    for (const code of localeCodes) {
      const locale = getLocaleDefinition(code);
      expect(locale.code).toBe(code);
      expect(Intl.getCanonicalLocales(locale.bcp47)).toHaveLength(1);
      expect(locale.hreflang).toBe(code);
      expect(locale.ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
      expect(locale.nativeName.trim().length).toBeGreaterThan(0);

      if (code === defaultLocale) {
        expect(locale.pathPrefix).toBe('');
      } else {
        expect(locale.pathPrefix).not.toBe('');
        expect(prefixes.has(locale.pathPrefix)).toBe(false);
        prefixes.add(locale.pathPrefix);
      }
    }
  });

  test('marks Hebrew as RTL and all other target locales as LTR', () => {
    for (const code of localeCodes) {
      expect(getLocaleDefinition(code).direction).toBe(code === 'he' ? 'rtl' : 'ltr');
    }
  });

  test('recognizes locale prefixes without treating arbitrary paths as locales', () => {
    expect(getLocaleFromPathname('/he/')).toBe('he');
    expect(getLocaleFromPathname('/nb/reiseplan/')).toBe('nb');
    expect(getLocaleFromPathname('/wartezeiten/')).toBe('de');
    expect(getLocaleFromPathname('/unknown/')).toBe('de');
    expect(isLocaleCode('cs')).toBe(true);
    expect(isLocaleCode('cz')).toBe(false);
  });
});

describe('translation compatibility', () => {
  test('exposes every registered locale as a fully translated language', () => {
    expect(languages).toEqual(localeCodes);
    for (const locale of localeCodes) expect(hasTranslations(locale)).toBe(true);
  });

  test('returns the full translated locale from localized URLs', () => {
    const url = new URL('https://www.resortpass-europapark.ch/he/');
    expect(getLocaleFromUrl(url)).toBe('he');
    expect(getLangFromUrl(url)).toBe('he');
  });

  test('uses native core copy without silently falling back to German', () => {
    expect(getTranslation('nl', 'nav.language')).toBe(t.nl['nav.language']);
    expect(getTranslation('nl', 'nav.language')).not.toBe(t.de['nav.language']);
    expect(getTranslation('he', 'nav.language')).toBe(t.he['nav.language']);
    expect(getTranslation('he', 'nav.language')).not.toBe(t.de['nav.language']);
    expect(getTranslation('he', 'missing.translation.key')).toBe('missing.translation.key');
  });

  test('keeps an identical, complete core key set in all 17 languages', () => {
    const expectedKeys = Object.keys(t.en).sort();
    expect(expectedKeys).toHaveLength(284);

    for (const locale of localeCodes) {
      expect(Object.keys(t[locale]).sort()).toEqual(expectedKeys);
      expect(Object.values(t[locale]).every((value) => value.trim().length > 0)).toBe(true);
    }
  });

  test('preserves interpolation placeholders in every translation', () => {
    const placeholders = (value: string) =>
      [...value.matchAll(/\{[^}]+\}/g)].map((match) => match[0]).sort();

    for (const locale of localeCodes) {
      for (const [key, englishValue] of Object.entries(t.en)) {
        expect(placeholders(t[locale][key]!)).toEqual(placeholders(englishValue));
      }
    }
  });
});
