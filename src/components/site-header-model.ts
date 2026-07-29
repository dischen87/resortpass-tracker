import type { LocaleCode } from '../i18n/locales';
import { getRoutePath, type RouteKey } from '../i18n/routes';

export const coreHeaderLocales = ['de', 'fr', 'it', 'en'] as const;
export type CoreHeaderLocale = (typeof coreHeaderLocales)[number];

export interface CoreHeaderRoute {
  href: string;
  fallbackToEnglish: boolean;
}

export interface CoreHeaderRoutes {
  home: CoreHeaderRoute;
  waitTimes: CoreHeaderRoute;
  crowdCalendar: CoreHeaderRoute;
}

export function isCoreHeaderLocale(locale: LocaleCode): locale is CoreHeaderLocale {
  return coreHeaderLocales.includes(locale as CoreHeaderLocale);
}

function resolveCoreRoute(routeKey: Extract<RouteKey, 'home' | 'waitTimes' | 'crowdCalendar'>, locale: LocaleCode): CoreHeaderRoute {
  const localizedPath = getRoutePath(routeKey, locale);
  if (localizedPath) return { href: localizedPath, fallbackToEnglish: false };

  const englishPath = getRoutePath(routeKey, 'en');
  if (!englishPath) throw new Error(`Missing English fallback for ${routeKey}`);
  return { href: englishPath, fallbackToEnglish: true };
}

export function getCoreHeaderRoutes(locale: LocaleCode): CoreHeaderRoutes {
  return {
    home: resolveCoreRoute('home', locale),
    waitTimes: resolveCoreRoute('waitTimes', locale),
    crowdCalendar: resolveCoreRoute('crowdCalendar', locale),
  };
}
