# Neue Informationsarchitektur & Startseite

*Entscheidungsvorlage. Alle Zahlen aus den geprüften Audit-Findings und der Recherche; wo ich schätze, steht es dabei.*

---

## 1. Positionierungs-Entscheidung

### Was für „ResortPass-Tracker mit Zusatznutzen" spricht

- **Marktposition ist eine Quasi-Monopolstellung.** Es gibt weltweit genau einen direkten Konkurrenten: `resortpassalarm.com` — 2,49 €/Monat, „Wir machen Pause – neue Anmeldungen sind aktuell nicht möglich", und der eigene Checker meldete am 01.08.2026 „Zuletzt geprüft: Vor 19836 Minuten" (≈ 13,8 Tage tot). Das Feld ist leer.
- **Der einzige unkopierbare Datensatz liegt hier**: 14.034 dokumentierte Shop-Prüfungen seit 04.03.2026. Europa-Park gibt zur Verfügbarkeit ausdrücklich keine Auskunft, es gibt keine offizielle Warteliste. Dieser Datensatz hat kein Lizenzrisiko (ParkQueueTimes ist nicht beteiligt) und ist der stärkste GEO-Hebel des ganzen Projekts.
- **Es funktioniert bereits nachweislich**: `/en/` erscheint in LLM-Antworten zu „resort pass sold out" zwischen den offiziellen Mack- und Europa-Park-Seiten, mit wörtlicher Übernahme der Seitensätze.
- **880 Abonnenten** sind für dieses Thema gekommen, nicht für Wartezeiten.
- Aufwand: null. Domain, Marke, Struktur passen.

### Was für „Europa-Park-Begleiter mit ResortPass-Alarm als Feature" spricht

- **Das Thema trägt keine Website.** Es hat *einen* relevanten Moment pro Jahr (das Verkaufsfenster, zuletzt ~60 Stunden). Dazwischen ist es eine Seite ohne Neuigkeit. 0,0 % Verfügbarkeit über 150 Tage ist kein Wiederkehrgrund.
- **Das Suchvolumen liegt woanders.** Wartezeiten und Planung haben ein Vielfaches der Nachfrage — belegt durch die Anzahl spezialisierter Wettbewerber (14+ allein bei Wartezeiten) gegenüber genau einem beim ResortPass.
- **Die offizielle App geofenced die Wartezeiten** — sie funktioniert nur im Park. Der gesamte Planungs-Use-Case liegt per Design bei Drittanbietern. Das ist ein struktureller, dauerhafter Markt.
- **Der GEO-Vorsprung ist bei Wartezeiten am grössten**: thrill-data.com sperrt ClaudeBot/GPTBot/CCBot, wartezeiten.app und park.fan stehen hinter Bot-Challenges, wartezeiten.cloud setzt `ai-train=no`. Diese Seite erlaubt alle — und ist die einzige, die LLM-zitierfähig werden *kann*.
- Domain und Marke sind für ein breites Angebot ein Handicap.

### Entscheidung

**Europa-Park-Begleiter mit dem ResortPass-Alarm als Signatur-Feature — unter der bestehenden Domain und Marke. Kein Rebranding, kein Domainwechsel.**

Begründung im Detail:

**Warum Begleiter, nicht Tracker:** Ein Tracker, dessen Antwort sich seit fünf Monaten nicht ändert, hat keine Wiederkehrfrequenz. Die 880 Abonnenten sind eine Mailingliste, kein Traffic. Wachstum, Wiederkehr und LLM-Sichtbarkeit hängen an Wartezeiten, Prognose und Planung.

**Warum der ResortPass trotzdem nicht zum „Feature" degradiert wird:** Er ist das Einzige, wo diese Seite den Markt besitzt, eigene Daten besitzt und heute schon zitiert wird. Er ist der Vertrauensanker *und* die Conversion-Maschine. Die richtige Rollenverteilung lautet:

> **Der ResortPass-Alarm ist der Grund, sich anzumelden. Die Wartezeiten sind der Grund, wiederzukommen.**

**Warum die Domain bleibt:** Ein Domainwechsel kostet einen Einzelbetreiber Monate und verbrennt das einzige vorhandene Ranking-Asset. Der Slug ist ein schwacher Rankingfaktor, und in modernen SERPs ist der sichtbare Anker der Site-Name, nicht die URL. Der `.ch`-ccTLD-Nachteil gegenüber dem deutschen Markt ist real, aber er ist eine strategische Randbedingung, kein behebbarer Defekt — und er lässt sich ohne Zahlen nicht entscheiden.

**Die einzige Hedge, die ich empfehle:** Search-Console-Impressionen nach Land für 6 Monate auswerten. Erst wenn der DE-Anteil belegbar über ~70 % liegt und gleichzeitig hinter der Erwartung zurückbleibt, wird ein Zweitdomain-Umzug zum Thema. Bis dahin: nichts anfassen. Der bisher als „Quick Win" gehandelte Wechsel `de-CH → de-DE` bei `bcp47`/`ogLocale` bringt bei Google nachweislich **nichts** und bricht die Systematik der anderen 14 Sprachen — nicht machen.

**Was sich stattdessen ändert:** Der Claim. Von „Ist der ResortPass verfügbar?" zu einem Versprechen, das beide Hälften trägt:

> **ResortPass Tracker — Europa-Park planen. Und wissen, wann die Jahreskarte wieder kaufbar ist.**

