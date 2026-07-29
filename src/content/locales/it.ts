import type { PlanningLocalePack } from '../planning-types';

const common: PlanningLocalePack['common'] = {
  skip: 'Vai al contenuto',
  menu: 'Menu',
  language: 'Scegli la lingua',
  home: 'Home',
  plannerLabel: 'Pianifica la visita',
  answerLabel: 'Risposta in breve',
  updatedLabel: 'Verificato',
  sourcePrefix: 'Fonte',
  onThisPage: 'In questa pagina',
  relatedTitle: 'Prossimi passi utili',
  sourcesTitle: 'Fonti e aggiornamento',
  sourcesIntro:
    'Le informazioni soggette a variazioni provengono da fonti ufficiali del gestore e delle autorità. Prima di prenotare, verifica nuovamente prezzi, orari e regole nella fonte primaria indicata.',
  correctionLabel: 'C’è qualcosa di inesatto?',
  correctionText:
    'Segnalaci le informazioni non aggiornate. Distinguiamo chiaramente i fatti verificati, le ipotesi di calcolo e le valutazioni editoriali.',
  unofficial: 'Progetto indipendente della community',
  footerText: 'Strumento di pianificazione indipendente, non affiliato a Europa-Park.',
  overview: 'Panoramica',
  tool: 'Strumento di pianificazione',
  decisions: 'Guida alla scelta',
  faq: 'Domande frequenti',
  notRecommendation: 'Voce di elenco, non una raccomandazione',
  verifyBeforeVisit: 'Da verificare direttamente con il gestore prima della visita',
};

const navigation: PlanningLocalePack['navigation'] = {
  parkGuide: 'Europa-Park',
  visitPlanner: '1 o 2 giorni',
  costCalculator: 'Costi',
  familyGuide: 'Famiglie',
  rulanticaGuide: 'Rulantica',
  stayGuide: 'Dove dormire',
  restaurantGuide: 'Mangiare a Rust',
  resortPassGuide: 'ResortPass',
};

