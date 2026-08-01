import type { RideLand } from '../data/rides';
import { getLocaleDefinition, type LocaleCode } from './locales';
import { getTranslation } from './translations';

/**
 * Europa-Park groups its attractions into country-themed areas. Most map onto a
 * real region code, so `Intl.DisplayNames` gives us a correct name in all 17
 * languages for free. Three do not — England is a subdivision, Scandinavia is a
 * region and Minimoys Kingdom is fictional — so those carry real translations.
 *
 * This used to run client-side with a hand-written table covering four
 * languages; the other thirteen silently fell back to the English land name.
 * Resolving it at build time also puts the themed areas into the served HTML.
 */
const REGION_CODES: Partial<Record<RideLand, string>> = {
  Austria: 'AT',
  Croatia: 'HR',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  Iceland: 'IS',
  Ireland: 'IE',
  Italy: 'IT',
  Luxembourg: 'LU',
  Netherlands: 'NL',
  Portugal: 'PT',
  Russia: 'RU',
  Spain: 'ES',
  Switzerland: 'CH',
};

const SPECIAL_KEYS: Partial<Record<RideLand, string>> = {
  England: 'wait.land_england',
  'Minimoys Kingdom': 'wait.land_minimoys',
  Scandinavia: 'wait.land_scandinavia',
};

export function localizedLandName(land: RideLand, locale: LocaleCode): string {
  const specialKey = SPECIAL_KEYS[land];
  if (specialKey) return getTranslation(locale, specialKey);

  const region = REGION_CODES[land];
  if (!region) return land;

  try {
    const names = new Intl.DisplayNames([getLocaleDefinition(locale).bcp47], { type: 'region' });
    return names.of(region) || land;
  } catch {
    // A runtime without the region data must still render the page.
    return land;
  }
}

export function landNameMap(locale: LocaleCode, lands: readonly RideLand[]): Record<string, string> {
  return Object.fromEntries(lands.map((land) => [land, localizedLandName(land, locale)]));
}
