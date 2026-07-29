import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { localeCodes } from './locales';
import {
  findRouteKeyByPath,
  guideRouteKeys,
  getRouteAlternates,
  getRoutePath,
  getXDefaultPath,
  normalizeRoutePath,
  resolveRouteAlternates,
  routeRegistry,
  type GuideRouteKey,
  type RouteKey,
} from './routes';

const sourceBackedRouteKeys = [
  'home',
  'waitTimes',
  'crowdCalendar',
  'imprint',
  'confirm',
  'unsubscribe',
  'communityNew',
] as const satisfies readonly RouteKey[];

function sourcePageExists(path: string): boolean {
  if (path === '/') return existsSync(join(import.meta.dir, '..', 'pages', 'index.astro'));
  const relative = path.replace(/^\/|\/$/g, '');
  return [
    join(import.meta.dir, '..', 'pages', `${relative}.astro`),
    join(import.meta.dir, '..', 'pages', relative, 'index.astro'),
  ].some(existsSync);
}

describe('semantic route registry', () => {
  test('preserves every existing public URL', () => {
    expect(routeRegistry).toMatchObject({
      home: { paths: { de: '/', fr: '/fr/', it: '/it/', en: '/en/' } },
      waitTimes: {
        paths: {
          de: '/wartezeiten/',
          fr: '/fr/wartezeiten/',
          it: '/it/wartezeiten/',
          en: '/en/wartezeiten/',
        },
      },
      crowdCalendar: {
        paths: {
          de: '/besucherprognose/',
          fr: '/fr/affluence/',
          it: '/it/affluenza/',
          en: '/en/crowd-calendar/',
        },
      },
      imprint: {
        paths: {
          de: '/impressum/',
          fr: '/fr/impressum/',
          it: '/it/impressum/',
          en: '/en/impressum/',
        },
      },
    });
  });

  test('keeps every existing route mapping backed by its Astro page', () => {
    const dynamicRoutePage = join(import.meta.dir, '..', 'pages', '[...guide].astro');
    for (const routeKey of sourceBackedRouteKeys) {
      for (const { path } of getRouteAlternates(routeKey)) {
        expect(sourcePageExists(path) || existsSync(dynamicRoutePage)).toBe(true);
      }
    }
  });

  test('uses normalized and globally unique published paths', () => {
    const seen = new Set<string>();
    for (const routeKey of Object.keys(routeRegistry) as RouteKey[]) {
      for (const { path } of getRouteAlternates(routeKey)) {
        expect(path).toBe(normalizeRoutePath(path));
        expect(seen.has(path)).toBe(false);
        seen.add(path);
      }
    }
  });

  test('resolves the existing localized crowd-calendar slugs', () => {
    expect(findRouteKeyByPath('/besucherprognose')).toBe('crowdCalendar');
    expect(findRouteKeyByPath('/fr/affluence/')).toBe('crowdCalendar');
    expect(findRouteKeyByPath('/it/affluenza/')).toBe('crowdCalendar');
    expect(findRouteKeyByPath('/en/crowd-calendar/')).toBe('crowdCalendar');
  });

  test('publishes every core route for all requested locales', () => {
    for (const routeKey of sourceBackedRouteKeys) {
      expect(getRouteAlternates(routeKey)).toHaveLength(localeCodes.length);
      for (const locale of localeCodes) expect(getRoutePath(routeKey, locale)).toBeDefined();
    }

    const resolved = resolveRouteAlternates({ pathname: '/en/crowd-calendar/' });
    expect(resolved.alternates.map(({ locale }) => locale)).toEqual([...localeCodes]);
    expect(resolved.xDefaultPath).toBe('/besucherprognose/');
  });

  test('supports explicit localized publication paths without same-slug inference', () => {
    const resolved = resolveRouteAlternates({
      pathname: '/guide/',
      explicitPaths: {
        de: '/guide/',
        nl: '/nl/gids/',
      },
    });

    expect(resolved.alternates).toEqual([
      { locale: 'de', path: '/guide/' },
      { locale: 'nl', path: '/nl/gids/' },
    ]);
    expect(resolved.xDefaultPath).toBe('/guide/');
  });

  test('gives every indexable route an explicit German x-default', () => {
    for (const [routeKey, route] of Object.entries(routeRegistry) as [RouteKey, (typeof routeRegistry)[RouteKey]][]) {
      if (route.indexable) expect(getXDefaultPath(routeKey)).toBeDefined();
    }
  });

  test('keeps all configured locale codes available for future path publication', () => {
    expect(localeCodes).toContain('el');
    expect(localeCodes).toContain('nb');
    expect(localeCodes).toContain('he');
  });
});