const pages: PlanningLocalePack['pages'] = {
  parkGuide: {
    title: 'Pianificare Europa-Park: guida indipendente e calcolatori',
    description:
      'Organizza concretamente la visita a Europa-Park: 1 o 2 giorni, costi, famiglia, Rulantica, alloggio e ristoranti a Rust, con strumenti interattivi.',
    eyebrow: 'Centro di pianificazione Europa-Park',
    heading: 'Pianifica Europa-Park in base alle tue vere esigenze',
    answer:
      'Per una prima visita, una giornata intera è il minimo; due giorni sono in genere più rilassanti, soprattutto con bambini, spettacoli o grande affluenza. Parti dalla data, dal tipo di gruppo e dal budget invece che da una generica Top 10.',
    sectionTitle: 'Dalla domanda a un programma di visita realistico',
    sectionIntro:
      'Gli strumenti collegano la tua situazione a informazioni aggiornate. Non sostituiscono la prenotazione ufficiale, ma riducono le principali decisioni sbagliate prima del viaggio.',
    points: [
      {
        title: 'Stabilisci prima il tempo',
        text: 'Decidi se convengono uno o due giorni al parco in base all’orario di arrivo, alle attrazioni prioritarie e all’affluenza prevista.',
        icon: 'tabler:calendar-time',
      },
      {
        title: 'Costo totale, non solo biglietto',
        text: 'Calcola insieme biglietti del parco, Rulantica, parcheggio e alloggio, come intervallo e non come falso prezzo fisso.',
        icon: 'tabler:calculator',
      },
      {
        title: 'Adatta il percorso al gruppo',
        text: 'Altezza, età, necessità di pause e interessi determinano un buon ordine di visita più delle classifiche generiche.',
        icon: 'tabler:route',
      },
    ],
    faqs: [
      {
        question: 'Quanti giorni servono per visitare Europa-Park?',
        answer:
          'Una giornata intera può bastare per una selezione di attrazioni principali. Due giorni sono in genere più realistici per chi visita il parco per la prima volta, per le famiglie, per gli spettacoli e per un giro meno frenetico.',
      },
      {
        question: 'Questo sito è ufficiale?',
        answer:
          'No. ResortPass Tracker è un progetto indipendente della community. Per ingresso, sicurezza e regole aggiornate valgono le informazioni ufficiali di Europa-Park.',
      },
      {
        question: 'Perché il calcolatore mostra intervalli di prezzo?',
        answer:
          'Europa-Park e Rulantica applicano prezzi online variabili in base alla data. Finché non scegli una data precisa nella biglietteria ufficiale, un intervallo è più trasparente.',
      },
    ],
  },
  visitPlanner: {
    title: 'Europa-Park in 1 o 2 giorni? Pianificatore interattivo',
    description:
      'Basta un giorno a Europa-Park? Crea un programma in base a data, gruppo, arrivo, affluenza e Rulantica, completo di percorso giornaliero.',
    eyebrow: '1 o 2 giorni',
    heading: 'Quanti giorni ti servono a Europa-Park?',
    answer:
      'Un giorno può bastare con arrivo presto e priorità chiare. Due giorni sono la scelta più solida per famiglie, spettacoli e numerose aree tematiche; includendo Rulantica, in genere convengono due o tre giorni.',
    sectionTitle: 'Cosa cambia davvero la durata della visita',
    sectionIntro:
      'Non tutti i gruppi hanno bisogno dello stesso percorso. Pianifica prima fasce orarie e priorità; solo il giorno della visita i tempi di attesa reali definiranno l’ordine preciso.',
    points: [
      {
        title: 'Un giorno: scegli con decisione',
        text: 'Arriva all’apertura, dai priorità a tre-cinque obiettivi e prepara alternative nelle aree tematiche vicine.',
        icon: 'tabler:number-1',
      },
      {
        title: 'Due giorni: dividi le aree',
        text: 'Distribuisci grandi attrazioni, proposte per famiglie e spettacoli tra due metà del parco per ridurre spostamenti e ripetizioni.',
        icon: 'tabler:number-2',
      },
      {
        title: 'Grande affluenza: lascia margine',
        text: 'Riserva tempo per mangiare, guasti tecnici e spostamenti. I tempi di attesa in diretta aiutano ad adattare il programma sul posto.',
        icon: 'tabler:clock-hour-4',
      },
    ],
    faqs: [
      {
        question: 'Si riesce a visitare Europa-Park in un giorno?',
        answer:
          'Si possono fare molte attrazioni principali, ma raramente tutte. Il pianificatore valuta arrivo, gruppo e affluenza, aumentando la durata consigliata quando le condizioni sono sfavorevoli.',
      },
      {
        question: 'Conviene visitare Rulantica nello stesso giorno?',
        answer:
          'Un biglietto serale può essere adatto ad adulti o ragazzi che amano l’acqua. Con bambini piccoli o se il parco acquatico è una priorità, una giornata separata è più rilassante.',
      },
      {
        question: 'Il percorso garantisce i tempi di attesa?',
        answer:
          'No. Meteo, guasti e affluenza reale possono modificare il programma. Il giorno della visita controlla l’app ufficiale e i tempi di attesa in diretta.',
      },
    ],
  },
  costCalculator: {
    title: 'Costi Europa-Park 2026: biglietti, parcheggio e hotel',
    description:
      'Calcola una fascia di costo realistica per Europa-Park: adulti, bambini, 1 o 2 giorni, Rulantica, parcheggio e alloggio.',
    eyebrow: 'Costo totale',
    heading: 'Quanto costa complessivamente la tua visita a Europa-Park?',
    answer:
      'L’ingresso è solo una parte del budget. Il calcolatore combina gli intervalli dei biglietti variabili per data con parcheggio, Rulantica e il tuo budget per l’alloggio, mostrando volutamente un minimo e un massimo.',
    sectionTitle: 'Come trasformare i prezzi in un budget utile',
    sectionIntro:
      'Usiamo gli intervalli ufficiali senza inventare prezzi degli hotel. Inserisci tu le ipotesi per alloggio, pasti e viaggio.',
    points: [
      {
        title: 'Prezzi per data come intervallo',
        text: 'Senza una data precisa per il biglietto, un intervallo è più affidabile di un singolo prezzo promozionale.',
        icon: 'tabler:arrows-horizontal',
      },
      {
        title: 'Budget famigliare per persona',
        text: 'Il totale e il valore per persona rendono più semplice confrontare le opzioni da 1 e 2 giorni.',
        icon: 'tabler:users',
      },
      {
        title: 'Ipotesi sempre visibili',
        text: 'Alloggio e costi accessori sono indicati separatamente, così puoi sostituire ogni ipotesi.',
        icon: 'tabler:list-details',
      },
    ],
    faqs: [
      {
        question: 'I prezzi del calcolatore sono garantiti?',
        answer:
          'No. Sono intervalli ufficiali con data di verifica. Disponibilità, data della visita, commissioni e canale di prenotazione possono cambiare il prezzo finale.',
      },
      {
        question: 'Perché non viene usato un prezzo medio dell’hotel?',
        answer:
          'I prezzi degli alloggi dipendono molto da data, occupazione e condizioni di cancellazione. Per questo inserisci personalmente un prezzo che hai davvero trovato.',
      },
      {
        question: 'Pasti e viaggio sono inclusi?',
        answer:
          'Non ancora in modo automatico. Questi costi cambiano molto in base alla provenienza e alle abitudini e vanno aggiunti come margine personale.',
      },
    ],
  },
  familyGuide: {
    title: 'Europa-Park con bambini: filtro altezza e piano famiglia',
    description:
      'Organizza Europa-Park con neonati, bambini piccoli o in età scolare: filtra le attrazioni per età e altezza, riconosci le regole di accompagnamento e pianifica le pause.',
    eyebrow: 'Famiglie e bambini',
    heading: 'Quali attrazioni sono adatte a tuo figlio?',
    answer:
      'Per molte attrazioni contano insieme età e altezza. Usa il filtro per una prima selezione e controlla sempre sul posto l’asta di misurazione, i cartelli e le indicazioni del personale.',
    sectionTitle: 'Un piano famiglia richiede più di una lista di attrazioni',
    sectionIntro:
      'Pause, pasti, cambio dei piccoli, fratelli di altezze diverse e possibili regole di accompagnamento influenzano il percorso quanto le attrazioni preferite.',
    points: [
      {
        title: 'Combina età e altezza',
        text: 'Il filtro distingue il requisito minimo e l’eventuale accompagnamento di un adulto in base alle pagine ufficiali di dettaglio.',
        icon: 'tabler:ruler-measure',
      },
      {
        title: 'Inserisci momenti tranquilli',
        text: 'Attrazioni al coperto, aree gioco e spettacoli sono ottime pause tra le esperienze più intense.',
        icon: 'tabler:zzz',
      },
      {
        title: 'Controlla di nuovo sul posto',
        text: 'Le regole di sicurezza possono cambiare e quelle vincolanti sono esposte all’ingresso di ogni attrazione.',
        icon: 'tabler:shield-check',
      },
    ],
    faqs: [
      {
        question: 'Basta l’altezza per accedere?',
        answer:
          'No. Alcune attrazioni impongono anche un’età minima o richiedono un accompagnatore adulto fino a una determinata età o altezza.',
      },
      {
        question: 'Il filtro garantisce l’accesso all’attrazione?',
        answer:
          'No. Fanno fede le regole aggiornate, la misurazione e il personale sul posto. Salute, corporatura, gravidanza o modifiche tecniche possono comportare ulteriori limitazioni.',
      },
      {
        question: 'Cos’è il Baby-Switch?',
        answer:
          'Per alcune attrazioni gli accompagnatori possono darsi il cambio. Chiedi direttamente all’attrazione come viene applicata la procedura.',
      },
    ],
  },
  rulanticaGuide: {
    title: 'Pianificare Rulantica: giornata, sera o visita combinata?',
    description:
      'Combina Rulantica ed Europa-Park: strumento interattivo per scegliere biglietto giornaliero, serale o Moonlight, con bambini, lista da portare e durata.',
    eyebrow: 'Europa-Park + Rulantica',
    heading: 'Come inserire Rulantica in una vacanza breve?',
    answer:
      'Una giornata intera a Rulantica è la soluzione più rilassante per famiglie e appassionati di parchi acquatici. I biglietti serali o Moonlight funzionano meglio come aggiunta, se età ed energia del gruppo lo permettono.',
    sectionTitle: 'Scegli l’orario del biglietto in base all’obiettivo',
    sectionIntro:
      'Il mondo acquatico è normalmente aperto fino a sera. La scelta dipende dal fatto che Rulantica sia una meta principale o solo un’aggiunta dopo il parco.',
    points: [
      {
        title: 'Biglietto giornaliero',
        text: 'Più tempo per aree bambini, scivoli, pause e zone esterne stagionali, soprattutto dedicando una giornata intera a Rulantica.',
        icon: 'tabler:sun',
      },
      {
        title: 'Sera o Moonlight',
        text: 'Meno tempo e in genere un prezzo inferiore, ma dopo una lunga giornata al parco resta anche meno energia.',
        icon: 'tabler:moon-stars',
      },
      {
        title: 'Non sottovalutare cosa portare',
        text: 'Controlla in anticipo asciugamano, costume e regole aggiornate; chi entra per la giornata non deve contare sul noleggio improvvisato di un asciugamano.',
        icon: 'tabler:backpack',
      },
    ],
    faqs: [
      {
        question: 'Un biglietto serale basta per Rulantica?',
        answer:
          'Può bastare per alcuni scivoli scelti o per una breve conclusione della giornata. Le famiglie con bambini piccoli e chi vuole provare molte aree beneficia in genere di una giornata intera.',
      },
      {
        question: 'Si possono fare Europa-Park e Rulantica nello stesso giorno?',
        answer:
          'Tecnicamente sì, ma la combinazione è faticosa e richiede priorità nette. Lo strumento considera giorni al parco, presenza di bambini e ritmo desiderato.',
      },
      {
        question: 'Si possono noleggiare asciugamani a Rulantica?',
        answer:
          'Secondo le FAQ ufficiali non è previsto un normale servizio di noleggio asciugamani per i visitatori giornalieri. Portane uno e ricontrolla le FAQ prima della visita.',
      },
    ],
  },
  stayGuide: {
    title: 'Dove dormire vicino a Europa-Park: hotel, Rust o dintorni',
    description:
      'Confronta dove alloggiare vicino a Europa-Park: hotel tematico, pensione, appartamento, campeggio e dintorni per tempo risparmiato, autonomia e trasporti.',
    eyebrow: 'Dove dormire',
    heading: 'Quale alloggio si adatta al tuo programma?',
    answer:
      'Il miglior alloggio non dipende solo dal prezzo della camera. Confronta ingresso anticipato, distanze, trasporti, possibilità di cucinare, cancellazione e costo complessivo del gruppo.',
    sectionTitle: 'Scenari reali invece di una classifica casuale di hotel',
    sectionIntro:
      'Il confronto mostra tipi di alloggio e domande ancora aperte. Evita volutamente prezzi non confermati e classifiche di singole strutture.',
    points: [
      {
        title: 'Vantaggi del Resort',
        text: 'Gli hotel tematici ufficiali possono offrire ingresso anticipato e navetta; verifica validità e attrazioni aperte per le tue date.',
        icon: 'tabler:sparkles',
      },
      {
        title: 'Rust e autonomia',
        text: 'Pensioni e appartamenti possono offrire brevi distanze o una cucina, ma ogni dotazione va verificata nella singola struttura.',
        icon: 'tabler:building-cottage',
      },
      {
        title: 'Dintorni e trasporti',
        text: 'Un prezzo inferiore della camera può essere compensato da parcheggio, ultimo autobus e spostamenti aggiuntivi.',
        icon: 'tabler:bus',
      },
    ],
    faqs: [
      {
        question: 'Gli hotel ufficiali di Europa-Park sono sempre la scelta migliore?',
        answer:
          'No. Sono validi quando contano i vantaggi del Resort e la comodità. Per cucinare in autonomia, gruppi numerosi o un budget diverso, un alloggio indipendente può essere più adatto.',
      },
      {
        question: 'Il confronto mostra i prezzi attuali degli hotel?',
        answer:
          'No. Prezzi affidabili richiedono date, occupazione e condizioni di prenotazione. Il calcolatore dei costi usa quindi il prezzo per notte verificato da te.',
      },
      {
        question: 'Quali località considerare oltre a Rust?',
        answer:
          'Tra le altre, Ringsheim, Herbolzheim e altri comuni dell’Erlebnisregion. Sono determinanti il collegamento concreto e l’ultima corsa di ritorno nel giorno della visita.',
      },
    ],
  },
  restaurantGuide: {
    title: 'Ristoranti a Rust dopo Europa-Park: elenco verificato',
    description:
      'Trova ristoranti a Rust per la sera: schede neutrali e verificate con fonti, cucina, indicazioni sul servizio, incertezze e link diretti ai gestori.',
    eyebrow: 'Mangiare a Rust',
    heading: 'Dove mangiare a Rust dopo la chiusura del parco?',
    answer:
      'L’elenco non è una classifica. Mostra attività con una fonte primaria o comunale tracciabile e indica chiaramente quali orari, prenotazioni ed esigenze alimentari vanno ancora verificati direttamente.',
    sectionTitle: 'Più utile di una classifica di ristoranti non verificata',
    sectionIntro:
      'Orari e giorni di chiusura cambiano. Per ogni scheda separiamo quindi profilo culinario verificato, informazioni sul servizio e questioni ancora aperte.',
    points: [
      {
        title: 'Fonti invece delle stelle',
        text: 'Non usiamo le valutazioni delle piattaforme come prova di qualità, ma colleghiamo i siti dei gestori e del comune.',
        icon: 'tabler:source-code',
      },
      {
        title: 'Servizio serale visibile',
        text: 'Il filtro usa solo indicazioni sul servizio documentate. L’orario effettivo della cucina va comunque confermato il giorno della visita.',
        icon: 'tabler:clock',
      },
      {
        title: 'Nessun filtro alimentare inventato',
        text: 'Le opzioni vegane, senza glutine o adatte alle allergie vengono mostrate solo quando esistono informazioni attuali e affidabili.',
        icon: 'tabler:salad',
      },
    ],
    faqs: [
      {
        question: 'I ristoranti elencati sono consigliati?',
        answer:
          'No. Una scheda significa solo che l’attività è stata trovata in una fonte tracciabile. Gusto, qualità e disponibilità dei tavoli non sono stati valutati.',
      },
      {
        question: 'Gli orari di apertura sono garantiti?',
        answer:
          'No. Aperture speciali, ferie e orari della cucina possono cambiare con poco preavviso. Usa il link del gestore o telefona prima della visita.',
      },
      {
        question: 'Perché mancano alcune distanze?',
        answer:
          'Un tempo a piedi affidabile dipende dal vero punto di partenza e dal percorso. Questi valori saranno aggiunti solo dopo una verifica coerente su mappa o sul posto.',
      },
    ],
  },
  resortPassGuide: {
    title: 'Europa-Park ResortPass 2026: disponibilità, prezzi e regole',
    description:
      'Capire ResortPass Silver e Gold: stato attuale delle vendite, prezzi, giorni di visita, prenotazione, Rulantica e avviso di disponibilità indipendente.',
    eyebrow: 'Guida ResortPass',
    heading: 'Tutto ciò che conta sul ResortPass Europa-Park',
    answer:
      'Silver e Gold non sono attualmente disponibili nella vendita ordinaria e non è stata annunciata una nuova data. Silver costa meno ed è legato a giorni di visita definiti; Gold è più flessibile e include prestazioni Rulantica aggiuntive.',
    sectionTitle: 'Scegli l’abbonamento annuale in base all’uso',
    sectionIntro:
      'Il prezzo da solo non decide. Contano di più i possibili giorni di visita, la flessibilità, l’uso di Rulantica e la disponibilità effettiva della tessera.',
    points: [
      {
        title: 'Prima la disponibilità',
        text: 'Il tracker controlla regolarmente la biglietteria ufficiale e distingue la reale possibilità di acquisto da annunci o code.',
        icon: 'tabler:bell-ringing',
      },
      {
        title: 'Silver o Gold',
        text: 'Silver prevede giorni di visita definiti; Gold offre maggiore flessibilità e include due biglietti giornalieri per Rulantica.',
        icon: 'tabler:scale',
      },
      {
        title: 'Controlla le regole nel portale',
        text: 'Prenotazioni, giorni esclusi e dettagli contrattuali possono cambiare e vanno verificati nella fonte ufficiale prima dell’acquisto.',
        icon: 'tabler:shield-check',
      },
    ],
    faqs: [
      {
        question: 'Quando torneranno disponibili i ResortPass?',
        answer:
          'Al momento non è stata annunciata una nuova data di vendita. Il tracker segnala quando il negozio ufficiale mostra davvero Silver o Gold come acquistabile.',
      },
      {
        question: 'Quanto costa il ResortPass?',
        answer:
          'Secondo l’ultima verifica ufficiale, Silver costa 325 euro per gli adulti e 275 euro per bambini/senior; Gold rispettivamente 495 e 430 euro.',
      },
      {
        question: 'Il tracker è affiliato a Europa-Park?',
        answer:
          'No. È un progetto indipendente della community. Acquisto, contratto e prestazioni vincolanti passano esclusivamente dai fornitori ufficiali.',
      },
    ],
  },
  resortPassCompare: {
    title: 'ResortPass Silver o Gold? Confronto e guida alla scelta',
    description:
      'Confronta ResortPass Silver e Gold: prezzo, giorni di visita, flessibilità, Rulantica e scenari d’uso adatti.',
    eyebrow: 'Silver o Gold',
    heading: 'Quale ResortPass si adatta alle tue abitudini di visita?',
    answer:
      'Silver è più adatto se i giorni definiti funzionano per te e conta il prezzo inferiore. Gold conviene soprattutto se vuoi la massima flessibilità e usi davvero le giornate Rulantica incluse.',
    sectionTitle: 'Il pass più costoso non è automaticamente il migliore',
    sectionIntro:
      'Confronta i tuoi giorni di visita reali e le prestazioni aggiuntive. Flessibilità inutilizzata o biglietti Rulantica non usati non generano valore.',
    points: [
      {
        title: 'Silver: più economico se pianifichi',
        text: 'Adatto se puoi organizzare le date in anticipo e i giorni di visita pubblicati coincidono con il tuo calendario.',
        icon: 'tabler:calendar-check',
      },
      {
        title: 'Gold: più flessibilità',
        text: 'Adatto a visite più frequenti o spontanee e a chi usa davvero i due biglietti giornalieri Rulantica inclusi.',
        icon: 'tabler:crown',
      },
      {
        title: 'Confronta con i biglietti giornalieri',
        text: 'Usa il numero previsto di visite reali e confrontalo con i biglietti giornalieri dai prezzi variabili per data.',
        icon: 'tabler:calculator',
      },
    ],
    faqs: [
      {
        question: 'Silver ha giorni esclusi?',
        answer:
          'Silver vale nei giorni di apertura definiti in anticipo. Fa fede l’elenco aggiornato nella pagina ufficiale e nel portale ResortPass.',
      },
      {
        question: 'Gold include biglietti Rulantica?',
        answer:
          'Secondo le informazioni attuali del gestore, Gold include due biglietti giornalieri Rulantica. Ricontrolla ufficialmente condizioni e prenotazione prima dell’uso.',
      },
      {
        question: 'Da quante visite conviene un pass?',
        answer:
          'Dipende dalle date effettive, dai prezzi dei biglietti giornalieri e dalle prestazioni aggiuntive utilizzate. Un numero universale sarebbe fuorviante.',
      },
    ],
  },
  resortPassPrices: {
    title: 'Prezzi ResortPass 2026: Silver, Gold e biglietti giornalieri',
    description:
      'Prezzi attuali del ResortPass per adulti, bambini e senior, confrontati con i biglietti giornalieri Europa-Park variabili per data.',
    eyebrow: 'Prezzi 2026',
    heading: 'Quanto costano ResortPass Silver e Gold?',
    answer:
      'Ultima verifica ufficiale: Silver costa 325 euro per gli adulti e 275 euro per bambini/senior; Gold rispettivamente 495 e 430 euro. Entrambi i pass non sono attualmente disponibili nella vendita ordinaria.',
    sectionTitle: 'Valuta il prezzo solo insieme all’utilizzo',
    sectionIntro:
      'I biglietti giornalieri hanno prezzi variabili per data. Un abbonamento annuale non conviene quindi dopo un numero universale di visite, ma in base alle tue date effettive.',
    points: [
      {
        title: 'Silver',
        text: '325 euro per gli adulti; 275 euro per bambini da 4 a 11 anni e senior dai 60 anni. Considera la data della fonte primaria.',
        icon: 'tabler:circle-letter-s',
      },
      {
        title: 'Gold',
        text: '495 euro per gli adulti; 430 euro per bambini e senior, con prestazioni aggiuntive come due giornate Rulantica.',
        icon: 'tabler:circle-letter-g',
      },
      {
        title: 'La disponibilità è indispensabile',
        text: 'Il confronto dei prezzi serve solo se il pass desiderato è davvero in vendita. Controlla lo stato in diretta.',
        icon: 'tabler:shopping-cart',
      },
    ],
    faqs: [
      {
        question: 'I prezzi valgono per il 2026?',
        answer:
          'Gli importi sono stati ripresi dalla biglietteria ufficiale alla data di verifica indicata. Il gestore può cambiare prezzi e condizioni.',
      },
      {
        question: 'Sono disponibili tariffe ridotte?',
        answer:
          'La pagina ufficiale indica prezzi ridotti per bambini, senior e alcune categorie aventi diritto. Fanno fede i documenti richiesti e le condizioni aggiornate.',
      },
      {
        question: 'Posso acquistare ora il ResortPass?',
        answer:
          'Silver e Gold risultano attualmente non disponibili. Il tracker in diretta mostra quando cambia lo stato effettivo del negozio.',
      },
    ],
  },
  resortPassReservation: {
    title: 'Prenotazione ResortPass: giorni, portale e ospiti degli hotel',
    description:
      'Come funzionano le prenotazioni ResortPass: registrare il giorno di visita, contingenti, prenotazione dell’hotel e regole aggiornate nel portale ResortPass.',
    eyebrow: 'Prenotazione',
    heading: 'Devi prenotare la visita con ResortPass?',
    answer:
      'La prenotazione concreta dipende dal pass, dal giorno di visita e dagli eventuali contingenti. Fanno fede il portale ResortPass e le FAQ ufficiali; una prenotazione alberghiera non sostituisce automaticamente ogni passaggio necessario.',
    sectionTitle: 'Tre cose da verificare prima di partire',
    sectionIntro:
      'Un pass valido, un giorno di visita consentito e un’eventuale prenotazione richiesta sono condizioni separate.',
    points: [
      {
        title: 'Apri il portale del pass',
        text: 'Controlla validità, giorni registrati e indicazioni attuali sui contingenti.',
        icon: 'tabler:login-2',
      },
      {
        title: 'Confronta la prenotazione dell’hotel',
        text: 'Leggi le FAQ aggiornate per sapere se e come i giorni di visita sono collegati al tuo specifico alloggio nel Resort.',
        icon: 'tabler:hotel-service',
      },
      {
        title: 'Conserva la conferma',
        text: 'Il giorno della visita tieni pronti pass e prova di prenotazione nell’app ufficiale o nel formato previsto.',
        icon: 'tabler:ticket',
      },
    ],
    faqs: [
      {
        question: 'Serve una prenotazione per ogni visita?',
        answer:
          'Non esiste una risposta unica per tutti i tipi di pass e tutti i periodi. Controlla la regola attuale nel portale ResortPass prima di ogni visita.',
      },
      {
        question: 'La prenotazione dell’hotel vale automaticamente come prenotazione del parco?',
        answer:
          'Le FAQ ufficiali descrivono regole speciali per chi pernotta. Non basarti su un’ipotesi: verifica la prenotazione concreta nel portale.',
      },
      {
        question: 'Cosa succede se il contingente è esaurito?',
        answer:
          'Fa fede la regola attuale del gestore. Il tracker di disponibilità controlla la vendita, non i contingenti individuali dei giorni di visita nel portale personale.',
      },
    ],
  },
  resortPassRulantica: {
    title: 'ResortPass e Rulantica: vantaggi Gold e prenotazione',
    description:
      'Quali prestazioni Rulantica include ResortPass Gold? Spiegazione di due biglietti giornalieri, pianificazione, prenotazione e differenza rispetto a Silver.',
    eyebrow: 'ResortPass + Rulantica',
    heading: 'Cosa include il ResortPass per Rulantica?',
    answer:
      'Secondo le informazioni attuali del gestore, ResortPass Gold include due biglietti giornalieri Rulantica; Silver no. Prenotazione, validità ed eventuali contingenti vanno verificati ufficialmente prima della visita.',
    sectionTitle: 'Usa davvero le due giornate Rulantica',
    sectionIntro:
      'La prestazione ha valore solo se le giornate incluse si adattano al viaggio e possono essere prenotate in tempo.',
    points: [
      {
        title: 'Pianifica il vantaggio Gold',
        text: 'Considera le due giornate come parte del tuo programma annuale, non come un’aggiunta improvvisata dopo il parco.',
        icon: 'tabler:droplet-filled',
      },
      {
        title: 'Calcola Silver separatamente',
        text: 'Con Silver, i biglietti Rulantica vanno calcolati a parte e prenotati in base alla disponibilità.',
        icon: 'tabler:receipt-euro',
      },
      {
        title: 'Controlla la fascia oraria',
        text: 'Per le famiglie, una giornata intera a Rulantica vale in genere più di un trasferimento di corsa dopo un giorno pieno al parco.',
        icon: 'tabler:clock-hour-8',
      },
    ],
    faqs: [
      {
        question: 'Quante giornate Rulantica include Gold?',
        answer:
          'Secondo le prestazioni ufficiali attuali, due biglietti giornalieri Rulantica. Prima dell’uso valgono le condizioni aggiornate del gestore.',
      },
      {
        question: 'Silver include Rulantica?',
        answer:
          'Secondo il confronto attuale, non come prestazione standard inclusa. I biglietti Rulantica necessari vanno calcolati separatamente.',
      },
      {
        question: 'Le giornate incluse vanno prenotate?',
        answer:
          'Controlla la regola di prenotazione aggiornata nel portale ResortPass. Rulantica ha contingenti giornalieri limitati.',
      },
    ],
  },
};

