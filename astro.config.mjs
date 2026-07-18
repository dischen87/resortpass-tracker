import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.resortpass-europapark.ch',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
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
        return !page.includes('/confirm')
          && !page.includes('/unsubscribe')
          && !page.includes('/community/')
          && !page.includes('/sitemap')
          && !page.includes('/404');
      },
    }),
  ],
});
