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
import { lastModifiedFor } from './src/data/review-dates.ts';

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
          /*
           * The sitemap listed 272 URLs and not one <lastmod>. Crawlers use it
           * to prioritise recrawls, which matters most here for the pages whose
           * content genuinely moves — the ones carrying the ResortPass status.
           *
           * The editorial check date is the honest signal: it is when a human
           * last verified the content, not when a build happened to run. Using
           * the build time would mark all 277 pages as changed on every deploy,
           * which teaches crawlers to ignore the field.
           */
          lastmod: lastModifiedFor(routeKey),
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