const visitPlanner: PlanningLocalePack['visitPlanner'] = {
  eyebrow: 'Pianificatore interattivo',
  title: 'Un programma giornaliero realistico',
  intro:
    'Scegli durata, gruppo e condizioni. Riceverai una sequenza solida, senza una falsa precisione al minuto.',
  dateLabel: 'Data della visita',
  daysLabel: 'Giorni previsti al parco',
  days: ['1 giorno', '2 giorni', '3 giorni'],
  groupLabel: 'Priorità',
  groups: {
    balanced: 'Equilibrato',
    family: 'Famiglia e bambini',
    thrill: 'Montagne russe e adrenalina',
    shows: 'Spettacoli e ritmo tranquillo',
  },
  arrivalLabel: 'Arrivo',
  arrivals: {
    early: 'Sul posto prima dell’apertura',
    opening: 'All’apertura',
    late: 'Dopo le 10:30',
  },
  crowdLabel: 'Affluenza prevista',
  crowds: {
    low: 'Piuttosto bassa',
    medium: 'Media',
    high: 'Alta',
  },
  rulanticaLabel: 'Includi Rulantica',
  submit: 'Crea il programma',
  resultTitle: 'La tua raccomandazione',
  resultLead: 'Pianifica con priorità chiare',
  resultDays: 'giorni totali consigliati',
  routeLabel: 'Programma della giornata',
  morning: 'Mattina',
  midday: 'Mezzogiorno',
  afternoon: 'Pomeriggio',
  evening: 'Sera',
  notes: {
    early: 'Presentati all’ingresso prima dell’apertura ufficiale e fissa tre obiettivi principali.',
    late: 'Con un arrivo tardivo, un secondo giorno è più solido di una corsa sovraccarica.',
    busy: 'Con grande affluenza usa i tempi di attesa in diretta e prepara un’alternativa per ogni area.',
    rulantica: 'Con bambini piccoli o forte interesse per l’acqua, considera Rulantica come giornata separata.',
    family: 'Pianifica fasce fisse per pasti e riposo, oltre ad almeno un’alternativa al coperto.',
    thrill: 'Usa Single Rider e VirtualLine solo se sono effettivamente disponibili il giorno della visita.',
    shows: 'Controlla prima gli orari degli spettacoli e costruisci il percorso intorno a questi appuntamenti fissi.',
  },
  routes: {
    balanced: [
      'Inizia con due attrazioni importanti restando nella stessa area del parco.',
      'Mangia presto o tardi, poi inserisci un’attrazione al coperto o uno spettacolo come momento più tranquillo.',
      'Completa le aree tematiche vicine e confronta i tempi di attesa in diretta prima di spostarti.',
      'Recupera una priorità rimasta, controlla i souvenir e un’eventuale estensione dell’orario di apertura.',
    ],
    family: [
      'Inizia con un’attrazione famigliare adatta e verifica l’altezza all’ingresso.',
      'Pianifica presto una pausa, il pasto e un’attrazione tranquilla al coperto o uno spettacolo.',
      'Collega un’area gioco e altre due attrazioni adatte all’età nella stessa metà del parco.',
      'Lascia decidere all’energia dei bambini: meglio un’attrazione memorabile che uno sprint finale estenuante.',
    ],
    thrill: [
      'Dai priorità a un coaster principale all’apertura senza attraversare il parco per una sola attrazione.',
      'Controlla VirtualLine e Single Rider; a pranzo scegli un’alternativa vicina.',
      'Scegli il secondo gruppo di coaster in base alle attese in diretta e considera i possibili guasti tecnici.',
      'Pianifica strategicamente l’ultimo giro vicino all’area in cui vuoi concludere.',
    ],
    shows: [
      'Controlla il programma degli spettacoli e scegli un’attrazione tranquilla lungo il tragitto verso il primo appuntamento.',
      'Abbina un pasto anticipato a uno spettacolo al coperto o a un’attrazione tematica.',
      'Fissa un secondo spettacolo e tra i due pianifica solo attrazioni vicine.',
      'Goditi atmosfera, ristorazione e un ultimo giro senza inutili cambi di area.',
    ],
  },
  disclaimer:
    'Strumento di pianificazione senza garanzia. Orari, tempi di attesa, VirtualLine e funzionamento delle attrazioni possono cambiare con poco preavviso.',
  forecastCta: 'Controlla le previsioni di affluenza',
};

