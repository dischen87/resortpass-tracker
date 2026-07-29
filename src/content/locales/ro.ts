import type { PlanningLocalePack } from '../planning-types';

export const roPlanning = {
  "common": {
    "skip": "Sari la conținut",
    "menu": "Meniu",
    "language": "Alege limba",
    "home": "Acasă",
    "plannerLabel": "Planifică-ți vizita",
    "answerLabel": "Răspuns scurt",
    "updatedLabel": "Revizuit",
    "sourcePrefix": "Sursă",
    "onThisPage": "Pe această pagină",
    "relatedTitle": "Pașii următori recomandați",
    "sourcesTitle": "Surse și actualitate",
    "sourcesIntro": "Datele care pot varia provin din sursele operatorului și ale autorităților publice. Înainte de a rezerva, verifică din nou prețurile, programul și regulile la sursa principală indicată prin link.",
    "correctionLabel": "Ai găsit informații incorecte?",
    "correctionText": "Anunță-ne dacă găsești informații învechite. Facem o distincție clară între faptele documentate, presupunerile de calcul și aprecierea editorială.",
    "unofficial": "Proiect comunitar independent",
    "footerText": "Ghid de planificare independent, fără legătură cu Europa-Park.",
    "overview": "Rezumat",
    "tool": "Instrument de planificare",
    "decisions": "Ajutor pentru luarea deciziilor",
    "faq": "Întrebări frecvente",
    "notRecommendation": "Foaie informativă, nu recomandare",
    "verifyBeforeVisit": "Confirmă direct cu furnizorul înainte de vizită"
  },
  "navigation": {
    "parkGuide": "Europa-Park",
    "visitPlanner": "1 sau 2 zile",
    "costCalculator": "Costuri",
    "familyGuide": "Familii",
    "rulanticaGuide": "Rulantica",
    "stayGuide": "Cazare",
    "restaurantGuide": "Mâncare în Rust",
    "resortPassGuide": "ResortPass"
  },
  "pages": {
    "parkGuide": {
      "title": "Planifică Europa-Park: ghid independent cu calculatoare",
      "description": "Planifică-ți practic vizita la Europa-Park: 1 sau 2 zile, costuri, familie, Rulantica, cazare și restaurante în Rust, cu instrumente interactive.",
      "eyebrow": "Centrul de planificare Europa-Park",
      "heading": "Planifică Europa-Park conform nevoilor tale reale",
      "answer": "Pentru o primă vizită, o zi întreagă este minimul; două zile sunt de obicei mai relaxante, mai ales cu copii, spectacole sau multă afluență. Bazează planul pe dată, tipul grupului și buget, nu pe o listă generică cu 10 atracții de top.",
      "sectionTitle": "De la o întrebare la un plan de vizită realist",
      "sectionIntro": "Instrumentele corelează situația ta cu datele actuale. Nu înlocuiesc rezervarea oficială, dar ajută la evitarea celor mai importante decizii greșite înainte de călătorie.",
      "points": [
        {
          "title": "Decide mai întâi timpul",
          "text": "Evaluează ora sosirii, atracțiile prioritare și afluența prevăzută pentru a decide dacă ai nevoie de una sau două zile în parc.",
          "icon": "tabler:calendar-time"
        },
        {
          "title": "Cost total, nu doar biletul",
          "text": "Adună intrările în parc și Rulantica, parcarea și cazarea ca un interval, nu ca un preț fix fals.",
          "icon": "tabler:calculator"
        },
        {
          "title": "Adaptează traseul la grup",
          "text": "Înălțimea, vârsta, necesitatea pauzelor și interesele influențează mai mult un traseu bun decât clasamentele generale.",
          "icon": "tabler:route"
        }
      ],
      "faqs": [
        {
          "question": "Câte zile sunt necesare pentru a vizita Europa-Park?",
          "answer": "O zi întreagă poate fi suficientă pentru o selecție de atracții principale. Pentru cei care merg pentru prima dată, familii, spectacole și o vizită mai puțin grăbită, două zile sunt de obicei mai realiste."
        },
        {
          "question": "Este acest site oficial?",
          "answer": "Nu. ResortPass Tracker este un proiect comunitar independent. Pentru acces, siguranță și regulile în vigoare, consultă întotdeauna informațiile oficiale ale Europa-Park."
        },
        {
          "question": "De ce arată calculatorul intervale de prețuri?",
          "answer": "Europa-Park și Rulantica aplică prețuri online în funcție de dată. Atâta timp cât nu alegi o zi concretă în magazinul oficial, un interval este mai corect."
        }
      ]
    },
    "visitPlanner": {
      "title": "Europa-Park în 1 sau 2 zile? Planificator interactiv",
      "description": "Este suficientă o zi în Europa-Park? Creează un plan în funcție de dată, grup, sosire, aglomerație și Rulantica, cu un itinerar zilnic.",
      "eyebrow": "1 sau 2 zile",
      "heading": "Câte zile ai nevoie la Europa-Park?",
      "answer": "O zi este suficientă dacă ajungi devreme și ai priorități clare. Două zile sunt opțiunea cea mai sigură pentru familii, spectacole și multe zone tematice; dacă incluzi Rulantica, de obicei este mai potrivit să planifici în total două până la trei zile.",
      "sectionTitle": "Ce schimbă cu adevărat durata vizitei",
      "sectionIntro": "Nu toate grupurile au nevoie de aceeași rută. Planifică mai întâi blocurile de timp și prioritățile; timpii reali de așteptare vor stabili ordinea exactă în ziua vizitei.",
      "points": [
        {
          "title": "O zi: alege bine",
          "text": "Începe la ora de deschidere, prioritizează între trei și cinci obiective principale și pregătește alternative în zone tematice apropiate.",
          "icon": "tabler:number-1"
        },
        {
          "title": "Două zile: împarte parcul",
          "text": "Împarte marile atracții, oferta pentru familii și spectacolele între două zone ale parcului pentru a reduce deplasările și repetițiile.",
          "icon": "tabler:number-2"
        },
        {
          "title": "Multă aglomerație: lasă o rezervă",
          "text": "Rezervă timp pentru a mânca, pentru defecțiuni tehnice și pentru deplasări. Timpii de așteptare în direct ajută la reajustarea planului chiar acolo.",
          "icon": "tabler:clock-hour-4"
        }
      ],
      "faqs": [
        {
          "question": "Se poate vedea Europa-Park într-o zi?",
          "answer": "Poți să te bucuri de multe atracții importante, dar rareori de toate. Planificatorul ia în considerare sosirea, grupul și fluxul de vizitatori și recomandă mai mult timp dacă condițiile sunt nefavorabile."
        },
        {
          "question": "Este convenabil să vizitezi Rulantica în aceeași zi?",
          "answer": "Un bilet de seară poate fi potrivit pentru adulți sau copii mai mari pasionați de apă. Cu copii mici sau dacă zona acvatică este prioritară, o zi separată este mai relaxată."
        },
        {
          "question": "Ruta garantează timpii de așteptare?",
          "answer": "Nu. Vremea, defecțiunile și afluența reală pot schimba planul. Consultă aplicația oficială și timpii de așteptare în direct în ziua vizitei."
        }
      ]
    },
    "costCalculator": {
      "title": "Calculator de costuri Europa-Park 2026: bilete, parcare și hotel",
      "description": "Calculează un interval realist pentru Europa-Park cu adulți, copii, 1 sau 2 zile, Rulantica, parcare și cazare.",
      "eyebrow": "Cost total",
      "heading": "Cât costă în total vizita ta la Europa-Park?",
      "answer": "Biletul este doar o parte din buget. Calculatorul combină intervalele de bilete în funcție de dată cu parcarea, Rulantica și bugetul tău pentru cazare, și afișează intenționat un minim și un maxim.",
      "sectionTitle": "Cum să transformi prețurile într-un buget util",
      "sectionIntro": "Folosim intervale de prețuri oficiale, dar nu inventăm prețuri pentru hotel. Cazarea, mâncarea și călătoria sunt introduse ca estimări proprii.",
      "points": [
        {
          "title": "Prețuri pe dată ca interval",
          "text": "Fără o dată concretă de intrare, un interval este mai fiabil decât un singur preț promoțional.",
          "icon": "tabler:arrows-horizontal"
        },
        {
          "title": "Bugetul familiei pe persoană",
          "text": "Totalul și suma pe persoană facilitează compararea între opțiunile de 1 și 2 zile.",
          "icon": "tabler:users"
        },
        {
          "title": "Ipoteze întotdeauna vizibile",
          "text": "Cazarea și cheltuielile suplimentare apar separat pentru a le putea înlocui pe fiecare ipoteză.",
          "icon": "tabler:list-details"
        }
      ],
      "faqs": [
        {
          "question": "Sunt garantate prețurile din calculator?",
          "answer": "Nu. Sunt intervale de prețuri oficiale cu dată de revizuire. Disponibilitatea, data, taxele de gestionare și canalul de rezervare pot schimba prețul final."
        },
        {
          "question": "De ce nu se utilizează un preț mediu de hotel?",
          "answer": "Prețurile cazării depind foarte mult de dată, gradul de ocupare și condițiile de anulare. De aceea, introduci tu însuți un preț real pe care l-ai verificat."
        },
        {
          "question": "Sunt incluse mesele și călătoria?",
          "answer": "Acestea nu se adaugă încă automat. Costurile variază mult în funcție de punctul de plecare și de obiceiuri, așa că este bine să bugetezi o rezervă personală suplimentară."
        }
      ]
    },
    "familyGuide": {
      "title": "Europa-Park cu copii: căutare după înălțime și plan familial",
      "description": "Planifică Europa-Park cu bebeluși, copii mici sau școlari: filtrează atracțiile după vârstă și înălțime, identifică când au nevoie de însoțitor și organizează pauze.",
      "eyebrow": "Familii și copii",
      "heading": "Ce atracții sunt potrivite pentru copilul tău?",
      "answer": "La multe atracții contează atât vârsta, cât și înălțimea. Folosește instrumentul ca selecție preliminară și verifică întotdeauna la fața locului bara de măsurare, panourile și instrucțiunile personalului.",
      "sectionTitle": "Un plan familial este mai mult decât o listă de atracții",
      "sectionIntro": "Pauzele, mesele, schimbarea scutecelor, frații cu înălțimi diferite și posibilele reguli de însoțire influențează traseul la fel de mult ca și atracțiile preferate.",
      "points": [
        {
          "title": "Combină vârsta și înălțimea",
          "text": "Căutătorul face diferența între cerința minimă și necesitatea posibilă a unui adult însoțitor conform paginilor oficiale ale fiecărei atracții.",
          "icon": "tabler:ruler-measure"
        },
        {
          "title": "Planifică blocuri liniștite",
          "text": "Atracțiile acoperite, zonele de joacă și spectacolele servesc ca pauză între experiențe mai intense.",
          "icon": "tabler:zzz"
        },
        {
          "title": "Verifică din nou acolo",
          "text": "Normele de siguranță pot să se schimbe și indicațiile obligatorii sunt afișate la intrarea fiecărei atracții.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Este suficient să se respecte înălțimea?",
          "answer": "Nu. Unele atracții cer și o vârstă minimă sau un adult însoțitor până la o anumită vârstă sau înălțime."
        },
        {
          "question": "Garanțează căutătorul că poate urca?",
          "answer": "Nu. Normele în vigoare, măsurarea și personalul parcului sunt cele care decid. Sănătatea, constituția fizică, sarcina sau modificările tehnice pot impune alte limitări."
        },
        {
          "question": "Ce este Baby-Switch?",
          "answer": "În anumite atracții, persoanele responsabile de copil se pot alterna pentru a urca. Întreabă direct la atracție cum funcționează în fiecare caz."
        }
      ]
    },
    "rulanticaGuide": {
      "title": "Planificare Rulantica: zi întreagă, bilet de seară sau combinație?",
      "description": "Combină Rulantica și Europa-Park: ajutor interactiv pentru alegerea biletului de zi, de seară sau Moonlight în funcție de copii, lista de bagaje și durata vizitei.",
      "eyebrow": "Europa-Park + Rulantica",
      "heading": "Cum se potrivește Rulantica în escapada ta?",
      "answer": "O zi completă la Rulantica este opțiunea cea mai relaxată pentru familii și pasionații de parcuri acvatice. Biletele de seară sau Moonlight se potrivesc mai bine ca supliment dacă vârsta și energia grupului permit.",
      "sectionTitle": "Alege orarul biletului în funcție de obiectivul tău",
      "sectionIntro": "Parcul acvatic este deschis în mod normal până seara. Important este dacă Rulantica este un obiectiv principal sau doar un supliment după parc.",
      "points": [
        {
          "title": "Bilet de zi",
          "text": "Mai mult timp pentru zonele pentru copii, tobogane, pauze și zonele exterioare sezoniere, mai ales dacă dedici o zi întreagă Rulantica.",
          "icon": "tabler:sun"
        },
        {
          "title": "Seara sau Moonlight",
          "text": "Mai puțin timp și, de obicei, un preț mai mic, dar și mai puțină energie disponibilă după o zi lungă în parc.",
          "icon": "tabler:moon-stars"
        },
        {
          "title": "Acordă atenție listei de bagaje",
          "text": "Ia prosopul și costumul de baie și verifică din timp regulile în vigoare; vizitatorii de o zi nu ar trebui să se bazeze pe închirierea improvizată a unui prosop.",
          "icon": "tabler:backpack"
        }
      ],
      "faqs": [
        {
          "question": "Este suficient un bilet de seară pentru Rulantica?",
          "answer": "Poate fi suficient pentru unele tobogane sau ca încheiere scurtă a zilei. Familiile cu copii mici și cei care doresc să se bucure de multe zone profită de obicei mai bine de o zi completă."
        },
        {
          "question": "Se pot vizita Europa-Park și Rulantica în aceeași zi?",
          "answer": "Tehnic, da, dar combinația este solicitantă și necesită multă prioritizare. Unealta ține cont de zilele din parc, de copii și de ritmul dorit."
        },
        {
          "question": "Se pot închiria prosoape la Rulantica?",
          "answer": "Conform întrebărilor frecvente oficiale, nu există un serviciu obișnuit de închiriere a prosoapelor pentru vizitatorii de o zi. Adu-ți propriul prosop și verifică din nou informațiile înainte de a merge."
        }
      ]
    },
    "stayGuide": {
      "title": "Cazare în apropiere de Europa-Park: compară hotel, Rust și împrejurimile",
      "description": "Compară unde să dormi în apropiere de Europa-Park: hotel tematic, pensiune, apartament, camping și împrejurimi în funcție de economisirea timpului, bucătărie și transport.",
      "eyebrow": "Cazare",
      "heading": "Ce cazare se potrivește planului tău de vizită?",
      "answer": "Cea mai bună cazare nu depinde doar de prețul camerei. Compară accesul timpuriu, distanțele, transportul, bucătăria proprie, anularea și costul total al grupului.",
      "sectionTitle": "Scenarii în loc de un clasament arbitrar al hotelurilor",
      "sectionIntro": "Comparativul arată tipuri de cazare și aspecte ce trebuie verificate. Evită în mod deliberat prețuri neconfirmate și clasificări ale unor unități specifice.",
      "points": [
        {
          "title": "Avantajele resortului",
          "text": "Hotelurile tematice oficiale pot oferi acces timpuriu și transport; verifică pentru data ta dacă se aplică și ce atracții vor fi deschise.",
          "icon": "tabler:sparkles"
        },
        {
          "title": "Rust și cazare cu bucătărie",
          "text": "Pensiunile și apartamentele pot oferi distanțe scurte sau bucătărie, dar trebuie să confirmați fiecare serviciu cu unitatea specifică.",
          "icon": "tabler:building-cottage"
        },
        {
          "title": "Împrejurimi și transport",
          "text": "Economia la cameră poate dispărea după ce adaugi parcarea, ultimul autobuz și deplasările suplimentare.",
          "icon": "tabler:bus"
        }
      ],
      "faqs": [
        {
          "question": "Hotelurile oficiale ale Europa-Park sunt întotdeauna cea mai bună opțiune?",
          "answer": "Nu. Sunt o opțiune bună atunci când contează avantajele resortului și confortul. Pentru gătit, grupuri mari sau alt buget, o cazare independentă se poate potrivi mai bine."
        },
        {
          "question": "Comparativul arată prețurile actuale ale hotelurilor?",
          "answer": "Nu. Un preț de încredere necesită o dată concretă, gradul de ocupare și condițiile de rezervare. De aceea, calculatorul de costuri folosește prețul de cazare pe care l-ai verificat."
        },
        {
          "question": "Ce localități, pe lângă Rust, merită avute în vedere?",
          "answer": "Printre altele, Ringsheim, Herbolzheim și alte comune din Erlebnisregion. Decisivă este conexiunea concretă și ultima opțiune de întoarcere în ziua vizitei."
        }
      ]
    },
    "restaurantGuide": {
      "title": "Restaurante în Rust după Europa-Park: director revizuit",
      "description": "Găsește restaurante în Rust pentru cină: fișe neutre verificate cu surse, tip de bucătărie, servicii, incertitudini și link-uri directe.",
      "eyebrow": "Mâncare în Rust",
      "heading": "Unde poți lua cina în Rust după închiderea parcului?",
      "answer": "Directorul nu este o listă a celor mai bune. Arată unități cu o sursă primară sau municipală verificabilă și indică ce program, rezervări și nevoi alimentare trebuie să confirmi direct.",
      "sectionTitle": "Mai util decât un clasament de restaurante neverificat",
      "sectionIntro": "Programul și zilele de închidere se schimbă. De aceea am separat pentru fiecare fișă tipul de bucătărie documentat, informațiile despre servicii și întrebările încă deschise.",
      "points": [
        {
          "title": "Surse în loc de stele",
          "text": "Nu folosim evaluările de pe platforme ca dovadă a calității, ci legăm paginile unității și ale municipiului.",
          "icon": "tabler:source-code"
        },
        {
          "title": "Serviciu de seară vizibil",
          "text": "Filtrul folosește doar informații despre serviciu documentate. Totuși, trebuie să confirmați programul real al bucătăriei în ziua vizitei.",
          "icon": "tabler:clock"
        },
        {
          "title": "Fără filtre alimentare inventate",
          "text": "Indică doar opțiuni vegane, fără gluten sau potrivite pentru alergii atunci când există date actuale și de încredere.",
          "icon": "tabler:salad"
        }
      ],
      "faqs": [
        {
          "question": "Sunt restaurantele din director recomandări?",
          "answer": "Nu. O fișă înseamnă doar că unitatea apare într-o sursă verificabilă. Nu am evaluat gustul, calitatea sau disponibilitatea meselor."
        },
        {
          "question": "Sunt garantate orele?",
          "answer": "Nu. Programul special, vacanțele și orele de funcționare a bucătăriei se pot schimba cu puțin timp înainte. Folosiți linkul locației sau sunați înainte să mergeți."
        },
        {
          "question": "De ce nu apar distanțele?",
          "answer": "Un timp de mers pe jos fiabil depinde de punctul de plecare real și de rută. Vom adăuga aceste date atunci când va exista o verificare coerentă prin hărți sau pe teren."
        }
      ]
    },
    "resortPassGuide": {
      "title": "Europa-Park ResortPass 2026: disponibilitate, prețuri și norme",
      "description": "Înțelege ResortPass Silver și Gold: stare de vânzare, prețuri, zile de vizitare, rezervare, Rulantica și alertă independentă de disponibilitate.",
      "eyebrow": "Ghid ResortPass",
      "heading": "Tot ce este important despre Europa-Park ResortPass",
      "answer": "Silver și Gold nu sunt disponibile în prezent pentru vânzarea obișnuită și nu a fost anunțată o nouă dată. Silver este mai ieftin și este legat de zile definite; Gold este mai flexibil și include avantaje suplimentare în Rulantica.",
      "sectionTitle": "Alege abonamentul anual în funcție de utilizare",
      "sectionIntro": "Prețul nu este singurul lucru care contează. Sunt mai relevante posibilele zile de vizitare, flexibilitatea, utilizarea Rulantica și disponibilitatea reală a abonamentului.",
      "points": [
        {
          "title": "Mai întâi, disponibilitatea",
          "text": "Tracker-ul verifică periodic magazinul oficial și distinge vânzarea reală de anunțuri sau cozi de așteptare.",
          "icon": "tabler:bell-ringing"
        },
        {
          "title": "Silver sau Gold",
          "text": "Silver are zile de vizită definite; Gold oferă mai multă flexibilitate și include două intrări de o zi pentru Rulantica.",
          "icon": "tabler:scale"
        },
        {
          "title": "Verifică regulile pe portal",
          "text": "Rezervările, zilele excluse și condițiile se pot schimba, așa că verifică-le la sursa oficială înainte de a cumpăra.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Când vor fi din nou puse în vânzare ResortPass?",
          "answer": "În prezent nu a fost anunțată o nouă dată de vânzare. Monitorul avertizează când Silver sau Gold devin efectiv disponibile în magazinul oficial."
        },
        {
          "question": "Cât costă ResortPass?",
          "answer": "Conform ultimei verificări oficiale, Silver costă 325 euro pentru adulți și 275 euro pentru copii și persoane în vârstă; Gold costă 495 și 430 euro, respectiv."
        },
        {
          "question": "Trackerul este legat de Europa-Park?",
          "answer": "Nu. Este un proiect comunitar independent. Achiziția, contractul și serviciile obligatorii sunt gestionate exclusiv prin furnizorii oficiali."
        }
      ]
    },
    "resortPassCompare": {
      "title": "ResortPass Silver sau Gold? Comparație și ajutor pentru alegere",
      "description": "Compară ResortPass Silver și Gold după preț, zile de vizită, flexibilitate, Rulantica și situații de utilizare.",
      "eyebrow": "Silver față de Gold",
      "heading": "Ce ResortPass se potrivește cu modul tău de a vizita parcul?",
      "answer": "Silver se potrivește mai bine dacă zilele definite îți sunt utile și prețul mai mic primează. Gold merită mai mult dacă cauți flexibilitate maximă și vei folosi efectiv zilele de Rulantica incluse.",
      "sectionTitle": "Cel mai scump bilet nu este automat mai bun",
      "sectionIntro": "Compară zilele tale reale de vizită și avantajele suplimentare. Flexibilitatea sau intrările de Rulantica pe care nu le folosești nu aduc valoare.",
      "points": [
        {
          "title": "Silver: cel mai mic preț cu planificare",
          "text": "Potrivit dacă poți stabili datele în avans și zilele publicate se potrivesc în calendarul tău.",
          "icon": "tabler:calendar-check"
        },
        {
          "title": "Gold: mai multă flexibilitate",
          "text": "Potrivit pentru vizite spontane mai frecvente și pentru cei care vor folosi cele două intrări de o zi Rulantica incluse.",
          "icon": "tabler:crown"
        },
        {
          "title": "Compara cu biletele de o zi",
          "text": "Calculează numărul de vizite pe care le vei face efectiv și compară-l cu prețurile biletelor în funcție de dată.",
          "icon": "tabler:calculator"
        }
      ],
      "faqs": [
        {
          "question": "Are Silver zile excluse?",
          "answer": "Silver este valabil în zilele de deschidere definite anterior. Lista actuală de pe pagina oficială și de pe portalul ResortPass este cea care contează."
        },
        {
          "question": "Gold include bilete pentru Rulantica?",
          "answer": "Conform informațiilor actuale ale operatorului, Gold include două bilete de o zi pentru Rulantica. Confirmă oficial condițiile și rezervarea înainte de a le folosi."
        },
        {
          "question": "De la câte vizite merită un abonament?",
          "answer": "Depinde de datele reale, prețurile biletelor de o zi și avantajele suplimentare pe care le utilizezi. Oferirea unui număr unic ar fi înșelătoare."
        }
      ]
    },
    "resortPassPrices": {
      "title": "Prețurile ResortPass 2026: Silver, Gold și bilete de o zi",
      "description": "Prețurile actuale ale ResortPass pentru adulți, copii și seniori, comparativ cu biletele de o zi Europa-Park în funcție de dată.",
      "eyebrow": "Prețuri 2026",
      "heading": "Cât costă ResortPass Silver și Gold?",
      "answer": "Ultima verificare oficială: Silver, 325 euro pentru adulți și 275 euro pentru copii și seniori; Gold, 495 și 430 euro, respectiv. Niciunul nu este disponibil în prezent pentru vânzarea obișnuită.",
      "sectionTitle": "Evaluează prețul împreună cu utilizarea",
      "sectionIntro": "Biletele de o zi au intervale de prețuri în funcție de dată. De aceea, un abonament anual nu se justifică pornind de la o cifră universală, ci în funcție de datele tale reale.",
      "points": [
        {
          "title": "Silver",
      "text": "325 euro pentru adulți; 275 euro pentru copii de 4–11 ani și seniori de la 60 de ani. Ține cont de data sursei primare.",
          "icon": "tabler:circle-letter-s"
        },
        {
          "title": "Gold",
          "text": "495 euro pentru adulți; 430 euro pentru copii și persoane în vârstă, cu avantaje suplimentare, cum ar fi două zile de Rulantica.",
          "icon": "tabler:circle-letter-g"
        },
        {
          "title": "Disponibilitatea este esențială",
          "text": "Compararea prețurilor este utilă doar dacă abonamentul dorit este într-adevăr vândut. Verifică pentru aceasta starea în timp real.",
          "icon": "tabler:shopping-cart"
        }
      ],
      "faqs": [
        {
          "question": "Sunt acestea prețurile de 2026?",
          "answer": "Sumele au fost preluate de pe pagina oficială de bilete la data revizuirii indicate. Operatorul poate modifica prețurile și condițiile."
        },
        {
          "question": "Există tarife speciale?",
          "answer": "Pagina oficială indică prețuri reduse pentru copii, seniori și anumite acreditări. Dovezile și condițiile în vigoare sunt obligatorii."
        },
        {
          "question": "Pot cumpăra ResortPass acum?",
          "answer": "Silver și Gold sunt în prezent indisponibile. Trackerul în timp real arată când se schimbă starea reală în magazin."
        }
      ]
    },
    "resortPassReservation": {
      "title": "Rezervări de vizită cu ResortPass: zile, portal și oaspeți de hotel",
      "description": "Cum funcționează rezervările cu ResortPass: înregistrarea zilei, locurile disponibile, rezervarea hotelului și regulile în vigoare pe portal.",
      "eyebrow": "Rezervare",
      "heading": "Ai nevoie să îți rezervi vizita cu ResortPass?",
      "answer": "Rezervarea concretă depinde de abonament, de ziua vizitei și de eventualele limite de capacitate. Portalul ResortPass și întrebările frecvente oficiale sunt referința; o rezervare la hotel nu înlocuiește automat toți pașii necesari.",
      "sectionTitle": "Verifică trei lucruri înainte de a pleca",
      "sectionIntro": "A avea un abonament valid, a alege o zi permisă și a avea o rezervare atunci când este obligatorie sunt cerințe distincte.",
      "points": [
        {
          "title": "Deschide portalul abonamentului",
          "text": "Verifică acolo valabilitatea, zilele de vizită înregistrate și informațiile actuale despre locuri.",
          "icon": "tabler:login-2"
        },
        {
          "title": "Verifică rezervarea la hotel",
          "text": "Citește în întrebările frecvente actuale dacă zilele de vizită sunt legate de cazarea ta specifică în resort și cum să faci acest lucru.",
          "icon": "tabler:hotel-service"
        },
        {
          "title": "Păstrează confirmarea",
          "text": "Păstrează la îndemână abonamentul și dovada rezervării în aplicația oficială sau în formatul indicat în ziua vizitei.",
          "icon": "tabler:ticket"
        }
      ],
      "faqs": [
        {
          "question": "Trebuie să rezerv fiecare vizită?",
          "answer": "Nu se poate oferi un răspuns general pentru toate tipurile de abonament și perioadele. Verifică regula în vigoare pe portalul ResortPass înainte de fiecare vizită."
        },
        {
          "question": "O rezervare la hotel include automat rezervarea parcului?",
          "answer": "Întrebările frecvente oficiale descriu reguli speciale pentru oaspeți. Nu te baza pe o presupunere: verifică rezervarea ta concretă pe portal."
        },
        {
          "question": "Ce se întâmplă dacă se epuizează cota?",
          "answer": "Se aplică regula în vigoare a operatorului. Trackerul de disponibilitate monitorizează vânzarea, nu capacitatea zilelor de vizită din portalul personal."
        }
      ]
    },
    "resortPassRulantica": {
      "title": "ResortPass și Rulantica: avantaje Gold și rezervare",
      "description": "Ce avantaje ale Rulantica include ResortPass Gold? Două bilete de zi, planificare, rezervare și diferențe față de Silver.",
      "eyebrow": "ResortPass + Rulantica",
      "heading": "Ce include ResortPass pentru Rulantica?",
      "answer": "Conform informațiilor actuale ale operatorului, ResortPass Gold include două intrări de zi pentru Rulantica; Silver nu. Trebuie să confirmați oficial rezervarea, valabilitatea și eventualele locuri disponibile înainte de vizită.",
      "sectionTitle": "Bucură-te cu adevărat de cele două zile de Rulantica",
      "sectionIntro": "Avantajul aduce valoare doar dacă zilele incluse se potrivesc cu călătoria ta și le poți rezerva la timp.",
      "points": [
        {
          "title": "Planifică avantajul Gold",
          "text": "Tratează cele două zile ca o parte proprie a planificării tale anuale, nu ca un extra improvizat la sfârșitul unei zile în parc.",
          "icon": "tabler:droplet-filled"
        },
        {
          "title": "Calculează Silver separat",
          "text": "Cu Silver, biletele pentru Rulantica trebuie bugetate separat și rezervate în funcție de disponibilitate.",
          "icon": "tabler:receipt-euro"
        },
        {
          "title": "Verifică timpul disponibil",
          "text": "Pentru familii, o zi întreagă la Rulantica aduce de obicei mai mult decât un transfer grăbit după o zi întreagă în parc.",
          "icon": "tabler:clock-hour-8"
        }
      ],
      "faqs": [
        {
          "question": "Câte zile de Rulantica include Gold?",
          "answer": "Conform condițiilor oficiale actuale, Gold include două bilete de o zi pentru Rulantica. La utilizare se aplică regulile în vigoare ale operatorului."
        },
        {
          "question": "Silver include Rulantica?",
          "answer": "Conform comparației actuale, Silver nu include Rulantica ca serviciu standard. Biletele necesare trebuie bugetate separat."
        },
        {
          "question": "Trebuie să rezervați zilele incluse?",
          "answer": "Consultați regula de rezervare în vigoare pe portalul ResortPass. Rulantica are locuri limitate zilnic."
        }
      ]
    }
  },
  "visitPlanner": {
    "eyebrow": "Planificator interactiv",
    "title": "Ziua ta realistă",
    "intro": "Alege durata, grupul și condițiile. Vei obține un program solid, nu o falsă precizie minut cu minut.",
    "dateLabel": "Data vizitei",
    "daysLabel": "Zile preconizate în parc",
    "days": [
      "1 zi",
      "2 zile",
      "3 zile"
    ],
    "groupLabel": "Prioritate",
    "groups": {
      "balanced": "Echilibrat",
      "family": "Familie și copii",
      "thrill": "Montagne russe și acțiune",
      "shows": "Spectacole și ritm lent"
    },
    "arrivalLabel": "Sosire",
    "arrivals": {
      "early": "Înainte de deschidere",
      "opening": "La ora deschiderii",
      "late": "După 10:30"
    },
    "crowdLabel": "Aflux prevăzut",
    "crowds": {
      "low": "Mai degrabă scăzut",
      "medium": "Mediu",
      "high": "Ridicat"
    },
    "rulanticaLabel": "Include Rulantica",
    "submit": "Creează plan",
    "resultTitle": "Recomandarea ta",
    "resultLead": "Planifică cu priorități clare",
    "resultDays": "zile recomandate în total",
    "routeLabel": "Planul zilei",
    "morning": "Dimineața",
    "midday": "Amiază",
    "afternoon": "După-amiază",
    "evening": "Seara",
    "notes": {
      "early": "Ajunge la intrare înainte de deschiderea oficială și definește trei obiective principale.",
      "late": "Dacă întârzii, o a doua zi este mai sigură decât să încerci să acoperi prea mult prea repede.",
      "busy": "În cazul unei afluențe mari, folosește timpii de așteptare în direct și pregătește alternative pe zone.",
      "rulantica": "Cu copii mici sau dacă apa este prioritară, tratează Rulantica ca o zi independentă.",
      "family": "Planifică blocuri fixe pentru a mânca și a te odihni, pe lângă cel puțin o alternativă acoperită.",
      "thrill": "Foloseste Single Rider și VirtualLine doar dacă sunt cu adevărat disponibile în ziua vizitei.",
      "shows": "Verifică mai întâi programul spectacolului și organizează traseul în jurul acestor ore."
    },
    "routes": {
      "balanced": [
        "Începe cu două atracții importante și rămâi în aceeași zonă a parcului.",
        "Mănâncă devreme sau târziu și folosește apoi o atracție acoperită sau un spectacol ca perioadă liniștită.",
        "Parcurge zone tematice adiacente și compară timpii de așteptare în timp real înainte de a schimba.",
        "Finalizează o prioritate restantă, lasă timp pentru suveniruri și verifică dacă programul parcului se prelungește."
      ],
      "family": [
        "Începe cu o atracție potrivită pentru întreaga familie și verifică înălțimea la intrare.",
        "Planifică o pauză devreme, masa și o atracție interioară sau un spectacol liniștit.",
        "Combină o zonă de joacă și alte două atracții potrivite pentru vârstă în aceeași jumătate a parcului.",
        "Lasă energia copiilor să conducă: mai bine o atracție deosebită decât un final epuizant."
      ],
      "thrill": [
        "Prioritizează principalele montagne russe la deschidere și nu traversa întregul parc pentru o singură atracție.",
        "Verifică VirtualLine și Single Rider; folosește prânzul pentru o alternativă apropiată.",
        "Alege al doilea grup de montagne russe în funcție de timpii de așteptare în direct și ia în calcul defecțiunile tehnice.",
        "Planifică strategic ultima tură aproape de zona unde vrei să termini."
      ],
      "shows": [
        "Consultă programul și alege o atracție liniștită în drum spre primul spectacol.",
        "Combină o masă timpurie cu un spectacol acoperit sau o atracție tematică.",
        "Stabilește un al doilea spectacol și, între ele, include doar atracții apropiate.",
        "Bucură-te de atmosferă, gastronomie și de o ultimă atracție fără schimbări inutile de zonă."
      ]
    },
    "disclaimer": "Ajutor de planificare fără garanție. Programul, timpii de așteptare, VirtualLine și funcționarea atracțiilor se pot schimba cu puțin timp înainte.",
    "forecastCta": "Consultați previziunea de afluență"
  },
  "costCalculator": {
    "eyebrow": "Planificator de buget 2026",
    "title": "Calculați un interval realist de costuri",
    "intro": "Intervale oficiale pentru bilete plus estimarea ta pentru cazare. Mâncarea, călătoria și opțiunile suplimentare rămân în mod deliberat în afara sumei automate.",
    "adults": "Adulți de la 12 ani",
    "children": "Copii de 4–11 ani",
    "days": "Europa-Park",
    "oneDay": "1 zi",
    "twoDays": "2 zile",
    "rulantica": "Rulantica",
    "rulanticaOptions": {
      "none": "Nu include",
      "day": "Intrare de zi",
      "evening": "Bilet de seară de la ora 17",
      "moonlight": "Moonlight de la ora 19"
    },
    "parking": "Parcare obișnuită la Europa-Park",
    "nights": "Nopți",
    "lodgingPerNight": "Cazare totală pe noapte",
    "calculate": "Actualizează bugetul",
    "resultEyebrow": "Intervalul tău de costuri",
    "total": "Cost total estimativ",
    "rangeConnector": "până la",
    "perPerson": "pe persoană",
    "breakdown": "Defalcare",
    "europaParkTickets": "Intrări de Europa-Park",
    "rulanticaTickets": "Intrări de Rulantica",
    "parkingCost": "Parcare",
    "lodgingCost": "Cazare",
    "variableNote": "Prețurile depind de dată; intervalul nu garantează prețul.",
    "assumptionNote": "Adaugă și mâncare, călătorie și eventuale taxe de gestionare.",
    "currency": "EUR"
  },
  "familyFinder": {
    "eyebrow": "Căutare familială",
    "title": "Filtrează atracțiile după vârstă și înălțime",
    "intro": "Căutătorul folosește o selecție mică și verificată oficial. Decizia obligatorie revine întotdeauna personalului parcului.",
    "age": "Vârsta copilului",
    "height": "Înălțime",
    "interest": "Interes",
    "interests": {
      "all": "Toate exemplele verificate",
      "calm": "Liniștit",
      "family": "Aventură familială",
      "thrill": "Acțiune",
      "indoor": "Acoperit"
    },
    "submit": "Afișează exemple adecvate",
    "resultTitle": "Selecție verificată",
    "resultCount": "atracții afișate",
    "eligible": "Îndeplinește cerințele",
    "accompanied": "Necesar un adult însoțitor",
    "notYet": "Încă nu îndeplinește cerințele",
    "minimum": "Minim",
    "years": "ani",
    "centimeters": "cm",
    "indoor": "Acoperit",
    "source": "Sursă oficială",
    "noResults": "Încă nu există o atracție de exemplu verificată pentru acest filtru.",
    "disclaimer": "Nu garantează accesul. La fața locului sunt decisive panourile, bara de măsurare, normele de sănătate și siguranță și indicațiile personalului.",
    "officialFilter": "Consultă toate atracțiile în filtrul oficial"
  },
  "rulanticaPlanner": {
    "eyebrow": "Ajutor pentru combinare",
    "title": "Care bilet Rulantica se potrivește călătoriei tale?",
    "intro": "Instrumentul evaluează zilele de parc, copiii, prioritatea pentru apă și nivelul de energie. După aceea trebuie să verifici oficial prețurile și disponibilitatea.",
    "parkDays": "Zilele pentru Europa-Park",
    "parkDayOptions": [
      "1 zi de parc",
      "2 zile de parc",
      "3 zile sau mai mult"
    ],
    "children": "Copii în grup",
    "childOptions": [
      "Fără copii",
      "Copii sub 8 ani",
      "Copii mai mari/adolescenți"
    ],
    "waterPriority": "Importanța Rulantica",
    "priorityOptions": [
      "Doar să o încerci",
      "Complement important",
      "Obiectiv principal"
    ],
    "energy": "Ritmul dorit",
    "energyOptions": [
      "Liniștit",
      "Echilibrat",
      "Program intens"
    ],
    "submit": "Evaluează tipul biletului",
    "resultLabel": "Recomandare de planificare",
    "recommendations": {
      "day": {
        "title": "O zi completă în Rulantica",
        "text": "Cu copii mici sau dacă apa este prioritară, o zi separată lasă suficient timp pentru pauze, schimbat și vizitarea mai multor zone."
      },
      "evening": {
        "title": "Intrare de seară ca supliment",
        "text": "Se potrivește cu un ritm normal și o selecție clară, dar păstrează o pauză reală și timp de transfer după Europa-Park."
      },
      "moonlight": {
        "title": "Moonlight pentru o vizită scurtă",
        "text": "Trei ore se potrivesc mai bine vizitatorilor experimentați, energici și cu puține priorități decât pentru o primă vizită completă."
      },
      "separate": {
        "title": "Planifică Rulantica separat",
        "text": "Cu un ritm liniștit sau o excursie mai lungă, un bloc independent este mai sigur decât să mergi după o zi plină în parc."
      }
    },
    "checklistTitle": "Ce să iei și să verifici înainte",
    "checklist": [
      "Prosop propriu pentru vizitatorii de o zi",
      "Costum de baie și haine uscate de schimb",
      "Programul actual și perioadele de revizie",
      "Reguli privind vârsta și înălțimea pentru toboganele dorite",
      "Rezervarea, biletul și opțiunea de dulap"
    ],
    "officialNote": "Întrebările frecvente oficiale sunt referința pentru acces, îmbrăcăminte, prosoape, cărucioare și dulapuri.",
    "officialCta": "Deschide întrebările frecvente Rulantica"
  },
  "stayComparator": {
    "eyebrow": "Comparator de cazări",
    "title": "Ce tip de cazare se potrivește călătoriei tale?",
    "intro": "Compară opt tipuri de cazare conform caracteristicilor documentate. Căutătorul nu afișează clasamente sau prețuri neverificate: te ajută să restrângi căutarea.",
    "filtersLabel": "Filtrează cazări",
    "scenarioLabel": "Ce este deosebit de important pentru tine?",
    "allScenarios": "Toate situațiile de călătorie",
    "prioritiesLabel": "Caracteristici suplimentare",
    "priorities": {
      "operatorGuestBenefits": "Avantaje pentru oaspeții resortului",
      "selfCatering": "Cazare cu bucătărie",
      "ownSleepingUnitRequired": "Echipament propriu pentru dormit",
      "groupFormats": "Potrivit pentru grupuri",
      "walkingAccess": "Mergi la parc pe jos",
      "shuttleOrTransit": "Transfer sau transport public"
    },
    "reset": "Resetează filtrele",
    "resultsLabel": "Tipuri comparabile de cazare",
    "resultSingular": "tip de cazare",
    "resultPlural": "tipuri de cazare",
    "operatorRelation": {
      "resort_operated": "Gestionat de Europa-Park Resort",
      "independent": "Unitate independentă"
    },
    "states": {
      "verified": "Documentat",
      "available_for_this_type": "Disponibil pentru acest tip",
      "not_applicable": "Nu se aplică",
      "varies_by_property": "Variează în funcție de cazare",
      "must_verify": "Verifică înainte de a rezerva"
    },
    "verifyTitle": "Ce trebuie să verifici înainte de a rezerva",
    "source": "Deschide sursa",
    "checkedAt": "Verificat la",
    "emptyTitle": "Niciun tip de cazare nu corespunde tuturor filtrelor",
    "emptyText": "Elimină o caracteristică sau alege din nou toate situațiile de călătorie. Un rezultat gol nu spune nimic despre unitățile de cazare concrete.",
    "priceNoteTitle": "De ce nu afișăm prețuri la hotel",
    "priceNoteText": "Prețurile se modifică în funcție de dată, ocupare, tarif și servicii. Compară mai întâi tipul potrivit și confirmă apoi prețul final direct cu furnizorul.",
    "notRanking": "Ordinea este neutră: nu implică o evaluare a calității sau o recomandare plătită.",
    "noJs": "Fără JavaScript, toate tipurile de cazare și listele de verificare rămân vizibile; doar filtrele interactive lipsesc.",
    "scenarioLabels": {
      "operator-benefits-priority": "Prioritizează accesul timpuriu și transportul la resort",
      "park-and-rulantica-without-car": "Combină Europa-Park și Rulantica fără mașina proprie",
      "own-motorhome-or-caravan": "Călătorie cu autocaravană sau rulotă proprie",
      "own-tent": "Dormitul într-un cort propriu",
      "large-group-themed-stay": "Cazare tematică pentru familie, asociație sau grup",
      "self-catering-filter": "A avea bucătărie ca criteriu de selecție",
      "walkability-filter": "Filtrează după distanța de mers pe jos până la intrarea principală"
    },
    "typeContent": {
      "official-themed-hotel": {
        "label": "Hotel tematic Europa-Park",
        "definition": "Unul dintre cele șase hoteluri tematice de 4 stele (superior) administrate de resort.",
        "mustVerify": [
          "avantajele disponibile pentru datele concrete ale călătoriei",
          "ce atracții se deschid efectiv în timpul accesului timpuriu",
          "ocuparea camerei și accesibilitatea",
          "dacă biletele sunt incluse în pachetul ales sau se cumpără separat"
        ]
      },
      "riverside-western-lodge": {
        "label": "Riverside Western Lodge",
        "definition": "Cazare în camerele Silver Lake City cu propriul set de avantaje pentru oaspeți.",
        "mustVerify": [
          "orar actual al autobuzului Rust",
          "avantajele disponibile pentru datele exacte ale călătoriei",
          "ocuparea camerei și accesibilitatea",
          "posibile perioade de zgomot din cauza evenimentelor la Silver Lake City"
        ]
      },
      "tipi-town": {
        "label": "Tipi Town",
        "definition": "Cazări tematice pentru grupuri și familii în corturi tipi, căruțe acoperite, camere în cabane din lemn și Western Houses.",
        "mustVerify": [
          "configurația băilor și a dormitoarelor din categoria aleasă",
          "dacă micul dejun este obligatoriu sau poate fi adăugat",
          "avantajele disponibile pentru datele concrete ale călătoriei",
          "posibile perioade de zgomot din cauza evenimentelor",
          "dacă lungimea paturilor supraetajate este adecvată pentru călători"
        ]
      },
      "official-caravaning": {
        "label": "Europa-Park Caravaning",
        "definition": "Parcelele din Silver Lake City pentru autocaravane și rulote.",
        "mustVerify": [
          "dimensiunile vehiculului și categoria parcelei corespunzătoare",
          "condițiile de electricitate și apă ale rezervării concrete",
          "programul de sosire, odihnă și plecare",
          "avantaje actuale și programul autobuzului de Rust"
        ]
      },
      "official-tent-camping": {
        "label": "Europa-Park Camping",
        "definition": "Zona de camping în Silver Lake City pentru oaspeți cu propriul cort.",
        "mustVerify": [
          "reguli pentru corturi și parcele",
          "nevoi electrice și condiții de conectare",
          "facilități sanitare și opțiuni de mic dejun",
          "condițiile meteo, orele de odihnă și avantajele actuale pentru oaspeți"
        ]
      },
      "independent-hotel-or-guesthouse-rust": {
        "label": "Hotel sau pensiune independentă în Rust",
        "definition": "Cazare într-o unitate independentă din cadrul municipiului Rust.",
        "mustVerify": [
          "activitate și disponibilitate de rezervare actuale",
          "traseu real pe jos până la intrarea de care ai nevoie",
          "micul dejun, parcare, anulare și accesibilitate",
          "nu presupune că se aplică avantajele hotelurilor din resort"
        ]
      },
      "independent-holiday-apartment-rust": {
        "label": "Apartament turistic independent în Rust",
        "definition": "Cazare independentă pe care municipiul Rust o clasifică ca apartament turistic.",
        "mustVerify": [
          "echipament real de bucătărie și sufragerie, fără a-l deduce doar din categorie",
          "traseul pietonal real până la intrarea de care ai nevoie",
          "ședere minimă, curățenie finală, parcare și anulare",
          "înregistrare și disponibilitate actuală"
        ]
      },
      "accommodation-nearby-municipalities": {
        "label": "Cazare într-un municipiu apropiat",
        "definition": "Cazare independentă în afara Rust, într-un municipiu din regiunea Erlebnis Europa-Park.",
        "mustVerify": [
          "conexiune în ziua concretă a săptămânii și la închiderea parcului",
          "ultima cursă de întoarcere și eventualele schimbări",
          "parcare la destinație și cazare",
          "activitate și disponibilitate actuală de rezervare"
        ]
      }
    }
  },
  "restaurantFinder": {
    "eyebrow": "Director verificat",
    "title": "Compară obiectiv restaurante mici în Rust",
    "intro": "Caută printre opt fișe verificate editorial. Arătăm doar caracteristici documentate; nu facem niciun fel de afirmație despre calitate, nivelul prețurilor sau disponibilitatea meselor.",
    "filtersLabel": "Filtrează restaurante",
    "searchLabel": "Nume sau adresă",
    "searchPlaceholder": "De exemplu, Adler sau Fischerstraße",
    "statusLabel": "Stare de verificare",
    "allStatuses": "Toate stările",
    "statuses": {
      "first_party_verified": "Documentat de o sursă a unității",
      "public_directory_verified": "Documentat în registrul municipal",
      "license_page_verified": "Documentat printr-o pagină de licență",
      "needs_reverification": "Necesită o nouă verificare"
    },
    "timeLabel": "Program documentat",
    "allTimes": "Toate programele documentate",
    "timeSlots": {
      "breakfast": "Mic dejun",
      "evening": "Serviciu de seară"
    },
    "distanceLabel": "Distanță documentată",
    "allDistances": "Toate distanțele documentate",
    "distanceOptions": [
      {
        "maxMetres": 500,
        "label": "Până la 500 m"
      },
      {
        "maxMetres": 1000,
        "label": "Până la 1 km"
      },
      {
        "maxMetres": 2000,
        "label": "Până la 2 km"
      }
    ],
    "needsLabel": "Nevoi documentate",
    "familyFeatures": {
      "kids_menu": "Meniu pentru copii menționat"
    },
    "dietFeatures": {
      "vegetarian_evidence": "Opțiuni vegetariene documentate",
      "vegan_evidence": "Opțiuni vegane documentate",
      "gluten_free_evidence": "Opțiuni fără gluten documentate"
    },
    "reset": "Resetează filtrele",
    "resultsLabel": "Fișe revizuite",
    "resultSingular": "restaurant",
    "resultPlural": "restaurante",
    "noJs": "Fără JavaScript, toate fișele, sursele și incertitudinile rămân lizibile; lipsesc doar căutarea și filtrele.",
    "emptyTitle": "Nici o fișă nu corespunde acestor filtre",
    "emptyText": "Elimină un filtru. Absența rezultatelor poate însemna, de asemenea, că caracteristica nu este încă suficient documentată.",
    "serviceEvidence": "Ofertă documentată",
    "cuisineEvidence": "Tip de bucătărie documentat",
    "filterEvidence": "Dovada pentru filtru",
    "evidenceCheckedAt": "Dovada pentru filtru verificată",
    "source": "Sursă primară",
    "operatorWebsite": "Site-ul unității",
    "corroboratingSource": "Sursă suplimentară",
    "uncertaintyTitle": "Ce mai trebuie verificat înainte de a merge",
    "verificationNote": "Notă de verificare",
    "checkedAt": "Fișă revizuită",
    "reviewDue": "Data reviziei expirată",
    "notRecommendation": "Nu este o recomandare",
    "notRecommendationTitle": "Director neutru, nu este o listă cu cei mai buni",
    "notRecommendationText": "Includerea și ordinea nu evaluează calitatea. Confirmă direct cu unitatea programul, meniul, alergenii și rezervarea.",
    "unavailableEvidenceTitle": "Filtre pe care le omitem în mod deliberat",
    "unavailableEvidence": {
      "time": "Orarele nu sunt încă documentate într-un mod suficient de uniform.",
      "distance": "Distanțele nu au fost încă măsurate conform unui traseu coerent.",
      "family": "Caracteristicile pentru familie nu sunt încă suficient documentate.",
      "diet": "Opțiunile vegetariene, vegane și fără gluten nu sunt încă înregistrate cu suficientă fiabilitate."
    },
    "entryContent": {
      "gasthaus-adler-rust": {
        "cuisineEvidence": [
          "bucătărie tradițională de casă"
        ],
        "serviceEvidence": [
          "serviciu de seară conform site-ului unității"
        ],
        "verificationNote": "Site-ul și informațiile legale ale unității erau accesibile; prezentau adresa, datele de contact, tipul de bucătărie și informații actuale despre program la data verificării.",
        "uncertainties": [
          "Programul special și vacanțele unității depind de dată.",
          "Nu s-a verificat disponibilitatea rezervărilor."
        ]
      },
      "hardys-rust": {
        "cuisineEvidence": [
          "feluri de mâncare regionale și internaționale",
          "hamburgeri, coaste, paste și friptură în funcție de unitate"
        ],
        "serviceEvidence": [
          "mic dejun conform site-ului unității",
          "serviciu de seară conform site-ului unității"
        ],
        "verificationNote": "Site-ul unității era accesibil și menționa adresa, tipul de mâncare și oferta de mic dejun.",
        "uncertainties": [
          "Starea de funcționare în timp real a site-ului se poate schimba cu scurt timp înainte.",
          "Auto-prezentarea și recenziile inserate nu au fost utilizate ca dovadă a calității."
        ]
      },
      "casa-rustica-rust": {
        "cuisineEvidence": [
          "bucătărie italiană"
        ],
        "serviceEvidence": [
          "serviciu de seară conform directorului municipal"
        ],
        "verificationNote": "Site-ul unității confirmă activitatea, adresa și restaurantul italian; catalogul municipal oferă un cadru actual al programului.",
        "uncertainties": [
          "Confirmă programul pe site-ul unității sau prin telefon înainte de a merge.",
          "Timpul de mers pe jos până la parc indicat de unitate nu a fost măsurat independent."
        ]
      },
      "hotel-restaurant-mythos": {
        "cuisineEvidence": [
          "bucătărie grecească și internațională"
        ],
        "serviceEvidence": [
          "meniul pentru copii conform site-ului unității"
        ],
        "verificationNote": "Site-ul unității era accesibil și a confirmat adresa, tipul de bucătărie și contactul pentru rezervări.",
        "uncertainties": [
          "Conținutul lizibil al site-ului web nu indică ore săptămânale stabile.",
          "Nu s-a verificat disponibilitatea meselor."
        ]
      },
      "kaiserstuehler-hof-rust": {
        "cuisineEvidence": [
          "bucătăria din Baden",
          "mâncăruri regionale"
        ],
        "serviceEvidence": [
          "serviciu de seară conform site-ului unității"
        ],
        "verificationNote": "Site-ul web al unității era accesibil și indica adresa, profilul bucătăriei din Baden și programul săptămânal actual.",
        "uncertainties": [
          "Verificați din nou vacanțele și ziua liberă înainte de a merge.",
          "Nu afirmăm că este potrivit pentru alergii fără a consulta direct."
        ]
      },
      "restaurant-fenix-rust": {
        "cuisineEvidence": [
          "sursa primară nu definește clar tipul de bucătărie"
        ],
        "serviceEvidence": [
          "serviciu de seară conform site-ului unității"
        ],
        "verificationNote": "Site-ul web al unității și fișa municipală confirmă activitatea, adresa și contactul. Nu s-au adoptat afirmații publicitare.",
        "uncertainties": [
          "Verifică manual tipul de bucătărie în meniul actual înainte de a-l clasifica editorial.",
          "Site-ul web al unității afișează ore diferite de cele de pe platformele externe; folosește doar datele unității."
        ]
      },
      "la-terrassa-rust": {
        "cuisineEvidence": [
          "Directorul municipal nu indică tipul de bucătărie"
        ],
        "serviceEvidence": [
          "terasă conform directorului municipal"
        ],
        "verificationNote": "Restaurantul figurează în directorul municipal actual; site-ul web conectat descrie în principal pensiunea și nu confirmă detalii despre restaurant.",
        "uncertainties": [
          "Confirmă direct activitatea, tipul de bucătărie și orele de funcționare.",
          "Nu îl evidenția ca restaurant revizuit editorial până la obținerea unei confirmări directe."
        ]
      },
      "my-denis-rust": {
        "cuisineEvidence": [
          "Directorul municipal nu indică tipul de bucătărie."
        ],
        "serviceEvidence": [
          "Livrare conform directorului municipal."
        ],
        "verificationNote": "Apare doar în directorul municipal; la data revizuirii nu s-a găsit un site propriu de încredere.",
        "uncertainties": [
          "Confirmă direct activitatea, contactul, tipul de bucătărie și orele de funcționare.",
          "Nu îl include în recomandări sau clasamente pentru utilizatori până la verificarea unei surse directe."
        ]
      }
    }
  },
  "resortPassTool": {
    "eyebrow": "Ajutor pentru a alege ResortPass",
    "title": "Verifică simultan starea, avantajele și costul real",
    "intro": "Starea în direct răspunde la întrebarea dacă se poate cumpăra. Apoi, comparația și calculatorul ajută la decizia între biletele de o zi, Silver și Gold.",
    "statusTitle": "Starea actuală a vânzării",
    "statusChecking": "Se verifică starea…",
    "statusAvailable": "Disponibil oficial acum",
    "statusUnavailable": "Nu este disponibil în prezent",
    "statusUnknown": "Stare incertă în acest moment",
    "statusError": "Nu s-a putut încărca starea în direct",
    "lastChecked": "Ultima verificare",
    "comparisonTitle": "Silver și Gold dintr-o privire",
    "feature": "Caracteristică",
    "silver": "Silver",
    "gold": "Gold",
    "adultPrice": "Preț pentru adulți",
    "concessionPrice": "Copii de 4–11 ani / seniori de la 60 de ani",
    "visitDays": "Zile de vizită",
    "visitDaysSilver": "Zile de vizită definite și publicate",
    "visitDaysGold": "Mai multă flexibilitate conform condițiilor actuale",
    "rulanticaBenefit": "Rulantica",
    "rulanticaSilver": "Nu este inclus ca serviciu standard",
    "rulanticaGold": "Două bilete de o zi conform condițiilor actuale",
    "flexibility": "Profil de planificare",
    "flexibilitySilver": "Pentru date pe care le poți planifica din timp",
    "flexibilityGold": "Pentru vizite mai frecvente sau spontane",
    "calculatorTitle": "Comparație simplă a costurilor pentru adulți",
    "calculatorIntro": "Compară ultimele prețuri documentate ale abonamentelor cu numărul ales de vizite de o zi la Europa-Park și Rulantica.",
    "visitsLabel": "Vizite la Europa-Park",
    "rulanticaVisitsLabel": "Vizite de zi la Rulantica",
    "priceScenarioLabel": "Scenariu de preț pentru biletele de zi",
    "lowerPriceScenario": "Limita inferioară a intervalului documentat",
    "upperPriceScenario": "Limita superioară a intervalului documentat",
    "calculate": "Actualizează comparația",
    "dayTicketsCost": "Bilete individuale de zi",
    "silverCost": "Silver plus bilete pentru Rulantica",
    "goldCost": "Gold cu două bilete de o zi pentru Rulantica incluse",
    "lowestCost": "Suma minimă calculată",
    "estimateDisclaimer": "Îndrumare pentru o persoană adultă, fără garanția achiziției sau disponibilității. Zilele excluse, rezervările, reducerile, călătoria și serviciile neutilizate pot schimba decizia.",
    "linksTitle": "Rezolvă direct următoarea întrebare",
    "compareLink": "Comparați Silver și Gold",
    "pricesLink": "Consultați prețurile pentru ResortPass",
    "reservationLink": "Înțelegeți rezervarea",
    "rulanticaLink": "ResortPass și Rulantica"
  }
} satisfies PlanningLocalePack;
