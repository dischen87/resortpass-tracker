import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const siteUrl = 'https://www.resortpass-europapark.ch';
const crowdCalendarUrls = {
  de: `${siteUrl}/besucherprognose/`,
  fr: `${siteUrl}/fr/affluence/`,
  it: `${siteUrl}/it/affluenza/`,
  en: `${siteUrl}/en/crowd-calendar/`,
};
const crowdCalendarUrlSet = new Set(Object.values(crowdCalendarUrls));

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: {
          de: 'de',
          fr: 'fr',
          it: 'it',
          en: 'en',
        },
      },
      filter: (page) => {
        return !page.includes('/confirm')
          && !page.includes('/unsubscribe')
          && !page.includes('/community/')
          && !page.includes('/sitemap')
          && !page.includes('/404');
      },
      serialize: (item) => {
        if (!crowdCalendarUrlSet.has(item.url)) return item;
        return {
          ...item,
          links: [
            ...Object.entries(crowdCalendarUrls).map(([lang, url]) => ({ lang, url })),
            { lang: 'x-default', url: crowdCalendarUrls.de },
          ],
        };
      },
    }),
  ],
});
