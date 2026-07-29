import { describe, expect, test } from 'bun:test';
import { localeCodes } from '../i18n/locales';
import {
  getRouteAlternates,
  getRoutePath,
  resolveRouteAlternates,
  type GuideRouteKey,
} from '../i18n/routes';
import { resolveLanguageNavigation } from './language-switcher-model';

describe('visible language navigation', () => {
  test('uses true equivalents for all fully translated core pages', () => {
    const seoAlternates = resolveRouteAlternates({
      pathname: '/',
      routeKey: 'home',
    }).alternates;
    const navigation = resolveLanguageNavigation({
      pathname: '/',
      routeKey: 'home',
      fallbackRouteKey: 'parkGuide',
    });

    expect(seoAlternates.map(({ locale }) => locale)).toEqual([...localeCodes]);
    expect(navigation).toHaveLength(localeCodes.length);
    expect(navigation.map(({ locale }) => locale)).toEqual([...localeCodes]);
    expect(navigation.filter(({ equivalent }) => equivalent).map(({ locale }) => locale))
      .toEqual([...localeCodes]);
    expect(navigation.some(({ equivalent }) => !equivalent)).toBe(false);
  });

  test('uses true same-page translations for every localized guide', () => {
    for (const routeKey of [
      'parkGuide',
      'visitPlanner',
      'restaurantGuide',
      'resortPassReservation',
    ] satisfies GuideRouteKey[]) {
      const navigation = resolveLanguageNavigation({
        pathname: getRoutePath(routeKey, 'he')!,
        routeKey,
        fallbackRouteKey: 'parkGuide',
      });

      expect(navigation).toEqual(
        getRouteAlternates(routeKey).map((alternate) => ({
          ...alternate,
          equivalent: true,
        })),
      );
    }
  });

  test('falls back safely on unknown and non-translated routes', () => {
    const unknownNavigation = resolveLanguageNavigation({
      pathname: '/not-found/',
      fallbackRouteKey: 'parkGuide',
    });
    expect(unknownNavigation).toHaveLength(localeCodes.length);
    expect(unknownNavigation.every(({ equivalent }) => !equivalent)).toBe(true);

    const waitTimesNavigation = resolveLanguageNavigation({
      pathname: '/fr/wartezeiten/',
      routeKey: 'waitTimes',
      fallbackRouteKey: 'parkGuide',
    });
    expect(waitTimesNavigation.find(({ locale }) => locale === 'fr')).toEqual({
      locale: 'fr',
      path: '/fr/wartezeiten/',
      equivalent: true,
    });
    expect(waitTimesNavigation.find(({ locale }) => locale === 'nl')).toEqual({
      locale: 'nl',
      path: '/nl/wachttijden/',
      equivalent: true,
    });
  });

  test('does not add guide fallbacks unless the caller explicitly requests them', () => {
    const navigation = resolveLanguageNavigation({
      pathname: '/',
      routeKey: 'home',
    });
    expect(navigation).toHaveLength(localeCodes.length);
    expect(navigation.every(({ equivalent }) => equivalent)).toBe(true);
  });
});
