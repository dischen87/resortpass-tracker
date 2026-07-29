import { transform } from '@astrojs/compiler';
import { describe, expect, test } from 'bun:test';
import { localeCodes } from '../i18n/locales';
import { getCoreHeaderRoutes } from './site-header-model';

const siteHeaderPath = new URL('./SiteHeader.astro', import.meta.url);
const languageSwitcherPath = new URL('./LanguageSwitcher.astro', import.meta.url);
const navbarPath = new URL('./Navbar.astro', import.meta.url);
const planningPagePath = new URL('./planning/PlanningPage.astro', import.meta.url);
const siteHeaderSource = await Bun.file(siteHeaderPath).text();
const languageSwitcherSource = await Bun.file(languageSwitcherPath).text();
const navbarSource = await Bun.file(navbarPath).text();
const planningPageSource = await Bun.file(planningPagePath).text();

describe('shared site header', () => {
  test('compiles without Astro diagnostics', async () => {
    const result = await transform(siteHeaderSource, {
      filename: siteHeaderPath.pathname,
      sourcemap: false,
    });

    expect(result.diagnostics).toEqual([]);
    expect(result.styleError).toEqual([]);
  });

  test('keeps every core destination localized in all published locales', () => {
    expect(getCoreHeaderRoutes('de')).toEqual({
      home: { href: '/', fallbackToEnglish: false },
      waitTimes: { href: '/wartezeiten/', fallbackToEnglish: false },
      crowdCalendar: { href: '/besucherprognose/', fallbackToEnglish: false },
    });
    expect(getCoreHeaderRoutes('fr').crowdCalendar.href).toBe('/fr/affluence/');

    for (const locale of localeCodes) {
      const routes = getCoreHeaderRoutes(locale);
      expect(routes.home.fallbackToEnglish).toBe(false);
      expect(routes.waitTimes.fallbackToEnglish).toBe(false);
      expect(routes.crowdCalendar.fallbackToEnglish).toBe(false);
      expect(routes.home.href).toBeTruthy();
      expect(routes.waitTimes.href).toBeTruthy();
      expect(routes.crowdCalendar.href).toBeTruthy();
    }
  });

  test('makes the shared header the only global header implementation', () => {
    expect(navbarSource).toContain("import SiteHeader from './SiteHeader.astro'");
    expect(navbarSource).toContain('<SiteHeader');
    expect(planningPageSource).toContain("import SiteHeader from '../SiteHeader.astro'");
    expect(planningPageSource).toContain('<SiteHeader');
    expect(planningPageSource).not.toContain('class="planning-header"');
  });

  test('never truncates the wordmark and keeps one controlled overlay open at a time', () => {
    expect(siteHeaderSource).not.toContain('truncate');
    expect(siteHeaderSource).toContain('text-overflow: clip');
    expect(siteHeaderSource).toContain('setPanel(languageToggle, languagePanel, false)');
    expect(siteHeaderSource).toContain('setPanel(menuToggle, menuPanel, false)');
    expect(siteHeaderSource).toContain("event.key === 'Escape'");
    expect(siteHeaderSource).toContain('!siteHeader.contains(event.target as Node)');
    expect(siteHeaderSource).toContain('aria-controls="site-mobile-panel"');
    expect(siteHeaderSource).toContain('aria-controls="site-language-panel"');
  });

  test('turns the desktop menu into a compact secondary-navigation popover', () => {
    expect(siteHeaderSource).toContain("width: min(22rem, calc(100vw - 2rem))");
    expect(siteHeaderSource).toContain(".site-header__mobile-primary {\n      display: none");
    expect(siteHeaderSource).toContain('grid-template-columns: 1fr');
    expect(siteHeaderSource).toContain('justify-content: flex-start');
    expect(siteHeaderSource).toContain('border-radius: 1rem');
  });

  test('keeps responsive planning navigation reachable and reconciles open panels', () => {
    expect(siteHeaderSource).toContain(".site-header__mobile-panel:has(.site-header__mobile-section)");
    expect(siteHeaderSource).toContain("grid-template-columns: repeat(4, minmax(0, 1fr))");
    expect(siteHeaderSource).toContain("window.matchMedia('(min-width: 64rem)')");
    expect(siteHeaderSource).toContain("window.matchMedia('(min-width: 72rem)')");
    expect(siteHeaderSource).toContain("closeAllPanels(true);\n    syncPlannerHeight()");
    expect(siteHeaderSource).toContain("addEventListener('change', reconcileResponsivePanels)");
    expect(siteHeaderSource).toContain("new ResizeObserver(syncPlannerHeight).observe(siteHeader)");
    expect(siteHeaderSource).toContain("var(--site-header-planner-height, 0px)");
  });

  test('keeps every locale reachable without polluting hreflang semantics', () => {
    expect(siteHeaderSource).toContain('fallbackRouteKey="parkGuide"');
    expect(siteHeaderSource).toContain('fallbackHint={languageFallbackCopy.hint}');
    expect(languageSwitcherSource).toContain('resolveLanguageNavigation');
    expect(languageSwitcherSource).toContain('data-language-locale');
    expect(languageSwitcherSource).toContain('data-language-equivalent');
    expect(languageSwitcherSource).not.toContain('hreflang');
    expect(languageSwitcherSource).not.toContain('rel="alternate"');
  });
});