describe('localized guide routes', () => {
  test('registers all requested semantic guide keys as indexable', () => {
    expect(guideRouteKeys).toEqual([
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
    ]);

    for (const routeKey of guideRouteKeys) {
      expect(routeRegistry[routeKey].indexable).toBe(true);
    }
  });

  test('has one explicit path for every target locale and guide', () => {
    for (const routeKey of guideRouteKeys) {
      expect(Object.keys(routeRegistry[routeKey].paths).sort()).toEqual([...localeCodes].sort());
      expect(getRouteAlternates(routeKey)).toHaveLength(localeCodes.length);
      for (const locale of localeCodes) {
        expect(getRoutePath(routeKey, locale)).toBeDefined();
      }
    }
  });

  test('uses the locale prefix and ASCII slugs except where Hebrew is allowed', () => {
    for (const routeKey of guideRouteKeys) {
      for (const { locale, path } of getRouteAlternates(routeKey)) {
        if (locale === 'de') {
          expect(path.split('/').filter(Boolean)).toHaveLength(1);
        } else {
          expect(path.startsWith(`/${locale}/`)).toBe(true);
        }

        const slug = path.split('/').filter(Boolean).at(-1) || '';
        expect(slug).not.toContain('--');
        if (locale !== 'he') expect(slug).toMatch(/^[a-z0-9-]+$/);
      }
    }
  });

  test('keeps the Europa-Park, ResortPass and Rulantica brand tokens stable', () => {
    const europaParkRoutes = [
      'parkGuide',
      'visitPlanner',
      'costCalculator',
      'familyGuide',
      'stayGuide',
      'restaurantGuide',
    ] as const satisfies readonly GuideRouteKey[];
    const resortPassRoutes = [
      'resortPassGuide',
      'resortPassCompare',
      'resortPassPrices',
      'resortPassReservation',
      'resortPassRulantica',
    ] as const satisfies readonly GuideRouteKey[];

    for (const routeKey of europaParkRoutes) {
      for (const { path } of getRouteAlternates(routeKey)) expect(path).toContain('europa-park');
    }
    for (const routeKey of resortPassRoutes) {
      for (const { path } of getRouteAlternates(routeKey)) expect(path).toContain('resortpass');
    }
    for (const { path } of getRouteAlternates('rulanticaGuide')) expect(path).toContain('rulantica');
    for (const { path } of getRouteAlternates('resortPassRulantica')) {
      expect(path).toContain('resortpass');
      expect(path).toContain('rulantica');
    }
  });

  test('resolves reciprocal alternates and German x-default from every localized guide URL', () => {
    for (const routeKey of guideRouteKeys) {
      const expectedAlternates = getRouteAlternates(routeKey);
      const expectedDefault = getRoutePath(routeKey, 'de');

      for (const { path } of expectedAlternates) {
        expect(findRouteKeyByPath(path)).toBe(routeKey);
        const resolved = resolveRouteAlternates({ pathname: path });
        expect(resolved.routeKey).toBe(routeKey);
        expect(resolved.alternates).toEqual(expectedAlternates);
        expect(resolved.xDefaultPath).toBe(expectedDefault);
      }
    }
  });

  test('resolves percent-encoded Hebrew build and sitemap URLs', () => {
    for (const routeKey of guideRouteKeys) {
      const hebrewPath = getRoutePath(routeKey, 'he')!;
      const encodedPath = new URL(hebrewPath, 'https://example.com').pathname;

      expect(normalizeRoutePath(encodedPath)).toBe(hebrewPath);
      expect(findRouteKeyByPath(encodedPath)).toBe(routeKey);
      expect(resolveRouteAlternates({ pathname: encodedPath }).alternates)
        .toEqual(getRouteAlternates(routeKey));
    }
  });
});