const costCalculator: PlanningLocalePack['costCalculator'] = {
  eyebrow: 'Pianificatore del budget 2026',
  title: 'Calcola un intervallo di costo realistico',
  intro:
    'Intervalli ufficiali dei biglietti più la tua ipotesi per l’alloggio. Pasti, viaggio ed extra opzionali restano volutamente fuori dalla somma automatica.',
  adults: 'Adulti dai 12 anni',
  children: 'Bambini 4–11 anni',
  days: 'Europa-Park',
  oneDay: '1 giorno',
  twoDays: '2 giorni',
  rulantica: 'Rulantica',
  rulanticaOptions: {
    none: 'Non includere',
    day: 'Biglietto giornaliero',
    evening: 'Biglietto serale dalle 17',
    moonlight: 'Moonlight dalle 19',
  },
  parking: 'Parcheggio standard a Europa-Park',
  nights: 'Pernottamenti',
  lodgingPerNight: 'Costo totale dell’alloggio per notte',
  calculate: 'Aggiorna il budget',
  resultEyebrow: 'Il tuo intervallo di spesa',
  total: 'Costo totale stimato',
  rangeConnector: '–',
  perPerson: 'a persona',
  breakdown: 'Dettaglio',
  europaParkTickets: 'Biglietti Europa-Park',
  rulanticaTickets: 'Biglietti Rulantica',
  parkingCost: 'Parcheggio',
  lodgingCost: 'Alloggio',
  variableNote: 'I prezzi dei biglietti variano in base alla data; l’intervallo non è una garanzia di prezzo.',
  assumptionNote: 'Aggiungi anche pasti, viaggio e commissioni.',
  currency: 'EUR',
};

