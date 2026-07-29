import type { PlanningLocalePack } from '../planning-types';

export const nbPlanning: PlanningLocalePack = {
  common: {
    skip: 'Hopp til innholdet',
    menu: 'Meny',
    language: 'Velg språk',
    home: 'Forside',
    plannerLabel: 'Planlegg besøket',
    answerLabel: 'Kort svar',
    updatedLabel: 'Kontrollert',
    sourcePrefix: 'Kilde',
    onThisPage: 'På denne siden',
    relatedTitle: 'Aktuelle neste steg',
    sourcesTitle: 'Kilder og oppdateringer',
    sourcesIntro:
      'Opplysninger som kan endre seg, hentes fra parkens og offentlige myndigheters kilder. Kontroller priser, åpningstider og regler på nytt i den lenkede primærkilden før du bestiller.',
    correctionLabel: 'Har vi skrevet noe feil?',
    correctionText:
      'Gi oss beskjed om utdatert informasjon. Vi skiller tydelig mellom dokumenterte fakta, beregningsforutsetninger og redaksjonelle vurderinger.',
    unofficial: 'Uavhengig fellesskapsprosjekt',
    footerText: 'Uavhengig planleggingshjelp – ikke tilknyttet Europa-Park.',
    overview: 'Oversikt',
    tool: 'Planleggingsverktøy',
    decisions: 'Beslutningshjelp',
    faq: 'Ofte stilte spørsmål',
    notRecommendation: 'Katalogoppføring, ikke en anbefaling',
    verifyBeforeVisit: 'Kontroller direkte hos tilbyderen før besøket',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 eller 2 dager',
    costCalculator: 'Kostnader',
    familyGuide: 'Familier',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Overnatting',
    restaurantGuide: 'Mat i Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Planlegg Europa-Park: uavhengig guide med kalkulatorer',
      description:
        'Planlegg besøket i Europa-Park i praksis: 1 eller 2 dager, kostnader, familie, Rulantica, overnatting og restauranter i Rust – med interaktive verktøy.',
      eyebrow: 'Planleggingssenter for Europa-Park',
      heading: 'Planlegg Europa-Park ut fra det du faktisk trenger',
      answer:
        'Ved første besøk er én hel dag et minimum. To dager er som regel mer avslappende, særlig med barn, forestillinger eller mye folk. Bruk dato, gruppetype og budsjett i stedet for en generell topp 10-liste.',
      sectionTitle: 'Fra spørsmål til en realistisk besøksplan',
      sectionIntro:
        'Verktøyene kobler dine forutsetninger til oppdaterte fakta. De erstatter ikke en offisiell bestilling, men reduserer de viktigste feilvalgene før reisen.',
      points: [
        {
          title: 'Bestem tiden først',
          text: 'Vurder ankomst, prioriterte attraksjoner og forventet besøkstrykk når du avgjør om én eller to parkdager passer.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Totalkostnad, ikke bare billettpris',
          text: 'Regn parkbilletter, Rulantica, parkering og overnatting samlet – som et intervall, ikke en misvisende fastpris.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Tilpass ruten til gruppen',
          text: 'Høyde, alder, behov for pauser og interesser påvirker en god rekkefølge mer enn generelle rangeringer.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Hvor mange dager bør man sette av til Europa-Park?',
          answer:
            'Én hel dag kan holde til utvalgte høydepunkter. To dager er som regel mer realistisk for førstegangsbesøkende, familier, forestillinger og en mindre stressende runde.',
        },
        {
          question: 'Er dette en offisiell side?',
          answer:
            'Nei. ResortPass Tracker er et uavhengig fellesskapsprosjekt. Offisiell informasjon fra Europa-Park gjelder for adgang, sikkerhet og regler som oppdateres fortløpende.',
        },
        {
          question: 'Hvorfor viser kalkulatoren prisintervaller?',
          answer:
            'Europa-Park og Rulantica bruker datobaserte nettpriser. Et intervall er mer ærlig så lenge du ikke har valgt en konkret dato i den offisielle billettbutikken.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park på 1 eller 2 dager? Interaktiv besøksplanlegger',
      description:
        'Holder én dag i Europa-Park? Lag en plan basert på besøksdato, gruppe, ankomst, besøkstrykk og Rulantica – med dagsrute.',
      eyebrow: '1 eller 2 dager',
      heading: 'Hvor mange dager trenger du i Europa-Park?',
      answer:
        'Én dag kan passe ved tidlig ankomst og tydelige prioriteringer. To dager er det tryggere valget for familier, forestillinger og mange temaområder. Med Rulantica er to til tre dager som regel mer fornuftig.',
      sectionTitle: 'Dette påvirker hvor lenge besøket bør vare',
      sectionIntro:
        'Ikke alle grupper trenger samme rute. Planlegg først tidsblokker og prioriteringer. De faktiske ventetidene avgjør detaljene på selve besøksdagen.',
      points: [
        {
          title: 'Én dag: velg konsekvent',
          text: 'Start ved åpning, prioriter tre til fem hovedmål og ha alternativer klare i nærliggende temaområder.',
          icon: 'tabler:number-1',
        },
        {
          title: 'To dager: fordel områdene',
          text: 'Fordel store attraksjoner, familieaktiviteter og forestillinger på to parkhalvdeler for å redusere gåing og gjentakelser.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Mye folk: legg inn slingringsmonn',
          text: 'Sett av tid til mat, tekniske driftsstans og avstander. Direkte ventetider hjelper deg å tilpasse planen underveis.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Rekker man hele Europa-Park på én dag?',
          answer:
            'Du kan rekke mange høydepunkter, men sjelden alt. Planleggeren vurderer ankomst, gruppe og besøkstrykk og anbefaler lengre tid ved mindre gunstige forhold.',
        },
        {
          question: 'Bør man besøke Rulantica samme dag?',
          answer:
            'En kveldsbillett kan passe for voksne og eldre barn som liker badeland. Med små barn eller når vannverdenen er viktig, er en egen dag mer avslappende.',
        },
        {
          question: 'Garanterer ruten bestemte ventetider?',
          answer:
            'Nei. Vær, driftsstans og faktisk besøkstrykk kan endre dagsplanen. Sjekk den offisielle appen og direkte ventetider på besøksdagen.',
        },
      ],
    },
    costCalculator: {
      title: 'Kostnadskalkulator for Europa-Park 2026: billetter, parkering og hotell',
      description:
        'Beregn et realistisk kostnadsintervall for Europa-Park med voksne, barn, 1 eller 2 dager, Rulantica, parkering og overnatting.',
      eyebrow: 'Totalkostnader',
      heading: 'Hva koster hele besøket i Europa-Park?',
      answer:
        'Inngangsbilletten er bare en del av budsjettet. Kalkulatoren kombinerer datobaserte billettintervaller med parkering, Rulantica og overnattingsbudsjettet ditt og viser bevisst et minimum og maksimum.',
      sectionTitle: 'Slik blir priser til et nyttig budsjett',
      sectionIntro:
        'Vi bruker offisielle prisintervaller, men ingen oppdiktede hotellpriser. Du legger selv inn forutsetninger for overnatting, mat og reise.',
      points: [
        {
          title: 'Datobaserte priser som intervall',
          text: 'Uten en konkret billettdato er et prisintervall mer pålitelig enn én enkelt lokkepris.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Familiebudsjett per person',
          text: 'Totalsummen og beløpet per person gjør det enklere å sammenligne alternativer med 1 og 2 dager.',
          icon: 'tabler:users',
        },
        {
          title: 'Forutsetningene er synlige',
          text: 'Overnatting og tilleggskostnader vises separat, slik at du kan erstatte hver forutsetning med dine egne tall.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Er prisene i kalkulatoren garanterte?',
          answer:
            'Nei. Dette er offisielle prisintervaller med kontrollert dato. Tilgjengelighet, besøksdato, behandlingsgebyrer og bestillingskanal kan endre sluttprisen.',
        },
        {
          question: 'Hvorfor brukes ingen gjennomsnittlig hotellpris?',
          answer:
            'Prisene på overnatting avhenger mye av dato, belegg og avbestillingsvilkår. Derfor legger du selv inn en reell pris du har funnet.',
        },
        {
          question: 'Er mat og reise inkludert?',
          answer:
            'Ikke automatisk ennå. Disse kostnadene varierer mye med bosted og vaner og bør legges inn som en ekstra personlig buffer.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park med barn: høydefilter og familieplan',
      description:
        'Planlegg Europa-Park med baby, småbarn eller skolebarn: filtrer attraksjoner etter alder og høyde, se krav om ledsager og legg inn gode pauser.',
      eyebrow: 'Familier og barn',
      heading: 'Hvilke attraksjoner passer for barnet ditt?',
      answer:
        'For mange attraksjoner teller alder og høyde sammen. Bruk filteret som et første utvalg, og kontroller alltid målestokken, skiltene og instruksjonene fra personalet på stedet.',
      sectionTitle: 'En familieplan trenger mer enn en liste over attraksjoner',
      sectionIntro:
        'Pauser, mat, bleieskift, søsken med ulik høyde og eventuelle regler om ledsager påvirker ruten like mye som favorittattraksjonene.',
      points: [
        {
          title: 'Kombiner alder og høyde',
          text: 'Filteret skiller mellom minstekrav og mulig krav om voksen ledsager basert på de offisielle detaljsidene.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Planlegg rolige blokker',
          text: 'Innendørsattraksjoner, lekeområder og forestillinger fungerer godt som pauser mellom mer intense opplevelser.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Kontroller på nytt på stedet',
          text: 'Sikkerhetskrav kan endres og oppgis bindende ved inngangen til den enkelte attraksjonen.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Er høyden alene nok?',
          answer:
            'Nei. Noen attraksjoner har også en minstealder eller krever en voksen ledsager frem til en bestemt alder eller høyde.',
        },
        {
          question: 'Kan filteret garantere at barnet får være med?',
          answer:
            'Nei. Det er gjeldende regler, målingen og personalet på stedet som avgjør. Helse, kroppsbygning, graviditet eller tekniske endringer kan gi flere begrensninger.',
        },
        {
          question: 'Hva er Baby-Switch?',
          answer:
            'Ved utvalgte attraksjoner kan omsorgspersoner bytte på å passe barnet og ta attraksjonen etter tur. Spør direkte ved attraksjonen hvordan ordningen gjennomføres.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Planlegg Rulantica: hel dag, kveldsbillett eller kombinasjon?',
      description:
        'Kombiner Rulantica med Europa-Park: interaktiv veileder for dags-, kvelds- eller Moonlight-billett, barn, pakkeliste og besøkslengde.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Hvordan passer Rulantica inn i kortferien din?',
      answer:
        'En hel dag i Rulantica er mest avslappende for familier og badelandentusiaster. Kvelds- eller Moonlight-billetter passer bedre som tillegg når gruppens alder og energinivå tillater det.',
      sectionTitle: 'Velg billettid etter målet med besøket',
      sectionIntro:
        'Vannverdenen er vanligvis åpen til kvelden. Det avgjørende er om Rulantica er et hovedmål eller bare et tillegg etter parken.',
      points: [
        {
          title: 'Dagsbillett',
          text: 'Mer tid til barneområder, sklier, pauser og sesongåpne uteområder – særlig med en egen dag i Rulantica.',
          icon: 'tabler:sun',
        },
        {
          title: 'Kveld eller Moonlight',
          text: 'Mindre tid og som regel lavere pris, men også mindre energi til overs etter en lang dag i parken.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Ta pakkelisten på alvor',
          text: 'Kontroller håndkle, badetøy og gjeldende regler på forhånd. Dagsgjester bør ikke regne med å kunne leie håndkle spontant.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Holder en kveldsbillett til Rulantica?',
          answer:
            'Det kan holde til utvalgte sklier eller en kort avslutning. Familier med små barn og gjester som vil oppleve mange områder, får som regel mer ut av en hel dag.',
        },
        {
          question: 'Rekker man Europa-Park og Rulantica på samme dag?',
          answer:
            'Teknisk sett ja, men kombinasjonen er krevende og forutsetter tydelige prioriteringer. Veilederen tar hensyn til parkdager, barn og ønsket tempo.',
        },
        {
          question: 'Kan man leie håndklær i Rulantica?',
          answer:
            'Ifølge den offisielle FAQ-en finnes det ingen ordinær håndkleutleie for dagsgjester. Ta derfor med eget håndkle og sjekk FAQ-en på nytt før besøket.',
        },
      ],
    },
    stayGuide: {
      title: 'Overnatting ved Europa-Park: sammenlign hotell, Rust og nærområdet',
      description:
        'Sammenlign overnatting ved Europa-Park: opplevelseshotell, pensjonat, ferieleilighet, camping og nærområdet etter spart tid, selvhushold og transport.',
      eyebrow: 'Overnatting',
      heading: 'Hvilken overnatting passer til besøksplanen din?',
      answer:
        'Den beste overnattingen avgjøres ikke bare av romprisen. Sammenlign tidlig inngang, avstander, transport, selvhushold, avbestilling og kostnaden for hele gruppen.',
      sectionTitle: 'Scenarioer i stedet for en tilfeldig hotellrangering',
      sectionIntro:
        'Sammenligningen viser overnattingstyper og åpne kontrollspørsmål. Den oppgir bevisst ingen ubekreftede priser og ingen rangering av enkeltsteder.',
      points: [
        {
          title: 'Fordeler ved resortet',
          text: 'Offisielle opplevelseshoteller kan tilby tidlig inngang og transport. Kontroller gyldigheten og hvilke attraksjoner som er åpne på den aktuelle datoen.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust og selvhushold',
          text: 'Pensjonater og ferieleiligheter kan ha kort vei eller kjøkken – hvert tilbud må kontrolleres hos det konkrete overnattingsstedet.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Nærområdet og transport',
          text: 'En lavere rompris kan bli spist opp av parkering, siste bussavgang og lengre avstander.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Er de offisielle Europa-Park-hotellene alltid det beste valget?',
          answer:
            'Nei. De er sterke alternativer når resortfordeler og komfort er viktig. Uavhengige overnattingssteder kan passe bedre for selvhushold, større grupper eller et annet budsjett.',
        },
        {
          question: 'Viser sammenligningen oppdaterte hotellpriser?',
          answer:
            'Nei. Pålitelige priser krever reisedato, antall gjester og bestillingsvilkår. Kostnadskalkulatoren bruker derfor en overnattingspris du selv har kontrollert.',
        },
        {
          question: 'Hvilke steder utenom Rust er aktuelle?',
          answer:
            'Blant annet Ringsheim, Herbolzheim og andre kommuner i Erlebnisregion. Den konkrete forbindelsen og siste returavgang på besøksdagen er avgjørende.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restauranter i Rust etter Europa-Park: kontrollert oversikt',
      description:
        'Finn restauranter i Rust til kvelden: nøytrale, kildekontrollerte oppføringer med kjøkken, servicemerknader, usikkerheter og direkte lenker til tilbyderne.',
      eyebrow: 'Mat i Rust',
      heading: 'Hvor kan du spise i Rust etter at parken stenger?',
      answer:
        'Oversikten er ingen toppliste. Den viser steder med en sporbar primær- eller kommunekilde og gjør det tydelig hvilke åpningstider, reservasjoner og spørsmål om kosthold du fortsatt må kontrollere direkte.',
      sectionTitle: 'Mer nyttig enn en ukontrollert restaurantrangering',
      sectionIntro:
        'Åpningstider og stengedager endrer seg. Derfor skiller vi mellom dokumentert matprofil, serviceopplysninger og åpne spørsmål for hver oppføring.',
      points: [
        {
          title: 'Kilde i stedet for stjerner',
          text: 'Vi bruker ikke vurderinger fra plattformer som kvalitetsbevis, men lenker til nettstedene til spisestedet og kommunen.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Kveldsservering er synlig',
          text: 'Et filter bruker bare dokumenterte serviceopplysninger. Faktisk kjøkkentid må likevel bekreftes på besøksdagen.',
          icon: 'tabler:clock',
        },
        {
          title: 'Ingen oppdiktede kostholdsfiltre',
          text: 'Vegansk, glutenfritt eller allergivennlig vises først når det finnes pålitelige, oppdaterte opplysninger.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Er de oppførte restaurantene anbefalinger?',
          answer:
            'Nei. En oppføring betyr bare at spisestedet er funnet i en sporbar kilde. Smak, kvalitet og bordtilgjengelighet er ikke vurdert.',
        },
        {
          question: 'Er åpningstidene garanterte?',
          answer:
            'Nei. Ekstraordinære åpningstider, ferie og kjøkkentider kan endres på kort varsel. Bruk lenken til tilbyderen eller ring før besøket.',
        },
        {
          question: 'Hvorfor mangler avstandsangivelser?',
          answer:
            'En pålitelig gangtid avhenger av det faktiske startpunktet og ruten. Slike verdier legges først til etter en konsekvent kart- eller stedskontroll.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: tilgjengelighet, priser og regler',
      description:
        'Forstå ResortPass Silver og Gold: gjeldende salgsstatus, priser, besøksdager, reservasjon, Rulantica og uavhengig tilgjengelighetsvarsel.',
      eyebrow: 'ResortPass-guide',
      heading: 'Alt du trenger å vite om Europa-Park ResortPass',
      answer:
        'Silver og Gold er for tiden ikke i ordinært salg, og ingen ny salgsdato er kunngjort. Silver er rimeligere og bundet til fastsatte besøksdager, mens Gold er mer fleksibelt og inkluderer ekstra Rulantica-ytelser.',
      sectionTitle: 'Velg årskort etter bruk',
      sectionIntro:
        'Prisen alene avgjør ikke. Mulige besøksdager, fleksibilitet, bruk av Rulantica og om kortet faktisk er tilgjengelig, er viktigere.',
      points: [
        {
          title: 'Tilgjengelighet først',
          text: 'Sporeren kontrollerer den offisielle billettbutikken regelmessig og skiller faktisk kjøpsstatus fra kunngjøringer eller ventekøer.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver eller Gold',
          text: 'Silver har fastsatte besøksdager. Gold gir større fleksibilitet og inkluderer to dagsbilletter til Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Kontroller reglene i portalen',
          text: 'Reservasjoner, sperredager og avtalevilkår kan endres og bør kontrolleres i den offisielle kilden før kjøp.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Når blir ResortPass tilgjengelig igjen?',
          answer:
            'Ingen ny salgsdato er kunngjort. Sporeren varsler når den offisielle butikken faktisk viser Silver eller Gold som tilgjengelig for kjøp igjen.',
        },
        {
          question: 'Hva koster ResortPass?',
          answer:
            'Ved siste offisielle kontroll kostet Silver 325 euro for voksne og 275 euro for barn/seniorer, mens Gold kostet henholdsvis 495 og 430 euro.',
        },
        {
          question: 'Er sporeren tilknyttet Europa-Park?',
          answer:
            'Nei. Dette er et uavhengig fellesskapsprosjekt. Kjøp, avtale og bindende ytelser håndteres utelukkende av de offisielle tilbyderne.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver eller Gold? Sammenligning og beslutningshjelp',
      description:
        'Sammenlign ResortPass Silver og Gold: pris, besøksdager, fleksibilitet, Rulantica og passende bruksscenarioer.',
      eyebrow: 'Silver mot Gold',
      heading: 'Hvilket ResortPass passer til ditt besøksmønster?',
      answer:
        'Silver passer best når de fastsatte besøksdagene fungerer for deg og lavere pris er viktig. Gold lønner seg mer ved behov for maksimal fleksibilitet og når du faktisk bruker de inkluderte dagene i Rulantica.',
      sectionTitle: 'Det dyreste kortet er ikke automatisk best',
      sectionIntro:
        'Sammenlign de faktiske besøksdagene og tilleggsytelsene dine. Ubrukt fleksibilitet eller ubrukte Rulantica-billetter gir ingen verdi.',
      points: [
        {
          title: 'Silver: rimeligere med planlegging',
          text: 'Passer når du kan planlegge datoer tidlig og de publiserte besøksdagene stemmer med kalenderen din.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: mer fleksibilitet',
          text: 'Passer for hyppigere spontane besøk og gjester som faktisk bruker de to inkluderte dagsbillettene til Rulantica.',
          icon: 'tabler:crown',
        },
        {
          title: 'Sammenlign med dagsbilletter',
          text: 'Bruk forventet antall reelle besøk og sammenlign med de datobaserte prisene på dagsbilletter.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Har Silver sperredager?',
          answer:
            'Silver gjelder på forhåndsdefinerte åpningsdager. Den til enhver tid oppdaterte listen på den offisielle detaljsiden og i ResortPass-portalen er gjeldende.',
        },
        {
          question: 'Er Rulantica-billetter inkludert i Gold?',
          answer:
            'Ifølge parkens gjeldende opplysninger inkluderer Gold to dagsbilletter til Rulantica. Kontroller vilkår og reservasjon offisielt på nytt før bruk.',
        },
        {
          question: 'Etter hvor mange besøk lønner et kort seg?',
          answer:
            'Det avhenger av de faktiske besøksdatoene, prisene på dagsbilletter og tilleggsytelsene du bruker. Et generelt antall besøk ville vært misvisende.',
        },
      ],
    },
    resortPassPrices: {
      title: 'ResortPass-priser 2026: Silver, Gold og sammenligning med dagsbilletter',
      description:
        'Gjeldende ResortPass-priser for voksne, barn og seniorer, sammenlignet med datobaserte dagsbilletter til Europa-Park.',
      eyebrow: 'Priser 2026',
      heading: 'Hva koster ResortPass Silver og Gold?',
      answer:
        'Sist offisielt kontrollert: Silver 325 euro for voksne og 275 euro for barn/seniorer; Gold henholdsvis 495 og 430 euro. Ingen av kortene er for tiden i ordinært salg.',
      sectionTitle: 'Vurder prisen sammen med faktisk bruk',
      sectionIntro:
        'Dagsbilletter har datobaserte prisintervaller. Et årskort lønner seg derfor ikke etter ett universelt antall, men ut fra de faktiske datoene dine.',
      points: [
        {
          title: 'Silver',
          text: '325 euro for voksne; 275 euro for barn fra 4 til 11 år og seniorer fra 60 år – merk datoen for primærkilden.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euro for voksne; 430 euro for barn og seniorer, inkludert tilleggsytelser som to dager i Rulantica.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Tilgjengelighet er en forutsetning',
          text: 'En prissammenligning er først nyttig når det aktuelle kortet faktisk selges. Bruk direktestatusen for å kontrollere dette.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Gjelder prisene for 2026?',
          answer:
            'Beløpene ble hentet fra den offisielle billettsiden på den oppgitte kontrolldatoen. Tilbyderen kan endre priser og vilkår.',
        },
        {
          question: 'Finnes det rabatterte priser?',
          answer:
            'Den offisielle siden oppgir reduserte priser for barn, seniorer og enkelte andre grupper. Dokumentasjon og gjeldende vilkår er bindende.',
        },
        {
          question: 'Kan jeg kjøpe ResortPass nå?',
          answer:
            'Silver og Gold står for tiden som utilgjengelige. Direktesporeren viser når den faktiske butikkstatusen endres.',
        },
      ],
    },
    resortPassReservation: {
      title: 'ResortPass-reservasjon: besøksdager, portal og hotellgjester',
      description:
        'Slik fungerer ResortPass-reservasjoner: registrer besøksdag, kapasitet, hotellbestilling og gjeldende regler i ResortPass-portalen.',
      eyebrow: 'Reservasjon',
      heading: 'Må du reservere besøket med ResortPass?',
      answer:
        'Den konkrete reservasjonen avhenger av kortet, besøksdagen og eventuell kapasitetsbegrensning. ResortPass-portalen og de offisielle spørsmålene og svarene er avgjørende. En hotellbestilling erstatter ikke nødvendigvis hvert påkrevd trinn.',
      sectionTitle: 'Kontroller tre ting før avreise',
      sectionIntro:
        'Et gyldig kort, en tillatt besøksdag og en eventuell påkrevd reservasjon er tre separate vilkår.',
      points: [
        {
          title: 'Åpne kortportalen',
          text: 'Kontroller gyldighet, registrerte besøksdager og oppdaterte merknader om kapasitet.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Sjekk hotellbestillingen',
          text: 'Les gjeldende FAQ om hvorvidt og hvordan besøksdager knyttes til den konkrete overnattingen på resortet.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Ta vare på bekreftelsen',
          text: 'Ha kortet og reservasjonsbeviset klart i den offisielle appen eller angitt format på besøksdagen.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Trenger jeg reservasjon for hvert besøk?',
          answer:
            'Det finnes ikke ett generelt svar for alle korttyper og perioder. Kontroller den gjeldende regelen i ResortPass-portalen før hvert besøk.',
        },
        {
          question: 'Er en hotellbestilling automatisk en parkreservasjon?',
          answer:
            'Den offisielle FAQ-en beskriver særregler for overnattingsgjester. Ikke stol på en antakelse, men kontroller den konkrete bestillingen i portalen.',
        },
        {
          question: 'Hva skjer når kapasiteten er brukt opp?',
          answer:
            'Parkens gjeldende regel er avgjørende. Tilgjengelighetssporeren overvåker salget, ikke kapasiteten for individuelle besøksdager i den personlige portalen.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass og Rulantica: Gold-ytelser og reservasjon',
      description:
        'Hvilke Rulantica-ytelser inkluderer ResortPass Gold? To dagsbilletter, planlegging, reservasjon og forskjellen fra Silver forklart.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'Hva inkluderer ResortPass i Rulantica?',
      answer:
        'Ifølge parkens gjeldende opplysninger inkluderer ResortPass Gold to dagsbilletter til Rulantica, mens Silver ikke gjør det. Reservasjon, gyldighet og eventuell kapasitet må kontrolleres offisielt før besøket.',
      sectionTitle: 'Få faktisk brukt de to dagene i Rulantica',
      sectionIntro:
        'Ytelsen har bare verdi hvis de inkluderte dagene passer til reisen din og kan reserveres i tide.',
      points: [
        {
          title: 'Planlegg Gold-ytelsen',
          text: 'Behandle de to dagene som en egen del av årsplanen, ikke som et spontant tillegg etter en kveld i parken.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Beregn Silver separat',
          text: 'Med Silver må billetter til Rulantica beregnes separat og bestilles etter tilgjengelighet.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Kontroller tidsrammen',
          text: 'En hel dag i Rulantica er som regel mer verdifull for familier enn et stressende bytte etter en full parkdag.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Hvor mange dager i Rulantica inkluderer Gold?',
          answer:
            'Ifølge det gjeldende offisielle innholdet: to dagsbilletter til Rulantica. Tilbyderens oppdaterte vilkår gjelder før bruk.',
        },
        {
          question: 'Inkluderer Silver Rulantica?',
          answer:
            'Ikke som en inkludert standardytelse i den gjeldende sammenligningen. Nødvendige billetter til Rulantica bør beregnes separat.',
        },
        {
          question: 'Må de inkluderte dagene reserveres?',
          answer:
            'Kontroller den til enhver tid gjeldende reservasjonsregelen i ResortPass-portalen. Rulantica har begrenset dagskapasitet.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interaktiv besøksplanlegger',
    title: 'En realistisk ramme for dagen din',
    intro:
      'Velg besøkslengde, gruppe og rammebetingelser. Du får en robust rekkefølge – ikke misvisende nøyaktighet på minuttet.',
    dateLabel: 'Besøksdato',
    daysLabel: 'Planlagte parkdager',
    days: ['1 dag', '2 dager', '3 dager'],
    groupLabel: 'Hovedinteresse',
    groups: {
      balanced: 'Balansert',
      family: 'Familie og barn',
      thrill: 'Berg-og-dal-baner og fart',
      shows: 'Forestillinger og rolig tempo',
    },
    arrivalLabel: 'Ankomst',
    arrivals: {
      early: 'På stedet før åpning',
      opening: 'Ved åpning',
      late: 'Etter kl. 10.30',
    },
    crowdLabel: 'Forventet besøkstrykk',
    crowds: {
      low: 'Ganske lavt',
      medium: 'Middels',
      high: 'Høyt',
    },
    rulanticaLabel: 'Legg inn Rulantica',
    submit: 'Lag plan',
    resultTitle: 'Din anbefaling',
    resultLead: 'Planlegg med tydelige prioriteringer',
    resultDays: 'anbefalte dager totalt',
    routeLabel: 'Dagsramme',
    morning: 'Morgen',
    midday: 'Midt på dagen',
    afternoon: 'Ettermiddag',
    evening: 'Kveld',
    notes: {
      early: 'Vær ved inngangen før offisiell åpning, og velg tre hovedmål.',
      late: 'Ved sen ankomst er en ekstra dag mer robust enn et overfylt kappløp.',
      busy: 'Ved mye folk: bruk direkte ventetider og ha alternativer klare i hvert område.',
      rulantica: 'Med små barn eller sterkt fokus på vannverdenen bør Rulantica behandles som en egen dag.',
      family: 'Planlegg faste blokker for mat og hvile samt minst ett innendørsalternativ.',
      thrill: 'Bruk Single Rider og VirtualLine bare når de faktisk tilbys på besøksdagen.',
      shows: 'Kontroller tidene for forestillingene først, og bygg ruten rundt disse faste tidspunktene.',
    },
    routes: {
      balanced: [
        'Start med to viktige attraksjoner og hold deg i samme del av parken.',
        'Spis tidlig eller sent, og bruk deretter en innendørsattraksjon eller forestilling som en roligere blokk.',
        'Ta nærliggende temaområder i rekkefølge, og sammenlign direkte ventetider før du bytter område.',
        'Ta igjen en åpen prioritet, se på suvenirer og kontroller om parkens åpningstid forlenges spontant.',
      ],
      family: [
        'Begynn med en passende familieattraksjon, og kontroller høyden ved inngangen på forhånd.',
        'Planlegg en tidlig pause, mat og en rolig innendørsattraksjon eller forestilling.',
        'Kombiner et lekeområde med to andre alderstilpassede attraksjoner i samme parkhalvdel.',
        'La barnas energi avgjøre. Ett høydepunkt er bedre enn en utslitt sluttspurt.',
      ],
      thrill: [
        'Prioriter de viktigste berg-og-dal-banene ved åpning, og unngå å krysse hele parken for én enkelt bane.',
        'Kontroller VirtualLine og Single Rider. Bruk tiden midt på dagen på et nærliggende alternativ.',
        'Velg neste gruppe berg-og-dal-baner etter direkte ventetider, og ta høyde for tekniske driftsstans.',
        'Planlegg siste runde strategisk nær området der du vil avslutte.',
      ],
      shows: [
        'Kontroller forestillingsprogrammet, og velg en rolig attraksjon på vei til første tidspunkt.',
        'Kombiner et tidlig måltid med en innendørsforestilling eller temaattraksjon.',
        'Sett et nytt fast tidspunkt for en forestilling, og planlegg bare nærliggende attraksjoner imellom.',
        'Nyt stemningen, serveringen og en siste attraksjon uten unødvendig bytte av parkområde.',
      ],
    },
    disclaimer:
      'Planleggingshjelp uten garanti. Åpningstider, ventetider, VirtualLine og drift av attraksjoner kan endres på kort varsel.',
    forecastCta: 'Sjekk besøksprognosen',
  },
  costCalculator: {
    eyebrow: 'Budsjettplanlegger 2026',
    title: 'Beregn et realistisk kostnadsintervall',
    intro:
      'Offisielle billettintervaller pluss din egen forutsetning for overnatting. Mat, reise og valgfrie tillegg holdes bevisst utenfor den automatiske summen.',
    adults: 'Voksne fra 12 år',
    children: 'Barn 4–11 år',
    days: 'Europa-Park',
    oneDay: '1 dag',
    twoDays: '2 dager',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Ikke ta med',
      day: 'Dagsbillett',
      evening: 'Kveldsbillett fra kl. 17',
      moonlight: 'Moonlight fra kl. 19',
    },
    parking: 'Ordinær parkering ved Europa-Park',
    nights: 'Overnattinger',
    lodgingPerNight: 'Total overnattingspris per natt',
    calculate: 'Oppdater budsjettet',
    resultEyebrow: 'Ditt kostnadsintervall',
    total: 'Anslått totalkostnad',
    rangeConnector: 'til',
    perPerson: 'per person',
    breakdown: 'Fordeling',
    europaParkTickets: 'Billetter til Europa-Park',
    rulanticaTickets: 'Billetter til Rulantica',
    parkingCost: 'Parkering',
    lodgingCost: 'Overnatting',
    variableNote: 'Billettprisene avhenger av dato. Intervallet er ingen prisgaranti.',
    assumptionNote: 'Legg i tillegg inn mat, reise og gebyrer.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Familiefilter',
    title: 'Filtrer attraksjoner etter alder og høyde',
    intro:
      'Filteret bruker et bevisst begrenset, offisielt kontrollert utvalg. Det er alltid personalet på stedet som tar den bindende avgjørelsen.',
    age: 'Barnets alder',
    height: 'Høyde',
    interest: 'Interesse',
    interests: {
      all: 'Alle kontrollerte eksempler',
      calm: 'Rolig',
      family: 'Familieeventyr',
      thrill: 'Fart og spenning',
      indoor: 'Innendørs',
    },
    submit: 'Vis passende eksempler',
    resultTitle: 'Kontrollert utvalg',
    resultCount: 'attraksjoner vises',
    eligible: 'Krav oppfylt',
    accompanied: 'Voksen ledsager kreves',
    notYet: 'Krav ikke oppfylt',
    minimum: 'Minimum',
    years: 'år',
    centimeters: 'cm',
    indoor: 'Innendørs',
    source: 'Offisiell kilde',
    noResults: 'Ingen kontrollert eksempelattraksjon er registrert for dette filteret ennå.',
    disclaimer:
      'Ingen garanti for å få delta. På stedet gjelder skilting, målestokk, helse- og sikkerhetsregler samt instruksjonene fra personalet.',
    officialFilter: 'Sjekk alle attraksjonene i det offisielle filteret',
  },
  rulanticaPlanner: {
    eyebrow: 'Kombinasjonsveileder',
    title: 'Hvilken Rulantica-billett passer til reisen din?',
    intro:
      'Veilederen vurderer parkdager, barn, hvor viktig vannverdenen er, og energinivå. Deretter kontrollerer du priser og tilgjengelighet offisielt.',
    parkDays: 'Dager i Europa-Park',
    parkDayOptions: ['1 parkdag', '2 parkdager', '3 eller flere dager'],
    children: 'Barn i gruppen',
    childOptions: ['Ingen barn', 'Barn under 8 år', 'Eldre barn/ungdommer'],
    waterPriority: 'Hvor viktig er Rulantica?',
    priorityOptions: ['Bare prøve', 'Viktig tillegg', 'Hovedmål'],
    energy: 'Ønsket tempo',
    energyOptions: ['Avslappet', 'Balansert', 'Fullt program'],
    submit: 'Vurder billettype',
    resultLabel: 'Planleggingsanbefaling',
    recommendations: {
      day: {
        title: 'En hel dag i Rulantica',
        text: 'For små barn eller sterkt fokus på vannverdenen gir en egen dag nok tid til pauser, omkledning og flere områder.',
      },
      evening: {
        title: 'Kveldsbillett som tillegg',
        text: 'Passer ved normalt tempo og et tydelig utvalg, men legg inn en ordentlig pause og reisetid etter Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight som en kort avslutning',
        text: 'Tre timer passer bedre for erfarne gjester med mye energi og få prioriteringer enn for et fullverdig førstegangsbesøk.',
      },
      separate: {
        title: 'Planlegg Rulantica separat',
        text: 'Ved rolig tempo eller en lengre reise er en egen blokk mer robust enn å bytte etter en full dag i parken.',
      },
    },
    checklistTitle: 'Pakk og kontroller på forhånd',
    checklist: [
      'Eget håndkle for dagsgjester',
      'Badetøy og tørre skifteklær',
      'Gjeldende åpnings- og vedlikeholdstider',
      'Alders- og høydekrav for ønskede sklier',
      'Reservasjon, billett og skapmulighet',
    ],
    officialNote:
      'Den offisielle FAQ-en er fortsatt avgjørende for adgang, klær, håndklær, barnevogner og skap.',
    officialCta: 'Åpne Rulantica FAQ',
  },
  stayComparator: {
    eyebrow: 'Sammenlign overnatting',
    title: 'Hvilken overnattingstype passer til reisen din?',
    intro:
      'Sammenlign åtte typer overnatting etter dokumenterbare egenskaper. Filteret viser ingen rangering og ingen ukontrollerte priser – det avgrenser hvilke alternativer det er nyttig å undersøke nærmere.',
    filtersLabel: 'Filtrer overnatting',
    scenarioLabel: 'Hva er spesielt viktig for deg?',
    allScenarios: 'Alle reisesituasjoner',
    prioritiesLabel: 'Flere egenskaper',
    priorities: {
      operatorGuestBenefits: 'Fordeler for resortgjester',
      selfCatering: 'Selvhushold',
      ownSleepingUnitRequired: 'Eget soveutstyr',
      groupFormats: 'Passer for grupper',
      walkingAccess: 'Gangavstand til parken',
      shuttleOrTransit: 'Transport eller kollektivtilbud',
    },
    reset: 'Nullstill filtre',
    resultsLabel: 'Sammenlignbare overnattingstyper',
    resultSingular: 'overnattingstype',
    resultPlural: 'overnattingstyper',
    operatorRelation: {
      resort_operated: 'Drives av Europa-Park Resort',
      independent: 'Uavhengig virksomhet',
    },
    states: {
      verified: 'Dokumentert',
      available_for_this_type: 'Tilgjengelig for denne typen',
      not_applicable: 'Ikke aktuelt',
      varies_by_property: 'Varierer mellom overnattingssteder',
      must_verify: 'Må kontrolleres før bestilling',
    },
    verifyTitle: 'Kontroller konkret før bestilling',
    source: 'Åpne kilde',
    checkedAt: 'Kontrollert',
    emptyTitle: 'Ingen overnattingstype passer til alle filtrene',
    emptyText:
      'Fjern en egenskap eller velg alle reisesituasjoner igjen. Et tomt resultat sier ingenting om enkeltsteder.',
    priceNoteTitle: 'Derfor viser vi ingen hotellpriser her',
    priceNoteText:
      'Prisene på overnatting endres med dato, belegg, pristype og ytelser. Finn først en passende type, og kontroller deretter sluttprisen direkte hos tilbyderen.',
    notRanking:
      'Rekkefølgen er nøytral. Den er verken en kvalitetsvurdering eller en betalt anbefaling.',
    noJs:
      'Uten JavaScript er alle overnattingstyper og kontrollister fortsatt synlige. Bare de interaktive filtrene mangler.',
    scenarioLabels: {
      'operator-benefits-priority': 'Prioriter tidlig inngang og transport i resortet',
      'park-and-rulantica-without-car': 'Kombiner Europa-Park og Rulantica uten egen bil',
      'own-motorhome-or-caravan': 'Reis med egen bobil eller campingvogn',
      'own-tent': 'Overnatt i eget telt',
      'large-group-themed-stay': 'Temaovernatting for familie, forening eller gruppe',
      'self-catering-filter': 'Bruk selvhushold som utvalgskriterium',
      'walkability-filter': 'Filtrer overnatting etter gangvei til hovedinngangen',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park opplevelseshotell',
        definition:
          'Ett av de seks 4-stjerners opplevelseshotellene, inkludert Superior, som drives av resortet.',
        mustVerify: [
          'fordeler på den konkrete reisedatoen',
          'hvilke attraksjoner som faktisk er åpne ved tidlig inngang',
          'romkapasitet og universell utforming',
          'om inngangsbilletter inngår i den valgte pakken eller må kjøpes separat',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Romovernatting i Silver Lake City med en egen profil av gjestefordeler.',
        mustVerify: [
          'gjeldende rutetabell for Rust-bussen',
          'fordeler på den konkrete reisedatoen',
          'romkapasitet og universell utforming',
          'mulige perioder med arrangementsstøy i Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Temaovernatting for grupper og familier i tipier, prærievogner, tømmerhytter og Western Houses.',
        mustVerify: [
          'sanitær- og sengeoppsett i den valgte kategorien',
          'om frokost er obligatorisk eller kan bestilles som tillegg',
          'fordeler på den konkrete reisedatoen',
          'mulige perioder med arrangementsstøy',
          'om lengden på køyesengene passer de reisende',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Oppstillingsplasser i Silver Lake City for bobiler og campingvogner.',
        mustVerify: [
          'kjøretøyets mål og riktig plasskategori',
          'vilkår for strøm og vann i den konkrete bestillingen',
          'tider for ankomst, ro og avreise',
          'gjeldende fordeler og rutetabell for Rust-bussen',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Teltplass i Silver Lake City for gjester som har med eget telt.',
        mustVerify: [
          'regler for telt og teltplass',
          'behov for strøm og tilkoblingsvilkår',
          'sanitær- og frokostalternativer',
          'vær, roperioder og gjeldende gjestefordeler',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Uavhengig hotell eller gjestehus i Rust',
        definition:
          'Overnatting som drives uavhengig innenfor Rust kommune.',
        mustVerify: [
          'gjeldende drifts- og bestillingstilgjengelighet',
          'faktisk gangvei til inngangen du skal bruke',
          'frokost, parkering, avbestilling og universell utforming',
          'ikke forutsett fordeler som gjelder resorthotellene',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Uavhengig ferieleilighet i Rust',
        definition:
          'Uavhengig overnatting oppført som ferieleilighet av Rust kommune.',
        mustVerify: [
          'kjøkken- og spiseplassutstyr i stedet for å utlede det fra kategorien',
          'faktisk gangvei til inngangen du skal bruke',
          'minste oppholdslengde, sluttrengjøring, parkering og avbestilling',
          'gjeldende registrering og tilgjengelighet',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Overnatting i en nabokommune',
        definition:
          'Uavhengig overnatting i en kommune i Europa-Park-opplevelsesregionen utenfor Rust.',
        mustVerify: [
          'forbindelsen på den aktuelle ukedagen og ved stengetid i parken',
          'siste returavgang og eventuelle bytter',
          'parkering ved reisemålet og overnattingsstedet',
          'gjeldende drifts- og bestillingstilgjengelighet',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Kontrollert oversikt',
    title: 'Sammenlign mindre restauranter i Rust på et saklig grunnlag',
    intro:
      'Søk i åtte redaksjonelt kontrollerte katalogoppføringer. Bare dokumenterte egenskaper vises. Vi påstår ingenting om kvalitet, prisnivå eller ledige bord.',
    filtersLabel: 'Filtrer restauranter',
    searchLabel: 'Navn eller adresse',
    searchPlaceholder: 'For eksempel Adler eller Fischerstraße',
    statusLabel: 'Kontrollstatus',
    allStatuses: 'Alle kontrollstatuser',
    statuses: {
      first_party_verified: 'Dokumentert av tilbyderens egen kilde',
      public_directory_verified: 'Dokumentert i kommunal oversikt',
      license_page_verified: 'Dokumentert via lisensside',
      needs_reverification: 'Må kontrolleres på nytt',
    },
    timeLabel: 'Dokumentert tidsrom',
    allTimes: 'Alle dokumenterte tidsrom',
    timeSlots: {
      breakfast: 'Frokost',
      evening: 'Kveldsservering',
    },
    distanceLabel: 'Dokumentert avstand',
    allDistances: 'Alle dokumenterte avstander',
    distanceOptions: [
      { maxMetres: 500, label: 'Opptil 500 m' },
      { maxMetres: 1000, label: 'Opptil 1 km' },
      { maxMetres: 2000, label: 'Opptil 2 km' },
    ],
    needsLabel: 'Dokumenterte behov',
    familyFeatures: {
      kids_menu: 'Barnemeny oppgitt',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetariske alternativer dokumentert',
      vegan_evidence: 'Veganske alternativer dokumentert',
      gluten_free_evidence: 'Glutenfrie alternativer dokumentert',
    },
    reset: 'Nullstill filtre',
    resultsLabel: 'Kontrollerte katalogoppføringer',
    resultSingular: 'restaurant',
    resultPlural: 'restauranter',
    noJs:
      'Uten JavaScript er alle oppføringer, kilder og usikkerheter fortsatt lesbare. Bare søk og filtre mangler.',
    emptyTitle: 'Ingen oppføring passer til disse filtrene',
    emptyText:
      'Fjern et filter. Manglende treff kan også bety at egenskapen ennå ikke er pålitelig dokumentert.',
    serviceEvidence: 'Dokumentert tilbud',
    cuisineEvidence: 'Dokumentert matprofil',
    filterEvidence: 'Dokumentasjon for filter',
    evidenceCheckedAt: 'Filterdokumentasjon kontrollert',
    source: 'Primærkilde',
    operatorWebsite: 'Tilbyderens nettsted',
    corroboratingSource: 'Supplerende kilde',
    uncertaintyTitle: 'Dette må fortsatt avklares før besøket',
    verificationNote: 'Kontrollmerknad',
    checkedAt: 'Oppføring kontrollert',
    reviewDue: 'Ny kontrolldato er passert',
    notRecommendation: 'Ikke en anbefaling',
    notRecommendationTitle: 'Nøytral oversikt, ingen toppliste',
    notRecommendationText:
      'Oppføring og rekkefølge er ingen kvalitetsvurdering. Kontroller åpningstider, meny, allergener og reservasjon direkte hos spisestedet.',
    unavailableEvidenceTitle: 'Disse filtrene viser vi bevisst ikke',
    unavailableEvidence: {
      time: 'Tidsrommene er ennå ikke dokumentert på en tilstrekkelig enhetlig måte.',
      distance: 'Avstandene er ennå ikke målt med en konsekvent rute.',
      family: 'Familieegenskaper er ennå ikke tilstrekkelig dokumentert.',
      diet: 'Vegetariske, veganske og glutenfrie alternativer er ennå ikke registrert pålitelig nok.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['tradisjonell husmannskost'],
        serviceEvidence: ['kveldsservering ifølge tilbyderens nettsted'],
        verificationNote:
          'Tilbyderens nettsted og side med juridisk informasjon var tilgjengelige. Adresse, kontakt, matprofil og gjeldende åpningsinformasjon ble vist på kontrolldagen.',
        uncertainties: [
          'Ekstraordinære åpningstider og ferie varierer med dato.',
          'Ledige bord for reservasjon ble ikke kontrollert.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regionale og internasjonale retter',
          'burgere, spareribs, pasta og biff ifølge tilbyderen',
        ],
        serviceEvidence: [
          'frokost ifølge tilbyderens nettsted',
          'kveldsservering ifølge tilbyderens nettsted',
        ],
        verificationNote:
          'Tilbyderens nettsted var tilgjengelig og oppga adresse, matprofil og frokosttilbud.',
        uncertainties: [
          'Direkte åpningsstatus på nettstedet kan endres på kort varsel.',
          'Tilbyderens egen omtale og innebygde vurderinger ble ikke brukt som kvalitetsbevis.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['italiensk mat'],
        serviceEvidence: ['kveldsservering ifølge den kommunale oversikten'],
        verificationNote:
          'Tilbyderens nettsted bekrefter virksomheten, adressen og den italienske restauranten. Den kommunale oversikten gir en oppdatert ramme for åpningstidene.',
        uncertainties: [
          'Bekreft åpningstidene på tilbyderens nettsted eller per telefon før besøket.',
          'Gangtiden til parken som tilbyderen oppgir, er ikke målt uavhengig.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['gresk og internasjonal mat'],
        serviceEvidence: ['barnemeny ifølge tilbyderens nettsted'],
        verificationNote:
          'Tilbyderens nettsted var tilgjengelig og bekreftet adresse, matprofil og reservasjonskontakt.',
        uncertainties: [
          'Det lesbare innholdet på nettstedet oppgir ingen stabile ukentlige åpningstider.',
          'Ledige bord ble ikke kontrollert.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['badisk mat', 'regionale retter'],
        serviceEvidence: ['kveldsservering ifølge tilbyderens nettsted'],
        verificationNote:
          'Tilbyderens nettsted var tilgjengelig og oppga adresse, badisk matprofil og gjeldende ukerytme.',
        uncertainties: [
          'Kontroller ferie og fast stengedag på nytt før besøket.',
          'Ingen påstander om allergivennlighet uten direkte forespørsel.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['matretning ikke entydig oppgitt i primærkilden'],
        serviceEvidence: ['kveldsservering ifølge tilbyderens nettsted'],
        verificationNote:
          'Tilbyderens nettsted og den kommunale oppføringen bekrefter virksomheten, adressen og kontakten. Markedsføringspåstander ble ikke tatt med.',
        uncertainties: [
          'Kontroller matretningen manuelt mot den gjeldende menyen før redaksjonell kategorisering.',
          'Tilbyderens nettsted oppgir andre åpningstider enn tredjepartsplattformer. Bruk bare tilbyderens egne opplysninger.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['matretning ikke oppgitt i den kommunale oversikten'],
        serviceEvidence: ['terrasse ifølge den kommunale oversikten'],
        verificationNote:
          'Restauranten står i den gjeldende kommunale oversikten. Det lenkede nettstedet beskriver først og fremst pensjonatet og bekrefter ingen restaurantdetaljer.',
        uncertainties: [
          'Bekreft driftsstatus, matretning og åpningstider direkte hos virksomheten.',
          'Ikke fremhev stedet som en redaksjonelt kontrollert restaurant før direkte bekreftelse foreligger.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['matretning ikke oppgitt i den kommunale oversikten'],
        serviceEvidence: ['levering ifølge den kommunale oversikten'],
        verificationNote:
          'Bare funnet i den kommunale oversikten. Vi fant ingen pålitelig egen nettside på kontrolldagen.',
        uncertainties: [
          'Bekreft driftsstatus, kontakt, matretning og åpningstider direkte.',
          'Ikke ta stedet med i anbefalinger eller rangeringer for brukerne før tilbyderens egen kilde er kontrollert.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'ResortPass-veileder',
    title: 'Sjekk status, ytelser og reelle kostnader samlet',
    intro:
      'Direktestatusen svarer på om kortet kan kjøpes. Sammenligningen og kalkulatoren hjelper deg deretter å velge mellom dagsbilletter, Silver og Gold.',
    statusTitle: 'Gjeldende salgsstatus',
    statusChecking: 'Kontrollerer status …',
    statusAvailable: 'Offisielt tilgjengelig nå',
    statusUnavailable: 'Ikke tilgjengelig for øyeblikket',
    statusUnknown: 'Status er uklar akkurat nå',
    statusError: 'Kunne ikke hente direktestatus',
    lastChecked: 'Sist kontrollert',
    comparisonTitle: 'Kort om Silver og Gold',
    feature: 'Egenskap',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Pris for voksne',
    concessionPrice: 'Barn 4–11 år / seniorer fra 60 år',
    visitDays: 'Besøksdager',
    visitDaysSilver: 'Fastsatte, publiserte besøksdager',
    visitDaysGold: 'Større fleksibilitet etter gjeldende vilkår',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Ikke inkludert som standardytelse',
    rulanticaGold: 'To dagsbilletter etter gjeldende vilkår',
    flexibility: 'Planleggingsprofil',
    flexibilitySilver: 'For datoer som kan planlegges tidlig',
    flexibilityGold: 'For hyppigere eller mer spontane besøk',
    calculatorTitle: 'Enkel kostnadssammenligning for voksne',
    calculatorIntro:
      'Sammenlign de sist dokumenterte kortprisene med et selvvalgt antall dagsbesøk i Europa-Park og Rulantica.',
    visitsLabel: 'Besøk i Europa-Park',
    rulanticaVisitsLabel: 'Dagsbesøk i Rulantica',
    priceScenarioLabel: 'Prisscenario for dagsbillett',
    lowerPriceScenario: 'Nedre dokumenterte prisintervall',
    upperPriceScenario: 'Øvre dokumenterte prisintervall',
    calculate: 'Oppdater sammenligningen',
    dayTicketsCost: 'Separate dagsbilletter',
    silverCost: 'Silver pluss billetter til Rulantica',
    goldCost: 'Gold med to inkluderte dager i Rulantica',
    lowestCost: 'Laveste beregnede beløp',
    estimateDisclaimer:
      'Veiledende beregning for én voksen, uten kjøps- eller tilgjengelighetsgaranti. Sperredager, reservasjoner, rabatter, reise og ytelser som ikke brukes, kan endre valget.',
    linksTitle: 'Få svar på neste spørsmål',
    compareLink: 'Sammenlign Silver og Gold',
    pricesLink: 'Sjekk ResortPass-prisene',
    reservationLink: 'Forstå reservasjonen',
    rulanticaLink: 'ResortPass og Rulantica',
  },
};
