import type { DailyAvailabilityAggregate } from './db';
import {
  intlLocales,
  normalizeLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from './locales';
import {
  getRoutePath,
} from '../src/i18n/routes';
import type { LocaleCode } from '../src/i18n/locales';

export const feedLanguages = supportedLanguages;
export type FeedLanguage = SupportedLanguage;
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

interface FeedCopy {
  channelTitle: string;
  channelDescription: string;
  title: (date: string) => string;
  noChecks: (label: string) => string;
  unavailable: (label: string, total: number) => string;
  available: (label: string, available: number, total: number) => string;
}

const feedCopy: Record<FeedLanguage, FeedCopy> = {
  de: {
    channelTitle: 'ResortPass Tracker – tägliche Verfügbarkeit',
    channelDescription: 'Tägliche Zusammenfassungen der geprüften ResortPass Silver- und Gold-Verfügbarkeit.',
    title: (date) => `ResortPass-Status am ${date}`,
    noChecks: (label) => `Für ${label} lagen keine Prüfungen vor.`,
    unavailable: (label, total) => total === 1
      ? `${label} war bei der Prüfung nicht verfügbar.`
      : `${label} war bei keiner der ${total} Prüfungen verfügbar.`,
    available: (label, available, total) => `${label} war bei ${available} von ${total} ${total === 1 ? 'Prüfung' : 'Prüfungen'} verfügbar.`,
  },
  fr: {
    channelTitle: 'ResortPass Tracker – disponibilité quotidienne',
    channelDescription: 'Résumés quotidiens des contrôles de disponibilité des ResortPass Silver et Gold.',
    title: (date) => `Disponibilité du ResortPass le ${date}`,
    noChecks: (label) => `Aucun contrôle n’a été effectué pour ${label}.`,
    unavailable: (label, total) => `${label} était indisponible lors ${total === 1 ? 'du contrôle' : `des ${total} contrôles`}.`,
    available: (label, available, total) => `${label} était disponible lors de ${available} ${available === 1 ? 'contrôle' : 'contrôles'} sur ${total}.`,
  },
  it: {
    channelTitle: 'ResortPass Tracker – disponibilità giornaliera',
    channelDescription: 'Riepiloghi giornalieri dei controlli di disponibilità dei ResortPass Silver e Gold.',
    title: (date) => `Disponibilità del ResortPass il ${date}`,
    noChecks: (label) => `Non sono stati effettuati controlli per ${label}.`,
    unavailable: (label, total) => `${label} non era disponibile ${total === 1 ? 'nel controllo effettuato' : `in nessuno dei ${total} controlli`}.`,
    available: (label, available, total) => `${label} era disponibile in ${available} ${available === 1 ? 'controllo' : 'controlli'} su ${total}.`,
  },
  en: {
    channelTitle: 'ResortPass Tracker – daily availability',
    channelDescription: 'Daily summaries of checked ResortPass Silver and Gold availability.',
    title: (date) => `ResortPass availability on ${date}`,
    noChecks: (label) => `No checks were recorded for ${label}.`,
    unavailable: (label, total) => `${label} was unavailable in ${total === 1 ? 'the check' : `all ${total} checks`}.`,
    available: (label, available, total) => `${label} was available in ${available} of ${total} ${total === 1 ? 'check' : 'checks'}.`,
  },
  nl: {
    channelTitle: 'ResortPass Tracker – dagelijkse beschikbaarheid',
    channelDescription: 'Dagelijkse samenvattingen van de gecontroleerde beschikbaarheid van ResortPass Silver en Gold.',
    title: (date) => `Beschikbaarheid van ResortPass op ${date}`,
    noChecks: (label) => `Er zijn geen controles geregistreerd voor ${label}.`,
    unavailable: (label, total) => `${label} was bij geen van de ${total} controles beschikbaar.`,
    available: (label, available, total) => `${label} was beschikbaar bij ${available} van de ${total} controles.`,
  },
  es: {
    channelTitle: 'ResortPass Tracker – disponibilidad diaria',
    channelDescription: 'Resúmenes diarios de la disponibilidad comprobada de ResortPass Silver y Gold.',
    title: (date) => `Disponibilidad de ResortPass el ${date}`,
    noChecks: (label) => `No se registraron comprobaciones para ${label}.`,
    unavailable: (label, total) => `${label} no estuvo disponible en ninguna de las ${total} comprobaciones.`,
    available: (label, available, total) => `${label} estuvo disponible en ${available} de ${total} comprobaciones.`,
  },
  sv: {
    channelTitle: 'ResortPass Tracker – daglig tillgänglighet',
    channelDescription: 'Dagliga sammanfattningar av kontrollerad tillgänglighet för ResortPass Silver och Gold.',
    title: (date) => `ResortPass-tillgänglighet den ${date}`,
    noChecks: (label) => `Inga kontroller registrerades för ${label}.`,
    unavailable: (label, total) => `${label} var inte tillgängligt vid någon av ${total} kontroller.`,
    available: (label, available, total) => `${label} var tillgängligt vid ${available} av ${total} kontroller.`,
  },
  ro: {
    channelTitle: 'ResortPass Tracker – disponibilitate zilnică',
    channelDescription: 'Rezumate zilnice ale verificărilor disponibilității ResortPass Silver și Gold.',
    title: (date) => `Disponibilitatea ResortPass la ${date}`,
    noChecks: (label) => `Nu au fost înregistrate verificări pentru ${label}.`,
    unavailable: (label, total) => `${label} nu a fost disponibil la niciuna dintre cele ${total} verificări.`,
    available: (label, available, total) => `${label} a fost disponibil la ${available} din ${total} verificări.`,
  },
  cs: {
    channelTitle: 'ResortPass Tracker – denní dostupnost',
    channelDescription: 'Denní souhrny kontrol dostupnosti ResortPass Silver a Gold.',
    title: (date) => `Dostupnost ResortPass dne ${date}`,
    noChecks: (label) => `Pro ${label} nebyly zaznamenány žádné kontroly.`,
    unavailable: (label, total) => `${label} nebyl dostupný při žádné z ${total} kontrol.`,
    available: (label, available, total) => `${label} byl dostupný při ${available} z ${total} kontrol.`,
  },
  pl: {
    channelTitle: 'ResortPass Tracker – codzienna dostępność',
    channelDescription: 'Codzienne podsumowania sprawdzonej dostępności ResortPass Silver i Gold.',
    title: (date) => `Dostępność ResortPass w dniu ${date}`,
    noChecks: (label) => `Nie zarejestrowano sprawdzeń dla ${label}.`,
    unavailable: (label, total) => `${label} nie był dostępny podczas żadnej z ${total} kontroli.`,
    available: (label, available, total) => `${label} był dostępny podczas ${available} z ${total} kontroli.`,
  },
  tr: {
    channelTitle: 'ResortPass Tracker – günlük kullanılabilirlik',
    channelDescription: 'ResortPass Silver ve Gold kullanılabilirlik kontrollerinin günlük özetleri.',
    title: (date) => `ResortPass kullanılabilirliği – ${date}`,
    noChecks: (label) => `${label} için kontrol kaydedilmedi.`,
    unavailable: (label, total) => `${label}, ${total} kontrolün hiçbirinde mevcut değildi.`,
    available: (label, available, total) => `${label}, ${total} kontrolün ${available} tanesinde mevcuttu.`,
  },
  da: {
    channelTitle: 'ResortPass Tracker – daglig tilgængelighed',
    channelDescription: 'Daglige oversigter over kontrolleret tilgængelighed for ResortPass Silver og Gold.',
    title: (date) => `ResortPass-tilgængelighed den ${date}`,
    noChecks: (label) => `Der blev ikke registreret nogen kontroller for ${label}.`,
    unavailable: (label, total) => `${label} var ikke tilgængeligt i nogen af ${total} kontroller.`,
    available: (label, available, total) => `${label} var tilgængeligt i ${available} af ${total} kontroller.`,
  },
  el: {
    channelTitle: 'ResortPass Tracker – καθημερινή διαθεσιμότητα',
    channelDescription: 'Καθημερινές περιλήψεις των ελέγχων διαθεσιμότητας ResortPass Silver και Gold.',
    title: (date) => `Διαθεσιμότητα ResortPass στις ${date}`,
    noChecks: (label) => `Δεν καταγράφηκαν έλεγχοι για το ${label}.`,
    unavailable: (label, total) => `Το ${label} δεν ήταν διαθέσιμο σε κανέναν από τους ${total} ελέγχους.`,
    available: (label, available, total) => `Το ${label} ήταν διαθέσιμο σε ${available} από ${total} ελέγχους.`,
  },
  pt: {
    channelTitle: 'ResortPass Tracker – disponibilidade diária',
    channelDescription: 'Resumos diários das verificações de disponibilidade do ResortPass Silver e Gold.',
    title: (date) => `Disponibilidade do ResortPass em ${date}`,
    noChecks: (label) => `Não foram registadas verificações para o ${label}.`,
    unavailable: (label, total) => `O ${label} não esteve disponível em nenhuma das ${total} verificações.`,
    available: (label, available, total) => `O ${label} esteve disponível em ${available} de ${total} verificações.`,
  },
  nb: {
    channelTitle: 'ResortPass Tracker – daglig tilgjengelighet',
    channelDescription: 'Daglige sammendrag av kontrollert tilgjengelighet for ResortPass Silver og Gold.',
    title: (date) => `ResortPass-tilgjengelighet ${date}`,
    noChecks: (label) => `Ingen kontroller ble registrert for ${label}.`,
    unavailable: (label, total) => `${label} var ikke tilgjengelig i noen av ${total} kontroller.`,
    available: (label, available, total) => `${label} var tilgjengelig i ${available} av ${total} kontroller.`,
  },
  he: {
    channelTitle: 'ResortPass Tracker – זמינות יומית',
    channelDescription: 'סיכומים יומיים של בדיקות הזמינות של ResortPass Silver ו-Gold.',
    title: (date) => `זמינות ResortPass בתאריך ${date}`,
    noChecks: (label) => `לא נרשמו בדיקות עבור ${label}.`,
    unavailable: (label, total) => `${label} לא היה זמין באף אחת מ-${total} הבדיקות.`,
    available: (label, available, total) => `${label} היה זמין ב-${available} מתוך ${total} בדיקות.`,
  },
  hu: {
    channelTitle: 'ResortPass Tracker – napi elérhetőség',
    channelDescription: 'A ResortPass Silver és Gold ellenőrzött elérhetőségének napi összefoglalói.',
    title: (date) => `ResortPass-elérhetőség – ${date}`,
    noChecks: (label) => `${label} esetében nem történt ellenőrzés.`,
    unavailable: (label, total) => `${label} a(z) ${total} ellenőrzés egyikénél sem volt elérhető.`,
    available: (label, available, total) => `${label} a(z) ${total} ellenőrzésből ${available} alkalommal volt elérhető.`,
  },
};

export function normalizeFeedLanguage(value: string | undefined): FeedLanguage {
  return normalizeLanguage(value);
}

function formatDate(date: string, lang: FeedLanguage): string {
  return new Intl.DateTimeFormat(intlLocales[lang], {
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

export function formatDailyDigest(row: DailyAvailabilityAggregate, lang: FeedLanguage): NewsDigest {
  const copy = feedCopy[lang];
  const formattedDate = formatDate(row.date, lang);
  const sentence = (label: string, available: number, total: number) => {
    if (total === 0) return copy.noChecks(label);
    if (available === 0) return copy.unavailable(label, total);
    return copy.available(label, available, total);
  };

  return {
    id: `availability-${row.date}`,
    date: row.date,
    title: copy.title(formattedDate),
    summary: [
      sentence('ResortPass Silver', row.silverAvailableChecks, row.silverChecks),
      sentence('ResortPass Gold', row.goldAvailableChecks, row.goldChecks),
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
  const landingPath = getRoutePath('home', lang as LocaleCode);
  if (!landingPath) throw new Error(`Missing RSS landing page for locale "${lang}"`);
  const homeUrl = `${baseUrl}${landingPath}`;
  const itemUrl = `${homeUrl}#history`;
  const feedUrl = `${baseUrl}/api/feed.xml?lang=${lang}`;
  const copy = feedCopy[lang];
  const lastBuildDate = items[0]?.updatedAt;

  const rssItems = items.map((item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(itemUrl)}</link>
      <guid isPermaLink="false">urn:resortpass:${escapeXml(item.id)}</guid>
      <pubDate>${new Date(item.updatedAt).toUTCString()}</pubDate>
      <description>${escapeXml(item.summary)}</description>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(copy.channelTitle)}</title>
    <link>${escapeXml(homeUrl)}</link>
    <description>${escapeXml(copy.channelDescription)}</description>
    <language>${intlLocales[lang]}</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${lastBuildDate ? `
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>` : ''}${rssItems ? `
${rssItems}` : ''}
  </channel>
</rss>`;
}
