import type { PlanningLocalePack } from '../planning-types';

export const dePlanning: PlanningLocalePack = {
  common: {
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    language: 'Sprache wählen',
    home: 'Startseite',
    plannerLabel: 'Besuch planen',
    answerLabel: 'Kurzantwort',
    updatedLabel: 'Geprüft',
    sourcePrefix: 'Quelle',
    onThisPage: 'Auf dieser Seite',
    relatedTitle: 'Passende nächste Schritte',
    sourcesTitle: 'Quellen und Aktualität',
    sourcesIntro:
      'Veränderliche Angaben werden aus Betreiber- und Behördenquellen übernommen. Preise, Öffnungszeiten und Regeln bitte vor der Buchung nochmals in der verlinkten Primärquelle prüfen.',
    correctionLabel: 'Etwas stimmt nicht?',
    correctionText:
      'Melde uns veraltete Angaben. Wir trennen belegte Fakten, Rechenannahmen und redaktionelle Einordnung sichtbar voneinander.',
    unofficial: 'Unabhängiges Community-Projekt',
    footerText: 'Unabhängige Planungshilfe – nicht mit Europa-Park verbunden.',
    overview: 'Überblick',
    tool: 'Planungswerkzeug',
    decisions: 'Entscheidungshilfe',
    faq: 'Häufige Fragen',
    notRecommendation: 'Verzeichniseintrag, keine Empfehlung',
    verifyBeforeVisit: 'Vor dem Besuch direkt beim Anbieter prüfen',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 oder 2 Tage',
    costCalculator: 'Kosten',
    familyGuide: 'Familien',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Übernachten',
    restaurantGuide: 'Essen in Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Europa-Park planen: unabhängiger Guide mit Rechnern',
      description:
        'Europa-Park Besuch praktisch planen: 1 oder 2 Tage, Kosten, Familie, Rulantica, Übernachtung und Restaurants in Rust – mit interaktiven Hilfen.',
      eyebrow: 'Europa-Park Planungszentrale',
      heading: 'Plane den Europa-Park nach deinen echten Bedürfnissen',
      answer:
        'Für einen ersten Besuch ist ein voller Tag das Minimum; zwei Tage sind meist entspannter, besonders mit Kindern, Shows oder hohem Besucherandrang. Nutze Datum, Gruppentyp und Budget statt einer pauschalen Top-10-Liste.',
      sectionTitle: 'Von der Frage zum realistischen Besuchsplan',
      sectionIntro:
        'Die Werkzeuge verbinden deine Ausgangslage mit aktuellen Fakten. Sie ersetzen keine offizielle Buchung, reduzieren aber die wichtigsten Fehlentscheidungen vor der Reise.',
      points: [
        {
          title: 'Zeit zuerst festlegen',
          text: 'Entscheide anhand von Ankunft, Zielattraktionen und erwartetem Andrang, ob ein oder zwei Parktage sinnvoll sind.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Gesamtkosten statt Ticketpreis',
          text: 'Rechne Parktickets, Rulantica, Parken und Unterkunft gemeinsam – als Bandbreite, nicht als falschen Fixpreis.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Route an die Gruppe anpassen',
          text: 'Körpergröße, Alter, Pausenbedarf und Interessen entscheiden über eine gute Reihenfolge stärker als allgemeine Rankings.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Wie viele Tage sollte man für den Europa-Park einplanen?',
          answer:
            'Ein voller Tag kann für ausgewählte Highlights reichen. Zwei Tage sind für Erstbesucher, Familien, Shows und einen weniger gehetzten Rundgang meist realistischer.',
        },
        {
          question: 'Ist diese Seite offiziell?',
          answer:
            'Nein. ResortPass Tracker ist ein unabhängiges Community-Projekt. Für Eintritt, Sicherheit und tagesaktuelle Regeln gelten die offiziellen Europa-Park-Informationen.',
        },
        {
          question: 'Warum zeigt der Rechner Preisspannen?',
          answer:
            'Europa-Park und Rulantica arbeiten mit datumsabhängigen Onlinepreisen. Eine Bandbreite ist ehrlicher, solange kein konkretes Datum im offiziellen Ticketshop gewählt wurde.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park 1 oder 2 Tage? Interaktiver Besuchsplaner',
      description:
        'Reicht ein Tag im Europa-Park? Erstelle einen Plan nach Besuchsdatum, Gruppe, Ankunft, Andrang und Rulantica – inklusive Tagesroute.',
      eyebrow: '1 oder 2 Tage',
      heading: 'Wie viele Tage brauchst du im Europa-Park?',
      answer:
        'Ein Tag passt bei früher Ankunft und klarer Prioritätenliste. Zwei Tage sind die robustere Wahl für Familien, Shows und viele Themenbereiche; mit Rulantica sind zwei bis drei Tage meist sinnvoller.',
      sectionTitle: 'Was die Besuchsdauer wirklich verändert',
      sectionIntro:
        'Nicht jede Gruppe braucht dieselbe Route. Plane zunächst Zeitblöcke und Prioritäten; konkrete Wartezeiten entscheiden erst am Besuchstag über die Feinreihenfolge.',
      points: [
        {
          title: 'Ein Tag: konsequent auswählen',
          text: 'Starte zur Öffnung, priorisiere drei bis fünf Hauptziele und halte Alternativen in benachbarten Themenbereichen bereit.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Zwei Tage: Bereiche aufteilen',
          text: 'Verteile große Attraktionen, Familienangebote und Shows auf zwei Parkhälften, damit Wege und Doppelungen sinken.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Hoher Andrang: Puffer einbauen',
          text: 'Reserviere Zeit für Essen, technische Ausfälle und Wege. Live-Wartezeiten helfen bei der Anpassung vor Ort.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Schafft man den Europa-Park an einem Tag?',
          answer:
            'Man kann viele Highlights schaffen, aber selten alles. Der Planer bewertet Ankunft, Gruppe und Andrang und erhöht bei ungünstigen Bedingungen die empfohlene Dauer.',
        },
        {
          question: 'Sollte Rulantica am selben Tag besucht werden?',
          answer:
            'Ein Abendticket kann für wasserbegeisterte Erwachsene oder ältere Kinder passen. Mit kleinen Kindern oder hohem Wasserwelt-Fokus ist ein separater Tag entspannter.',
        },
        {
          question: 'Ist die Route eine Wartezeitgarantie?',
          answer:
            'Nein. Wetter, Ausfälle und tatsächlicher Besucherandrang können den Tagesplan verändern. Prüfe am Besuchstag die offizielle App und die Live-Wartezeiten.',
        },
      ],
    },
    costCalculator: {
      title: 'Europa-Park Kostenrechner 2026: Tickets, Parken, Hotel',
      description:
        'Berechne die realistische Europa-Park-Kostenspanne für Erwachsene, Kinder, 1 oder 2 Tage, Rulantica, Parken und Unterkunft.',
      eyebrow: 'Gesamtkosten',
      heading: 'Was kostet dein Europa-Park-Besuch insgesamt?',
      answer:
        'Der Eintritt ist nur ein Teil des Budgets. Der Rechner kombiniert datumsabhängige Ticketspannen mit Parken, Rulantica und deinem Unterkunftsbudget und zeigt bewusst einen Mindest- und Höchstwert.',
      sectionTitle: 'So wird aus Preisen ein brauchbares Budget',
      sectionIntro:
        'Wir verwenden offizielle Preisbereiche, aber keine erfundenen Hotelpreise. Unterkunft, Verpflegung und Anreise gibst du als eigene Annahmen ein.',
      points: [
        {
          title: 'Datumspreise als Spanne',
          text: 'Ohne konkretes Ticketdatum ist eine Bandbreite belastbarer als ein einzelner Werbepreis.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Familienbudget pro Person',
          text: 'Die Gesamtsumme und der Wert pro Person machen 1- und 2-Tagesvarianten leichter vergleichbar.',
          icon: 'tabler:users',
        },
        {
          title: 'Annahmen bleiben sichtbar',
          text: 'Unterkunft und Nebenkosten werden getrennt ausgewiesen, damit du jede Annahme selbst ersetzen kannst.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Sind die Preise im Rechner garantiert?',
          answer:
            'Nein. Es sind offizielle Preisbereiche mit Prüfdatum. Verfügbarkeit, Besuchsdatum, Bearbeitungsgebühren und Buchungskanal können den Endpreis verändern.',
        },
        {
          question: 'Warum wird kein durchschnittlicher Hotelpreis eingesetzt?',
          answer:
            'Unterkunftspreise hängen stark von Datum, Belegung und Stornierungsbedingungen ab. Deshalb gibst du einen realen gefundenen Preis selbst ein.',
        },
        {
          question: 'Sind Essen und Anreise enthalten?',
          answer:
            'Noch nicht automatisch. Diese Kosten unterscheiden sich stark nach Herkunft und Gewohnheiten und sollten als zusätzlicher persönlicher Puffer eingeplant werden.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park mit Kindern: Größenfinder und Familienplan',
      description:
        'Europa-Park mit Baby, Kleinkind oder Schulkind planen: Attraktionen nach Alter und Körpergröße filtern, Begleitung erkennen und Pausen sinnvoll setzen.',
      eyebrow: 'Familien und Kinder',
      heading: 'Welche Attraktionen passen zu deinem Kind?',
      answer:
        'Für Fahrgeschäfte zählen häufig Alter und Körpergröße gemeinsam. Nutze den Finder als Vorauswahl und prüfe vor Ort immer die Messlatte, Hinweisschilder und Anweisungen des Personals.',
      sectionTitle: 'Ein Familienplan braucht mehr als eine Fahrgeschäftsliste',
      sectionIntro:
        'Pausen, Essen, Wickeln, Geschwister mit unterschiedlicher Größe und mögliche Begleitregeln bestimmen die Route genauso wie Lieblingsattraktionen.',
      points: [
        {
          title: 'Alter und Größe kombinieren',
          text: 'Der Finder unterscheidet Mindestvoraussetzung und mögliche Erwachsenenbegleitung anhand der offiziellen Detailseiten.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Ruhige Blöcke einplanen',
          text: 'Indoor-Fahrten, Spielbereiche und Shows eignen sich als Puffer zwischen intensiveren Attraktionen.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Vor Ort erneut prüfen',
          text: 'Sicherheitsvorgaben können sich ändern und werden verbindlich am Eingang der jeweiligen Attraktion angezeigt.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Reicht die Körpergröße allein?',
          answer:
            'Nein. Einige Attraktionen haben zusätzlich ein Mindestalter oder verlangen bis zu einem bestimmten Alter beziehungsweise einer Größe eine erwachsene Begleitperson.',
        },
        {
          question: 'Kann der Finder die Mitfahrt garantieren?',
          answer:
            'Nein. Maßgeblich sind die aktuellen Regeln, die Messung und das Personal vor Ort. Gesundheit, Körperbau, Schwangerschaft oder technische Änderungen können weitere Einschränkungen bedeuten.',
        },
        {
          question: 'Was ist Baby-Switch?',
          answer:
            'Bei ausgewählten Attraktionen können sich Betreuungspersonen nacheinander abwechseln. Die konkrete Durchführung sollte direkt an der Attraktion erfragt werden.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Rulantica planen: ganzer Tag, Abendticket oder Kombination?',
      description:
        'Rulantica mit Europa-Park kombinieren: interaktiver Entscheider für Tages-, Abend- oder Moonlight-Ticket, Kinder, Packliste und Besuchsdauer.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Wie passt Rulantica in deinen Kurzurlaub?',
      answer:
        'Ein ganzer Rulantica-Tag ist für Familien und Wasserwelt-Fans am entspanntesten. Abend- oder Moonlight-Tickets passen eher als Ergänzung, wenn Energie und Alter der Gruppe dazu passen.',
      sectionTitle: 'Ticketzeit nach Ziel auswählen',
      sectionIntro:
        'Die Wasserwelt ist regulär bis abends geöffnet. Entscheidend ist, ob Rulantica ein Hauptziel oder nur ein Zusatz nach dem Park sein soll.',
      points: [
        {
          title: 'Tagesticket',
          text: 'Mehr Zeit für Kinderbereiche, Rutschen, Pausen und saisonale Außenbereiche – besonders bei einem eigenen Rulantica-Tag.',
          icon: 'tabler:sun',
        },
        {
          title: 'Abend oder Moonlight',
          text: 'Weniger Zeit und meist niedrigerer Preis, aber nach einem langen Parktag auch weniger Energiereserve.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Packliste ernst nehmen',
          text: 'Handtuch, Badekleidung und aktuelle Regeln vorab prüfen; Tagesgäste sollten nicht mit einem spontanen Handtuchverleih rechnen.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Reicht ein Abendticket für Rulantica?',
          answer:
            'Für ausgewählte Rutschen oder einen kurzen Abschluss kann es reichen. Familien mit kleinen Kindern und Gäste, die viele Bereiche nutzen möchten, profitieren meist von einem ganzen Tag.',
        },
        {
          question: 'Kann man Europa-Park und Rulantica an einem Tag schaffen?',
          answer:
            'Technisch ja, aber die Kombination ist anstrengend und erfordert starke Priorisierung. Der Entscheider berücksichtigt Parktage, Kinder und gewünschtes Tempo.',
        },
        {
          question: 'Kann man in Rulantica Handtücher leihen?',
          answer:
            'Laut offizieller FAQ gibt es für Tagesgäste keinen regulären Handtuchverleih. Bringe deshalb ein eigenes Handtuch mit und prüfe die FAQ vor dem Besuch erneut.',
        },
      ],
    },
    stayGuide: {
      title: 'Europa-Park übernachten: Hotel, Rust oder Umland vergleichen',
      description:
        'Übernachten beim Europa-Park vergleichen: Erlebnishotel, Pension, Ferienwohnung, Camping und Umland nach Zeitgewinn, Selbstversorgung und Transport.',
      eyebrow: 'Übernachten',
      heading: 'Welche Unterkunft passt zu deinem Besuchsplan?',
      answer:
        'Die beste Unterkunft hängt nicht nur vom Zimmerpreis ab. Vergleiche frühen Eintritt, Wege, Transport, Selbstversorgung, Stornierung und die Kosten der gesamten Gruppe.',
      sectionTitle: 'Szenarien statt beliebiger Hotelrangliste',
      sectionIntro:
        'Der Vergleich zeigt Unterkunftstypen und offene Prüffragen. Er nennt bewusst keine unbestätigten Preise und keine Rangfolge einzelner Betriebe.',
      points: [
        {
          title: 'Resortvorteile',
          text: 'Offizielle Erlebnishotels können frühen Eintritt und Shuttle bieten; Gültigkeit und geöffnete Attraktionen für den Termin prüfen.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust und Selbstversorgung',
          text: 'Pensionen und Ferienwohnungen können kurze Wege oder eine Küche bieten – jede Ausstattung muss beim konkreten Betrieb geprüft werden.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Umland und Transport',
          text: 'Ein niedrigerer Zimmerpreis kann durch Parken, letzte Busverbindungen und zusätzliche Wege relativiert werden.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Sind offizielle Europa-Park-Hotels immer die beste Wahl?',
          answer:
            'Nein. Sie sind stark, wenn Resortvorteile und Komfort wichtig sind. Für Selbstversorgung, größere Gruppen oder ein anderes Budget können unabhängige Unterkünfte passender sein.',
        },
        {
          question: 'Zeigt der Vergleich aktuelle Hotelpreise?',
          answer:
            'Nein. Verlässliche Preise benötigen Reisedatum, Belegung und Buchungsbedingungen. Der Kostenrechner nimmt deshalb einen von dir geprüften Übernachtungspreis auf.',
        },
        {
          question: 'Welche Orte außer Rust sind relevant?',
          answer:
            'Unter anderem Ringsheim, Herbolzheim und weitere Gemeinden der Erlebnisregion. Entscheidend sind die konkrete Verbindung und die letzte Rückfahrt am Besuchstag.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restaurants in Rust nach dem Europa-Park: geprüftes Verzeichnis',
      description:
        'Restaurants in Rust für den Abend finden: neutrale, quellengeprüfte Einträge mit Küche, Servicehinweisen, Unsicherheiten und direkten Anbieterlinks.',
      eyebrow: 'Essen in Rust',
      heading: 'Wo kannst du nach Parkschluss in Rust essen?',
      answer:
        'Das Verzeichnis ist keine Bestenliste. Es zeigt Betriebe mit nachvollziehbarer Primär- oder Gemeindequelle und macht sichtbar, welche Öffnungszeiten, Reservierungen und Ernährungsfragen du noch direkt prüfen musst.',
      sectionTitle: 'Nützlicher als ein ungeprüftes Restaurant-Ranking',
      sectionIntro:
        'Öffnungszeiten und Ruhetage ändern sich. Deshalb trennen wir belegtes Küchenprofil, Servicehinweise und offene Fragen für jeden Eintrag.',
      points: [
        {
          title: 'Quelle statt Sterne',
          text: 'Wir übernehmen keine Plattformbewertungen als Qualitätsnachweis, sondern verlinken Betreiber- und Gemeindeseiten.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Abendservice sichtbar',
          text: 'Ein Filter nutzt nur belegte Servicehinweise. Die tatsächliche Küchenzeit muss trotzdem am Besuchstag bestätigt werden.',
          icon: 'tabler:clock',
        },
        {
          title: 'Keine erfundenen Ernährungsfilter',
          text: 'Vegan, glutenfrei oder allergietauglich wird erst angeboten, wenn belastbare aktuelle Angaben vorliegen.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Sind die gelisteten Restaurants Empfehlungen?',
          answer:
            'Nein. Ein Eintrag bedeutet nur, dass der Betrieb in einer nachvollziehbaren Quelle gefunden wurde. Geschmack, Qualität und Tischverfügbarkeit wurden nicht bewertet.',
        },
        {
          question: 'Sind die Öffnungszeiten garantiert?',
          answer:
            'Nein. Sonderöffnungen, Betriebsferien und Küchenzeiten können kurzfristig abweichen. Nutze den Anbieterlink oder rufe vor dem Besuch an.',
        },
        {
          question: 'Warum fehlen Entfernungsangaben?',
          answer:
            'Eine belastbare Gehzeit hängt vom tatsächlichen Startpunkt und der Route ab. Solche Werte werden erst nach konsistenter Karten- oder Vor-Ort-Prüfung ergänzt.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: Verfügbarkeit, Preise und Regeln',
      description:
        'ResortPass Silver und Gold verstehen: aktueller Verkaufsstatus, Preise, Besuchstage, Reservierung, Rulantica und unabhängiger Verfügbarkeitsalarm.',
      eyebrow: 'ResortPass Guide',
      heading: 'Alles Wichtige zum Europa-Park ResortPass',
      answer:
        'Silver und Gold sind derzeit nicht regulär verfügbar; ein neuer Verkaufstermin ist nicht angekündigt. Silver ist günstiger und an definierte Besuchstage gebunden, Gold flexibler und enthält zusätzliche Rulantica-Leistungen.',
      sectionTitle: 'Die Jahreskarte nach Nutzung auswählen',
      sectionIntro:
        'Der Preis allein entscheidet nicht. Relevanter sind mögliche Besuchstage, Flexibilität, Rulantica-Nutzung und ob die Karte tatsächlich verfügbar ist.',
      points: [
        {
          title: 'Verfügbarkeit zuerst',
          text: 'Der Tracker prüft den offiziellen Ticketshop regelmäßig und trennt echten Kaufstatus von Ankündigungen oder Warteschlangen.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver oder Gold',
          text: 'Silver hat definierte Besuchstage; Gold bietet mehr Flexibilität und beinhaltet zwei Rulantica-Tagestickets.',
          icon: 'tabler:scale',
        },
        {
          title: 'Regeln im Portal prüfen',
          text: 'Reservierungen, Ausschlusstage und Vertragsdetails können sich ändern und gehören vor dem Kauf in der offiziellen Quelle geprüft.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Wann gibt es wieder ResortPässe?',
          answer:
            'Aktuell ist kein neuer Verkaufstermin angekündigt. Der Tracker meldet, wenn der offizielle Shop Silver oder Gold tatsächlich wieder kaufbar zeigt.',
        },
        {
          question: 'Was kostet der ResortPass?',
          answer:
            'Nach dem zuletzt offiziell geprüften Stand kostet Silver 325 Euro für Erwachsene und 275 Euro für Kinder/Senioren; Gold 495 beziehungsweise 430 Euro.',
        },
        {
          question: 'Ist der Tracker mit Europa-Park verbunden?',
          answer:
            'Nein. Es handelt sich um ein unabhängiges Community-Projekt. Kauf, Vertrag und verbindliche Leistungen erfolgen ausschließlich über die offiziellen Anbieter.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver oder Gold? Vergleich und Entscheidungshilfe',
      description:
        'ResortPass Silver und Gold vergleichen: Preis, Besuchstage, Flexibilität, Rulantica und passende Nutzungsszenarien.',
      eyebrow: 'Silver vs. Gold',
      heading: 'Welcher ResortPass passt zu deinem Besuchsmuster?',
      answer:
        'Silver passt eher, wenn die definierten Besuchstage zu dir passen und der niedrigere Preis zählt. Gold lohnt sich eher bei maximaler Flexibilität und echter Nutzung der enthaltenen Rulantica-Tage.',
      sectionTitle: 'Nicht der teurere Pass ist automatisch besser',
      sectionIntro:
        'Vergleiche deine realen Besuchstage und Zusatzleistungen. Unbenutzte Flexibilität oder Rulantica-Tickets erzeugen keinen Gegenwert.',
      points: [
        {
          title: 'Silver: planbar günstiger',
          text: 'Geeignet, wenn du Termine früh planen kannst und die veröffentlichten Besuchstage zu deinem Kalender passen.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: mehr Flexibilität',
          text: 'Geeignet für häufigere spontane Besuche und Gäste, die zwei enthaltene Rulantica-Tagestickets tatsächlich nutzen.',
          icon: 'tabler:crown',
        },
        {
          title: 'Mit Tageskarten gegenrechnen',
          text: 'Nutze die erwartete Zahl realer Besuche und vergleiche sie mit datumsabhängigen Tagesticketpreisen.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Hat Silver Ausschlusstage?',
          answer:
            'Silver gilt an vorab definierten Öffnungstagen. Die jeweils aktuelle Liste ist in der offiziellen Detailseite und im ResortPass-Portal maßgeblich.',
        },
        {
          question: 'Sind bei Gold Rulantica-Tickets enthalten?',
          answer:
            'Nach aktuellem Betreiberstand beinhaltet Gold zwei Rulantica-Tagestickets. Bedingungen und Reservierung vor Nutzung nochmals offiziell prüfen.',
        },
        {
          question: 'Ab wie vielen Besuchen lohnt sich ein Pass?',
          answer:
            'Das hängt von den tatsächlichen Besuchsdaten, Tageskartenpreisen und genutzten Zusatzleistungen ab. Eine pauschale Besuchszahl wäre irreführend.',
        },
      ],
    },
    resortPassPrices: {
      title: 'ResortPass Preise 2026: Silver, Gold und Tageskartenvergleich',
      description:
        'Aktuelle ResortPass-Preise für Erwachsene, Kinder und Senioren mit Einordnung gegenüber datumsabhängigen Europa-Park-Tageskarten.',
      eyebrow: 'Preise 2026',
      heading: 'Was kosten ResortPass Silver und Gold?',
      answer:
        'Zuletzt offiziell geprüft: Silver 325 Euro für Erwachsene und 275 Euro für Kinder/Senioren; Gold 495 beziehungsweise 430 Euro. Beide Pässe sind derzeit nicht regulär verfügbar.',
      sectionTitle: 'Preis nur zusammen mit Nutzung bewerten',
      sectionIntro:
        'Tageskarten haben datumsabhängige Preisspannen. Eine Jahreskarte lohnt sich deshalb nicht ab einer universellen Zahl, sondern anhand deiner tatsächlichen Termine.',
      points: [
        {
          title: 'Silver',
          text: '325 Euro Erwachsene; 275 Euro Kinder von 4–11 Jahren und Senioren ab 60 Jahren – Stand der Primärquelle beachten.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 Euro Erwachsene; 430 Euro Kinder und Senioren, inklusive zusätzlicher Leistungen wie zwei Rulantica-Tagen.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Verfügbarkeit ist Voraussetzung',
          text: 'Ein Preisvergleich hilft erst, wenn der gewünschte Pass tatsächlich verkauft wird. Nutze dafür den Live-Status.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Gelten die Preise für 2026?',
          answer:
            'Die Werte wurden am angegebenen Prüfdatum aus der offiziellen Ticketseite übernommen. Der Betreiber kann Preise und Bedingungen ändern.',
        },
        {
          question: 'Sind Sondertarife verfügbar?',
          answer:
            'Die offizielle Seite nennt ermäßigte Preise für Kinder, Senioren und bestimmte Berechtigungen. Nachweise und aktuelle Bedingungen sind verbindlich.',
        },
        {
          question: 'Kann ich den ResortPass gerade kaufen?',
          answer:
            'Silver und Gold werden aktuell als nicht verfügbar geführt. Der Live-Tracker zeigt, wenn sich der tatsächliche Shopstatus ändert.',
        },
      ],
    },
    resortPassReservation: {
      title: 'ResortPass Reservierung: Besuchstage, Portal und Hotelgäste',
      description:
        'Wie ResortPass-Reservierungen funktionieren: Besuchstag hinterlegen, Kontingente, Hotelbuchung und aktuelle Regeln im ResortPass-Portal.',
      eyebrow: 'Reservierung',
      heading: 'Musst du deinen Besuch mit ResortPass reservieren?',
      answer:
        'Die konkrete Reservierung hängt vom Pass, Besuchstag und möglichen Kontingenten ab. Maßgeblich sind das ResortPass-Portal und die offiziellen FAQ; eine Hotelbuchung ersetzt nicht in jedem Fall automatisch jeden notwendigen Schritt.',
      sectionTitle: 'Vor der Anreise drei Dinge prüfen',
      sectionIntro:
        'Ein gültiger Pass, ein zulässiger Besuchstag und eine gegebenenfalls erforderliche Reservierung sind getrennte Bedingungen.',
      points: [
        {
          title: 'Pass-Portal öffnen',
          text: 'Prüfe dort Gültigkeit, hinterlegte Besuchstage und aktuelle Kontingenthinweise.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Hotelbuchung abgleichen',
          text: 'Lies die aktuelle FAQ dazu, ob und wie Besuchstage mit der konkreten Resort-Unterkunft verknüpft werden.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Bestätigung sichern',
          text: 'Halte Pass und Reservierungsnachweis am Besuchstag in der offiziellen App oder im vorgesehenen Format bereit.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Brauche ich für jeden Besuch eine Reservierung?',
          answer:
            'Das lässt sich nicht pauschal für alle Passarten und Zeiträume beantworten. Prüfe die aktuelle Regel im ResortPass-Portal vor jedem Besuch.',
        },
        {
          question: 'Ist eine Hotelbuchung automatisch eine Parkreservierung?',
          answer:
            'Die offizielle FAQ beschreibt Sonderregeln für Übernachtungsgäste. Verlasse dich nicht auf eine Annahme, sondern gleiche die konkrete Buchung im Portal ab.',
        },
        {
          question: 'Was passiert bei ausgeschöpftem Kontingent?',
          answer:
            'Die aktuelle Betreiberregel ist maßgeblich. Der Verfügbarkeitstracker überwacht den Verkauf, nicht individuelle Besuchstagskontingente im persönlichen Portal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass und Rulantica: Gold-Leistungen und Reservierung',
      description:
        'Welche Rulantica-Leistungen enthält der ResortPass Gold? Zwei Tagestickets, Planung, Reservierung und Unterschied zu Silver erklärt.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'Was beinhaltet der ResortPass bei Rulantica?',
      answer:
        'Der ResortPass Gold enthält nach aktuellem Betreiberstand zwei Rulantica-Tagestickets; Silver nicht. Reservierung, Gültigkeit und mögliche Kontingente müssen vor dem Besuch offiziell geprüft werden.',
      sectionTitle: 'Die zwei Rulantica-Tage wirklich nutzen',
      sectionIntro:
        'Der Leistungswert entsteht nur, wenn die enthaltenen Tage zu deiner Reise passen und rechtzeitig reserviert werden können.',
      points: [
        {
          title: 'Gold-Leistung einplanen',
          text: 'Behandle die zwei Tage als eigenen Bestandteil deines Jahresplans und nicht als spontane Zugabe am Parkabend.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Silver separat rechnen',
          text: 'Bei Silver müssen Rulantica-Tickets getrennt kalkuliert und nach Verfügbarkeit gebucht werden.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Zeitfenster prüfen',
          text: 'Ein ganzer Rulantica-Tag ist für Familien meist wertvoller als ein gehetzter Wechsel nach einem vollen Parktag.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Wie viele Rulantica-Tage enthält Gold?',
          answer:
            'Nach aktuellem offiziellen Leistungsumfang zwei Rulantica-Tagestickets. Vor der Nutzung gelten die aktuellen Bedingungen des Betreibers.',
        },
        {
          question: 'Enthält Silver Rulantica?',
          answer:
            'Nach aktuellem Vergleich nicht als enthaltene Standardleistung. Benötigte Rulantica-Tickets sollten separat kalkuliert werden.',
        },
        {
          question: 'Müssen die enthaltenen Tage reserviert werden?',
          answer:
            'Prüfe die jeweils aktuelle Reservierungsregel im ResortPass-Portal. Rulantica hat begrenzte Tageskontingente.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interaktiver Besuchsplaner',
    title: 'Dein realistischer Tagesrahmen',
    intro:
      'Wähle Besuchsdauer, Gruppe und Rahmenbedingungen. Du erhältst eine robuste Reihenfolge – keine minutengenaue Scheingenauigkeit.',
    dateLabel: 'Besuchsdatum',
    daysLabel: 'Geplante Parktage',
    days: ['1 Tag', '2 Tage', '3 Tage'],
    groupLabel: 'Schwerpunkt',
    groups: {
      balanced: 'Ausgewogen',
      family: 'Familie und Kinder',
      thrill: 'Achterbahnen und Action',
      shows: 'Shows und entspanntes Tempo',
    },
    arrivalLabel: 'Ankunft',
    arrivals: {
      early: 'Vor Öffnung vor Ort',
      opening: 'Zur Öffnung',
      late: 'Nach 10:30 Uhr',
    },
    crowdLabel: 'Erwarteter Andrang',
    crowds: {
      low: 'Eher niedrig',
      medium: 'Mittel',
      high: 'Hoch',
    },
    rulanticaLabel: 'Rulantica einplanen',
    submit: 'Plan erstellen',
    resultTitle: 'Deine Empfehlung',
    resultLead: 'Mit klaren Prioritäten planen',
    resultDays: 'empfohlene Tage insgesamt',
    routeLabel: 'Tagesrahmen',
    morning: 'Morgen',
    midday: 'Mittag',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    notes: {
      early: 'Sei vor der offiziellen Öffnung am Eingang und lege drei Hauptziele fest.',
      late: 'Bei später Ankunft ist ein zweiter Tag robuster als ein überladener Sprint.',
      busy: 'Bei hohem Andrang: Live-Wartezeiten nutzen und Alternativen pro Bereich bereithalten.',
      rulantica: 'Rulantica mit kleinen Kindern oder hohem Wasserfokus besser als eigenen Tag behandeln.',
      family: 'Plane feste Essens- und Ruheblöcke sowie mindestens eine Indoor-Alternative.',
      thrill: 'Nutze Single Rider und VirtualLine nur, wenn sie am Besuchstag tatsächlich angeboten werden.',
      shows: 'Prüfe Showzeiten zuerst und baue die Route um diese festen Termine.',
    },
    routes: {
      balanced: [
        'Mit zwei wichtigen Attraktionen starten und dabei in einem Parkbereich bleiben.',
        'Früh oder spät essen, dann eine Indoor-Attraktion oder Show als ruhigeren Block nutzen.',
        'Benachbarte Themenbereiche abarbeiten und Live-Wartezeiten für den Wechsel vergleichen.',
        'Offene Priorität nachholen, Souvenirs und spontane Verlängerung der Parköffnung prüfen.',
      ],
      family: [
        'Mit einer passenden Familienattraktion beginnen und die Körpergröße vorab am Eingang prüfen.',
        'Frühe Pause, Essen und eine ruhige Indoor-Fahrt oder Show einplanen.',
        'Spielbereich und zwei weitere altersgerechte Attraktionen in derselben Parkhälfte verbinden.',
        'Energie der Kinder entscheiden lassen; lieber ein Highlight als einen erschöpften Endspurt.',
      ],
      thrill: [
        'Top-Coaster zur Öffnung priorisieren und nicht für einzelne Bahnen quer durch den Park laufen.',
        'VirtualLine- und Single-Rider-Angebote prüfen; Mittag für eine nahe Alternative nutzen.',
        'Zweite Coaster-Gruppe nach Live-Wartezeiten wählen und technische Ausfälle einkalkulieren.',
        'Letzte Runde strategisch nahe dem gewünschten Abschlussbereich planen.',
      ],
      shows: [
        'Showplan prüfen und eine entspannte Attraktion auf dem Weg zum ersten Termin wählen.',
        'Frühes Essen mit einer Indoor-Show oder Themenfahrt verbinden.',
        'Zweiten festen Showtermin setzen und dazwischen nur nahe Attraktionen einplanen.',
        'Atmosphäre, Gastronomie und eine letzte Fahrt ohne unnötigen Parkwechsel genießen.',
      ],
    },
    disclaimer:
      'Planungshilfe ohne Garantie. Öffnungszeiten, Wartezeiten, VirtualLine und Attraktionsbetrieb können sich kurzfristig ändern.',
    forecastCta: 'Besucherprognose prüfen',
  },
  costCalculator: {
    eyebrow: 'Budgetplaner 2026',
    title: 'Reale Kostenspanne berechnen',
    intro:
      'Offizielle Ticketspannen plus deine Unterkunftsannahme. Essen, Anreise und optionale Extras bleiben bewusst außerhalb der automatischen Summe.',
    adults: 'Erwachsene ab 12',
    children: 'Kinder 4–11',
    days: 'Europa-Park',
    oneDay: '1 Tag',
    twoDays: '2 Tage',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Nicht einplanen',
      day: 'Tagesticket',
      evening: 'Abendticket ab 17 Uhr',
      moonlight: 'Moonlight ab 19 Uhr',
    },
    parking: 'Regulär am Europa-Park parken',
    nights: 'Übernachtungen',
    lodgingPerNight: 'Unterkunft pro Nacht gesamt',
    calculate: 'Budget aktualisieren',
    resultEyebrow: 'Deine Kostenspanne',
    total: 'Geschätzte Gesamtkosten',
    rangeConnector: 'bis',
    perPerson: 'pro Person',
    breakdown: 'Aufteilung',
    europaParkTickets: 'Europa-Park-Tickets',
    rulanticaTickets: 'Rulantica-Tickets',
    parkingCost: 'Parken',
    lodgingCost: 'Unterkunft',
    variableNote: 'Ticketpreise sind datumsabhängig; die Spanne ist keine Preisgarantie.',
    assumptionNote: 'Verpflegung, Anreise und Gebühren bitte zusätzlich einplanen.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Familienfinder',
    title: 'Attraktionen nach Alter und Größe filtern',
    intro:
      'Der Finder nutzt eine bewusst kleine, offiziell verifizierte Auswahl. Die verbindliche Entscheidung trifft immer das Personal vor Ort.',
    age: 'Alter des Kindes',
    height: 'Körpergröße',
    interest: 'Interesse',
    interests: {
      all: 'Alle verifizierten Beispiele',
      calm: 'Ruhig',
      family: 'Familienabenteuer',
      thrill: 'Action',
      indoor: 'Indoor',
    },
    submit: 'Passende Beispiele zeigen',
    resultTitle: 'Verifizierte Auswahl',
    resultCount: 'Attraktionen angezeigt',
    eligible: 'Voraussetzung erfüllt',
    accompanied: 'Erwachsene Begleitung nötig',
    notYet: 'Voraussetzung nicht erfüllt',
    minimum: 'Minimum',
    years: 'Jahre',
    centimeters: 'cm',
    indoor: 'Indoor',
    source: 'Offizielle Quelle',
    noResults: 'Für diesen Filter ist noch keine verifizierte Beispielattraktion hinterlegt.',
    disclaimer:
      'Keine Mitfahrgarantie. Vor Ort gelten Hinweisschild, Messlatte, Gesundheits- und Sicherheitsregeln sowie die Anweisung des Personals.',
    officialFilter: 'Alle Attraktionen im offiziellen Filter prüfen',
  },
  rulanticaPlanner: {
    eyebrow: 'Kombi-Entscheider',
    title: 'Welches Rulantica-Ticket passt in deine Reise?',
    intro:
      'Der Entscheider gewichtet Parktage, Kinder, Wasserfokus und Energieniveau. Preise und Verfügbarkeit prüfst du danach offiziell.',
    parkDays: 'Europa-Park-Tage',
    parkDayOptions: ['1 Parktag', '2 Parktage', '3 oder mehr Tage'],
    children: 'Kinder in der Gruppe',
    childOptions: ['Keine Kinder', 'Kinder unter 8', 'Ältere Kinder/Jugendliche'],
    waterPriority: 'Bedeutung von Rulantica',
    priorityOptions: ['Nur ausprobieren', 'Wichtiger Zusatz', 'Hauptziel'],
    energy: 'Gewünschtes Tempo',
    energyOptions: ['Entspannt', 'Ausgewogen', 'Voller Programmplan'],
    submit: 'Ticketart einordnen',
    resultLabel: 'Planungsempfehlung',
    recommendations: {
      day: {
        title: 'Ein ganzer Rulantica-Tag',
        text: 'Für kleine Kinder oder hohen Wasserfokus gibt ein eigener Tag genug Zeit für Pausen, Umziehen und mehrere Bereiche.',
      },
      evening: {
        title: 'Abendticket als Ergänzung',
        text: 'Passt bei normalem Tempo und klarer Auswahl – aber plane nach dem Europa-Park eine echte Pause und Anreisezeit ein.',
      },
      moonlight: {
        title: 'Moonlight für einen kurzen Abschluss',
        text: 'Drei Stunden passen eher zu erfahrenen, energiegeladenen Gästen mit wenigen Prioritäten als zu einem vollständigen Erstbesuch.',
      },
      separate: {
        title: 'Rulantica getrennt einplanen',
        text: 'Bei entspanntem Tempo oder einer längeren Reise ist ein separater Block robuster als der Wechsel nach einem vollen Parktag.',
      },
    },
    checklistTitle: 'Vorher einpacken und prüfen',
    checklist: [
      'Eigenes Handtuch für Tagesgäste',
      'Badekleidung und trockene Wechselkleidung',
      'Aktuelle Öffnungs- und Revisionszeiten',
      'Alters- und Größenregeln für gewünschte Rutschen',
      'Reservierung, Ticket und Schließfachoption',
    ],
    officialNote:
      'Die offizielle FAQ bleibt für Einlass, Kleidung, Handtücher, Kinderwagen und Schließfächer maßgeblich.',
    officialCta: 'Rulantica FAQ öffnen',
  },
  stayComparator: {
    eyebrow: 'Unterkunftsvergleich',
    title: 'Welche Übernachtungsart passt zu deiner Reise?',
    intro:
      'Vergleiche acht Unterkunftsarten nach belegbaren Merkmalen. Der Finder zeigt keine Rangliste und keine ungeprüften Preise – er grenzt die sinnvolle Recherche ein.',
    filtersLabel: 'Unterkünfte filtern',
    scenarioLabel: 'Was ist dir besonders wichtig?',
    allScenarios: 'Alle Reisesituationen',
    prioritiesLabel: 'Zusätzliche Merkmale',
    priorities: {
      operatorGuestBenefits: 'Resort-Gästevorteile',
      selfCatering: 'Selbstversorgung',
      ownSleepingUnitRequired: 'Eigene Schlafausrüstung',
      groupFormats: 'Für Gruppen geeignet',
      walkingAccess: 'Zu Fuß zum Park',
      shuttleOrTransit: 'Shuttle oder ÖPNV',
    },
    reset: 'Filter zurücksetzen',
    resultsLabel: 'Vergleichbare Unterkunftsarten',
    resultSingular: 'Unterkunftsart',
    resultPlural: 'Unterkunftsarten',
    operatorRelation: {
      resort_operated: 'Vom Europa-Park Resort betrieben',
      independent: 'Unabhängiger Betrieb',
    },
    states: {
      verified: 'Belegt',
      available_for_this_type: 'Für diesen Typ verfügbar',
      not_applicable: 'Nicht zutreffend',
      varies_by_property: 'Je Unterkunft verschieden',
      must_verify: 'Vor Buchung prüfen',
    },
    verifyTitle: 'Vor der Buchung konkret prüfen',
    source: 'Quelle öffnen',
    checkedAt: 'Geprüft am',
    emptyTitle: 'Keine Unterkunftsart passt zu allen Filtern',
    emptyText:
      'Entferne ein Merkmal oder wähle wieder alle Reisesituationen. Ein leeres Ergebnis ist keine Aussage über einzelne Betriebe.',
    priceNoteTitle: 'Warum hier keine Hotelpreise stehen',
    priceNoteText:
      'Unterkunftspreise ändern sich nach Datum, Belegung, Tarif und Leistung. Vergleiche erst die passende Art und prüfe anschließend den Endpreis direkt beim Anbieter.',
    notRanking:
      'Die Reihenfolge ist neutral. Sie ist weder Qualitätsurteil noch bezahlte Empfehlung.',
    noJs:
      'Ohne JavaScript bleiben alle Unterkunftsarten und Prüflisten sichtbar; nur die interaktiven Filter fehlen.',
    scenarioLabels: {
      'operator-benefits-priority': 'Früheren Eintritt und Resort-Transport priorisieren',
      'park-and-rulantica-without-car': 'Europa-Park und Rulantica ohne eigenes Auto kombinieren',
      'own-motorhome-or-caravan': 'Mit eigenem Wohnmobil oder Caravan anreisen',
      'own-tent': 'Mit eigenem Zelt übernachten',
      'large-group-themed-stay': 'Thematische Unterkunft für Familie, Verein oder Gruppe',
      'self-catering-filter': 'Selbstversorgung als Auswahlkriterium',
      'walkability-filter': 'Unterkunft nach Fußweg zum Haupteingang filtern',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park Erlebnishotel',
        definition:
          'Eines der sechs vom Resort geführten 4-Sterne-(Superior)-Erlebnishotels.',
        mustVerify: [
          'Vorteile für den konkreten Reisetermin',
          'welche Attraktionen beim früheren Eintritt tatsächlich geöffnet sind',
          'Zimmerbelegung und Barrierefreiheit',
          'ob Eintrittskarten im gewählten Arrangement enthalten oder separat sind',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Zimmerunterkunft in Silver Lake City mit eigenem Gästevorteilsprofil.',
        mustVerify: [
          'aktueller Rust-Bus-Fahrplan',
          'Vorteile für den konkreten Reisetermin',
          'Zimmerbelegung und Barrierefreiheit',
          'mögliche Veranstaltungslärmphasen in Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Thematisierte Gruppen- und Familienunterkünfte in Tipis, Planwagen, Blockhauszimmern und Western Houses.',
        mustVerify: [
          'Sanitär- und Schlafraumkonfiguration der gewählten Kategorie',
          'ob Frühstück verpflichtend oder zubuchbar ist',
          'Vorteile für den konkreten Reisetermin',
          'mögliche Veranstaltungslärmphasen',
          'Eignung der Etagenbettlängen für die Reisenden',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Stellplätze in Silver Lake City für Wohnmobile und Caravans.',
        mustVerify: [
          'Fahrzeugmaße und passende Stellplatzkategorie',
          'Strom- und Wasserbedingungen der konkreten Buchung',
          'Anreise-, Ruhe- und Abreisezeiten',
          'aktuelle Vorteile und Rust-Bus-Fahrplan',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Zeltplatz in Silver Lake City für Gäste mit eigenem Zelt.',
        mustVerify: [
          'Zelt- und Stellflächenregeln',
          'Strombedarf und Anschlussbedingungen',
          'Sanitär- und Frühstücksoptionen',
          'Wetter, Ruhezeiten und aktuelle Gästevorteile',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Unabhängiges Hotel oder Gästehaus in Rust',
        definition:
          'Unterkunft eines unabhängigen Betriebs innerhalb der Gemeinde Rust.',
        mustVerify: [
          'aktuelle Betriebs- und Buchungsverfügbarkeit',
          'tatsächliche Fußroute zu dem benötigten Eingang',
          'Frühstück, Parken, Stornierung und Barrierefreiheit',
          'keine Resort-Hotelvorteile unterstellen',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Unabhängige Ferienwohnung in Rust',
        definition:
          'Von der Gemeinde Rust als Ferienwohnung geführte unabhängige Unterkunft.',
        mustVerify: [
          'Küchen- und Essplatzausstattung statt sie aus der Kategorie abzuleiten',
          'tatsächliche Fußroute zu dem benötigten Eingang',
          'Mindestaufenthalt, Endreinigung, Parken und Stornierung',
          'aktuelle Registrierung und Verfügbarkeit',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Unterkunft in einer Nachbargemeinde',
        definition:
          'Unabhängige Unterkunft in einer Gemeinde der Erlebnisregion Europa-Park außerhalb von Rust.',
        mustVerify: [
          'Verbindung am konkreten Wochentag und zu Parkschluss',
          'letzte Rückfahrt sowie Umstiege',
          'Parken am Ziel und an der Unterkunft',
          'aktuelle Betriebs- und Buchungsverfügbarkeit',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Verifiziertes Verzeichnis',
    title: 'Kleinere Restaurants in Rust sachlich vergleichen',
    intro:
      'Suche acht redaktionell geprüfte Verzeichniseinträge. Sichtbar sind nur belegte Merkmale; Qualität, Preisniveau und Tischverfügbarkeit werden nicht behauptet.',
    filtersLabel: 'Restaurants filtern',
    searchLabel: 'Name oder Adresse',
    searchPlaceholder: 'Zum Beispiel Adler oder Fischerstraße',
    statusLabel: 'Prüfstatus',
    allStatuses: 'Alle Prüfstatus',
    statuses: {
      first_party_verified: 'Durch Betreiberquelle belegt',
      public_directory_verified: 'Im kommunalen Verzeichnis belegt',
      license_page_verified: 'Über Lizenzseite belegt',
      needs_reverification: 'Erneute Prüfung nötig',
    },
    timeLabel: 'Belegtes Zeitfenster',
    allTimes: 'Alle belegten Zeitfenster',
    timeSlots: {
      breakfast: 'Frühstück',
      evening: 'Abendservice',
    },
    distanceLabel: 'Belegte Entfernung',
    allDistances: 'Alle belegten Entfernungen',
    distanceOptions: [
      { maxMetres: 500, label: 'Bis 500 m' },
      { maxMetres: 1000, label: 'Bis 1 km' },
      { maxMetres: 2000, label: 'Bis 2 km' },
    ],
    needsLabel: 'Belegte Bedürfnisse',
    familyFeatures: {
      kids_menu: 'Kinderspeisekarte genannt',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetarische Optionen belegt',
      vegan_evidence: 'Vegane Optionen belegt',
      gluten_free_evidence: 'Glutenfreie Optionen belegt',
    },
    reset: 'Filter zurücksetzen',
    resultsLabel: 'Geprüfte Verzeichniseinträge',
    resultSingular: 'Restaurant',
    resultPlural: 'Restaurants',
    noJs:
      'Ohne JavaScript bleiben alle Einträge, Quellen und Unsicherheiten lesbar; nur Suche und Filter fehlen.',
    emptyTitle: 'Kein Eintrag passt zu diesen Filtern',
    emptyText:
      'Entferne einen Filter. Fehlende Treffer können auch bedeuten, dass das Merkmal noch nicht belastbar belegt ist.',
    serviceEvidence: 'Belegtes Angebot',
    cuisineEvidence: 'Belegtes Küchenprofil',
    filterEvidence: 'Filterbeleg',
    evidenceCheckedAt: 'Filterbeleg geprüft',
    source: 'Primärquelle',
    operatorWebsite: 'Betreiberseite',
    corroboratingSource: 'Zusätzliche Quelle',
    uncertaintyTitle: 'Was vor dem Besuch offen bleibt',
    verificationNote: 'Prüfnotiz',
    checkedAt: 'Eintrag geprüft',
    reviewDue: 'Prüftermin überschritten',
    notRecommendation: 'Keine Empfehlung',
    notRecommendationTitle: 'Neutrales Verzeichnis, keine Bestenliste',
    notRecommendationText:
      'Aufnahme und Reihenfolge sind kein Qualitätsurteil. Öffnungszeiten, Karte, Allergene und Reservierung bitte direkt beim Betrieb prüfen.',
    unavailableEvidenceTitle: 'Diese Filter blenden wir bewusst nicht ein',
    unavailableEvidence: {
      time: 'Zeitfenster sind noch nicht ausreichend einheitlich belegt.',
      distance: 'Entfernungen wurden noch nicht mit einer konsistenten Route gemessen.',
      family: 'Familienmerkmale sind noch nicht ausreichend belegt.',
      diet: 'Vegetarische, vegane und glutenfreie Optionen sind noch nicht belastbar genug erfasst.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['gutbürgerliche Küche'],
        serviceEvidence: ['Abendservice laut Betreiberseite'],
        verificationNote:
          'Betreiberseite und Impressum waren erreichbar; Adresse, Kontakt, Küchenprofil und aktuelle Öffnungshinweise wurden am Prüftag angezeigt.',
        uncertainties: [
          'Sonderöffnungen und Betriebsferien sind zeitabhängig.',
          'Reservierungsverfügbarkeit wurde nicht geprüft.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regionale und internationale Gerichte',
          'Burger, Ribs, Pasta und Steak laut Betreiber',
        ],
        serviceEvidence: [
          'Frühstück laut Betreiberseite',
          'Abendservice laut Betreiberseite',
        ],
        verificationNote:
          'Betreiberseite war erreichbar und nannte Adresse, Speiseprofil sowie Frühstücksangebot.',
        uncertainties: [
          'Live-Öffnungsstatus auf der Seite kann kurzfristig wechseln.',
          'Selbstdarstellung und eingebettete Bewertungen wurden nicht als Qualitätsbeleg übernommen.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['italienische Küche'],
        serviceEvidence: ['Abendservice laut kommunalem Verzeichnis'],
        verificationNote:
          'Betreiberseite bestätigt Betrieb, Adresse und italienisches Restaurant; das kommunale Verzeichnis liefert einen aktuellen Öffnungsrahmen.',
        uncertainties: [
          'Öffnungszeiten vor Besuch auf der Betreiberseite oder telefonisch bestätigen.',
          'Die vom Betreiber genannte Gehzeit zum Park wurde nicht unabhängig gemessen.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['griechische und internationale Küche'],
        serviceEvidence: ['Kinderspeisekarte laut Betreiberseite'],
        verificationNote:
          'Betreiberseite war erreichbar und bestätigte Adresse, Küchenprofil und Reservierungskontakt.',
        uncertainties: [
          'Die Betreiberseite nennt im auslesbaren Inhalt keine stabilen Wochenöffnungszeiten.',
          'Tischverfügbarkeit wurde nicht geprüft.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['badische Küche', 'regionale Gerichte'],
        serviceEvidence: ['Abendservice laut Betreiberseite'],
        verificationNote:
          'Betreiberseite war erreichbar und nannte Adresse, badisches Küchenprofil und aktuellen Wochenrhythmus.',
        uncertainties: [
          'Betriebsferien und Ruhetag vor Besuch erneut prüfen.',
          'Keine Aussagen zur Eignung bei Allergien ohne direkte Rückfrage.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['Küchenrichtung auf der Primärquelle nicht eindeutig benannt'],
        serviceEvidence: ['Abendservice laut Betreiberseite'],
        verificationNote:
          'Betreiberseite und kommunaler Eintrag bestätigen Betrieb, Adresse und Kontakt. Marketingaussagen wurden nicht übernommen.',
        uncertainties: [
          'Küchenrichtung vor redaktioneller Kategorisierung anhand der aktuellen Speisekarte manuell prüfen.',
          'Die Betreiberseite nennt abweichende Öffnungszeiten gegenüber Drittplattformen; nur Betreiberangaben verwenden.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['Küchenrichtung im kommunalen Eintrag nicht ausgewiesen'],
        serviceEvidence: ['Terrasse laut kommunalem Verzeichnis'],
        verificationNote:
          'Das Restaurant wird im aktuellen kommunalen Verzeichnis geführt; die verlinkte Betriebsseite beschreibt primär die Pension und bestätigt keine Restaurantdetails.',
        uncertainties: [
          'Betriebsstatus, Küchenrichtung und Öffnungszeiten direkt beim Betrieb bestätigen.',
          'Bis zur direkten Bestätigung nicht als redaktionell geprüfte Restaurantoption hervorheben.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['Küchenrichtung im kommunalen Eintrag nicht ausgewiesen'],
        serviceEvidence: ['Lieferung laut kommunalem Verzeichnis'],
        verificationNote:
          'Nur im kommunalen Verzeichnis auffindbar; keine belastbare eigene Website wurde am Prüftag gefunden.',
        uncertainties: [
          'Betriebsstatus, Kontakt, Küchenrichtung und Öffnungszeiten direkt bestätigen.',
          'Nicht in nutzerseitige Empfehlungen oder Rankings aufnehmen, bevor eine First-Party-Prüfung erfolgt ist.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'ResortPass-Entscheidungshilfe',
    title: 'Status, Leistungen und reale Kosten zusammen prüfen',
    intro:
      'Der Live-Status beantwortet die Kauf-Frage. Vergleich und Rechner helfen danach bei der Entscheidung zwischen Tageskarten, Silver und Gold.',
    statusTitle: 'Aktueller Verkaufsstatus',
    statusChecking: 'Status wird geprüft …',
    statusAvailable: 'Jetzt offiziell verfügbar',
    statusUnavailable: 'Derzeit nicht verfügbar',
    statusUnknown: 'Status momentan unklar',
    statusError: 'Live-Status konnte nicht geladen werden',
    lastChecked: 'Zuletzt geprüft',
    comparisonTitle: 'Silver und Gold auf einen Blick',
    feature: 'Merkmal',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Preis Erwachsene',
    concessionPrice: 'Kinder 4–11 / Senioren ab 60',
    visitDays: 'Besuchstage',
    visitDaysSilver: 'Definierte, veröffentlichte Besuchstage',
    visitDaysGold: 'Größere Flexibilität gemäß aktuellen Bedingungen',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Nicht als Standardleistung enthalten',
    rulanticaGold: 'Zwei Tagestickets gemäß aktuellen Bedingungen',
    flexibility: 'Planungsprofil',
    flexibilitySilver: 'Für früh planbare Termine',
    flexibilityGold: 'Für häufigere oder spontanere Besuche',
    calculatorTitle: 'Einfacher Erwachsenen-Kostenvergleich',
    calculatorIntro:
      'Vergleiche die zuletzt belegten Passpreise mit einer selbst gewählten Zahl an Europa-Park- und Rulantica-Tagesbesuchen.',
    visitsLabel: 'Europa-Park-Besuche',
    rulanticaVisitsLabel: 'Rulantica-Tagesbesuche',
    priceScenarioLabel: 'Tagesticket-Szenario',
    lowerPriceScenario: 'Untere belegte Preisspanne',
    upperPriceScenario: 'Obere belegte Preisspanne',
    calculate: 'Vergleich aktualisieren',
    dayTicketsCost: 'Einzelne Tageskarten',
    silverCost: 'Silver plus Rulantica-Tickets',
    goldCost: 'Gold mit zwei enthaltenen Rulantica-Tagen',
    lowestCost: 'Rechnerisch niedrigster Betrag',
    estimateDisclaimer:
      'Orientierung für eine erwachsene Person, keine Kauf- oder Verfügbarkeitsgarantie. Ausschlusstage, Reservierungen, Ermäßigungen, Anreise und ungenutzte Leistungen können die Entscheidung verändern.',
    linksTitle: 'Die nächste Frage direkt klären',
    compareLink: 'Silver oder Gold vergleichen',
    pricesLink: 'ResortPass-Preise prüfen',
    reservationLink: 'Reservierung verstehen',
    rulanticaLink: 'ResortPass und Rulantica',
  },
};