Die H1 der Startseite bleibt die Frage („Wann gibt es wieder Europa-Park Jahreskarten?"), weil sie exakt die Suchanfrage ist. Was sich ändert, ist alles darunter.

---

## 2. Seitenstruktur

### Zielhierarchie

```
Start  (ResortPass-Antwort + Einstieg in alle vier Säulen)
│
├── Wartezeiten                     [Live]
│   └── /wartezeiten/<attraktion>/  [Phase 5, 10–12 Bahnen, 4 Sprachen]
│
├── Besucherprognose                [Live]
│
├── Planen                          (Hub /europa-park-guide/)
│   ├── Besuchsplaner
│   ├── Kostenrechner
│   ├── Familien-Finder
│   ├── Rulantica-Planer
│   ├── Übernachten
│   ├── Restaurants
│   ├── Öffnungszeiten & Saison     ← NEU
│   └── Anreise & Parken            ← NEU (Phase 5)
│
├── ResortPass                      (Hub /resortpass-guide/)
│   ├── Preise & Preisverlauf
│   ├── Silver oder Gold            (Break-even-Rechner)
│   ├── Silver-Sperrtage            ← NEU
│   └── Verfügbarkeits-Chronik      ← NEU
│
└── Über die Seite
    ├── Methodik & Korrekturen      ← NEU
    └── Impressum & Datenschutz
```

### Was zusammengelegt wird

Der harte Befund: die fünf ResortPass-Seiten teilen 82 % ihrer Textzeilen; pro Seite bleiben **151–190 eigene Wörter**. Das ist kein Duplicate-Content-Problem, sondern Thin Content in fünffacher Ausfertigung.

| Alt | Neu | Warum |
|---|---|---|
| `/resortpass-reservierung/` | Abschnitt in `/resortpass-guide/#reservierung` | 152 eigene Wörter, reine Unterfrage |
| `/resortpass-rulantica/` | Abschnitt in `/resortpass-guide/#rulantica` | 175 eigene Wörter, reine Unterfrage |

Bleiben eigenständig, weil eigene Suchintention **und** eigener Substanzblock:

- **`/resortpass-guide/`** — der einzige Ort mit dem vollen Tool (Status + Vergleich + Rechner). Absorbiert Reservierung und Rulantica-Leistung.
- **`/resortpass-preise/`** — nur Preistabelle **plus Preis-Chronik** (was kostete Silver/Gold 2024, 2025, 2026, wann wurde erhöht). Das ist der Substanzblock, den keine andere Seite hat.
- **`/resortpass-silver-oder-gold/`** — nur der Break-even-Rechner, aber mit Klartext-Entscheidung („Bei 5 Parkbesuchen und 0 Rulantica-Tagen spart Silver 10 € — zu wenig Puffer; Gold lohnt ab 8 Besuchen") und Erwachsene/Kinder getrennt.

### Kannibalisierung Startseite ↔ ResortPass-Ratgeber

Klare Rollentrennung, durchgesetzt in `PlanningGuidePage.astro`:

| Rolle | Wo | Was |
|---|---|---|
| **Antwort** („Ist er kaufbar?") | **nur Startseite** | Hero-Antwortkarte, grosse Status-Karten, Alarm-Formular |
| **Status als Kontext** | alle ResortPass-Ratgeber | eine kompakte Statuszeile (nicht zwei Grosskarten), Höhe ≤ 72 px |
| **Erklärung** | Ratgeber | was ist es, was kostet es, welcher passt, wann gesperrt |
| **Beleg** | `/resortpass-verlauf/` | die Chronik, nicht die Startseite |

Konsequenzen für die Startseite: FAQ-Karte 02 („Ist der ResortPass aktuell verfügbar? — Nein.") fliegt raus (sie wiederholt den Hero), ebenso die H3 „Wann gibt es wieder Europa-Park Jahreskarten?", die zeichengleich mit der H1 ist. Die 34-seitige Verlaufstabelle zieht auf die neue Chronik-Route um.

### Was neu entsteht — mit Begründung

1. **`/resortpass-verlauf/`** — *höchste Priorität.* Der einzige lizenzfreie, unkopierbare Datensatz. Als eigene Route mit `Dataset`-Markup, CC0-Download (JSON+CSV) und dem zitierfähigen Einleitungssatz. Macht die Seite von einer Sekundär- zur **Primärquelle**.
   *Wichtig:* Der Text muss aus den echten Werten generiert werden. Die kursierende Erzählung „Fehlalarm vom 19. März" ist **nicht belegt** — die eine Verfügbarkeitsmeldung liegt laut `/api/history/silver` im Juni 2026. Keine Fehlalarm-Story ohne Datensatz-Nachweis, ausgerechnet auf der Seite, die als Quelle zitiert werden soll.

2. **`/resortpass-sperrtage/`** — Ein Wartezeiten-Anbieter (`wartezeiten.cloud`) rankt derzeit für eine reine ResortPass-Frage. Das ist eine offene Flanke im eigenen Kernthema. Verknüpfbar mit Prognose und Wartezeiten („An diesem Sperrtag wärst du ohnehin nicht hingefahren").

3. **`/oeffnungszeiten/`** — Eigener, stabiler Suchcluster mit einer ganzen Riege Nischenkonkurrenten, und die Seite hat **keine einzige Route dafür**. Die Daten liegen bereits vor (`/api/crowd-calendar` liefert `openingTime`/`closingTime` für 31 Tage). Aufwand nahe null, Nutzen hoch — auch als Antwort auf „Hat der Europa-Park im Februar geschlossen?".

4. **`/methodik/`** — E-E-A-T-Lücke schliessen: Wer betreibt das, seit wann, wie wird geprüft (15-Min-Zyklus, Doppelbestätigung, Behandlung von Schutzseiten), woher kommen die Daten, wie wird korrigiert. Plus Autor-Entität mit `sameAs` auf das GitHub-Repo. Heute gibt es kein `sameAs` im gesamten Build (0 Treffer über 324 Dateien) und der Fehlalarm-Bericht sitzt am Ende der Newsliste.

5. **`/anreise/`** und **`/neuheiten-2026/`** — Phase 5. Anreise besonders wertvoll für eine `.ch`-Domain (Schweizer sind die grösste internationale Besuchergruppe; RailCoaster Zürich–Ringsheim, Kombiticket ab 99 CHF).

### Was wegfällt

- **Community-Sektion auf der Startseite** — 443 px leerer Zustand mit einem CTA, der eine Token-Bedingung hat, die erst nach dem Klick sichtbar wird. Rendern erst ab **≥ 3 freigegebenen Tipps**. `/community/neu/` bleibt als Route, erreichbar aus der Alert-Mail.
- **Die drei automatischen Tages-News** — „war bei keiner der 26 Prüfungen verfügbar", dreimal, 1.211 px. Ersetzt durch ereignisgesteuerte Meldungen (siehe §5).
- **Die dekorative Hero-Illustration** (668 × 351 px) und der doppelte „Zuletzt geprüft"-Absatz.
- **Die 34-Seiten-Tabelle** auf der Startseite (1.856 px = 21 % der Seite für 20 identische Zeilen pro Blätterschritt).

### Redirects (301, dauerhaft, nie zurücknehmen)

**Zusammenlegungen** — je 17 Sprachvarianten:
```
/resortpass-reservierung/           → /resortpass-guide/#reservierung
/resortpass-rulantica/              → /resortpass-guide/#rulantica
(+ die 16 lokalisierten Entsprechungen aus routeRegistry)
```

**Slug-Korrekturen** (heute laufen EN/FR/IT auf deutschen Slugs — ausgerechnet die drei reichweitenstärksten Fremdsprachen):
```
/en/wartezeiten/  → /en/wait-times/
/fr/wartezeiten/  → /fr/temps-d-attente/
/it/wartezeiten/  → /it/tempi-di-attesa/
/en/impressum/    → /en/legal-notice-and-privacy/
/fr/impressum/    → /fr/mentions-legales-et-confidentialite/
/it/impressum/    → /it/note-legali-e-privacy/
```

**Hebräisch**: die zwei gemischt-bidirektionalen Slugs auf reines Hebräisch vereinheitlichen, mit 301 auf die alten Pfade:
```
/he/europa-park-עם-ילדים/       → reiner hebräischer Slug
/he/resortpass-silver-או-gold/  → reiner hebräischer Slug
```

**Bereits im Repo, aber nicht deployed** (308): `/pfad` → `/pfad/`, `/pfad/index.html` → `/pfad/`.

**Anker, die bestehen bleiben müssen** (in Nav, Mails und externen Links referenziert): `#benachrichtigung`, `#info`. Neu: `#verlauf` (verlinkt auf die Chronik-Route, ersetzt `#history`).

**Reihenfolge zwingend:** Erst der 404-Fix (§8, Phase 0), dann die Redirects. Solange jede erfundene URL HTTP 200 mit der deutschen Startseite liefert, lässt sich kein einziger Redirect verifizieren.

---

## 3. Navigation

### Header

**Desktop (≥ 1024 px), eine Zeile, konstante Höhe:**

```
[Wortmarke]   Wartezeiten · Besucherprognose · Planen ▾ · ResortPass ▾   [Alarm aktivieren] [DE ▾]
```

- **Vier Top-Level-Punkte.** „Planen" und „ResortPass" öffnen ein Popover mit den jeweiligen Unterseiten (ausgeschriebene Namen, keine Icon-Rätsel). Das ersetzt die heutige Planner-Bar, die auf Ratgeberseiten die Kopfhöhe von 68 auf 122 px springen lässt.
- **Konstante Kopfhöhe über alle Seitentypen** — die Sekundärnavigation wandert als Inline-Leiste unter den Hero. Löst nebenbei den Anker-Offset-Fehler (`scroll-padding-top: 112px` gegen 122 px Kopf).
- **CTA „Alarm aktivieren"** bleibt, verlinkt auf `/#benachrichtigung`.
- Header-Formsprache angleichen: 2 px Unterkante statt 1 px Weichschatten, Popover mit 3 px Rand und hartem Versatzschatten wie die Karten.

**Mobil:** Wortmarke + Live-Status-Chip („Ausverkauft") + Burger. Im Panel: die vier Punkte mit ausgeklappten Unterlisten, dann CTA, dann Sprachwahl.

### Wichtige Korrektur bei den Labels

Sieben Locales verletzen SC 2.5.3 (Label in Name, Level A): sichtbar steht „Kolejki", das `aria-label` sagt „Czasy oczekiwania" — betroffen sind cs, pl, es, ro, **fr, it, en**. Sprachsteuerungs-Nutzer können den Link nicht ansprechen. Fix: `aria-label` an den Primärlinks weglassen, Ergänzung als `<span class="sr-only">` anhängen, plus ein Unit-Test in `site-header-model.ts`, der für alle 17 Locales prüft, dass `compactLabel` in `label` enthalten ist.

### Footer

Vier Spalten + Sprachraster + Rechtszeile. **Auf allen Seitentypen derselbe Footer** — `.planning-footer` wird gestrichen, `Footer.astro` bekommt ein `showCta`-Prop (analog zum vorhandenen `showLanguageSwitcher`). Heute verlieren die Ratgeberseiten die komplette Querverlinkung.

| Live | Planen | ResortPass | Über |
|---|---|---|---|
| Wartezeiten | Besuchsplaner | Aktueller Status | Methodik & Korrekturen |
| Besucherprognose | Kostenrechner | Preise & Verlauf | Quellen & Prüfdaten |
| Öffnungszeiten | Familien-Finder | Silver oder Gold | Open Source (GitHub) |
| RSS · iCal | Rulantica · Übernachten · Restaurants | Sperrtage · Chronik | Impressum & Datenschutz |

Darunter: 17-Sprachen-Raster, Attribution „Powered by ParkQueueTimes.com", Disclaimer „Inoffizielles Projekt, nicht mit Europa-Park verbunden".

### Breadcrumbs

Auf allen Seiten ausser der Startseite, als echtes `<nav><ol><li>`-Muster mit `aria-current="page"`. Zwei Korrekturen zum Ist-Zustand:
- Eigener i18n-Key `nav.breadcrumb` — heute tragen Breadcrumb **und** Inhaltsverzeichnis dasselbe `aria-label="Auf dieser Seite"`, was in der Landmark-Liste zweimal identisch erscheint und beim Breadcrumb schlicht falsch ist.
- Auf `/wartezeiten/`, `/besucherprognose/` und `/impressum/` gibt es heute BreadcrumbList-JSON-LD **ohne** sichtbare Entsprechung. Beides angleichen: Breadcrumb sichtbar ausrollen. Auf der Startseite den einstufigen BreadcrumbList-Knoten ersatzlos streichen.

### Interne Verlinkung — drei Pflichtbrücken

Heute hat `/besucherprognose/` im `<main>` genau **einen** internen Link, `/wartezeiten/` ebenfalls einen, und der Ratgeber-Hub verlinkt weder Wartezeiten noch Prognose noch den ResortPass-Guide. Das sind vier Silos.

1. **Prognose → Handlung**: Unter dem Kalender „Was du mit diesem Datum machen kannst" — Besuchsplaner (Datum via `?date=` vorbefüllt), Kostenrechner, Live-Wartezeiten. Dafür muss das tote `dateLabel`-Feld im VisitPlanner endlich als Datumsinput gerendert werden (es ist in allen 17 Sprachen übersetzt und wird nirgends ausgegeben).
2. **Wartezeiten → Prognose**: Streifen „Heute Index 52 — die drei ruhigsten kommenden Tage". Der Code dafür existiert bereits in `CrowdCalendarPage.astro` und muss nur wiederverwendet werden.
3. **Hub → Live**: Die drei Live-Features als **erste** Reihe im Kachel-Grid von `/europa-park-guide/`, vor den statischen Ratgebern. Und `navigation.slice(1, 7)` aufheben — der Hub zeigt heute 6 von 12 Ratgebern und wiederholt drei davon wortgleich unten als „Passende nächste Schritte".

### Sprachumschalter

Bleibt wie er ist, mit zwei Fixes: die hebräische Zeile rutscht durch `dir="rtl"` auf dem Namens-Span an den rechten Zellenrand und bricht das Raster — `text-align: left; unicode-bidi: isolate;` (nicht `text-align: start`, das bedeutet im RTL-Kontext rechts). Und `x-default` von `de` auf `en` entkoppeln (**erst nach** dem EN-Slug-Fix, sonst zementiert es `/en/wartezeiten/`).

**Zwei-Stufen-Sprachpolitik.** Europa-Park betreibt seine eigene Website in exakt fünf Sprachen: de, en, fr, it, nl. Das ist der belastbarste Nachfrage-Proxy, den es gibt.

- **Tier 1 (de, en, fr, nl, it):** alle Routen, redaktionell gepflegt, saisonal aktualisiert.
- **Tier 2 (12 weitere):** nur Start, Wartezeiten, Prognose, Guide-Hub. Neue Feature-Routen bewusst **nicht** ausrollen.

Grund: Jede neue Route kostet 17 Seiten Pflege. Nicht löschen (der Long-Tail ist gratis), aber nicht weiter verbreitern.

---

## 4. Die neue Startseite

**Ziel: Desktop von 8.853 px auf ≈ 4.400 px + Footer. Mobil von 11.400 px auf ≈ 6.800 px.**

Leitprinzip: Die Antwort in 2 Sekunden, der Grund zur Anmeldung in 15 Sekunden, der Grund zum Wiederkommen in 30 Sekunden.

---

### ① Antwort-Hero
**Desktop ≈ 620 px · Mobil ≈ 580 px**

**Zweck:** Die Leitfrage vollständig beantworten, ohne dass gescrollt oder JavaScript ausgeführt werden muss.

**Inhalt:**
- H1 als Frage (bleibt, ist die Suchanfrage)
- **Server-gerenderte Antwortkarte**: „Nein. Stand 1. August 2026, 08:16 Uhr (Europe/Berlin): Europa-Park weist Silver und Gold als ausverkauft aus."
- Zwei Status-Pills mit **echtem Wert im HTML**, nicht „Wird geprüft…"
- Zeitstempel relativ + absolut: „Zuletzt geprüft vor 4 Minuten" mit `<time datetime>` und Absolutzeit im `title`
- Streak-Zeile: „Seit 150 Tagen unverändert · 14.034 Prüfungen"
- Primär-CTA „Alarm aktivieren" + „884 Wartende" als ehrlicher Social Proof
- Sekundär: „Wie wir prüfen" → `/methodik/`
- Vier Feature-Pills (Wartezeiten · Prognose · Planen · ResortPass) — bleiben als Sprungmarken, aber grösser

**Warum hier:** Es ist die Frage im Titel. Alles andere ist nachgelagert.

**Was fliegt raus:** Der pulsierende „LIVE"-Badge über einer Abonnentenzahl (Overclaim — der Puls gehört zu echten Live-Daten), die hartcodierte `800` (echter Wert 884). Die 10,4-px-Versalien-Monozeile mit dem Prüfzeitstempel wird zu einer normal gesetzten 13-px-Zeile — es ist das zentrale Vertrauensargument und heute als unwichtigstes Element markiert.

> **Blocker:** Heute steht im ausgelieferten HTML `hero-status-silver = "Wird geprüft…"` und gleichzeitig ein für immer eingefrorenes „Nein." im FAQ-JSON-LD. Am Verkaufstag — dem einzigen Moment, der zählt — würde die Seite in AI Overviews und ChatGPT weiterhin „nicht verfügbar" ausliefern. Das ist Phase 1, siehe §8.

---

### ② Was wir wissen — und was nicht
**Desktop ≈ 400 px · Mobil ≈ 620 px**

**Zweck:** Die Frage „**wann?**" beantworten, die im Titel steht und heute nirgends beantwortet wird. Das Wort „seit" kommt im gesamten Startseiten-HTML **kein einziges Mal** vor.

**Inhalt — drei kurze, faktisch belegbare Absätze:**
1. **Dauer**: „Seit dem 4. März 2026 kein bestätigtes Verkaufsfenster — 14.034 dokumentierte Shop-Prüfungen." (Ohne „lückenlos" — die reale Abdeckung liegt bei ~97,8 %; entweder ehrlich ausweisen oder weglassen.)
2. **Muster**: Europa-Park kommuniziert keinen festen Rhythmus. Frühere Fenster nur mit belegbarer Quelle und Datum.
3. **Vorbereitung — 3-Punkte-Checkliste**: Alarm aktivieren · Konto im offiziellen Ticketshop vorab anlegen · Zahlungsmittel bereitlegen. Plus ein Satz für Bestandskunden zur Verlängerung.

**Warum hier:** Es ist die einzige neue Information nach dem Hero, es ist der stärkste Conversion-Treiber (Punkt 1 der Checkliste *ist* der CTA), und es ist genau das Format, das LLMs zitieren.

---

### ③ Alarm-Formular
**Desktop ≈ 540 px · Mobil ≈ 700 px**

**Zweck:** Conversion, direkt nachdem der Grund geliefert wurde.

**Inhalt:** E-Mail + Silver/Gold-Auswahl + Absenden. Darunter neu:
- „Wir speichern nur deine E-Mail-Adresse und die gewählten Pass-Typen. Details: **Datenschutz**" — heute steht der einzige Impressum-Link **5.350 px unterhalb** der Erhebungsstelle
- Double-Opt-In explizit: „Du bekommst zuerst eine Bestätigungs-Mail; ohne Klick darin speichern wir nichts dauerhaft"
- Social Proof am Ort der Entscheidung: „Schliess dich 884 Wartenden an"
- **Zuverlässigkeitszeile**: „1 Fehlalarm seit Trackingstart — seither prüft der Checker doppelt. → Methodik". Der Entschuldigungstext wandert von y ≈ 3.659 (also 2.800 px *nach* dem Formular) hierher, wo er wirkt.
- Erfolgs-Panel: Spam-Ordner-Hinweis + Absenderadresse (häufigster Abbruchpunkt bei Double-Opt-In)

**Warum hier:** Bei y ≈ 1.560 statt y ≈ 1.825, und mit dem Grund direkt darüber statt darunter.

---

### ④ Live jetzt im Park ← **der Wendepunkt**
**Desktop ≈ 480 px · Mobil ≈ 900 px**

**Zweck:** Hier hört die Seite auf, eine ResortPass-Seite zu sein. Heute wird `/wartezeiten/` zwischen Hero-Ende (Byte 26.600) und Footer (Byte 70.000) **kein einziges Mal** erwähnt — auf 53 % der Seite.

**Inhalt — drei Karten mit echten Werten, nicht nur Labels:**

| Karte | Geöffnet | Geschlossen |
|---|---|---|
| **Wartezeiten** | die drei kürzesten Wartezeiten als Zahlen + „Powered by ParkQueueTimes.com" | „Park geschlossen — öffnet um 09:00 (in 1 Std. 4 Min.)" |
| **Besucherprognose** | Index heute/morgen mit relativer Einordnung | dasselbe, plus 7-Tage-Vorschau |
| **Öffnungszeiten** | „heute 09:00–18:00" | „Winterpause bis 28.03. · Rulantica ist offen" |

**Warum hier:** Der „ausverkauft, schade"-Besucher hat gerade seine Antwort bekommen und ist bereit zu gehen. Das ist der Moment, ihm einen zweiten Grund zu geben.

**Lizenz-Randbedingung:** nur aggregierte Anzeige (drei kürzeste Werte), keine Feed-artige Rohdaten-Ausspielung, Attribution im selben Block.

---

### ⑤ Deinen Besuch planen
**Desktop ≈ 420 px · Mobil ≈ 760 px**

**Zweck:** Die sechs fertigen interaktiven Tools sichtbar machen, die heute von der wichtigsten Seite der Site aus **unsichtbar** sind (die Startseite enthält keinen einzigen Link auf Besuchsplaner, Kostenrechner, Familien-Finder, Rulantica-Planer, Unterkunfts- oder Restaurant-Vergleich).

**Inhalt:** Kachel-Grid mit ausgeschriebenen Namen und je einem Nutzensatz. Gruppiert: „Vor der Reise entscheiden" (Tage, Kosten, Familie) · „Vor Ort" (Rulantica, Übernachten, Essen, Öffnungszeiten).

---

### ⑥ ResortPass verstehen
**Desktop ≈ 380 px · Mobil ≈ 640 px**

**Zweck:** Die Ratgeber sauber anbinden, ohne die Antwort ein sechstes Mal zu wiederholen.

**Inhalt:** Vier Karten (Preise · Silver oder Gold · Sperrtage · Verfügbarkeits-Chronik) + vier FAQ im Akkordeon, jede mit Prüfdatum im Antwortsatz. Nur Fragen, die *nicht* auf einer Ratgeberseite in der Tiefe beantwortet werden.

**Was fliegt raus:** FAQ-Karte 02 („Ist der ResortPass aktuell verfügbar? Nein.") und die H3, die zeichengleich mit der H1 ist.

---

### ⑦ Chronik-Teaser
**Desktop ≈ 280 px · Mobil ≈ 340 px**

**Zweck:** Den einzigartigen Datensatz zeigen, ohne 21 % der Seite dafür zu verbrauchen.

**Inhalt:** Eine Headline-Zahl („Seit 150 Tagen durchgehend ausverkauft · 14.034 Prüfungen") plus ein Uptime-Balkendiagramm im Contribution-Stil — ein schmaler Balken pro Tag seit 04.03.2026: rosa = ausverkauft, grün = verfügbar, grau = unvollständige Abdeckung. Ein Satz, ein Bild, ein Link auf `/resortpass-verlauf/`.

**Warum es funktioniert:** Es wird *spannend*, sobald ein grüner Balken erscheint. Und die Zahl wächst jeden Tag — das ist echte Bewegung ohne erfundene Nachricht.

**Was fliegt raus:** Die 34-Seiten-Tabelle (20 identische Zeilen pro Blätterschritt), die zwei „0.0 %"-Kacheln (eine Rundungs-Null aus `toFixed(1)` auf 0,01 %), und das `aria-live="polite"` auf dem gesamten Verlaufs-Container, das Screenreadern bei jedem Blättern 60 identische Zellen vorliest.

---

### ⑧ Warum du uns glauben kannst
**Desktop ≈ 220 px · Mobil ≈ 380 px**

**Zweck:** E-E-A-T sichtbar machen — heute gibt es im gesamten Build **null** `sameAs`-Angaben, und „Open Source" steht zweimal auf der Startseite, während `github.com` **nirgends** verlinkt ist.

**Inhalt:** Vier kurze Belege — Kein Tracking, keine Cookies, keine Werbung · Open Source (echter GitHub-Link, MIT) · Inoffiziell, nicht mit Europa-Park verbunden · Alle Fakten mit Quelle und Prüfdatum. Link auf `/methodik/`.

---

### Mobile-Besonderheiten

- Hero-Pills als horizontaler Scroll-Snap-Streifen statt Umbruch
- Live-Karten gestapelt, Wartezeiten zuerst
- Sticky-CTA bleibt, wird aber ausgeblendet, solange das Formular im Viewport ist
- Verlaufstabelle: der Wrapper hat heute `overflow: hidden` — auf 375 px sind **64 % des Gold-Badges unsichtbar und nicht scrollbar**. Auf der Chronik-Route wird daraus unter 640 px ein Zeilen-Layout mit Punkt-Indikatoren.

---

## 5. Umgang mit „seit Monaten passiert nichts"

Das ist keine Schwäche, die man kaschiert — es *ist* die Nachricht. Fünf Mechanismen, keiner davon erfindet etwas:

**1. Streak statt Stillstand.** „Seit 150 Tagen" ist eine Zahl, die sich jeden Tag ändert. „0,0 %" ist eine Zahl, die entmutigt. Dieselben Daten, umgekehrte Wirkung. Das Uptime-Balkendiagramm macht die Dauer sichtbar und den Bruch spektakulär, wenn er kommt.

**2. Frische kommt vom Prüfen, nicht vom Ergebnis.** „Zuletzt geprüft vor 4 Minuten" ist eine Live-Information, auch wenn das Ergebnis gleich bleibt. Relativer Zeitstempel, alle 30 s neu gerechnet; ab 20 Minuten Alter wird das Band gelb.

**3. Bewegung aus ehrlichen Quellen.** Wartezeiten, Crowd-Index, Öffnungszeiten und Saisonwechsel ändern sich täglich. Genau dafür ist Block ④ da. Die Startseite bleibt lebendig, weil der Park lebendig ist — nicht weil man beim ResattPass etwas herbeischreibt.

**4. Ereignis-News statt Tages-News.** Die Sektion wird von „jeden Tag eine Meldung" auf „nur bei Ereignissen" umgestellt. Ereignisse sind: Statuswechsel, Preisänderung, offizielle Ankündigung, neue Saison, Sperrtagsliste veröffentlicht, Fehlerkorrektur. Im Ruhezustand **eine** Zeile:

> *Keine Änderung seit dem 4. März 2026 · letzte 7 Tage: 673 Prüfungen, 0 Verfügbarkeiten*

Kein leerer Kasten, kein Platzhalter, keine Karte. Der RSS-Button wird zum Textlink zurückgenommen, damit er nicht optisch mit dem Alarm-CTA konkurriert.

**5. Redaktioneller Changelog auf `/methodik/`.** „Sperrtage 2027 ergänzt, geprüft am …", „Attraktionsdaten von 6 auf 40 erweitert", „Fehlalarm-Ursache behoben". Das ist echte Aktivität, sie ist belegbar, und sie beantwortet die eigentliche Frage des skeptischen Besuchers: *Wird diese Seite noch gepflegt?*

**Was ausdrücklich nicht passiert:** keine KI-generierten Füll-Meldungen, keine „Wusstest du schon"-Trivia als Nachricht getarnt, kein Countdown auf ein Datum, das niemand angekündigt hat, keine Spekulation über den nächsten Verkaufsstart, keine als Community-Tipps getarnten Redaktionsinhalte.

**Voraussetzung für alles:** Das Prüfdatum muss stimmen. Heute steht `2026-07-29` an **39 Stellen** hart im Code (5 Konstanten + 34 Sprachstrings) und wird als `dateModified` in die strukturierten Daten aller 204 Ratgeberseiten geschrieben. Ein Aktualitätssignal, das nicht wahr ist, kippt vom Vertrauens- zum Misstrauenssignal. → Ein zentrales Datum-Modul, Datum als Interpolationsplatzhalter mit `Intl.DateTimeFormat`, `dateModified` pro Seite aus den tatsächlich verwendeten Fakt-IDs, plus ein CI-Gate: `validUntil` überschritten = Build rot, `nextReviewAt` überfällig = Warnung + sichtbarer UI-Hinweis.

---

## 6. Conversion-Pfade

### Pfad A — Alarm-Abo

```
Einstieg (Suche „resortpass verfügbar" / LLM-Antwort / Forum)
  ↓  Hero: Antwort in 2 s, Status server-gerendert
  ↓  „Was wir wissen": WARUM Warten sich lohnt + Checkliste
  ↓  Checkliste Punkt 1 = „Alarm aktivieren" → Formular direkt darunter
  ↓  Formular: Datenschutz-Link, Double-Opt-In erklärt, 884 Wartende, 1 Fehlalarm offen benannt
  ↓  Erfolgspanel: Spam-Ordner + Absenderadresse + Querverweis auf Wartezeiten
  ↓  Bestätigungs-Mail → Bestätigungsseite als zweiter Einstiegspunkt (Wartezeiten, Planer)
  ↓  Alarm-Mail: enthält Community-Token + Link auf Besuchsplaner
```

**Zweiter Einstieg für denselben Pfad:** Auf `/resortpass-silver-oder-gold/` steht heute untereinander „Silver — Derzeit nicht verfügbar" und „Rechnerisch niedrigster Betrag: Silver · 325 €" — und **kein Formular**. `type="email"` existiert in genau 17 Dateien: den Sprach-Startseiten, sonst nirgends. Der Nutzer muss auf eine andere Seite springen und dort einen Anker wiederfinden. Das ist der teuerste Abbruchpunkt der Site.

→ `SubscribeForm.astro` als wiederverwendbare Insel unter den Status-Block aller ResortPass-Ratgeber und ans Ende von `/besucherprognose/`. Kontextsensitiv: Wenn der Rechner Silver als günstigste Option ausweist und Silver ausverkauft ist, ist die Silver-Checkbox vorausgewählt und der Text lautet: *„Silver wäre für dein Besuchsmuster am günstigsten — aktuell nicht kaufbar. Wir melden uns, sobald es das wieder ist."* (Technisch: die harten IDs `#subscribe-form`, `#email`, `#benachrichtigung` müssen parametrisiert werden.)

**Später, hoher Hebel:** Web Push mit eigenen VAPID-Schlüsseln — kein Drittanbieter, kein Cookie, keine E-Mail-Adresse nötig. Bei Kontingenten, die in 60 Stunden weg sind, ist Push schneller als E-Mail und senkt gleichzeitig die Anmeldehürde. Voraussetzung: die PWA hat heute **keinen** Service Worker und kein 192/512-PNG-Icon — ohne beides ist Web Push auf iOS gar nicht möglich.

### Pfad B — Besucher ohne ResortPass-Interesse

Ziel ist hier **nicht** das Abo. Ziel ist: Wiederkehr + eine Seite tiefer.

```
Einstieg (Suche „Europa-Park Wartezeiten heute" / „wann am wenigsten los")
  ↓  Sofortiger Nutzen über der Falz (heute erste Zahl erst bei y = 1.553 auf Mobil)
  ↓  Grund zum Bleiben: „Was fahre ich jetzt?" — die offene Flanke der ganzen Branche
  ↓  Grund zur Wiederkehr: Favoriten in localStorage (kein Tracking, kein Konto)
  ↓  Grund für die zweite Seite: Prognose-Streifen, Besuchsplaner mit vorbefülltem Datum
  ↓  Dauerhafte Bindung: iCal-Abo (Saison/Öffnungszeiten) + RSS
  ↓  Weicher ResortPass-Kontakt: EINE ehrliche Zeile am Seitenende
```

Die weiche Zeile: *„Du kommst öfter? Der ResortPass rechnet sich rechnerisch ab 6 Besuchen — aktuell ausverkauft."* Verlinkt auf den **Rechner**, nicht auf das Formular. Wer rechnet, entscheidet sich selbst für den Alarm.

**Der iCal-Feed ist unterschätzt.** Ein abonnierter Kalender bindet dauerhaft, ohne ein einziges Tracking-Pixel, und niemand im Umfeld bietet ihn an. Drei Feeds: Saison/Öffnungszeiten, Veranstaltungen (Halloween 26.09.–01.11., HALLOWinter 02.–27.11., Winterzauber 28.11.–09.01., geschlossen 24./25.12.), Schulferien der eigenen Region. Ein Hono-Handler, `server/feed.ts` als Vorlage.

**Was diesen Pfad heute blockiert:** `/wartezeiten/` hat 526 sichtbare Wörter und **keine einzige Attraktion im ausgelieferten HTML**. Kein LLM kann die Seite je für „Wie lange ist die Wartezeit bei Voltron?" zitieren, weil im abrufbaren Dokument nichts steht ausser „Aktiviere JavaScript". Und die vier FAQ-Antworten verweisen alle auf UI-Elemente („Suche in der Live-Liste nach Voltron"), treffen also keine Aussage. Das ist Phase 1 und 2.

---

## 7. Leere Zustände

| Zustand | Heute | Neu |
|---|---|---|
| **Community ohne Tipps** | 443 px „Noch keine Tipps — sei der Erste!" + CTA, dessen Token-Bedingung erst nach dem Klick sichtbar wird | Sektion **nicht rendern** unter 3 freigegebenen Tipps. Der Platz geht an den Vorbereitungs-Block. Wenn sie bleibt: Bedingung an den Button („Tipp teilen — Link kommt per Alarm-Mail") und der bereits vorhandene Rückweg auf `/#benachrichtigung` prominenter. |
| **Keine News** | 3 fast wortgleiche Auto-Meldungen, 1.211 px | Eine Zeile mit Streak + letztem echten Ereignis mit Datum. Nie ein leerer Kasten, nie ein Fake-Eintrag. |
| **Park nachts geschlossen** (≈ 15 von 24 Std.) | „Geöffnet 0 Bahnen · Durchschnitt — · Längste —" + 36 graue Zeilen, davon 26 mit **„In Wartung"** | Vollwertiger Geschlossen-Zustand: Countdown „öffnet in 1 Std. 4 Min.", drei Kacheln umgewidmet (Öffnet / Schliesst / Andrang heute), 7-Tage-Vorschau mit Öffnungszeiten + Andrangsbalken, „Was du jetzt tun kannst". Die Attraktionsliste bleibt als **Verzeichnis** (Name + Themenbereich) — das ist die Substanz für Nutzer und Crawler. |
| **Winterpause** (≈ Jan–Mär) | derselbe leere Zustand über Wochen | „Winterpause bis 28.03.2027 · Rulantica ist geöffnet" + Countdown + Umschaltung der Startseiten-Navigation auf Planung und ResortPass. |
| **Fetch schlägt fehl / kein Netz** | Fehlerblock, Platzhalterliste bleibt stehen | Letzten bekannten Stand zeigen mit sichtbarem Banner „Kein Netz — Stand 14:12". Im Park ist das der Normalfall, nicht die Ausnahme. |
| **Prognose ohne Spreizung** | 4-Stufen-Skala, reale Werte 43–54, zwei Legendenstufen tot, 50 vs. 51 kippt die Farbe | Absolutwert und Rohstufe beibehalten (Lizenz), plus relative Einordnung: „43 — ruhigster Tag im sichtbaren Zeitraum" mit auf min/max normiertem Balken. Nicht vorkommende Legendenstufen ausgrauen. Methodik-Block: „Im verfügbaren Zeitraum liegen alle Tage zwischen 43 und 54." |

**Die wichtigste Regel:** „In Wartung" für 26 von 36 Bahnen an einem 1. August ist betrieblich unmöglich und wird trotzdem als Tatsache ausgegeben. Ein Statuswert wird nur dann als Ursachen-Aussage gerendert, wenn er belastbar ist — ausserhalb der Öffnungszeiten (aus `/api/crowd-calendar` bekannt) gibt es **keinen** Einzelstatus, nur „Heute ab 09:00". Zusätzlich eine serverseitige Plausibilitätsbremse: melden > 60 % aller Bahnen gleichzeitig REFURBISHMENT, zeigt der Client „Der Park meldet aktuell noch keine Betriebsdaten".

---

## 8. Migrationsplan

### Phase 0 — Fundament (1–2 Tage) · blockiert alles andere

- Laufende Caddy-Konfiguration vom Server ziehen, mit `deploy/Caddyfile` diffen, Repo-Version ausrollen
- `handle_errors 404 { rewrite /404.html; file_server { status {err.status_code} } }` — ohne den `status`-Parameter antwortet Caddy weiterhin mit 200
- Post-Deploy-Smoke-Test als Bun-Skript: `/gibtsnicht/` → 404, `/wartezeiten` → 308, `/wartezeiten/index.html` → 308, Apex → 301, robots.txt-Blöcke vorhanden, `llms.txt` frei von `{...}`-Platzhaltern
- Zentrales `checkedAt`-Modul, `{year}`-Bug in `llms.txt` (17 Vorkommen live)

**Risiko:** Die produktive Caddy-Instanz entspricht nachweislich nicht dem Repo — jede erfundene URL liefert HTTP 200 mit der deutschen Startseite und identischem ETag. Ein Ausrollen kann das Routing brechen. **Mitigation:** aktuelle laufende Config vorher sichern, Wartungsfenster, Rollback vorbereitet.

**Warum zuerst:** Solange jede URL 200 liefert, lässt sich kein einziger Redirect verifizieren. Und der Build-Verifier (1.509 Zeilen, **kein einziger `fetch()`**) kann Laufzeitverhalten strukturell nicht sehen.

---

### Phase 1 — Wahrheit im HTML (3–5 Tage) · höchste inhaltliche Priorität

- ResortPass-Status zur Build-Zeit aus `/api/status` in Hero-Pills, Status-Karten, `info.why_text` und FAQ-JSON-LD rendern, inkl. `dateModified` und sichtbarem „Stand"
- Rebuild-Trigger bei Statuswechsel + täglicher Rebuild; Client-Fetch bleibt als Live-Korrektur
- FAQ-Antwort wechselfest formulieren
- `/wartezeiten/`: Attraktions-**Stammdaten** (Name, Themenbereich, Anker) server-gerendert als initiale Liste; Client ersetzt per `replaceChildren()`
- `/besucherprognose/`: Tagesliste server-gerendert
- Geschlossen-Zustand + Plausibilitätsbremse (Ende der Falschmeldung „In Wartung")

**Risiko A — Verkaufsstart mitten in der Migration.** Das ist der einzige Moment, für den die Seite existiert. Deshalb steht Phase 1 vorne: Heute würde ein Verkaufsstart in AI Overviews und ChatGPT weiterhin „Nein, nicht verfügbar" ausliefern. **Regel für alle Phasen:** Die Alert-Pipeline (Checker → Mail) wird nie angefasst; nach jedem Deploy wird sie getestet.

**Risiko B — Build-Time-Fetch fällt aus.** Der Build darf nicht brechen. Fallback auf einen zuletzt bekannten Statuswert im Repo.

**Risiko C — eingefrorene Minutenwerte.** Wartezeiten in Minuten werden **nicht** server-gerendert. Nur Stammdaten + ein Zusammenfassungssatz mit Zeitstempel. Ein eingefrorener Wert im HTML wird zwischen zwei Rebuilds nachweislich falsch — Aktualitäts- *und* Lizenzrisiko.

---

### Phase 2 — Neue Startseite (3–4 Tage)

Reihenfolge umstellen, Blöcke ①–⑧ bauen, Streichungen durchführen, Formular aufwerten.

**Risiko:** 17 Sprachen × neue Strings. **Mitigation:** DE zuerst vollständig, dann eine Übersetzungscharge. Das Typsystem erzwingt Schlüsselparität — eine fehlende Übersetzung bricht den Build. Das ist hier ein Vorteil.

**Nicht in derselben Woche wie Phase 3.** Sonst ist ein Traffic-Einbruch nicht zuzuordnen.

---

### Phase 3 — Struktur & Redirects (2–3 Tage) · höchstes Ranking-Risiko

- Neue Routen: `/resortpass-verlauf/`, `/methodik/`, `/oeffnungszeiten/`
- Zusammenlegung Reservierung + Rulantica → Guide, mit 301
- Slug-Korrekturen en/fr/it (Wartezeiten + Impressum), hebräische Slugs
- Header/Footer/Breadcrumbs, `x-default` → en
- Sitemap `lastmod` aus echten Änderungsdaten (heute 272 `<loc>`, **0** `<lastmod>`), `llms.txt` neu generieren

**Regeln:** 301 dauerhaft und nie zurücknehmen (die alten Pfade stehen in `llms.txt` und in bereits erfolgten LLM-Zitaten). Alte Pfade nie neu vergeben. Jeder Redirect als **ein** Hop verifizieren (Wechselwirkung mit den 308-Trailing-Slash-Regeln prüfen). GSC-Abdeckung vier Wochen beobachten.

---

### Phase 4 — Wartezeiten-Erlebnis (5–8 Tage)

Zeilenlayout mit Balken zusätzlich zur bestehenden Farbstufe, Gruppierung nach Themenbereich (`ride.land` liegt bereits vor), Favoriten in localStorage, Sticky-Toolbar-Offset, Fokusring-Clipping (`overflow: hidden` schneidet den Ring der Filter-Buttons vollständig weg — SC 2.4.7, Level AA), Headliner-Streifen, Refresh bei `visibilitychange`, Badge-Wortbruch („Geschloss/en"), Mobile-Fold.

**Lizenz-Randbedingung, hart:** Balken bilden nur den **aktuellen** Wert ab. Trend, Historie, Heatmap, Tagesverlauf, „typischerweise 60 Min um 14 Uhr", `ItemList`/`Dataset` über Minutenwerte — alles erst nach **schriftlicher** Freigabe durch ParkQueueTimes (AGB §5/§6/§8: keine Weiterverteilung, keine abgeleiteten Dienste). Die Anfrage jetzt stellen, sie ist der Schlüssel zum stärksten Differenzierer der Seite.

**Sofort und unabhängig zu klären:** `/api/wait-times` und `/api/crowd-calendar` sind heute öffentlich und ohne Schlüssel abrufbar — das ist faktisch Weitergabe roher Daten. Bis zur Freigabe per Origin-Prüfung oder Rate-Limit auf die eigene Site beschränken. Und prüfen, ob der Server den inzwischen nötigen `x-api-key` mitsendet, sonst droht ein stiller Ausfall.

---

### Phase 5 — Substanz (laufend, priorisiert)

1. **Silver-Sperrtage-Kalender** — besetzt ein Kernthema zurück, das ein Wettbewerber hält
2. **Attraktionsdaten 6 → 40+** (Mindestgrösse, -alter, Begleitung, Barrierefreiheit, mit `sourceUrl`/`checkedAt`) — Voraussetzung für alles Weitere
3. **Anreise & Parken** mit Schweiz-Sektion
4. **Attraktions-Detailseiten** — erst nach 2., sonst Thin Content
5. **Ausverkauft-Kalender für Tagestickets** — der grösste unbesetzte USP (`checkAvailabilityUrl` im Mack-Shop existiert und antwortet als JSON). **Vorher schriftlich bei MackInternational anfragen** — der Shop hat keine offene API-Lizenz.

---

### Übergreifende Risiken

| Risiko | Mitigation |
|---|---|
| Verkaufsfenster während der Migration | Alert-Pipeline unangetastet, nach jedem Deploy getestet; Phase 1 zuerst |
| Einzelbetreiber × 17 Sprachen | Zwei-Stufen-Sprachpolitik; neue Routen nur Tier 1 |
| Ranking-Einbruch durch Slug-Umzug | Phase 3 isoliert deployen, 301 dauerhaft, 4 Wochen GSC beobachten |
| ParkQueueTimes-Lizenz | Anfrage vor Phase 4; bis dahin keine Historie, kein Trend, keine öffentlichen Rohdaten-Endpunkte |
| Überbau vor Datenbasis | Keine Detailseiten vor dem Datensatz, keine Prognose-Features auf 6 Attraktionen |

---

## Was bewusst *nicht* gebaut wird

- **Kein Domainwechsel** vor 6 Monaten Search-Console-Daten.
- **Kein `de-CH` → `de-DE`** — nachweislich ohne Google-Effekt und bricht die Systematik der anderen 14 Sprachen.
- **Keine native App** — der Store ist besetzt (EPbuddy, ParkPing, coaster.cloud). Stattdessen PWA + Web Push.
- **Kein Wettrennen um Wartezeiten-Rohdaten.** „Europa-Park Wartezeiten" ist gegen 14 Anbieter auf Jahre nicht frontal gewinnbar. Gewonnen wird über: Sprache (fr/nl/it, wo das Feld dünn ist), Kontext (Wartezeit + Prognose + Öffnungszeiten in *einer* Antwort) und Entscheidung („Was fahre ich jetzt?" statt „So lang ist die Schlange").
- **Kein `HowTo`-Schema** — Google hat die Rich Results 2023 abgeschaltet.
- **Keine weiteren Schema-Typen in der Hoffnung auf Zitate.** Die beste kontrollierte Studie zeigt für JSON-LD Effekte im Rauschen, bei AI Overviews sogar −4,6 %. Die vorhandenen 714 JSON-LD-Blöcke reichen; investiert wird in sichtbaren Fliesstext.
- **Kein weiterer Ausbau von `llms.txt`.** Kein grosser Anbieter wertet sie nachweislich aus, Google sagt es explizit. Behalten (kostet nichts), Bug fixen, nicht als Strategie führen.
- **Keine Gutschein-, Deal- oder Affiliate-Inhalte.** Die Neutralität ist genau das, was LLMs bei Preisfragen bevorzugt zitieren.