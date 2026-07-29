import { describe, expect, test } from 'bun:test';
import { getApiCopy, getCommunityCopy } from './api-copy';
import { supportedLanguages } from './locales';

const translatedLanguages = new Set(['de', 'fr', 'it', 'en']);

describe('API locale fallbacks', () => {
  test('provides complete API and community copy for every supported language', () => {
    for (const lang of supportedLanguages) {
      expect(Object.values(getApiCopy(lang)).every(Boolean)).toBe(true);
      expect(Object.values(getCommunityCopy(lang)).every(Boolean)).toBe(true);
    }
  });

  test('uses English rather than German for newly activated locales', () => {
    for (const lang of supportedLanguages) {
      if (translatedLanguages.has(lang)) continue;
      expect(getApiCopy(lang)).toEqual(getApiCopy('en'));
      expect(getApiCopy(lang)).not.toEqual(getApiCopy('de'));
      expect(getCommunityCopy(lang)).toEqual(getCommunityCopy('en'));
      expect(getCommunityCopy(lang)).not.toEqual(getCommunityCopy('de'));
    }
  });

  test('uses English for explicit invalid locales and German for a missing legacy locale', () => {
    expect(getApiCopy('xx')).toEqual(getApiCopy('en'));
    expect(getCommunityCopy('xx')).toEqual(getCommunityCopy('en'));
    expect(getApiCopy(undefined)).toEqual(getApiCopy('de'));
    expect(getCommunityCopy(undefined)).toEqual(getCommunityCopy('de'));
  });
});
