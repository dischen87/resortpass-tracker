import type { PlanningLocalePack } from '../planning-types';

export const csPlanning = {
  "common": {
    "skip": "Přejít na obsah",
    "menu": "Menu",
    "language": "Vyberte jazyk",
    "home": "Domů",
    "plannerLabel": "Naplánujte svou návštěvu",
    "answerLabel": "Krátká odpověď",
    "updatedLabel": "Zkontrolováno",
    "sourcePrefix": "Zdroj",
    "onThisPage": "Na této stránce",
    "relatedTitle": "Doporučené další kroky",
    "sourcesTitle": "Zdroje a aktuálnost",
    "sourcesIntro": "Údaje, které se mohou měnit, pocházejí ze zdrojů provozovatele a z veřejných institucí. Před rezervací znovu zkontrolujte ceny, otevírací hodiny a pravidla v propojeném primárním zdroji.",
    "correctionLabel": "Jsou některé údaje nesprávné?",
    "correctionText": "Dejte nám vědět, pokud najdete neaktuální informace. Jasně rozlišujeme mezi dokumentovanými fakty, výpočtovými předpoklady a redakčním hodnocením.",
    "unofficial": "Nezávislý komunitní projekt",
    "footerText": "Nezávislý průvodce plánováním bez vazby na Europa-Park.",
    "overview": "Shrnutí",
    "tool": "Plánovací nástroj",
    "decisions": "Pomoc při rozhodování",
    "faq": "Často kladené otázky",
    "notRecommendation": "Informační přehled, nikoli doporučení",
    "verifyBeforeVisit": "Potvrďte přímo u poskytovatele před návštěvou"
  },
  "navigation": {
    "parkGuide": "Europa-Park",
    "visitPlanner": "1 nebo 2 dny",
    "costCalculator": "Náklady",
    "familyGuide": "Rodiny",
    "rulanticaGuide": "Rulantica",
    "stayGuide": "Ubytování",
    "restaurantGuide": "Jídlo v Rustu",
    "resortPassGuide": "ResortPass"
  },
  "pages": {
    "parkGuide": {
      "title": "Jak naplánovat Europa-Park: nezávislý průvodce s kalkulačkami",
      "description": "Naplánujte si prakticky návštěvu Europa-Park: 1 nebo 2 dny, náklady, rodiny, Rulantica, ubytování a restaurace v Rust s interaktivními nástroji.",
      "eyebrow": "Plánovací centrum Europa-Park",
      "heading": "Plánujte Europa-Park podle svých skutečných potřeb",
      "answer": "Pro první návštěvu je celý den minimum; dva dny bývají klidnější, zejména s dětmi, při návštěvě představení nebo vysoké návštěvnosti. Plán založte na datu, složení skupiny a rozpočtu, ne na obecném žebříčku 10 nejlepších atrakcí.",
      "sectionTitle": "Od otázek k realistickému plánu návštěvy",
      "sectionIntro": "Nástroje propojují vaši situaci s aktuálními údaji. Nenahrazují oficiální rezervaci, ale pomáhají vyhnout se nejdůležitějším chybným rozhodnutím před cestou.",
      "points": [
        {
          "title": "Nejprve rozhodněte o čase",
          "text": "Zvažte čas příjezdu, prioritní atrakce a očekávanou návštěvnost, abyste rozhodli, zda je vhodné strávit v parku jeden nebo dva dny.",
          "icon": "tabler:calendar-time"
        },
        {
          "title": "Celkové náklady, nejen vstupné",
          "text": "Sečtěte vstupenky do parku a Rulantica, parkování a ubytování jako cenové rozpětí, nikoli jako zavádějící pevnou cenu.",
          "icon": "tabler:calculator"
        },
        {
          "title": "Přizpůsobte trasu skupině",
          "text": "Výška, věk, potřeba přestávek a zájmy mají větší vliv na dobrý výlet než celkové hodnocení.",
          "icon": "tabler:route"
        }
      ],
      "faqs": [
        {
          "question": "Kolik dní je potřeba k návštěvě Europa-Park?",
          "answer": "Jeden celý den může stačit na výběr hlavních atrakcí. Pro první návštěvu, rodiny, představení a méně uspěchané tempo jsou realističtější dva dny."
        },
        {
          "question": "Je tato webová stránka oficiální?",
          "answer": "Ne. ResortPass Tracker je nezávislý komunitní projekt. Informace o vstupu, bezpečnosti a platných pravidlech si vždy ověřte v oficiálních zdrojích Europa-Park."
        },
        {
          "question": "Proč kalkulačka ukazuje cenové rozpětí?",
          "answer": "Europa-Park a Rulantica aplikují online ceny podle data. Dokud nevyberete konkrétní den v oficiálním obchodě, je rozpětí čestnější."
        }
      ]
    },
    "visitPlanner": {
      "title": "Europa-Park za 1 nebo 2 dny? Interaktivní plánovač",
      "description": "Stačí na Europa-Park jeden den? Vytvořte si denní plán podle data, skupiny, času příjezdu, návštěvnosti a návštěvy Rulantica.",
      "eyebrow": "1 nebo 2 dny",
      "heading": "Kolik dní potřebujete na Europa-Park?",
      "answer": "Jeden den stačí, pokud dorazíte brzy a máte jasné priority. Dva dny jsou jistější volbou pro rodiny, představení a více tematických oblastí; společně s Rulantica je obvykle vhodné vyhradit si celkem dva až tři dny.",
      "sectionTitle": "Co opravdu mění délku návštěvy",
      "sectionIntro": "Ne všechny skupiny potřebují stejnou trasu. Nejprve naplánujte bloky času a priority; skutečné čekací doby určí přesné pořadí v den návštěvy.",
      "points": [
        {
          "title": "Jeden den: vybírejte pečlivě",
          "text": "Začněte hned při otevření, vyberte si tři až pět hlavních cílů a připravte si alternativy v blízkých tematických oblastech.",
          "icon": "tabler:number-1"
        },
        {
          "title": "Dva dny: rozdělte park",
          "text": "Rozdělte velké atrakce, nabídku pro rodiny a představení mezi dvě oblasti parku, aby se snížily přesuny a opakování.",
          "icon": "tabler:number-2"
        },
        {
          "title": "Vysoká návštěvnost: nechte si rezervu",
          "text": "Rezervujte si čas na jídlo, technické poruchy a přesuny. Aktuální čekací doby pomáhají plán přímo upravit na místě.",
          "icon": "tabler:clock-hour-4"
        }
      ],
      "faqs": [
        {
          "question": "Lze vidět Europa-Park za jeden den?",
          "answer": "Můžete si užít mnoho hlavních atrakcí, ale jen zřídka všechny. Plánovač zohledňuje příjezd, skupinu a návštěvnost a doporučuje více času, pokud jsou podmínky nepříznivé."
        },
        {
          "question": "Je vhodné navštívit Rulantica ve stejný den?",
          "answer": "Večerní vstup může vyhovovat dospělým nebo starším dětem, které mají rády vodu. U malých dětí nebo pokud je vodní zóna prioritou, je samostatný den pohodlnější."
        },
        {
          "question": "Zaručuje plán konkrétní čekací doby?",
          "answer": "Ne. Počasí, poruchy a skutečná návštěvnost mohou plán změnit. Podívejte se na oficiální aplikaci a aktuální čekací doby v den návštěvy."
        }
      ]
    },
    "costCalculator": {
      "title": "Kalkulačka nákladů Europa-Park 2026: vstupenky, parkování a hotel",
      "description": "Vypočítejte realistické cenové rozpětí návštěvy Europa-Park podle počtu dospělých, dětí, 1 nebo 2 dnů, Rulantica, parkování a ubytování.",
      "eyebrow": "Celkové náklady",
      "heading": "Kolik celkem stojí vaše návštěva Europa-Park?",
      "answer": "Vstupenka je pouze část rozpočtu. Kalkulačka kombinuje cenová rozpětí vstupenek podle data s parkováním, Rulantica a vaším rozpočtem na ubytování a záměrně zobrazuje minimum i maximum.",
      "sectionTitle": "Jak převést ceny na užitečný rozpočet",
      "sectionIntro": "Používáme oficiální cenová rozpětí, ale nevymýšlíme ceny hotelů. Ubytování, jídlo a dopravu zadáváte jako vlastní odhad.",
      "points": [
        {
          "title": "Ceny podle data jako rozpětí",
          "text": "Bez konkrétního data návštěvy je cenové rozpětí spolehlivější než jediná propagační cena.",
          "icon": "tabler:arrows-horizontal"
        },
        {
          "title": "Rodinný rozpočet na osobu",
          "text": "Celková částka a částka na osobu usnadňují porovnání mezi možnostmi 1 a 2 dnů.",
          "icon": "tabler:users"
        },
        {
          "title": "Předpoklady vždy viditelné",
          "text": "Ubytování a dodatečné náklady jsou zobrazeny samostatně, abyste mohli každý předpoklad nahradit.",
          "icon": "tabler:list-details"
        }
      ],
      "faqs": [
        {
          "question": "Jsou ceny z kalkulačky garantovány?",
          "answer": "Ne. Jde o oficiální cenová rozpětí s uvedeným datem kontroly. Konečnou cenu mohou ovlivnit dostupnost, datum, administrativní poplatky a způsob rezervace."
        },
        {
          "question": "Proč se nepoužívá průměrná cena hotelu?",
          "answer": "Ceny ubytování velmi závisí na datu, obsazenosti a podmínkách storna. Proto zadáváte sami skutečnou cenu, kterou jste ověřili."
        },
        {
          "question": "Jsou jídlo a cesta zahrnuty?",
          "answer": "Nezapočítávají se automaticky. Tyto náklady se výrazně liší podle místa odjezdu a vašich zvyklostí, proto si ponechte vlastní finanční rezervu."
        }
      ]
    },
    "familyGuide": {
      "title": "Europa-Park s dětmi: vyhledávač podle výšky a rodinného plánu",
      "description": "Plánujte Europa-Park s kojenci, batolaty nebo školáky: filtrujte atrakce podle věku a výšky, určete, kdy potřebují doprovod, a organizujte přestávky.",
      "eyebrow": "Rodiny a děti",
      "heading": "Které atrakce jsou vhodné pro vaše dítě?",
      "answer": "U mnoha atrakcí se současně zohledňuje věk i výška. Použijte vyhledávač jako předvýběr a vždy si tam ověřte měřidlo, cedule a pokyny personálu.",
      "sectionTitle": "Rodinný plán je více než seznam atrakcí",
      "sectionIntro": "Přestávky, jídlo, přebalování, sourozenci různé výšky a případná pravidla doprovodu ovlivňují trasu stejně jako oblíbené atrakce.",
      "points": [
        {
          "title": "Kombinujte věk a výšku",
          "text": "Vyhledávač rozlišuje mezi minimálními požadavky a případnou potřebou doprovodu dospělé osoby podle oficiálních stránek každé atrakce.",
          "icon": "tabler:ruler-measure"
        },
        {
          "title": "Plánujte klidné bloky",
          "text": "Kryté atrakce, herní zóny a představení poslouží jako odpočinek mezi intenzivnějšími zážitky.",
          "icon": "tabler:zzz"
        },
        {
          "title": "Zkontrolujte to znovu na místě",
          "text": "Bezpečnostní předpisy se mohou měnit a závazné pokyny jsou zobrazeny u vstupu každé atrakce.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Stačí splnit výšku?",
          "answer": "Ne. Některé atrakce vyžadují také minimální věk nebo doprovod dospělého až do určitého věku či výšky."
        },
        {
          "question": "Zaručí vyhledávač, že může nastoupit?",
          "answer": "Ne. Platí aktuální pravidla, měření a personál parku. Zdraví, fyzická kondice, těhotenství nebo technické změny mohou představovat další omezení."
        },
        {
          "question": "Co je to Baby-Switch?",
          "answer": "U určitých atrakcí se mohou osoby zodpovědné za dítě střídat při jízdě. Zeptejte se přímo na atrakci, jak to funguje v každém případě."
        }
      ]
    },
    "rulanticaGuide": {
      "title": "Jak naplánovat Rulantica: celý den, večerní vstup, nebo kombinace?",
      "description": "Zkombinujte Rulantica a Europa-Park: interaktivní pomoc s výběrem denního, večerního nebo Moonlight vstupu podle dětí, výbavy a délky pobytu.",
      "eyebrow": "Europa-Park + Rulantica",
      "heading": "Jak zapadá Rulantica do vašeho výletu?",
      "answer": "Celý den v Rulantica je nejpohodovější volbou pro rodiny a fanoušky vodních parků. Večerní vstupenky nebo Moonlight se hodí spíše jako doplněk, pokud to věk a energie skupiny dovolí.",
      "sectionTitle": "Vyberte čas vstupu podle svého cíle",
      "sectionIntro": "Vodní park je obvykle otevřen až do večera. Rozhodující je, zda Rulantica je hlavním cílem nebo jen doplňkem po návštěvě parku.",
      "points": [
        {
          "title": "Denní vstup",
          "text": "Více času pro dětské zóny, skluzavky, pauzy a sezónní venkovní oblasti, zejména pokud věnujete celý den Rulantica.",
          "icon": "tabler:sun"
        },
        {
          "title": "Večerní nebo Moonlight",
          "text": "Méně času a obvykle nižší cena, ale také méně energie k dispozici po dlouhém dni v parku.",
          "icon": "tabler:moon-stars"
        },
        {
          "title": "Věnujte pozornost seznamu věcí k zabalení",
          "text": "Vezměte si ručník a plavky a zjistěte předem platná pravidla; návštěvníci pouze na jeden den nemohou počítat s tím, že si ručník půjčí improvizovaně.",
          "icon": "tabler:backpack"
        }
      ],
      "faqs": [
        {
          "question": "Stačí večerní vstupenka do Rulantica?",
          "answer": "Může stačit na několik skluzavek nebo jako krátké zakončení dne. Rodiny s malými dětmi a návštěvníci, kteří chtějí využít více zón, obvykle lépe využijí celý den."
        },
        {
          "question": "Je možné navštívit Europa-Park a Rulantica ve stejný den?",
          "answer": "Technicky ano, ale kombinace je náročná a vyžaduje velké prioritizování. Nástroj bere v úvahu dny v parku, děti a požadované tempo."
        },
        {
          "question": "Je možné si půjčit ručníky v Rulantica?",
          "answer": "Podle oficiálních častých dotazů neexistuje běžná služba půjčování ručníků pro návštěvníky na jeden den. Vezměte si svůj vlastní a zkontrolujte informace znovu před odchodem."
        }
      ]
    },
    "stayGuide": {
      "title": "Ubytování poblíž Europa-Park: porovnat hotel, Rust a okolí",
      "description": "Porovnejte, kde spát poblíž Europa-Park: tematický hotel, penzion, apartmán, kemp a okolí podle úspory času, kuchyně a dopravy.",
      "eyebrow": "Ubytování",
      "heading": "Jaké ubytování odpovídá vašemu plánu návštěvy?",
      "answer": "Nejlepší ubytování závisí nejen na ceně pokoje. Porovnejte ranní přístup, vzdálenosti, dopravu, vlastní kuchyni, storno podmínky a celkové náklady skupiny.",
      "sectionTitle": "Scénáře místo libovolného hodnocení hotelů",
      "sectionIntro": "Srovnání ukazuje typy ubytování a aspekty, které je třeba ověřit. Úmyslně se vyhýbá neověřeným cenám a hodnocením konkrétních zařízení.",
      "points": [
        {
          "title": "Výhody resortu",
          "text": "Oficiální tematické hotely mohou nabízet ranní přístup a dopravu; ověřte si pro své datum, zda se to vztahuje a které atrakce budou otevřené.",
          "icon": "tabler:sparkles"
        },
        {
          "title": "Rust a ubytování s kuchyní",
          "text": "Penziony a apartmány mohou nabízet krátké vzdálenosti nebo kuchyňku, ale musíte si ověřit každou službu u konkrétního zařízení.",
          "icon": "tabler:building-cottage"
        },
        {
          "title": "Okolí a doprava",
          "text": "Nižší cena pokoje se nemusí vyplatit, pokud se připočítá parkování, poslední autobus a další cesty.",
          "icon": "tabler:bus"
        }
      ],
      "faqs": [
        {
          "question": "Jsou oficiální hotely Europa-Park vždy tou nejlepší volbou?",
          "answer": "Ne. Jsou dobrou volbou, když záleží na výhodách resortu a pohodlí. Pro vaření, velké skupiny nebo jiný rozpočet může být lepší samostatné ubytování."
        },
        {
          "question": "Ukazuje srovnání aktuální ceny hotelů?",
          "answer": "Ne. Spolehlivá cena vyžaduje data, obsazenost a rezervační podmínky. Proto kalkulačka nákladů používá cenu ubytování, kterou jste ověřili."
        },
        {
          "question": "Jaká místa kromě Rust je vhodné zvážit?",
          "answer": "Mezi jinými Ringsheim, Herbolzheim a další obce v Erlebnisregion. Rozhodující je konkrétní spojení a poslední možnost návratu v den návštěvy."
        }
      ]
    },
    "restaurantGuide": {
      "title": "Restaurace v Rust po návštěvě Europa-Park: ověřený přehled",
      "description": "Najděte restaurace v Rust na večeři: neutrální profily s ověřenými zdroji, typem kuchyně, nabídkou, nejasnostmi a přímými odkazy.",
      "eyebrow": "Jídlo v Rust",
      "heading": "Kde si můžete dát večeři v Rust po zavření parku?",
      "answer": "Adresář není žebříčkem nejlepších podniků. Zobrazuje restaurace s dohledatelným primárním nebo obecním zdrojem a uvádí, které otevírací doby, rezervace a dietní požadavky je třeba potvrdit přímo.",
      "sectionTitle": "Užitečnější než neověřený žebříček restaurací",
      "sectionIntro": "Otevírací doba a dny pracovního klidu se mění. Proto u každé karty oddělujeme doložený typ kuchyně, informace o nabídce a dosud neověřené otázky.",
      "points": [
        {
          "title": "Zdroje místo hvězd",
          "text": "Nepoužíváme hodnocení platforem jako důkaz kvality, ale propojujeme stránky zařízení a města.",
          "icon": "tabler:source-code"
        },
        {
          "title": "Doložená nabídka večeří",
          "text": "Filtr používá pouze doložené informace o nabídce. Skutečnou provozní dobu kuchyně je přesto nutné potvrdit pro konkrétní den návštěvy.",
          "icon": "tabler:clock"
        },
        {
          "title": "Žádné vymyšlené potravinové filtry",
          "text": "Uvádíme pouze veganské, bezlepkové nebo alergiím vhodné možnosti, pokud existují aktuální a spolehlivé údaje.",
          "icon": "tabler:salad"
        }
      ],
      "faqs": [
        {
          "question": "Jsou restaurace v adresáři doporučení?",
          "answer": "Ne. Záznam pouze znamená, že se podnik objevuje v dohledatelném zdroji. Nehodnotili jsme chuť, kvalitu ani dostupnost stolů."
        },
        {
          "question": "Je otevírací doba zaručená?",
          "answer": "Ne. Mimořádná otevírací doba, svátky a provozní doba kuchyně se mohou změnit na poslední chvíli. Ověřte je na webu podniku nebo předem zavolejte."
        },
        {
          "question": "Proč se nezobrazují vzdálenosti?",
          "answer": "Spolehlivý pěší čas závisí na skutečném výchozím bodě a trase. Tyto údaje doplníme, až bude prověřeno přes mapy nebo přímo na místě."
        }
      ]
    },
    "resortPassGuide": {
      "title": "Europa-Park ResortPass 2026: dostupnost, ceny a pravidla",
      "description": "Pochopte ResortPass Silver a Gold: stav prodeje, ceny, dny návštěvy, rezervace, Rulantica a nezávislé upozornění na dostupnost.",
      "eyebrow": "Průvodce ResortPass",
      "heading": "Vše důležité o Europa-Park ResortPass",
      "answer": "Silver a Gold nejsou momentálně k dispozici pro běžný prodej a nebylo oznámeno nové datum. Silver je levnější a je vázán na určené dny; Gold je flexibilnější a obsahuje další výhody u Rulantica.",
      "sectionTitle": "Vyberte si roční vstup podle použití",
      "sectionIntro": "Cena není to jediné, co je důležité. Důležitější jsou možné dny návštěvy, flexibilita, využití Rulantica a skutečná dostupnost vstupenky.",
      "points": [
        {
          "title": "Nejdříve dostupnost",
          "text": "Tracker pravidelně kontroluje oficiální obchod a rozlišuje skutečný prodej od oznámení nebo čekací listiny.",
          "icon": "tabler:bell-ringing"
        },
        {
          "title": "Silver nebo Gold",
          "text": "Silver má stanovené dny návštěvy; Gold nabízí větší flexibilitu a zahrnuje dva celodenní vstupy pro Rulantica.",
          "icon": "tabler:scale"
        },
        {
          "title": "Zkontrolujte pravidla na portálu",
          "text": "Rezervace, vyjmuté dny a podmínky se mohou změnit, proto je ověřte ve zdroji před nákupem.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Kdy bude ResortPass opět k prodeji?",
          "answer": "V současné době nebylo oznámeno nové datum prodeje. Tracker vás upozorní, až budou Silver nebo Gold skutečně dostupné v oficiálním obchodě."
        },
        {
          "question": "Kolik stojí ResortPass?",
          "answer": "Podle poslední oficiální kontroly stojí Silver 325 eur pro dospělé a 275 eur pro děti a seniory; Gold stojí 495 eur, respektive 430 eur."
        },
        {
          "question": "Je tracker propojený s Europa-Park?",
          "answer": "Ne. Jedná se o nezávislý komunitní projekt. Nákup, smlouva a závazné služby se řeší výhradně s oficiálními poskytovateli."
        }
      ]
    },
    "resortPassCompare": {
      "title": "ResortPass Silver nebo Gold? Porovnání a pomoc s výběrem",
      "description": "Porovnejte ResortPass Silver a Gold podle ceny, počtu dnů návštěvy, flexibility, Rulantica a situací použití.",
      "eyebrow": "Silver versus Gold",
      "heading": "Který ResortPass odpovídá tvému způsobu návštěvy parku?",
      "answer": "Silver sedne lépe, pokud ti vyhovují stanovené dny a převládá nižší cena. Gold se více vyplatí, pokud hledáš maximální flexibilitu a skutečně využiješ zahrnuté dny Rulantica.",
      "sectionTitle": "Dražší průkaz není automaticky lepší",
      "sectionIntro": "Porovnej své skutečné dny návštěvy a další výhody. Flexibilita nebo nevyužité Rulantica vstupy nemají hodnotu.",
      "points": [
        {
          "title": "Silver: nejnižší cena s plánováním",
          "text": "Vhodné, pokud si můžete předem stanovit termíny a zveřejněné dny vám vyhovují v kalendáři.",
          "icon": "tabler:calendar-check"
        },
        {
          "title": "Gold: větší flexibilita",
          "text": "Vhodné pro častější spontánní návštěvy a pro ty, kdo budou používat oba denní vstupy Rulantica, které jsou zahrnuty.",
          "icon": "tabler:crown"
        },
        {
          "title": "Porovnejte s denními vstupy",
          "text": "Vypočítejte počet návštěv, které skutečně podniknete, a porovnejte je s cenami vstupenek podle data.",
          "icon": "tabler:calculator"
        }
      ],
      "faqs": [
        {
          "question": "Má Silver vyjmuté dny?",
          "answer": "Silver je platný v předem definovaných otevíracích dnech. Aktuální seznam na oficiálních stránkách a portálu ResortPass je rozhodující."
        },
        {
          "question": "Zahrnuje Gold vstupy do Rulantica?",
          "answer": "Podle aktuálních informací provozovatele Gold zahrnuje dva jednodenní vstupy do Rulantica. Před jejich využitím si oficiálně potvrďte podmínky a rezervaci."
        },
        {
          "question": "Od kolika návštěv se průkaz vyplatí?",
          "answer": "Záleží na skutečných datech, cenách jednodenních vstupenek a dalších využívaných výhodách. Poskytnout jediné číslo by bylo zavádějící."
        }
      ]
    },
    "resortPassPrices": {
      "title": "Ceny ResortPass 2026: Silver, Gold a jednodenní vstupenky",
      "description": "Aktuální ceny ResortPass pro dospělé, děti a seniory ve srovnání s jednodenními vstupenkami Europa-Park podle data.",
      "eyebrow": "Ceny 2026",
      "heading": "Kolik stojí ResortPass, Silver a Gold?",
      "answer": "Poslední oficiální kontrola: Silver stojí 325 eur pro dospělé a 275 eur pro děti a seniory; Gold stojí 495 eur, respektive 430 eur. Ani jeden není aktuálně dostupný v běžném prodeji.",
      "sectionTitle": "Zvaž cenu spolu s využitím",
      "sectionIntro": "Denní vstupenky mají cenové rozpětí podle data. Proto se roční vstupenka nevyplatí od univerzální částky, ale podle tvých skutečných dat.",
      "points": [
        {
          "title": "Silver",
          "text": "325 eur pro dospělé; 275 eur pro děti od 4 do 11 let a osoby ve věku 60 a více let. Vezměte v úvahu datum primárního zdroje.",
          "icon": "tabler:circle-letter-s"
        },
        {
          "title": "Gold",
          "text": "495 eur pro dospělé; 430 eur pro děti a seniory, s dalšími výhodami jako dva dny Rulantica.",
          "icon": "tabler:circle-letter-g"
        },
        {
          "title": "Dostupnost je nezbytná",
          "text": "Porovnání cen je užitečné pouze, pokud je požadovaný průkaz skutečně v prodeji. Zkontrolujte aktuální dostupnost.",
          "icon": "tabler:shopping-cart"
        }
      ],
      "faqs": [
        {
          "question": "Jsou to ceny 2026?",
          "answer": "Ceny byly převzaty z oficiálních stránek vstupenek ke dni uvedenému pro kontrolu. Provozovatel může měnit ceny a podmínky."
        },
        {
          "question": "Existují zvláštní sazby?",
          "answer": "Oficiální stránka uvádí snížené ceny pro děti, seniory a určité průkazy. Doklady a platné podmínky jsou závazné."
        },
        {
          "question": "Mohu nyní koupit ResortPass?",
          "answer": "Silver a Gold jsou aktuálně nedostupné. Tracker v reálném čase ukáže, až se skutečný stav v obchodě změní."
        }
      ]
    },
    "resortPassReservation": {
      "title": "Rezervace návštěvy s ResortPass: dny, portál a hoteloví hosté",
      "description": "Jak fungují rezervace s ResortPass: registrace dne návštěvy, kapacita, hotelová rezervace a platná pravidla portálu.",
      "eyebrow": "Rezervace",
      "heading": "Potřebujete rezervovat svou návštěvu s ResortPass?",
      "answer": "Konkrétní rezervace závisí na průkazu, dni návštěvy a možných kapacitách. Portál ResortPass a oficiální často kladené dotazy jsou referencí; rezervace hotelu automaticky nenahrazuje všechny potřebné kroky ve všech případech.",
      "sectionTitle": "Zkontrolujte tři věci před odchodem",
      "sectionIntro": "Mít platný průkaz, vybrat povolený den a mít rezervaci, když je povinná, jsou odlišné požadavky.",
      "points": [
        {
          "title": "Otevřete portál průkazu",
          "text": "Zkontrolujte tam platnost, zaznamenané dny návštěvy a aktuální informace o kapacitě.",
          "icon": "tabler:login-2"
        },
        {
          "title": "Prověřte hotelovou rezervaci",
          "text": "V aktuálních často kladených otázkách si ověřte, zda a jak jsou dny návštěvy propojeny s vaším konkrétním ubytováním v resortu.",
          "icon": "tabler:hotel-service"
        },
        {
          "title": "Uložte potvrzení",
          "text": "Mějte připravený průkaz a doklad o rezervaci v oficiální aplikaci nebo v uvedeném formátu v den návštěvy.",
          "icon": "tabler:ticket"
        }
      ],
      "faqs": [
        {
          "question": "Musím rezervovat každou návštěvu?",
          "answer": "Pro všechny typy průkazů a období nelze poskytnout obecnou odpověď. Před každou návštěvou zkontrolujte aktuální pravidla na portálu ResortPass."
        },
        {
          "question": "Zahrnuje rezervace hotelu automaticky rezervaci parku?",
          "answer": "Oficiální často kladené otázky popisují speciální pravidla pro hosty. Nespoléhejte se na domněnku: porovnejte svou konkrétní rezervaci na portálu."
        },
        {
          "question": "Co se stane, pokud se kapacita vyčerpá?",
          "answer": "Platí aktuální pravidla provozovatele. Tracker dostupnosti kontroluje prodej, nikoli kapacitu jednotlivých dnů návštěvy na osobním portálu."
        }
      ]
    },
    "resortPassRulantica": {
      "title": "ResortPass a Rulantica: výhody Gold a rezervace",
      "description": "Jaké výhody Rulantica zahrnuje ResortPass Gold? Dvě jednodenní vstupenky, plánování, rezervace a rozdíly oproti Silver.",
      "eyebrow": "ResortPass + Rulantica",
      "heading": "Co zahrnuje ResortPass pro Rulantica?",
      "answer": "Podle aktuálních informací od provozovatele ResortPass Gold zahrnuje dva jednodenní vstupy pro Rulantica; Silver ne. Musíte oficiálně potvrdit rezervaci, platnost a možné kapacity před návštěvou.",
      "sectionTitle": "Opravdu využijte oba dny Rulantica",
      "sectionIntro": "Výhoda přináší hodnotu pouze tehdy, pokud dny, které zahrnuje, odpovídají vaší cestě a můžete je zarezervovat včas.",
      "points": [
        {
          "title": "Naplánujte výhodu Gold",
          "text": "Považujte oba dny za součást svého ročního plánování, nikoli jako improvizovaný doplněk na konci dne v parku.",
          "icon": "tabler:droplet-filled"
        },
        {
          "title": "Vypočítejte Silver zvlášť",
          "text": "U Silver je třeba vstupy do Rulantica rozpočítat zvlášť a rezervovat podle dostupnosti.",
          "icon": "tabler:receipt-euro"
        },
        {
          "title": "Zkontrolujte, kolik máte času",
          "text": "Rodinám obvykle přinese celý den v Rulantica více než uspěchaný přesun po celém dni v parku.",
          "icon": "tabler:clock-hour-8"
        }
      ],
      "faqs": [
        {
          "question": "Kolik dní Rulantica zahrnuje Gold?",
          "answer": "Podle aktuálních oficiálních podmínek dvě denní vstupenky do Rulantica. Při jejich využití platí aktuální podmínky provozovatele."
        },
        {
          "question": "Zahrnuje Silver vstup do Rulantica?",
          "answer": "Podle aktuálního srovnání není Rulantica součástí standardních výhod. Potřebné vstupenky si musíte rozpočítat zvlášť."
        },
        {
          "question": "Je třeba rezervovat zahrnuté dny?",
          "answer": "Podívejte se na platná pravidla rezervace na portálu ResortPass. Rulantica má omezený denní počet míst."
        }
      ]
    }
  },
  "visitPlanner": {
    "eyebrow": "Interaktivní plánovač",
    "title": "Váš realistický den",
    "intro": "Vyberte délku, skupinu a podmínky. Získáte solidní plán, ne falešnou přesnost po minutách.",
    "dateLabel": "Datum návštěvy",
    "daysLabel": "Plánované dny v parku",
    "days": [
      "1 den",
      "2 dny",
      "3 dny"
    ],
    "groupLabel": "Priorita",
    "groups": {
      "balanced": "Vyvážené",
      "family": "Rodina a děti",
      "thrill": "Horské dráhy a akce",
      "shows": "Představení a klidné tempo"
    },
    "arrivalLabel": "Příjezd",
    "arrivals": {
      "early": "Před otevřením",
      "opening": "V době otevření",
      "late": "Po 10:30"
    },
    "crowdLabel": "Očekávaná návštěvnost",
    "crowds": {
      "low": "Spíše nízká",
      "medium": "Střední",
      "high": "Vysoká"
    },
    "rulanticaLabel": "Zahrnout Rulantica",
    "submit": "Vytvořit plán",
    "resultTitle": "Vaše doporučení",
    "resultLead": "Plánujte s jasnými prioritami",
    "resultDays": "doporučené dny celkem",
    "routeLabel": "Plán dne",
    "morning": "Ráno",
    "midday": "Poledne",
    "afternoon": "Odpoledne",
    "evening": "Večer",
    "notes": {
      "early": "Dostaňte se k vchodu před oficiálním otevřením a stanovte si tři hlavní cíle.",
      "late": "Pokud přijdete pozdě, je druhý den bezpečnější než snažit se stihnout vše příliš rychle.",
      "busy": "Při velké návštěvnosti používejte aktuální časy čekání a připravte si alternativy podle zón.",
      "rulantica": "S malými dětmi nebo pokud jsou prioritou vodní atrakce, vyhraďte pro Rulantica samostatný den.",
      "family": "Naplánujte si pevné bloky pro jídlo a odpočinek, stejně jako alespoň jednu krytou alternativu.",
      "thrill": "Používejte Single Rider a VirtualLine pouze tehdy, když jsou v den návštěvy skutečně k dispozici.",
      "shows": "Nejprve si ověřte časy představení a naplánujte trasu kolem těchto událostí."
    },
    "routes": {
      "balanced": [
        "Začněte u dvou hlavních atrakcí a zůstaňte ve stejné části parku.",
        "Jezte brzy nebo pozdě a poté využijte krytou atrakci nebo představení jako klidný blok.",
        "Procházejte sousední tematické oblasti a porovnávejte aktuální čekací doby, než přejdete dál.",
        "Dokončete jednu zbývající prioritu, nechte si čas na suvenýry a ověřte, zda se prodlužují otevírací hodiny parku."
      ],
      "family": [
        "Začněte vhodnou rodinnou atrakcí a nejprve zkontrolujte výšku u vstupu.",
        "Naplánujte si časný odpočinek, jídlo a vnitřní atrakci nebo klidné představení.",
        "Kombinujte hrací zónu a další dvě atrakce vhodné pro věk ve stejné polovině parku.",
        "Řiďte se energií dětí: lepší je jeden skutečný vrchol dne než vyčerpávající závěr."
      ],
      "thrill": [
        "Upřednostněte hlavní horské dráhy při otevření a neprocházejte celý park kvůli jediné atrakci.",
        "Zkontrolujte VirtualLine a Single Rider; využijte poledne pro blízkou alternativu.",
        "Vyberte druhou skupinu horských drah podle aktuálních čekacích dob a předvídejte technické závady.",
        "Strategicky naplánujte poslední kolo poblíž oblasti, kde chcete skončit."
      ],
      "shows": [
        "Prohlédněte si program a vyberte si klidnou atrakci cestou k prvnímu představení.",
        "Spojte brzký oběd s krytým představením nebo tematickou atrakcí.",
        "Naplánujte druhé představení a mezi obě zařaďte jen blízké atrakce.",
        "Užívejte si atmosféru, gastronomii a poslední atrakci bez zbytečných změn oblasti."
      ]
    },
    "disclaimer": "Plánovací pomoc bez záruky. Rozvrhy, čekací doby, VirtualLine a provoz atrakcí se mohou změnit s krátkým předstihem.",
    "forecastCta": "Zkontrolovat předpověď návštěvnosti"
  },
  "costCalculator": {
    "eyebrow": "Plánovač rozpočtu 2026",
    "title": "Vypočítejte realistické rozpětí nákladů",
    "intro": "Oficiální cenová rozpětí vstupenek plus váš odhad nákladů na ubytování. Jídlo, doprava a volitelné doplňky jsou ze součtu záměrně vynechány.",
    "adults": "Dospělí od 12 let",
    "children": "Děti od 4 do 11 let",
    "days": "Europa-Park",
    "oneDay": "1 den",
    "twoDays": "2 dny",
    "rulantica": "Rulantica",
    "rulanticaOptions": {
      "none": "Nezahrnovat",
      "day": "Denní vstup",
      "evening": "Večerní vstup od 17 h",
      "moonlight": "Moonlight od 19 h"
    },
    "parking": "Standardní parkování Europa-Park",
    "nights": "Noci",
    "lodgingPerNight": "Celkové ubytování za noc",
    "calculate": "Aktualizovat rozpočet",
    "resultEyebrow": "Tvůj cenový rozsah",
    "total": "Odhadované celkové náklady",
    "rangeConnector": "až",
    "perPerson": "za osobu",
    "breakdown": "Rozpis",
    "europaParkTickets": "Vstupenky Europa-Park",
    "rulanticaTickets": "Vstupenky Rulantica",
    "parkingCost": "Parkování",
    "lodgingCost": "Ubytování",
    "variableNote": "Ceny závisí na datu; uvedené rozpětí nezaručuje konečnou cenu.",
    "assumptionNote": "Přidejte také jídlo, cestu a možné správní poplatky.",
    "currency": "EUR"
  },
  "familyFinder": {
    "eyebrow": "Rodinný vyhledávač",
    "title": "Filtrujte atrakce podle věku a výšky",
    "intro": "Vyhledávač používá malý a oficiálně ověřený výběr. Konečné rozhodnutí vždy náleží personálu parku.",
    "age": "Věk dítěte",
    "height": "Výška",
    "interest": "Zájem",
    "interests": {
      "all": "Všechny ověřené příklady",
      "calm": "Klidné",
      "family": "Rodinné dobrodružství",
      "thrill": "Akce",
      "indoor": "Uvnitř"
    },
    "submit": "Ukázat vhodné příklady",
    "resultTitle": "Ověřený výběr",
    "resultCount": "Zobrazené atrakce",
    "eligible": "Splňuje požadavky",
    "accompanied": "Vyžaduje doprovod dospělého",
    "notYet": "Ještě nesplňuje požadavky",
    "minimum": "Minimum",
    "years": "let",
    "centimeters": "cm",
    "indoor": "Uvnitř",
    "source": "Oficiální zdroj",
    "noResults": "Pro tento filtr zatím neexistuje ověřená ukázková atrakce.",
    "disclaimer": "Nezaručuje možnost nástupu. V parku rozhoduje značení, měření, bezpečnostní a zdravotní pravidla a pokyny personálu.",
    "officialFilter": "Prohlédněte si všechny atrakce v oficiálním filtru"
  },
  "rulanticaPlanner": {
    "eyebrow": "Pomoc s kombinací",
    "title": "Který vstup Rulantica odpovídá vaší cestě?",
    "intro": "Nástroj hodnotí dny v parku, děti, prioritu vodních atrakcí a úroveň energie. Poté musíte oficiálně zkontrolovat ceny a dostupnost.",
    "parkDays": "Dny Europa-Park",
    "parkDayOptions": [
      "1 den v parku",
      "2 dny v parku",
      "3 dny nebo více"
    ],
    "children": "Děti ve skupině",
    "childOptions": [
      "Bez dětí",
      "Děti mladší než 8 let",
      "Starší děti / dospívající"
    ],
    "waterPriority": "Důležitost Rulantica",
    "priorityOptions": [
      "Jen to vyzkoušet",
      "Důležitý doplněk",
      "Hlavní cíl"
    ],
    "energy": "Požadované tempo",
    "energyOptions": [
      "Klidně",
      "Vyváženě",
      "Intenzivní program"
    ],
    "submit": "Vyhodnotit typ vstupu",
    "resultLabel": "Doporučení plánování",
    "recommendations": {
      "day": {
        "title": "Celý den v Rulantica",
        "text": "S malými dětmi nebo pokud je voda prioritou, samostatný den poskytuje dostatek času na pauzy, převléknutí a návštěvu různých zón."
      },
      "evening": {
        "title": "Večerní vstup jako doplněk",
        "text": "Hodí se při běžném tempu a jasném výběru priorit, ale naplánujte si skutečnou přestávku a čas na přesun z Europa-Park."
      },
      "moonlight": {
        "title": "Moonlight jako krátké zakončení",
        "text": "Tři hodiny se hodí spíše zkušeným a energickým návštěvníkům s několika prioritami než při úplně první návštěvě."
      },
      "separate": {
        "title": "Plánujte Rulantica zvlášť",
        "text": "Při klidnějším tempu nebo delší cestě je samostatný blok jistější než návštěva po celém dni v parku."
      }
    },
    "checklistTitle": "Co vzít s sebou a zkontrolovat předem",
    "checklist": [
      "Vlastní ručník pro denní návštěvníky",
      "Plavky a suché náhradní oblečení",
      "Aktuální otevírací a údržbové hodiny",
      "Pravidla věku a výšky pro požadované skluzavky",
      "Rezervace, vstup a dostupnost skříněk"
    ],
    "officialNote": "Oficiální často kladené otázky jsou referencí pro přístup, oblečení, ručníky, kočárky a skříňky.",
    "officialCta": "Otevřít často kladené otázky Rulantica"
  },
  "stayComparator": {
    "eyebrow": "Porovnávač ubytování",
    "title": "Jaký typ ubytování odpovídá tvému výletu?",
    "intro": "Porovnejte osm typů ubytování podle zdokumentovaných charakteristik. Vyhledávač nezobrazuje žebříčky ani ceny bez ověření: pomáhá vám zúžit hledání.",
    "filtersLabel": "Filtrovat ubytování",
    "scenarioLabel": "Co je pro vás obzvlášť důležité?",
    "allScenarios": "Všechny cestovní situace",
    "prioritiesLabel": "Další vlastnosti",
    "priorities": {
      "operatorGuestBenefits": "Výhody pro hosty resortu",
      "selfCatering": "Ubytování s kuchyní",
      "ownSleepingUnitRequired": "Vlastní vybavení na spaní",
      "groupFormats": "Vhodné pro skupiny",
      "walkingAccess": "Pěší dostupnost do parku",
      "shuttleOrTransit": "Transfer nebo veřejná doprava"
    },
    "reset": "Obnovit filtry",
    "resultsLabel": "Porovnatelné typy ubytování",
    "resultSingular": "typ ubytování",
    "resultPlural": "typy ubytování",
    "operatorRelation": {
      "resort_operated": "Spravováno resortem Europa-Park",
      "independent": "Nezávislý objekt"
    },
    "states": {
      "verified": "Zdokumentováno",
      "available_for_this_type": "Dostupné pro tento typ",
      "not_applicable": "Neodpovídá",
      "varies_by_property": "Liší se podle ubytování",
      "must_verify": "Zkontrolujte před rezervací"
    },
    "verifyTitle": "Co byste měli zkontrolovat před rezervací",
    "source": "Otevřít zdroj",
    "checkedAt": "Zkontrolováno dne",
    "emptyTitle": "Žádný typ ubytování nesplňuje všechny filtry",
    "emptyText": "Odstraňte jednu vlastnost nebo znovu vyberte všechny situace cestování. Prázdný výsledek nic neříká o konkrétních zařízeních.",
    "priceNoteTitle": "Proč nezobrazujeme ceny hotelů",
    "priceNoteText": "Ceny se mění podle data, obsazenosti, sazby a služeb. Nejprve porovnejte vhodný typ a až poté potvrďte konečnou cenu přímo u poskytovatele.",
    "notRanking": "Pořadí je neutrální: nepředstavuje hodnocení kvality ani placené doporučení.",
    "noJs": "Bez JavaScriptu jsou viditelné všechny typy ubytování a kontrolní seznamy; chybí pouze interaktivní filtry.",
    "scenarioLabels": {
      "operator-benefits-priority": "Upřednostnit dřívější vstup a dopravu z resortu",
      "park-and-rulantica-without-car": "Kombinovat Europa-Park a Rulantica bez vlastního auta",
      "own-motorhome-or-caravan": "Cestovat vlastním obytným vozem nebo karavanem",
      "own-tent": "Spát ve vlastním stanu",
      "large-group-themed-stay": "Tematické ubytování pro rodinu, sdružení nebo skupinu",
      "self-catering-filter": "Možnost kuchyně jako kritérium výběru",
      "walkability-filter": "Filtrovat podle vzdálenosti chůze k hlavnímu vchodu"
    },
    "typeContent": {
      "official-themed-hotel": {
        "label": "Tematický hotel Europa-Park",
        "definition": "Jeden ze šesti tematických hotelů kategorie 4 hvězdiček (superior) provozovaných resortem.",
        "mustVerify": [
          "výhody dostupné v konkrétních datech cesty",
          "které atrakce jsou skutečně otevřené během ranního vstupu",
          "kapacitu pokoje a bezbariérovost",
          "zda jsou vstupenky součástí zvoleného balíčku, nebo se kupují samostatně"
        ]
      },
      "riverside-western-lodge": {
        "label": "Riverside Western Lodge",
        "definition": "Ubytování v pokojích v Silver Lake City s vlastní sadou výhod pro hosty.",
        "mustVerify": [
          "aktuální jízdní řád autobusu Rust",
          "výhody dostupné v konkrétních datech cesty",
          "kapacitu pokoje a bezbariérovost",
          "možná hlučná období kvůli akcím v Silver Lake City"
        ]
      },
      "tipi-town": {
        "label": "Tipi Town",
        "definition": "Tematické ubytování pro skupiny a rodiny v týpí, vozech, srubových pokojích a Western Houses.",
        "mustVerify": [
          "uspořádání koupelen a míst na spaní ve vybrané kategorii",
          "zda je snídaně povinná, nebo ji lze přidat",
          "výhody dostupné v konkrétních datech cesty",
          "možná hlučná období kvůli akcím",
          "zda je délka patrových postelí vhodná pro cestující"
        ]
      },
      "official-caravaning": {
        "label": "Europa-Park Caravaning",
        "definition": "Parcely v Silver Lake City pro obytné vozy a karavany.",
        "mustVerify": [
          "rozměry vozidla a vhodná kategorie parcely",
          "podmínky připojení k elektřině a vodě u konkrétní rezervace",
          "časy příjezdu, odpočinku a odjezdu",
          "aktuální výhody a jízdní řád autobusu Rust"
        ]
      },
      "official-tent-camping": {
        "label": "Europa-Park Camping",
        "definition": "Kempingová zóna v Silver Lake City pro hosty s vlastním stanem.",
        "mustVerify": [
          "pravidla pro stany a parcely",
          "potřeby elektřiny a podmínky připojení",
          "sanitární zařízení a možnosti snídaně",
          "počasí, doba odpočinku a aktuální výhody pro hosty"
        ]
      },
      "independent-hotel-or-guesthouse-rust": {
        "label": "Nezávislý hotel nebo penzion v Rust",
        "definition": "Ubytování v nezávislém zařízení na území obce Rust.",
        "mustVerify": [
          "aktuální provoz a dostupnost rezervace",
          "skutečná pěší trasa k požadovanému vchodu",
          "snídaně, parkování, storno a přístupnost",
          "nepředpokládat automaticky výhody hotelů v resortu"
        ]
      },
      "independent-holiday-apartment-rust": {
        "label": "Nezávislý rekreační apartmán v Rust",
        "definition": "Nezávislé ubytování, které obec Rust klasifikuje jako rekreační apartmán.",
        "mustVerify": [
          "skutečné vybavení kuchyně a jídelny, bez úsudku pouze podle kategorie",
          "skutečnou pěší trasu k požadovanému vchodu",
          "minimální délku pobytu, závěrečný úklid, parkování a storno",
          "aktuální registraci a dostupnost"
        ]
      },
      "accommodation-nearby-municipalities": {
        "label": "Ubytování v blízké obci",
        "definition": "Samostatné ubytování mimo Rust, v obci v Erlebnisregion Europa-Park.",
        "mustVerify": [
          "spojení konkrétního dne v týdnu a při zavírání parku",
          "poslední zpáteční spoj a přestupy",
          "parkování v destinaci a ubytování",
          "aktuální provoz a dostupnost rezervace"
        ]
      }
    }
  },
  "restaurantFinder": {
    "eyebrow": "Ověřený adresář",
    "title": "Objektivní srovnání menších restaurací v Rust",
    "intro": "Prohledejte osm redakčně prověřených záznamů. Zobrazujeme pouze doložené vlastnosti; netvrdíme nic o kvalitě, cenové úrovni ani dostupnosti stolů.",
    "filtersLabel": "Filtrovat restaurace",
    "searchLabel": "Jméno nebo adresa",
    "searchPlaceholder": "Například Adler nebo Fischerstraße",
    "statusLabel": "Stav ověření",
    "allStatuses": "Všechny stavy",
    "statuses": {
      "first_party_verified": "Zdokumentováno zdrojem zařízení",
      "public_directory_verified": "Zdokumentováno v obecním rejstříku",
      "license_page_verified": "Zdokumentováno prostřednictvím licenční stránky",
      "needs_reverification": "Potřebuje novou kontrolu"
    },
    "timeLabel": "Zdokumentovaná otevírací doba",
    "allTimes": "Všechny zdokumentované otevírací doby",
    "timeSlots": {
      "breakfast": "Snídaně",
      "evening": "Večerní služba"
    },
    "distanceLabel": "Zdokumentovaná vzdálenost",
    "allDistances": "Všechny zdokumentované vzdálenosti",
    "distanceOptions": [
      {
        "maxMetres": 500,
        "label": "Až 500 m"
      },
      {
        "maxMetres": 1000,
        "label": "Až 1 km"
      },
      {
        "maxMetres": 2000,
        "label": "Až 2 km"
      }
    ],
    "needsLabel": "Zdokumentované potřeby",
    "familyFeatures": {
      "kids_menu": "Zmíněné dětské menu"
    },
    "dietFeatures": {
      "vegetarian_evidence": "Zdokumentované vegetariánské možnosti",
      "vegan_evidence": "Zdokumentované veganské možnosti",
      "gluten_free_evidence": "Zdokumentované bezlepkové možnosti"
    },
    "reset": "Obnovit filtry",
    "resultsLabel": "Prověřené karty",
    "resultSingular": "restaurace",
    "resultPlural": "restaurace",
    "noJs": "Bez JavaScriptu zůstávají všechny karty, zdroje a nejistoty čitelné; chybí jen vyhledávání a filtry.",
    "emptyTitle": "Žádná karta neodpovídá těmto filtrům",
    "emptyText": "Odstraňte filtr. Absence výsledků může také znamenat, že vlastnost ještě není dostatečně zdokumentována.",
    "serviceEvidence": "Doložená nabídka",
    "cuisineEvidence": "Doložený typ kuchyně",
    "filterEvidence": "Podklad pro filtr",
    "evidenceCheckedAt": "Kontrola podkladu pro filtr",
    "source": "Primární zdroj",
    "operatorWebsite": "Webová stránka podniku",
    "corroboratingSource": "Další zdroj",
    "uncertaintyTitle": "Co je potřeba ověřit před návštěvou",
    "verificationNote": "Ověřovací poznámka",
    "checkedAt": "Záznam zkontrolován",
    "reviewDue": "Termín nové kontroly uplynul",
    "notRecommendation": "Není doporučení",
    "notRecommendationTitle": "Neutrální adresář, ne seznam nejlepších",
    "notRecommendationText": "Zařazení a pořadí nehodnotí kvalitu. Ověřte přímo u podniku otevírací dobu, jídelní lístek, alergeny a rezervace.",
    "unavailableEvidenceTitle": "Filtry, které jsme záměrně vynechali",
    "unavailableEvidence": {
      "time": "Časy ještě nejsou dostatečně jednotně zdokumentovány.",
      "distance": "Vzdálenosti ještě nebyly změřeny konzistentní trasou.",
      "family": "Rodinné charakteristiky ještě nejsou dostatečně zdokumentovány.",
      "diet": "Možnosti pro vegetariány, vegany a bezlepkové možnosti ještě nejsou zaznamenány s dostatečnou spolehlivostí."
    },
    "entryContent": {
      "gasthaus-adler-rust": {
        "cuisineEvidence": [
          "tradiční domácí kuchyně"
        ],
        "serviceEvidence": [
          "podávání večeří podle webu podniku"
        ],
        "verificationNote": "Web a právní informace podniku byly přístupné; ke dni kontroly uváděly adresu, kontakt, typ kuchyně a aktuální otevírací dobu.",
        "uncertainties": [
          "Mimořádná otevírací doba a dovolená závisejí na konkrétním datu.",
          "Dostupnost rezervací nebyla ověřena."
        ]
      },
      "hardys-rust": {
        "cuisineEvidence": [
          "regionální a mezinárodní pokrmy",
          "hamburgery, žebírka, těstoviny a steaky podle webu podniku"
        ],
        "serviceEvidence": [
          "snídaně podle webu podniku",
          "večeře podle webu podniku"
        ],
        "verificationNote": "Webové stránky zařízení byly přístupné a uváděly adresu, typ jídla a nabídku snídaní.",
        "uncertainties": [
          "Aktuální informace o provozu na webu se mohou změnit na poslední chvíli.",
          "Vlastní marketingové texty a vložené recenze nebyly použity jako důkaz kvality."
        ]
      },
      "casa-rustica-rust": {
        "cuisineEvidence": [
          "italská kuchyně"
        ],
        "serviceEvidence": [
          "podávání večeří podle obecního adresáře"
        ],
        "verificationNote": "Webové stránky zařízení potvrzují činnost, adresu a italskou restauraci; městský adresář poskytuje aktuální přehled otevíracích hodin.",
        "uncertainties": [
          "Ověřte si otevírací dobu na webu zařízení nebo telefonicky před návštěvou.",
          "Podnikem uváděná pěší vzdálenost k parku nebyla nezávisle změřena."
        ]
      },
      "hotel-restaurant-mythos": {
        "cuisineEvidence": [
          "řecká a mezinárodní kuchyně"
        ],
        "serviceEvidence": [
          "dětské menu podle webových stránek zařízení"
        ],
        "verificationNote": "Webové stránky zařízení byly přístupné a potvrdily adresu, typ kuchyně a kontaktní informace pro rezervace.",
        "uncertainties": [
          "Čitelný obsah webu neuvádí stabilní týdenní otevírací dobu.",
          "Dostupnost stolů nebyla ověřena."
        ]
      },
      "kaiserstuehler-hof-rust": {
        "cuisineEvidence": [
          "bádenská kuchyně",
          "regionální pokrmy"
        ],
        "serviceEvidence": [
          "podávání večeří podle webu podniku"
        ],
        "verificationNote": "Web podniku byl přístupný a uváděl adresu, profil bádenské kuchyně a aktuální týdenní otevírací dobu.",
        "uncertainties": [
          "Před návštěvou si znovu ověřte dovolenou a zavírací den.",
          "Nezaručujeme, že je vhodné pro alergie, bez přímé konzultace."
        ]
      },
      "restaurant-fenix-rust": {
        "cuisineEvidence": [
          "primární zdroj jasně nedefinuje typ kuchyně"
        ],
        "serviceEvidence": [
          "podávání večeří podle webu podniku"
        ],
        "verificationNote": "Webové stránky zařízení a městský záznam potvrzují činnost, adresu a kontakt. Nebyla učiněna žádná reklamní tvrzení.",
        "uncertainties": [
          "Před redakčním zařazením ručně ověřte typ kuchyně v aktuálním menu.",
          "Webové stránky zařízení zobrazují jiné časy než externí platformy; používejte pouze údaje zařízení."
        ]
      },
      "la-terrassa-rust": {
        "cuisineEvidence": [
          "městský adresář neuvádí typ kuchyně"
        ],
        "serviceEvidence": [
          "terasa podle městského adresáře"
        ],
        "verificationNote": "Restaurace je uvedena v aktuálním městském adresáři; propojená webová stránka popisuje převážně penzion a nepotvrzuje podrobnosti o restauraci.",
        "uncertainties": [
          "Potvrďte přímo činnost, typ kuchyně a otevírací dobu.",
          "Neuvádějte ji jako redakčně prověřenou restauraci, dokud nezískáte přímé potvrzení."
        ]
      },
      "my-denis-rust": {
        "cuisineEvidence": [
          "Městský adresář neuvádí typ kuchyně"
        ],
        "serviceEvidence": [
          "Rozvoz podle městského adresáře"
        ],
        "verificationNote": "Objevuje se pouze v městském adresáři; při kontrole v daném datu nebyla nalezena žádná spolehlivá vlastní webová stránka.",
        "uncertainties": [
          "Potvrďte přímo činnost, kontakt, typ kuchyně a otevírací dobu.",
          "Nezahrnujte do doporučení nebo žebříčků pro uživatele, dokud neověříte přímý zdroj."
        ]
      }
    }
  },
  "resortPassTool": {
    "eyebrow": "Pomoc při výběru ResortPass",
    "title": "Zkontrolujte stav, výhody i skutečné náklady",
    "intro": "Aktuální stav odpovídá na otázku, zda lze průkaz koupit. Srovnání a kalkulačka pak pomohou rozhodnout mezi jednodenními vstupenkami, Silver a Gold.",
    "statusTitle": "Aktuální stav prodeje",
    "statusChecking": "Kontroluji stav…",
    "statusAvailable": "Oficiálně nyní dostupné",
    "statusUnavailable": "Momentálně nedostupné",
    "statusUnknown": "Aktuálně nejistý stav",
    "statusError": "Nepodařilo se načíst aktuální stav",
    "lastChecked": "Poslední kontrola",
    "comparisonTitle": "Silver a Gold na první pohled",
    "feature": "Vlastnost",
    "silver": "Silver",
    "gold": "Gold",
    "adultPrice": "Cena pro dospělé",
    "concessionPrice": "Děti od 4 do 11 / osoby od 60 let",
    "visitDays": "Dny návštěvy",
    "visitDaysSilver": "Stanovené a zveřejněné dny návštěvy",
    "visitDaysGold": "Větší flexibilita podle platných podmínek",
    "rulanticaBenefit": "Rulantica",
    "rulanticaSilver": "Není součástí standardních výhod",
    "rulanticaGold": "Dva denní vstupy podle platných podmínek",
    "flexibility": "Profil plánování",
    "flexibilitySilver": "Pro data, která můžete plánovat s předstihem",
    "flexibilityGold": "Pro častější nebo spontánní návštěvy",
    "calculatorTitle": "Jednoduché srovnání nákladů pro dospělé",
    "calculatorIntro": "Porovnejte poslední doložené ceny vstupenek s počtem jednodenních návštěv Europa-Park a Rulantica, které si zvolíte.",
    "visitsLabel": "Návštěvy Europa-Park",
    "rulanticaVisitsLabel": "Jednodenní návštěvy Rulantica",
    "priceScenarioLabel": "Scénář ceny denních vstupenek",
    "lowerPriceScenario": "Spodní hranice zaznamenaného intervalu",
    "upperPriceScenario": "Horní hranice zaznamenaného intervalu",
    "calculate": "Aktualizovat srovnání",
    "dayTicketsCost": "Jednotlivé denní vstupenky",
    "silverCost": "Silver plus vstupenky do Rulantica",
    "goldCost": "Gold se zahrnutými dvěma dny Rulantica",
    "lowestCost": "Vypočtená minimální částka",
    "estimateDisclaimer": "Orientace pro dospělou osobu, bez záruky nákupu ani dostupnosti. Vyloučené dny, rezervace, slevy, cesta a nevyužité služby mohou změnit rozhodnutí.",
    "linksTitle": "Najděte přímou odpověď na další otázku",
    "compareLink": "Porovnat Silver a Gold",
    "pricesLink": "Zjistit ceny ResortPass",
    "reservationLink": "Porozumět rezervaci",
    "rulanticaLink": "ResortPass a Rulantica"
  }
} satisfies PlanningLocalePack;
