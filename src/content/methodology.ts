import type { LocaleCode } from '../i18n/locales';

/**
 * Copy for the methodology page.
 *
 * Kept as data rather than translation keys because these are paragraphs, not
 * labels, and because the page is deliberately published in five languages
 * only — putting it in the shared key set would force twelve more translations
 * that nobody would keep current.
 */

export interface MethodologySection {
  heading: string;
  paragraphs: string[];
  /** Rendered as a definition list — the format answer engines lift cleanly. */
  facts?: { term: string; value: string }[];
}

export interface MethodologyPack {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: MethodologySection[];
  correctionsHeading: string;
  /** `date` is the human label; `iso` is what <time datetime> needs. */
  corrections: { date: string; iso: string; title: string; text: string }[];
  contactHeading: string;
  contactText: string;
  sourceLinkLabel: string;
}

export type MethodologyLocale = 'de' | 'en' | 'fr' | 'nl' | 'it';

export const methodologyLocales: readonly MethodologyLocale[] = ['de', 'en', 'fr', 'nl', 'it'];

export function isMethodologyLocale(locale: LocaleCode): locale is MethodologyLocale {
  return (methodologyLocales as readonly string[]).includes(locale);
}

export const methodologyPacks: Record<MethodologyLocale, MethodologyPack> = {
  de: {
    metaTitle: 'Methodik: Wie dieser ResortPass-Tracker arbeitet',
    metaDescription:
      'Wer dieses Projekt betreibt, wie der ResortPass-Status geprüft wird, woher Wartezeiten und Besucherprognose stammen — und welche Fehler wir gemacht und korrigiert haben.',
    eyebrow: 'Transparenz',
    title: 'Wie wir arbeiten',
    intro:
      'Dieses Projekt behauptet, zu wissen, wann der Europa-Park ResortPass wieder kaufbar ist. Diese Seite erklärt, worauf diese Behauptung beruht, wo ihre Grenzen liegen und was passiert, wenn wir uns irren.',
    sections: [
      {
        heading: 'Wer dahintersteht',
        paragraphs: [
          'ResortPass Tracker ist ein privates, nicht-kommerzielles Community-Projekt von Mathias Graf. Es steht in keiner Verbindung zum Europa-Park, zur Mack Rides GmbH oder zu MackInternational. Alle Markenrechte liegen bei den jeweiligen Inhabern.',
          'Es gibt keine Werbung, keine Affiliate-Links, kein Analytics und keine Tracking-Cookies. Das Projekt verdient an dieser Seite nichts — auch deshalb sind die Preisangaben hier neutral. Der gesamte Quellcode ist unter MIT-Lizenz öffentlich einsehbar.',
        ],
      },
      {
        heading: 'Wie der ResortPass-Status geprüft wird',
        paragraphs: [
          'Ein automatisierter Prüflauf ruft alle 15 Minuten die offiziellen Produktseiten im MackInternational-Ticketshop ab und wertet aus, ob ein Kauf tatsächlich möglich ist.',
          'Entscheidend ist, was <em>nicht</em> als Ergebnis zählt: Netzwerkfehler, Warteschlangenseiten und Bot-Schutzseiten werden als „unbekannt" verbucht — sie erzeugen weder einen Verlaufseintrag noch einen Alarm. Verfügbarkeit muss zusätzlich von zwei aufeinanderfolgenden Prüfungen bestätigt werden, bevor eine E-Mail rausgeht.',
          'Diese Doppelbestätigung gibt es nicht ohne Grund — siehe den Korrekturbericht weiter unten.',
        ],
        facts: [
          { term: 'Prüfintervall', value: 'alle 15 Minuten' },
          { term: 'Aufzeichnung seit', value: '4. März 2026' },
          { term: 'Bestätigung vor Alarm', value: 'zwei aufeinanderfolgende Prüfungen' },
          { term: 'Behandlung von Fehlern', value: 'als „unbekannt", nie als Ergebnis' },
        ],
      },
      {
        heading: 'Woher Wartezeiten und Besucherprognose kommen',
        paragraphs: [
          'Beides stammt von ParkQueueTimes.com, einer unabhängigen Drittquelle. Wir erheben diese Daten nicht selbst und geben sie nicht weiter. Die Attribution steht auf jeder Seite, auf der die Werte erscheinen.',
          'Wartezeiten werden serverseitig abgerufen und fünf Minuten zwischengespeichert. Werte, die älter als 15 Minuten sind, kennzeichnen wir als veraltet; ab 30 Minuten zeigen wir sie gar nicht mehr. Ausserhalb der Öffnungszeiten existiert keine Wartezeit — wir zeigen dann das Attraktionsverzeichnis und die nächste Öffnungszeit statt leerer Zahlen.',
          'Der Besucherandrang ist ein gemeldeter Index von 0 bis 100, keine Besucherzählung, keine Wartezeitgarantie und keine eigene KI-Prognose. Ein Tag ohne Wert wird als „keine Prognose" ausgewiesen, niemals als Null.',
        ],
        facts: [
          { term: 'Quelle', value: 'ParkQueueTimes.com' },
          { term: 'Aktualisierung Wartezeiten', value: 'alle 5 Minuten' },
          { term: 'Als veraltet markiert ab', value: '15 Minuten' },
          { term: 'Nicht mehr gezeigt ab', value: '30 Minuten' },
        ],
      },
      {
        heading: 'Wie wir mit Fakten umgehen, die ablaufen',
        paragraphs: [
          'Preise, Öffnungsregeln und Produktangaben werden mit Quelle, Prüfdatum und geplantem Wiedervorlagetermin gepflegt. Jede Angabe auf dieser Seite trägt sichtbar ihr Prüfdatum.',
          'Ein Prüfdatum ist keine Garantie. Dynamische Preise, Verfügbarkeiten, Öffnungszeiten und Reservierungsregeln können sich jederzeit ändern. Im Zweifel gilt immer die offizielle Angabe des Betreibers, nicht unsere.',
        ],
      },
      {
        heading: 'Was wir bewusst nicht tun',
        paragraphs: [
          'Wir sagen keine Verkaufstermine voraus. Der Europa-Park nennt weder ein Datum noch einen festen Verkaufsrhythmus; jede Prognose wäre erfunden.',
          'Wir erzeugen keine Meldungen, wenn nichts passiert. Wenn sich seit Monaten nichts ändert, sagen wir genau das.',
          'Wir speichern keine Nutzerprofile. Favoriten liegen ausschliesslich im Browser des Besuchers, nicht auf unserem Server.',
        ],
      },
    ],
    correctionsHeading: 'Korrekturen',
    corrections: [
      {
        date: '9. Juni 2026',
        iso: '2026-06-09',
        title: 'Zweiter Fehlalarm — und acht Wochen unbemerkt',
        text: 'Gegen 23:30 Uhr meldete der Prüflauf Silver und Gold als verfügbar und verschickte Alarm-Mails an alle damals bestätigten Abonnenten. Der Zustand war nach gut 20 Minuten wieder verschwunden; es war derselbe Fehlertyp wie am 19. März. Der schwerwiegendere Teil ist der zweite: Wir haben den Vorfall erst am 2. August 2026 bemerkt. Bis dahin wies diese Seite in ihrer Verlaufsstatistik eine Verfügbarkeit aus, die es nie gegeben hat. Die Ursache dafür war eine Annahme im Code — die Ausnahme für bekannte Fehlalarme war auf ein einzelnes Datum ausgelegt, nicht auf mehrere. Sie ist jetzt eine Liste, der 9. Juni ist dauerhaft aus allen Auswertungen herausgerechnet, und ein Test prüft beide Daten.',
      },
      {
        date: '19. März 2026',
        iso: '2026-03-19',
        title: 'Fehlalarm: Silver und Gold fälschlich als verfügbar gemeldet',
        text: 'Dem Ticketshop war eine Schutzseite vorgeschaltet, die unser Prüflauf als reguläre Produktseite gelesen hat. Dadurch ging eine Verfügbarkeitsmeldung raus, obwohl kein Kauf möglich war. Behoben: Der Prüflauf verifiziert seither, dass er wirklich die echte Shop-Seite sieht, und bestätigt Verfügbarkeit über zwei aufeinanderfolgende Prüfungen. Der betroffene Tag ist dauerhaft aus allen Statistiken dieser Seite herausgerechnet.',
      },
    ],
    contactHeading: 'Fehler gefunden?',
    contactText:
      'Wenn hier etwas falsch ist, wollen wir das wissen. Meldungen bitte über das öffentliche Repository — Korrekturen werden auf dieser Seite dokumentiert.',
    sourceLinkLabel: 'Quellcode auf GitHub',
  },

  en: {
    metaTitle: 'Methodology: how this ResortPass tracker works',
    metaDescription:
      'Who runs this project, how ResortPass availability is checked, where wait times and the crowd forecast come from — and which mistakes we made and corrected.',
    eyebrow: 'Transparency',
    title: 'How we work',
    intro:
      'This project claims to know when the Europa-Park ResortPass goes on sale again. This page explains what that claim rests on, where its limits are, and what happens when we get it wrong.',
    sections: [
      {
        heading: 'Who is behind it',
        paragraphs: [
          'ResortPass Tracker is a private, non-commercial community project by Mathias Graf. It is not affiliated with Europa-Park, Mack Rides GmbH or MackInternational. All trademarks belong to their respective owners.',
          'There is no advertising, there are no affiliate links, no analytics and no tracking cookies. The project earns nothing from this site — which is part of why the price information here is neutral. The full source code is public under the MIT licence.',
        ],
      },
      {
        heading: 'How ResortPass availability is checked',
        paragraphs: [
          'An automated check requests the official product pages in the MackInternational ticket shop every 15 minutes and evaluates whether a purchase is actually possible.',
          'What matters most is what does <em>not</em> count as a result: network errors, queue pages and bot-protection interstitials are recorded as "unknown" — they produce neither a history entry nor an alert. Availability must additionally be confirmed by two consecutive checks before any email goes out.',
          'That double confirmation exists for a reason — see the correction below.',
        ],
        facts: [
          { term: 'Check interval', value: 'every 15 minutes' },
          { term: 'Recording since', value: '4 March 2026' },
          { term: 'Confirmation before alert', value: 'two consecutive checks' },
          { term: 'Errors are treated as', value: '"unknown", never as a result' },
        ],
      },
      {
        heading: 'Where wait times and the crowd forecast come from',
        paragraphs: [
          'Both come from ParkQueueTimes.com, an independent third-party source. We do not collect this data ourselves and we do not redistribute it. The attribution appears on every page where the values are shown.',
          'Wait times are fetched server-side and cached for five minutes. Values older than 15 minutes are marked stale; beyond 30 minutes they are withheld entirely. Outside opening hours no wait time exists — we then show the attraction directory and the next opening time instead of empty numbers.',
          'The crowd level is a reported index from 0 to 100. It is not a visitor count, not a wait-time guarantee and not an in-house AI prediction. A day without a value is published as "no forecast", never as zero.',
        ],
        facts: [
          { term: 'Source', value: 'ParkQueueTimes.com' },
          { term: 'Wait times refreshed', value: 'every 5 minutes' },
          { term: 'Marked stale after', value: '15 minutes' },
          { term: 'Withheld after', value: '30 minutes' },
        ],
      },
      {
        heading: 'How we handle facts that expire',
        paragraphs: [
          'Prices, access rules and product details are maintained with a source, a check date and a scheduled review date. Every such statement on this site visibly carries its check date.',
          'A check date is not a guarantee. Dynamic prices, availability, opening hours and reservation rules can change at any time. When in doubt, the operator’s official information applies, not ours.',
        ],
      },
      {
        heading: 'What we deliberately do not do',
        paragraphs: [
          'We do not predict sale dates. Europa-Park publishes neither a date nor a fixed sales rhythm; any forecast would be invented.',
          'We do not manufacture news when nothing is happening. If nothing has changed for months, that is exactly what we say.',
          'We do not build user profiles. Favourites live in the visitor’s browser only, never on our server.',
        ],
      },
    ],
    correctionsHeading: 'Corrections',
    corrections: [
      {
        date: '9 June 2026',
        iso: '2026-06-09',
        title: 'A second false alarm — and eight weeks before we noticed',
        text: 'At around 23:30 the check reported Silver and Gold as available and sent alerts to every confirmed subscriber at the time. The state was gone about 20 minutes later; it was the same kind of fault as on 19 March. The more serious part is the second one: we did not notice the incident until 2 August 2026. Until then this site reported an availability in its history statistics that never happened. The cause was an assumption in the code — the exception for known false alarms was built for a single date, not several. It is a list now, 9 June is permanently excluded from every aggregate, and a test covers both dates.',
      },
      {
        date: '19 March 2026',
        iso: '2026-03-19',
        title: 'False alarm: Silver and Gold incorrectly reported as available',
        text: 'The ticket shop had a protection page in front of it, which our check read as a regular product page. An availability alert went out although no purchase was possible. Fixed: the check now verifies that it is genuinely looking at the real shop page, and confirms availability across two consecutive checks. That day is permanently excluded from every statistic on this site.',
      },
    ],
    contactHeading: 'Found a mistake?',
    contactText:
      'If something here is wrong, we want to know. Please report it via the public repository — corrections are documented on this page.',
    sourceLinkLabel: 'Source code on GitHub',
  },

  fr: {
    metaTitle: 'Méthodologie : comment fonctionne ce tracker ResortPass',
    metaDescription:
      'Qui gère ce projet, comment la disponibilité du ResortPass est vérifiée, d’où viennent les temps d’attente et l’affluence — et quelles erreurs nous avons commises et corrigées.',
    eyebrow: 'Transparence',
    title: 'Comment nous travaillons',
    intro:
      'Ce projet prétend savoir quand le ResortPass d’Europa-Park sera de nouveau en vente. Cette page explique sur quoi repose cette affirmation, quelles en sont les limites et ce qui se passe lorsque nous nous trompons.',
    sections: [
      {
        heading: 'Qui est derrière',
        paragraphs: [
          'ResortPass Tracker est un projet communautaire privé et non commercial de Mathias Graf. Il n’est affilié ni à Europa-Park, ni à Mack Rides GmbH, ni à MackInternational. Toutes les marques appartiennent à leurs propriétaires respectifs.',
          'Aucune publicité, aucun lien d’affiliation, aucune mesure d’audience, aucun cookie de suivi. Le projet ne gagne rien avec ce site — c’est aussi pour cela que les informations tarifaires y sont neutres. L’intégralité du code source est publique sous licence MIT.',
        ],
      },
      {
        heading: 'Comment la disponibilité est vérifiée',
        paragraphs: [
          'Une vérification automatique interroge toutes les 15 minutes les pages produit officielles de la billetterie MackInternational et évalue si un achat est réellement possible.',
          'L’essentiel est ce qui ne compte <em>pas</em> comme résultat : les erreurs réseau, les files d’attente virtuelles et les pages de protection anti-robot sont enregistrées comme « inconnu » — elles ne génèrent ni entrée dans l’historique, ni alerte. La disponibilité doit en outre être confirmée par deux vérifications consécutives avant tout envoi d’e-mail.',
          'Cette double confirmation n’existe pas par hasard — voir la correction ci-dessous.',
        ],
        facts: [
          { term: 'Intervalle de vérification', value: 'toutes les 15 minutes' },
          { term: 'Enregistrement depuis le', value: '4 mars 2026' },
          { term: 'Confirmation avant alerte', value: 'deux vérifications consécutives' },
          { term: 'Traitement des erreurs', value: '« inconnu », jamais un résultat' },
        ],
      },
      {
        heading: 'D’où viennent les temps d’attente et l’affluence',
        paragraphs: [
          'Les deux proviennent de ParkQueueTimes.com, une source tierce indépendante. Nous ne collectons pas ces données nous-mêmes et nous ne les redistribuons pas. L’attribution figure sur chaque page où les valeurs apparaissent.',
          'Les temps d’attente sont récupérés côté serveur et mis en cache pendant cinq minutes. Les valeurs de plus de 15 minutes sont signalées comme obsolètes ; au-delà de 30 minutes, elles ne sont plus affichées. En dehors des heures d’ouverture, il n’existe aucun temps d’attente — nous affichons alors le répertoire des attractions et la prochaine heure d’ouverture plutôt que des chiffres vides.',
          'L’affluence est un indice communiqué de 0 à 100. Ce n’est ni un comptage de visiteurs, ni une garantie de temps d’attente, ni une prévision produite par notre propre IA. Une journée sans valeur est publiée comme « aucune prévision », jamais comme zéro.',
        ],
        facts: [
          { term: 'Source', value: 'ParkQueueTimes.com' },
          { term: 'Actualisation des temps d’attente', value: 'toutes les 5 minutes' },
          { term: 'Signalé obsolète après', value: '15 minutes' },
          { term: 'Retiré après', value: '30 minutes' },
        ],
      },
      {
        heading: 'Comment nous gérons les informations périssables',
        paragraphs: [
          'Les prix, les règles d’accès et les caractéristiques produit sont tenus à jour avec une source, une date de vérification et une date de réexamen planifiée. Chaque information de ce type affiche visiblement sa date de vérification.',
          'Une date de vérification n’est pas une garantie. Les prix dynamiques, les disponibilités, les horaires et les règles de réservation peuvent changer à tout moment. En cas de doute, ce sont les informations officielles de l’exploitant qui font foi, pas les nôtres.',
        ],
      },
      {
        heading: 'Ce que nous ne faisons délibérément pas',
        paragraphs: [
          'Nous ne prédisons pas les dates de mise en vente. Europa-Park ne publie ni date, ni rythme de vente fixe ; toute prévision serait inventée.',
          'Nous ne fabriquons pas d’actualités quand il ne se passe rien. Si rien ne change pendant des mois, nous le disons tel quel.',
          'Nous ne constituons aucun profil d’utilisateur. Les favoris restent uniquement dans le navigateur du visiteur, jamais sur notre serveur.',
        ],
      },
    ],
    correctionsHeading: 'Corrections',
    corrections: [
      {
        date: '9 juin 2026',
        iso: '2026-06-09',
        title: 'Une deuxième fausse alerte — et huit semaines sans la voir',
        text: 'Vers 23h30, la vérification a signalé Silver et Gold comme disponibles et a envoyé des alertes à tous les abonnés confirmés de l’époque. L’état avait disparu une vingtaine de minutes plus tard ; il s’agissait du même type d’erreur que le 19 mars. Le plus grave est ailleurs : nous n’avons remarqué l’incident que le 2 août 2026. Jusque-là, ce site affichait dans ses statistiques une disponibilité qui n’a jamais existé. La cause était une supposition dans le code — l’exception pour les fausses alertes connues avait été conçue pour une seule date, pas pour plusieurs. C’est désormais une liste, le 9 juin est définitivement exclu de tous les agrégats, et un test couvre les deux dates.',
      },
      {
        date: '19 mars 2026',
        iso: '2026-03-19',
        title: 'Fausse alerte : Silver et Gold signalés à tort comme disponibles',
        text: 'Une page de protection était placée devant la billetterie et notre vérification l’a interprétée comme une page produit normale. Une alerte de disponibilité est partie alors qu’aucun achat n’était possible. Corrigé : la vérification s’assure désormais qu’elle voit bien la véritable page de la boutique et confirme la disponibilité sur deux vérifications consécutives. Cette journée est définitivement exclue de toutes les statistiques du site.',
      },
    ],
    contactHeading: 'Vous avez trouvé une erreur ?',
    contactText:
      'Si quelque chose est faux ici, nous voulons le savoir. Merci de le signaler via le dépôt public — les corrections sont documentées sur cette page.',
    sourceLinkLabel: 'Code source sur GitHub',
  },

  nl: {
    metaTitle: 'Methodiek: hoe deze ResortPass-tracker werkt',
    metaDescription:
      'Wie dit project beheert, hoe de beschikbaarheid van de ResortPass wordt gecontroleerd, waar wachttijden en druktevoorspelling vandaan komen — en welke fouten we hebben gemaakt en hersteld.',
    eyebrow: 'Transparantie',
    title: 'Hoe we werken',
    intro:
      'Dit project beweert te weten wanneer de Europa-Park ResortPass weer te koop is. Deze pagina legt uit waarop die bewering berust, waar de grenzen liggen en wat er gebeurt als we het mis hebben.',
    sections: [
      {
        heading: 'Wie erachter zit',
        paragraphs: [
          'ResortPass Tracker is een particulier, niet-commercieel communityproject van Mathias Graf. Het is niet verbonden aan Europa-Park, Mack Rides GmbH of MackInternational. Alle merkrechten liggen bij de respectievelijke eigenaren.',
          'Er is geen reclame, er zijn geen affiliatelinks, geen analytics en geen trackingcookies. Het project verdient niets aan deze site — mede daarom is de prijsinformatie hier neutraal. De volledige broncode is openbaar onder de MIT-licentie.',
        ],
      },
      {
        heading: 'Hoe de beschikbaarheid wordt gecontroleerd',
        paragraphs: [
          'Een geautomatiseerde controle vraagt elke 15 minuten de officiële productpagina’s in de MackInternational-ticketshop op en beoordeelt of een aankoop werkelijk mogelijk is.',
          'Het belangrijkste is wat <em>niet</em> als resultaat telt: netwerkfouten, wachtrijpagina’s en botbeveiligingspagina’s worden geregistreerd als „onbekend" — ze leveren geen historiek-item en geen melding op. Beschikbaarheid moet bovendien door twee opeenvolgende controles worden bevestigd voordat er een e-mail uitgaat.',
          'Die dubbele bevestiging bestaat niet voor niets — zie de correctie hieronder.',
        ],
        facts: [
          { term: 'Controle-interval', value: 'elke 15 minuten' },
          { term: 'Registratie sinds', value: '4 maart 2026' },
          { term: 'Bevestiging vóór melding', value: 'twee opeenvolgende controles' },
          { term: 'Fouten gelden als', value: '„onbekend", nooit als resultaat' },
        ],
      },
      {
        heading: 'Waar wachttijden en druktevoorspelling vandaan komen',
        paragraphs: [
          'Beide komen van ParkQueueTimes.com, een onafhankelijke externe bron. We verzamelen deze gegevens niet zelf en verspreiden ze niet verder. De bronvermelding staat op elke pagina waar de waarden verschijnen.',
          'Wachttijden worden serverzijdig opgehaald en vijf minuten gecachet. Waarden ouder dan 15 minuten markeren we als verouderd; na 30 minuten tonen we ze helemaal niet meer. Buiten openingstijden bestaat er geen wachttijd — we tonen dan de attractielijst en het eerstvolgende openingstijdstip in plaats van lege cijfers.',
          'De drukte is een gerapporteerde index van 0 tot 100. Het is geen bezoekerstelling, geen wachttijdgarantie en geen eigen AI-voorspelling. Een dag zonder waarde publiceren we als „geen voorspelling", nooit als nul.',
        ],
        facts: [
          { term: 'Bron', value: 'ParkQueueTimes.com' },
          { term: 'Wachttijden ververst', value: 'elke 5 minuten' },
          { term: 'Als verouderd gemarkeerd na', value: '15 minuten' },
          { term: 'Niet meer getoond na', value: '30 minuten' },
        ],
      },
      {
        heading: 'Hoe we omgaan met gegevens die verlopen',
        paragraphs: [
          'Prijzen, toegangsregels en productgegevens worden bijgehouden met bron, controledatum en een geplande herzieningsdatum. Elke dergelijke vermelding op deze site draagt zichtbaar haar controledatum.',
          'Een controledatum is geen garantie. Dynamische prijzen, beschikbaarheid, openingstijden en reserveringsregels kunnen op elk moment veranderen. Bij twijfel geldt altijd de officiële informatie van de exploitant, niet de onze.',
        ],
      },
      {
        heading: 'Wat we bewust niet doen',
        paragraphs: [
          'We voorspellen geen verkoopdata. Europa-Park noemt geen datum en geen vast verkoopritme; elke voorspelling zou verzonnen zijn.',
          'We maken geen nieuws als er niets gebeurt. Verandert er maandenlang niets, dan zeggen we precies dat.',
          'We bouwen geen gebruikersprofielen op. Favorieten staan uitsluitend in de browser van de bezoeker, nooit op onze server.',
        ],
      },
    ],
    correctionsHeading: 'Correcties',
    corrections: [
      {
        date: '9 juni 2026',
        iso: '2026-06-09',
        title: 'Een tweede vals alarm — en acht weken voordat we het merkten',
        text: 'Rond 23:30 uur meldde de controle Silver en Gold als beschikbaar en stuurde meldingen naar alle op dat moment bevestigde abonnees. De toestand was ruim 20 minuten later weer verdwenen; het was hetzelfde type fout als op 19 maart. Het ernstigere deel is het tweede: we hebben het incident pas op 2 augustus 2026 opgemerkt. Tot dan toonde deze site in haar historiek een beschikbaarheid die er nooit is geweest. De oorzaak was een aanname in de code — de uitzondering voor bekende valse alarmen was gebouwd voor één datum, niet voor meerdere. Het is nu een lijst, 9 juni is permanent uit alle aggregaten gehaald, en een test dekt beide data.',
      },
      {
        date: '19 maart 2026',
        iso: '2026-03-19',
        title: 'Vals alarm: Silver en Gold ten onrechte als beschikbaar gemeld',
        text: 'Voor de ticketshop stond een beveiligingspagina die onze controle als een gewone productpagina heeft gelezen. Daardoor ging er een beschikbaarheidsmelding uit terwijl er niets te koop was. Opgelost: de controle verifieert sindsdien dat ze werkelijk de echte shoppagina ziet en bevestigt beschikbaarheid over twee opeenvolgende controles. Die dag is permanent uit alle statistieken van deze site gehaald.',
      },
    ],
    contactHeading: 'Fout gevonden?',
    contactText:
      'Als hier iets niet klopt, willen we dat weten. Meld het via de openbare repository — correcties worden op deze pagina gedocumenteerd.',
    sourceLinkLabel: 'Broncode op GitHub',
  },

  it: {
    metaTitle: 'Metodologia: come funziona questo tracker ResortPass',
    metaDescription:
      'Chi gestisce questo progetto, come viene verificata la disponibilità del ResortPass, da dove provengono tempi di attesa e affluenza — e quali errori abbiamo commesso e corretto.',
    eyebrow: 'Trasparenza',
    title: 'Come lavoriamo',
    intro:
      'Questo progetto sostiene di sapere quando il ResortPass di Europa-Park tornerà in vendita. Questa pagina spiega su cosa si basa tale affermazione, quali sono i suoi limiti e cosa succede quando sbagliamo.',
    sections: [
      {
        heading: 'Chi c’è dietro',
        paragraphs: [
          'ResortPass Tracker è un progetto comunitario privato e non commerciale di Mathias Graf. Non è affiliato a Europa-Park, Mack Rides GmbH o MackInternational. Tutti i marchi appartengono ai rispettivi titolari.',
          'Non ci sono pubblicità, link di affiliazione, strumenti di analisi o cookie di tracciamento. Il progetto non guadagna nulla da questo sito — anche per questo le informazioni sui prezzi qui sono neutrali. L’intero codice sorgente è pubblico con licenza MIT.',
        ],
      },
      {
        heading: 'Come viene verificata la disponibilità',
        paragraphs: [
          'Un controllo automatico interroga ogni 15 minuti le pagine prodotto ufficiali del negozio MackInternational e valuta se l’acquisto è realmente possibile.',
          'La cosa più importante è ciò che <em>non</em> conta come risultato: errori di rete, pagine di coda e schermate antibot vengono registrati come «sconosciuto» — non generano né una voce nello storico né un avviso. La disponibilità deve inoltre essere confermata da due controlli consecutivi prima che parta un’e-mail.',
          'Questa doppia conferma non esiste per caso — si veda la correzione più sotto.',
        ],
        facts: [
          { term: 'Intervallo di controllo', value: 'ogni 15 minuti' },
          { term: 'Registrazione dal', value: '4 marzo 2026' },
          { term: 'Conferma prima dell’avviso', value: 'due controlli consecutivi' },
          { term: 'Gli errori valgono come', value: '«sconosciuto», mai come risultato' },
        ],
      },
      {
        heading: 'Da dove provengono tempi di attesa e affluenza',
        paragraphs: [
          'Entrambi provengono da ParkQueueTimes.com, una fonte terza indipendente. Non raccogliamo questi dati direttamente e non li ridistribuiamo. L’attribuzione compare su ogni pagina in cui i valori sono mostrati.',
          'I tempi di attesa vengono recuperati lato server e memorizzati in cache per cinque minuti. I valori più vecchi di 15 minuti sono segnalati come non aggiornati; oltre i 30 minuti non vengono più mostrati. Fuori dagli orari di apertura non esiste alcun tempo di attesa — in quel caso mostriamo l’elenco delle attrazioni e il prossimo orario di apertura invece di cifre vuote.',
          'L’affluenza è un indice comunicato da 0 a 100. Non è un conteggio dei visitatori, non è una garanzia sui tempi di attesa e non è una previsione della nostra intelligenza artificiale. Un giorno senza valore viene pubblicato come «nessuna previsione», mai come zero.',
        ],
        facts: [
          { term: 'Fonte', value: 'ParkQueueTimes.com' },
          { term: 'Aggiornamento tempi di attesa', value: 'ogni 5 minuti' },
          { term: 'Segnalato non aggiornato dopo', value: '15 minuti' },
          { term: 'Non più mostrato dopo', value: '30 minuti' },
        ],
      },
      {
        heading: 'Come trattiamo i dati che scadono',
        paragraphs: [
          'Prezzi, regole di accesso e caratteristiche dei prodotti sono mantenuti con fonte, data di verifica e data di revisione programmata. Ogni indicazione di questo tipo riporta visibilmente la propria data di verifica.',
          'Una data di verifica non è una garanzia. Prezzi dinamici, disponibilità, orari e regole di prenotazione possono cambiare in qualsiasi momento. In caso di dubbio fa fede l’informazione ufficiale del gestore, non la nostra.',
        ],
      },
      {
        heading: 'Cosa scegliamo di non fare',
        paragraphs: [
          'Non prevediamo le date di vendita. Europa-Park non indica né una data né un ritmo di vendita fisso; qualsiasi previsione sarebbe inventata.',
          'Non produciamo notizie quando non succede nulla. Se per mesi non cambia niente, diciamo esattamente questo.',
          'Non costruiamo profili utente. I preferiti restano solo nel browser del visitatore, mai sul nostro server.',
        ],
      },
    ],
    correctionsHeading: 'Correzioni',
    corrections: [
      {
        date: '9 giugno 2026',
        iso: '2026-06-09',
        title: 'Un secondo falso allarme — e otto settimane senza accorgercene',
        text: 'Verso le 23:30 il controllo ha segnalato Silver e Gold come disponibili e ha inviato gli avvisi a tutti gli iscritti confermati di allora. Lo stato è sparito una ventina di minuti dopo; era lo stesso tipo di errore del 19 marzo. La parte più grave è la seconda: ci siamo accorti dell’episodio solo il 2 agosto 2026. Fino ad allora questo sito riportava nelle sue statistiche una disponibilità che non c’è mai stata. La causa era un presupposto nel codice — l’eccezione per i falsi allarmi noti era pensata per una sola data, non per più di una. Ora è un elenco, il 9 giugno è escluso in modo permanente da tutti gli aggregati e un test copre entrambe le date.',
      },
      {
        date: '19 marzo 2026',
        iso: '2026-03-19',
        title: 'Falso allarme: Silver e Gold segnalati erroneamente come disponibili',
        text: 'Davanti al negozio era presente una pagina di protezione che il nostro controllo ha interpretato come una normale pagina prodotto. È così partito un avviso di disponibilità benché nessun acquisto fosse possibile. Risolto: da allora il controllo verifica di vedere davvero la pagina reale del negozio e conferma la disponibilità su due controlli consecutivi. Quel giorno è escluso in modo permanente da tutte le statistiche del sito.',
      },
    ],
    contactHeading: 'Hai trovato un errore?',
    contactText:
      'Se qui c’è qualcosa di sbagliato, vogliamo saperlo. Segnalalo tramite il repository pubblico — le correzioni sono documentate su questa pagina.',
    sourceLinkLabel: 'Codice sorgente su GitHub',
  },
};

export function getMethodologyPack(locale: MethodologyLocale): MethodologyPack {
  return methodologyPacks[locale];
}