const familyFinder: PlanningLocalePack['familyFinder'] = {
  eyebrow: 'Filtro famiglie',
  title: 'Filtra le attrazioni per età e altezza',
  intro:
    'Il filtro usa una selezione volutamente piccola e verificata ufficialmente. La decisione vincolante spetta sempre al personale sul posto.',
  age: 'Età del bambino',
  height: 'Altezza',
  interest: 'Interesse',
  interests: {
    all: 'Tutti gli esempi verificati',
    calm: 'Tranquillo',
    family: 'Avventura in famiglia',
    thrill: 'Adrenalina',
    indoor: 'Al coperto',
  },
  submit: 'Mostra gli esempi adatti',
  resultTitle: 'Selezione verificata',
  resultCount: 'attrazioni mostrate',
  eligible: 'Requisito soddisfatto',
  accompanied: 'Serve un accompagnatore adulto',
  notYet: 'Requisito non soddisfatto',
  minimum: 'Minimo',
  years: 'anni',
  centimeters: 'cm',
  indoor: 'Al coperto',
  source: 'Fonte ufficiale',
  noResults: 'Per questo filtro non è ancora disponibile un’attrazione di esempio verificata.',
  disclaimer:
    'Accesso non garantito. Sul posto valgono cartelli, asta di misurazione, regole sanitarie e di sicurezza e indicazioni del personale.',
  officialFilter: 'Controlla tutte le attrazioni nel filtro ufficiale',
};

