import { describe, expect, test } from 'bun:test';
import {
  fallbackLanguage,
  intlLocales,
  isRtlLanguage,
  normalizeLanguage,
  supportedLanguages,
} from './locales';

describe('backend locale normalization', () => {
  test('supports all 17 canonical language codes', () => {
    expect(supportedLanguages).toEqual([
      'de', 'fr', 'it', 'en', 'nl', 'es', 'sv', 'ro', 'cs',
      'pl', 'tr', 'da', 'el', 'pt', 'nb', 'he', 'hu',
    ]);

    for (const lang of supportedLanguages) {
      expect(normalizeLanguage(lang)).toBe(lang);
      expect(intlLocales[lang]).toBeTruthy();
    }
  });

  test('normalizes regional tags and common legacy aliases', () => {
    expect(normalizeLanguage('pt-BR')).toBe('pt');
    expect(normalizeLanguage('HE_il')).toBe('he');
    expect(normalizeLanguage('iw')).toBe('he');
    expect(normalizeLanguage('no-NO')).toBe('nb');
    expect(normalizeLanguage('cz')).toBe('cs');
  });

  test('keeps the missing-language default but never maps explicit unknown values to German', () => {
    expect(normalizeLanguage(undefined)).toBe('de');
    expect(normalizeLanguage('')).toBe('de');
    expect(normalizeLanguage('xx')).toBe(fallbackLanguage);
    expect(normalizeLanguage(42)).toBe(fallbackLanguage);
  });

  test('marks Hebrew as right-to-left', () => {
    expect(isRtlLanguage('he')).toBe(true);
    expect(isRtlLanguage('de')).toBe(false);
  });
});
