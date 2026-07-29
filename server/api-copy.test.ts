import { describe, expect, test } from 'bun:test';
import {
  getApiCopy,
  getCommunityCopy,
  type ApiCopy,
  type CommunityCopy,
} from './api-copy';
import {
  supportedLanguages,
  type SupportedLanguage,
} from './locales';

const apiKeys = [
  'rate',
  'email',
  'pass',
  'send',
  'general',
  'subscribed',
  'invalidPassType',
  'invalidConfirm',
  'confirmed',
  'invalidUnsubscribe',
  'unsubscribed',
] as const satisfies readonly (keyof ApiCopy)[];

const communityKeys = [
  'token',
  'name',
  'title',
  'body',
  'limit',
  'success',
  'general',
] as const satisfies readonly (keyof CommunityCopy)[];

const nativeGeneralCopy = {
  de: 'Ein Fehler ist aufgetreten.',
  fr: 'Une erreur est survenue.',
  it: 'Si è verificato un errore.',
  en: 'Something went wrong.',
  nl: 'Er is iets misgegaan.',
  es: 'Algo ha salido mal.',
  sv: 'Något gick fel.',
  ro: 'A apărut o eroare.',
  cs: 'Něco se pokazilo.',
  pl: 'Coś poszło nie tak.',
  tr: 'Bir sorun oluştu.',
  da: 'Noget gik galt.',
  el: 'Κάτι πήγε στραβά.',
  pt: 'Ocorreu um erro.',
  nb: 'Noe gikk galt.',
  he: 'משהו השתבש.',
  hu: 'Hiba történt.',
} as const satisfies Record<SupportedLanguage, string>;

describe('localized API and community copy', () => {
  test('provides the complete copy contract for all 17 supported languages', () => {
    for (const lang of supportedLanguages) {
      const api = getApiCopy(lang);
      const community = getCommunityCopy(lang);

      expect(Object.keys(api).sort()).toEqual([...apiKeys].sort());
      expect(Object.keys(community).sort()).toEqual([...communityKeys].sort());
      expect(Object.values(api).every((value) => value.trim().length > 0)).toBe(true);
      expect(Object.values(community).every((value) => value.trim().length > 0)).toBe(true);
    }
  });

  test('returns native copy rather than the English fallback for every published locale', () => {
    const englishApi = getApiCopy('en');
    const englishCommunity = getCommunityCopy('en');

    for (const lang of supportedLanguages) {
      expect(getApiCopy(lang).general).toBe(nativeGeneralCopy[lang]);
      expect(getCommunityCopy(lang).general).toBe(nativeGeneralCopy[lang]);
      if (lang === 'en') continue;
      expect(getApiCopy(lang)).not.toEqual(englishApi);
      expect(getCommunityCopy(lang)).not.toEqual(englishCommunity);
    }
  });

  test('normalizes regional tags and legacy aliases before selecting copy', () => {
    const aliases = [
      ['pt-BR', 'pt'],
      ['HE_il', 'he'],
      ['iw-IL', 'he'],
      ['no-NO', 'nb'],
      ['cz-CZ', 'cs'],
      ['dk-DK', 'da'],
      ['gr-GR', 'el'],
      ['se-SE', 'sv'],
      ['nl-BE', 'nl'],
      ['es-MX', 'es'],
    ] as const satisfies readonly (readonly [string, SupportedLanguage])[];

    for (const [alias, canonical] of aliases) {
      expect(getApiCopy(alias)).toEqual(getApiCopy(canonical));
      expect(getCommunityCopy(alias)).toEqual(getCommunityCopy(canonical));
    }
  });

  test('uses English for unsupported values and German only when the locale is missing', () => {
    for (const unsupported of ['xx', 'unsupported', 42, {}]) {
      expect(getApiCopy(unsupported)).toEqual(getApiCopy('en'));
      expect(getCommunityCopy(unsupported)).toEqual(getCommunityCopy('en'));
    }

    for (const missing of [undefined, null, '', '   ']) {
      expect(getApiCopy(missing)).toEqual(getApiCopy('de'));
      expect(getCommunityCopy(missing)).toEqual(getCommunityCopy('de'));
    }
  });
});
