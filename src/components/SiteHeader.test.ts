import { transform } from '@astrojs/compiler';
import { describe, expect, test } from 'bun:test';
import { localeCodes } from '../i18n/locales';
import { getCoreHeaderRoutes } from './site-header-model';

const siteHeaderPath = new URL('./SiteHeader.astro', import.meta.url);
const navbarPath = new URL('./Navbar.astro', import.meta.url);
const planningPagePath = new URL('./planning/PlanningPage.astro', import.meta.url);
const siteHeaderSource = await Bun.file(siteHeaderPath).text();
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

  test('keeps the four published core locales and uses an explicit English fallback elsewhere', () => {
    expect(getCoreHeaderRoutes('de')).toEqual({
      home: { href: '/', fallbackToEnglish: false },
      waitTimes: { href: '/wartezeiten/', fallbackToEnglish: false },
      crowdCalendar: { href: '/besucherprognose/', fallbackToEnglish: false },
    });
    expect(getCoreHeaderRoutes('fr').crowdCalendar.href).toBe('/fr/affluence/');

    for (const locale of localeCodes.filter((code) => !['de', 'fr', 'it', 'en'].includes(code))) {
      expect(getCoreHeaderRoutes(locale)).toEqual({
        home: { href: '/en/', fallbackToEnglish: true },
        waitTimes: { href: '/en/wartezeiten/', fallbackToEnglish: true },
        crowdCalendar: { href: '/en/crowd-calendar/', fallbackToEnglish: true },
      });
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
});
