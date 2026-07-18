import type { DailyAvailabilityAggregate } from './db';

export const feedLanguages = ['de', 'fr', 'it', 'en'] as const;
export type FeedLanguage = (typeof feedLanguages)[number];
export type AvailabilityState = 'available' | 'sold_out' | 'unknown';

export interface NewsDigest {
  id: string;
  date: string;
  title: string;
  summary: string;
  updatedAt: string;
  status: {
    silver: { state: AvailabilityState; availableChecks: number; totalChecks: number };
    gold: { state: AvailabilityState; availableChecks: number; totalChecks: number };
  };
}

const locales: Record<FeedLanguage, string> = {
  de: 'de-CH',
  fr: 'fr-CH',
  it: 'it-CH',
  en: 'en-CH',
};

const channelCopy: Record<FeedLanguage, { title: string; description: string }> = {
  de: {
    title: 'ResortPass Tracker – tägliche Verfügbarkeit',
    description: 'Tägliche Zusammenfassungen der geprüften ResortPass Silver- und Gold-Verfügbarkeit.',
  },
  fr: {
    title: 'ResortPass Tracker – disponibilité quotidienne',
    description: 'Résumés quotidiens des contrôles de disponibilité des ResortPass Silver et Gold.',
  },
  it: {
    title: 'ResortPass Tracker – disponibilità giornaliera',
    description: 'Riepiloghi giornalieri dei controlli di disponibilità dei ResortPass Silver e Gold.',
  },
  en: {
    title: 'ResortPass Tracker – daily availability',
    description: 'Daily summaries of checked ResortPass Silver and Gold availability.',
  },
};

export function normalizeFeedLanguage(value: string | undefined): FeedLanguage {
  return feedLanguages.includes(value as FeedLanguage) ? value as FeedLanguage : 'de';
}

function formatDate(date: string, lang: FeedLanguage): string {
  return new Intl.DateTimeFormat(locales[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

function toIso(timestamp: string, date: string): string {
  const normalized = timestamp.includes('T') ? timestamp : timestamp.replace(' ', 'T');
  const parsed = new Date(/[zZ]|[+-]\d\d:\d\d$/.test(normalized) ? normalized : `${normalized}Z`);
  return Number.isNaN(parsed.getTime()) ? `${date}T00:00:00.000Z` : parsed.toISOString();
}

function state(availableChecks: number, totalChecks: number): AvailabilityState {
  if (totalChecks === 0) return 'unknown';
  return availableChecks > 0 ? 'available' : 'sold_out';
}

function checkWord(lang: FeedLanguage, count: number): string {
  const words = {
    de: ['Prüfung', 'Prüfungen'],
    fr: ['contrôle', 'contrôles'],
    it: ['controllo', 'controlli'],
    en: ['check', 'checks'],
  } as const;
  return words[lang][count === 1 ? 0 : 1];
}

function sentence(lang: FeedLanguage, label: string, availableChecks: number, totalChecks: number): string {
  if (totalChecks === 0) {
    return {
      de: `Für ${label} lagen keine Prüfungen vor.`,
      fr: `Aucun contrôle n’a été effectué pour ${label}.`,
      it: `Non sono stati effettuati controlli per ${label}.`,
      en: `No checks were recorded for ${label}.`,
    }[lang];
  }

  if (availableChecks === 0) {
    return {
      de: totalChecks === 1
        ? `${label} war bei der Prüfung nicht verfügbar.`
        : `${label} war bei keiner der ${totalChecks} Prüfungen verfügbar.`,
      fr: `${label} était indisponible lors ${totalChecks === 1 ? 'du contrôle' : `des ${totalChecks} contrôles`}.`,
      it: `${label} non era disponibile ${totalChecks === 1 ? 'nel controllo effettuato' : `in nessuno dei ${totalChecks} controlli`}.`,
      en: `${label} was unavailable in ${totalChecks === 1 ? 'the check' : `all ${totalChecks} checks`}.`,
    }[lang];
  }

  return {
    de: `${label} war bei ${availableChecks} von ${totalChecks} ${checkWord(lang, totalChecks)} verfügbar.`,
    fr: `${label} était disponible lors de ${availableChecks} ${checkWord(lang, availableChecks)} sur ${totalChecks}.`,
    it: `${label} era disponibile in ${availableChecks} ${checkWord(lang, availableChecks)} su ${totalChecks}.`,
    en: `${label} was available in ${availableChecks} of ${totalChecks} ${checkWord(lang, totalChecks)}.`,
  }[lang];
}

export function formatDailyDigest(row: DailyAvailabilityAggregate, lang: FeedLanguage): NewsDigest {
  const formattedDate = formatDate(row.date, lang);
  const titles: Record<FeedLanguage, string> = {
    de: `ResortPass-Status am ${formattedDate}`,
    fr: `Disponibilité du ResortPass le ${formattedDate}`,
    it: `Disponibilità del ResortPass il ${formattedDate}`,
    en: `ResortPass availability on ${formattedDate}`,
  };

  return {
    id: `availability-${row.date}`,
    date: row.date,
    title: titles[lang],
    summary: [
      sentence(lang, 'ResortPass Silver', row.silverAvailableChecks, row.silverChecks),
      sentence(lang, 'ResortPass Gold', row.goldAvailableChecks, row.goldChecks),
    ].join(' '),
    updatedAt: toIso(row.lastCheckedAt, row.date),
    status: {
      silver: {
        state: state(row.silverAvailableChecks, row.silverChecks),
        availableChecks: row.silverAvailableChecks,
        totalChecks: row.silverChecks,
      },
      gold: {
        state: state(row.goldAvailableChecks, row.goldChecks),
        availableChecks: row.goldAvailableChecks,
        totalChecks: row.goldChecks,
      },
    },
  };
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function buildRss(lang: FeedLanguage, items: NewsDigest[], siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/+$/, '');
  const homeUrl = `${baseUrl}${lang === 'de' ? '/' : `/${lang}/`}`;
  const feedUrl = `${baseUrl}/api/feed.xml?lang=${lang}`;
  const copy = channelCopy[lang];
  const lastBuildDate = items[0]?.updatedAt;

  const rssItems = items.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(`${homeUrl}#history`)}</link>
      <guid isPermaLink="false">urn:resortpass:${escapeXml(item.id)}</guid>
      <pubDate>${new Date(item.updatedAt).toUTCString()}</pubDate>
      <description>${escapeXml(item.summary)}</description>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(copy.title)}</title>
    <link>${escapeXml(homeUrl)}</link>
    <description>${escapeXml(copy.description)}</description>
    <language>${locales[lang]}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${lastBuildDate ? `
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>` : ''}${rssItems ? `
${rssItems}` : ''}
  </channel>
</rss>`;
}
