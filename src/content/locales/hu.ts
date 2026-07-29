import type { PlanningLocalePack } from '../planning-types';

export const huPlanning = {
  "common": {
    "skip": "Ugrás a tartalomhoz",
    "menu": "Menü",
    "language": "Válassz nyelvet",
    "home": "Kezdőlap",
    "plannerLabel": "Tervezd meg a látogatásodat",
    "answerLabel": "Rövid válasz",
    "updatedLabel": "Ellenőrizve",
    "sourcePrefix": "Forrás",
    "onThisPage": "Ezen az oldalon",
    "relatedTitle": "Ajánlott következő lépések",
    "sourcesTitle": "Források és aktualitás",
    "sourcesIntro": "A változó adatok az üzemeltetői és hatósági forrásokból származnak. Foglalás előtt ellenőrizd újra az árakat, a nyitvatartást és a szabályokat a hivatkozott elsődleges forrásban.",
    "correctionLabel": "Van valami hibás adat?",
    "correctionText": "Értesíts minket, ha elavult információt találsz. Világosan megkülönböztetjük a dokumentált tényeket, a számítási feltételezéseket és a szerkesztői értékelést.",
    "unofficial": "Független közösségi projekt",
    "footerText": "Független tervezési útmutató, amely nem áll kapcsolatban az Europa-Parkkal.",
    "overview": "Összefoglaló",
    "tool": "Tervezési eszköz",
    "decisions": "Döntést segítő eszköz",
    "faq": "Gyakran ismételt kérdések",
    "notRecommendation": "Információs adatlap, nem ajánlás",
    "verifyBeforeVisit": "Ellenőrizd közvetlenül a szolgáltatónál a látogatás előtt"
  },
  "navigation": {
    "parkGuide": "Europa-Park",
    "visitPlanner": "1 vagy 2 nap",
    "costCalculator": "Költségek",
    "familyGuide": "Családok",
    "rulanticaGuide": "Rulantica",
    "stayGuide": "Szállás",
    "restaurantGuide": "Étkezés Rustban",
    "resortPassGuide": "ResortPass"
  },
  "pages": {
    "parkGuide": {
      "title": "Europa-Park-tervezés: független útmutató kalkulátorokkal",
      "description": "Tervezd meg gyakorlatiasan az Europa-Park-látogatást: 1 vagy 2 nap, költségek, család, Rulantica, szállás és éttermek Rustban, interaktív eszközökkel.",
      "eyebrow": "Europa-Park tervezőközpont",
      "heading": "Tervezd meg az Europa-Park-látogatást a valós igényeid szerint",
      "answer": "Első látogatásra egy teljes nap a minimum; két nap általában nyugodtabb, különösen gyerekekkel, műsorokkal vagy nagy tömegben. A tervet az időpont, a csoport és a költségvetés alapján készítsd, ne egy általános top 10-es lista szerint.",
      "sectionTitle": "A kérdésektől a reális látogatási tervig",
      "sectionIntro": "Az eszközök a helyzetedet az aktuális adatokkal kapcsolják össze. Nem helyettesítik a hivatalos foglalást, de segítenek elkerülni a legfontosabb hibás döntéseket az utazás előtt.",
      "points": [
        {
          "title": "Először az időkeretről dönts",
          "text": "Az érkezés, a kiemelt attrakciók és a várható látogatottság alapján döntsd el, hogy egy vagy két napra van-e szükséged a parkban.",
          "icon": "tabler:calendar-time"
        },
        {
          "title": "Teljes költség, nem csak a belépő",
          "text": "Az Europa-Park- és Rulantica-belépőket, a parkolást és a szállást együtt, ártartományként számold ki, ne félrevezető fix árként.",
          "icon": "tabler:calculator"
        },
        {
          "title": "Alakítsd az útvonalat a csoporthoz",
          "text": "A testmagasság, az életkor, a pihenőigény és az érdeklődés jobban meghatározza a jó útvonalat, mint az általános rangsorok.",
          "icon": "tabler:route"
        }
      ],
      "faqs": [
        {
          "question": "Hány nap kell az Europa-Park meglátogatásához?",
          "answer": "Egy teljes nap elegendő lehet a kiválasztott fő attrakciókhoz. Első látogatáskor, családdal, műsorokkal vagy nyugodtabb tempóban általában két nap a reálisabb."
        },
        {
          "question": "Ez a weboldal hivatalos?",
          "answer": "Nem. A ResortPass Tracker független közösségi projekt. A belépésre, biztonságra és aktuális szabályokra mindig az Europa-Park hivatalos tájékoztatása az irányadó."
        },
        {
          "question": "Miért mutatja az ártartományokat a kalkulátor?",
          "answer": "Az Europa-Park és a Rulantica online árai dátumfüggők. Amíg nem választasz konkrét napot a hivatalos jegyboltban, az ártartomány megbízhatóbb tájékoztatást ad."
        }
      ]
    },
    "visitPlanner": {
      "title": "Europa-Park 1 vagy 2 nap alatt? Interaktív tervező",
      "description": "Elég egy nap az Europa-Parkban? Készíts tervet a dátum, a csoport, az érkezés, a látogatottság és a Rulantica alapján, napi útvonallal.",
      "eyebrow": "1 vagy 2 nap",
      "heading": "Hány napra van szükséged az Europa-Park meglátogatásához?",
      "answer": "Egy nap elegendő, ha korán érkezel és világosak a prioritásaid. Két nap biztosabb választás családoknak, műsorokhoz és sok tematikus területhez; ha a Rulantica-t is beilleszted, általában összesen két-három napot érdemes tervezni.",
      "sectionTitle": "Mi változtatja meg valójában a látogatás időtartamát",
      "sectionIntro": "Nem minden csoportnak ugyanarra az útvonalra van szüksége. Először időblokkokat és prioritásokat tervezz; a valós várakozási idők a látogatás napján határozzák meg a pontos sorrendet.",
      "points": [
        {
          "title": "Egy nap: jól válassz",
          "text": "Kezdj a nyitáskor, helyezd előtérbe a három-öt fő célpontot, és készíts alternatívákat a közeli tematikus területeken.",
          "icon": "tabler:number-1"
        },
        {
          "title": "Két nap: oszd szét a parkot",
          "text": "Oszd el a nagy attrakciókat, a családi programokat és az előadásokat a park két része között, hogy kevesebbet kelljen gyalogolni és ismételni.",
          "icon": "tabler:number-2"
        },
        {
          "title": "Nagy tömeg: hagyj időtartalékot",
          "text": "Hagyj időt az étkezésre, műszaki hibákra és gyaloglásra. Az élő várakozási idők segítenek a terv helyszíni módosításában.",
          "icon": "tabler:clock-hour-4"
        }
      ],
      "faqs": [
        {
          "question": "Bejárható az Europa-Park egy nap alatt?",
          "answer": "Sok kiemelt attrakciót kipróbálhatsz, de ritkán mindet. A tervező figyelembe veszi az érkezést, a csoportot és a látogatottságot, és kedvezőtlen körülmények között több időt javasol."
        },
        {
          "question": "Érdemes ugyanazon a napon meglátogatni a Rulantica-t?",
          "answer": "Egy esti belépő megfelelhet a vízi élményeket kedvelő felnőtteknek vagy nagyobb gyerekeknek. Kisgyerekekkel, vagy ha a vízipark a fő cél, egy külön nap nyugodtabb."
        },
        {
          "question": "Garantálja az útvonal a várakozási időket?",
          "answer": "Nem. Az időjárás, a meghibásodások és a valós látogatottság megváltoztathatja a tervet. Ellenőrizd a hivatalos alkalmazást és a várakozási időket az adott napon."
        }
      ]
    },
    "costCalculator": {
      "title": "Europa-Park 2026 költségszámológép: belépők, parkolás és szálloda",
      "description": "Számíts reális Europa-Park-költségtartományt felnőttekre, gyerekekre, 1 vagy 2 napra, Rulantica-ra, parkolásra és szállásra.",
      "eyebrow": "Teljes költség",
      "heading": "Mennyibe kerül összesen az Europa-Park-látogatás?",
      "answer": "A belépőjegy csak a költségvetés egy része. A kalkulátor a dátumfüggő jegyárakat a parkolással, a Rulantica költségével és a szálláskereteddel együtt számolja, és szándékosan minimumot és maximumot mutat.",
      "sectionTitle": "Hogyan alakítsd át az árakat hasznos költségvetéssé",
      "sectionIntro": "Hivatalos ártartományokat használunk, de nem találunk ki szállásárakat. A szállást, az étkezést és az utazást saját becslésként adhatod meg.",
      "points": [
        {
          "title": "Dátumfüggő árak tartományként",
          "text": "Konkrét látogatási dátum nélkül az ártartomány megbízhatóbb, mint egyetlen promóciós ár.",
          "icon": "tabler:arrows-horizontal"
        },
        {
          "title": "Családi költségvetés személyenként",
          "text": "A teljes összeg és az egy főre jutó érték megkönnyíti az 1 és 2 napos lehetőségek összehasonlítását.",
          "icon": "tabler:users"
        },
        {
          "title": "Feltételezések mindig láthatóak",
          "text": "A szállás és az egyéb költségek külön jelennek meg, így minden feltételezést módosíthatsz.",
          "icon": "tabler:list-details"
        }
      ],
      "faqs": [
        {
          "question": "Garantáltak a számológép árai?",
          "answer": "Nem. Ezek hivatalos ártartományok felülvizsgálati dátummal. Az elérhetőség, a dátum, a kezelési költségek és a foglalási csatorna befolyásolhatja a végső árat."
        },
        {
          "question": "Miért nem használ a kalkulátor átlagos szállodaárat?",
          "answer": "A szállás ára nagyban függ az időponttól, a kihasználtságtól és a lemondási feltételektől. Ezért te magad adod meg az általad ellenőrzött valós árat."
        },
        {
          "question": "Benne van az étkezés és az utazás?",
          "answer": "Nem adódnak hozzá automatikusan. Ezek a költségek az indulási helytől és a szokásoktól függően nagyon eltérnek, ezért érdemes külön tartalékot tervezni."
        }
      ]
    },
    "familyGuide": {
      "title": "Europa-Park gyerekekkel: magasságszűrő és családi terv",
      "description": "Tervezd meg az Europa-Park-látogatást babával, kisgyerekkel vagy iskolással: szűrj életkor és magasság szerint, ellenőrizd a kísérőszabályokat, és tervezz pihenőket.",
      "eyebrow": "Családok és gyermekek",
      "heading": "Mely attrakciók megfelelőek a gyermekednek?",
      "answer": "Sok attrakciónál az életkor és a testmagasság együtt számít. Használd a keresőt előszűrésre, de a helyszínen mindig ellenőrizd a mércét, a táblákat és a személyzet utasításait.",
      "sectionTitle": "A családi terv több egy attrakciólistánál",
      "sectionIntro": "A szünetek, az étkezés, a pelenkacserék, a különböző magasságú testvérek és az esetleges kísérőszabályok annyira befolyásolják az útvonalat, mint a kedvenc látványosságok.",
      "points": [
        {
          "title": "Kombináld az életkort és a magasságot",
          "text": "A kereső megkülönbözteti a minimumkövetelményt és a felnőtt kísérő esetleges szükségességét az egyes attrakciók hivatalos oldalai szerint.",
          "icon": "tabler:ruler-measure"
        },
        {
          "title": "Tervezd meg a nyugodt blokkokat",
          "text": "A fedett attrakciók, játszóterek és műsorok pihenést biztosítanak az intenzívebb élmények között.",
          "icon": "tabler:zzz"
        },
        {
          "title": "Ellenőrizd újra a helyszínen",
          "text": "A biztonsági szabályok változhatnak, és a kötelező utasításokat minden attrakciónál a bejáratnál tüntetik fel.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Elég elérni az előírt testmagasságot?",
          "answer": "Nem. Néhány attrakcióhoz minimum életkor vagy kísérő felnőtt szükséges bizonyos életkorig vagy magasságig."
        },
        {
          "question": "Garantálja a kereső, hogy fel lehet szállni?",
          "answer": "Nem. Az érvényes szabályok, a mérés és a park személyzete az irányadó. Az egészségi állapot, a fizikai adottságok, a terhesség vagy műszaki változások egyéb korlátozásokat jelenthetnek."
        },
        {
          "question": "Mi az a Baby-Switch?",
          "answer": "Bizonyos attrakcióknál a gyermekre vigyázó felnőttek felváltva vehetnek részt az élményben. Az adott attrakciónál kérdezd meg, pontosan hogyan működik."
        }
      ]
    },
    "rulanticaGuide": {
      "title": "Rulantica-tervezés: egész nap, esti jegy vagy kombináció?",
      "description": "Kombináld a Rulantica-t és az Europa-Parkot: interaktív segítség napijegy, esti jegy vagy Moonlight kiválasztásához a gyerekek, a felszerelés és az időkeret alapján.",
      "eyebrow": "Europa-Park + Rulantica",
      "heading": "Hogyan illeszkedik a Rulantica a kiruccanásodhoz?",
      "answer": "Egy egész nap a Rulantica-ban a legpihentetőbb választás családoknak és víziparkrajongóknak. Az esti vagy Moonlight jegy inkább kiegészítésnek jó, ha a csoport életkora és energiaszintje ezt megengedi.",
      "sectionTitle": "Válaszd ki a belépőidőpontot a célodnak megfelelően",
      "sectionIntro": "A vízipark rendszerint estig tart nyitva. Az a döntő, hogy a Rulantica a kiruccanás fő célja, vagy csak kiegészítő program az Europa-Park után.",
      "points": [
        {
          "title": "Napi belépő",
          "text": "Több idő jut a gyermekzónákra, csúszdákra, pihenőkre és szezonális szabadtéri területekre, különösen egy önálló Rulantica-napon.",
          "icon": "tabler:sun"
        },
        {
          "title": "Este vagy Moonlight",
          "text": "Kevesebb idő és általában alacsonyabb ár, de kevesebb energia is áll rendelkezésre egy hosszú nap után a parkban.",
          "icon": "tabler:moon-stars"
        },
        {
          "title": "Figyelj a csomagolási listára",
          "text": "Vigyél törölközőt és fürdőruhát, és előre ellenőrizd az érvényes szabályokat; egynapos vendégként ne számíts arra, hogy a helyszínen biztosan bérelhetsz törölközőt.",
          "icon": "tabler:backpack"
        }
      ],
      "faqs": [
        {
          "question": "Elegendő egy esti jegy a Rulantica-hoz?",
          "answer": "Elég lehet néhány csúszdához vagy a nap rövid lezárásához. Kisgyermekes családok és azok, akik sok területet szeretnének élvezni, általában jobban kihasználják a teljes napot."
        },
        {
          "question": "Meglátogatható ugyanazon a napon az Europa-Park és a Rulantica?",
          "answer": "Technikailag igen, de ez a kombináció megterhelő, és szigorú prioritásokat igényel. Az eszköz figyelembe veszi a parkban töltött napokat, a gyerekeket és a kívánt tempót."
        },
        {
          "question": "Kölcsönözhető törölköző a Rulantica-ban?",
          "answer": "A hivatalos GYIK szerint nincs általános törölközőkölcsönzés az egynapos látogatóknak. Hozd magaddal a sajátodat, és indulás előtt ellenőrizd újra az információkat."
        }
      ]
    },
    "stayGuide": {
      "title": "Szállás az Europa-Park közelében: szállodák, Rust és környéke",
      "description": "Hasonlítsd össze az Europa-Parkhoz közeli szállásokat: tematikus hotel, panzió, apartman, kemping és környék időmegtakarítás, konyha és közlekedés szerint.",
      "eyebrow": "Szállás",
      "heading": "Melyik szállás illik a látogatási tervedhez?",
      "answer": "A legjobb szállás nem csak a szobaártól függ. Hasonlítsd össze a korai belépést, a távolságokat, a közlekedést, a saját konyhát, a lemondási feltételeket és a csoport teljes költségét.",
      "sectionTitle": "Utazási helyzetek önkényes szállodarangsor helyett",
      "sectionIntro": "Az összehasonlítás a szállástípusokat és az ellenőrizendő szempontokat mutatja. Szándékosan kerüli a nem igazolt árakat és az egyes szálláshelyek rangsorolását.",
      "points": [
        {
          "title": "A resort előnyei",
          "text": "A hivatalos tematikus szállodák korai belépést és transzfert kínálhatnak; ellenőrizd az utazási dátumodra, hogy ez elérhető-e, és mely attrakciók lesznek nyitva.",
          "icon": "tabler:sparkles"
        },
        {
          "title": "Rust és konyhával rendelkező szállás",
          "text": "A panziók és apartmanok rövid távolságot vagy konyhát kínálhatnak, de minden szolgáltatást az adott szálláshellyel kell megerősíteni.",
          "icon": "tabler:building-cottage"
        },
        {
          "title": "Környék és közlekedés",
          "text": "Egy alacsonyabb szobadíj nem biztos, hogy megéri, ha hozzáadjuk a parkolást, az utolsó buszt és a további utazásokat.",
          "icon": "tabler:bus"
        }
      ],
      "faqs": [
        {
          "question": "Az Europa-Park hivatalos szállodái mindig a legjobb választás?",
          "answer": "Nem. Jó választást jelenthetnek, ha fontosak a resort vendégelőnyei és a kényelem. Önellátáshoz, nagy csoportokhoz vagy más költségkerethez egy független szálláshely jobban illeszkedhet."
        },
        {
          "question": "Az összehasonlítás a szállodák aktuális árait mutatja?",
          "answer": "Nem. Megbízható árhoz pontos dátum, foglaltság és foglalási feltételek szükségesek. Ezért a költségkalkulátor az általad ellenőrzött szállásárat használja."
        },
        {
          "question": "Mely településeket érdemes még figyelembe venni Rust mellett?",
          "answer": "Többek között Ringsheim, Herbolzheim és az Erlebnisregion további települései. A konkrét közlekedési kapcsolat és az utolsó visszaút lehetősége a döntő."
        }
      ]
    },
    "restaurantGuide": {
      "title": "Éttermek Rustban az Europa-Park után: ellenőrzött útmutató",
      "description": "Keress vacsorahelyet Rustban: semleges, forrásokkal ellenőrzött adatlapok konyhatípussal, szolgáltatásokkal, bizonytalanságokkal és közvetlen linkekkel.",
      "eyebrow": "Étkezés Rustban",
      "heading": "Hol vacsorázhatsz Rustban a park zárása után?",
      "answer": "A címtár nem toplista. Olyan éttermeket mutat, amelyekhez visszakereshető elsődleges vagy önkormányzati forrás tartozik, és jelzi, mely nyitvatartást, foglalást és étkezési igényt kell közvetlenül ellenőrizni.",
      "sectionTitle": "Hasznosabb, mint egy ellenőrizetlen étteremranglista",
      "sectionIntro": "A nyitvatartás és a szünnapok változhatnak. Ezért minden adatlapon külön tüntetjük fel a dokumentált konyhatípust, a szolgáltatási információkat és a még tisztázandó kérdéseket.",
      "points": [
        {
          "title": "Források csillagok helyett",
          "text": "Nem használjuk a platformok értékeléseit minőségi bizonyítékként, hanem a létesítmény és az önkormányzat oldalaira mutató linkeket adunk.",
          "icon": "tabler:source-code"
        },
        {
          "title": "Dokumentált vacsorakínálat",
          "text": "A szűrő csak dokumentált szolgáltatási információkat használ. Ettől függetlenül a látogatás napjára erősítsd meg a konyha tényleges nyitvatartását.",
          "icon": "tabler:clock"
        },
        {
          "title": "Nincs kitalált étkezési szűrő",
          "text": "Csak vegán, gluténmentes vagy allergiabarát lehetőségeket jelezünk, ha léteznek aktuális és megbízható adatok.",
          "icon": "tabler:salad"
        }
      ],
      "faqs": [
        {
          "question": "A címtárban szereplő éttermek ajánlások?",
          "answer": "Nem. Egy adatlap csak azt jelenti, hogy az étterem visszakereshető forrásban szerepel. Nem értékeltük az ízt, a minőséget vagy az asztalok elérhetőségét."
        },
        {
          "question": "Garantáltak a nyitvatartási idők?",
          "answer": "Nem. A rendkívüli nyitvatartás, az ünnepnapok és a konyha nyitvatartása rövid időn belül változhat. Ellenőrizd az étterem weboldalát, vagy indulás előtt telefonálj."
        },
        {
          "question": "Miért nem jelennek meg a távolságok?",
          "answer": "A megbízható gyaloglási idő a tényleges kiindulóponttól és útvonaltól függ. Ezeket az adatokat akkor adjuk hozzá, ha térképpel vagy helyszíni méréssel következetesen ellenőrizhetők."
        }
      ]
    },
    "resortPassGuide": {
      "title": "Europa-Park ResortPass 2026: elérhetőség, árak és szabályok",
      "description": "Ismerd meg a ResortPass Silver és Gold értékesítési állapotát, árait, látogatási napjait, foglalását, Rulantica-előnyeit és a független készletértesítőt.",
      "eyebrow": "ResortPass útmutató",
      "heading": "Minden fontos tudnivaló az Europa-Park ResortPass-ról",
      "answer": "A Silver és a Gold jelenleg nem kapható a szokásos értékesítésben, és új dátumot sem jelentettek be. A Silver olcsóbb, és meghatározott napokhoz kötődik; a Gold rugalmasabb, és további Rulantica-előnyöket tartalmaz.",
      "sectionTitle": "Válaszd az éves bérletet a használat alapján",
      "sectionIntro": "Az ár nem az egyetlen fontos tényező. Fontosabbak a lehetséges látogatási napok, a rugalmasság, a Rulantica használata és a bérlet valós elérhetősége.",
      "points": [
        {
          "title": "Először az elérhetőség",
          "text": "A készletfigyelő rendszeresen ellenőrzi a hivatalos boltot, és megkülönbözteti a tényleges értékesítést a bejelentésektől vagy a várólistától.",
          "icon": "tabler:bell-ringing"
        },
        {
          "title": "Silver vagy Gold",
          "text": "A Silver meghatározott látogatási napokra érvényes; a Gold nagyobb rugalmasságot kínál, és két napijegyet tartalmaz a Rulantica-ba.",
          "icon": "tabler:scale"
        },
        {
          "title": "Ellenőrizd a szabályokat a portálon",
          "text": "A foglalások, a kizárt napok és a feltételek változhatnak, ezért vásárlás előtt ellenőrizd azokat a hivatalos forrásból.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Mikor kezdik újra árusítani a ResortPass-t?",
          "answer": "Jelenleg nem jelentettek be új értékesítési dátumot. A készletfigyelő jelzi, amikor a Silver vagy a Gold ténylegesen elérhetővé válik a hivatalos boltban."
        },
        {
          "question": "Mennyibe kerül a ResortPass?",
          "answer": "A legutóbbi hivatalos ellenőrzés szerint a Silver felnőtteknek 325 euróba, gyermekeknek és időseknek 275 euróba kerül; a Gold pedig rendre 495 és 430 euróba kerül."
        },
        {
          "question": "Kapcsolatban áll a készletfigyelő az Europa-Parkkal?",
          "answer": "Nem. Ez egy független közösségi projekt. A vásárlás, a szerződés és a kötelező juttatások kizárólag a hivatalos szolgáltatókkal intézhetők."
        }
      ]
    },
    "resortPassCompare": {
      "title": "ResortPass Silver vagy Gold? Összehasonlítás és választási segítség",
      "description": "Hasonlítsd össze a ResortPass Silver és Gold árait, látogatási napjait, rugalmasságát, Rulantica-előnyeit és felhasználási helyzeteit.",
      "eyebrow": "Silver vagy Gold",
      "heading": "Melyik ResortPass illik a parklátogatási szokásaidhoz?",
      "answer": "A Silver jobban illik hozzád, ha megfelelnek a meghatározott napok, és az alacsonyabb ár a fontos. A Gold akkor ér többet, ha maximális rugalmasságot szeretnél, és ténylegesen kihasználod a benne foglalt Rulantica-napokat.",
      "sectionTitle": "A legdrágább belépő nem automatikusan a jobb",
      "sectionIntro": "Hasonlítsd össze a tényleges látogatási napjaidat és a további előnyöket. A rugalmasság vagy a fel nem használt Rulantica jegyek nem jelentenek értéket.",
      "points": [
        {
          "title": "Silver: alacsonyabb ár tervezéssel",
          "text": "Megfelelő, ha előre rögzíteni tudod a dátumokat, és a közzétett napok illeszkednek a naptáradhoz.",
          "icon": "tabler:calendar-check"
        },
        {
          "title": "Gold: nagyobb rugalmasság",
          "text": "Gyakoribb spontán látogatásokhoz és azoknak megfelelő, akik mindkét, a Rulantica-ba szóló napijegyet kihasználják.",
          "icon": "tabler:crown"
        },
        {
          "title": "Hasonlítsd össze a napi belépőkkel",
          "text": "Számold ki, hány látogatást fogsz ténylegesen tenni, és hasonlítsd össze a belépők áraival a dátum szerint.",
          "icon": "tabler:calculator"
        }
      ],
      "faqs": [
        {
          "question": "Vannak a Silver esetében kizárt napok?",
          "answer": "A Silver a korábban meghatározott nyitvatartási napokon érvényes. A hivatalos weboldal és a ResortPass portál aktuális listája a mérvadó."
        },
        {
          "question": "Tartalmaz a Gold belépőket a Rulantica-ba?",
          "answer": "A jelenlegi üzemeltetői információk szerint a Gold két napijegyet tartalmaz a Rulantica-ba. Felhasználás előtt ellenőrizd a hivatalos feltételeket és a foglalást."
        },
        {
          "question": "Hány látogatás után éri meg egy bérlet?",
          "answer": "A tényleges dátumoktól, a napijegyek áraitól és a használt további előnyöktől függ. Egyetlen számot adni megtévesztő lenne."
        }
      ]
    },
    "resortPassPrices": {
      "title": "ResortPass 2026 árai: Silver, Gold és napijegyek",
      "description": "A ResortPass aktuális árai felnőtteknek, gyerekeknek és időseknek, összehasonlítva az Europa-Park dátumfüggő napijegyeivel.",
      "eyebrow": "2026 árak",
      "heading": "Mennyibe kerül a ResortPass Silver és Gold?",
      "answer": "A legutóbbi hivatalos ellenőrzés szerint a Silver 325 euró felnőtteknek és 275 euró gyermekeknek és időseknek; a Gold ára rendre 495 és 430 euró. Jelenleg egyik sem kapható a szokásos értékesítésben.",
      "sectionTitle": "Értékeld az árat a használattal együtt",
      "sectionIntro": "A napijegyek árai az időponttól függően változnak. Ezért az éves bérlet nem térül meg egy univerzális szám alapján, hanem a tényleges dátumaid függvényében.",
      "points": [
        {
          "title": "Silver",
          "text": "325 euró felnőtteknek; 275 euró 4–11 éves gyermekeknek és 60 éves vagy idősebb személyeknek. Vedd figyelembe az elsődleges forrás dátumát.",
          "icon": "tabler:circle-letter-s"
        },
        {
          "title": "Gold",
          "text": "495 euró felnőtteknek; 430 euró gyermekeknek és időseknek, további előnyökkel, például két Rulantica-napijeggyel.",
          "icon": "tabler:circle-letter-g"
        },
        {
          "title": "A rendelkezésre állás elengedhetetlen",
          "text": "Az ár-összehasonlításnak csak akkor van értelme, ha a kívánt bérlet ténylegesen kapható. Ellenőrizd az aktuális állapotot.",
          "icon": "tabler:shopping-cart"
        }
      ],
      "faqs": [
        {
          "question": "Ezek a 2026-os árak?",
          "answer": "Az összegeket a hivatalos jegyoldalról vették a feltüntetett ellenőrzési dátumon. A szolgáltató módosíthatja az árakat és a feltételeket."
        },
        {
          "question": "Vannak különleges díjak?",
          "answer": "A hivatalos oldal csökkentett árakat jelez gyermekek, idősek és bizonyos igazolások esetén. A bizonyítványok és az érvényes feltételek kötelező érvényűek."
        },
        {
          "question": "Meg tudom vásárolni a ResortPass-t most?",
          "answer": "A Silver és a Gold jelenleg nem elérhető. A valós idejű készletfigyelő mutatja, mikor változik a bolt tényleges állapota."
        }
      ]
    },
    "resortPassReservation": {
      "title": "ResortPass látogatási foglalások: napok, portál és szállodai vendégek",
      "description": "Így működik a látogatás foglalása ResortPass használatával: napregisztráció, férőhelyek, szállodai foglalás és a portál aktuális szabályai.",
      "eyebrow": "Foglalás",
      "heading": "Le kell foglalnod a látogatást ResortPass használatakor?",
      "answer": "A szükséges foglalás a bérlettől, a látogatás napjától és az esetleges férőhelykorláttól függ. A ResortPass portál és a hivatalos GYIK az irányadó; a szállodai foglalás nem minden esetben helyettesíti automatikusan az összes szükséges lépést.",
      "sectionTitle": "Ellenőrizz három dolgot indulás előtt",
      "sectionIntro": "Az érvényes bérlet, az engedélyezett nap kiválasztása és a kötelező foglalás három külön követelmény.",
      "points": [
        {
          "title": "Nyisd meg a bérlet portálját",
          "text": "Ellenőrizd ott az érvényességet, a regisztrált látogatási napokat és az aktuális információt a férőhelyekről.",
          "icon": "tabler:login-2"
        },
        {
          "title": "Ellenőrizd a szállodai foglalást",
          "text": "Az aktuális GYIK-ban ellenőrizd, hogy a látogatási napok kapcsolódnak-e az adott resortszállásodhoz, és ha igen, hogyan.",
          "icon": "tabler:hotel-service"
        },
        {
          "title": "Őrizd meg a visszaigazolást",
          "text": "A látogatás napján készítsd elő a bérletet és a foglalási visszaigazolást a hivatalos alkalmazásban vagy a megadott formátumban.",
          "icon": "tabler:ticket"
        }
      ],
      "faqs": [
        {
          "question": "Minden látogatást külön foglalnom kell?",
          "answer": "Nem lehet általános választ adni az összes bérlettípusra és időszakra. Ellenőrizd az aktuális szabályt a ResortPass portálon minden látogatás előtt."
        },
        {
          "question": "Egy szállodai foglalás automatikusan tartalmazza a parkfoglalást?",
          "answer": "A hivatalos GYIK különleges szabályokat ír le a vendégek számára. Ne alapozz feltételezésekre: ellenőrizd a konkrét foglalásodat a portálon."
        },
        {
          "question": "Mi történik, ha betelik a keret?",
          "answer": "Az üzemeltető aktuális szabályai érvényesek. A készletfigyelő az értékesítést ellenőrzi, nem a személyes portál egyes látogatási napjainak férőhelyeit."
        }
      ]
    },
    "resortPassRulantica": {
      "title": "ResortPass és Rulantica: Gold-előnyök és foglalás",
      "description": "Milyen Rulantica-előnyöket tartalmaz a ResortPass Gold? Két napijegy, tervezés, foglalás és a Silverhez képest fennálló különbségek.",
      "eyebrow": "ResortPass + Rulantica",
      "heading": "Mit tartalmaz a ResortPass a Rulantica-hoz?",
      "answer": "A jelenlegi üzemeltetői információk szerint a ResortPass Gold két napijegyet tartalmaz a Rulantica-ba; a Silver nem. A látogatás előtt hivatalosan ellenőrizd a foglalást, az érvényességet és az esetleges férőhelykorlátot.",
      "sectionTitle": "Használd ki valóban a két Rulantica-napot",
      "sectionIntro": "Az előny csak akkor értékes, ha a benne foglalt napok illeszkednek az utazásodhoz, és időben le tudod foglalni őket.",
      "points": [
        {
          "title": "Tervezd meg a Gold előnyt",
          "text": "Kezeld a két napot az éves tervezésed részeként, ne rögtönzött extra programként a park zárása után.",
          "icon": "tabler:droplet-filled"
        },
        {
          "title": "Számold külön a Silver költségét",
          "text": "A Silver esetén a Rulantica-jegyeket külön kell betervezni a költségvetésbe, és az elérhetőség szerint lefoglalni.",
          "icon": "tabler:receipt-euro"
        },
        {
          "title": "Ellenőrizd a rendelkezésre álló időt",
          "text": "Családoknak egy teljes nap a Rulantica-ban általában többet nyújt, mint egy sietős átutazás az Europa-Parkban töltött teljes nap után.",
          "icon": "tabler:clock-hour-8"
        }
      ],
      "faqs": [
        {
          "question": "Hány Rulantica-napot tartalmaz a Gold?",
          "answer": "A jelenlegi hivatalos szolgáltatások szerint két napijegyet a Rulantica-ba. Felhasználásukkor az üzemeltető aktuális feltételei érvényesek."
        },
        {
          "question": "Tartalmaz a Silver Rulantica-belépőt?",
          "answer": "A jelenlegi összehasonlítás szerint a Rulantica nem része az alapcsomagnak. A szükséges belépőket külön kell betervezned a költségvetésbe."
        },
        {
          "question": "Le kell foglalni a csomagban szereplő napokat?",
          "answer": "Ellenőrizd az aktuális foglalási szabályokat a ResortPass portálon. A Rulantica napi férőhelyei korlátozottak."
        }
      ]
    }
  },
  "visitPlanner": {
    "eyebrow": "Interaktív tervező",
    "title": "A reális napi terved",
    "intro": "Válaszd ki az időtartamot, a csoportot és a feltételeket. Megbízható sorrendet kapsz, nem hamis percre pontos tervet.",
    "dateLabel": "Látogatás dátuma",
    "daysLabel": "Tervezett napok a parkban",
    "days": [
      "1 nap",
      "2 nap",
      "3 nap"
    ],
    "groupLabel": "Prioritás",
    "groups": {
      "balanced": "Kiegyensúlyozott",
      "family": "Család és gyerekek",
      "thrill": "Hullámvasutak és akció",
      "shows": "Műsorok és nyugodt tempó"
    },
    "arrivalLabel": "Érkezés",
    "arrivals": {
      "early": "A nyitás előtt",
      "opening": "A nyitás idején",
      "late": "10:30 után"
    },
    "crowdLabel": "Várható látogatószám",
    "crowds": {
      "low": "Inkább alacsony",
      "medium": "Közepes",
      "high": "Magas"
    },
    "rulanticaLabel": "Rulantica hozzáadása",
    "submit": "Tervezés létrehozása",
    "resultTitle": "A neked szóló ajánlás",
    "resultLead": "Tervezz világos prioritásokkal",
    "resultDays": "összes javasolt nap",
    "routeLabel": "Napi terv",
    "morning": "Reggel",
    "midday": "Dél",
    "afternoon": "Délután",
    "evening": "Este",
    "notes": {
      "early": "Érkezz a bejárathoz a hivatalos nyitás előtt, és határozz meg három fő célt.",
      "late": "Ha későn érkezel, egy második nap biztonságosabb, mint túl gyorsan mindent megpróbálni.",
      "busy": "Nagy tömeg esetén használd az élő várakozási időket, és készíts alternatívákat területenként.",
      "rulantica": "Kisgyermekekkel, vagy ha a vízi élmények a legfontosabbak, tervezz külön napot a Rulantica-ra.",
      "family": "Tervezd meg az étkezésre és pihenésre szánt fix blokkokat, valamint legalább egy fedett alternatívát.",
      "thrill": "A Single Rider és a VirtualLine lehetőséget csak akkor használd, ha valóban elérhetők a látogatás napján.",
      "shows": "Először ellenőrizd a műsorok időpontjait, és ezek köré tervezd az útvonalat."
    },
    "routes": {
      "balanced": [
        "Kezdd két fontos attrakcióval, és maradj a park ugyanabban a területében.",
        "Étkezz korán vagy későn, majd iktass be egy fedett attrakciót vagy műsort nyugodt blokként.",
        "Járd be a szomszédos tematikus területeket, és hasonlítsd össze a valós idejű várakozási időket, mielőtt váltanál.",
        "Teljesíts még egy fontos célt, hagyj időt az ajándéktárgyakra, és ellenőrizd, hogy meghosszabbították-e a park nyitvatartását."
      ],
      "family": [
        "Kezdj egy megfelelő családi attrakcióval, és előtte ellenőrizd a magasságot a bejáratnál.",
        "Tervezz korai pihenőt, étkezést és egy fedett attrakciót vagy nyugodt műsort.",
        "Kombinálj egy játszóteret és két további, életkornak megfelelő attrakciót a park ugyanazon felében.",
        "Igazodj a gyerekek energiaszintjéhez: jobb egy valódi csúcspont, mint egy kimerítő befejezés."
      ],
      "thrill": [
        "Elsősorban a fő hullámvasutakat részesítsd előnyben nyitáskor, és ne vágj át az egész parkon egyetlen attrakció miatt.",
        "Ellenőrizd a VirtualLine és a Single Rider lehetőséget; délben válassz egy közeli alternatívát.",
        "Válaszd ki a hullámvasutak második csoportját az aktuális várakozási idők alapján, és számolj a műszaki meghibásodásokkal.",
        "Tervezd meg stratégiailag az utolsó kört a hely közelében, ahol be szeretnél fejezni."
      ],
      "shows": [
        "Nézd meg a programot, és válassz egy nyugodt attrakciót az első műsor felé vezető úton.",
        "Kombinálj egy korai étkezést egy fedett műsorral vagy egy tematikus attrakcióval.",
        "Foglalj egy második műsort, és a kettő között csak közeli attrakciókat iktass be.",
        "Élvezd a hangulatot, a gasztronómiát és az utolsó attrakciót anélkül, hogy felesleges területváltások lennének."
      ]
    },
    "disclaimer": "Tervezési segítség garancia nélkül. A menetrendek, várakozási idők, a VirtualLine és az attrakciók üzemelése rövid időn belül változhat.",
    "forecastCta": "Látogatottsági előrejelzés ellenőrzése"
  },
  "costCalculator": {
    "eyebrow": "2026 költségvetési tervező",
    "title": "Számolj ki reális költségtartományt",
    "intro": "Hivatalos jegyártartományok plusz a saját szállásbecslésed. Az étkezést, utazást és opcionális extrákat szándékosan nem adjuk hozzá automatikusan.",
    "adults": "Felnőttek 12 éves kortól",
    "children": "Gyermekek 4–11 éves korig",
    "days": "Europa-Park",
    "oneDay": "1 nap",
    "twoDays": "2 nap",
    "rulantica": "Rulantica",
    "rulanticaOptions": {
      "none": "Ne tartalmazza",
      "day": "Napijegy",
      "evening": "Esti belépő 17 órától",
      "moonlight": "Moonlight 19 órától"
    },
    "parking": "Standard parkolás az Europa-Parknál",
    "nights": "Éjszakák",
    "lodgingPerNight": "Teljes szállásköltség éjszakánként",
    "calculate": "Költségvetés frissítése",
    "resultEyebrow": "A költségtartományod",
    "total": "Becsült teljes költség",
    "rangeConnector": "–",
    "perPerson": "személyenként",
    "breakdown": "Részletezés",
    "europaParkTickets": "Europa-Park-belépők",
    "rulanticaTickets": "Rulantica-belépők",
    "parkingCost": "Parkolás",
    "lodgingCost": "Szállás",
    "variableNote": "Az árak dátumfüggők; a tartomány nem garantálja a végső árat.",
    "assumptionNote": "Adj hozzá ételt, utazást és esetleges kezelési költségeket is.",
    "currency": "EUR"
  },
  "familyFinder": {
    "eyebrow": "Családi kereső",
    "title": "Szűrd az attrakciókat életkor és magasság szerint",
    "intro": "A kereső egy kis, hivatalosan ellenőrzött kiválasztást használ. A végső döntés mindig a park személyzetéé.",
    "age": "A gyermek kora",
    "height": "Magasság",
    "interest": "Érdeklődés",
    "interests": {
      "all": "Minden ellenőrzött példa",
      "calm": "Nyugodt",
      "family": "Családi kaland",
      "thrill": "Akció",
      "indoor": "Fedett"
    },
    "submit": "Megfelelő példák megjelenítése",
    "resultTitle": "Ellenőrzött kiválasztás",
    "resultCount": "Megjelenített attrakciók",
    "eligible": "Megfelel a követelményeknek",
    "accompanied": "Felnőtt kísérő szükséges",
    "notYet": "Még nem felel meg a követelményeknek",
    "minimum": "Minimum",
    "years": "év",
    "centimeters": "cm",
    "indoor": "Fedett",
    "source": "Hivatalos forrás",
    "noResults": "Ehhez a szűrőhöz még nincs ellenőrzött példaattrakció.",
    "disclaimer": "Nem garantálja, hogy használhatod az attrakciót. A parkban a táblák, a helyszíni mérés, az egészségügyi és biztonsági szabályok, valamint a személyzet utasításai az irányadók.",
    "officialFilter": "Nézd meg az összes attrakciót a hivatalos szűrőben"
  },
  "rulanticaPlanner": {
    "eyebrow": "Kombinációtervező",
    "title": "Melyik Rulantica-jegy illik az utazásodhoz?",
    "intro": "Az eszköz figyelembe veszi a parknapokat, a gyerekeket, a vízi élmények fontosságát és az energiaszintet. Ezután a hivatalos oldalon ellenőrizd az árakat és az elérhetőséget.",
    "parkDays": "Europa-Park-napok",
    "parkDayOptions": [
      "1 parknap",
      "2 parknap",
      "3 nap vagy több"
    ],
    "children": "Gyerekek a csoportban",
    "childOptions": [
      "Nincs gyermek",
      "8 év alatti gyerekek",
      "Idősebb gyerekek/tinédzserek"
    ],
    "waterPriority": "A Rulantica jelentősége",
    "priorityOptions": [
      "Csak kipróbálni",
      "Fontos kiegészítő",
      "Fő cél"
    ],
    "energy": "Kívánt tempó",
    "energyOptions": [
      "Nyugodt tempó",
      "Kiegyensúlyozott",
      "Intenzív program"
    ],
    "submit": "Jegytípus értékelése",
    "resultLabel": "Tervezési ajánlás",
    "recommendations": {
      "day": {
        "title": "Egy teljes nap a Rulantica-ban",
        "text": "Kisgyermekekkel vagy ha a víz a prioritás, egy külön nap elegendő időt hagy a szünetekre, átöltözésre és több terület meglátogatására."
      },
      "evening": {
        "title": "Esti belépő kiegészítésként",
        "text": "Normál tempóhoz és világos prioritásokhoz illik, de az Europa-Park után tervezz valódi pihenőt és elegendő utazási időt."
      },
      "moonlight": {
        "title": "Moonlight egy rövid lezárásra",
        "text": "Három óra jobban illik tapasztalt, energikus és kevés prioritással rendelkező látogatókhoz, mint egy teljes első látogatáshoz."
      },
      "separate": {
        "title": "Tervezd külön a Rulantica-t",
        "text": "Nyugodtabb tempónál vagy hosszabb utazásnál a külön időblokk biztosabb, mint az átváltás egy teljes parknap után."
      }
    },
    "checklistTitle": "Mit vigyél magaddal és mit ellenőrizz előre",
    "checklist": [
      "Saját törölköző az egynapos látogatóknak",
      "Fürdőruha és száraz csere ruha",
      "Aktuális nyitvatartási és karbantartási idők",
      "A kívánt csúszdákhoz kapcsolódó életkori és magassági szabályok",
      "Foglalás, belépő és szekrény lehetősége"
    ],
    "officialNote": "A belépés, az öltözet, a törölközők, a babakocsik és a szekrények kérdésében a hivatalos GYIK az irányadó.",
    "officialCta": "Nyisd meg a Rulantica GYIK-jét"
  },
  "stayComparator": {
    "eyebrow": "Szállás-összehasonlító",
    "title": "Milyen típusú szállás illik az utazásodhoz?",
    "intro": "Hasonlítsd össze a nyolc szállástípust dokumentált jellemzőik alapján. A kereső nem mutat rangsort vagy ellenőrizetlen árakat: segít leszűkíteni a valóban megfelelő lehetőségeket.",
    "filtersLabel": "Szállások szűrése",
    "scenarioLabel": "Mi az, ami különösen fontos számodra?",
    "allScenarios": "Minden utazási helyzet",
    "prioritiesLabel": "További jellemzők",
    "priorities": {
      "operatorGuestBenefits": "Resort-vendégelőnyök",
      "selfCatering": "Konyhával felszerelt szállás",
      "ownSleepingUnitRequired": "Saját alvófelszerelés",
      "groupFormats": "Csoportok számára megfelelő",
      "walkingAccess": "A park gyalog elérhető",
      "shuttleOrTransit": "Transzfer vagy tömegközlekedés"
    },
    "reset": "Szűrők visszaállítása",
    "resultsLabel": "Összehasonlítható szállástípusok",
    "resultSingular": "szállástípus",
    "resultPlural": "szállástípusok",
    "operatorRelation": {
      "resort_operated": "Az Europa-Park Resort üzemelteti",
      "independent": "Független létesítmény"
    },
    "states": {
      "verified": "Dokumentált",
      "available_for_this_type": "Elérhető ennél a típusnál",
      "not_applicable": "Nem vonatkozik",
      "varies_by_property": "Szálláshelyenként változik",
      "must_verify": "Foglalás előtt ellenőrizd"
    },
    "verifyTitle": "Mit kell ellenőrizni foglalás előtt",
    "source": "Forrás megnyitása",
    "checkedAt": "Felülvizsgálva",
    "emptyTitle": "Egyetlen szállástípus sem felel meg minden szűrőnek",
    "emptyText": "Távolíts el egy jellemzőt, vagy válaszd újra az összes utazási helyzetet. Az üres eredmény nem mond semmit az egyes szálláshelyekről.",
    "priceNoteTitle": "Miért nem mutatjuk a szállodai árakat",
    "priceNoteText": "Az árak a dátum, a foglaltság, a díjszabás és a szolgáltatások szerint változnak. Először hasonlítsd össze a megfelelő típust, majd erősítsd meg a végső árat közvetlenül a szolgáltatónál.",
    "notRanking": "A sorrend semleges: nem jelent minőségi értékelést vagy fizetett ajánlást.",
    "noJs": "JavaScript nélkül minden szállástípus és ellenőrzőlista látható; csak az interaktív szűrők hiányoznak.",
    "scenarioLabels": {
      "operator-benefits-priority": "Korai belépés és resorttranszfer előnyben",
      "park-and-rulantica-without-car": "Europa-Park és Rulantica saját autó nélkül",
      "own-motorhome-or-caravan": "Utazás saját lakóautóval vagy lakókocsival",
      "own-tent": "Alvás saját sátorban",
      "large-group-themed-stay": "Tematikus szállás családok, egyesületek vagy csoportok számára",
      "self-catering-filter": "Konyha megléte kiválasztási szempontként",
      "walkability-filter": "Szűrés a főbejárat gyalogos elérhetősége szerint"
    },
    "typeContent": {
      "official-themed-hotel": {
        "label": "Europa-Park tematikus szálloda",
        "definition": "A resort által üzemeltetett hat tematikus 4 csillagos (superior) szálloda egyike.",
        "mustVerify": [
          "a konkrét utazási dátumokhoz elérhető előnyök",
          "hogy mely látnivalók nyitnak valóban korai belépéskor",
          "a szoba befogadóképessége és akadálymentessége",
          "hogy a jegyek benne vannak-e a kiválasztott csomagban vagy külön kell megvásárolni"
        ]
      },
      "riverside-western-lodge": {
        "label": "Riverside Western Lodge",
        "definition": "Szállás a Silver Lake City szobáiban, külön vendégelőnyökkel.",
        "mustVerify": [
          "Rust aktuális buszmenetrendje",
          "az utazás konkrét időpontjaiban elérhető előnyök",
          "a szoba befogadóképessége és akadálymentessége",
          "a Silver Lake City eseményei miatti lehetséges zajos időszakok"
        ]
      },
      "tipi-town": {
        "label": "Tipi Town",
        "definition": "Tematikus szállás csoportoknak és családoknak tipikben, kocsikban, faházszobákban és Western Houses épületekben.",
        "mustVerify": [
          "a választott kategória fürdőszobáinak és hálóhelyeinek elrendezése",
          "hogy a reggeli kötelező-e, vagy hozzáadható",
          "elérhető előnyök az utazás konkrét dátumain",
          "lehetséges zajos időszakok rendezvények miatt",
          "hogy az emeletes ágyak hossza megfelelő-e az utazóknak"
        ]
      },
      "official-caravaning": {
        "label": "Europa-Park Caravaning",
        "definition": "Lakóautó- és lakókocsiparcellák a Silver Lake City területén.",
        "mustVerify": [
          "a jármű méretei és a megfelelő parcellakategória",
          "az adott foglalás áram- és vízelérhetési feltételei",
          "érkezési, pihenési és távozási idők",
          "az aktuális előnyök és a Rust-busz menetrendje"
        ]
      },
      "official-tent-camping": {
        "label": "Europa-Park Camping",
        "definition": "Kempingterület a Silver Lake City területén saját sátorral érkező vendégeknek.",
        "mustVerify": [
          "a sátrakra és parcellákra vonatkozó szabályok",
          "az áramigény és a csatlakozási feltételek",
          "a mosdók és a reggelizési lehetőségek",
          "az időjárás, a pihenőidő és az aktuális vendégelőnyök"
        ]
      },
      "independent-hotel-or-guesthouse-rust": {
        "label": "Független szálloda vagy panzió Rustban",
        "definition": "Független szálláshely Rust településen.",
        "mustVerify": [
          "az aktuális működés és foglalhatóság",
          "a tényleges gyalogos útvonal a kívánt bejáratig",
          "a reggeli, parkolás, lemondás és akadálymentesség",
          "ne feltételezd automatikusan a resort szállodáinak előnyeit"
        ]
      },
      "independent-holiday-apartment-rust": {
        "label": "Független üdülőapartman Rustban",
        "definition": "Független szállás, amelyet Rust önkormányzata üdülőapartmanként tart nyilván.",
        "mustVerify": [
          "a tényleges konyhai és étkezőfelszerelés, nem pusztán a kategória alapján",
          "a tényleges gyalogos útvonal a kívánt bejáratig",
          "minimális tartózkodás, végső takarítás, parkolás és lemondás",
          "az aktuális nyilvántartás és foglalhatóság"
        ]
      },
      "accommodation-nearby-municipalities": {
        "label": "Szállás egy közeli településen",
        "definition": "Független szállás Rust településén kívül, az Europa-Park Erlebnisregion egyik településén.",
        "mustVerify": [
          "a közlekedési kapcsolat a hét adott napján és a park zárásakor",
          "az utolsó visszaút és az átszállások",
          "a parkolás a célállomáson és a szállásnál",
          "az aktuális működés és foglalhatóság"
        ]
      }
    }
  },
  "restaurantFinder": {
    "eyebrow": "Ellenőrzött címtár",
    "title": "Kisebb éttermek objektív összehasonlítása Rustban",
    "intro": "Keress nyolc szerkesztőségileg ellenőrzött adatlap között. Csak dokumentált jellemzőket mutatunk; a minőségről, az árszintről vagy a szabad asztalokról nem állítunk semmit.",
    "filtersLabel": "Éttermek szűrése",
    "searchLabel": "Név vagy cím",
    "searchPlaceholder": "Például Adler vagy Fischerstraße",
    "statusLabel": "Ellenőrzés állapota",
    "allStatuses": "Minden állapot",
    "statuses": {
      "first_party_verified": "Az étterem saját forrásával dokumentált",
      "public_directory_verified": "A városi nyilvántartásban dokumentált",
      "license_page_verified": "Engedélyoldalon dokumentált",
      "needs_reverification": "Új ellenőrzés szükséges"
    },
    "timeLabel": "Dokumentált nyitvatartás",
    "allTimes": "Minden dokumentált nyitvatartás",
    "timeSlots": {
      "breakfast": "Reggeli",
      "evening": "Vacsorakínálat"
    },
    "distanceLabel": "Dokumentált távolság",
    "allDistances": "Minden dokumentált távolság",
    "distanceOptions": [
      {
        "maxMetres": 500,
        "label": "Legfeljebb 500 m"
      },
      {
        "maxMetres": 1000,
        "label": "Legfeljebb 1 km"
      },
      {
        "maxMetres": 2000,
        "label": "Legfeljebb 2 km"
      }
    ],
    "needsLabel": "Dokumentált igények",
    "familyFeatures": {
      "kids_menu": "Említett gyermekmenü"
    },
    "dietFeatures": {
      "vegetarian_evidence": "Dokumentált vegetáriánus opciók",
      "vegan_evidence": "Dokumentált vegán opciók",
      "gluten_free_evidence": "Dokumentált gluténmentes opciók"
    },
    "reset": "Szűrők visszaállítása",
    "resultsLabel": "Ellenőrzött adatlapok",
    "resultSingular": "étterem",
    "resultPlural": "éttermek",
    "noJs": "JavaScript nélkül minden kártya, forrás és bizonytalanság olvasható; csak a keresés és a szűrők hiányoznak.",
    "emptyTitle": "Egyetlen adatlap sem felel meg ezeknek a szűrőknek",
    "emptyText": "Távolíts el egy szűrőt. A találatok hiánya azt is jelentheti, hogy az adott jellemző még nincs kellően dokumentálva.",
    "serviceEvidence": "Dokumentált szolgáltatás",
    "cuisineEvidence": "Dokumentált konyhatípus",
    "filterEvidence": "A szűrő alapjául szolgáló adat",
    "evidenceCheckedAt": "A szűrő alapjául szolgáló adat ellenőrzése",
    "source": "Elsődleges forrás",
    "operatorWebsite": "Az étterem weboldala",
    "corroboratingSource": "További forrás",
    "uncertaintyTitle": "Mit kell még ellenőrizni a látogatás előtt",
    "verificationNote": "Ellenőrzési megjegyzés",
    "checkedAt": "Adatlap ellenőrizve",
    "reviewDue": "Az újraellenőrzés határideje lejárt",
    "notRecommendation": "Nem ajánlás",
    "notRecommendationTitle": "Semleges címtár, nem toplista",
    "notRecommendationText": "A szerepeltetés és a sorrend nem minőségi értékelés. Közvetlenül az étteremnél erősítsd meg a nyitvatartást, az étlapot, az allergéneket és a foglalást.",
    "unavailableEvidenceTitle": "Szűrők, amelyeket szándékosan mellőztünk",
    "unavailableEvidence": {
      "time": "Az időpontok még nem dokumentáltak kellően egységes módon.",
      "distance": "A távolságokat még nem mérték következetes útvonal alapján.",
      "family": "A családi jellemzők még nem dokumentáltak kellően.",
      "diet": "A vegetáriánus, vegán és gluténmentes opciók még nem kerültek kellően megbízhatóan rögzítésre."
    },
    "entryContent": {
      "gasthaus-adler-rust": {
        "cuisineEvidence": [
          "hagyományos házias konyha"
        ],
        "serviceEvidence": [
          "vacsorakínálat az étterem weboldala szerint"
        ],
        "verificationNote": "Az étterem weboldala és jogi tájékoztatója elérhető volt; az ellenőrzés napján tartalmazta a címet, az elérhetőséget, a konyhatípust és az aktuális nyitvatartást.",
        "uncertainties": [
          "A rendkívüli nyitvatartás és a szabadságok az időponttól függenek.",
          "A foglalások elérhetőségét nem ellenőriztük."
        ]
      },
      "hardys-rust": {
        "cuisineEvidence": [
          "helyi és nemzetközi ételek",
          "hamburgerek, oldalasok, tészták és steakek az étterem szerint"
        ],
        "serviceEvidence": [
          "reggeli az étterem weboldala szerint",
          "vacsorakínálat az étterem weboldala szerint"
        ],
        "verificationNote": "Az étterem weboldala elérhető volt, és tartalmazta a címet, a konyhatípust és a reggelikínálatot.",
        "uncertainties": [
          "A weboldalon szereplő aktuális nyitvatartás rövid időn belül változhat.",
          "A saját promóciós szövegeket és a beágyazott értékeléseket nem használtuk minőségi bizonyítékként."
        ]
      },
      "casa-rustica-rust": {
        "cuisineEvidence": [
          "olasz konyha"
        ],
        "serviceEvidence": [
          "vacsoraszolgáltatás az önkormányzati nyilvántartás szerint"
        ],
        "verificationNote": "Az étterem weboldala megerősíti a működést, a címet és az olasz konyhát; az önkormányzati nyilvántartás aktuális nyitvatartási keretet ad.",
        "uncertainties": [
          "Indulás előtt ellenőrizd a nyitvatartást az étterem weboldalán vagy telefonon.",
          "Az étterem által megadott gyaloglási időt a parkig nem mértük függetlenül."
        ]
      },
      "hotel-restaurant-mythos": {
        "cuisineEvidence": [
          "görög és nemzetközi konyha"
        ],
        "serviceEvidence": [
          "gyermekmenü az étterem weboldala szerint"
        ],
        "verificationNote": "Az étterem weboldala elérhető volt, és megerősítette a címet, a konyhatípust és a foglalási elérhetőséget.",
        "uncertainties": [
          "A web olvasható tartalma nem jelez stabil heti nyitvatartási időket.",
          "Az asztalfoglalás elérhetőségét nem ellenőriztük."
        ]
      },
      "kaiserstuehler-hof-rust": {
        "cuisineEvidence": [
          "badeni konyha",
          "helyi ételek"
        ],
        "serviceEvidence": [
          "vacsorakínálat az étterem weboldala szerint"
        ],
        "verificationNote": "Az étterem weboldala elérhető volt, és feltüntette a címet, a badeni konyhát és az aktuális heti nyitvatartást.",
        "uncertainties": [
          "Ellenőrizd újra a szünnapokat és a pihenőnapot, mielőtt elmész.",
          "Nem állítjuk, hogy alkalmas allergiások számára, anélkül hogy közvetlenül megkérdeztük volna."
        ]
      },
      "restaurant-fenix-rust": {
        "cuisineEvidence": [
          "Az elsődleges forrás nem határozza meg egyértelműen a konyha típusát"
        ],
        "serviceEvidence": [
          "vacsorakínálat az étterem weboldala szerint"
        ],
        "verificationNote": "Az étterem weboldala és önkormányzati adatlapja megerősíti a működést, a címet és az elérhetőséget. Reklámállításokat nem vettünk át.",
        "uncertainties": [
          "Ellenőrizd manuálisan az étlap aktuális konyhatípusát, mielőtt szerkesztői besorolást adnál.",
          "Az étterem weboldala a külső platformoktól eltérő nyitvatartást mutat; csak az étterem saját adatait használd."
        ]
      },
      "la-terrassa-rust": {
        "cuisineEvidence": [
          "A városi jegyzék nem jelzi a konyha típusát"
        ],
        "serviceEvidence": [
          "terasz a városi jegyzék szerint"
        ],
        "verificationNote": "Az étterem szerepel a jelenlegi városi jegyzékben; a hivatkozott weboldal elsősorban a panziót írja le, és nem erősíti meg az étterem részleteit.",
        "uncertainties": [
          "Erősítsd meg közvetlenül a tevékenységet, a konyha típusát és a nyitvatartási időket.",
          "Ne mutasd be szerkesztőségileg ellenőrzött étteremként, amíg nincs közvetlen megerősítés."
        ]
      },
      "my-denis-rust": {
        "cuisineEvidence": [
          "Az önkormányzati nyilvántartás nem jelzi a konyha típusát."
        ],
        "serviceEvidence": [
          "Házhoz szállítás az önkormányzati nyilvántartás szerint."
        ],
        "verificationNote": "Csak az önkormányzati nyilvántartásban szerepel; a felülvizsgálat időpontjában nem találtunk megbízható saját weboldalt.",
        "uncertainties": [
          "Erősítsd meg közvetlenül a tevékenységet, a kapcsolatot, a konyha típusát és a nyitvatartási időket.",
          "Ne vegyél fel a felhasználók számára szóló ajánlásokba vagy rangsorokba, amíg nincs közvetlen forrásból ellenőrizve."
        ]
      }
    }
  },
  "resortPassTool": {
    "eyebrow": "Segítség a ResortPass kiválasztásához",
    "title": "Ellenőrizd egyszerre az állapotot, az előnyöket és a tényleges költséget",
    "intro": "A valós idejű állapot megmutatja, hogy megvásárolható-e a bérlet. Ezután az összehasonlító és a kalkulátor segít választani a napijegyek, a Silver és a Gold között.",
    "statusTitle": "Jelenlegi értékesítési állapot",
    "statusChecking": "Az állapot ellenőrzése…",
    "statusAvailable": "Most hivatalosan elérhető",
    "statusUnavailable": "Jelenleg nem elérhető",
    "statusUnknown": "Az állapot jelenleg bizonytalan",
    "statusError": "Nem sikerült betölteni a valós idejű állapotot",
    "lastChecked": "Utolsó ellenőrzés",
    "comparisonTitle": "Silver és Gold egy pillantás alatt",
    "feature": "Jellemző",
    "silver": "Silver",
    "gold": "Gold",
    "adultPrice": "Felnőttár",
    "concessionPrice": "4–11 éves gyermekek / 60 éves kortól",
    "visitDays": "Látogatási napok",
    "visitDaysSilver": "Meghatározott és közzétett látogatási napok",
    "visitDaysGold": "Nagyobb rugalmasság a hatályos feltételek szerint",
    "rulanticaBenefit": "Rulantica",
    "rulanticaSilver": "Nem része az alapcsomagnak",
    "rulanticaGold": "Két napijegy a hatályos feltételek szerint",
    "flexibility": "Tervezési profil",
    "flexibilitySilver": "Olyan dátumokra, amelyeket előre meg tudsz tervezni",
    "flexibilityGold": "Gyakoribb vagy spontán látogatásokhoz",
    "calculatorTitle": "Egyszerű költség-összehasonlítás felnőttek számára",
    "calculatorIntro": "Hasonlítsd össze az utolsó dokumentált jegyárakat az általad választott Europa-Park- és Rulantica-napijegyek számával.",
    "visitsLabel": "Europa-Park-látogatások",
    "rulanticaVisitsLabel": "Rulantica-napijegyek",
    "priceScenarioLabel": "Napijegyár-forgatókönyv",
    "lowerPriceScenario": "A dokumentált tartomány alsó határa",
    "upperPriceScenario": "A dokumentált tartomány felső határa",
    "calculate": "Összehasonlítás frissítése",
    "dayTicketsCost": "Külön megvett napijegyek",
    "silverCost": "Silver plusz Rulantica-jegyek",
    "goldCost": "Gold két Rulantica-napijeggyel",
    "lowestCost": "Számított minimális összeg",
    "estimateDisclaimer": "Tájékoztatás egy felnőtt személy számára, vásárlási garancia vagy elérhetőség nélkül. A kizárt napok, a foglalások, a kedvezmények, az utazás és a fel nem használt szolgáltatások befolyásolhatják a döntést.",
    "linksTitle": "Találj közvetlen választ a következő kérdésre",
    "compareLink": "Silver és Gold összehasonlítása",
    "pricesLink": "ResortPass árainak lekérdezése",
    "reservationLink": "A foglalás megértése",
    "rulanticaLink": "ResortPass és Rulantica"
  }
} satisfies PlanningLocalePack;
