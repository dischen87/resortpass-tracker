import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.resortpass-europapark.ch',
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de-CH',
          fr: 'fr-CH',
          it: 'it-CH',
          en: 'en-US',
        },
      },
      filter: (page) => {
        return !page.includes('/confirm') && !page.includes('/unsubscribe') && !page.includes('/sitemap') && !page.includes('/404');
      },
      serialize: (item) => {
        // Remove trailing slashes for consistency
        if (item.url.endsWith('/') && item.url !== 'https://www.resortpass-europapark.ch/') {
          return undefined;
        }
        // Set homepage as highest priority
        if (item.url === 'https://www.resortpass-europapark.ch/') {
          item.priority = 1.0;
          item.changefreq = 'hourly';
        }
        // Language homepages
        if (item.url.match(/\/(fr|en|it)$/)) {
          item.priority = 0.9;
          item.changefreq = 'hourly';
        }
        // Legal pages lower priority
        if (item.url.includes('impressum')) {
          item.priority = 0.3;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});
