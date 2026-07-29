import { localeCodes, type LocaleCode } from '../i18n/locales';
import {
  getRoutePath,
  resolveRouteAlternates,
  type RouteKey,
  type RoutePaths,
} from '../i18n/routes';

export interface LanguageNavigationItem {
  locale: LocaleCode;
  path: string;
  equivalent: boolean;
}

interface ResolveLanguageNavigationOptions {
  pathname: string;
  routeKey?: RouteKey;
  explicitPaths?: RoutePaths;
  fallbackRouteKey?: RouteKey;
}

/**
 * Visible language navigation and SEO alternates are intentionally different:
 * only true equivalents belong in hreflang, while the product navigation may
 * still offer a clearly-labelled route into every published locale.
 */
export function resolveLanguageNavigation({
  pathname,
  routeKey,
  explicitPaths,
  fallbackRouteKey,
}: ResolveLanguageNavigationOptions): LanguageNavigationItem[] {
  const { alternates } = resolveRouteAlternates({
    pathname,
    routeKey,
    explicitPaths,
  });
  const equivalentByLocale = new Map(
    alternates.map(({ locale, path }) => [locale, path] as const),
  );

  const items: LanguageNavigationItem[] = [];
  for (const locale of localeCodes) {
    const equivalentPath = equivalentByLocale.get(locale);
    if (equivalentPath) {
      items.push({ locale, path: equivalentPath, equivalent: true });
      continue;
    }

    const fallbackPath = fallbackRouteKey
      ? getRoutePath(fallbackRouteKey, locale)
      : undefined;
    if (fallbackPath) {
      items.push({ locale, path: fallbackPath, equivalent: false });
    }
  }
  return items;
}