const rulanticaPlanner: PlanningLocalePack['rulanticaPlanner'] = {
  eyebrow: 'Guida alla visita combinata',
  title: 'Quale biglietto Rulantica si adatta al tuo viaggio?',
  intro:
    'Lo strumento considera giorni al parco, bambini, importanza dell’acqua e livello di energia. In seguito verifichi ufficialmente prezzi e disponibilità.',
  parkDays: 'Giorni a Europa-Park',
  parkDayOptions: ['1 giorno al parco', '2 giorni al parco', '3 o più giorni'],
  children: 'Bambini nel gruppo',
  childOptions: ['Nessun bambino', 'Bambini sotto gli 8 anni', 'Bambini più grandi / ragazzi'],
  waterPriority: 'Importanza di Rulantica',
  priorityOptions: ['Solo una prova', 'Aggiunta importante', 'Meta principale'],
  energy: 'Ritmo desiderato',
  energyOptions: ['Rilassato', 'Equilibrato', 'Programma pieno'],
  submit: 'Valuta il tipo di biglietto',
  resultLabel: 'Consiglio di pianificazione',
  recommendations: {
    day: {
      title: 'Una giornata intera a Rulantica',
      text: 'Con bambini piccoli o grande interesse per l’acqua, una giornata dedicata lascia abbastanza tempo per pause, cambi e diverse aree.',
    },
    evening: {
      title: 'Biglietto serale come aggiunta',
      text: 'È adatto con un ritmo normale e scelte chiare, ma dopo Europa-Park pianifica una vera pausa e il tempo di spostamento.',
    },
    moonlight: {
      title: 'Moonlight per una breve conclusione',
      text: 'Tre ore sono più adatte a visitatori esperti ed energici con poche priorità che a una prima visita completa.',
    },
    separate: {
      title: 'Pianifica Rulantica separatamente',
      text: 'Con un ritmo tranquillo o un viaggio più lungo, una fascia separata è più affidabile del trasferimento dopo una giornata intera al parco.',
    },
  },
  checklistTitle: 'Cosa portare e verificare prima',
  checklist: [
    'Asciugamano proprio per i visitatori giornalieri',
    'Costume e abiti asciutti di ricambio',
    'Orari aggiornati di apertura e manutenzione',
    'Regole di età e altezza per gli scivoli desiderati',
    'Prenotazione, biglietto e opzione armadietto',
  ],
  officialNote:
    'Le FAQ ufficiali restano vincolanti per ingresso, abbigliamento, asciugamani, passeggini e armadietti.',
  officialCta: 'Apri le FAQ di Rulantica',
};

const stayComparator: PlanningLocalePack['stayComparator'] = {
  eyebrow: 'Confronto alloggi',
  title: 'Quale tipo di alloggio si adatta al tuo viaggio?',
  intro:
    'Confronta otto tipi di alloggio in base a caratteristiche documentabili. Il filtro non mostra classifiche né prezzi non verificati: restringe la ricerca alle opzioni sensate.',
  filtersLabel: 'Filtra gli alloggi',
  scenarioLabel: 'Che cosa conta di più per te?',
  allScenarios: 'Tutte le situazioni di viaggio',
  prioritiesLabel: 'Caratteristiche aggiuntive',
  priorities: {
    operatorGuestBenefits: 'Vantaggi per gli ospiti del Resort',
    selfCatering: 'Pasti in autonomia',
    ownSleepingUnitRequired: 'Attrezzatura propria per dormire',
    groupFormats: 'Adatto ai gruppi',
    walkingAccess: 'Parco raggiungibile a piedi',
    shuttleOrTransit: 'Navetta o trasporto pubblico',
  },
  reset: 'Azzera i filtri',
  resultsLabel: 'Tipi di alloggio confrontabili',
  resultSingular: 'tipo di alloggio',
  resultPlural: 'tipi di alloggio',
  operatorRelation: {
    resort_operated: 'Gestito da Europa-Park Resort',
    independent: 'Gestione indipendente',
  },
  states: {
    verified: 'Verificato',
    available_for_this_type: 'Disponibile per questo tipo',
    not_applicable: 'Non applicabile',
    varies_by_property: 'Varia in base alla struttura',
    must_verify: 'Da verificare prima di prenotare',
  },
  verifyTitle: 'Da verificare concretamente prima della prenotazione',
  source: 'Apri la fonte',
  checkedAt: 'Verificato il',
  emptyTitle: 'Nessun tipo di alloggio corrisponde a tutti i filtri',
  emptyText:
    'Rimuovi una caratteristica o seleziona di nuovo tutte le situazioni di viaggio. Un risultato vuoto non dice nulla sulle singole strutture.',
  priceNoteTitle: 'Perché qui non compaiono prezzi degli hotel',
  priceNoteText:
    'I prezzi degli alloggi variano secondo data, occupazione, tariffa e prestazioni. Confronta prima la tipologia adatta e poi verifica il prezzo finale direttamente con la struttura.',
  notRanking:
    'L’ordine è neutrale: non è né un giudizio di qualità né una raccomandazione a pagamento.',
  noJs:
    'Senza JavaScript restano visibili tutti i tipi di alloggio e le liste di verifica; mancano solo i filtri interattivi.',
  scenarioLabels: {
    'operator-benefits-priority': 'Dai priorità all’ingresso anticipato e ai trasporti del Resort',
    'park-and-rulantica-without-car': 'Combina Europa-Park e Rulantica senza auto',
    'own-motorhome-or-caravan': 'Arriva con camper o roulotte propri',
    'own-tent': 'Pernotta nella tua tenda',
    'large-group-themed-stay': 'Alloggio a tema per famiglia, associazione o gruppo',
    'self-catering-filter': 'Usa l’autonomia nei pasti come criterio di scelta',
    'walkability-filter': 'Filtra l’alloggio per distanza a piedi dall’ingresso principale',
  },
  typeContent: {
    'official-themed-hotel': {
      label: 'Hotel tematico Europa-Park',
      definition:
        'Uno dei sei hotel tematici a 4 stelle (Superior) gestiti dal Resort.',
      mustVerify: [
        'i vantaggi validi per le date esatte del viaggio',
        'quali attrazioni sono effettivamente aperte durante l’ingresso anticipato',
        'occupazione della camera e accessibilità',
        'se i biglietti d’ingresso sono inclusi nel pacchetto scelto o vanno acquistati separatamente',
      ],
    },
    'riverside-western-lodge': {
      label: 'Riverside Western Lodge',
      definition:
        'Sistemazione in camera a Silver Lake City con un profilo specifico di vantaggi per gli ospiti.',
      mustVerify: [
        'l’orario aggiornato degli autobus di Rust',
        'i vantaggi validi per le date esatte del viaggio',
        'occupazione della camera e accessibilità',
        'eventuali fasi di rumore dovute agli eventi a Silver Lake City',
      ],
    },
    'tipi-town': {
      label: 'Tipi Town',
      definition:
        'Alloggi a tema per gruppi e famiglie in tipi, carri coperti, camere in case di tronchi e Western Houses.',
      mustVerify: [
        'la configurazione di servizi igienici e zona notte della categoria scelta',
        'se la colazione è obbligatoria o aggiungibile',
        'i vantaggi validi per le date esatte del viaggio',
        'eventuali fasi di rumore dovute agli eventi',
        'se la lunghezza dei letti a castello è adatta ai viaggiatori',
      ],
    },
    'official-caravaning': {
      label: 'Europa-Park Caravaning',
      definition:
        'Piazzole a Silver Lake City per camper e roulotte.',
      mustVerify: [
        'dimensioni del veicolo e categoria di piazzola adatta',
        'condizioni di corrente elettrica e acqua della prenotazione concreta',
        'orari di arrivo, silenzio e partenza',
        'vantaggi aggiornati e orario degli autobus di Rust',
      ],
    },
    'official-tent-camping': {
      label: 'Europa-Park Camping',
      definition:
        'Area campeggio a Silver Lake City per gli ospiti con tenda propria.',
      mustVerify: [
        'regole per tende e piazzole',
        'fabbisogno di corrente e condizioni di allacciamento',
        'opzioni per servizi igienici e colazione',
        'meteo, orari di silenzio e vantaggi aggiornati per gli ospiti',
      ],
    },
    'independent-hotel-or-guesthouse-rust': {
      label: 'Hotel o pensione indipendente a Rust',
      definition:
        'Alloggio gestito in modo indipendente nel comune di Rust.',
      mustVerify: [
        'attività corrente della struttura e disponibilità di prenotazione',
        'percorso a piedi effettivo fino all’ingresso necessario',
        'colazione, parcheggio, cancellazione e accessibilità',
        'non presumere i vantaggi degli hotel del Resort',
      ],
    },
    'independent-holiday-apartment-rust': {
      label: 'Appartamento vacanze indipendente a Rust',
      definition:
        'Alloggio indipendente registrato dal comune di Rust come appartamento vacanze.',
      mustVerify: [
        'dotazioni di cucina e zona pranzo, senza dedurle dalla categoria',
        'percorso a piedi effettivo fino all’ingresso necessario',
        'soggiorno minimo, pulizia finale, parcheggio e cancellazione',
        'registrazione corrente e disponibilità',
      ],
    },
    'accommodation-nearby-municipalities': {
      label: 'Alloggio in un comune vicino',
      definition:
        'Alloggio indipendente fuori da Rust, in un comune dell’Erlebnisregion Europa-Park.',
      mustVerify: [
        'collegamento nel giorno della settimana specifico e alla chiusura del parco',
        'ultima corsa di ritorno ed eventuali cambi',
        'parcheggio a destinazione e presso l’alloggio',
        'attività corrente della struttura e disponibilità di prenotazione',
      ],
    },
  },
};

