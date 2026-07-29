import type { PlanningLocalePack } from '../planning-types';

export const plPlanning = {
  "common": {
    "skip": "Przejdź do treści",
    "menu": "Menu",
    "language": "Wybierz język",
    "home": "Strona główna",
    "plannerLabel": "Zaplanuj swoją wizytę",
    "answerLabel": "Krótka odpowiedź",
    "updatedLabel": "Sprawdzone",
    "sourcePrefix": "Źródło",
    "onThisPage": "Na tej stronie",
    "relatedTitle": "Zalecane kolejne kroki",
    "sourcesTitle": "Źródła i aktualność danych",
    "sourcesIntro": "Dane, które mogą ulec zmianie, pochodzą ze źródeł operatora i instytucji publicznych. Przed rezerwacją ponownie sprawdź ceny, godziny otwarcia i zasady w podanym źródle pierwotnym.",
    "correctionLabel": "Czy któreś dane są nieprawidłowe?",
    "correctionText": "Daj nam znać, jeśli znajdziesz nieaktualne informacje. Wyraźnie rozróżniamy między udokumentowanymi faktami, założeniami obliczeniowymi a oceną redakcyjną.",
    "unofficial": "Niezależny projekt społecznościowy",
    "footerText": "Niezależny przewodnik po planowaniu wizyty, niezwiązany z Europa-Park.",
    "overview": "Podsumowanie",
    "tool": "Narzędzie do planowania",
    "decisions": "Pomoc w podejmowaniu decyzji",
    "faq": "Najczęściej zadawane pytania",
    "notRecommendation": "Materiał informacyjny, a nie rekomendacja",
    "verifyBeforeVisit": "Potwierdź to bezpośrednio u dostawcy przed wizytą"
  },
  "navigation": {
    "parkGuide": "Europa-Park",
    "visitPlanner": "1 lub 2 dni",
    "costCalculator": "Koszty",
    "familyGuide": "Rodziny",
    "rulanticaGuide": "Rulantica",
    "stayGuide": "Zakwaterowanie",
    "restaurantGuide": "Jedzenie w Rust",
    "resortPassGuide": "ResortPass"
  },
  "pages": {
    "parkGuide": {
      "title": "Jak zaplanować Europa-Park: niezależny przewodnik z kalkulatorami",
      "description": "Praktycznie zaplanuj wizytę w Europa-Park: 1 lub 2 dni, koszty, pobyt z rodziną, Rulantica, nocleg i restauracje w Rust — z interaktywnymi narzędziami.",
      "eyebrow": "Centrum planowania Europa-Park",
      "heading": "Zaplanuj Europa-Park zgodnie ze swoimi potrzebami",
      "answer": "Na pierwszą wizytę warto przeznaczyć co najmniej cały dzień; dwa dni zwykle zapewniają spokojniejsze tempo, zwłaszcza z dziećmi, przy oglądaniu pokazów lub dużej frekwencji. Oprzyj plan na dacie, składzie grupy i budżecie, a nie na ogólnej liście 10 najlepszych atrakcji.",
      "sectionTitle": "Od pytań do realistycznego planu wizyty",
      "sectionIntro": "Narzędzia powiązują twoją sytuację z aktualnymi danymi. Nie zastępują oficjalnej rezerwacji, ale pomagają uniknąć najważniejszych błędnych decyzji przed podróżą.",
      "points": [
        {
          "title": "Najpierw zdecyduj o czasie",
          "text": "Oceń godzinę przyjazdu, priorytetowe atrakcje i przewidywane natężenie ruchu, aby zdecydować, czy warto spędzić jeden czy dwa dni w parku.",
          "icon": "tabler:calendar-time"
        },
        {
          "title": "Całkowity koszt, nie tylko wstęp",
          "text": "Zsumuj bilety do parku i Rulantica, parking oraz nocleg jako przedział cenowy, a nie mylącą stałą kwotę.",
          "icon": "tabler:calculator"
        },
        {
          "title": "Dostosuj trasę do grupy",
          "text": "Wzrost, wiek, potrzeba przerw i zainteresowania wpływają bardziej na dobrą trasę niż ogólne rankingi.",
          "icon": "tabler:route"
        }
      ],
      "faqs": [
        {
          "question": "Ile dni potrzeba, aby odwiedzić Europa-Park?",
          "answer": "Jeden pełny dzień może wystarczyć na wybrane najważniejsze atrakcje. Przy pierwszej wizycie, z rodziną, planując pokazy lub spokojniejsze tempo, zwykle bardziej realistyczne są dwa dni."
        },
        {
          "question": "Czy ta strona jest oficjalna?",
          "answer": "Nie. ResortPass Tracker jest niezależnym projektem społecznościowym. Informacje o wstępie, bezpieczeństwie i obowiązujących zasadach zawsze sprawdzaj w oficjalnych źródłach Europa-Park."
        },
        {
          "question": "Dlaczego kalkulator pokazuje przedziały cen?",
          "answer": "Europa-Park i Rulantica stosują ceny online w zależności od daty. Dopóki nie wybierzesz konkretnego dnia w oficjalnym sklepie, przedział jest bardziej uczciwy."
        }
      ]
    },
    "visitPlanner": {
      "title": "Europa-Park w 1 czy 2 dni? Interaktywny planer",
      "description": "Czy jeden dzień w Europa-Park wystarczy? Utwórz plan dnia na podstawie daty, grupy, godziny przyjazdu, frekwencji i wizyty w Rulantica.",
      "eyebrow": "1 lub 2 dni",
      "heading": "Ile dni potrzebujesz w Europa-Park?",
      "answer": "Jeden dzień wystarczy, jeśli przyjedziesz wcześnie i masz jasno określone priorytety. Dwa dni to pewniejsza opcja dla rodzin, pokazów i wielu stref tematycznych; łącznie z Rulantica warto zwykle zarezerwować od dwóch do trzech dni.",
      "sectionTitle": "Co naprawdę zmienia czas trwania wizyty",
      "sectionIntro": "Nie każda grupa potrzebuje tej samej trasy. Najpierw zaplanuj bloki czasu i priorytety; rzeczywiste czasy oczekiwania określą dokładną kolejność w dniu wizyty.",
      "points": [
        {
          "title": "Jeden dzień: dobrze wybierz",
          "text": "Zacznij o godzinie otwarcia, ustal priorytety spośród trzech do pięciu głównych celów i przygotuj alternatywy w pobliskich strefach tematycznych.",
          "icon": "tabler:number-1"
        },
        {
          "title": "Dwa dni: podziel park",
          "text": "Podziel wielkie atrakcje, oferty rodzinne i pokazy między dwie strefy parku, aby skrócić trasy i uniknąć powtórzeń.",
          "icon": "tabler:number-2"
        },
        {
          "title": "Duża frekwencja: zostaw zapas czasu",
          "text": "Zarezerwuj czas na posiłki, awarie techniczne i przejazdy. Czas oczekiwania na żywo pomaga dostosować plan na miejscu.",
          "icon": "tabler:clock-hour-4"
        }
      ],
      "faqs": [
        {
          "question": "Czy można zobaczyć Europa-Park w jeden dzień?",
          "answer": "Możesz skorzystać z wielu głównych atrakcji, ale rzadko ze wszystkich. Planer uwzględnia przyjazd, skład grupy i frekwencję oraz zaleca więcej czasu, jeśli warunki są niekorzystne."
        },
        {
          "question": "Czy warto odwiedzić Rulantica tego samego dnia?",
          "answer": "Późne wejście może pasować dla dorosłych lub starszych dzieci lubiących wodę. W przypadku małych dzieci lub jeśli strefa wodna jest priorytetem, osobny dzień jest bardziej relaksujący."
        },
        {
          "question": "Czy plan gwarantuje określone czasy oczekiwania?",
          "answer": "Nie. Pogoda, awarie i faktyczna frekwencja mogą zmienić plan. Sprawdź oficjalną aplikację i czasy oczekiwania na żywo w dniu wizyty."
        }
      ]
    },
    "costCalculator": {
      "title": "Kalkulator kosztów Europa-Park 2026: bilety, parking i hotel",
      "description": "Oblicz realistyczny przedział kosztów Europa-Park dla dorosłych i dzieci, 1 lub 2 dni, Rulantica, parkingu i zakwaterowania.",
      "eyebrow": "Całkowity koszt",
      "heading": "Ile kosztuje łącznie twoja wizyta w Europa-Park?",
      "answer": "Bilet jest tylko częścią budżetu. Kalkulator łączy zależne od daty przedziały cen biletów z parkingiem, Rulantica i Twoim budżetem na nocleg oraz celowo pokazuje minimum i maksimum.",
      "sectionTitle": "Jak przekształcić ceny w przydatny budżet",
      "sectionIntro": "Używamy oficjalnych przedziałów cen, ale nie wymyślamy cen hoteli. Zakwaterowanie, jedzenie i podróż wprowadzane są jako własne szacunki.",
      "points": [
        {
          "title": "Ceny zależne od daty jako przedział",
          "text": "Bez konkretnej daty wizyty przedział jest bardziej wiarygodny niż pojedyncza cena promocyjna.",
          "icon": "tabler:arrows-horizontal"
        },
        {
          "title": "Budżet rodzinny na osobę",
          "text": "Łączna kwota i kwota na osobę ułatwiają porównanie między opcjami 1 i 2 dni.",
          "icon": "tabler:users"
        },
        {
          "title": "Założenia zawsze widoczne",
          "text": "Zakwaterowanie i dodatkowe wydatki są pokazywane oddzielnie, abyś mógł zastąpić każde założenie.",
          "icon": "tabler:list-details"
        }
      ],
      "faqs": [
        {
          "question": "Czy ceny w kalkulatorze są gwarantowane?",
          "answer": "Nie. Są to oficjalne przedziały cenowe z datą weryfikacji. Dostępność, termin, opłaty administracyjne i kanał rezerwacji mogą wpłynąć na cenę końcową."
        },
        {
          "question": "Dlaczego nie stosuje się średniej ceny hotelu?",
          "answer": "Ceny zakwaterowania zależą w dużym stopniu od daty, obłożenia i warunków anulowania. Dlatego podajesz sam rzeczywistą cenę, którą sprawdziłeś."
        },
        {
          "question": "Czy wyżywienie i podróż są wliczone?",
          "answer": "Nie są dodawane automatycznie. Koszty te bardzo różnią się zależnie od miejsca wyjazdu i nawyków, dlatego warto uwzględnić własny zapas w budżecie."
        }
      ]
    },
    "familyGuide": {
      "title": "Europa-Park z dziećmi: wyszukiwarka według wzrostu i plan rodzinny",
      "description": "Planuj Europa-Park z niemowlętami, małymi dziećmi lub uczniami: filtruj atrakcje według wieku i wzrostu, określ, kiedy potrzebny jest opiekun i organizuj przerwy.",
      "eyebrow": "Rodziny i dzieci",
      "heading": "Które atrakcje są odpowiednie dla twojego dziecka?",
      "answer": "W wielu atrakcjach liczą się jednocześnie wiek i wzrost. Użyj wyszukiwarki do wstępnej selekcji, a na miejscu zawsze sprawdź miarkę wzrostu, oznaczenia i wskazówki personelu.",
      "sectionTitle": "Plan rodzinny to coś więcej niż lista atrakcji",
      "sectionIntro": "Przerwy, jedzenie, zmiana pieluch, rodzeństwo o różnym wzroście oraz możliwe zasady towarzyszenia wpływają na trasę tak samo jak ulubione atrakcje.",
      "points": [
        {
          "title": "Połącz wiek i wzrost",
          "text": "Wyszukiwarka rozróżnia między minimalnym wymogiem a ewentualną koniecznością obecności dorosłego opiekuna zgodnie ze stronami oficjalnymi każdej atrakcji.",
          "icon": "tabler:ruler-measure"
        },
        {
          "title": "Planuj spokojne bloki",
          "text": "Atrakcje kryte, strefy zabaw i pokazy służą jako odpoczynek między bardziej intensywnymi doświadczeniami.",
          "icon": "tabler:zzz"
        },
        {
          "title": "Sprawdź to ponownie na miejscu",
          "text": "Zasady bezpieczeństwa mogą się zmieniać, a wiążące wskazówki są wyświetlane przy wejściu do każdej atrakcji.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Czy wystarczy spełnić wymóg wzrostu?",
          "answer": "Nie. Niektóre atrakcje wymagają również minimalnego wieku lub towarzystwa dorosłego do określonego wieku lub wzrostu."
        },
        {
          "question": "Czy wyszukiwarka gwarantuje, że można skorzystać?",
          "answer": "Nie. Decydują obowiązujące przepisy, pomiar i personel parku. Zdrowie, kondycja fizyczna, ciąża lub zmiany techniczne mogą wiązać się z innymi ograniczeniami."
        },
        {
          "question": "Czym jest Baby-Switch?",
          "answer": "Przy niektórych atrakcjach opiekunowie dziecka mogą skorzystać z przejazdu na zmianę. Zapytaj bezpośrednio przy atrakcji, jak działa to w danym przypadku."
        }
      ]
    },
    "rulanticaGuide": {
      "title": "Jak zaplanować Rulantica: cały dzień, wieczorny wstęp czy połączenie?",
      "description": "Połącz Rulantica i Europa-Park: interaktywna pomoc w wyborze biletu całodniowego, wieczornego lub Moonlight zależnie od dzieci, potrzebnego wyposażenia i długości pobytu.",
      "eyebrow": "Europa-Park + Rulantica",
      "heading": "Jak Rulantica pasuje do twojej wycieczki?",
      "answer": "Pełny dzień w Rulantica to najbardziej komfortowa opcja dla rodzin i miłośników parków wodnych. Bilety wieczorne lub Moonlight lepiej sprawdzają się jako dodatek, jeśli pozwalają na to wiek i energia grupy.",
      "sectionTitle": "Wybierz godzinę wejścia w zależności od celu",
      "sectionIntro": "Park wodny zwykle otwarty jest do późnego popołudnia lub wieczora. Kluczowe jest, czy Rulantica jest głównym celem, czy tylko dodatkiem po parku.",
      "points": [
        {
          "title": "Bilet dzienny",
          "text": "Więcej czasu na strefy dla dzieci, zjeżdżalnie, przerwy i sezonowe tereny zewnętrzne, szczególnie jeśli poświęcasz cały dzień na Rulantica.",
          "icon": "tabler:sun"
        },
        {
          "title": "Wieczór lub Moonlight",
          "text": "Mniej czasu i zazwyczaj niższa cena, ale także mniej energii dostępnej po długim dniu w parku.",
          "icon": "tabler:moon-stars"
        },
        {
          "title": "Sprawdź listę rzeczy do zabrania",
          "text": "Weź ręcznik i strój kąpielowy oraz wcześniej sprawdź obowiązujące zasady; goście jednodniowi nie powinni zakładać, że wypożyczą ręcznik na miejscu.",
          "icon": "tabler:backpack"
        }
      ],
      "faqs": [
        {
          "question": "Czy bilet wieczorny wystarczy na Rulantica?",
          "answer": "Może wystarczyć na niektóre zjeżdżalnie lub jako krótkie zakończenie dnia. Rodziny z małymi dziećmi i osoby chcące korzystać z wielu atrakcji zwykle lepiej wykorzystują cały dzień."
        },
        {
          "question": "Czy można odwiedzić Europa-Park i Rulantica tego samego dnia?",
          "answer": "Technicznie tak, ale takie połączenie jest wymagające i wymusza mocne ograniczenie priorytetów. Narzędzie uwzględnia liczbę dni w parku, dzieci i oczekiwane tempo."
        },
        {
          "question": "Czy można wypożyczyć ręczniki w Rulantica?",
          "answer": "Według oficjalnych często zadawanych pytań, nie ma standardowej usługi wypożyczania ręczników dla jednodniowych gości. Weź swój ręcznik i sprawdź informacje ponownie przed wyjazdem."
        }
      ]
    },
    "stayGuide": {
      "title": "Zakwaterowanie w pobliżu Europa-Park: porównaj hotel, Rust i okolice",
      "description": "Porównaj miejsca do spania w pobliżu Europa-Park: hotel tematyczny, pensjonat, apartament, kemping i okolice według oszczędności czasu, kuchni i transportu.",
      "eyebrow": "Zakwaterowanie",
      "heading": "Jakie zakwaterowanie pasuje do Twojego planu wizyty?",
      "answer": "Najlepsze zakwaterowanie nie zależy tylko od ceny pokoju. Porównaj wczesny dostęp, odległości, transport, własną kuchnię, anulowanie i całkowity koszt grupy.",
      "sectionTitle": "Scenariusze zamiast uznaniowego rankingu hoteli",
      "sectionIntro": "Porównanie pokazuje rodzaje zakwaterowania i kwestie do sprawdzenia. Świadomie unika podawania niepotwierdzonych cen i klasyfikacji konkretnych obiektów.",
      "points": [
        {
          "title": "Zalety ośrodka",
          "text": "Oficjalne hotele tematyczne mogą oferować wczesny dostęp i transport; sprawdź na swoją datę, czy to obowiązuje i jakie atrakcje będą otwarte.",
          "icon": "tabler:sparkles"
        },
        {
          "title": "Rust i zakwaterowanie z kuchnią",
          "text": "Pensjonaty i apartamenty mogą oferować krótkie odległości lub kuchnię, ale musisz potwierdzić każdą usługę w konkretnym obiekcie.",
          "icon": "tabler:building-cottage"
        },
        {
          "title": "Okolica i transport",
          "text": "Niższa cena pokoju może przestać się opłacać po dodaniu kosztów parkingu, ostatniego autobusu i dodatkowych przejazdów.",
          "icon": "tabler:bus"
        }
      ],
      "faqs": [
        {
          "question": "Czy oficjalne hotele Europa-Park są zawsze najlepszą opcją?",
          "answer": "Nie. To dobra opcja, gdy liczą się korzyści dla gości resortu i wygoda. Przy samodzielnym gotowaniu, dużej grupie lub innym budżecie lepiej może pasować niezależny nocleg."
        },
        {
          "question": "Czy porównanie pokazuje aktualne ceny hoteli?",
          "answer": "Nie. Wiarygodna cena wymaga podania dat, obłożenia i warunków rezerwacji. Dlatego kalkulator kosztów używa ceny noclegu sprawdzonej przez Ciebie."
        },
        {
          "question": "Jakie miejscowości oprócz Rust warto wziąć pod uwagę?",
          "answer": "Między innymi Ringsheim, Herbolzheim i inne gminy w Erlebnisregion. Kluczowe są konkretne połączenie i ostatnia możliwość powrotu w dniu wizyty."
        }
      ]
    },
    "restaurantGuide": {
      "title": "Restauracje w Rust po Europa-Park: zweryfikowany katalog",
      "description": "Znajdź restauracje w Rust na kolację: neutralne profile ze zweryfikowanymi źródłami, rodzajem kuchni, ofertą, niewiadomymi i bezpośrednimi linkami.",
      "eyebrow": "Jedzenie w Rust",
      "heading": "Gdzie można zjeść kolację w Rust po zamknięciu parku?",
      "answer": "Katalog nie jest listą najlepszych lokali. Pokazuje restauracje z możliwym do zweryfikowania źródłem pierwotnym lub miejskim i wskazuje, które godziny otwarcia, rezerwacje i potrzeby żywieniowe trzeba potwierdzić bezpośrednio.",
      "sectionTitle": "Bardziej przydatne niż ranking niezweryfikowanych restauracji",
      "sectionIntro": "Godziny otwarcia i dni wolne się zmieniają. Dlatego na każdej karcie oddzielamy udokumentowany typ kuchni, informacje o ofercie i kwestie wymagające potwierdzenia.",
      "points": [
        {
          "title": "Źródła zamiast gwiazdek",
          "text": "Nie używamy ocen z platform jako dowodu jakości, zamiast tego łączymy strony lokalu i miasta.",
          "icon": "tabler:source-code"
        },
        {
          "title": "Udokumentowana oferta kolacji",
          "text": "Filtr korzysta wyłącznie z udokumentowanych informacji o ofercie. Mimo to trzeba potwierdzić rzeczywiste godziny pracy kuchni w dniu wizyty.",
          "icon": "tabler:clock"
        },
        {
          "title": "Bez wymyślonych filtrów żywieniowych",
          "text": "Wskazujemy opcje wegańskie, bezglutenowe lub odpowiednie dla alergii wyłącznie wtedy, gdy istnieją aktualne i wiarygodne dane.",
          "icon": "tabler:salad"
        }
      ],
      "faqs": [
        {
          "question": "Czy restauracje w katalogu są rekomendacjami?",
          "answer": "Nie. Obecność w katalogu oznacza tylko, że lokal pojawia się w możliwym do śledzenia źródle. Nie ocenialiśmy smaku, jakości ani dostępności stolików."
        },
        {
          "question": "Czy godziny otwarcia są gwarantowane?",
          "answer": "Nie. Specjalne godziny otwarcia, święta i godziny pracy kuchni mogą zmienić się w krótkim czasie. Sprawdź stronę lokalu lub wcześniej zadzwoń."
        },
        {
          "question": "Dlaczego odległości się nie pojawiają?",
          "answer": "Wiarygodny czas dojścia pieszo zależy od rzeczywistego punktu startowego i trasy. Dodamy te dane po ich sprawdzeniu na mapach lub w terenie."
        }
      ]
    },
    "resortPassGuide": {
      "title": "Europa-Park ResortPass 2026: dostępność, ceny i zasady",
      "description": "Zrozum ResortPass Silver i Gold: stan sprzedaży, ceny, dni wizyty, rezerwacja, Rulantica i niezależne powiadomienie o dostępności.",
      "eyebrow": "Przewodnik ResortPass",
      "heading": "Wszystko, co ważne o Europa-Park ResortPass",
      "answer": "Silver i Gold nie są obecnie dostępne w regularnej sprzedaży i nie ogłoszono nowej daty. Silver jest tańszy i powiązany z określonymi dniami; Gold jest bardziej elastyczny i zawiera dodatkowe korzyści w Rulantica.",
      "sectionTitle": "Wybierz roczny karnet w zależności od użytkowania",
      "sectionIntro": "Cena nie jest jedyną rzeczą, która się liczy. Bardziej istotne są możliwe dni wizyty, elastyczność, korzystanie z Rulantica i faktyczna dostępność karnetu.",
      "points": [
        {
          "title": "Po pierwsze, dostępność",
          "text": "Tracker regularnie sprawdza oficjalny sklep i odróżnia rzeczywistą sprzedaż od zapowiedzi lub list oczekujących.",
          "icon": "tabler:bell-ringing"
        },
        {
          "title": "Silver lub Gold",
          "text": "Silver ma określone dni wizyty; Gold oferuje większą elastyczność i obejmuje dwa bilety dzienne dla Rulantica.",
          "icon": "tabler:scale"
        },
        {
          "title": "Sprawdź zasady na portalu",
          "text": "Rezerwacje, dni wyłączone i warunki mogą się zmieniać, więc sprawdź je w oficjalnym źródle przed zakupem.",
          "icon": "tabler:shield-check"
        }
      ],
      "faqs": [
        {
          "question": "Kiedy ponownie będą sprzedawane ResortPass?",
          "answer": "Obecnie nie ogłoszono nowej daty sprzedaży. Tracker powiadomi, gdy Silver lub Gold będą faktycznie dostępne w oficjalnym sklepie."
        },
        {
          "question": "Ile kosztuje ResortPass?",
          "answer": "Według ostatniej oficjalnej weryfikacji Silver kosztuje 325 euro dla dorosłych i 275 euro dla dzieci oraz seniorów; Gold kosztuje odpowiednio 495 i 430 euro."
        },
        {
          "question": "Czy tracker jest powiązany z Europa-Park?",
          "answer": "Nie. To niezależny projekt społecznościowy. Zakup, umowa i zobowiązujące świadczenia są zarządzane wyłącznie przez oficjalnych dostawców."
        }
      ]
    },
    "resortPassCompare": {
      "title": "ResortPass Silver czy Gold? Porównanie i pomoc w wyborze",
      "description": "Porównaj ResortPass Silver i Gold pod względem ceny, liczby dni wizyty, elastyczności, Rulantica i sytuacji użytkowania.",
      "eyebrow": "Silver w porównaniu z Gold",
      "heading": "Który ResortPass pasuje do Twojego sposobu odwiedzania parku?",
      "answer": "Silver pasuje lepiej, jeśli określone dni Ci odpowiadają, a priorytetem jest niższa cena. Gold ma większy sens, jeśli zależy Ci na maksymalnej elastyczności i rzeczywiście wykorzystasz wliczone dni w Rulantica.",
      "sectionTitle": "Droższy karnet nie jest automatycznie lepszy",
      "sectionIntro": "Porównaj swoje rzeczywiste dni wizyty i dodatkowe korzyści. Elastyczność lub bilety Rulantica, których nie wykorzystasz, nie mają wartości.",
      "points": [
        {
          "title": "Silver: niższa cena przy planowaniu",
          "text": "Odpowiedni, jeśli możesz ustalić daty z wyprzedzeniem, a opublikowane dni pasują do Twojego kalendarza.",
          "icon": "tabler:calendar-check"
        },
        {
          "title": "Gold: większa elastyczność",
          "text": "Odpowiedni przy częstszych spontanicznych wizytach oraz dla osób, które wykorzystają oba wliczone bilety jednodniowe do Rulantica.",
          "icon": "tabler:crown"
        },
        {
          "title": "Porównaj z wejściówkami dziennymi",
          "text": "Oblicz liczbę wizyt, które faktycznie odbędziesz, i porównaj ją z cenami biletów zależnymi od daty.",
          "icon": "tabler:calculator"
        }
      ],
      "faqs": [
        {
          "question": "Czy Silver ma dni wyłączone?",
          "answer": "Silver jest ważny w dniach otwarcia określonych wcześniej. Obowiązuje aktualna lista na oficjalnej stronie i na portalu ResortPass."
        },
        {
          "question": "Czy Gold obejmuje wstęp dla Rulantica?",
          "answer": "Według aktualnych informacji od operatora, Gold obejmuje dwa jednodniowe wstępy dla Rulantica. Potwierdź oficjalnie warunki i rezerwację przed ich użyciem."
        },
        {
          "question": "Od ilu wizyt opłaca się karnet?",
          "answer": "Zależy od rzeczywistych dat, cen biletów jednodniowych i dodatkowych korzyści, z których korzystasz. Podanie jednej liczby byłoby mylące."
        }
      ]
    },
    "resortPassPrices": {
      "title": "Ceny ResortPass 2026: Silver, Gold i bilety jednodniowe",
      "description": "Aktualne ceny ResortPass dla dorosłych, dzieci i seniorów, w porównaniu z biletami jednodniowymi Europa-Park w zależności od daty.",
      "eyebrow": "Ceny 2026",
      "heading": "Ile kosztują ResortPass, Silver i Gold?",
      "answer": "Ostatnia oficjalna weryfikacja: Silver kosztuje 325 euro dla dorosłych i 275 euro dla dzieci oraz seniorów; Gold odpowiednio 495 i 430 euro. Żaden z nich nie jest obecnie dostępny w regularnej sprzedaży.",
      "sectionTitle": "Oceń cenę wraz z użyciem",
      "sectionIntro": "Bilety jednodniowe mają przedziały cenowe zależne od daty. Dlatego opłacalność rocznego karnetu nie zaczyna się od jednej uniwersalnej kwoty, lecz zależy od Twoich rzeczywistych terminów.",
      "points": [
        {
          "title": "Silver",
          "text": "325 euro dla dorosłych; 275 euro dla dzieci w wieku od 4 do 11 lat oraz dla osób w wieku 60 lat i więcej. Weź pod uwagę datę źródła pierwotnego.",
          "icon": "tabler:circle-letter-s"
        },
        {
          "title": "Gold",
          "text": "495 euro dla dorosłych; 430 euro dla dzieci i seniorów, z dodatkowymi korzyściami, takimi jak dwa dni Rulantica.",
          "icon": "tabler:circle-letter-g"
        },
        {
          "title": "Dostępność jest niezbędna",
          "text": "Porównanie cen ma sens tylko, jeśli wybrany karnet jest faktycznie sprzedawany. Sprawdź w tym celu stan na żywo.",
          "icon": "tabler:shopping-cart"
        }
      ],
      "faqs": [
        {
          "question": "Czy to są ceny 2026?",
          "answer": "Kwoty zostały pobrane z oficjalnej strony biletów w podanym terminie przeglądu. Operator może zmieniać ceny i warunki."
        },
        {
          "question": "Czy są dostępne specjalne stawki?",
          "answer": "Oficjalna strona wskazuje obniżone ceny dla dzieci, osób starszych i określonych akredytacji. Dokumenty potwierdzające i obowiązujące warunki są wiążące."
        },
        {
          "question": "Czy mogę teraz kupić ResortPass?",
          "answer": "Silver i Gold są obecnie niedostępne. Tracker na żywo pokaże, gdy rzeczywisty status w sklepie się zmieni."
        }
      ]
    },
    "resortPassReservation": {
      "title": "Rezerwacje wizyt z ResortPass: dni, portal i goście hotelowi",
      "description": "Jak działają rezerwacje z ResortPass: rejestracja dnia wizyty, limity miejsc, rezerwacja hotelu i obowiązujące zasady portalu.",
      "eyebrow": "Rezerwacja",
      "heading": "Czy musisz zarezerwować wizytę z ResortPass?",
      "answer": "Konkretna rezerwacja zależy od przepustki, dnia wizyty i dostępnych miejsc. Portal ResortPass oraz oficjalne sekcje często zadawanych pytań są punktem odniesienia; rezerwacja hotelu nie zastępuje automatycznie wszystkich potrzebnych kroków we wszystkich przypadkach.",
      "sectionTitle": "Sprawdź trzy rzeczy przed wyjściem",
      "sectionIntro": "Posiadanie ważnej przepustki, wybór dozwolonego dnia i posiadanie rezerwacji, gdy jest obowiązkowa, to różne wymagania.",
      "points": [
        {
          "title": "Otwórz portal przepustki",
          "text": "Sprawdź tam ważność, zapisane dni wizyt oraz aktualne informacje o limitach.",
          "icon": "tabler:login-2"
        },
        {
          "title": "Sprawdź rezerwację hotelu",
          "text": "W aktualnych najczęściej zadawanych pytaniach sprawdź, czy i jak dni wizyty są powiązane z konkretnym zakwaterowaniem w resorcie.",
          "icon": "tabler:hotel-service"
        },
        {
          "title": "Zachowaj potwierdzenie",
          "text": "W dniu wizyty miej przygotowany karnet i potwierdzenie rezerwacji w oficjalnej aplikacji lub we wskazanym formacie.",
          "icon": "tabler:ticket"
        }
      ],
      "faqs": [
        {
          "question": "Czy muszę rezerwować każdą wizytę?",
          "answer": "Nie można udzielić ogólnej odpowiedzi dla wszystkich rodzajów przepustek i okresów. Sprawdź obowiązujące przepisy na portalu ResortPass przed każdą wizytą."
        },
        {
          "question": "Czy rezerwacja hotelu automatycznie obejmuje rezerwację parku?",
          "answer": "Oficjalne często zadawane pytania opisują specjalne zasady dla gości. Nie opieraj się na przypuszczeniu: sprawdź swoją konkretną rezerwację na portalu."
        },
        {
          "question": "Co się dzieje, jeśli zabraknie miejsc?",
          "answer": "Obowiązują aktualne zasady operatora. Tracker dostępności sprawdza sprzedaż, a nie limity miejsc na poszczególne dni w portalu użytkownika."
        }
      ]
    },
    "resortPassRulantica": {
      "title": "ResortPass i Rulantica: korzyści Gold i rezerwacja",
      "description": "Jakie korzyści Rulantica obejmuje ResortPass Gold? Dwa bilety dzienne, planowanie, rezerwacja i różnice w stosunku do Silver.",
      "eyebrow": "ResortPass + Rulantica",
      "heading": "Co obejmuje ResortPass dla Rulantica?",
      "answer": "Według aktualnych informacji operatora, ResortPass Gold obejmuje dwa jednodniowe bilety dla Rulantica; Silver nie. Należy oficjalnie potwierdzić rezerwację, ważność i ewentualne dostępne miejsca przed wizytą.",
      "sectionTitle": "Naprawdę wykorzystaj dwa dni Rulantica",
      "sectionIntro": "Korzyść ma sens tylko wtedy, gdy dni wliczone pasują do Twojej podróży i możesz je zarezerwować na czas.",
      "points": [
        {
          "title": "Zaplanuj korzyść Gold",
          "text": "Traktuj te dwa dni jako część własnego rocznego planowania, a nie jako improwizowany dodatek na zakończenie dnia w parku.",
          "icon": "tabler:droplet-filled"
        },
        {
          "title": "Policz Silver osobno",
          "text": "W przypadku Silver bilety do Rulantica trzeba uwzględnić w budżecie osobno i rezerwować zależnie od dostępności.",
          "icon": "tabler:receipt-euro"
        },
        {
          "title": "Sprawdź, ile masz czasu",
          "text": "Rodzinom cały dzień w Rulantica zwykle daje więcej niż pośpieszny przejazd po pełnym dniu w parku.",
          "icon": "tabler:clock-hour-8"
        }
      ],
      "faqs": [
        {
          "question": "Ile dni Rulantica obejmuje Gold?",
          "answer": "Zgodnie z aktualną oficjalną listą korzyści — dwa bilety jednodniowe do Rulantica. Przy ich wykorzystaniu obowiązują aktualne warunki operatora."
        },
        {
          "question": "Czy Silver obejmuje Rulantica?",
          "answer": "Według aktualnego porównania Rulantica nie jest standardową korzyścią. Potrzebne bilety musisz uwzględnić w budżecie osobno."
        },
        {
          "question": "Czy trzeba rezerwować uwzględnione dni?",
          "answer": "Sprawdź obowiązujące zasady rezerwacji na portalu ResortPass. Rulantica ma ograniczoną dzienną liczbę miejsc."
        }
      ]
    }
  },
  "visitPlanner": {
    "eyebrow": "Interaktywny planer",
    "title": "Twój realistyczny plan dnia",
    "intro": "Wybierz długość pobytu, grupę i warunki. Otrzymasz solidny plan, a nie pozorną dokładność co do minuty.",
    "dateLabel": "Data wizyty",
    "daysLabel": "Przewidywane dni w parku",
    "days": [
      "1 dzień",
      "2 dni",
      "3 dni"
    ],
    "groupLabel": "Priorytet",
    "groups": {
      "balanced": "Zrównoważony",
      "family": "Rodzina i dzieci",
      "thrill": "Rollercoastery i akcja",
      "shows": "Pokazy i spokojny rytm"
    },
    "arrivalLabel": "Przyjazd",
    "arrivals": {
      "early": "Przed otwarciem",
      "opening": "W godzinie otwarcia",
      "late": "Po 10:30"
    },
    "crowdLabel": "Przewidywana frekwencja",
    "crowds": {
      "low": "Raczej niska",
      "medium": "Średnia",
      "high": "Wysoka"
    },
    "rulanticaLabel": "Uwzględnij Rulantica",
    "submit": "Utwórz plan",
    "resultTitle": "Twoja rekomendacja",
    "resultLead": "Planuj z jasnymi priorytetami",
    "resultDays": "zalecana łączna liczba dni",
    "routeLabel": "Plan dnia",
    "morning": "Rano",
    "midday": "Południe",
    "afternoon": "Popołudnie",
    "evening": "Wieczór",
    "notes": {
      "early": "Dotrzyj do wejścia przed oficjalnym otwarciem i określ trzy główne cele.",
      "late": "Jeśli przyjdziesz późno, drugi dzień jest bezpieczniejszy niż próba zrobienia wszystkiego w pośpiechu.",
      "busy": "Przy dużej frekwencji korzystaj z aktualnych czasów oczekiwania i przygotuj alternatywy w poszczególnych strefach.",
      "rulantica": "Z małymi dziećmi lub jeśli priorytetem jest woda, traktuj Rulantica jako niezależny dzień.",
      "family": "Planuj stałe bloki na posiłki i odpoczynek, a także co najmniej jedną alternatywę pod dachem.",
      "thrill": "Używaj Single Rider i VirtualLine tylko wtedy, gdy są naprawdę dostępne w dniu wizyty.",
      "shows": "Najpierw sprawdź godziny pokazów i zaplanuj trasę wokół tych godzin."
    },
    "routes": {
      "balanced": [
        "Zacznij od dwóch ważnych atrakcji i pozostań w tej samej części parku.",
        "Jedz wcześnie lub późno, a potem skorzystaj z atrakcji pod dachem lub pokazu jako spokojnego przerywnika.",
        "Przechodź przez sąsiednie strefy tematyczne i przed zmianą strefy porównuj aktualne czasy oczekiwania.",
        "Zrealizuj jeden pozostały priorytet, zostaw czas na pamiątki i sprawdź, czy godziny otwarcia parku zostały wydłużone."
      ],
      "family": [
        "Zacznij od odpowiedniej atrakcji rodzinnej i sprawdź wcześniej wysokość przy wejściu.",
        "Zaplanuj wczesną przerwę, posiłek i atrakcję w pomieszczeniu lub spokojny pokaz.",
        "Połącz strefę zabaw i dwie inne odpowiednie dla wieku atrakcje w tej samej połowie parku.",
        "Dostosuj plan do energii dzieci: lepszy jeden prawdziwy punkt kulminacyjny niż męczący finał."
      ],
      "thrill": [
        "Priorytetowo traktuj główne kolejki górskie po otwarciu i nie przemierzaj całego parku dla jednej atrakcji.",
        "Sprawdź VirtualLine i Single Rider; wykorzystaj południe na pobliską alternatywę.",
        "Wybierz drugą grupę rollercoasterów zgodnie z czasem oczekiwania na żywo i przewiduj awarie techniczne.",
        "Strategicznie zaplanuj ostatnią przejażdżkę w pobliżu miejsca, w którym chcesz skończyć."
      ],
      "shows": [
        "Sprawdź harmonogram i wybierz spokojną atrakcję w drodze na pierwszy pokaz.",
        "Połącz wczesny posiłek z pokazem w pomieszczeniu lub atrakcją tematyczną.",
        "Ustal drugi pokaz i między nimi uwzględnij tylko atrakcje w pobliżu.",
        "Ciesz się atmosferą, gastronomią i ostatnią atrakcją bez zbędnych zmian stref."
      ]
    },
    "disclaimer": "Pomoc w planowaniu bez gwarancji. Harmonogramy, czasy oczekiwania, VirtualLine i działanie atrakcji mogą zmienić się w krótkim czasie.",
    "forecastCta": "Sprawdź prognozę frekwencji"
  },
  "costCalculator": {
    "eyebrow": "Planer budżetu 2026",
    "title": "Oblicz realistyczny przedział kosztów",
    "intro": "Oficjalne przedziały cen biletów plus Twój szacunek kosztu noclegu. Jedzenie, dojazd i opcjonalne dodatki są celowo pominięte w automatycznym podsumowaniu.",
    "adults": "Dorośli od 12 lat",
    "children": "Dzieci od 4 do 11 lat",
    "days": "Europa-Park",
    "oneDay": "1 dzień",
    "twoDays": "2 dni",
    "rulantica": "Rulantica",
    "rulanticaOptions": {
      "none": "Nie uwzględniać",
      "day": "Bilet dzienny",
      "evening": "Bilet wieczorny od 17 h",
      "moonlight": "Moonlight od 19 h"
    },
    "parking": "Standardowy parking Europa-Park",
    "nights": "Noce",
    "lodgingPerNight": "Całkowity koszt zakwaterowania za noc",
    "calculate": "Aktualizuj budżet",
    "resultEyebrow": "Twój zakres kosztów",
    "total": "Szacowany koszt całkowity",
    "rangeConnector": "do",
    "perPerson": "za osobę",
    "breakdown": "Szczegóły",
    "europaParkTickets": "Bilety Europa-Park",
    "rulanticaTickets": "Bilety Rulantica",
    "parkingCost": "Parking",
    "lodgingCost": "Zakwaterowanie",
    "variableNote": "Ceny zależą od daty; podany przedział nie gwarantuje ceny końcowej.",
    "assumptionNote": "Dodaj także jedzenie, podróż i ewentualne koszty administracyjne.",
    "currency": "EUR"
  },
  "familyFinder": {
    "eyebrow": "Wyszukiwarka rodzinna",
    "title": "Filtruj atrakcje według wieku i wzrostu",
    "intro": "Wyszukiwarka korzysta z małego, oficjalnie zweryfikowanego wyboru. Decyzja wiążąca zawsze należy do personelu parku.",
    "age": "Wiek dziecka",
    "height": "Wzrost",
    "interest": "Zainteresowanie",
    "interests": {
      "all": "Wszystkie zweryfikowane przykłady",
      "calm": "Spokojny",
      "family": "Rodzinna przygoda",
      "thrill": "Akcja",
      "indoor": "Wewnątrz"
    },
    "submit": "Pokaż odpowiednie przykłady",
    "resultTitle": "Zweryfikowany wybór",
    "resultCount": "Wyświetlone atrakcje",
    "eligible": "Spełnia wymagania",
    "accompanied": "Wymaga towarzystwa osoby dorosłej",
    "notYet": "Jeszcze nie spełnia wymagań",
    "minimum": "Minimum",
    "years": "lat",
    "centimeters": "cm",
    "indoor": "Wewnątrz",
    "source": "Oficjalne źródło",
    "noResults": "Dla tego filtra nie ma jeszcze zweryfikowanej przykładowej atrakcji.",
    "disclaimer": "Nie gwarantuje możliwości skorzystania z atrakcji. W parku decydują oznaczenia, pomiar, zasady bezpieczeństwa i zdrowia oraz wskazówki personelu.",
    "officialFilter": "Sprawdź wszystkie atrakcje w oficjalnym filtrze"
  },
  "rulanticaPlanner": {
    "eyebrow": "Pomoc w łączeniu",
    "title": "Który bilet Rulantica pasuje do Twojej podróży?",
    "intro": "Narzędzie ocenia dni w parku, dzieci, priorytet wody i poziom energii. Następnie należy oficjalnie sprawdzić ceny i dostępność.",
    "parkDays": "Dni Europa-Park",
    "parkDayOptions": [
      "1 dzień w parku",
      "2 dni w parku",
      "3 dni lub więcej"
    ],
    "children": "Dzieci w grupie",
    "childOptions": [
      "Brak dzieci",
      "Dzieci poniżej 8 lat",
      "Starsze dzieci/nastolatki"
    ],
    "waterPriority": "Znaczenie Rulantica",
    "priorityOptions": [
      "Tylko wypróbować",
      "Ważny dodatek",
      "Główny cel"
    ],
    "energy": "Oczekiwane tempo",
    "energyOptions": [
      "Spokojnie",
      "Zrównoważone",
      "Intensywny program"
    ],
    "submit": "Oceń rodzaj wejścia",
    "resultLabel": "Rekomendacja planowania",
    "recommendations": {
      "day": {
        "title": "Pełny dzień w Rulantica",
        "text": "Z małymi dziećmi lub jeśli woda jest priorytetem, osobny dzień daje wystarczająco czasu na przerwy, przebranie się i odwiedzenie różnych stref."
      },
      "evening": {
        "title": "Wieczorne wejście jako dodatek",
        "text": "Pasuje do zwykłego tempa i jasno wybranych priorytetów, ale zaplanuj prawdziwą przerwę i czas na przejazd z Europa-Park."
      },
      "moonlight": {
        "title": "Moonlight na krótkie zakończenie",
        "text": "Trzy godziny lepiej pasują do doświadczonych, energicznych gości z niewieloma priorytetami niż do pełnej pierwszej wizyty."
      },
      "separate": {
        "title": "Zaplanuj Rulantica osobno",
        "text": "Przy spokojnym tempie lub dłuższej podróży osobny blok jest pewniejszy niż wizyta po pełnym dniu w parku."
      }
    },
    "checklistTitle": "Co zabrać i sprawdzić wcześniej",
    "checklist": [
      "Własny ręcznik dla gości jednodniowych",
      "Strój kąpielowy i sucha zmiana ubrań",
      "Aktualne godziny otwarcia i konserwacji",
      "Zasady dotyczące wieku i wzrostu dla wybranych zjeżdżalni",
      "Rezerwacja, wstęp i dostępność szafek"
    ],
    "officialNote": "Oficjalne najczęściej zadawane pytania są źródłem informacji dotyczących wstępu, ubrań, ręczników, wózków i szafek.",
    "officialCta": "Otwórz najczęściej zadawane pytania Rulantica"
  },
  "stayComparator": {
    "eyebrow": "Porównywarka zakwaterowania",
    "title": "Jaki rodzaj zakwaterowania pasuje do Twojej podróży?",
    "intro": "Porównaj osiem typów zakwaterowania według udokumentowanych cech. Wyszukiwarka nie pokazuje rankingów ani cen bez weryfikacji: pomaga zawęzić wyszukiwanie.",
    "filtersLabel": "Filtruj zakwaterowanie",
    "scenarioLabel": "Co jest dla ciebie szczególnie ważne?",
    "allScenarios": "Wszystkie sytuacje podróżne",
    "prioritiesLabel": "Dodatkowe cechy",
    "priorities": {
      "operatorGuestBenefits": "Korzyści dla gości ośrodka",
      "selfCatering": "Zakwaterowanie z kuchnią",
      "ownSleepingUnitRequired": "Własne wyposażenie do spania",
      "groupFormats": "Odpowiednie dla grup",
      "walkingAccess": "Dojście do parku pieszo",
      "shuttleOrTransit": "Transfer lub transport publiczny"
    },
    "reset": "Resetuj filtry",
    "resultsLabel": "Porównywalne typy zakwaterowania",
    "resultSingular": "rodzaj zakwaterowania",
    "resultPlural": "typy zakwaterowania",
    "operatorRelation": {
      "resort_operated": "Zarządzany przez Europa-Park Resort",
      "independent": "Niezależny obiekt"
    },
    "states": {
      "verified": "Udokumentowano",
      "available_for_this_type": "Dostępne dla tego typu",
      "not_applicable": "Nie dotyczy",
      "varies_by_property": "Różni się w zależności od zakwaterowania",
      "must_verify": "Sprawdź przed rezerwacją"
    },
    "verifyTitle": "Co powinieneś sprawdzić przed rezerwacją",
    "source": "Otwórz źródło",
    "checkedAt": "Sprawdzono dnia",
    "emptyTitle": "Żaden typ zakwaterowania nie spełnia wszystkich filtrów",
    "emptyText": "Usuń jedną cechę lub ponownie wybierz wszystkie sytuacje podróżne. Pusty wynik nic nie mówi o konkretnych obiektach.",
    "priceNoteTitle": "Dlaczego nie pokazujemy cen hoteli",
    "priceNoteText": "Ceny zmieniają się w zależności od daty, obłożenia, taryfy i usług. Najpierw porównaj odpowiedni typ, a następnie potwierdź ostateczną cenę bezpośrednio u dostawcy.",
    "notRanking": "Kolejność jest neutralna: nie oznacza oceny jakości ani płatnej rekomendacji.",
    "noJs": "Bez JavaScript wszystkie typy zakwaterowania i listy kontrolne są nadal widoczne; brakuje tylko interaktywnych filtrów.",
    "scenarioLabels": {
      "operator-benefits-priority": "Priorytet: wcześniejszy wstęp i transport z resortu",
      "park-and-rulantica-without-car": "Łączyć Europa-Park i Rulantica bez własnego samochodu",
      "own-motorhome-or-caravan": "Podróżować własnym kamperem lub przyczepą",
      "own-tent": "Spać we własnym namiocie",
      "large-group-themed-stay": "Tematyczny nocleg dla rodziny, stowarzyszenia lub grupy",
      "self-catering-filter": "Posiadanie kuchni jako kryterium wyboru",
      "walkability-filter": "Filtrować według trasy spacerowej do głównego wejścia"
    },
    "typeContent": {
      "official-themed-hotel": {
        "label": "Tematyczny hotel Europa-Park",
        "definition": "Jeden z sześciu tematycznych hoteli kategorii 4 gwiazdek (superior) prowadzonych przez resort.",
        "mustVerify": [
          "korzyści dostępne w konkretnych terminach podróży",
          "które atrakcje faktycznie otwierają się podczas wcześniejszego dostępu",
          "maksymalną liczbę osób w pokoju i dostępność dla osób z niepełnosprawnościami",
          "czy bilety są wliczone w wybrany pakiet, czy kupowane osobno"
        ]
      },
      "riverside-western-lodge": {
        "label": "Riverside Western Lodge",
        "definition": "Nocleg w pokojach w Silver Lake City z własnym zestawem korzyści dla gości.",
        "mustVerify": [
          "aktualny rozkład autobusu w Rust",
          "dostępne korzyści w konkretnych datach podróży",
          "maksymalną liczbę osób w pokoju i dostępność dla osób z niepełnosprawnościami",
          "możliwe okresy hałasu spowodowane wydarzeniami w Silver Lake City"
        ]
      },
      "tipi-town": {
        "label": "Tipi Town",
        "definition": "Tematyczne zakwaterowanie dla grup i rodzin w tipi, wozach, pokojach w domkach i Western Houses.",
        "mustVerify": [
          "układ łazienek i miejsc do spania w wybranej kategorii",
          "czy śniadanie jest obowiązkowe, czy można je dodać",
          "dostępne zalety w konkretnych terminach podróży",
          "możliwe okresy hałasu spowodowane wydarzeniami",
          "czy długość łóżek piętrowych jest odpowiednia dla podróżnych"
        ]
      },
      "official-caravaning": {
        "label": "Europa-Park Caravaning",
        "definition": "Działki w Silver Lake City dla kamperów i przyczep kempingowych.",
        "mustVerify": [
          "wymiary pojazdu i odpowiednia kategoria działki",
          "warunki elektryczne i wodne dla konkretnej rezerwacji",
          "godziny przyjazdu, odpoczynku i wyjazdu",
          "aktualne korzyści i rozkład autobusu w Rust"
        ]
      },
      "official-tent-camping": {
        "label": "Europa-Park Camping",
        "definition": "Strefa kempingowa w Silver Lake City dla gości z własnym namiotem.",
        "mustVerify": [
          "zasady dla namiotów i parceli",
          "potrzeby elektryczne i warunki podłączenia",
          "instalacje sanitarne i opcje śniadaniowe",
          "pogoda, godziny odpoczynku i aktualne korzyści dla gości"
        ]
      },
      "independent-hotel-or-guesthouse-rust": {
        "label": "Niezależny hotel lub pensjonat w Rust",
        "definition": "Zakwaterowanie w niezależnym obiekcie w gminie Rust.",
        "mustVerify": [
          "aktualne działanie obiektu i dostępność rezerwacji",
          "rzeczywistą drogę pieszą do wybranego wejścia",
          "śniadanie, parking, anulowanie rezerwacji i dostępność",
          "nie zakładać automatycznie korzyści dostępnych w hotelach resortu"
        ]
      },
      "independent-holiday-apartment-rust": {
        "label": "Niezależny apartament wakacyjny w Rust",
        "definition": "Niezależny nocleg, który gmina Rust klasyfikuje jako apartament wakacyjny.",
        "mustVerify": [
          "rzeczywiste wyposażenie kuchni i jadalni, bez wnioskowania wyłącznie na podstawie kategorii",
          "rzeczywistą drogę pieszą do wybranego wejścia",
          "minimalny pobyt, sprzątanie końcowe, parking i anulowanie",
          "aktualna rejestracja i dostępność"
        ]
      },
      "accommodation-nearby-municipalities": {
        "label": "Zakwaterowanie w pobliskiej gminie",
        "definition": "Niezależne zakwaterowanie poza Rust, w gminie w regionie Erlebnisregion Europa-Park.",
        "mustVerify": [
          "połączenie w konkretny dzień tygodnia i o godzinie zamknięcia parku",
          "ostatnie połączenie powrotne i przesiadki",
          "parking przy celu podróży i przy noclegu",
          "aktualne działanie obiektu i dostępność rezerwacji"
        ]
      }
    }
  },
  "restaurantFinder": {
    "eyebrow": "Zweryfikowany katalog",
    "title": "Obiektywne porównanie mniejszych restauracji w Rust",
    "intro": "Przeszukaj osiem redakcyjnie sprawdzonych kart. Wyświetlamy tylko udokumentowane cechy; nie twierdzimy nic o jakości, poziomie cen ani dostępności stolików.",
    "filtersLabel": "Filtruj restauracje",
    "searchLabel": "Nazwa lub adres",
    "searchPlaceholder": "Na przykład Adler lub Fischerstraße",
    "statusLabel": "Stan weryfikacji",
    "allStatuses": "Wszystkie stany",
    "statuses": {
      "first_party_verified": "Udokumentowano w źródle lokalu",
      "public_directory_verified": "Udokumentowano w katalogu miejskim",
      "license_page_verified": "Udokumentowano za pomocą strony licencyjnej",
      "needs_reverification": "Wymaga nowej weryfikacji"
    },
    "timeLabel": "Udokumentowane godziny otwarcia",
    "allTimes": "Wszystkie udokumentowane godziny otwarcia",
    "timeSlots": {
      "breakfast": "Śniadanie",
      "evening": "Obsługa kolacji"
    },
    "distanceLabel": "Udokumentowany dystans",
    "allDistances": "Wszystkie udokumentowane dystanse",
    "distanceOptions": [
      {
        "maxMetres": 500,
        "label": "Do 500 m"
      },
      {
        "maxMetres": 1000,
        "label": "Do 1 km"
      },
      {
        "maxMetres": 2000,
        "label": "Do 2 km"
      }
    ],
    "needsLabel": "Udokumentowane potrzeby",
    "familyFeatures": {
      "kids_menu": "Wspomniane menu dla dzieci"
    },
    "dietFeatures": {
      "vegetarian_evidence": "Udokumentowane opcje wegetariańskie",
      "vegan_evidence": "Udokumentowane opcje wegańskie",
      "gluten_free_evidence": "Udokumentowane opcje bezglutenowe"
    },
    "reset": "Resetuj filtry",
    "resultsLabel": "Zweryfikowane karty",
    "resultSingular": "restauracja",
    "resultPlural": "restauracje",
    "noJs": "Bez JavaScript wszystkie karty, źródła i niepewności są nadal czytelne; brak tylko wyszukiwania i filtrów.",
    "emptyTitle": "Żadna karta nie pasuje do tych filtrów",
    "emptyText": "Usuń filtr. Brak wyników może również oznaczać, że cecha nie jest jeszcze wystarczająco udokumentowana.",
    "serviceEvidence": "Udokumentowana obsługa",
    "cuisineEvidence": "Udokumentowany rodzaj kuchni",
    "filterEvidence": "Podstawa filtra",
    "evidenceCheckedAt": "Sprawdzenie podstawy filtra",
    "source": "Źródło pierwotne",
    "operatorWebsite": "Strona internetowa obiektu",
    "corroboratingSource": "Dodatkowe źródło",
    "uncertaintyTitle": "Co należy sprawdzić przed wizytą",
    "verificationNote": "Notatka weryfikacyjna",
    "checkedAt": "Karta sprawdzona",
    "reviewDue": "Termin ponownej weryfikacji minął",
    "notRecommendation": "To nie jest rekomendacja",
    "notRecommendationTitle": "Neutralny katalog, nie lista najlepszych",
    "notRecommendationText": "Uwzględnienie lokalu i kolejność nie stanowią oceny jakości. Potwierdź bezpośrednio w lokalu godziny otwarcia, menu, alergeny i rezerwacje.",
    "unavailableEvidenceTitle": "Filtry, które celowo pominęliśmy",
    "unavailableEvidence": {
      "time": "Harmonogramy nie zostały jeszcze udokumentowane w wystarczająco jednolity sposób.",
      "distance": "Odległości nie zostały jeszcze zmierzone według spójnej trasy.",
      "family": "Cechy przyjazne rodzinom nie zostały jeszcze wystarczająco udokumentowane.",
      "diet": "Opcje wegetariańskie, wegańskie i bezglutenowe nie zostały jeszcze zarejestrowane z wystarczającą wiarygodnością."
    },
    "entryContent": {
      "gasthaus-adler-rust": {
        "cuisineEvidence": [
          "tradycyjna domowa kuchnia"
        ],
        "serviceEvidence": [
          "serwowanie kolacji według strony lokalu"
        ],
        "verificationNote": "Strona internetowa i nota prawna lokalu były dostępne; w dniu weryfikacji zawierały adres, dane kontaktowe, rodzaj kuchni i aktualne informacje o godzinach otwarcia.",
        "uncertainties": [
          "Specjalne godziny otwarcia i urlopy zależą od konkretnej daty.",
          "Nie sprawdzono dostępności rezerwacji."
        ]
      },
      "hardys-rust": {
        "cuisineEvidence": [
          "potrawy regionalne i międzynarodowe",
          "hamburgery, żeberka, makarony i steki według strony lokalu"
        ],
        "serviceEvidence": [
          "śniadanie według strony lokalu",
          "serwowanie kolacji według strony lokalu"
        ],
        "verificationNote": "Strona internetowa obiektu była dostępna i zawierała adres, rodzaj kuchni oraz ofertę śniadaniową.",
        "uncertainties": [
          "Aktualne informacje o otwarciu na stronie mogą zmienić się w krótkim czasie.",
          "Własne treści promocyjne i osadzone recenzje nie zostały użyte jako dowód jakości."
        ]
      },
      "casa-rustica-rust": {
        "cuisineEvidence": [
          "kuchnia włoska"
        ],
        "serviceEvidence": [
          "serwowanie kolacji według katalogu miejskiego"
        ],
        "verificationNote": "Strona lokalu potwierdza działalność, adres i kuchnię włoską; katalog miejski podaje aktualne ramowe godziny otwarcia.",
        "uncertainties": [
          "Potwierdź godziny otwarcia na stronie obiektu lub telefonicznie przed wizytą.",
          "Podany przez lokal czas dojścia pieszo do parku nie został niezależnie zmierzony."
        ]
      },
      "hotel-restaurant-mythos": {
        "cuisineEvidence": [
          "kuchnia grecka i międzynarodowa"
        ],
        "serviceEvidence": [
          "menu dla dzieci zgodnie ze stroną obiektu"
        ],
        "verificationNote": "Strona internetowa obiektu była dostępna i potwierdziła adres, rodzaj kuchni i kontakt do rezerwacji.",
        "uncertainties": [
          "Czytelna zawartość strony internetowej nie wskazuje stałych godzin w tygodniu.",
          "Nie sprawdzano dostępności stolików."
        ]
      },
      "kaiserstuehler-hof-rust": {
        "cuisineEvidence": [
          "kuchnia badeńska",
          "dania regionalne"
        ],
        "serviceEvidence": [
          "serwowanie kolacji według strony lokalu"
        ],
        "verificationNote": "Strona lokalu była dostępna i podawała adres, profil kuchni badeńskiej oraz aktualne tygodniowe godziny otwarcia.",
        "uncertainties": [
          "Przed wizytą ponownie sprawdź urlopy i dzień wolny.",
          "Nie twierdzimy, że jest odpowiedni dla alergików bez wcześniejszego zapytania."
        ]
      },
      "restaurant-fenix-rust": {
        "cuisineEvidence": [
          "źródło pierwotne nie definiuje wyraźnie rodzaju kuchni"
        ],
        "serviceEvidence": [
          "serwowanie kolacji według strony lokalu"
        ],
        "verificationNote": "Strona lokalu i wpis w katalogu miejskim potwierdzają działalność, adres i dane kontaktowe. Nie uwzględniono twierdzeń reklamowych.",
        "uncertainties": [
          "Sprawdź ręcznie rodzaj kuchni w aktualnym menu przed przypisaniem go redakcyjnie.",
          "Strona internetowa obiektu pokazuje godziny różniące się od tych na platformach zewnętrznych; korzystaj tylko z danych obiektu."
        ]
      },
      "la-terrassa-rust": {
        "cuisineEvidence": [
          "katalog miejski nie wskazuje rodzaju kuchni"
        ],
        "serviceEvidence": [
          "taras według katalogu miejskiego"
        ],
        "verificationNote": "Restauracja figuruje w aktualnym katalogu miejskim; powiązana strona internetowa opisuje głównie pensjonat i nie potwierdza szczegółów dotyczących restauracji.",
        "uncertainties": [
          "Potwierdź bezpośrednio działalność, rodzaj kuchni i godziny otwarcia.",
          "Nie przedstawiaj jej jako restauracji zweryfikowanej redakcyjnie, dopóki nie uzyskasz bezpośredniego potwierdzenia."
        ]
      },
      "my-denis-rust": {
        "cuisineEvidence": [
          "Katalog miejski nie wskazuje rodzaju kuchni"
        ],
        "serviceEvidence": [
          "Dostawa zgodnie z katalogiem miejskim"
        ],
        "verificationNote": "Pojawia się tylko w katalogu miejskim; w dniu przeglądu nie znaleziono niezawodnej własnej strony internetowej.",
        "uncertainties": [
          "Potwierdź bezpośrednio działalność, kontakt, rodzaj kuchni i godziny otwarcia.",
          "Nie włączaj tego do rekomendacji ani rankingów dla użytkowników, dopóki nie zweryfikujesz bezpośredniego źródła."
        ]
      }
    }
  },
  "resortPassTool": {
    "eyebrow": "Pomoc w wyborze ResortPass",
    "title": "Sprawdź status, korzyści i rzeczywisty koszt",
    "intro": "Aktualny status odpowiada na pytanie, czy karnet można kupić. Porównanie i kalkulator pomagają następnie wybrać między biletami jednodniowymi, Silver i Gold.",
    "statusTitle": "Aktualny stan sprzedaży",
    "statusChecking": "Sprawdzanie stanu…",
    "statusAvailable": "Oficjalnie dostępne teraz",
    "statusUnavailable": "Obecnie niedostępne",
    "statusUnknown": "Stan niepewny w tej chwili",
    "statusError": "Nie udało się wczytać aktualnego statusu",
    "lastChecked": "Ostatnie sprawdzenie",
    "comparisonTitle": "Silver i Gold na pierwszy rzut oka",
    "feature": "Cecha",
    "silver": "Silver",
    "gold": "Gold",
    "adultPrice": "Cena dla dorosłych",
    "concessionPrice": "Dzieci od 4 do 11 / osoby od 60 lat",
    "visitDays": "Dni wizyty",
    "visitDaysSilver": "Określone i opublikowane dni wizyty",
    "visitDaysGold": "Większa elastyczność zgodnie z obowiązującymi warunkami",
    "rulanticaBenefit": "Rulantica",
    "rulanticaSilver": "Nie jest standardowo wliczona",
    "rulanticaGold": "Dwa bilety dzienne zgodnie z obowiązującymi warunkami",
    "flexibility": "Profil planowania",
    "flexibilitySilver": "Na daty, które możesz zaplanować wcześniej",
    "flexibilityGold": "Na częstsze lub spontaniczne wizyty",
    "calculatorTitle": "Proste porównanie kosztów dla dorosłych",
    "calculatorIntro": "Porównaj ostatnie udokumentowane ceny biletów z wybraną liczbą jednodniowych wizyt w Europa-Park i Rulantica.",
    "visitsLabel": "Wizyty w Europa-Park",
    "rulanticaVisitsLabel": "Jednodniowe wizyty w Rulantica",
    "priceScenarioLabel": "Scenariusz cen biletów dziennych",
    "lowerPriceScenario": "Dolny kraniec udokumentowanego przedziału",
    "upperPriceScenario": "Górny kraniec udokumentowanego przedziału",
    "calculate": "Aktualizuj porównanie",
    "dayTicketsCost": "Pojedyncze bilety dzienne",
    "silverCost": "Silver plus bilety na Rulantica",
    "goldCost": "Gold z dwoma dniami Rulantica wliczonymi",
    "lowestCost": "Obliczona minimalna kwota",
    "estimateDisclaimer": "Wskazówki dla osoby dorosłej, bez gwarancji zakupu ani dostępności. Wykluczone dni, rezerwacje, rabaty, podróż i niewykorzystane świadczenia mogą zmienić decyzję.",
    "linksTitle": "Znajdź bezpośrednią odpowiedź na kolejne pytanie",
    "compareLink": "Porównaj Silver i Gold",
    "pricesLink": "Sprawdź ceny ResortPass",
    "reservationLink": "Zrozum rezerwację",
    "rulanticaLink": "ResortPass i Rulantica"
  }
} satisfies PlanningLocalePack;
