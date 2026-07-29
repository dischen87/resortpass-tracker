import type { PlanningLocalePack } from '../planning-types';

export const svPlanning: PlanningLocalePack = {
  common: {
    skip: 'Hoppa till innehållet',
    menu: 'Meny',
    language: 'Välj språk',
    home: 'Startsida',
    plannerLabel: 'Planera besöket',
    answerLabel: 'Kort svar',
    updatedLabel: 'Kontrollerad',
    sourcePrefix: 'Källa',
    onThisPage: 'På den här sidan',
    relatedTitle: 'Nästa steg i planeringen',
    sourcesTitle: 'Källor och aktualitet',
    sourcesIntro:
      'Uppgifter som kan ändras hämtas från parkens och myndigheters egna källor. Kontrollera priser, öppettider och regler en gång till i den länkade primärkällan innan du bokar.',
    correctionLabel: 'Har något blivit fel?',
    correctionText:
      'Meddela oss om du hittar inaktuella uppgifter. Vi skiljer tydligt mellan belagda fakta, beräkningsantaganden och redaktionella bedömningar.',
    unofficial: 'Oberoende communityprojekt',
    footerText: 'Oberoende planeringshjälp – utan koppling till Europa-Park.',
    overview: 'Översikt',
    tool: 'Planeringsverktyg',
    decisions: 'Beslutsstöd',
    faq: 'Vanliga frågor',
    notRecommendation: 'Katalogpost, ingen rekommendation',
    verifyBeforeVisit: 'Kontrollera direkt med aktören före besöket',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 eller 2 dagar',
    costCalculator: 'Kostnader',
    familyGuide: 'Familjer',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Boende',
    restaurantGuide: 'Äta i Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Planera Europa-Park: oberoende guide med kalkylatorer',
      description:
        'Planera ditt besök på Europa-Park i praktiken: 1 eller 2 dagar, kostnader, barnfamilj, Rulantica, boende och restauranger i Rust – med interaktiva hjälpmedel.',
      eyebrow: 'Planeringsnav för Europa-Park',
      heading: 'Planera Europa-Park utifrån det som faktiskt är viktigt för dig',
      answer:
        'Vid ett första besök är en hel dag ett minimum. Två dagar blir oftast lugnare, särskilt med barn, shower eller mycket folk. Utgå från datum, grupp och budget i stället för en allmän topp 10-lista.',
      sectionTitle: 'Från fråga till en realistisk besöksplan',
      sectionIntro:
        'Verktygen kombinerar dina förutsättningar med aktuella fakta. De ersätter inte en officiell bokning, men hjälper dig att undvika de viktigaste felbesluten före resan.',
      points: [
        {
          title: 'Bestäm tiden först',
          text: 'Avgör om en eller två dagar i parken är rimligt utifrån ankomsttid, prioriterade attraktioner och förväntad trängsel.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Räkna hela kostnaden, inte bara biljetten',
          text: 'Räkna ihop parkbiljetter, Rulantica, parkering och boende som ett intervall – inte som ett missvisande fast pris.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Anpassa rutten till gruppen',
          text: 'Längd, ålder, behov av pauser och intressen påverkar en bra ordning mer än generella rankningar.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Hur många dagar bör man planera för Europa-Park?',
          answer:
            'En hel dag kan räcka till utvalda höjdpunkter. Två dagar är oftast mer realistiskt för förstagångsbesökare, familjer, shower och ett mindre stressigt tempo.',
        },
        {
          question: 'Är den här webbplatsen officiell?',
          answer:
            'Nej. ResortPass Tracker är ett oberoende communityprojekt. För inträde, säkerhet och dagsaktuella regler gäller den officiella informationen från Europa-Park.',
        },
        {
          question: 'Varför visar kalkylatorn prisintervall?',
          answer:
            'Europa-Park och Rulantica har datumstyrda onlinepriser. Ett intervall är mer rättvisande så länge inget exakt datum har valts i den officiella biljettbutiken.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park på 1 eller 2 dagar? Interaktiv besöksplanerare',
      description:
        'Räcker en dag på Europa-Park? Skapa en plan efter besöksdatum, grupp, ankomst, trängsel och Rulantica – inklusive en dagsrutt.',
      eyebrow: '1 eller 2 dagar',
      heading: 'Hur många dagar behöver du på Europa-Park?',
      answer:
        'En dag fungerar med tidig ankomst och tydliga prioriteringar. Två dagar är det säkrare valet för familjer, shower och många temaområden. Med Rulantica är två till tre dagar oftast mer rimligt.',
      sectionTitle: 'Det här påverkar besökets längd på riktigt',
      sectionIntro:
        'Alla grupper behöver inte samma rutt. Planera först tidsblock och prioriteringar. De faktiska köerna avgör finplaneringen först på besöksdagen.',
      points: [
        {
          title: 'En dag: välj konsekvent',
          text: 'Var på plats när parken öppnar, prioritera tre till fem huvudmål och ha alternativ redo i närliggande temaområden.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Två dagar: dela upp områdena',
          text: 'Fördela stora attraktioner, familjeutbud och shower mellan två parkhalvor för att minska gångsträckor och onödiga omvägar.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Mycket folk: bygg in marginal',
          text: 'Avsätt tid för mat, tekniska stopp och förflyttningar. Köinformation i realtid hjälper dig att anpassa planen på plats.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Hinner man med Europa-Park på en dag?',
          answer:
            'Du kan hinna många höjdpunkter, men sällan allt. Planeraren väger in ankomst, grupp och trängsel och rekommenderar längre tid när förutsättningarna är sämre.',
        },
        {
          question: 'Ska man besöka Rulantica samma dag?',
          answer:
            'En kvällsbiljett kan passa vuxna eller äldre barn som älskar vatten. Med små barn eller när vattenvärlden är en huvudprioritet blir en egen dag lugnare.',
        },
        {
          question: 'Garanterar rutten korta köer?',
          answer:
            'Nej. Väder, driftstopp och det faktiska besökartrycket kan ändra dagsplanen. Kontrollera den officiella appen och köerna i realtid under besöket.',
        },
      ],
    },
    costCalculator: {
      title: 'Kostnadskalkylator för Europa-Park 2026: biljetter, parkering och hotell',
      description:
        'Beräkna ett realistiskt kostnadsintervall för Europa-Park med vuxna, barn, 1 eller 2 dagar, Rulantica, parkering och boende.',
      eyebrow: 'Total kostnad',
      heading: 'Vad kostar hela ditt besök på Europa-Park?',
      answer:
        'Inträdet är bara en del av budgeten. Kalkylatorn kombinerar datumstyrda biljettintervall med parkering, Rulantica och din boendebudget och visar medvetet ett lägsta och ett högsta belopp.',
      sectionTitle: 'Så blir priserna en användbar budget',
      sectionIntro:
        'Vi använder officiella prisintervall, men hittar inte på hotellpriser. Du anger själv dina antaganden för boende, mat och resa.',
      points: [
        {
          title: 'Datumstyrda priser som intervall',
          text: 'Utan ett exakt biljettdatum är ett intervall mer tillförlitligt än ett enskilt lockpris.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Familjebudget per person',
          text: 'Totalsumman och beloppet per person gör det lättare att jämföra alternativ med 1 respektive 2 dagar.',
          icon: 'tabler:users',
        },
        {
          title: 'Antagandena är synliga',
          text: 'Boende och kringkostnader redovisas separat så att du själv kan byta ut varje antagande.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Är priserna i kalkylatorn garanterade?',
          answer:
            'Nej. Det är officiella prisintervall med ett angivet kontrolldatum. Tillgänglighet, besöksdatum, hanteringsavgifter och bokningskanal kan påverka slutpriset.',
        },
        {
          question: 'Varför används inget genomsnittligt hotellpris?',
          answer:
            'Boendepriser varierar kraftigt med datum, beläggning och avbokningsvillkor. Därför anger du själv ett verkligt pris som du har hittat.',
        },
        {
          question: 'Ingår mat och resa?',
          answer:
            'Inte automatiskt ännu. Dessa kostnader varierar mycket beroende på varifrån du reser och dina vanor och bör läggas till som en personlig marginal.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park med barn: längdguide och familjeplan',
      description:
        'Planera Europa-Park med bebis, småbarn eller skolbarn: filtrera attraktioner efter ålder och längd, se regler om vuxet sällskap och planera pauser.',
      eyebrow: 'Familjer och barn',
      heading: 'Vilka attraktioner passar ditt barn?',
      answer:
        'För åkattraktioner räknas ofta både ålder och längd. Använd guiden som ett första urval och kontrollera alltid mätstickan, skyltarna och personalens instruktioner på plats.',
      sectionTitle: 'En familjeplan behöver mer än en lista över åkattraktioner',
      sectionIntro:
        'Pauser, mat, blöjbyten, syskon med olika längd och eventuella regler om vuxet sällskap påverkar rutten lika mycket som favoritattraktionerna.',
      points: [
        {
          title: 'Kombinera ålder och längd',
          text: 'Guiden skiljer mellan minimikrav och eventuellt krav på vuxet sällskap utifrån attraktionernas officiella detaljsidor.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Planera lugna block',
          text: 'Inomhusattraktioner, lekområden och shower fungerar bra som återhämtning mellan mer intensiva upplevelser.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Kontrollera igen på plats',
          text: 'Säkerhetsregler kan ändras och de bindande kraven visas vid ingången till respektive attraktion.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Räcker barnets längd som enda kriterium?',
          answer:
            'Nej. Vissa attraktioner har även en minimiålder eller kräver vuxet sällskap upp till en viss ålder eller längd.',
        },
        {
          question: 'Kan guiden garantera att barnet får åka?',
          answer:
            'Nej. Aktuella regler, mätningen och personalen på plats avgör. Hälsa, kroppsbyggnad, graviditet eller tekniska förändringar kan innebära ytterligare begränsningar.',
        },
        {
          question: 'Vad är Baby-Switch?',
          answer:
            'Vid utvalda attraktioner kan medföljande vuxna turas om att åka medan den andra tar hand om barnet. Fråga direkt vid attraktionen hur det fungerar i praktiken.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Planera Rulantica: heldag, kvällsbiljett eller kombination?',
      description:
        'Kombinera Rulantica med Europa-Park: interaktiv guide för dags-, kvälls- eller Moonlight-biljett, barn, packlista och besökslängd.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Hur passar Rulantica in i din kortsemester?',
      answer:
        'En hel dag på Rulantica är lugnast för familjer och vattenparksentusiaster. Kvälls- eller Moonlight-biljetter passar bättre som ett tillägg när gruppens ålder och ork tillåter det.',
      sectionTitle: 'Välj biljetttid efter målet med besöket',
      sectionIntro:
        'Vattenvärlden har normalt öppet till kvällen. Det avgörande är om Rulantica är ett huvudmål eller bara ett tillägg efter parken.',
      points: [
        {
          title: 'Dagsbiljett',
          text: 'Mer tid för barnområden, vattenrutschbanor, pauser och säsongsöppna utomhusområden – särskilt med en egen dag på Rulantica.',
          icon: 'tabler:sun',
        },
        {
          title: 'Kväll eller Moonlight',
          text: 'Mindre tid och oftast lägre pris, men också mindre ork kvar efter en lång dag i parken.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Ta packlistan på allvar',
          text: 'Kontrollera handduk, badkläder och aktuella regler i förväg. Dagsgäster bör inte räkna med att spontant kunna hyra en handduk.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Räcker en kvällsbiljett till Rulantica?',
          answer:
            'Den kan räcka till utvalda vattenrutschbanor eller en kort avslutning. Familjer med små barn och gäster som vill uppleva många områden har oftast större nytta av en hel dag.',
        },
        {
          question: 'Hinner man Europa-Park och Rulantica på samma dag?',
          answer:
            'Tekniskt sett ja, men kombinationen är ansträngande och kräver hårda prioriteringar. Guiden tar hänsyn till parkdagar, barn och önskat tempo.',
        },
        {
          question: 'Kan man hyra handduk på Rulantica?',
          answer:
            'Enligt parkens officiella frågor och svar finns ingen vanlig handduksuthyrning för dagsgäster. Ta därför med en egen handduk och kontrollera informationen igen före besöket.',
        },
      ],
    },
    stayGuide: {
      title: 'Boende vid Europa-Park: jämför hotell, Rust och närområdet',
      description:
        'Jämför boende vid Europa-Park: temahotell, pensionat, semesterlägenhet, camping och närområde utifrån tidsvinst, självhushåll och transport.',
      eyebrow: 'Boende',
      heading: 'Vilket boende passar din besöksplan?',
      answer:
        'Det bästa boendet avgörs inte bara av rumspriset. Jämför tidigt inträde, avstånd, transport, självhushåll, avbokning och hela gruppens kostnad.',
      sectionTitle: 'Scenarier i stället för en godtycklig hotellrankning',
      sectionIntro:
        'Jämförelsen visar boendetyper och öppna kontrollfrågor. Den anger medvetet varken obekräftade priser eller en rangordning av enskilda verksamheter.',
      points: [
        {
          title: 'Förmåner på resorten',
          text: 'De officiella temahotellen kan erbjuda tidigt inträde och transfer. Kontrollera vad som gäller och vilka attraktioner som är öppna på ditt datum.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust och självhushåll',
          text: 'Pensionat och semesterlägenheter kan erbjuda korta avstånd eller kök – kontrollera alltid den exakta utrustningen hos det aktuella boendet.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Närområde och transport',
          text: 'Ett lägre rumspris kan ätas upp av parkeringskostnader, den sista bussavgången och extra restid.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Är Europa-Parks officiella hotell alltid det bästa valet?',
          answer:
            'Nej. De är starka alternativ när resortförmåner och bekvämlighet är viktiga. För självhushåll, större grupper eller en annan budget kan fristående boenden passa bättre.',
        },
        {
          question: 'Visar jämförelsen aktuella hotellpriser?',
          answer:
            'Nej. Tillförlitliga priser kräver resedatum, beläggning och bokningsvillkor. Kostnadskalkylatorn låter dig därför ange ett övernattningspris som du själv har kontrollerat.',
        },
        {
          question: 'Vilka orter utöver Rust är relevanta?',
          answer:
            'Bland annat Ringsheim, Herbolzheim och andra kommuner i upplevelseregionen. Det viktiga är den konkreta förbindelsen och den sista returen på besöksdagen.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restauranger i Rust efter Europa-Park: kontrollerad katalog',
      description:
        'Hitta restauranger i Rust för kvällen: neutrala, källkontrollerade poster med kök, serviceinformation, osäkerheter och direktlänkar till verksamheterna.',
      eyebrow: 'Äta i Rust',
      heading: 'Var kan du äta i Rust efter att parken har stängt?',
      answer:
        'Katalogen är ingen topplista. Den visar verksamheter med spårbara primär- eller kommunkällor och tydliggör vilka öppettider, bokningsregler och kostfrågor du fortfarande behöver kontrollera direkt.',
      sectionTitle: 'Mer användbart än en okontrollerad restaurangrankning',
      sectionIntro:
        'Öppettider och stängda veckodagar ändras. Därför skiljer vi mellan belagd köksinriktning, serviceinformation och öppna frågor för varje post.',
      points: [
        {
          title: 'Källa i stället för stjärnor',
          text: 'Vi använder inte plattformsbetyg som bevis på kvalitet, utan länkar till verksamheternas och kommunens webbplatser.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Kvällsservering synlig',
          text: 'Ett filter använder endast belagd serviceinformation. Den faktiska tiden då köket är öppet måste ändå bekräftas på besöksdagen.',
          icon: 'tabler:clock',
        },
        {
          title: 'Inga påhittade kostfilter',
          text: 'Veganvänligt, glutenfritt eller allergianpassat visas först när det finns tillförlitliga och aktuella uppgifter.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Är restaurangerna i katalogen rekommendationer?',
          answer:
            'Nej. En post betyder bara att verksamheten har hittats i en spårbar källa. Smak, kvalitet och bordstillgång har inte bedömts.',
        },
        {
          question: 'Är öppettiderna garanterade?',
          answer:
            'Nej. Extra öppet, semesterstängt och kökets tider kan ändras med kort varsel. Använd verksamhetens länk eller ring före besöket.',
        },
        {
          question: 'Varför saknas avstånd?',
          answer:
            'En tillförlitlig gångtid beror på exakt startpunkt och rutt. Sådana värden läggs till först efter en konsekvent kontroll med kartdata eller på plats.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: tillgänglighet, priser och regler',
      description:
        'Förstå ResortPass Silver och Gold: aktuell försäljningsstatus, priser, besöksdagar, bokning, Rulantica och en oberoende tillgänglighetsbevakning.',
      eyebrow: 'Guide till ResortPass',
      heading: 'Allt du behöver veta om Europa-Park ResortPass',
      answer:
        'Silver och Gold går för närvarande inte att köpa i ordinarie försäljning, och inget nytt försäljningsdatum har meddelats. Silver är billigare och bundet till angivna besöksdagar, medan Gold är flexiblare och innehåller extra förmåner på Rulantica.',
      sectionTitle: 'Välj årskort efter hur du faktiskt använder det',
      sectionIntro:
        'Priset är inte det enda som avgör. Viktigare är möjliga besöksdagar, flexibilitet, användning av Rulantica och om kortet verkligen går att köpa.',
      points: [
        {
          title: 'Kontrollera tillgängligheten först',
          text: 'Bevakningen kontrollerar den officiella biljettbutiken regelbundet och skiljer verklig köpstatus från besked eller köer.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver eller Gold',
          text: 'Silver gäller på angivna besöksdagar. Gold ger större flexibilitet och innehåller två dagsbiljetter till Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Kontrollera reglerna i portalen',
          text: 'Bokningar, undantagna dagar och avtalsvillkor kan ändras och ska kontrolleras i den officiella källan före köp.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'När går det att köpa ResortPass igen?',
          answer:
            'Just nu har inget nytt försäljningsdatum meddelats. Bevakningen säger till när den officiella butiken faktiskt visar att Silver eller Gold går att köpa igen.',
        },
        {
          question: 'Vad kostar ResortPass?',
          answer:
            'Enligt den senast officiellt kontrollerade informationen kostar Silver 325 euro för vuxna och 275 euro för barn/seniorer. Gold kostar 495 respektive 430 euro.',
        },
        {
          question: 'Har bevakningen någon koppling till Europa-Park?',
          answer:
            'Nej. Det här är ett oberoende communityprojekt. Köp, avtal och bindande förmåner hanteras uteslutande av de officiella aktörerna.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver eller Gold? Jämförelse och beslutsstöd',
      description:
        'Jämför ResortPass Silver och Gold: pris, besöksdagar, flexibilitet, Rulantica och vilka användningssätt de passar för.',
      eyebrow: 'Silver mot Gold',
      heading: 'Vilket ResortPass passar ditt besöksmönster?',
      answer:
        'Silver passar bättre om de angivna besöksdagarna fungerar för dig och det lägre priset är viktigt. Gold lönar sig främst om du behöver maximal flexibilitet och verkligen använder de inkluderade Rulantica-dagarna.',
      sectionTitle: 'Det dyrare kortet är inte automatiskt bättre',
      sectionIntro:
        'Jämför dina verkliga besöksdagar och tilläggsförmåner. Flexibilitet eller Rulantica-biljetter som inte används ger inget värde.',
      points: [
        {
          title: 'Silver: billigare när du kan planera',
          text: 'Passar när du kan planera datumen tidigt och de publicerade besöksdagarna fungerar med din kalender.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: större flexibilitet',
          text: 'Passar för fler spontana besök och gäster som verkligen använder de två inkluderade dagsbiljetterna till Rulantica.',
          icon: 'tabler:crown',
        },
        {
          title: 'Jämför med dagsbiljetter',
          text: 'Utgå från hur många besök du faktiskt förväntar dig och jämför med datumstyrda priser på dagsbiljetter.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Har Silver undantagna dagar?',
          answer:
            'Silver gäller på besöksdagar som fastställs i förväg. Den aktuella listan på den officiella detaljsidan och i ResortPass-portalen är alltid den som gäller.',
        },
        {
          question: 'Ingår biljetter till Rulantica med Gold?',
          answer:
            'Enligt parkens aktuella information innehåller Gold två dagsbiljetter till Rulantica. Kontrollera villkor och bokning officiellt igen före användning.',
        },
        {
          question: 'Efter hur många besök lönar sig ett pass?',
          answer:
            'Det beror på dina faktiska besöksdatum, priserna på dagsbiljetter och vilka tilläggsförmåner du använder. Ett generellt antal besök skulle vara missvisande.',
        },
      ],
    },
    resortPassPrices: {
      title: 'Priser på ResortPass 2026: jämför Silver, Gold och dagsbiljetter',
      description:
        'Aktuella priser på ResortPass för vuxna, barn och seniorer med en jämförelse mot Europa-Parks datumstyrda dagsbiljetter.',
      eyebrow: 'Priser 2026',
      heading: 'Vad kostar ResortPass Silver och Gold?',
      answer:
        'Senast officiellt kontrollerat: Silver 325 euro för vuxna och 275 euro för barn/seniorer, Gold 495 respektive 430 euro. Inget av passen går för närvarande att köpa i ordinarie försäljning.',
      sectionTitle: 'Bedöm priset tillsammans med användningen',
      sectionIntro:
        'Dagsbiljetter har datumstyrda prisintervall. Ett årskort lönar sig därför inte efter ett universellt antal besök, utan utifrån dina verkliga datum.',
      points: [
        {
          title: 'Silver',
          text: '325 euro för vuxna, 275 euro för barn mellan 4 och 11 år samt seniorer från 60 år – kontrollera datumet för primärkällan.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euro för vuxna, 430 euro för barn och seniorer, inklusive tilläggsförmåner som två dagar på Rulantica.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Tillgänglighet är ett grundkrav',
          text: 'En prisjämförelse hjälper först när passet du vill ha faktiskt säljs. Använd livestatusen för att kontrollera det.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Gäller priserna för 2026?',
          answer:
            'Beloppen hämtades från den officiella biljettsidan på det angivna kontrolldatumet. Aktören kan ändra priser och villkor.',
        },
        {
          question: 'Finns rabatterade priser?',
          answer:
            'Den officiella sidan anger rabatterade priser för barn, seniorer och vissa behörighetsgrupper. Krav på intyg och aktuella villkor är bindande.',
        },
        {
          question: 'Kan jag köpa ResortPass just nu?',
          answer:
            'Silver och Gold anges för närvarande som ej tillgängliga. Livebevakningen visar när den faktiska butiksstatusen ändras.',
        },
      ],
    },
    resortPassReservation: {
      title: 'Boka med ResortPass: besöksdagar, portal och hotellgäster',
      description:
        'Så fungerar bokningar med ResortPass: registrera besöksdag, tilldelade platser, hotellbokning och aktuella regler i ResortPass-portalen.',
      eyebrow: 'Bokning',
      heading: 'Måste du boka ditt besök med ResortPass?',
      answer:
        'Den konkreta bokningen beror på pass, besöksdag och eventuella platsbegränsningar. ResortPass-portalen och parkens officiella frågor och svar gäller. En hotellbokning ersätter inte nödvändigtvis alla andra steg.',
      sectionTitle: 'Kontrollera tre saker före avresan',
      sectionIntro:
        'Ett giltigt pass, en tillåten besöksdag och en eventuell obligatorisk bokning är tre skilda villkor.',
      points: [
        {
          title: 'Öppna passportalen',
          text: 'Kontrollera giltighet, registrerade besöksdagar och aktuell information om platsbegränsningar där.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Stäm av hotellbokningen',
          text: 'Läs de aktuella frågorna och svaren om hur besöksdagar kopplas till just ditt boende på resorten.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Spara bekräftelsen',
          text: 'Ha pass och bokningsbevis redo i den officiella appen eller i det angivna formatet på besöksdagen.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Behöver jag boka varje besök?',
          answer:
            'Det går inte att ge ett generellt svar för alla passtyper och tidsperioder. Kontrollera den aktuella regeln i ResortPass-portalen inför varje besök.',
        },
        {
          question: 'Är en hotellbokning automatiskt en bokning till parken?',
          answer:
            'De officiella frågorna och svaren beskriver särskilda regler för övernattande gäster. Utgå inte från ett antagande, utan stäm av den konkreta bokningen i portalen.',
        },
        {
          question: 'Vad händer när dagens platser är slut?',
          answer:
            'Aktörens aktuella regel gäller. Tillgänglighetsbevakningen följer försäljningen, inte platsläget för enskilda besöksdagar i din personliga portal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass och Rulantica: Gold-förmåner och bokning',
      description:
        'Vilka Rulantica-förmåner ingår i ResortPass Gold? Förklaring av två dagsbiljetter, planering, bokning och skillnaden mot Silver.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'Vad ingår med ResortPass på Rulantica?',
      answer:
        'Enligt parkens aktuella information innehåller ResortPass Gold två dagsbiljetter till Rulantica, medan Silver inte gör det. Bokning, giltighet och eventuella platsbegränsningar måste kontrolleras officiellt före besöket.',
      sectionTitle: 'Se till att faktiskt använda de två Rulantica-dagarna',
      sectionIntro:
        'Förmånen har bara ett värde om de inkluderade dagarna passar din resa och kan bokas i god tid.',
      points: [
        {
          title: 'Planera in Gold-förmånen',
          text: 'Behandla de två dagarna som en egen del av din årsplan, inte som ett spontant tillägg efter en kväll i parken.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Räkna separat för Silver',
          text: 'Med Silver måste biljetterna till Rulantica räknas separat och bokas i mån av tillgänglighet.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Kontrollera tidsfönstret',
          text: 'En hel dag på Rulantica är oftast mer värdefull för familjer än ett stressigt byte efter en full dag i parken.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Hur många Rulantica-dagar ingår med Gold?',
          answer:
            'Enligt det aktuella officiella innehållet ingår två dagsbiljetter till Rulantica. Aktörens nuvarande villkor gäller före användning.',
        },
        {
          question: 'Ingår Rulantica med Silver?',
          answer:
            'Enligt den aktuella jämförelsen ingår det inte som en ordinarie förmån. Biljetter till Rulantica som behövs bör beräknas separat.',
        },
        {
          question: 'Måste de inkluderade dagarna bokas?',
          answer:
            'Kontrollera alltid den aktuella bokningsregeln i ResortPass-portalen. Rulantica har ett begränsat antal platser per dag.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interaktiv besöksplanerare',
    title: 'En realistisk tidsram för ditt besök',
    intro:
      'Välj besökslängd, grupp och förutsättningar. Du får en robust ordning – inte en minutplan med falsk precision.',
    dateLabel: 'Besöksdatum',
    daysLabel: 'Planerade dagar i parken',
    days: ['1 dag', '2 dagar', '3 dagar'],
    groupLabel: 'Inriktning',
    groups: {
      balanced: 'Blandat',
      family: 'Familj och barn',
      thrill: 'Berg- och dalbanor och fart',
      shows: 'Shower och lugnt tempo',
    },
    arrivalLabel: 'Ankomst',
    arrivals: {
      early: 'På plats före öppning',
      opening: 'Vid öppning',
      late: 'Efter kl. 10.30',
    },
    crowdLabel: 'Förväntat besökartryck',
    crowds: {
      low: 'Ganska lågt',
      medium: 'Medelhögt',
      high: 'Högt',
    },
    rulanticaLabel: 'Planera in Rulantica',
    submit: 'Skapa plan',
    resultTitle: 'Din rekommendation',
    resultLead: 'Planera med tydliga prioriteringar',
    resultDays: 'rekommenderade dagar totalt',
    routeLabel: 'Dagens upplägg',
    morning: 'Morgon',
    midday: 'Mitt på dagen',
    afternoon: 'Eftermiddag',
    evening: 'Kväll',
    notes: {
      early: 'Var vid entrén före den officiella öppningstiden och välj ut tre huvudmål.',
      late: 'Vid sen ankomst är en andra dag säkrare än en överlastad språngmarsch.',
      busy: 'Vid högt besökartryck: använd köinformation i realtid och ha alternativ redo i varje område.',
      rulantica: 'Med små barn eller högt vattenfokus är det bättre att ge Rulantica en egen dag.',
      family: 'Planera fasta mat- och vilopauser samt minst ett inomhusalternativ.',
      thrill: 'Använd Single Rider och VirtualLine endast om de faktiskt erbjuds på besöksdagen.',
      shows: 'Kontrollera showtiderna först och bygg rutten kring dessa fasta tider.',
    },
    routes: {
      balanced: [
        'Börja med två viktiga attraktioner och stanna inom samma del av parken.',
        'Ät tidigt eller sent och lägg sedan in en inomhusattraktion eller show som ett lugnare block.',
        'Ta närliggande temaområden i följd och jämför köerna i realtid innan du byter område.',
        'Ta den prioritering som återstår och kontrollera souvenirer och en eventuell spontan förlängning av öppettiden.',
      ],
      family: [
        'Börja med en passande familjeattraktion och kontrollera barnets längd vid entrén i förväg.',
        'Planera en tidig paus, mat och en lugn inomhusattraktion eller show.',
        'Kombinera ett lekområde med två andra åldersanpassade attraktioner i samma parkhalva.',
        'Låt barnens energi styra. Välj hellre en höjdpunkt än en utmattande slutspurt.',
      ],
      thrill: [
        'Prioritera de viktigaste berg- och dalbanorna vid öppning och spring inte tvärs över parken för enstaka åk.',
        'Kontrollera VirtualLine och Single Rider och använd lunchen till ett närliggande alternativ.',
        'Välj den andra gruppen berg- och dalbanor efter köerna i realtid och räkna med tekniska stopp.',
        'Planera sista åket strategiskt nära det område där du vill avsluta dagen.',
      ],
      shows: [
        'Kontrollera showprogrammet och välj en lugn attraktion på vägen till den första tiden.',
        'Kombinera en tidig måltid med en inomhusshow eller temaattraktion.',
        'Bestäm en andra fast showtid och planera bara närliggande attraktioner däremellan.',
        'Njut av atmosfären, maten och ett sista åk utan onödiga byten mellan parkens delar.',
      ],
    },
    disclaimer:
      'Planeringshjälp utan garanti. Öppettider, köer, VirtualLine och attraktionernas drift kan ändras med kort varsel.',
    forecastCta: 'Kontrollera besöksprognosen',
  },
  costCalculator: {
    eyebrow: 'Budgetplanerare 2026',
    title: 'Beräkna ett realistiskt kostnadsintervall',
    intro:
      'Officiella biljettintervall plus ditt eget antagande om boende. Mat, resa och frivilliga tillägg ingår medvetet inte i den automatiska summan.',
    adults: 'Vuxna från 12 år',
    children: 'Barn 4–11 år',
    days: 'Europa-Park',
    oneDay: '1 dag',
    twoDays: '2 dagar',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Ingår inte',
      day: 'Dagsbiljett',
      evening: 'Kvällsbiljett från kl. 17',
      moonlight: 'Moonlight från kl. 19',
    },
    parking: 'Ordinarie parkering vid Europa-Park',
    nights: 'Övernattningar',
    lodgingPerNight: 'Total boendekostnad per natt',
    calculate: 'Uppdatera budget',
    resultEyebrow: 'Ditt kostnadsintervall',
    total: 'Beräknad totalkostnad',
    rangeConnector: 'till',
    perPerson: 'per person',
    breakdown: 'Fördelning',
    europaParkTickets: 'Biljetter till Europa-Park',
    rulanticaTickets: 'Biljetter till Rulantica',
    parkingCost: 'Parkering',
    lodgingCost: 'Boende',
    variableNote: 'Biljettpriserna är datumstyrda. Intervallet är ingen prisgaranti.',
    assumptionNote: 'Lägg även till mat, resa och avgifter i budgeten.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Familjeguide',
    title: 'Filtrera attraktioner efter ålder och längd',
    intro:
      'Guiden använder ett medvetet litet urval som har kontrollerats i officiella källor. Det bindande beslutet fattas alltid av personalen på plats.',
    age: 'Barnets ålder',
    height: 'Barnets längd',
    interest: 'Intresse',
    interests: {
      all: 'Alla verifierade exempel',
      calm: 'Lugnt',
      family: 'Familjeäventyr',
      thrill: 'Fart',
      indoor: 'Inomhus',
    },
    submit: 'Visa passande exempel',
    resultTitle: 'Verifierat urval',
    resultCount: 'attraktioner visas',
    eligible: 'Kraven är uppfyllda',
    accompanied: 'Vuxet sällskap krävs',
    notYet: 'Kraven är inte uppfyllda',
    minimum: 'Minimum',
    years: 'år',
    centimeters: 'cm',
    indoor: 'Inomhus',
    source: 'Officiell källa',
    noResults: 'Det finns ännu ingen verifierad exempelattraktion för det här filtret.',
    disclaimer:
      'Ingen garanti för att barnet får åka. På plats gäller skyltar, mätsticka, hälso- och säkerhetsregler samt personalens instruktioner.',
    officialFilter: 'Kontrollera alla attraktioner i det officiella filtret',
  },
  rulanticaPlanner: {
    eyebrow: 'Kombinationsguide',
    title: 'Vilken Rulantica-biljett passar din resa?',
    intro:
      'Guiden väger in parkdagar, barn, hur viktigt vattenlandet är och gruppens energinivå. Därefter kontrollerar du priser och tillgänglighet officiellt.',
    parkDays: 'Dagar på Europa-Park',
    parkDayOptions: ['1 parkdag', '2 parkdagar', '3 eller fler dagar'],
    children: 'Barn i gruppen',
    childOptions: ['Inga barn', 'Barn under 8 år', 'Äldre barn/ungdomar'],
    waterPriority: 'Hur viktigt är Rulantica?',
    priorityOptions: ['Bara prova', 'Viktigt tillägg', 'Huvudmål'],
    energy: 'Önskat tempo',
    energyOptions: ['Lugnt', 'Blandat', 'Fullspäckat schema'],
    submit: 'Bedöm biljettypen',
    resultLabel: 'Planeringsrekommendation',
    recommendations: {
      day: {
        title: 'En hel dag på Rulantica',
        text: 'Med små barn eller stort vattenfokus ger en egen dag tillräckligt med tid för pauser, ombyten och flera områden.',
      },
      evening: {
        title: 'Kvällsbiljett som tillägg',
        text: 'Passar i normalt tempo och med ett tydligt urval, men planera in en riktig paus och restid efter Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight som en kort avslutning',
        text: 'Tre timmar passar bättre för vana och energiska gäster med få prioriteringar än för ett fullständigt första besök.',
      },
      separate: {
        title: 'Planera Rulantica separat',
        text: 'Vid lugnt tempo eller en längre resa är ett separat block säkrare än att byta efter en hel dag i parken.',
      },
    },
    checklistTitle: 'Packa och kontrollera i förväg',
    checklist: [
      'Egen handduk för dagsgäster',
      'Badkläder och torra ombyteskläder',
      'Aktuella öppettider och tider för underhållsstopp',
      'Ålders- och längdregler för önskade vattenrutschbanor',
      'Bokning, biljett och alternativ för förvaringsskåp',
    ],
    officialNote:
      'De officiella frågorna och svaren gäller alltid för inträde, klädsel, handdukar, barnvagnar och förvaringsskåp.',
    officialCta: 'Öppna Rulanticas frågor och svar',
  },
  stayComparator: {
    eyebrow: 'Jämför boenden',
    title: 'Vilken typ av boende passar din resa?',
    intro:
      'Jämför åtta boendetyper utifrån belagda egenskaper. Guiden visar varken en rangordning eller okontrollerade priser – den hjälper dig att avgränsa sökningen.',
    filtersLabel: 'Filtrera boenden',
    scenarioLabel: 'Vad är särskilt viktigt för dig?',
    allScenarios: 'Alla resesituationer',
    prioritiesLabel: 'Ytterligare egenskaper',
    priorities: {
      operatorGuestBenefits: 'Förmåner för resortgäster',
      selfCatering: 'Självhushåll',
      ownSleepingUnitRequired: 'Egen sovutrustning',
      groupFormats: 'Passar grupper',
      walkingAccess: 'Gångavstånd till parken',
      shuttleOrTransit: 'Transfer eller kollektivtrafik',
    },
    reset: 'Återställ filter',
    resultsLabel: 'Jämförbara boendetyper',
    resultSingular: 'boendetyp',
    resultPlural: 'boendetyper',
    operatorRelation: {
      resort_operated: 'Drivs av Europa-Park Resort',
      independent: 'Fristående verksamhet',
    },
    states: {
      verified: 'Belagt',
      available_for_this_type: 'Tillgängligt för denna typ',
      not_applicable: 'Ej tillämpligt',
      varies_by_property: 'Varierar mellan boenden',
      must_verify: 'Kontrollera före bokning',
    },
    verifyTitle: 'Kontrollera konkret före bokning',
    source: 'Öppna källan',
    checkedAt: 'Kontrollerad',
    emptyTitle: 'Ingen boendetyp matchar alla filter',
    emptyText:
      'Ta bort en egenskap eller välj alla resesituationer igen. Ett tomt resultat säger ingenting om enskilda boenden.',
    priceNoteTitle: 'Därför visas inga hotellpriser här',
    priceNoteText:
      'Boendepriser varierar med datum, beläggning, prisvillkor och innehåll. Jämför först en passande boendetyp och kontrollera sedan slutpriset direkt hos aktören.',
    notRanking:
      'Ordningen är neutral. Den är varken ett kvalitetsomdöme eller en betald rekommendation.',
    noJs:
      'Utan JavaScript går det fortfarande att läsa alla boendetyper och kontrollistor. Det är bara de interaktiva filtren som saknas.',
    scenarioLabels: {
      'operator-benefits-priority': 'Prioritera tidigt inträde och resorttransport',
      'park-and-rulantica-without-car':
        'Kombinera Europa-Park och Rulantica utan egen bil',
      'own-motorhome-or-caravan': 'Res med egen husbil eller husvagn',
      'own-tent': 'Övernatta i eget tält',
      'large-group-themed-stay':
        'Temaboende för familj, förening eller grupp',
      'self-catering-filter': 'Självhushåll som urvalskriterium',
      'walkability-filter':
        'Filtrera boenden efter gångväg till huvudentrén',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park temahotell',
        definition:
          'Ett av de sex 4-stjärniga (Superior)-temahotell som drivs av resorten.',
        mustVerify: [
          'förmåner för det konkreta resedatumet',
          'vilka attraktioner som faktiskt är öppna vid tidigt inträde',
          'rumsbeläggning och tillgänglighet',
          'om entrébiljetter ingår i det valda paketet eller köps separat',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Boende i rum i Silver Lake City med en egen profil av gästförmåner.',
        mustVerify: [
          'aktuell tidtabell för Rust-bussen',
          'förmåner för det konkreta resedatumet',
          'rumsbeläggning och tillgänglighet',
          'möjliga perioder med evenemangsbuller i Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Tematiserade grupp- och familjeboenden i tipier, täckta vagnar, timmerstugerum och Western Houses.',
        mustVerify: [
          'utformningen av sanitets- och sovutrymmen i den valda kategorin',
          'om frukost är obligatorisk eller kan bokas som tillval',
          'förmåner för det konkreta resedatumet',
          'möjliga perioder med evenemangsbuller',
          'om våningssängarnas längd passar resenärerna',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Ställplatser i Silver Lake City för husbilar och husvagnar.',
        mustVerify: [
          'fordonets mått och passande kategori av ställplats',
          'villkor för el och vatten i den konkreta bokningen',
          'tider för ankomst, nattro och avresa',
          'aktuella förmåner och tidtabellen för Rust-bussen',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Tältplats i Silver Lake City för gäster med eget tält.',
        mustVerify: [
          'regler för tält och tältplats',
          'elbehov och anslutningsvillkor',
          'alternativ för sanitetsutrymmen och frukost',
          'väder, nattro och aktuella gästförmåner',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Fristående hotell eller pensionat i Rust',
        definition:
          'Boende som drivs av en fristående verksamhet inom kommunen Rust.',
        mustVerify: [
          'aktuell drift- och bokningstillgänglighet',
          'den faktiska gångvägen till den entré som behövs',
          'frukost, parkering, avbokning och tillgänglighet',
          'utgå inte från att resortens hotellförmåner ingår',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Fristående semesterlägenhet i Rust',
        definition:
          'Fristående boende som kommunen Rust listar som semesterlägenhet.',
        mustVerify: [
          'utrustning i kök och matplats i stället för att dra slutsatser från kategorin',
          'den faktiska gångvägen till den entré som behövs',
          'minsta vistelselängd, slutstädning, parkering och avbokning',
          'aktuell registrering och tillgänglighet',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Boende i en grannkommun',
        definition:
          'Fristående boende utanför Rust i en kommun i Erlebnisregion Europa-Park.',
        mustVerify: [
          'förbindelsen på den aktuella veckodagen och när parken stänger',
          'sista returförbindelsen och eventuella byten',
          'parkering vid resmålet och boendet',
          'aktuell drift- och bokningstillgänglighet',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Verifierad katalog',
    title: 'Jämför mindre restauranger i Rust på saklig grund',
    intro:
      'Sök bland åtta redaktionellt kontrollerade katalogposter. Endast belagda egenskaper visas. Vi gör inga påståenden om kvalitet, prisnivå eller lediga bord.',
    filtersLabel: 'Filtrera restauranger',
    searchLabel: 'Namn eller adress',
    searchPlaceholder: 'Till exempel Adler eller Fischerstraße',
    statusLabel: 'Kontrollstatus',
    allStatuses: 'Alla kontrollstatusar',
    statuses: {
      first_party_verified: 'Belagt med aktörens egen källa',
      public_directory_verified: 'Belagt i kommunens katalog',
      license_page_verified: 'Belagt via en tillståndssida',
      needs_reverification: 'Behöver kontrolleras igen',
    },
    timeLabel: 'Belagt tidsintervall',
    allTimes: 'Alla belagda tidsintervall',
    timeSlots: {
      breakfast: 'Frukost',
      evening: 'Kvällsservering',
    },
    distanceLabel: 'Belagt avstånd',
    allDistances: 'Alla belagda avstånd',
    distanceOptions: [
      { maxMetres: 500, label: 'Upp till 500 m' },
      { maxMetres: 1000, label: 'Upp till 1 km' },
      { maxMetres: 2000, label: 'Upp till 2 km' },
    ],
    needsLabel: 'Belagda behov',
    familyFeatures: {
      kids_menu: 'Barnmeny nämns',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetariska alternativ är belagda',
      vegan_evidence: 'Veganska alternativ är belagda',
      gluten_free_evidence: 'Glutenfria alternativ är belagda',
    },
    reset: 'Återställ filter',
    resultsLabel: 'Kontrollerade katalogposter',
    resultSingular: 'restaurang',
    resultPlural: 'restauranger',
    noJs:
      'Utan JavaScript går det fortfarande att läsa alla poster, källor och osäkerheter. Det är bara sökningen och filtren som saknas.',
    emptyTitle: 'Ingen post matchar dessa filter',
    emptyText:
      'Ta bort ett filter. Att inga träffar visas kan också betyda att egenskapen ännu inte är tillräckligt väl belagd.',
    serviceEvidence: 'Belagt utbud',
    cuisineEvidence: 'Belagd köksinriktning',
    filterEvidence: 'Belägg för filtret',
    evidenceCheckedAt: 'Filterbelägg kontrollerat',
    source: 'Primärkälla',
    operatorWebsite: 'Aktörens webbplats',
    corroboratingSource: 'Ytterligare källa',
    uncertaintyTitle: 'Det här behöver kontrolleras före besöket',
    verificationNote: 'Kontrollanteckning',
    checkedAt: 'Post kontrollerad',
    reviewDue: 'Kontrolldatumet har passerats',
    notRecommendation: 'Ingen rekommendation',
    notRecommendationTitle: 'Neutral katalog, ingen topplista',
    notRecommendationText:
      'Urval och ordning är inget kvalitetsomdöme. Kontrollera öppettider, meny, allergener och bokning direkt med restaurangen.',
    unavailableEvidenceTitle: 'Dessa filter visar vi medvetet inte',
    unavailableEvidence: {
      time: 'Tidsintervallen är ännu inte tillräckligt enhetligt belagda.',
      distance: 'Avstånden har ännu inte mätts längs en enhetlig rutt.',
      family: 'Familjeegenskaperna är ännu inte tillräckligt belagda.',
      diet: 'Vegetariska, veganska och glutenfria alternativ är ännu inte tillräckligt tillförlitligt dokumenterade.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['traditionell husmanskost'],
        serviceEvidence: ['kvällsservering enligt aktörens webbplats'],
        verificationNote:
          'Aktörens webbplats och företagsuppgifter var tillgängliga. Adress, kontaktuppgifter, köksinriktning och aktuella öppettidsuppgifter visades på kontrolldagen.',
        uncertainties: [
          'Extra öppet och semesterstängt varierar över tid.',
          'Tillgången till bokningsbara bord har inte kontrollerats.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regionala och internationella rätter',
          'burgare, revbensspjäll, pasta och biff enligt aktören',
        ],
        serviceEvidence: [
          'frukost enligt aktörens webbplats',
          'kvällsservering enligt aktörens webbplats',
        ],
        verificationNote:
          'Aktörens webbplats var tillgänglig och angav adress, matinriktning och frukostutbud.',
        uncertainties: [
          'Webbplatsens aktuella information om öppet eller stängt kan ändras med kort varsel.',
          'Aktörens egen presentation och inbäddade omdömen användes inte som belägg för kvalitet.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['italiensk mat'],
        serviceEvidence: ['kvällsservering enligt kommunens katalog'],
        verificationNote:
          'Aktörens webbplats bekräftar verksamheten, adressen och den italienska restaurangen. Kommunens katalog anger ett aktuellt tidsintervall för öppethållande.',
        uncertainties: [
          'Bekräfta öppettiderna på aktörens webbplats eller per telefon före besöket.',
          'Den gångtid till parken som aktören anger har inte mätts oberoende.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['grekisk och internationell mat'],
        serviceEvidence: ['barnmeny enligt aktörens webbplats'],
        verificationNote:
          'Aktörens webbplats var tillgänglig och bekräftade adress, köksinriktning och kontaktväg för bokning.',
        uncertainties: [
          'Det läsbara innehållet på webbplatsen anger inga stabila öppettider för veckans dagar.',
          'Tillgången till lediga bord har inte kontrollerats.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['mat från Baden', 'regionala rätter'],
        serviceEvidence: ['kvällsservering enligt aktörens webbplats'],
        verificationNote:
          'Aktörens webbplats var tillgänglig och angav adress, köksinriktning från Baden och aktuellt veckoschema.',
        uncertainties: [
          'Kontrollera semesterstängt och stängd veckodag igen före besöket.',
          'Inga påståenden om lämplighet vid allergier görs utan en direkt förfrågan.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: [
          'köksinriktningen anges inte tydligt i primärkällan',
        ],
        serviceEvidence: ['kvällsservering enligt aktörens webbplats'],
        verificationNote:
          'Aktörens webbplats och kommunens post bekräftar verksamhet, adress och kontaktuppgifter. Marknadsföringspåståenden har inte tagits med.',
        uncertainties: [
          'Kontrollera den aktuella menyn manuellt innan restaurangen kategoriseras redaktionellt efter köksinriktning.',
          'Aktörens webbplats anger andra öppettider än tredjepartsplattformar. Använd endast aktörens uppgifter.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: [
          'köksinriktningen anges inte i kommunens katalogpost',
        ],
        serviceEvidence: ['terrass enligt kommunens katalog'],
        verificationNote:
          'Restaurangen finns i kommunens aktuella katalog. Den länkade webbplatsen beskriver främst pensionatet och bekräftar inga restaurangdetaljer.',
        uncertainties: [
          'Bekräfta driftstatus, köksinriktning och öppettider direkt med verksamheten.',
          'Lyft inte fram den som ett redaktionellt kontrollerat restaurangalternativ förrän den har bekräftats direkt.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: [
          'köksinriktningen anges inte i kommunens katalogpost',
        ],
        serviceEvidence: ['leverans enligt kommunens katalog'],
        verificationNote:
          'Restaurangen gick bara att hitta i kommunens katalog. Ingen tillförlitlig egen webbplats hittades på kontrolldagen.',
        uncertainties: [
          'Bekräfta driftstatus, kontaktuppgifter, köksinriktning och öppettider direkt.',
          'Ta inte med restaurangen i rekommendationer eller rankningar för användare innan en kontroll med en förstahandskälla har gjorts.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'Beslutsstöd för ResortPass',
    title: 'Kontrollera status, förmåner och verkliga kostnader tillsammans',
    intro:
      'Live-statusen besvarar frågan om kortet går att köpa. Jämförelsen och kalkylatorn hjälper dig sedan att välja mellan dagsbiljetter, Silver och Gold.',
    statusTitle: 'Aktuell försäljningsstatus',
    statusChecking: 'Statusen kontrolleras …',
    statusAvailable: 'Nu officiellt tillgängligt',
    statusUnavailable: 'Inte tillgängligt just nu',
    statusUnknown: 'Statusen är oklar för tillfället',
    statusError: 'Live-statusen kunde inte hämtas',
    lastChecked: 'Senast kontrollerad',
    comparisonTitle: 'Silver och Gold i korthet',
    feature: 'Egenskap',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Pris för vuxna',
    concessionPrice: 'Barn 4–11 år / seniorer från 60 år',
    visitDays: 'Besöksdagar',
    visitDaysSilver: 'Fastställda, publicerade besöksdagar',
    visitDaysGold: 'Större flexibilitet enligt aktuella villkor',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Ingår inte som standardförmån',
    rulanticaGold: 'Två dagsbiljetter enligt aktuella villkor',
    flexibility: 'Planeringsprofil',
    flexibilitySilver: 'För datum som kan planeras tidigt',
    flexibilityGold: 'För fler eller mer spontana besök',
    calculatorTitle: 'Enkel kostnadsjämförelse för vuxna',
    calculatorIntro:
      'Jämför de senast belagda passpriserna med ett valfritt antal dagsbesök på Europa-Park och Rulantica.',
    visitsLabel: 'Besök på Europa-Park',
    rulanticaVisitsLabel: 'Dagsbesök på Rulantica',
    priceScenarioLabel: 'Prisscenario för dagsbiljett',
    lowerPriceScenario: 'Nedre belagda prisintervall',
    upperPriceScenario: 'Övre belagda prisintervall',
    calculate: 'Uppdatera jämförelsen',
    dayTicketsCost: 'Enskilda dagsbiljetter',
    silverCost: 'Silver plus biljetter till Rulantica',
    goldCost: 'Gold med två inkluderade Rulantica-dagar',
    lowestCost: 'Lägsta beräknade belopp',
    estimateDisclaimer:
      'Vägledning för en vuxen person, ingen köp- eller tillgänglighetsgaranti. Undantagna dagar, bokningar, rabatter, resan och oanvända förmåner kan påverka beslutet.',
    linksTitle: 'Gå direkt vidare till nästa fråga',
    compareLink: 'Jämför Silver och Gold',
    pricesLink: 'Kontrollera priser på ResortPass',
    reservationLink: 'Förstå bokningen',
    rulanticaLink: 'ResortPass och Rulantica',
  },
};
