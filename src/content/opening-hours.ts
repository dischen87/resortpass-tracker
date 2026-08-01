/**
 * Copy for the opening-hours page.
 *
 * Five languages, matching the tiering rule in src/i18n/tiers.ts. Kept as data
 * rather than shared translation keys for the same reason as the methodology
 * page: these are sentences, not labels, and adding them to the common key set
 * would oblige twelve more translations nobody would keep current.
 */

export type OpeningHoursLocale = 'de' | 'en' | 'fr' | 'nl' | 'it';

export const openingHoursLocales: readonly OpeningHoursLocale[] = ['de', 'en', 'fr', 'nl', 'it'];

export interface OpeningHoursPack {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Column heading for the time range — not the page title. */
  hoursColumn: string;
  todayLabel: string;
  upcomingTitle: string;
  upcomingDesc: string;
  closedLabel: string;
  noDataTitle: string;
  noDataText: string;
  loadingLabel: string;
  crowdLabel: string;
  sourceNote: string;
  officialLinkLabel: string;
  faq: { question: string; answer: string }[];
  relatedTitle: string;
  relatedWait: string;
  relatedCrowd: string;
}

export const openingHoursPacks: Record<OpeningHoursLocale, OpeningHoursPack> = {
  de: {
    metaTitle: 'Europa-Park Öffnungszeiten: heute und die nächsten Tage',
    metaDescription:
      'Wann hat der Europa-Park offen? Die gemeldeten Öffnungs- und Schliesszeiten für heute und die kommenden Betriebstage, mit Besucherandrang je Tag.',
    eyebrow: 'Betriebstage',
    title: 'Europa-Park Öffnungszeiten',
    intro:
      'Die gemeldeten Öffnungs- und Schliesszeiten für die kommenden Betriebstage. Der Europa-Park öffnet in der Sommersaison typischerweise um 09:00 Uhr; die tatsächlichen Zeiten hängen von Saison, Wochentag und Veranstaltungen ab und können sich kurzfristig ändern.',
    hoursColumn: 'Geöffnet von – bis',
    todayLabel: 'Heute',
    upcomingTitle: 'Kommende Betriebstage',
    upcomingDesc: 'Alle von der Quelle gemeldeten Öffnungstage im aktuell verfügbaren Zeitraum.',
    closedLabel: 'Geschlossen',
    noDataTitle: 'Derzeit keine Öffnungstage gemeldet',
    noDataText:
      'Für den aktuell bekannten Zeitraum liegen keine Betriebstage vor. Das ist während der Saisonpause normal. Verbindlich sind immer die offiziellen Angaben des Europa-Park.',
    loadingLabel: 'Öffnungszeiten werden geladen',
    crowdLabel: 'Andrang',
    sourceNote:
      'Öffnungszeiten und Besucherandrang stammen von der unabhängigen Quelle ParkQueueTimes.com und sind eine Orientierung, keine Zusage. Vor Ort und für die Planung sind die offiziellen Angaben des Europa-Park massgeblich.',
    officialLinkLabel: 'Offizielle Europa-Park Öffnungszeiten',
    faq: [
      {
        question: 'Wann öffnet der Europa-Park?',
        answer:
          'In der Sommersaison öffnet der Europa-Park in der Regel um 09:00 Uhr und schliesst um 18:00 Uhr. In der Wintersaison und an Veranstaltungstagen gelten abweichende Zeiten. Die Tabelle auf dieser Seite zeigt die für jeden kommenden Betriebstag gemeldeten Zeiten.',
      },
      {
        question: 'Hat der Europa-Park das ganze Jahr geöffnet?',
        answer:
          'Nein. Auf die Sommersaison folgt die Wintersaison, dazwischen liegt eine mehrwöchige Saisonpause, in der der Park geschlossen ist. In dieser Zeit meldet die Quelle keine Betriebstage und diese Seite zeigt entsprechend keine Zeiten an.',
      },
      {
        question: 'Wie früh sollte man vor der Öffnung da sein?',
        answer:
          'Wer die ersten Fahrten ohne lange Wartezeit mitnehmen will, ist erfahrungsgemäss 30 bis 45 Minuten vor der offiziellen Öffnung am Eingang gut aufgehoben. Die Wartezeiten steigen an starken Tagen bereits in der ersten Betriebsstunde deutlich an.',
      },
      {
        question: 'Ändern sich die Öffnungszeiten kurzfristig?',
        answer:
          'Ja, das kommt vor — etwa bei Veranstaltungen, verlängerten Abenden oder Wetterlagen. Diese Seite gibt den zuletzt gemeldeten Stand wieder und nennt den Zeitpunkt der Abfrage. Verbindlich ist immer die offizielle Angabe des Betreibers.',
      },
    ],
    relatedTitle: 'Passend dazu',
    relatedWait: 'Aktuelle Wartezeiten',
    relatedCrowd: 'Besucherprognose',
  },

  en: {
    metaTitle: 'Europa-Park opening hours: today and the days ahead',
    metaDescription:
      'When is Europa-Park open? Reported opening and closing times for today and the coming operating days, with the crowd level for each day.',
    eyebrow: 'Operating days',
    title: 'Europa-Park opening hours',
    intro:
      'Reported opening and closing times for the coming operating days. In the summer season Europa-Park typically opens at 09:00; actual times depend on the season, the weekday and events, and can change at short notice.',
    hoursColumn: 'Open from – to',
    todayLabel: 'Today',
    upcomingTitle: 'Coming operating days',
    upcomingDesc: 'Every operating day the source reports within the period currently available.',
    closedLabel: 'Closed',
    noDataTitle: 'No operating days reported at the moment',
    noDataText:
      'There are no operating days for the period currently known. That is normal during the season break. The official Europa-Park information is always authoritative.',
    loadingLabel: 'Loading opening hours',
    crowdLabel: 'Crowd level',
    sourceNote:
      'Opening hours and crowd levels come from the independent source ParkQueueTimes.com and are guidance, not a commitment. On site and for planning, the official Europa-Park information applies.',
    officialLinkLabel: 'Official Europa-Park opening hours',
    faq: [
      {
        question: 'What time does Europa-Park open?',
        answer:
          'In the summer season Europa-Park usually opens at 09:00 and closes at 18:00. Winter season and event days follow different hours. The table on this page shows the reported times for each coming operating day.',
      },
      {
        question: 'Is Europa-Park open all year?',
        answer:
          'No. The summer season is followed by the winter season, with a season break of several weeks in between when the park is closed. During that time the source reports no operating days and this page shows no times.',
      },
      {
        question: 'How early should you arrive before opening?',
        answer:
          'To get the first rides in without a long queue, being at the entrance 30 to 45 minutes before the official opening works well in practice. On busy days queues already build noticeably within the first hour of operation.',
      },
      {
        question: 'Do opening hours change at short notice?',
        answer:
          'Yes, it happens — for events, extended evenings or weather. This page shows the most recently reported state and names the time it was fetched. The operator’s official information is always authoritative.',
      },
    ],
    relatedTitle: 'Related',
    relatedWait: 'Current wait times',
    relatedCrowd: 'Crowd forecast',
  },

  fr: {
    metaTitle: 'Horaires d’ouverture d’Europa-Park : aujourd’hui et les jours à venir',
    metaDescription:
      'Quand Europa-Park est-il ouvert ? Les horaires d’ouverture et de fermeture communiqués pour aujourd’hui et les prochains jours d’exploitation, avec l’affluence par journée.',
    eyebrow: 'Jours d’exploitation',
    title: 'Horaires d’ouverture d’Europa-Park',
    intro:
      'Les horaires d’ouverture et de fermeture communiqués pour les prochains jours d’exploitation. En saison estivale, Europa-Park ouvre généralement à 09h00 ; les horaires réels dépendent de la saison, du jour de la semaine et des événements, et peuvent changer à court terme.',
    hoursColumn: 'Ouvert de – à',
    todayLabel: 'Aujourd’hui',
    upcomingTitle: 'Prochains jours d’exploitation',
    upcomingDesc: 'Tous les jours d’ouverture communiqués par la source pour la période actuellement disponible.',
    closedLabel: 'Fermé',
    noDataTitle: 'Aucun jour d’exploitation communiqué actuellement',
    noDataText:
      'Aucun jour d’exploitation n’est disponible pour la période actuellement connue. C’est normal pendant la pause saisonnière. Les informations officielles d’Europa-Park font toujours foi.',
    loadingLabel: 'Chargement des horaires',
    crowdLabel: 'Affluence',
    sourceNote:
      'Les horaires et l’affluence proviennent de la source indépendante ParkQueueTimes.com et constituent une orientation, pas un engagement. Sur place et pour la planification, les informations officielles d’Europa-Park s’appliquent.',
    officialLinkLabel: 'Horaires officiels d’Europa-Park',
    faq: [
      {
        question: 'À quelle heure ouvre Europa-Park ?',
        answer:
          'En saison estivale, Europa-Park ouvre généralement à 09h00 et ferme à 18h00. La saison hivernale et les jours d’événement suivent d’autres horaires. Le tableau de cette page indique les horaires communiqués pour chaque prochain jour d’exploitation.',
      },
      {
        question: 'Europa-Park est-il ouvert toute l’année ?',
        answer:
          'Non. La saison estivale est suivie de la saison hivernale, avec entre les deux une pause saisonnière de plusieurs semaines pendant laquelle le parc est fermé. Durant cette période, la source ne communique aucun jour d’exploitation et cette page n’affiche aucun horaire.',
      },
      {
        question: 'Combien de temps avant l’ouverture faut-il arriver ?',
        answer:
          'Pour enchaîner les premières attractions sans longue file, arriver à l’entrée 30 à 45 minutes avant l’ouverture officielle fonctionne bien en pratique. Les jours de forte affluence, les files s’allongent nettement dès la première heure d’exploitation.',
      },
      {
        question: 'Les horaires changent-ils à court terme ?',
        answer:
          'Oui, cela arrive — pour des événements, des soirées prolongées ou la météo. Cette page reflète le dernier état communiqué et indique l’heure de la consultation. L’information officielle de l’exploitant fait toujours foi.',
      },
    ],
    relatedTitle: 'À voir aussi',
    relatedWait: 'Temps d’attente actuels',
    relatedCrowd: 'Affluence prévue',
  },

  nl: {
    metaTitle: 'Openingstijden Europa-Park: vandaag en de komende dagen',
    metaDescription:
      'Wanneer is Europa-Park open? De gemelde openings- en sluitingstijden voor vandaag en de komende openingsdagen, met de drukte per dag.',
    eyebrow: 'Openingsdagen',
    title: 'Openingstijden Europa-Park',
    intro:
      'De gemelde openings- en sluitingstijden voor de komende openingsdagen. In het zomerseizoen opent Europa-Park doorgaans om 09:00 uur; de werkelijke tijden hangen af van seizoen, weekdag en evenementen en kunnen op korte termijn wijzigen.',
    hoursColumn: 'Open van – tot',
    todayLabel: 'Vandaag',
    upcomingTitle: 'Komende openingsdagen',
    upcomingDesc: 'Alle door de bron gemelde openingsdagen binnen de nu beschikbare periode.',
    closedLabel: 'Gesloten',
    noDataTitle: 'Op dit moment geen openingsdagen gemeld',
    noDataText:
      'Voor de nu bekende periode zijn er geen openingsdagen. Dat is normaal tijdens de seizoenspauze. De officiële informatie van Europa-Park is altijd leidend.',
    loadingLabel: 'Openingstijden worden geladen',
    crowdLabel: 'Drukte',
    sourceNote:
      'Openingstijden en drukte komen van de onafhankelijke bron ParkQueueTimes.com en zijn een richtlijn, geen toezegging. Ter plaatse en bij het plannen is de officiële informatie van Europa-Park bepalend.',
    officialLinkLabel: 'Officiële openingstijden Europa-Park',
    faq: [
      {
        question: 'Hoe laat gaat Europa-Park open?',
        answer:
          'In het zomerseizoen opent Europa-Park meestal om 09:00 uur en sluit om 18:00 uur. In het winterseizoen en op evenementdagen gelden andere tijden. De tabel op deze pagina toont de gemelde tijden voor elke komende openingsdag.',
      },
      {
        question: 'Is Europa-Park het hele jaar open?',
        answer:
          'Nee. Op het zomerseizoen volgt het winterseizoen, met daartussen een seizoenspauze van enkele weken waarin het park gesloten is. In die periode meldt de bron geen openingsdagen en toont deze pagina geen tijden.',
      },
      {
        question: 'Hoe vroeg moet je voor de opening aanwezig zijn?',
        answer:
          'Wil je de eerste attracties zonder lange rij meepakken, dan werkt 30 tot 45 minuten voor de officiële opening bij de ingang staan in de praktijk goed. Op drukke dagen lopen de wachttijden al in het eerste uur duidelijk op.',
      },
      {
        question: 'Veranderen de openingstijden op korte termijn?',
        answer:
          'Ja, dat gebeurt — bij evenementen, verlengde avonden of weersomstandigheden. Deze pagina geeft de laatst gemelde stand weer en noemt het tijdstip van opvragen. De officiële informatie van de exploitant is altijd leidend.',
      },
    ],
    relatedTitle: 'Ook interessant',
    relatedWait: 'Actuele wachttijden',
    relatedCrowd: 'Druktevoorspelling',
  },

  it: {
    metaTitle: 'Orari di apertura di Europa-Park: oggi e i prossimi giorni',
    metaDescription:
      'Quando è aperto Europa-Park? Gli orari di apertura e chiusura comunicati per oggi e per i prossimi giorni di apertura, con l’affluenza per ciascun giorno.',
    eyebrow: 'Giorni di apertura',
    title: 'Orari di apertura di Europa-Park',
    intro:
      'Gli orari di apertura e chiusura comunicati per i prossimi giorni di apertura. Nella stagione estiva Europa-Park apre di norma alle 09:00; gli orari effettivi dipendono dalla stagione, dal giorno della settimana e dagli eventi e possono cambiare con breve preavviso.',
    hoursColumn: 'Aperto dalle – alle',
    todayLabel: 'Oggi',
    upcomingTitle: 'Prossimi giorni di apertura',
    upcomingDesc: 'Tutti i giorni di apertura comunicati dalla fonte nel periodo attualmente disponibile.',
    closedLabel: 'Chiuso',
    noDataTitle: 'Al momento nessun giorno di apertura comunicato',
    noDataText:
      'Per il periodo attualmente noto non risultano giorni di apertura. È normale durante la pausa stagionale. Fanno sempre fede le informazioni ufficiali di Europa-Park.',
    loadingLabel: 'Caricamento degli orari',
    crowdLabel: 'Affluenza',
    sourceNote:
      'Orari e affluenza provengono dalla fonte indipendente ParkQueueTimes.com e sono un orientamento, non un impegno. In loco e per la pianificazione fanno fede le informazioni ufficiali di Europa-Park.',
    officialLinkLabel: 'Orari ufficiali di Europa-Park',
    faq: [
      {
        question: 'A che ora apre Europa-Park?',
        answer:
          'Nella stagione estiva Europa-Park apre di solito alle 09:00 e chiude alle 18:00. Nella stagione invernale e nei giorni con eventi valgono orari diversi. La tabella in questa pagina mostra gli orari comunicati per ogni prossimo giorno di apertura.',
      },
      {
        question: 'Europa-Park è aperto tutto l’anno?',
        answer:
          'No. Alla stagione estiva segue quella invernale, con in mezzo una pausa stagionale di alcune settimane in cui il parco è chiuso. In quel periodo la fonte non comunica giorni di apertura e questa pagina non mostra orari.',
      },
      {
        question: 'Quanto tempo prima dell’apertura conviene arrivare?',
        answer:
          'Per fare le prime attrazioni senza lunghe file, presentarsi all’ingresso 30-45 minuti prima dell’apertura ufficiale funziona bene nella pratica. Nei giorni affollati le code crescono sensibilmente già nella prima ora di attività.',
      },
      {
        question: 'Gli orari cambiano con breve preavviso?',
        answer:
          'Sì, capita — per eventi, serate prolungate o condizioni meteo. Questa pagina riporta l’ultimo stato comunicato e indica l’ora della consultazione. Fa sempre fede l’informazione ufficiale del gestore.',
      },
    ],
    relatedTitle: 'Da vedere anche',
    relatedWait: 'Tempi di attesa attuali',
    relatedCrowd: 'Previsione affluenza',
  },
};

export function getOpeningHoursPack(locale: OpeningHoursLocale): OpeningHoursPack {
  return openingHoursPacks[locale];
}
