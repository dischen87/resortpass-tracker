import type { PlanningLocalePack } from '../planning-types';

export const daPlanning: PlanningLocalePack = {
  common: {
    skip: 'Spring til indholdet',
    menu: 'Menu',
    language: 'Vælg sprog',
    home: 'Forside',
    plannerLabel: 'Planlæg besøget',
    answerLabel: 'Kort svar',
    updatedLabel: 'Kontrolleret',
    sourcePrefix: 'Kilde',
    onThisPage: 'På denne side',
    relatedTitle: 'Relevante næste skridt',
    sourcesTitle: 'Kilder og aktualitet',
    sourcesIntro:
      'Oplysninger, der kan ændre sig, hentes fra parkens og myndighedernes egne kilder. Kontrollér priser, åbningstider og regler igen i den linkede primærkilde, før du booker.',
    correctionLabel: 'Er der noget, der ikke stemmer?',
    correctionText:
      'Fortæl os om forældede oplysninger. Vi skelner tydeligt mellem dokumenterede fakta, beregningsforudsætninger og redaktionelle vurderinger.',
    unofficial: 'Uafhængigt fællesskabsprojekt',
    footerText: 'Uafhængig planlægningshjælp – ikke tilknyttet Europa-Park.',
    overview: 'Oversigt',
    tool: 'Planlægningsværktøj',
    decisions: 'Beslutningshjælp',
    faq: 'Ofte stillede spørgsmål',
    notRecommendation: 'Registerpost, ikke en anbefaling',
    verifyBeforeVisit: 'Kontrollér direkte hos udbyderen før besøget',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 eller 2 dage',
    costCalculator: 'Omkostninger',
    familyGuide: 'Familier',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Overnatning',
    restaurantGuide: 'Spis i Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Planlæg Europa-Park: uafhængig guide med beregnere',
      description:
        'Planlæg dit besøg i Europa-Park i praksis: 1 eller 2 dage, omkostninger, familie, Rulantica, overnatning og restauranter i Rust – med interaktive værktøjer.',
      eyebrow: 'Planlægningscenter for Europa-Park',
      heading: 'Planlæg Europa-Park ud fra dine reelle behov',
      answer:
        'Ved et første besøg er en hel dag et minimum. To dage er som regel mere afslappende, især med børn, shows eller mange besøgende. Tag udgangspunkt i dato, gruppetype og budget frem for en generel top 10-liste.',
      sectionTitle: 'Fra spørgsmål til en realistisk besøgsplan',
      sectionIntro:
        'Værktøjerne kombinerer dine forudsætninger med aktuelle fakta. De erstatter ikke en officiel booking, men hjælper dig med at undgå de vigtigste fejlbeslutninger før rejsen.',
      points: [
        {
          title: 'Fastlæg tiden først',
          text: 'Afgør ud fra ankomst, prioriterede forlystelser og forventet travlhed, om én eller to dage i parken giver mening.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Samlede omkostninger frem for billetpris',
          text: 'Beregn parkbilletter, Rulantica, parkering og overnatning samlet – som et interval, ikke som en misvisende fast pris.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Tilpas ruten til gruppen',
          text: 'Højde, alder, behov for pauser og interesser betyder mere for en god rækkefølge end generelle ranglister.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Hvor mange dage bør man afsætte til Europa-Park?',
          answer:
            'En hel dag kan være nok til udvalgte højdepunkter. To dage er som regel mere realistisk for førstegangsbesøgende, familier, shows og en mindre forhastet tur gennem parken.',
        },
        {
          question: 'Er denne side officiel?',
          answer:
            'Nej. ResortPass Tracker er et uafhængigt fællesskabsprojekt. De officielle oplysninger fra Europa-Park gælder for adgang, sikkerhed og regler på dagen.',
        },
        {
          question: 'Hvorfor viser beregneren prisintervaller?',
          answer:
            'Europa-Park og Rulantica bruger datoafhængige onlinepriser. Et interval er mere retvisende, så længe der ikke er valgt en konkret dato i den officielle billetbutik.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park på 1 eller 2 dage? Interaktiv besøgsplanlægger',
      description:
        'Er én dag i Europa-Park nok? Lav en plan efter besøgsdato, gruppe, ankomst, travlhed og Rulantica – inklusive en dagsrute.',
      eyebrow: '1 eller 2 dage',
      heading: 'Hvor mange dage har du brug for i Europa-Park?',
      answer:
        'Én dag fungerer med tidlig ankomst og tydelige prioriteter. To dage er det mere robuste valg for familier, shows og mange temaområder. Med Rulantica giver to til tre dage som regel bedre mening.',
      sectionTitle: 'Det, der virkelig ændrer besøgets længde',
      sectionIntro:
        'Ikke alle grupper har brug for den samme rute. Planlæg først tidsblokke og prioriteter. De faktiske ventetider afgør først den præcise rækkefølge på besøgsdagen.',
      points: [
        {
          title: 'Én dag: vælg konsekvent',
          text: 'Start ved åbning, prioritér tre til fem hovedmål, og hav alternativer klar i nærliggende temaområder.',
          icon: 'tabler:number-1',
        },
        {
          title: 'To dage: del områderne op',
          text: 'Fordel store forlystelser, familieoplevelser og shows mellem to halvdele af parken, så gangafstande og gentagelser mindskes.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Stor travlhed: byg luft ind',
          text: 'Afsæt tid til mad, tekniske driftsstop og transport gennem parken. Ventetider i realtid hjælper dig med at tilpasse planen på stedet.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Kan man nå Europa-Park på én dag?',
          answer:
            'Man kan nå mange højdepunkter, men sjældent alt. Planlæggeren vurderer ankomst, gruppe og travlhed og anbefaler længere tid under mindre gunstige forhold.',
        },
        {
          question: 'Bør man besøge Rulantica samme dag?',
          answer:
            'En aftenbillet kan passe til vandglade voksne eller større børn. Med små børn, eller hvis vandlandet er højt prioriteret, er en separat dag mere afslappende.',
        },
        {
          question: 'Garanterer ruten korte ventetider?',
          answer:
            'Nej. Vejr, driftsstop og det faktiske besøgstal kan ændre dagsplanen. Tjek den officielle app og ventetiderne i realtid på besøgsdagen.',
        },
      ],
    },
    costCalculator: {
      title: 'Prisberegner til Europa-Park 2026: billetter, parkering og hotel',
      description:
        'Beregn et realistisk prisinterval for Europa-Park med voksne, børn, 1 eller 2 dage, Rulantica, parkering og overnatning.',
      eyebrow: 'Samlede omkostninger',
      heading: 'Hvad koster hele dit besøg i Europa-Park?',
      answer:
        'Entréen er kun en del af budgettet. Beregneren kombinerer datoafhængige billetintervaller med parkering, Rulantica og dit overnatningsbudget og viser bevidst et minimums- og maksimumsbeløb.',
      sectionTitle: 'Sådan bliver priserne til et brugbart budget',
      sectionIntro:
        'Vi bruger officielle prisintervaller, men finder ikke på hotelpriser. Du indtaster selv dine forudsætninger for overnatning, mad og transport.',
      points: [
        {
          title: 'Datoafhængige priser som interval',
          text: 'Uden en konkret billetdato er et interval mere pålideligt end en enkelt lokkepris.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Familiebudget pr. person',
          text: 'Det samlede beløb og prisen pr. person gør det lettere at sammenligne løsninger med 1 og 2 dage.',
          icon: 'tabler:users',
        },
        {
          title: 'Forudsætningerne forbliver synlige',
          text: 'Overnatning og ekstraomkostninger vises separat, så du selv kan erstatte hver enkelt forudsætning.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Er priserne i beregneren garanterede?',
          answer:
            'Nej. Det er officielle prisintervaller med en kontroldato. Tilgængelighed, besøgsdato, ekspeditionsgebyrer og bookingkanal kan ændre slutprisen.',
        },
        {
          question: 'Hvorfor bruges der ikke en gennemsnitlig hotelpris?',
          answer:
            'Priser på overnatning afhænger i høj grad af dato, belægning og afbestillingsvilkår. Derfor indtaster du selv en konkret pris, som du har fundet.',
        },
        {
          question: 'Er mad og transport inkluderet?',
          answer:
            'Ikke automatisk endnu. Disse udgifter varierer meget efter, hvor du rejser fra, og dine vaner og bør lægges til som en personlig buffer.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park med børn: højdefinder og familieplan',
      description:
        'Planlæg Europa-Park med baby, småbørn eller skolebørn: filtrér forlystelser efter alder og højde, se regler om ledsagelse, og planlæg pauser.',
      eyebrow: 'Familier og børn',
      heading: 'Hvilke forlystelser passer til dit barn?',
      answer:
        'Ved forlystelser tæller alder og højde ofte sammen. Brug finderen som en første udvælgelse, og kontrollér altid højdemåleren, skiltene og personalets anvisninger på stedet.',
      sectionTitle: 'En familieplan kræver mere end en liste over forlystelser',
      sectionIntro:
        'Pauser, mad, bleskift, søskende med forskellig højde og mulige regler om ledsagelse bestemmer ruten lige så meget som yndlingsforlystelserne.',
      points: [
        {
          title: 'Kombinér alder og højde',
          text: 'Finderen skelner mellem minimumskrav og mulig voksenledsagelse ud fra forlystelsernes officielle detaljesider.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Planlæg rolige blokke',
          text: 'Indendørs forlystelser, legeområder og shows er gode pauser mellem mere intense oplevelser.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Kontrollér igen på stedet',
          text: 'Sikkerhedsregler kan ændre sig, og de bindende krav vises ved indgangen til den enkelte forlystelse.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Er barnets højde nok i sig selv?',
          answer:
            'Nej. Nogle forlystelser har også en minimumsalder eller kræver voksenledsagelse indtil en bestemt alder eller højde.',
        },
        {
          question: 'Kan finderen garantere, at barnet må prøve forlystelsen?',
          answer:
            'Nej. De aktuelle regler, målingen og personalet på stedet afgør det. Helbred, kropsbygning, graviditet eller tekniske ændringer kan betyde yderligere begrænsninger.',
        },
        {
          question: 'Hvad er Baby-Switch?',
          answer:
            'Ved udvalgte forlystelser kan de voksne skiftes til at prøve, mens den anden passer barnet. Spørg direkte ved forlystelsen, hvordan det konkret foregår.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Planlæg Rulantica: hel dag, aftenbillet eller kombination?',
      description:
        'Kombinér Rulantica med Europa-Park: interaktiv guide til dags-, aften- eller Moonlight-billet, børn, pakkeliste og besøgslængde.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Hvordan passer Rulantica ind i din korte ferie?',
      answer:
        'En hel dag i Rulantica er mest afslappende for familier og fans af vandlande. Aften- eller Moonlight-billetter passer bedre som et supplement, når gruppens alder og energiniveau er til det.',
      sectionTitle: 'Vælg billettid efter formålet',
      sectionIntro:
        'Vandlandet har normalt åbent til om aftenen. Det afgørende er, om Rulantica er et hovedmål eller blot et supplement efter parken.',
      points: [
        {
          title: 'Dagsbillet',
          text: 'Mere tid til børneområder, vandrutsjebaner, pauser og sæsonåbne udendørsområder – især med en separat dag i Rulantica.',
          icon: 'tabler:sun',
        },
        {
          title: 'Aften eller Moonlight',
          text: 'Mindre tid og som regel lavere pris, men også færre kræfter tilbage efter en lang dag i parken.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Tag pakkelisten alvorligt',
          text: 'Tjek håndklæde, badetøj og aktuelle regler på forhånd. Dagsgæster bør ikke regne med spontan udlejning af håndklæder.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Er en aftenbillet nok til Rulantica?',
          answer:
            'Den kan være nok til udvalgte vandrutsjebaner eller en kort afslutning. Familier med små børn og gæster, der vil opleve mange områder, får som regel mere ud af en hel dag.',
        },
        {
          question: 'Kan man nå Europa-Park og Rulantica på samme dag?',
          answer:
            'Teknisk set ja, men kombinationen er anstrengende og kræver hård prioritering. Guiden tager højde for parkdage, børn og ønsket tempo.',
        },
        {
          question: 'Kan man leje håndklæder i Rulantica?',
          answer:
            'Ifølge de officielle ofte stillede spørgsmål er der ingen almindelig udlejning af håndklæder til dagsgæster. Medbring derfor dit eget håndklæde, og tjek oplysningerne igen før besøget.',
        },
      ],
    },
    stayGuide: {
      title: 'Overnatning ved Europa-Park: sammenlign hotel, Rust og omegn',
      description:
        'Sammenlign overnatning ved Europa-Park: temahotel, pensionat, ferielejlighed, camping og omegn efter tidsbesparelse, selvforplejning og transport.',
      eyebrow: 'Overnatning',
      heading: 'Hvilken overnatning passer til din besøgsplan?',
      answer:
        'Den bedste overnatning afhænger ikke kun af værelsesprisen. Sammenlign tidlig adgang, afstande, transport, selvforplejning, afbestilling og omkostningerne for hele gruppen.',
      sectionTitle: 'Scenarier frem for en vilkårlig hotelrangliste',
      sectionIntro:
        'Sammenligningen viser overnatningstyper og åbne kontrolspørgsmål. Den angiver bevidst hverken ubekræftede priser eller en rangordning af enkelte steder.',
      points: [
        {
          title: 'Fordele på resortet',
          text: 'De officielle temahoteller kan tilbyde tidlig adgang og shuttlebus. Kontrollér, hvad der gælder, og hvilke forlystelser der er åbne på din dato.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust og selvforplejning',
          text: 'Pensionater og ferielejligheder kan tilbyde korte afstande eller køkken – kontrollér altid den konkrete indretning hos det valgte sted.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Omegn og transport',
          text: 'En lavere værelsespris kan blive udlignet af parkering, sidste busafgang og ekstra transporttid.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Er Europa-Parks officielle hoteller altid det bedste valg?',
          answer:
            'Nej. De er stærke valg, når resortfordele og komfort er vigtige. Ved selvforplejning, større grupper eller et andet budget kan uafhængige overnatningssteder passe bedre.',
        },
        {
          question: 'Viser sammenligningen aktuelle hotelpriser?',
          answer:
            'Nej. Pålidelige priser kræver rejsedato, belægning og bookingvilkår. Derfor bruger prisberegneren en overnatningspris, som du selv har kontrolleret.',
        },
        {
          question: 'Hvilke byer ud over Rust er relevante?',
          answer:
            'Blandt andet Ringsheim, Herbolzheim og andre kommuner i oplevelsesregionen. Det afgørende er den konkrete forbindelse og den sidste returrejse på besøgsdagen.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restauranter i Rust efter Europa-Park: kontrolleret oversigt',
      description:
        'Find restauranter i Rust til aftenen: neutrale, kildekontrollerede opslag med køkken, serviceoplysninger, usikkerheder og direkte links til udbyderne.',
      eyebrow: 'Spis i Rust',
      heading: 'Hvor kan du spise i Rust, når parken er lukket?',
      answer:
        'Oversigten er ikke en topliste. Den viser steder med en sporbar primær- eller kommunekilde og gør det tydeligt, hvilke åbningstider, reservationer og kostbehov du stadig skal tjekke direkte.',
      sectionTitle: 'Mere nyttigt end en ukontrolleret restaurantrangliste',
      sectionIntro:
        'Åbningstider og lukkedage ændrer sig. Derfor skelner vi for hvert opslag mellem dokumenteret køkkenprofil, serviceoplysninger og åbne spørgsmål.',
      points: [
        {
          title: 'Kilde frem for stjerner',
          text: 'Vi bruger ikke bedømmelser fra platforme som kvalitetsbevis, men linker til stedernes og kommunens egne sider.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Aftenservering er synlig',
          text: 'Et filter bruger kun dokumenterede serviceoplysninger. Køkkenets faktiske åbningstid skal stadig bekræftes på besøgsdagen.',
          icon: 'tabler:clock',
        },
        {
          title: 'Ingen opdigtede kostfiltre',
          text: 'Vegansk, glutenfri eller allergivenlig vises først, når der findes pålidelige og aktuelle oplysninger.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Er restauranterne på listen anbefalinger?',
          answer:
            'Nej. Et opslag betyder kun, at stedet er fundet i en sporbar kilde. Smag, kvalitet og ledige borde er ikke vurderet.',
        },
        {
          question: 'Er åbningstiderne garanterede?',
          answer:
            'Nej. Særlige åbningstider, ferie og køkkentider kan ændre sig med kort varsel. Brug udbyderens link, eller ring før besøget.',
        },
        {
          question: 'Hvorfor mangler der afstande?',
          answer:
            'En pålidelig gåtid afhænger af det præcise startsted og ruten. Sådanne værdier tilføjes først efter en ensartet kontrol med kortdata eller på stedet.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: tilgængelighed, priser og regler',
      description:
        'Forstå ResortPass Silver og Gold: aktuel salgsstatus, priser, besøgsdage, reservation, Rulantica og uafhængig overvågning af tilgængeligheden.',
      eyebrow: 'Guide til ResortPass',
      heading: 'Alt, hvad du skal vide om Europa-Park ResortPass',
      answer:
        'Silver og Gold er i øjeblikket ikke i almindeligt salg, og der er ikke annonceret en ny salgsdato. Silver er billigere og bundet til fastlagte besøgsdage, mens Gold er mere fleksibelt og indeholder ekstra Rulantica-ydelser.',
      sectionTitle: 'Vælg årskort efter, hvordan du bruger det',
      sectionIntro:
        'Prisen alene afgør det ikke. Mulige besøgsdage, fleksibilitet, brug af Rulantica og kortets faktiske tilgængelighed er mere relevante.',
      points: [
        {
          title: 'Tjek tilgængeligheden først',
          text: 'Overvågningen tjekker regelmæssigt den officielle billetbutik og skelner mellem reel købsstatus og meddelelser eller ventekøer.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver eller Gold',
          text: 'Silver har fastlagte besøgsdage. Gold giver større fleksibilitet og inkluderer to dagsbilletter til Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Tjek reglerne i portalen',
          text: 'Reservationer, udelukkede dage og aftalevilkår kan ændre sig og bør kontrolleres i den officielle kilde før køb.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Hvornår kan man købe ResortPass igen?',
          answer:
            'Der er i øjeblikket ikke annonceret en ny salgsdato. Overvågningen giver besked, når den officielle butik rent faktisk viser Silver eller Gold som tilgængelig igen.',
        },
        {
          question: 'Hvad koster ResortPass?',
          answer:
            'Ifølge de senest officielt kontrollerede oplysninger koster Silver 325 euro for voksne og 275 euro for børn/seniorer. Gold koster henholdsvis 495 og 430 euro.',
        },
        {
          question: 'Er overvågningen tilknyttet Europa-Park?',
          answer:
            'Nej. Det er et uafhængigt fællesskabsprojekt. Køb, aftaler og bindende ydelser håndteres udelukkende af de officielle udbydere.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver eller Gold? Sammenligning og beslutningshjælp',
      description:
        'Sammenlign ResortPass Silver og Gold: pris, besøgsdage, fleksibilitet, Rulantica og relevante brugsscenarier.',
      eyebrow: 'Silver mod Gold',
      heading: 'Hvilket ResortPass passer til dit besøgsmønster?',
      answer:
        'Silver passer bedst, hvis de fastlagte besøgsdage fungerer for dig, og den lavere pris er vigtig. Gold betaler sig snarere ved behov for maksimal fleksibilitet og reel brug af de inkluderede Rulantica-dage.',
      sectionTitle: 'Det dyrere kort er ikke automatisk bedre',
      sectionIntro:
        'Sammenlign dine reelle besøgsdage og ekstra ydelser. Ubrugt fleksibilitet eller Rulantica-billetter giver ingen merværdi.',
      points: [
        {
          title: 'Silver: billigere med planlægning',
          text: 'Velegnet, hvis du kan planlægge datoer tidligt, og de offentliggjorte besøgsdage passer til din kalender.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: større fleksibilitet',
          text: 'Velegnet til hyppigere spontane besøg og gæster, der rent faktisk bruger de to inkluderede dagsbilletter til Rulantica.',
          icon: 'tabler:crown',
        },
        {
          title: 'Sammenlign med dagsbilletter',
          text: 'Brug det forventede antal reelle besøg, og sammenlign med datoafhængige priser på dagsbilletter.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Har Silver udelukkede dage?',
          answer:
            'Silver gælder på åbningsdage, der er fastlagt på forhånd. Den aktuelle liste på den officielle detaljeside og i ResortPass-portalen er altid gældende.',
        },
        {
          question: 'Er billetter til Rulantica inkluderet med Gold?',
          answer:
            'Ifølge parkens aktuelle oplysninger inkluderer Gold to dagsbilletter til Rulantica. Kontrollér vilkår og reservation officielt igen før brug.',
        },
        {
          question: 'Efter hvor mange besøg kan et pass betale sig?',
          answer:
            'Det afhænger af de faktiske besøgsdatoer, priserne på dagsbilletter og de ekstra ydelser, du bruger. Et generelt antal besøg ville være misvisende.',
        },
      ],
    },
    resortPassPrices: {
      title: 'Priser på ResortPass 2026: Silver, Gold og sammenligning med dagsbilletter',
      description:
        'Aktuelle priser på ResortPass for voksne, børn og seniorer sammenholdt med Europa-Parks datoafhængige dagsbilletter.',
      eyebrow: 'Priser 2026',
      heading: 'Hvad koster ResortPass Silver og Gold?',
      answer:
        'Senest officielt kontrolleret: Silver 325 euro for voksne og 275 euro for børn/seniorer, Gold henholdsvis 495 og 430 euro. Begge kort er i øjeblikket ikke i almindeligt salg.',
      sectionTitle: 'Vurdér prisen sammen med brugen',
      sectionIntro:
        'Dagsbilletter har datoafhængige prisintervaller. Et årskort betaler sig derfor ikke efter et universelt antal besøg, men ud fra dine faktiske datoer.',
      points: [
        {
          title: 'Silver',
          text: '325 euro for voksne, 275 euro for børn fra 4–11 år og seniorer fra 60 år – vær opmærksom på datoen for primærkilden.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euro for voksne, 430 euro for børn og seniorer, inklusive ekstra ydelser som to dage i Rulantica.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Tilgængelighed er en forudsætning',
          text: 'En prissammenligning hjælper først, når det ønskede pass rent faktisk er til salg. Brug live-statussen til at kontrollere det.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Gælder priserne for 2026?',
          answer:
            'Beløbene blev hentet fra den officielle billetside på den angivne kontroldato. Udbyderen kan ændre priser og vilkår.',
        },
        {
          question: 'Findes der særlige rabatpriser?',
          answer:
            'Den officielle side angiver nedsatte priser for børn, seniorer og bestemte berettigede grupper. Dokumentation og aktuelle vilkår er bindende.',
        },
        {
          question: 'Kan jeg købe ResortPass lige nu?',
          answer:
            'Silver og Gold er i øjeblikket angivet som utilgængelige. Overvågningen viser i realtid, når butikkens faktiske status ændrer sig.',
        },
      ],
    },
    resortPassReservation: {
      title: 'ResortPass-reservation: besøgsdage, portal og hotelgæster',
      description:
        'Sådan fungerer reservationer med ResortPass: registrering af besøgsdag, kapacitet, hotelbooking og aktuelle regler i ResortPass-portalen.',
      eyebrow: 'Reservation',
      heading: 'Skal du reservere dit besøg med ResortPass?',
      answer:
        'Den konkrete reservation afhænger af kortet, besøgsdagen og eventuelle kapacitetsgrænser. ResortPass-portalen og de officielle ofte stillede spørgsmål er gældende. En hotelbooking erstatter ikke nødvendigvis alle andre påkrævede trin.',
      sectionTitle: 'Kontrollér tre ting før afrejse',
      sectionIntro:
        'Et gyldigt kort, en tilladt besøgsdag og en eventuelt påkrævet reservation er tre separate betingelser.',
      points: [
        {
          title: 'Åbn ResortPass-portalen',
          text: 'Kontrollér gyldighed, registrerede besøgsdage og aktuelle oplysninger om kapacitet der.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Afstem hotelbookingen',
          text: 'Læs de aktuelle ofte stillede spørgsmål om, hvorvidt og hvordan besøgsdage knyttes til dit konkrete overnatningssted på resortet.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Gem bekræftelsen',
          text: 'Hav kortet og reservationsbeviset klar i den officielle app eller i det angivne format på besøgsdagen.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Skal jeg reservere hvert besøg?',
          answer:
            'Det kan ikke besvares generelt for alle korttyper og tidsperioder. Kontrollér den aktuelle regel i ResortPass-portalen før hvert besøg.',
        },
        {
          question: 'Er en hotelbooking automatisk en reservation til parken?',
          answer:
            'De officielle ofte stillede spørgsmål beskriver særlige regler for overnattende gæster. Stol ikke på en antagelse, men afstem den konkrete booking i portalen.',
        },
        {
          question: 'Hvad sker der, når dagens kapacitet er opbrugt?',
          answer:
            'Parkens aktuelle regel er gældende. Tilgængelighedsovervågningen følger salget, ikke kapaciteten på enkelte besøgsdage i din personlige portal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass og Rulantica: Gold-ydelser og reservation',
      description:
        'Hvilke Rulantica-ydelser indeholder ResortPass Gold? To dagsbilletter, planlægning, reservation og forskellen fra Silver forklaret.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'Hvad indeholder ResortPass til Rulantica?',
      answer:
        'Ifølge parkens aktuelle oplysninger indeholder ResortPass Gold to dagsbilletter til Rulantica, mens Silver ikke gør. Reservation, gyldighed og eventuelle kapacitetsgrænser skal kontrolleres officielt før besøget.',
      sectionTitle: 'Få de to Rulantica-dage brugt',
      sectionIntro:
        'Ydelsen har kun værdi, hvis de inkluderede dage passer til din rejse og kan reserveres i god tid.',
      points: [
        {
          title: 'Planlæg Gold-ydelsen',
          text: 'Betragt de to dage som en selvstændig del af din årsplan og ikke som et spontant tillæg efter en aften i parken.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Beregn Silver separat',
          text: 'Med Silver skal billetter til Rulantica beregnes separat og bookes efter tilgængelighed.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Kontrollér tidsrummet',
          text: 'En hel dag i Rulantica er som regel mere værdifuld for familier end et forhastet skift efter en hel dag i parken.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Hvor mange Rulantica-dage indeholder Gold?',
          answer:
            'Ifølge det aktuelle officielle omfang to dagsbilletter til Rulantica. Parkens aktuelle vilkår gælder før brug.',
        },
        {
          question: 'Er Rulantica inkluderet med Silver?',
          answer:
            'Ifølge den aktuelle sammenligning er det ikke inkluderet som en standardydelse. Nødvendige billetter til Rulantica bør beregnes separat.',
        },
        {
          question: 'Skal de inkluderede dage reserveres?',
          answer:
            'Kontrollér altid den aktuelle reservationsregel i ResortPass-portalen. Rulantica har begrænset kapacitet pr. dag.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interaktiv besøgsplanlægger',
    title: 'Din realistiske tidsramme for dagen',
    intro:
      'Vælg besøgslængde, gruppe og rammevilkår. Du får en robust rækkefølge – ikke en minutplan med falsk præcision.',
    dateLabel: 'Besøgsdato',
    daysLabel: 'Planlagte parkdage',
    days: ['1 dag', '2 dage', '3 dage'],
    groupLabel: 'Fokus',
    groups: {
      balanced: 'Afbalanceret',
      family: 'Familie og børn',
      thrill: 'Rutsjebaner og fart',
      shows: 'Shows og afslappet tempo',
    },
    arrivalLabel: 'Ankomst',
    arrivals: {
      early: 'På stedet før åbning',
      opening: 'Ved åbning',
      late: 'Efter kl. 10.30',
    },
    crowdLabel: 'Forventet travlhed',
    crowds: {
      low: 'Ret lav',
      medium: 'Middel',
      high: 'Høj',
    },
    rulanticaLabel: 'Planlæg Rulantica',
    submit: 'Opret plan',
    resultTitle: 'Din anbefaling',
    resultLead: 'Planlæg med klare prioriteter',
    resultDays: 'anbefalede dage i alt',
    routeLabel: 'Dagens ramme',
    morning: 'Morgen',
    midday: 'Midt på dagen',
    afternoon: 'Eftermiddag',
    evening: 'Aften',
    notes: {
      early: 'Vær ved indgangen før den officielle åbningstid, og fastlæg tre hovedmål.',
      late: 'Ved sen ankomst er en ekstra dag mere robust end en overfyldt spurt.',
      busy: 'Ved stor travlhed: brug ventetider i realtid, og hav alternativer klar i hvert område.',
      rulantica: 'Med små børn eller højt vandfokus er det bedre at give Rulantica en separat dag.',
      family: 'Planlæg faste spise- og hvilepauser samt mindst ét indendørs alternativ.',
      thrill: 'Brug kun Single Rider og VirtualLine, hvis de rent faktisk tilbydes på besøgsdagen.',
      shows: 'Tjek showtiderne først, og byg ruten op omkring disse faste tidspunkter.',
    },
    routes: {
      balanced: [
        'Start med to vigtige forlystelser, og bliv i samme område af parken.',
        'Spis tidligt eller sent, og brug derefter en indendørs forlystelse eller et show som en roligere blok.',
        'Tag nærliggende temaområder i rækkefølge, og sammenlign ventetider i realtid før et områdeskift.',
        'Nå den sidste prioritet, og tjek souvenirs og en mulig spontan forlængelse af parkens åbningstid.',
      ],
      family: [
        'Start med en passende familieforlystelse, og kontrollér barnets højde ved indgangen på forhånd.',
        'Planlæg en tidlig pause, mad og en rolig indendørs forlystelse eller et show.',
        'Kombinér et legeområde med to andre alderssvarende forlystelser i samme halvdel af parken.',
        'Lad børnenes energi bestemme. Vælg hellere ét højdepunkt end en udmattende slutspurt.',
      ],
      thrill: [
        'Prioritér de vigtigste rutsjebaner ved åbning, og løb ikke på tværs af parken for enkelte ture.',
        'Tjek VirtualLine og Single Rider, og brug tiden omkring frokost på et nærliggende alternativ.',
        'Vælg den næste gruppe rutsjebaner efter ventetiderne i realtid, og tag højde for tekniske driftsstop.',
        'Planlæg den sidste tur strategisk tæt på det område, hvor du vil afslutte dagen.',
      ],
      shows: [
        'Tjek showplanen, og vælg en afslappende forlystelse på vej til det første tidspunkt.',
        'Kombinér et tidligt måltid med et indendørs show eller en temaforlystelse.',
        'Fastlæg et andet showtidspunkt, og planlæg kun nærliggende forlystelser imellem de to shows.',
        'Nyd stemningen, maden og en sidste tur uden unødvendige skift mellem parkens områder.',
      ],
    },
    disclaimer:
      'Planlægningshjælp uden garanti. Åbningstider, ventetider, VirtualLine og forlystelsernes drift kan ændre sig med kort varsel.',
    forecastCta: 'Tjek besøgsprognosen',
  },
  costCalculator: {
    eyebrow: 'Budgetplanlægger 2026',
    title: 'Beregn et realistisk prisinterval',
    intro:
      'Officielle billetintervaller plus din egen forudsætning for overnatning. Mad, transport og valgfrie tilkøb er bevidst ikke med i den automatiske sum.',
    adults: 'Voksne fra 12 år',
    children: 'Børn 4–11 år',
    days: 'Europa-Park',
    oneDay: '1 dag',
    twoDays: '2 dage',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Ikke medregnet',
      day: 'Dagsbillet',
      evening: 'Aftenbillet fra kl. 17',
      moonlight: 'Moonlight fra kl. 19',
    },
    parking: 'Almindelig parkering ved Europa-Park',
    nights: 'Overnatninger',
    lodgingPerNight: 'Samlet overnatningspris pr. nat',
    calculate: 'Opdatér budget',
    resultEyebrow: 'Dit prisinterval',
    total: 'Anslåede samlede omkostninger',
    rangeConnector: 'til',
    perPerson: 'pr. person',
    breakdown: 'Fordeling',
    europaParkTickets: 'Billetter til Europa-Park',
    rulanticaTickets: 'Billetter til Rulantica',
    parkingCost: 'Parkering',
    lodgingCost: 'Overnatning',
    variableNote: 'Billetpriserne er datoafhængige. Intervallet er ikke en prisgaranti.',
    assumptionNote: 'Læg også mad, transport og gebyrer til budgettet.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Familiefinder',
    title: 'Filtrér forlystelser efter alder og højde',
    intro:
      'Finderen bruger et bevidst lille udvalg, som er kontrolleret i officielle kilder. Den bindende afgørelse træffes altid af personalet på stedet.',
    age: 'Barnets alder',
    height: 'Barnets højde',
    interest: 'Interesse',
    interests: {
      all: 'Alle verificerede eksempler',
      calm: 'Rolig',
      family: 'Familieeventyr',
      thrill: 'Fart',
      indoor: 'Indendørs',
    },
    submit: 'Vis passende eksempler',
    resultTitle: 'Verificeret udvalg',
    resultCount: 'forlystelser vist',
    eligible: 'Krav opfyldt',
    accompanied: 'Voksenledsagelse påkrævet',
    notYet: 'Krav ikke opfyldt',
    minimum: 'Minimum',
    years: 'år',
    centimeters: 'cm',
    indoor: 'Indendørs',
    source: 'Officiel kilde',
    noResults: 'Der er endnu ikke gemt en verificeret eksempelforlystelse til dette filter.',
    disclaimer:
      'Ingen garanti for at måtte prøve forlystelsen. På stedet gælder skilte, højdemåler, sundheds- og sikkerhedsregler samt personalets anvisninger.',
    officialFilter: 'Tjek alle forlystelser i det officielle filter',
  },
  rulanticaPlanner: {
    eyebrow: 'Kombinationsguide',
    title: 'Hvilken Rulantica-billet passer til din rejse?',
    intro:
      'Guiden vægter parkdage, børn, hvor vigtigt vandlandet er, og energiniveau. Derefter tjekker du priser og tilgængelighed officielt.',
    parkDays: 'Dage i Europa-Park',
    parkDayOptions: ['1 parkdag', '2 parkdage', '3 eller flere dage'],
    children: 'Børn i gruppen',
    childOptions: ['Ingen børn', 'Børn under 8 år', 'Større børn/unge'],
    waterPriority: 'Rulanticas betydning',
    priorityOptions: ['Bare prøve', 'Vigtigt supplement', 'Hovedmål'],
    energy: 'Ønsket tempo',
    energyOptions: ['Afslappet', 'Afbalanceret', 'Fuldt program'],
    submit: 'Vurdér billettypen',
    resultLabel: 'Planlægningsanbefaling',
    recommendations: {
      day: {
        title: 'En hel dag i Rulantica',
        text: 'Med små børn eller stort vandfokus giver en separat dag tid nok til pauser, omklædning og flere områder.',
      },
      evening: {
        title: 'Aftenbillet som supplement',
        text: 'Passer ved normalt tempo og et tydeligt udvalg, men planlæg en reel pause og transporttid efter Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight som en kort afslutning',
        text: 'Tre timer passer bedre til erfarne, energiske gæster med få prioriteter end til et fuldt førstegangsbesøg.',
      },
      separate: {
        title: 'Planlæg Rulantica separat',
        text: 'Ved et afslappet tempo eller en længere rejse er en separat blok mere robust end at skifte efter en hel dag i parken.',
      },
    },
    checklistTitle: 'Pak og tjek på forhånd',
    checklist: [
      'Eget håndklæde til dagsgæster',
      'Badetøj og tørt skiftetøj',
      'Aktuelle åbnings- og vedligeholdelsestider',
      'Alders- og højderegler for de ønskede vandrutsjebaner',
      'Reservation, billet og mulighed for opbevaringsskab',
    ],
    officialNote:
      'De officielle ofte stillede spørgsmål er altid gældende for adgang, beklædning, håndklæder, barnevogne og opbevaringsskabe.',
    officialCta: 'Åbn Rulanticas ofte stillede spørgsmål',
  },
  stayComparator: {
    eyebrow: 'Sammenlign overnatning',
    title: 'Hvilken overnatningstype passer til din rejse?',
    intro:
      'Sammenlign otte overnatningstyper efter dokumenterede egenskaber. Guiden viser hverken en rangliste eller ukontrollerede priser – den hjælper dig med at afgrænse søgningen.',
    filtersLabel: 'Filtrér overnatningssteder',
    scenarioLabel: 'Hvad er særligt vigtigt for dig?',
    allScenarios: 'Alle rejsesituationer',
    prioritiesLabel: 'Yderligere egenskaber',
    priorities: {
      operatorGuestBenefits: 'Fordele for resortgæster',
      selfCatering: 'Selvforplejning',
      ownSleepingUnitRequired: 'Eget soveudstyr',
      groupFormats: 'Egnet til grupper',
      walkingAccess: 'Til fods til parken',
      shuttleOrTransit: 'Shuttlebus eller offentlig transport',
    },
    reset: 'Nulstil filtre',
    resultsLabel: 'Sammenlignelige overnatningstyper',
    resultSingular: 'overnatningstype',
    resultPlural: 'overnatningstyper',
    operatorRelation: {
      resort_operated: 'Drevet af Europa-Park Resort',
      independent: 'Uafhængig virksomhed',
    },
    states: {
      verified: 'Dokumenteret',
      available_for_this_type: 'Tilgængeligt for denne type',
      not_applicable: 'Ikke relevant',
      varies_by_property: 'Varierer fra sted til sted',
      must_verify: 'Kontrollér før booking',
    },
    verifyTitle: 'Kontrollér konkret før booking',
    source: 'Åbn kilde',
    checkedAt: 'Kontrolleret den',
    emptyTitle: 'Ingen overnatningstype passer til alle filtre',
    emptyText:
      'Fjern en egenskab, eller vælg alle rejsesituationer igen. Et tomt resultat siger ikke noget om enkelte overnatningssteder.',
    priceNoteTitle: 'Derfor vises der ingen hotelpriser her',
    priceNoteText:
      'Priser på overnatning varierer efter dato, belægning, prisvilkår og indhold. Sammenlign først en passende type, og kontrollér derefter slutprisen direkte hos udbyderen.',
    notRanking:
      'Rækkefølgen er neutral. Den er hverken en kvalitetsvurdering eller en betalt anbefaling.',
    noJs:
      'Uden JavaScript kan alle overnatningstyper og kontrollister stadig læses. Det er kun de interaktive filtre, der mangler.',
    scenarioLabels: {
      'operator-benefits-priority': 'Prioritér tidlig adgang og resorttransport',
      'park-and-rulantica-without-car':
        'Kombinér Europa-Park og Rulantica uden egen bil',
      'own-motorhome-or-caravan': 'Rejs med egen autocamper eller campingvogn',
      'own-tent': 'Overnat i eget telt',
      'large-group-themed-stay':
        'Tematiseret overnatning for familie, forening eller gruppe',
      'self-catering-filter': 'Selvforplejning som udvælgelseskriterium',
      'walkability-filter':
        'Filtrér overnatningssteder efter gåafstand til hovedindgangen',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park temahotel',
        definition:
          'Et af de seks 4-stjernede (Superior)-oplevelseshoteller, som drives af resortet.',
        mustVerify: [
          'fordele på den konkrete rejsedato',
          'hvilke forlystelser der rent faktisk er åbne ved tidlig adgang',
          'værelsesbelægning og tilgængelighed',
          'om entrébilletter er inkluderet i den valgte pakke eller købes separat',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Overnatning på værelse i Silver Lake City med sin egen profil af gæstefordele.',
        mustVerify: [
          'aktuel køreplan for Rust-bussen',
          'fordele på den konkrete rejsedato',
          'værelsesbelægning og tilgængelighed',
          'mulige perioder med støj fra arrangementer i Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Tematiserede gruppe- og familieovernatninger i tipier, prærievogne, bjælkehytteværelser og Western Houses.',
        mustVerify: [
          'indretningen af sanitets- og soverum i den valgte kategori',
          'om morgenmad er obligatorisk eller kan tilkøbes',
          'fordele på den konkrete rejsedato',
          'mulige perioder med støj fra arrangementer',
          'om køjesengenes længde passer til de rejsende',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Standpladser i Silver Lake City til autocampere og campingvogne.',
        mustVerify: [
          'køretøjets mål og en passende standpladskategori',
          'vilkår for strøm og vand i den konkrete booking',
          'tider for ankomst, nattero og afrejse',
          'aktuelle fordele og køreplanen for Rust-bussen',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Teltplads i Silver Lake City til gæster med eget telt.',
        mustVerify: [
          'regler for telt og teltplads',
          'strømbehov og tilslutningsvilkår',
          'muligheder for sanitære faciliteter og morgenmad',
          'vejr, nattero og aktuelle gæstefordele',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Uafhængigt hotel eller pensionat i Rust',
        definition:
          'Overnatning drevet af en uafhængig virksomhed i Rust kommune.',
        mustVerify: [
          'aktuel drifts- og bookingtilgængelighed',
          'den faktiske gårute til den indgang, der skal bruges',
          'morgenmad, parkering, afbestilling og tilgængelighed',
          'gå ikke ud fra, at resortets hotelfordele er inkluderet',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Uafhængig ferielejlighed i Rust',
        definition:
          'Uafhængig overnatning, som Rust kommune opfører som ferielejlighed.',
        mustVerify: [
          'udstyr i køkken og spiseområde frem for at udlede det af kategorien',
          'den faktiske gårute til den indgang, der skal bruges',
          'minimumsophold, slutrengøring, parkering og afbestilling',
          'aktuel registrering og tilgængelighed',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Overnatning i en nabokommune',
        definition:
          'Uafhængig overnatning uden for Rust i en kommune i Erlebnisregion Europa-Park.',
        mustVerify: [
          'forbindelsen på den konkrete ugedag og ved parkens lukketid',
          'sidste returforbindelse og eventuelle skift',
          'parkering ved destinationen og overnatningsstedet',
          'aktuel drifts- og bookingtilgængelighed',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Verificeret register',
    title: 'Sammenlign mindre restauranter i Rust på et sagligt grundlag',
    intro:
      'Søg blandt otte redaktionelt kontrollerede registeropslag. Kun dokumenterede egenskaber vises. Vi fremsætter ingen påstande om kvalitet, prisniveau eller ledige borde.',
    filtersLabel: 'Filtrér restauranter',
    searchLabel: 'Navn eller adresse',
    searchPlaceholder: 'For eksempel Adler eller Fischerstraße',
    statusLabel: 'Kontrolstatus',
    allStatuses: 'Alle kontrolstatusser',
    statuses: {
      first_party_verified: 'Dokumenteret med udbyderens egen kilde',
      public_directory_verified: 'Dokumenteret i kommunens register',
      license_page_verified: 'Dokumenteret via en bevillingsside',
      needs_reverification: 'Skal kontrolleres igen',
    },
    timeLabel: 'Dokumenteret tidsrum',
    allTimes: 'Alle dokumenterede tidsrum',
    timeSlots: {
      breakfast: 'Morgenmad',
      evening: 'Aftenservering',
    },
    distanceLabel: 'Dokumenteret afstand',
    allDistances: 'Alle dokumenterede afstande',
    distanceOptions: [
      { maxMetres: 500, label: 'Op til 500 m' },
      { maxMetres: 1000, label: 'Op til 1 km' },
      { maxMetres: 2000, label: 'Op til 2 km' },
    ],
    needsLabel: 'Dokumenterede behov',
    familyFeatures: {
      kids_menu: 'Børnemenu nævnt',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetariske muligheder dokumenteret',
      vegan_evidence: 'Veganske muligheder dokumenteret',
      gluten_free_evidence: 'Glutenfri muligheder dokumenteret',
    },
    reset: 'Nulstil filtre',
    resultsLabel: 'Kontrollerede registeropslag',
    resultSingular: 'restaurant',
    resultPlural: 'restauranter',
    noJs:
      'Uden JavaScript kan alle opslag, kilder og usikkerheder stadig læses. Det er kun søgningen og filtrene, der mangler.',
    emptyTitle: 'Intet opslag passer til disse filtre',
    emptyText:
      'Fjern et filter. Manglende resultater kan også betyde, at egenskaben endnu ikke er tilstrækkeligt dokumenteret.',
    serviceEvidence: 'Dokumenteret tilbud',
    cuisineEvidence: 'Dokumenteret køkkenprofil',
    filterEvidence: 'Dokumentation for filter',
    evidenceCheckedAt: 'Filterdokumentation kontrolleret',
    source: 'Primærkilde',
    operatorWebsite: 'Udbyderens hjemmeside',
    corroboratingSource: 'Supplerende kilde',
    uncertaintyTitle: 'Det skal stadig afklares før besøget',
    verificationNote: 'Kontrolnotat',
    checkedAt: 'Opslag kontrolleret',
    reviewDue: 'Fristen for ny kontrol er overskredet',
    notRecommendation: 'Ingen anbefaling',
    notRecommendationTitle: 'Neutralt register, ingen topliste',
    notRecommendationText:
      'Optagelse og rækkefølge er ikke en kvalitetsvurdering. Kontrollér åbningstider, menukort, allergener og reservation direkte hos restauranten.',
    unavailableEvidenceTitle: 'Disse filtre viser vi bevidst ikke',
    unavailableEvidence: {
      time: 'Tidsrummene er endnu ikke tilstrækkeligt ensartet dokumenteret.',
      distance: 'Afstandene er endnu ikke målt langs en ensartet rute.',
      family: 'Familieegenskaberne er endnu ikke tilstrækkeligt dokumenteret.',
      diet: 'Vegetariske, veganske og glutenfri muligheder er endnu ikke registreret pålideligt nok.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['traditionel husmandskost'],
        serviceEvidence: ['aftenservering ifølge udbyderens hjemmeside'],
        verificationNote:
          'Udbyderens hjemmeside og juridiske oplysninger var tilgængelige. Adresse, kontakt, køkkenprofil og aktuelle åbningstidsoplysninger blev vist på kontroldagen.',
        uncertainties: [
          'Særlige åbningstider og ferielukning varierer over tid.',
          'Muligheden for at reservere bord er ikke kontrolleret.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regionale og internationale retter',
          'burgere, spareribs, pasta og bøf ifølge udbyderen',
        ],
        serviceEvidence: [
          'morgenmad ifølge udbyderens hjemmeside',
          'aftenservering ifølge udbyderens hjemmeside',
        ],
        verificationNote:
          'Udbyderens hjemmeside var tilgængelig og angav adresse, madprofil og morgenmadstilbud.',
        uncertainties: [
          'Hjemmesidens aktuelle oplysninger om åbent eller lukket kan ændre sig med kort varsel.',
          'Udbyderens egen præsentation og indlejrede anmeldelser blev ikke brugt som dokumentation for kvalitet.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['italiensk køkken'],
        serviceEvidence: ['aftenservering ifølge kommunens register'],
        verificationNote:
          'Udbyderens hjemmeside bekræfter virksomheden, adressen og den italienske restaurant. Kommunens register angiver et aktuelt tidsrum for åbning.',
        uncertainties: [
          'Bekræft åbningstiderne på udbyderens hjemmeside eller pr. telefon før besøget.',
          'Den gåtid til parken, som udbyderen angiver, er ikke målt uafhængigt.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['græsk og internationalt køkken'],
        serviceEvidence: ['børnemenu ifølge udbyderens hjemmeside'],
        verificationNote:
          'Udbyderens hjemmeside var tilgængelig og bekræftede adresse, køkkenprofil og kontaktvej til reservation.',
        uncertainties: [
          'Det læsbare indhold på hjemmesiden angiver ingen stabile ugentlige åbningstider.',
          'Muligheden for at få et bord er ikke kontrolleret.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['mad fra Baden', 'regionale retter'],
        serviceEvidence: ['aftenservering ifølge udbyderens hjemmeside'],
        verificationNote:
          'Udbyderens hjemmeside var tilgængelig og angav adresse, en køkkenprofil fra Baden og den aktuelle ugeplan.',
        uncertainties: [
          'Kontrollér ferielukning og ugentlig lukkedag igen før besøget.',
          'Der fremsættes ingen påstande om egnethed ved allergier uden en direkte forespørgsel.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: [
          'køkkenretningen fremgår ikke tydeligt af primærkilden',
        ],
        serviceEvidence: ['aftenservering ifølge udbyderens hjemmeside'],
        verificationNote:
          'Udbyderens hjemmeside og kommunens opslag bekræfter virksomhed, adresse og kontakt. Markedsføringspåstande er ikke medtaget.',
        uncertainties: [
          'Kontrollér det aktuelle menukort manuelt, før restauranten kategoriseres redaktionelt efter køkkenretning.',
          'Udbyderens hjemmeside angiver andre åbningstider end tredjepartsplatforme. Brug kun udbyderens oplysninger.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: [
          'køkkenretningen fremgår ikke af kommunens registeropslag',
        ],
        serviceEvidence: ['terrasse ifølge kommunens register'],
        verificationNote:
          'Restauranten står i kommunens aktuelle register. Den linkede hjemmeside beskriver primært pensionatet og bekræfter ingen restaurantoplysninger.',
        uncertainties: [
          'Bekræft driftsstatus, køkkenretning og åbningstider direkte hos virksomheden.',
          'Fremhæv ikke stedet som en redaktionelt kontrolleret restaurantmulighed, før det er blevet bekræftet direkte.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: [
          'køkkenretningen fremgår ikke af kommunens registeropslag',
        ],
        serviceEvidence: ['levering ifølge kommunens register'],
        verificationNote:
          'Restauranten kunne kun findes i kommunens register. Der blev ikke fundet en pålidelig egen hjemmeside på kontroldagen.',
        uncertainties: [
          'Bekræft driftsstatus, kontakt, køkkenretning og åbningstider direkte.',
          'Medtag ikke stedet i anbefalinger eller ranglister til brugerne, før der er gennemført en kontrol med en førstehåndskilde.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'Beslutningshjælp til ResortPass',
    title: 'Kontrollér status, ydelser og reelle omkostninger samlet',
    intro:
      'Live-statussen besvarer spørgsmålet om køb. Sammenligningen og beregneren hjælper dig derefter med at vælge mellem dagsbilletter, Silver og Gold.',
    statusTitle: 'Aktuel salgsstatus',
    statusChecking: 'Status kontrolleres …',
    statusAvailable: 'Nu officielt tilgængeligt',
    statusUnavailable: 'Ikke tilgængeligt i øjeblikket',
    statusUnknown: 'Status er uklar i øjeblikket',
    statusError: 'Live-status kunne ikke hentes',
    lastChecked: 'Senest kontrolleret',
    comparisonTitle: 'Silver og Gold i korte træk',
    feature: 'Egenskab',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Pris for voksne',
    concessionPrice: 'Børn 4–11 år / seniorer fra 60 år',
    visitDays: 'Besøgsdage',
    visitDaysSilver: 'Fastlagte, offentliggjorte besøgsdage',
    visitDaysGold: 'Større fleksibilitet efter de aktuelle vilkår',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Ikke inkluderet som standardydelse',
    rulanticaGold: 'To dagsbilletter efter de aktuelle vilkår',
    flexibility: 'Planlægningsprofil',
    flexibilitySilver: 'Til datoer, der kan planlægges tidligt',
    flexibilityGold: 'Til hyppigere eller mere spontane besøg',
    calculatorTitle: 'Enkel omkostningssammenligning for voksne',
    calculatorIntro:
      'Sammenlign de senest dokumenterede priser på kortene med et selvvalgt antal dagsbesøg i Europa-Park og Rulantica.',
    visitsLabel: 'Besøg i Europa-Park',
    rulanticaVisitsLabel: 'Dagsbesøg i Rulantica',
    priceScenarioLabel: 'Prisscenario for dagsbillet',
    lowerPriceScenario: 'Nedre dokumenterede prisinterval',
    upperPriceScenario: 'Øvre dokumenterede prisinterval',
    calculate: 'Opdatér sammenligning',
    dayTicketsCost: 'Enkelte dagsbilletter',
    silverCost: 'Silver plus billetter til Rulantica',
    goldCost: 'Gold med to inkluderede Rulantica-dage',
    lowestCost: 'Laveste beregnede beløb',
    estimateDisclaimer:
      'Vejledning for én voksen person, ingen købs- eller tilgængelighedsgaranti. Udelukkede dage, reservationer, rabatter, transport og ubrugte ydelser kan ændre beslutningen.',
    linksTitle: 'Afklar det næste spørgsmål direkte',
    compareLink: 'Sammenlign Silver og Gold',
    pricesLink: 'Kontrollér priser på ResortPass',
    reservationLink: 'Forstå reservationen',
    rulanticaLink: 'ResortPass og Rulantica',
  },
};
