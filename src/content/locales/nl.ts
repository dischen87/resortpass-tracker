import type { PlanningLocalePack } from '../planning-types';

export const nlPlanning: PlanningLocalePack = {
  common: {
    skip: 'Naar de inhoud',
    menu: 'Menu',
    language: 'Taal kiezen',
    home: 'Home',
    plannerLabel: 'Plan je bezoek',
    answerLabel: 'Kort antwoord',
    updatedLabel: 'Gecontroleerd',
    sourcePrefix: 'Bron',
    onThisPage: 'Op deze pagina',
    relatedTitle: 'Logische volgende stappen',
    sourcesTitle: 'Bronnen en actualiteit',
    sourcesIntro:
      'Gegevens die kunnen veranderen, komen uit bronnen van de exploitant en overheidsinstanties. Controleer prijzen, openingstijden en regels vóór het boeken opnieuw via de gelinkte primaire bron.',
    correctionLabel: 'Klopt er iets niet?',
    correctionText:
      'Meld verouderde informatie. We maken duidelijk onderscheid tussen onderbouwde feiten, rekenaannames en redactionele duiding.',
    unofficial: 'Onafhankelijk communityproject',
    footerText: 'Onafhankelijke planningshulp – niet verbonden aan Europa-Park.',
    overview: 'Overzicht',
    tool: 'Planningstool',
    decisions: 'Keuzehulp',
    faq: 'Veelgestelde vragen',
    notRecommendation: 'Vermelding in de gids, geen aanbeveling',
    verifyBeforeVisit: 'Controleer dit vóór je bezoek rechtstreeks bij de aanbieder',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 of 2 dagen',
    costCalculator: 'Kosten',
    familyGuide: 'Gezinnen',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Overnachten',
    restaurantGuide: 'Eten in Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Europa-Park plannen: onafhankelijke gids met rekentools',
      description:
        'Plan je bezoek aan Europa-Park praktisch: 1 of 2 dagen, kosten, kinderen, Rulantica, overnachten en restaurants in Rust – met interactieve hulpmiddelen.',
      eyebrow: 'Planningscentrum voor Europa-Park',
      heading: 'Plan Europa-Park rond wat jij echt nodig hebt',
      answer:
        'Voor een eerste bezoek is één volle dag het minimum; twee dagen zijn meestal rustiger, vooral met kinderen, shows of grote drukte. Baseer je plan op datum, groepssamenstelling en budget in plaats van op een algemene top 10.',
      sectionTitle: 'Van vraag naar een realistisch bezoekplan',
      sectionIntro:
        'De tools koppelen jouw situatie aan actuele feiten. Ze vervangen geen officiële boeking, maar helpen de belangrijkste verkeerde keuzes vóór je reis te voorkomen.',
      points: [
        {
          title: 'Bepaal eerst hoeveel tijd je hebt',
          text: 'Beslis op basis van aankomsttijd, belangrijkste attracties en verwachte drukte of één of twee parkdagen verstandig zijn.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Totale kosten, niet alleen de ticketprijs',
          text: 'Tel parktickets, Rulantica, parkeren en accommodatie bij elkaar op – als bandbreedte, niet als misleidende vaste prijs.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Pas de route aan je groep aan',
          text: 'Lengte, leeftijd, behoefte aan pauzes en interesses bepalen een goede volgorde sterker dan algemene ranglijsten.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Hoeveel dagen heb je nodig voor Europa-Park?',
          answer:
            'Eén volle dag kan genoeg zijn voor een selectie van hoogtepunten. Voor een eerste bezoek, gezinnen, shows en een minder gehaaste ronde zijn twee dagen meestal realistischer.',
        },
        {
          question: 'Is deze website officieel?',
          answer:
            'Nee. ResortPass Tracker is een onafhankelijk communityproject. Voor toegang, veiligheid en actuele regels geldt altijd de officiële informatie van Europa-Park.',
        },
        {
          question: 'Waarom toont de calculator prijsbandbreedtes?',
          answer:
            'Europa-Park en Rulantica hanteren onlineprijzen die afhangen van de datum. Zolang je geen concrete datum in de officiële ticketshop kiest, is een bandbreedte eerlijker.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park in 1 of 2 dagen? Interactieve bezoekplanner',
      description:
        'Is één dag in Europa-Park genoeg? Maak een plan op basis van bezoekdatum, groep, aankomst, drukte en Rulantica – inclusief dagindeling.',
      eyebrow: '1 of 2 dagen',
      heading: 'Hoeveel dagen heb jij nodig in Europa-Park?',
      answer:
        'Eén dag past bij een vroege aankomst en duidelijke prioriteiten. Twee dagen zijn een veiligere keuze voor gezinnen, shows en veel themagebieden; met Rulantica zijn twee tot drie dagen meestal verstandiger.',
      sectionTitle: 'Wat de ideale bezoekduur echt bepaalt',
      sectionIntro:
        'Niet iedere groep heeft dezelfde route nodig. Plan eerst tijdsblokken en prioriteiten; de werkelijke wachttijden bepalen pas op de bezoekdag de precieze volgorde.',
      points: [
        {
          title: 'Eén dag: streng kiezen',
          text: 'Begin bij opening, geef drie tot vijf hoofddoelen voorrang en houd alternatieven in aangrenzende themagebieden achter de hand.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Twee dagen: verdeel het park',
          text: 'Verdeel grote attracties, familieaanbod en shows over twee parkhelften, zodat je minder loopt en minder dubbel doet.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Grote drukte: bouw speling in',
          text: 'Reserveer tijd voor eten, technische storingen en looproutes. Live wachttijden helpen je ter plaatse bij te sturen.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Kun je Europa-Park in één dag doen?',
          answer:
            'Je kunt veel hoogtepunten halen, maar zelden alles. De planner beoordeelt aankomst, groep en drukte en adviseert meer tijd bij ongunstige omstandigheden.',
        },
        {
          question: 'Kun je Rulantica op dezelfde dag bezoeken?',
          answer:
            'Een avondticket kan passen voor volwassenen of oudere kinderen die dol zijn op water. Met jonge kinderen of wanneer de waterwereld centraal staat, is een aparte dag rustiger.',
        },
        {
          question: 'Garandeert de route korte wachttijden?',
          answer:
            'Nee. Weer, storingen en de werkelijke drukte kunnen het dagplan veranderen. Controleer op de bezoekdag de officiële app en live wachttijden.',
        },
      ],
    },
    costCalculator: {
      title: 'Europa-Park kostencalculator 2026: tickets, parkeren en hotel',
      description:
        'Bereken een realistische kostenbandbreedte voor Europa-Park met volwassenen, kinderen, 1 of 2 dagen, Rulantica, parkeren en accommodatie.',
      eyebrow: 'Totale kosten',
      heading: 'Wat kost jouw bezoek aan Europa-Park in totaal?',
      answer:
        'De entree is maar een deel van je budget. De calculator combineert datumafhankelijke ticketprijzen met parkeren, Rulantica en jouw accommodatiebudget en toont bewust een minimum en maximum.',
      sectionTitle: 'Zo maak je van losse prijzen een bruikbaar budget',
      sectionIntro:
        'We gebruiken officiële prijsbandbreedtes, maar geen verzonnen hotelprijzen. Accommodatie, eten en vervoer voer je als eigen aannames in.',
      points: [
        {
          title: 'Datumprijzen als bandbreedte',
          text: 'Zonder concrete ticketdatum is een bandbreedte betrouwbaarder dan één lokprijs.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Gezinsbudget per persoon',
          text: 'Met het totaalbedrag en de prijs per persoon vergelijk je varianten van 1 en 2 dagen makkelijker.',
          icon: 'tabler:users',
        },
        {
          title: 'Aannames blijven zichtbaar',
          text: 'Accommodatie en bijkomende kosten staan apart, zodat je iedere aanname zelf kunt vervangen.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Zijn de prijzen in de calculator gegarandeerd?',
          answer:
            'Nee. Dit zijn officiële prijsbandbreedtes met een controledatum. Beschikbaarheid, bezoekdatum, verwerkingskosten en boekingskanaal kunnen de uiteindelijke prijs veranderen.',
        },
        {
          question: 'Waarom gebruikt de calculator geen gemiddelde hotelprijs?',
          answer:
            'Accommodatieprijzen hangen sterk af van datum, bezetting en annuleringsvoorwaarden. Daarom vul je zelf een werkelijk gevonden prijs in.',
        },
        {
          question: 'Zijn eten en vervoer inbegrepen?',
          answer:
            'Nog niet automatisch. Deze kosten verschillen sterk per vertrekplaats en gewoonten en kun je het beste als persoonlijke extra buffer opnemen.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park met kinderen: attractiefilter op lengte en gezinsplan',
      description:
        'Plan Europa-Park met baby, peuter, kleuter of schoolkind: filter attracties op leeftijd en lengte, herken begeleidingsregels en plan slimme pauzes.',
      eyebrow: 'Gezinnen en kinderen',
      heading: 'Welke attracties passen bij jouw kind?',
      answer:
        'Bij attracties tellen leeftijd en lichaamslengte vaak allebei. Gebruik de zoeker als voorselectie en controleer ter plaatse altijd de meetlat, informatieborden en aanwijzingen van het personeel.',
      sectionTitle: 'Een gezinsplan is meer dan een lijst met attracties',
      sectionIntro:
        'Pauzes, eten, verschonen, kinderen met verschillende lengtes en mogelijke begeleidingsregels bepalen de route net zo sterk als favoriete attracties.',
      points: [
        {
          title: 'Combineer leeftijd en lengte',
          text: 'De zoeker maakt op basis van officiële detailpagina’s onderscheid tussen de minimumeis en mogelijke begeleiding door een volwassene.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Plan rustige blokken',
          text: 'Indoorattracties, speelplekken en shows werken goed als rustmoment tussen intensievere attracties.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Controleer opnieuw ter plaatse',
          text: 'Veiligheidsregels kunnen veranderen en staan bindend aangegeven bij de ingang van iedere attractie.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Is alleen de lichaamslengte bepalend?',
          answer:
            'Nee. Sommige attracties hebben ook een minimumleeftijd of vereisen tot een bepaalde leeftijd of lengte begeleiding door een volwassene.',
        },
        {
          question: 'Garandeert de zoeker dat mijn kind mee mag?',
          answer:
            'Nee. De actuele regels, meting en het personeel ter plaatse zijn bepalend. Gezondheid, lichaamsbouw, zwangerschap of technische wijzigingen kunnen extra beperkingen geven.',
        },
        {
          question: 'Wat is Baby-Switch?',
          answer:
            'Bij bepaalde attracties kunnen begeleiders elkaar na elkaar afwisselen. Vraag bij de attractie zelf hoe dit precies wordt uitgevoerd.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Rulantica plannen: hele dag, avondticket of combineren?',
      description:
        'Combineer Rulantica met Europa-Park: interactieve keuzehulp voor dag-, avond- of Moonlight-ticket, kinderen, paklijst en bezoekduur.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Hoe past Rulantica in jouw korte vakantie?',
      answer:
        'Een volledige dag Rulantica is voor gezinnen en waterfans het meest ontspannen. Avond- of Moonlight-tickets passen eerder als aanvulling wanneer leeftijd en energieniveau van de groep dat toelaten.',
      sectionTitle: 'Kies de tickettijd op basis van je doel',
      sectionIntro:
        'De waterwereld is normaal tot in de avond open. De belangrijkste vraag is of Rulantica een hoofddoel is of alleen een extra na het park.',
      points: [
        {
          title: 'Dagticket',
          text: 'Meer tijd voor kinderzones, glijbanen, pauzes en seizoensgebonden buitenzones – vooral met een eigen Rulantica-dag.',
          icon: 'tabler:sun',
        },
        {
          title: 'Avond of Moonlight',
          text: 'Minder tijd en meestal een lagere prijs, maar na een lange parkdag heb je ook minder energie over.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Neem de paklijst serieus',
          text: 'Neem een handdoek en zwemkleding mee en controleer vooraf de actuele regels; daggasten moeten niet rekenen op spontane handdoekverhuur.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Is een avondticket voor Rulantica genoeg?',
          answer:
            'Voor enkele glijbanen of een korte afsluiting kan het genoeg zijn. Gezinnen met jonge kinderen en gasten die veel zones willen beleven, hebben meestal meer aan een hele dag.',
        },
        {
          question: 'Kun je Europa-Park en Rulantica op één dag doen?',
          answer:
            'Technisch gezien wel, maar de combinatie is vermoeiend en vraagt scherpe keuzes. De keuzehulp houdt rekening met parkdagen, kinderen en gewenst tempo.',
        },
        {
          question: 'Kun je handdoeken huren in Rulantica?',
          answer:
            'Volgens de officiële FAQ is er voor daggasten geen reguliere handdoekverhuur. Neem daarom zelf een handdoek mee en controleer de FAQ opnieuw vóór je bezoek.',
        },
      ],
    },
    stayGuide: {
      title: 'Overnachten bij Europa-Park: hotel, Rust of omgeving vergelijken',
      description:
        'Vergelijk overnachten bij Europa-Park: themahotel, pension, vakantiehuis, camping en omgeving op tijdwinst, zelf koken en vervoer.',
      eyebrow: 'Overnachten',
      heading: 'Welke accommodatie past bij jouw bezoekplan?',
      answer:
        'De beste accommodatie hangt niet alleen af van de kamerprijs. Vergelijk vroege toegang, afstanden, vervoer, zelf koken, annulering en de totale kosten voor je groep.',
      sectionTitle: 'Scenario’s in plaats van een willekeurige hotelranglijst',
      sectionIntro:
        'De vergelijking toont accommodatietypen en open controlepunten. We noemen bewust geen onbevestigde prijzen en rangschikken geen afzonderlijke aanbieders.',
      points: [
        {
          title: 'Voordelen van het resort',
          text: 'Officiële themahotels kunnen vroege toegang en een shuttle aanbieden; controleer voor je datum of dit geldt en welke attracties open zijn.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust en zelf koken',
          text: 'Pensions en vakantiehuizen kunnen op loopafstand liggen of een keuken bieden – controleer iedere voorziening bij de concrete aanbieder.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Omgeving en vervoer',
          text: 'Een lagere kamerprijs kan minder voordelig uitvallen door parkeerkosten, de laatste bus en extra reistijd.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Zijn de officiële Europa-Park-hotels altijd de beste keuze?',
          answer:
            'Nee. Ze zijn sterk wanneer resortvoordelen en comfort belangrijk zijn. Voor zelf koken, grotere groepen of een ander budget kan onafhankelijke accommodatie beter passen.',
        },
        {
          question: 'Toont de vergelijking actuele hotelprijzen?',
          answer:
            'Nee. Betrouwbare prijzen vereisen reisdatum, bezetting en boekingsvoorwaarden. In de kostencalculator vul je daarom zelf een gecontroleerde overnachtingsprijs in.',
        },
        {
          question: 'Welke plaatsen naast Rust zijn relevant?',
          answer:
            'Onder meer Ringsheim, Herbolzheim en andere gemeenten in de Erlebnisregion. De concrete verbinding en laatste terugreis op je bezoekdag zijn doorslaggevend.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restaurants in Rust na Europa-Park: gecontroleerde gids',
      description:
        'Vind restaurants in Rust voor ’s avonds: neutrale, op bronnen gecontroleerde vermeldingen met keuken, service-informatie, onzekerheden en directe links naar aanbieders.',
      eyebrow: 'Eten in Rust',
      heading: 'Waar kun je na sluitingstijd eten in Rust?',
      answer:
        'Deze gids is geen ranglijst. Hij toont zaken met een traceerbare primaire bron of gemeentebron en maakt duidelijk welke openingstijden, reserveringen en dieetwensen je nog rechtstreeks moet controleren.',
      sectionTitle: 'Nuttiger dan een ongecontroleerde restaurantranglijst',
      sectionIntro:
        'Openingstijden en sluitingsdagen veranderen. Daarom scheiden we het onderbouwde keukenprofiel, service-informatie en open vragen per vermelding.',
      points: [
        {
          title: 'Bronnen in plaats van sterren',
          text: 'We gebruiken platformbeoordelingen niet als kwaliteitsbewijs, maar linken naar websites van de aanbieder en gemeente.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Avondservice zichtbaar',
          text: 'Een filter gebruikt alleen onderbouwde service-informatie. De werkelijke keukentijden moet je op de bezoekdag nog steeds bevestigen.',
          icon: 'tabler:clock',
        },
        {
          title: 'Geen verzonnen dieetfilters',
          text: 'Veganistisch, glutenvrij of geschikt bij allergieën bieden we pas als er betrouwbare actuele informatie beschikbaar is.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Zijn de restaurants in de gids aanbevelingen?',
          answer:
            'Nee. Een vermelding betekent alleen dat de zaak in een traceerbare bron is gevonden. Smaak, kwaliteit en tafelbeschikbaarheid zijn niet beoordeeld.',
        },
        {
          question: 'Zijn de openingstijden gegarandeerd?',
          answer:
            'Nee. Speciale openstellingen, bedrijfsvakanties en keukentijden kunnen op korte termijn afwijken. Gebruik de link van de aanbieder of bel vóór je bezoek.',
        },
        {
          question: 'Waarom ontbreken afstanden?',
          answer:
            'Een betrouwbare looptijd hangt af van het werkelijke vertrekpunt en de route. We voegen zulke waarden pas toe na een consistente kaart- of controle ter plaatse.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: beschikbaarheid, prijzen en regels',
      description:
        'Begrijp ResortPass Silver en Gold: huidige verkoopstatus, prijzen, bezoekdagen, reserveren, Rulantica en onafhankelijke beschikbaarheidsmelding.',
      eyebrow: 'ResortPass-gids',
      heading: 'Alles wat je moet weten over de Europa-Park ResortPass',
      answer:
        'Silver en Gold zijn momenteel niet regulier verkrijgbaar; er is geen nieuwe verkoopdatum aangekondigd. Silver is goedkoper en gebonden aan vastgestelde bezoekdagen, terwijl Gold flexibeler is en extra Rulantica-voordelen bevat.',
      sectionTitle: 'Kies de jaarpas op basis van je gebruik',
      sectionIntro:
        'Niet alleen de prijs is bepalend. Belangrijker zijn mogelijke bezoekdagen, flexibiliteit, gebruik van Rulantica en of de pas daadwerkelijk beschikbaar is.',
      points: [
        {
          title: 'Beschikbaarheid eerst',
          text: 'De tracker controleert regelmatig de officiële ticketshop en onderscheidt echte koopbaarheid van aankondigingen of wachtrijen.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver of Gold',
          text: 'Silver heeft vastgestelde bezoekdagen; Gold biedt meer flexibiliteit en bevat twee dagtickets voor Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Controleer de regels in het portaal',
          text: 'Reserveringen, uitgesloten dagen en contractdetails kunnen veranderen en moet je vóór aankoop in de officiële bron controleren.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Wanneer zijn ResortPassen weer verkrijgbaar?',
          answer:
            'Er is momenteel geen nieuwe verkoopdatum aangekondigd. De tracker meldt wanneer Silver of Gold in de officiële shop daadwerkelijk weer te koop is.',
        },
        {
          question: 'Wat kost de ResortPass?',
          answer:
            'Volgens de laatst officieel gecontroleerde informatie kost Silver 325 euro voor volwassenen en 275 euro voor kinderen/senioren; Gold kost respectievelijk 495 en 430 euro.',
        },
        {
          question: 'Is de tracker verbonden aan Europa-Park?',
          answer:
            'Nee. Dit is een onafhankelijk communityproject. Aankoop, contract, bindende voorwaarden en inbegrepen voordelen verlopen uitsluitend via de officiële aanbieders.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver of Gold? Vergelijking en keuzehulp',
      description:
        'Vergelijk ResortPass Silver en Gold op prijs, bezoekdagen, flexibiliteit, Rulantica en passende gebruiksscenario’s.',
      eyebrow: 'Silver versus Gold',
      heading: 'Welke ResortPass past bij jouw bezoekpatroon?',
      answer:
        'Silver past beter wanneer de vastgestelde bezoekdagen uitkomen en de lagere prijs belangrijk is. Gold loont eerder bij maximale flexibiliteit en werkelijk gebruik van de inbegrepen Rulantica-dagen.',
      sectionTitle: 'De duurdere pas is niet automatisch beter',
      sectionIntro:
        'Vergelijk je werkelijke bezoekdagen en extra voordelen. Ongebruikte flexibiliteit of Rulantica-tickets leveren geen waarde op.',
      points: [
        {
          title: 'Silver: goedkoper met planning',
          text: 'Geschikt als je vroeg kunt plannen en de gepubliceerde bezoekdagen bij je agenda passen.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: meer flexibiliteit',
          text: 'Geschikt voor vaker spontaan bezoek en gasten die de twee inbegrepen Rulantica-dagtickets echt gebruiken.',
          icon: 'tabler:crown',
        },
        {
          title: 'Vergelijk met dagtickets',
          text: 'Gebruik het verwachte aantal werkelijke bezoeken en vergelijk dit met datumafhankelijke dagticketprijzen.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Heeft Silver uitgesloten dagen?',
          answer:
            'Silver geldt op vooraf vastgestelde openingsdagen. De actuele lijst op de officiële detailpagina en in het ResortPass-portaal is bepalend.',
        },
        {
          question: 'Zijn Rulantica-tickets inbegrepen bij Gold?',
          answer:
            'Volgens de huidige informatie van de exploitant bevat Gold twee Rulantica-dagtickets. Controleer voorwaarden en reservering vóór gebruik nogmaals officieel.',
        },
        {
          question: 'Vanaf hoeveel bezoeken loont een pas?',
          answer:
            'Dat hangt af van de werkelijke bezoekdata, dagticketprijzen en gebruikte extra voordelen. Eén algemeen aantal bezoeken zou misleidend zijn.',
        },
      ],
    },
    resortPassPrices: {
      title: 'ResortPass-prijzen 2026: Silver, Gold en vergelijking met dagtickets',
      description:
        'Actuele ResortPass-prijzen voor volwassenen, kinderen en senioren, vergeleken met datumafhankelijke dagtickets voor Europa-Park.',
      eyebrow: 'Prijzen 2026',
      heading: 'Wat kosten ResortPass Silver en Gold?',
      answer:
        'Laatst officieel gecontroleerd: Silver 325 euro voor volwassenen en 275 euro voor kinderen/senioren; Gold respectievelijk 495 en 430 euro. Beide passen zijn momenteel niet regulier beschikbaar.',
      sectionTitle: 'Beoordeel de prijs altijd samen met het gebruik',
      sectionIntro:
        'Dagtickets hebben datumafhankelijke prijsbandbreedtes. Een jaarpas loont daarom niet vanaf één universeel aantal, maar op basis van jouw werkelijke data.',
      points: [
        {
          title: 'Silver',
          text: '325 euro voor volwassenen; 275 euro voor kinderen van 4–11 jaar en senioren vanaf 60 jaar – let op de datum van de primaire bron.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euro voor volwassenen; 430 euro voor kinderen en senioren, inclusief extra voordelen zoals twee Rulantica-dagen.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Beschikbaarheid is een voorwaarde',
          text: 'Een prijsvergelijking helpt pas als de gewenste pas daadwerkelijk wordt verkocht. Gebruik daarvoor de live status.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Gelden de prijzen voor 2026?',
          answer:
            'De bedragen zijn op de vermelde controledatum overgenomen van de officiële ticketpagina. De exploitant kan prijzen en voorwaarden wijzigen.',
        },
        {
          question: 'Zijn er speciale tarieven?',
          answer:
            'De officiële pagina vermeldt lagere prijzen voor kinderen, senioren en bepaalde rechthebbenden. Bewijsstukken en actuele voorwaarden zijn bindend.',
        },
        {
          question: 'Kan ik de ResortPass nu kopen?',
          answer:
            'Silver en Gold staan momenteel als niet beschikbaar vermeld. De live tracker toont wanneer de werkelijke shopstatus verandert.',
        },
      ],
    },
    resortPassReservation: {
      title: 'ResortPass reserveren: bezoekdagen, portaal en hotelgasten',
      description:
        'Zo werken ResortPass-reserveringen: bezoekdag vastleggen, quota, hotelboeking en actuele regels in het ResortPass-portaal.',
      eyebrow: 'Reserveren',
      heading: 'Moet je jouw bezoek met een ResortPass reserveren?',
      answer:
        'De concrete reservering hangt af van de pas, bezoekdag en eventuele quota. Het ResortPass-portaal en de officiële FAQ zijn bepalend; een hotelboeking vervangt niet in alle gevallen automatisch elke benodigde stap.',
      sectionTitle: 'Controleer drie dingen vóór vertrek',
      sectionIntro:
        'Een geldige pas, een toegestane bezoekdag en een eventueel vereiste reservering zijn afzonderlijke voorwaarden.',
      points: [
        {
          title: 'Open het pasportaal',
          text: 'Controleer daar de geldigheid, vastgelegde bezoekdagen en actuele informatie over quota.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Controleer je hotelboeking',
          text: 'Lees in de actuele FAQ of en hoe bezoekdagen aan jouw concrete resortaccommodatie worden gekoppeld.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Bewaar de bevestiging',
          text: 'Houd je pas en reserveringsbewijs op de bezoekdag klaar in de officiële app of het daarvoor bedoelde formaat.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Heb ik voor ieder bezoek een reservering nodig?',
          answer:
            'Dat is niet algemeen voor alle soorten passen en periodes te beantwoorden. Controleer vóór ieder bezoek de actuele regel in het ResortPass-portaal.',
        },
        {
          question: 'Is een hotelboeking automatisch een parkreservering?',
          answer:
            'De officiële FAQ beschrijft speciale regels voor hotelgasten. Ga niet van een aanname uit, maar controleer je concrete boeking in het portaal.',
        },
        {
          question: 'Wat gebeurt er wanneer het quotum vol is?',
          answer:
            'De actuele regel van de exploitant is bepalend. De beschikbaarheidstracker volgt de verkoop, niet persoonlijke quota voor bezoekdagen in je eigen portaal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass en Rulantica: Gold-voordelen en reserveren',
      description:
        'Welke Rulantica-voordelen bevat ResortPass Gold? Uitleg over twee dagtickets, planning, reservering en het verschil met Silver.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'Wat biedt de ResortPass voor Rulantica?',
      answer:
        'ResortPass Gold bevat volgens de huidige informatie van de exploitant twee Rulantica-dagtickets; Silver niet. Reservering, geldigheid en mogelijke quota moet je vóór je bezoek officieel controleren.',
      sectionTitle: 'Gebruik de twee Rulantica-dagen echt',
      sectionIntro:
        'De waarde ontstaat alleen wanneer de inbegrepen dagen bij je reis passen en je ze op tijd kunt reserveren.',
      points: [
        {
          title: 'Plan het Gold-voordeel',
          text: 'Behandel de twee dagen als een apart onderdeel van je jaarplanning en niet als spontane toevoeging na een parkdag.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Bereken Silver apart',
          text: 'Bij Silver moet je Rulantica-tickets afzonderlijk begroten en op basis van beschikbaarheid boeken.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Controleer het tijdsblok',
          text: 'Een volledige Rulantica-dag is voor gezinnen meestal waardevoller dan een gehaaste overstap na een volle parkdag.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Hoeveel Rulantica-dagen bevat Gold?',
          answer:
            'Volgens de huidige officiële voordelen twee Rulantica-dagtickets. Bij gebruik gelden de actuele voorwaarden van de exploitant.',
        },
        {
          question: 'Is Rulantica inbegrepen bij Silver?',
          answer:
            'Volgens de huidige vergelijking niet als standaard inbegrepen voordeel. Benodigde Rulantica-tickets moet je apart begroten.',
        },
        {
          question: 'Moet je de inbegrepen dagen reserveren?',
          answer:
            'Controleer de actuele reserveringsregel in het ResortPass-portaal. Rulantica heeft beperkte dagquota.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interactieve bezoekplanner',
    title: 'Jouw realistische dagindeling',
    intro:
      'Kies bezoekduur, groep en omstandigheden. Je krijgt een robuuste volgorde – geen schijnnauwkeurig schema per minuut.',
    dateLabel: 'Bezoekdatum',
    daysLabel: 'Geplande parkdagen',
    days: ['1 dag', '2 dagen', '3 dagen'],
    groupLabel: 'Focus',
    groups: {
      balanced: 'Evenwichtig',
      family: 'Gezin en kinderen',
      thrill: 'Achtbanen en actie',
      shows: 'Shows en een rustig tempo',
    },
    arrivalLabel: 'Aankomst',
    arrivals: {
      early: 'Vóór opening aanwezig',
      opening: 'Bij opening',
      late: 'Na 10.30 uur',
    },
    crowdLabel: 'Verwachte drukte',
    crowds: {
      low: 'Eerder rustig',
      medium: 'Gemiddeld',
      high: 'Druk',
    },
    rulanticaLabel: 'Rulantica inplannen',
    submit: 'Plan maken',
    resultTitle: 'Jouw advies',
    resultLead: 'Plan met duidelijke prioriteiten',
    resultDays: 'aanbevolen dagen in totaal',
    routeLabel: 'Dagindeling',
    morning: 'Ochtend',
    midday: 'Middag',
    afternoon: 'Namiddag',
    evening: 'Avond',
    notes: {
      early: 'Sta vóór de officiële opening bij de ingang en bepaal drie hoofddoelen.',
      late: 'Bij een late aankomst is een tweede dag betrouwbaarder dan een overvolle sprint.',
      busy: 'Bij grote drukte: gebruik live wachttijden en houd per gebied alternatieven achter de hand.',
      rulantica: 'Plan Rulantica met jonge kinderen of een sterke waterfocus liever als aparte dag.',
      family: 'Plan vaste eet- en rustblokken en minstens één indooralternatief.',
      thrill: 'Gebruik Single Rider en VirtualLine alleen als ze op de bezoekdag daadwerkelijk beschikbaar zijn.',
      shows: 'Controleer eerst de showtijden en bouw je route rond deze vaste momenten.',
    },
    routes: {
      balanced: [
        'Begin met twee belangrijke attracties en blijf daarbij in één parkgebied.',
        'Eet vroeg of laat en gebruik daarna een indoorattractie of show als rustiger blok.',
        'Werk aangrenzende themagebieden af en vergelijk live wachttijden voordat je wisselt.',
        'Haal een resterende prioriteit in, maak tijd voor souvenirs en controleer of de parkopening wordt verlengd.',
      ],
      family: [
        'Begin met een geschikte familieattractie en controleer vooraf bij de ingang de lichaamslengte.',
        'Plan een vroege pauze, eten en een rustige indoorattractie of show.',
        'Combineer een speelplek en twee andere leeftijdsgeschikte attracties in dezelfde parkhelft.',
        'Laat de energie van de kinderen beslissen; liever één hoogtepunt dan een uitgeputte eindsprint.',
      ],
      thrill: [
        'Geef topachtbanen bij opening voorrang en loop niet voor één attractie kriskras door het park.',
        'Controleer VirtualLine en Single Rider; gebruik de middag voor een alternatief in de buurt.',
        'Kies de tweede achtbaangroep op basis van live wachttijden en houd rekening met technische storingen.',
        'Plan de laatste rit strategisch dicht bij het gebied waar je wilt eindigen.',
      ],
      shows: [
        'Controleer het showprogramma en kies onderweg naar de eerste tijd een rustige attractie.',
        'Combineer vroeg eten met een indoorshow of thema-attractie.',
        'Leg een tweede vast showmoment vast en plan tussendoor alleen attracties in de buurt.',
        'Geniet van sfeer, horeca en een laatste rit zonder onnodig van parkhelft te wisselen.',
      ],
    },
    disclaimer:
      'Planningshulp zonder garantie. Openingstijden, wachttijden, VirtualLine en de beschikbaarheid van attracties kunnen op korte termijn veranderen.',
    forecastCta: 'Drukteverwachting bekijken',
  },
  costCalculator: {
    eyebrow: 'Budgetplanner 2026',
    title: 'Bereken een realistische kostenbandbreedte',
    intro:
      'Officiële ticketbandbreedtes plus jouw aanname voor accommodatie. Eten, vervoer en optionele extra’s vallen bewust buiten het automatische totaal.',
    adults: 'Volwassenen vanaf 12 jaar',
    children: 'Kinderen van 4–11 jaar',
    days: 'Europa-Park',
    oneDay: '1 dag',
    twoDays: '2 dagen',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Niet inplannen',
      day: 'Dagticket',
      evening: 'Avondticket vanaf 17 uur',
      moonlight: 'Moonlight vanaf 19 uur',
    },
    parking: 'Regulier parkeren bij Europa-Park',
    nights: 'Overnachtingen',
    lodgingPerNight: 'Totale accommodatiekosten per nacht',
    calculate: 'Budget bijwerken',
    resultEyebrow: 'Jouw kostenbandbreedte',
    total: 'Geschatte totale kosten',
    rangeConnector: 'tot',
    perPerson: 'per persoon',
    breakdown: 'Verdeling',
    europaParkTickets: 'Europa-Park-tickets',
    rulanticaTickets: 'Rulantica-tickets',
    parkingCost: 'Parkeren',
    lodgingCost: 'Accommodatie',
    variableNote: 'Ticketprijzen hangen af van de datum; de bandbreedte is geen prijsgarantie.',
    assumptionNote: 'Reserveer daarnaast budget voor eten, vervoer en toeslagen.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Gezinszoeker',
    title: 'Filter attracties op leeftijd en lengte',
    intro:
      'De zoeker gebruikt bewust een kleine, officieel geverifieerde selectie. De bindende beslissing ligt altijd bij het personeel ter plaatse.',
    age: 'Leeftijd van het kind',
    height: 'Lichaamslengte',
    interest: 'Interesse',
    interests: {
      all: 'Alle geverifieerde voorbeelden',
      calm: 'Rustig',
      family: 'Familieavontuur',
      thrill: 'Actie',
      indoor: 'Indoor',
    },
    submit: 'Geschikte voorbeelden tonen',
    resultTitle: 'Geverifieerde selectie',
    resultCount: 'attracties getoond',
    eligible: 'Voldoet aan de eisen',
    accompanied: 'Begeleiding door een volwassene nodig',
    notYet: 'Voldoet nog niet aan de eisen',
    minimum: 'Minimum',
    years: 'jaar',
    centimeters: 'cm',
    indoor: 'Indoor',
    source: 'Officiële bron',
    noResults: 'Voor dit filter is nog geen geverifieerde voorbeeldattractie opgenomen.',
    disclaimer:
      'Geen garantie op deelname. Ter plaatse gelden het informatiebord, de meetlat, gezondheids- en veiligheidsregels en de aanwijzingen van het personeel.',
    officialFilter: 'Bekijk alle attracties in het officiële filter',
  },
  rulanticaPlanner: {
    eyebrow: 'Combinatiehulp',
    title: 'Welk Rulantica-ticket past bij jouw reis?',
    intro:
      'De keuzehulp weegt parkdagen, kinderen, waterprioriteit en energieniveau mee. Prijzen en beschikbaarheid controleer je daarna officieel.',
    parkDays: 'Dagen in Europa-Park',
    parkDayOptions: ['1 parkdag', '2 parkdagen', '3 of meer dagen'],
    children: 'Kinderen in de groep',
    childOptions: ['Geen kinderen', 'Kinderen jonger dan 8', 'Oudere kinderen/tieners'],
    waterPriority: 'Belang van Rulantica',
    priorityOptions: ['Alleen proberen', 'Belangrijke aanvulling', 'Hoofddoel'],
    energy: 'Gewenst tempo',
    energyOptions: ['Rustig', 'Evenwichtig', 'Vol programma'],
    submit: 'Tickettype beoordelen',
    resultLabel: 'Planningsadvies',
    recommendations: {
      day: {
        title: 'Een volledige dag Rulantica',
        text: 'Met jonge kinderen of een sterke waterfocus geeft een aparte dag genoeg tijd voor pauzes, omkleden en meerdere zones.',
      },
      evening: {
        title: 'Avondticket als aanvulling',
        text: 'Past bij een normaal tempo en duidelijke selectie – maar plan na Europa-Park een echte pauze en reistijd in.',
      },
      moonlight: {
        title: 'Moonlight als korte afsluiting',
        text: 'Drie uur past eerder bij ervaren, energieke gasten met weinig prioriteiten dan bij een volwaardig eerste bezoek.',
      },
      separate: {
        title: 'Plan Rulantica apart',
        text: 'Bij een rustig tempo of langere reis is een apart tijdsblok betrouwbaarder dan overstappen na een volle parkdag.',
      },
    },
    checklistTitle: 'Vooraf inpakken en controleren',
    checklist: [
      'Eigen handdoek voor daggasten',
      'Zwemkleding en droge kleding om te wisselen',
      'Actuele openings- en onderhoudstijden',
      'Leeftijds- en lengteregels voor gewenste glijbanen',
      'Reservering, ticket en optie voor een kluisje',
    ],
    officialNote:
      'De officiële FAQ blijft bepalend voor toegang, kleding, handdoeken, kinderwagens en kluisjes.',
    officialCta: 'FAQ van Rulantica openen',
  },
  stayComparator: {
    eyebrow: 'Accommodaties vergelijken',
    title: 'Welk type overnachting past bij jouw reis?',
    intro:
      'Vergelijk acht accommodatietypen op onderbouwde kenmerken. De zoeker toont geen ranglijst of ongecontroleerde prijzen, maar helpt je gericht verder te zoeken.',
    filtersLabel: 'Accommodaties filteren',
    scenarioLabel: 'Wat vind je vooral belangrijk?',
    allScenarios: 'Alle reissituaties',
    prioritiesLabel: 'Extra kenmerken',
    priorities: {
      operatorGuestBenefits: 'Voordelen voor resortgasten',
      selfCatering: 'Zelf koken',
      ownSleepingUnitRequired: 'Eigen slaapuitrusting',
      groupFormats: 'Geschikt voor groepen',
      walkingAccess: 'Lopend naar het park',
      shuttleOrTransit: 'Shuttle of openbaar vervoer',
    },
    reset: 'Filters wissen',
    resultsLabel: 'Vergelijkbare accommodatietypen',
    resultSingular: 'accommodatietype',
    resultPlural: 'accommodatietypen',
    operatorRelation: {
      resort_operated: 'Beheerd door Europa-Park Resort',
      independent: 'Onafhankelijke aanbieder',
    },
    states: {
      verified: 'Onderbouwd',
      available_for_this_type: 'Beschikbaar voor dit type',
      not_applicable: 'Niet van toepassing',
      varies_by_property: 'Verschilt per accommodatie',
      must_verify: 'Controleren vóór boeking',
    },
    verifyTitle: 'Controleer dit concreet vóór je boekt',
    source: 'Bron openen',
    checkedAt: 'Gecontroleerd op',
    emptyTitle: 'Geen accommodatietype voldoet aan alle filters',
    emptyText:
      'Verwijder een kenmerk of kies opnieuw alle reissituaties. Een leeg resultaat zegt niets over afzonderlijke aanbieders.',
    priceNoteTitle: 'Waarom hier geen hotelprijzen staan',
    priceNoteText:
      'Accommodatieprijzen veranderen met datum, bezetting, tarief en inbegrepen diensten. Kies eerst het passende type en controleer daarna de eindprijs rechtstreeks bij de aanbieder.',
    notRanking:
      'De volgorde is neutraal en vormt geen kwaliteitsoordeel of betaalde aanbeveling.',
    noJs:
      'Zonder JavaScript blijven alle accommodatietypen en controlelijsten zichtbaar; alleen de interactieve filters ontbreken.',
    scenarioLabels: {
      'operator-benefits-priority': 'Vroege toegang en resortvervoer vooropstellen',
      'park-and-rulantica-without-car': 'Europa-Park en Rulantica combineren zonder eigen auto',
      'own-motorhome-or-caravan': 'Met een eigen camper of caravan reizen',
      'own-tent': 'Overnachten in je eigen tent',
      'large-group-themed-stay': 'Thema-accommodatie voor gezin, vereniging of groep',
      'self-catering-filter': 'Zelf koken als selectiecriterium',
      'walkability-filter': 'Accommodatie filteren op looproute naar de hoofdingang',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park-themahotel',
        definition:
          'Een van de zes door het resort beheerde themahotels met 4 sterren (superior).',
        mustVerify: [
          'voordelen op jouw concrete reisdatum',
          'welke attracties tijdens de vroege toegang daadwerkelijk open zijn',
          'kamerbezetting en toegankelijkheid',
          'of entreetickets bij het gekozen arrangement zijn inbegrepen of apart moeten worden gekocht',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Kameraccommodatie in Silver Lake City met een eigen pakket gastenvoordelen.',
        mustVerify: [
          'actuele dienstregeling van de bus in Rust',
          'voordelen op jouw concrete reisdatum',
          'kamerbezetting en toegankelijkheid',
          'mogelijke geluidsoverlast door evenementen in Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Thema-accommodatie voor groepen en gezinnen in tipi’s, huifkarren, blokhutkamers en Western Houses.',
        mustVerify: [
          'indeling van sanitair en slaapruimte voor de gekozen categorie',
          'of ontbijt verplicht of bij te boeken is',
          'voordelen op jouw concrete reisdatum',
          'mogelijke geluidsoverlast door evenementen',
          'of de lengtes van de stapelbedden geschikt zijn voor de reizigers',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Staanplaatsen in Silver Lake City voor campers en caravans.',
        mustVerify: [
          'afmetingen van het voertuig en passende staanplaatscategorie',
          'voorwaarden voor stroom en water bij de concrete boeking',
          'tijden voor aankomst, nachtrust en vertrek',
          'actuele voordelen en dienstregeling van de bus in Rust',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Kampeerterrein in Silver Lake City voor gasten met een eigen tent.',
        mustVerify: [
          'regels voor tenten en kampeerplaatsen',
          'stroombehoefte en aansluitvoorwaarden',
          'sanitaire voorzieningen en ontbijtopties',
          'weer, rusttijden en actuele gastenvoordelen',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Onafhankelijk hotel of pension in Rust',
        definition:
          'Accommodatie van een onafhankelijke aanbieder binnen de gemeente Rust.',
        mustVerify: [
          'actuele bedrijfs- en boekingsbeschikbaarheid',
          'werkelijke looproute naar de benodigde ingang',
          'ontbijt, parkeren, annuleren en toegankelijkheid',
          'ga niet uit van voordelen van de resorthotels',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Onafhankelijk vakantieappartement in Rust',
        definition:
          'Onafhankelijke accommodatie die de gemeente Rust als vakantieappartement vermeldt.',
        mustVerify: [
          'keuken- en eethoekvoorzieningen in plaats van die uit de categorie af te leiden',
          'werkelijke looproute naar de benodigde ingang',
          'minimumverblijf, eindschoonmaak, parkeren en annuleren',
          'actuele registratie en beschikbaarheid',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Accommodatie in een omliggende gemeente',
        definition:
          'Onafhankelijke accommodatie buiten Rust in een gemeente van de Erlebnisregion Europa-Park.',
        mustVerify: [
          'verbinding op de concrete weekdag en rond sluitingstijd van het park',
          'laatste terugreis en eventuele overstappen',
          'parkeren bij de bestemming en accommodatie',
          'actuele bedrijfs- en boekingsbeschikbaarheid',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Geverifieerde gids',
    title: 'Kleinere restaurants in Rust objectief vergelijken',
    intro:
      'Doorzoek acht redactioneel gecontroleerde vermeldingen. Alleen onderbouwde kenmerken zijn zichtbaar; we doen geen uitspraken over kwaliteit, prijsniveau of tafelbeschikbaarheid.',
    filtersLabel: 'Restaurants filteren',
    searchLabel: 'Naam of adres',
    searchPlaceholder: 'Bijvoorbeeld Adler of Fischerstraße',
    statusLabel: 'Controlestatus',
    allStatuses: 'Alle controlestatussen',
    statuses: {
      first_party_verified: 'Onderbouwd door de aanbieder',
      public_directory_verified: 'Onderbouwd via de gemeentegids',
      license_page_verified: 'Onderbouwd via een licentiepagina',
      needs_reverification: 'Nieuwe controle nodig',
    },
    timeLabel: 'Onderbouwd tijdstip',
    allTimes: 'Alle onderbouwde tijdstippen',
    timeSlots: {
      breakfast: 'Ontbijt',
      evening: 'Avondservice',
    },
    distanceLabel: 'Onderbouwde afstand',
    allDistances: 'Alle onderbouwde afstanden',
    distanceOptions: [
      { maxMetres: 500, label: 'Tot 500 m' },
      { maxMetres: 1000, label: 'Tot 1 km' },
      { maxMetres: 2000, label: 'Tot 2 km' },
    ],
    needsLabel: 'Onderbouwde wensen',
    familyFeatures: {
      kids_menu: 'Kindermenu vermeld',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetarische opties onderbouwd',
      vegan_evidence: 'Veganistische opties onderbouwd',
      gluten_free_evidence: 'Glutenvrije opties onderbouwd',
    },
    reset: 'Filters wissen',
    resultsLabel: 'Gecontroleerde vermeldingen',
    resultSingular: 'restaurant',
    resultPlural: 'restaurants',
    noJs:
      'Zonder JavaScript blijven alle vermeldingen, bronnen en onzekerheden leesbaar; alleen zoeken en filteren ontbreken.',
    emptyTitle: 'Geen vermelding past bij deze filters',
    emptyText:
      'Verwijder een filter. Geen resultaten kan ook betekenen dat het kenmerk nog niet betrouwbaar is onderbouwd.',
    serviceEvidence: 'Onderbouwd aanbod',
    cuisineEvidence: 'Onderbouwd keukenprofiel',
    filterEvidence: 'Bewijs voor filter',
    evidenceCheckedAt: 'Filterbewijs gecontroleerd',
    source: 'Primaire bron',
    operatorWebsite: 'Website van de aanbieder',
    corroboratingSource: 'Aanvullende bron',
    uncertaintyTitle: 'Wat je vóór je bezoek nog moet controleren',
    verificationNote: 'Controlenotitie',
    checkedAt: 'Vermelding gecontroleerd',
    reviewDue: 'Controledatum verstreken',
    notRecommendation: 'Geen aanbeveling',
    notRecommendationTitle: 'Neutrale gids, geen ranglijst',
    notRecommendationText:
      'Opname en volgorde vormen geen kwaliteitsoordeel. Controleer openingstijden, menu, allergenen en reservering rechtstreeks bij het restaurant.',
    unavailableEvidenceTitle: 'Deze filters tonen we bewust niet',
    unavailableEvidence: {
      time: 'Tijdstippen zijn nog niet voldoende consistent onderbouwd.',
      distance: 'Afstanden zijn nog niet met één consistente route gemeten.',
      family: 'Gezinskenmerken zijn nog niet voldoende onderbouwd.',
      diet: 'Vegetarische, veganistische en glutenvrije opties zijn nog niet betrouwbaar genoeg vastgelegd.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['traditionele huiselijke keuken'],
        serviceEvidence: ['avondservice volgens de website van de aanbieder'],
        verificationNote:
          'De website en het colofon van de aanbieder waren bereikbaar; adres, contactgegevens, keukenprofiel en actuele openingsinformatie waren op de controledag zichtbaar.',
        uncertainties: [
          'Speciale openingsdagen en bedrijfsvakanties zijn datumafhankelijk.',
          'De beschikbaarheid voor reserveringen is niet gecontroleerd.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regionale en internationale gerechten',
          'burgers, spareribs, pasta en steak volgens de aanbieder',
        ],
        serviceEvidence: [
          'ontbijt volgens de website van de aanbieder',
          'avondservice volgens de website van de aanbieder',
        ],
        verificationNote:
          'De website van de aanbieder was bereikbaar en vermeldde het adres, keukenprofiel en ontbijtaanbod.',
        uncertainties: [
          'De live openingsstatus op de website kan op korte termijn veranderen.',
          'Zelfpresentatie en ingebedde beoordelingen zijn niet als kwaliteitsbewijs gebruikt.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['Italiaanse keuken'],
        serviceEvidence: ['avondservice volgens de gemeentegids'],
        verificationNote:
          'De website van de aanbieder bevestigt de zaak, het adres en het Italiaanse restaurant; de gemeentegids biedt een actueel algemeen openingskader.',
        uncertainties: [
          'Bevestig de openingstijden vóór je bezoek via de aanbieder of telefonisch.',
          'De door de aanbieder genoemde looptijd naar het park is niet onafhankelijk gemeten.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['Griekse en internationale keuken'],
        serviceEvidence: ['kindermenu volgens de website van de aanbieder'],
        verificationNote:
          'De website van de aanbieder was bereikbaar en bevestigde adres, keukenprofiel en contact voor reserveringen.',
        uncertainties: [
          'De leesbare inhoud van de website vermeldt geen stabiele wekelijkse openingstijden.',
          'De beschikbaarheid van tafels is niet gecontroleerd.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['Badense keuken', 'regionale gerechten'],
        serviceEvidence: ['avondservice volgens de website van de aanbieder'],
        verificationNote:
          'De website van de aanbieder was bereikbaar en vermeldde adres, Badens keukenprofiel en het actuele weekritme.',
        uncertainties: [
          'Controleer bedrijfsvakanties en de wekelijkse sluitingsdag opnieuw vóór je bezoek.',
          'Geen uitspraken over geschiktheid bij allergieën zonder rechtstreeks navragen.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['keukenrichting niet duidelijk vermeld in de primaire bron'],
        serviceEvidence: ['avondservice volgens de website van de aanbieder'],
        verificationNote:
          'De website van de aanbieder en gemeentelijke vermelding bevestigen de zaak, het adres en de contactgegevens. Marketingclaims zijn niet overgenomen.',
        uncertainties: [
          'Controleer vóór redactionele categorisering handmatig de keukenrichting aan de hand van het actuele menu.',
          'De aanbieder vermeldt andere openingstijden dan externe platforms; gebruik uitsluitend informatie van de aanbieder.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['keukenrichting niet vermeld in de gemeentegids'],
        serviceEvidence: ['terras volgens de gemeentegids'],
        verificationNote:
          'Het restaurant staat in de actuele gemeentegids; de gelinkte website beschrijft voornamelijk het pension en bevestigt geen restaurantdetails.',
        uncertainties: [
          'Bevestig bedrijfsstatus, keukenrichting en openingstijden rechtstreeks bij de zaak.',
          'Toon het restaurant niet als redactioneel gecontroleerde optie totdat er een directe bevestiging is.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['keukenrichting niet vermeld in de gemeentegids'],
        serviceEvidence: ['bezorging volgens de gemeentegids'],
        verificationNote:
          'Alleen vindbaar in de gemeentegids; op de controledag is geen betrouwbare eigen website gevonden.',
        uncertainties: [
          'Bevestig bedrijfsstatus, contactgegevens, keukenrichting en openingstijden rechtstreeks.',
          'Neem de zaak niet op in gebruikersaanbevelingen of ranglijsten voordat een directe bron is gecontroleerd.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'ResortPass-keuzehulp',
    title: 'Controleer status, voordelen en werkelijke kosten samen',
    intro:
      'De live status beantwoordt de vraag of je de pas kunt kopen. Daarna helpen de vergelijking en calculator je kiezen tussen dagtickets, Silver en Gold.',
    statusTitle: 'Actuele verkoopstatus',
    statusChecking: 'Status wordt gecontroleerd…',
    statusAvailable: 'Nu officieel beschikbaar',
    statusUnavailable: 'Momenteel niet beschikbaar',
    statusUnknown: 'Status momenteel onduidelijk',
    statusError: 'De live status kon niet worden geladen',
    lastChecked: 'Laatst gecontroleerd',
    comparisonTitle: 'Silver en Gold in één oogopslag',
    feature: 'Kenmerk',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Prijs voor volwassenen',
    concessionPrice: 'Kinderen 4–11 / senioren vanaf 60 jaar',
    visitDays: 'Bezoekdagen',
    visitDaysSilver: 'Vastgestelde, gepubliceerde bezoekdagen',
    visitDaysGold: 'Meer flexibiliteit volgens de actuele voorwaarden',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Niet als standaardvoordeel inbegrepen',
    rulanticaGold: 'Twee dagtickets volgens de actuele voorwaarden',
    flexibility: 'Planningsprofiel',
    flexibilitySilver: 'Voor data die je vroeg kunt plannen',
    flexibilityGold: 'Voor vaker of spontaner bezoek',
    calculatorTitle: 'Eenvoudige kostenvergelijking voor volwassenen',
    calculatorIntro:
      'Vergelijk de laatst onderbouwde pasprijzen met een zelfgekozen aantal dagbezoeken aan Europa-Park en Rulantica.',
    visitsLabel: 'Bezoeken aan Europa-Park',
    rulanticaVisitsLabel: 'Dagbezoeken aan Rulantica',
    priceScenarioLabel: 'Scenario voor dagticketprijzen',
    lowerPriceScenario: 'Onderkant van de onderbouwde prijsbandbreedte',
    upperPriceScenario: 'Bovenkant van de onderbouwde prijsbandbreedte',
    calculate: 'Vergelijking bijwerken',
    dayTicketsCost: 'Losse dagtickets',
    silverCost: 'Silver plus Rulantica-tickets',
    goldCost: 'Gold met twee inbegrepen Rulantica-dagen',
    lowestCost: 'Rekenkundig laagste bedrag',
    estimateDisclaimer:
      'Indicatie voor één volwassene, zonder aankoop- of beschikbaarheidsgarantie. Uitgesloten dagen, reserveringen, kortingen, vervoer en ongebruikte voordelen kunnen de keuze veranderen.',
    linksTitle: 'Beantwoord direct je volgende vraag',
    compareLink: 'Silver en Gold vergelijken',
    pricesLink: 'ResortPass-prijzen bekijken',
    reservationLink: 'Reserveren begrijpen',
    rulanticaLink: 'ResortPass en Rulantica',
  },
};