const restaurantFinder: PlanningLocalePack['restaurantFinder'] = {
  eyebrow: 'Elenco verificato',
  title: 'Confronta in modo oggettivo i piccoli ristoranti di Rust',
  intro:
    'Cerca tra otto schede verificate dalla redazione. Sono visibili solo le caratteristiche documentate; non esprimiamo giudizi su qualità, fascia di prezzo o disponibilità dei tavoli.',
  filtersLabel: 'Filtra i ristoranti',
  searchLabel: 'Nome o indirizzo',
  searchPlaceholder: 'Per esempio Adler o Fischerstraße',
  statusLabel: 'Stato della verifica',
  allStatuses: 'Tutti gli stati',
  statuses: {
    first_party_verified: 'Verificato con una fonte del gestore',
    public_directory_verified: 'Verificato nell’elenco comunale',
    license_page_verified: 'Verificato tramite pagina di licenza',
    needs_reverification: 'Da verificare nuovamente',
  },
  timeLabel: 'Fascia oraria documentata',
  allTimes: 'Tutte le fasce orarie documentate',
  timeSlots: {
    breakfast: 'Colazione',
    evening: 'Servizio serale',
  },
  distanceLabel: 'Distanza documentata',
  allDistances: 'Tutte le distanze documentate',
  distanceOptions: [
    { maxMetres: 500, label: 'Fino a 500 m' },
    { maxMetres: 1000, label: 'Fino a 1 km' },
    { maxMetres: 2000, label: 'Fino a 2 km' },
  ],
  needsLabel: 'Esigenze documentate',
  familyFeatures: {
    kids_menu: 'Menu per bambini indicato',
  },
  dietFeatures: {
    vegetarian_evidence: 'Opzioni vegetariane documentate',
    vegan_evidence: 'Opzioni vegane documentate',
    gluten_free_evidence: 'Opzioni senza glutine documentate',
  },
  reset: 'Azzera i filtri',
  resultsLabel: 'Schede verificate',
  resultSingular: 'ristorante',
  resultPlural: 'ristoranti',
  noJs:
    'Senza JavaScript tutte le schede, le fonti e le incertezze restano leggibili; mancano solo ricerca e filtri.',
  emptyTitle: 'Nessuna scheda corrisponde a questi filtri',
  emptyText:
    'Rimuovi un filtro. L’assenza di risultati può anche significare che la caratteristica non è ancora documentata in modo affidabile.',
  serviceEvidence: 'Offerta documentata',
  cuisineEvidence: 'Profilo culinario documentato',
  filterEvidence: 'Prova per il filtro',
  evidenceCheckedAt: 'Prova verificata',
  source: 'Fonte primaria',
  operatorWebsite: 'Sito del gestore',
  corroboratingSource: 'Fonte aggiuntiva',
  uncertaintyTitle: 'Cosa resta da verificare prima della visita',
  verificationNote: 'Nota di verifica',
  checkedAt: 'Scheda verificata',
  reviewDue: 'Data di revisione superata',
  notRecommendation: 'Non è una raccomandazione',
  notRecommendationTitle: 'Elenco neutrale, non una classifica',
  notRecommendationText:
    'L’inserimento e l’ordine non sono un giudizio di qualità. Verifica direttamente con il locale orari, menu, allergeni e prenotazione.',
  unavailableEvidenceTitle: 'Questi filtri sono volutamente nascosti',
  unavailableEvidence: {
    time: 'Le fasce orarie non sono ancora documentate in modo abbastanza uniforme.',
    distance: 'Le distanze non sono ancora state misurate con un percorso coerente.',
    family: 'Le caratteristiche per famiglie non sono ancora sufficientemente documentate.',
    diet: 'Le opzioni vegetariane, vegane e senza glutine non sono ancora rilevate in modo abbastanza affidabile.',
  },
  entryContent: {
    'gasthaus-adler-rust': {
      cuisineEvidence: ['cucina casalinga tradizionale'],
      serviceEvidence: ['servizio serale secondo il sito del gestore'],
      verificationNote:
        'Il sito del gestore e le note legali erano accessibili; indirizzo, contatti, profilo culinario e indicazioni aggiornate sull’apertura erano visibili il giorno della verifica.',
      uncertainties: [
        'Aperture speciali e ferie dipendono dal periodo.',
        'La disponibilità delle prenotazioni non è stata verificata.',
      ],
    },
    'hardys-rust': {
      cuisineEvidence: [
        'piatti regionali e internazionali',
        'hamburger, costine, pasta e bistecche secondo il gestore',
      ],
      serviceEvidence: [
        'colazione secondo il sito del gestore',
        'servizio serale secondo il sito del gestore',
      ],
      verificationNote:
        'Il sito del gestore era accessibile e indicava indirizzo, profilo dei piatti e offerta per la colazione.',
      uncertainties: [
        'Lo stato di apertura in diretta sul sito può cambiare con poco preavviso.',
        'La presentazione del gestore e le recensioni integrate non sono state usate come prova di qualità.',
      ],
    },
    'casa-rustica-rust': {
      cuisineEvidence: ['cucina italiana'],
      serviceEvidence: ['servizio serale secondo l’elenco comunale'],
      verificationNote:
        'Il sito del gestore conferma attività, indirizzo e ristorante italiano; l’elenco comunale fornisce una fascia di apertura aggiornata.',
      uncertainties: [
        'Conferma gli orari sul sito del gestore o per telefono prima della visita.',
        'Il tempo a piedi fino al parco indicato dal gestore non è stato misurato in modo indipendente.',
      ],
    },
    'hotel-restaurant-mythos': {
      cuisineEvidence: ['cucina greca e internazionale'],
      serviceEvidence: ['menu per bambini secondo il sito del gestore'],
      verificationNote:
        'Il sito del gestore era accessibile e confermava indirizzo, profilo culinario e contatto per le prenotazioni.',
      uncertainties: [
        'Nel contenuto leggibile il sito non indica orari settimanali stabili.',
        'La disponibilità dei tavoli non è stata verificata.',
      ],
    },
    'kaiserstuehler-hof-rust': {
      cuisineEvidence: ['cucina del Baden', 'piatti regionali'],
      serviceEvidence: ['servizio serale secondo il sito del gestore'],
      verificationNote:
        'Il sito del gestore era accessibile e indicava indirizzo, profilo di cucina del Baden e attuale ritmo settimanale.',
      uncertainties: [
        'Ricontrolla ferie e giorno di chiusura prima della visita.',
        'Nessuna valutazione sull’idoneità per allergie senza una richiesta diretta.',
      ],
    },
    'restaurant-fenix-rust': {
      cuisineEvidence: ['tipo di cucina non indicato chiaramente nella fonte primaria'],
      serviceEvidence: ['servizio serale secondo il sito del gestore'],
      verificationNote:
        'Il sito del gestore e la scheda comunale confermano attività, indirizzo e contatti. Le affermazioni di marketing non sono state riportate.',
      uncertainties: [
        'Verifica manualmente il tipo di cucina sul menu aggiornato prima di una categorizzazione editoriale.',
        'Il sito del gestore indica orari diversi dalle piattaforme di terzi; usa solo le informazioni del gestore.',
      ],
    },
    'la-terrassa-rust': {
      cuisineEvidence: ['tipo di cucina non indicato nella scheda comunale'],
      serviceEvidence: ['terrazza secondo l’elenco comunale'],
      verificationNote:
        'Il ristorante compare nell’elenco comunale aggiornato; il sito aziendale collegato descrive soprattutto la pensione e non conferma dettagli sul ristorante.',
      uncertainties: [
        'Conferma direttamente con il gestore stato dell’attività, tipo di cucina e orari.',
        'Non metterlo in evidenza come opzione verificata dalla redazione prima di una conferma diretta.',
      ],
    },
    'my-denis-rust': {
      cuisineEvidence: ['tipo di cucina non indicato nella scheda comunale'],
      serviceEvidence: ['consegna secondo l’elenco comunale'],
      verificationNote:
        'Trovato solo nell’elenco comunale; il giorno della verifica non è stato individuato un sito proprio affidabile.',
      uncertainties: [
        'Conferma direttamente stato dell’attività, contatti, tipo di cucina e orari.',
        'Non inserirlo in raccomandazioni o classifiche per gli utenti prima di una verifica tramite una fonte diretta.',
      ],
    },
  },
};

