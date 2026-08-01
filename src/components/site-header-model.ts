import { localeCodes, type LocaleCode } from '../i18n/locales';
import { getRoutePath, type RouteKey } from '../i18n/routes';

export const coreHeaderLocales = localeCodes;
export type CoreHeaderLocale = LocaleCode;

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
  return coreHeaderLocales.includes(locale);
}

function resolveCoreRoute(routeKey: Extract<RouteKey, 'home' | 'waitTimes' | 'crowdCalendar'>, locale: LocaleCode): CoreHeaderRoute {
  const localizedPath = getRoutePath(routeKey, locale);
  if (localizedPath) return { href: localizedPath, fallbackToEnglish: false };

  const englishPath = getRoutePath(routeKey, 'en');
  if (!englishPath) throw new Error(`Missing English fallback for ${routeKey}`);
  return { href: englishPath, fallbackToEnglish: true };
}

/**
 * The accessible name for a navigation link, given what the link visibly says.
 *
 * WCAG 2.5.3 (Label in Name, Level A) requires the accessible name to contain
 * the visible text, so that someone using voice control can activate a link by
 * saying what they see. The header used to override the name with a longer
 * translation — "Temps d'attente" as the name of a link reading "Attentes" —
 * which broke that in six languages. The visible label is now the name, and the
 * only thing appended is the marker that the destination is English.
 */
export function navAccessibleName(visibleLabel: string, fallbackToEnglish: boolean): string {
  return fallbackToEnglish ? `${visibleLabel} — English` : visibleLabel;
}

/** True when the accessible name would fail WCAG 2.5.3 for this pair. */
export function violatesLabelInName(visibleLabel: string, accessibleName: string): boolean {
  const normalize = (value: string) =>
    value.toLocaleLowerCase().replace(/[‘’‛]/g, "'").replace(/\s+/g, ' ').trim();
  return !normalize(accessibleName).includes(normalize(visibleLabel));
}

export function getCoreHeaderRoutes(locale: LocaleCode): CoreHeaderRoutes {
  return {
    home: resolveCoreRoute('home', locale),
    waitTimes: resolveCoreRoute('waitTimes', locale),
    crowdCalendar: resolveCoreRoute('crowdCalendar', locale),
  };
}
