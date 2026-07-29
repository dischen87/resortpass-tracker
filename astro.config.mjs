import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import {
  findRouteKeyByPath,
  getRouteAlternates,
  getXDefaultPath,
} from './src/i18n/routes.ts';
import { getLocaleDefinition } from './src/i18n/locales.ts';

const siteUrl = 'https://www.resortpass-europapark.ch';

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    icon(),
    sitemap({
      filter: (page) => {
        return !page.includes('/confirm')
          && !page.includes('/unsubscribe')
          && !page.includes('/community/')
          && !page.includes('/sitemap')
          && !page.includes('/404');
      },
      serialize: (item) => {
        const routeKey = findRouteKeyByPath(new URL(item.url).pathname);
        if (!routeKey) return item;
        const alternates = getRouteAlternates(routeKey);
        const xDefaultPath = getXDefaultPath(routeKey);
        return {
          ...item,
          links: [
            ...alternates.map(({ locale, path }) => ({
              lang: getLocaleDefinition(locale).hreflang,
              url: `${siteUrl}${path}`,
            })),
            ...(xDefaultPath ? [{ lang: 'x-default', url: `${siteUrl}${xDefaultPath}` }] : []),
          ],
        };
      },
    }),
  ],
});