const resortPassTool: PlanningLocalePack['resortPassTool'] = {
  eyebrow: 'Guida alla scelta ResortPass',
  title: 'Controlla insieme stato, prestazioni e costi reali',
  intro:
    'Lo stato in diretta risponde alla domanda sull’acquisto. Confronto e calcolatore aiutano poi a scegliere tra biglietti giornalieri, Silver e Gold.',
  statusTitle: 'Stato attuale delle vendite',
  statusChecking: 'Verifica dello stato…',
  statusAvailable: 'Ora disponibile ufficialmente',
  statusUnavailable: 'Attualmente non disponibile',
  statusUnknown: 'Stato al momento incerto',
  statusError: 'Impossibile caricare lo stato in diretta',
  lastChecked: 'Ultima verifica',
  comparisonTitle: 'Silver e Gold in sintesi',
  feature: 'Caratteristica',
  silver: 'Silver',
  gold: 'Gold',
  adultPrice: 'Prezzo adulti',
  concessionPrice: 'Bambini 4–11 anni / senior dai 60 anni',
  visitDays: 'Giorni di visita',
  visitDaysSilver: 'Giorni di visita definiti e pubblicati',
  visitDaysGold: 'Maggiore flessibilità secondo le condizioni attuali',
  rulanticaBenefit: 'Rulantica',
  rulanticaSilver: 'Non incluso come prestazione standard',
  rulanticaGold: 'Due biglietti giornalieri secondo le condizioni attuali',
  flexibility: 'Profilo di pianificazione',
  flexibilitySilver: 'Per date pianificabili in anticipo',
  flexibilityGold: 'Per visite più frequenti o spontanee',
  calculatorTitle: 'Semplice confronto dei costi per un adulto',
  calculatorIntro:
    'Confronta gli ultimi prezzi documentati dei pass con un numero scelto da te di visite giornaliere a Europa-Park e Rulantica.',
  visitsLabel: 'Visite a Europa-Park',
  rulanticaVisitsLabel: 'Visite giornaliere a Rulantica',
  priceScenarioLabel: 'Scenario del biglietto giornaliero',
  lowerPriceScenario: 'Limite inferiore dell’intervallo documentato',
  upperPriceScenario: 'Limite superiore dell’intervallo documentato',
  calculate: 'Aggiorna il confronto',
  dayTicketsCost: 'Singoli biglietti giornalieri',
  silverCost: 'Silver più biglietti Rulantica',
  goldCost: 'Gold con due giornate Rulantica incluse',
  lowestCost: 'Importo più basso secondo il calcolo',
  estimateDisclaimer:
    'Stima orientativa per un adulto, senza garanzia di acquisto o disponibilità. Giorni esclusi, prenotazioni, riduzioni, viaggio e prestazioni non utilizzate possono cambiare la decisione.',
  linksTitle: 'Chiarisci direttamente la domanda successiva',
  compareLink: 'Confronta Silver e Gold',
  pricesLink: 'Controlla i prezzi ResortPass',
  reservationLink: 'Capisci la prenotazione',
  rulanticaLink: 'ResortPass e Rulantica',
};

export const itPlanning: PlanningLocalePack = {
  common,
  navigation,
  pages,
  visitPlanner,
  costCalculator,
  familyFinder,
  rulanticaPlanner,
  stayComparator,
  restaurantFinder,
  resortPassTool,
};
