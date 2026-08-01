## Mängelliste zu den drei Konzepten

Legende: **[geprüft]** = von mir im Repo verifiziert, **[abgeleitet]** = Schluss aus den vorliegenden Materialien.

---

### 1. Der grösste blinde Fleck: es gibt keine Build- und Deploy-Pipeline

**[geprüft]** Kein `.github/workflows`, kein Deploy-Skript ausser `deploy/setup.sh` („assumes rsync from local"), `dist/` ist gitignored, `docker-compose.yml` mountet `./dist:/app/dist` als Volume. Deployment ist manuell.

Trotzdem setzen zwei Konzepte einen automatisierten Rebuild als Fundament voraus:
- Konzept 2, Phase 1: „Rebuild-Trigger bei Statuswechsel + täglicher Rebuild"
- Konzept 3, §2.3 Punkt 3: derselbe Trigger, plus Punkt 5 „täglicher Rebuild reicht"

Das ist keine Zeile Code, sondern eine eigene Infrastrukturaufgabe: Build-Runner, Toolchain in Produktion, atomarer Swap des `dist`-Verzeichnisses, Rollback, Fehlerpfad wenn `/api/status` beim Build nicht antwortet. **In keinem der drei Konzepte taucht sie als Aufgabe, Aufwand oder Risiko auf.** Die Hälfte aller P0/P1-Vorschläge hängt daran.

Zusatz **[geprüft]**: Der API-Container hat 256 MB / 0,5 CPU. Ein täglicher Vollbuild von 324 Seiten läuft dort nicht — es braucht einen zweiten Ort für den Build und einen Transfermechanismus. Ungeklärt.

### 2. Die billigste Lösung für den P0-Befund wird von allen drei übersehen

**[geprüft]** `server/checker.ts:222/231` schreibt alle 15 Minuten nach `STATUS_JSON_PATH = /app/dist/api/status.json` — also in genau das Verzeichnis, das Caddy statisch ausliefert. `deploy/Caddyfile` hat dafür bereits einen Cache-Header (`@status path /api/status.json`).

Der Mechanismus „Prozess schreibt Datei in den ausgelieferten Baum" existiert also seit Beginn. Der Status liesse sich als HTML-Fragment vom selben Checker schreiben — ohne Rebuild-Pipeline, ohne Caddy-Templates, ohne SSR. **Kein Konzept erwähnt `status.json` mit einem Wort.** Stattdessen wird die teuerste (Rebuild) und die riskanteste (Caddy-Include, Konzept 1 Stufe B / Konzept 3 Option C) Variante vorgeschlagen.

### 3. Caddy gehört nicht zum Deployment dieses Projekts

**[geprüft]** `docker-compose.yml` enthält keinen Caddy-Service; das Netzwerk `caddy-net` ist als `external` deklariert. Die laufende Caddy-Instanz ist ein geteilter Reverse Proxy ausserhalb dieses Projekts und bedient mutmasslich weitere Sites auf demselben VPS.

Alle drei Konzepte behandeln „Repo-Caddyfile ausrollen + `caddy reload`" als S-Aufwand-Tagesaufgabe (K3 §1.1 „Tag 1", K2 Phase 0, K1 Phase 8). Konzept 2 nennt immerhin ein Risiko, aber nicht den Grund. Ungeklärt bleibt: Ist `deploy/Caddyfile` überhaupt die Quelle der aktiven Konfiguration? Wer schreibt sie sonst? Was macht ein Reload mit den anderen Sites? Solange das offen ist, ist der P0-Blocker (Soft-404) **nicht** ein S-Ticket, und alle davon abhängigen Redirect-Massnahmen sind nicht terminierbar.

### 4. Der Fehlalarm-Befund ist falsch — und dahinter steckt ein ungeklärter Datenpunkt

**[geprüft]** `server/db.ts` enthält:
```
export const FALSE_POSITIVE_AVAILABLE_DATE = '2026-03-19';
const VALID_AVAILABLE_SQL = `available = 1 AND date(checked_at) <> '${FALSE_POSITIVE_AVAILABLE_DATE}'`;
```
mit dem Kommentar, dass jede `available = 1`-Zeile dieses Tages aus der bekannten Schutzseiten-Fehlmeldung stammt.

Konzept 2 behauptet: „Die kursierende Erzählung ‚Fehlalarm vom 19. März' ist **nicht belegt**". Das ist falsch — der Beleg steht im Code, nur nicht in `/api/history/silver`, weil die Aggregate ihn ausschliessen.

**Die eigentliche Konsequenz wiegt schwerer:** Wenn die Aggregate den 19.03. bereits herausrechnen und trotzdem `availableChecks: 1` im Juni 2026 melden, existiert ein **zweiter, bisher völlig unerklärter** Verfügbarkeitstreffer. Konzept 3 will exakt diesen Datenpunkt als Fakt veröffentlichen — in FAQ-JSON-LD („genau einmal als kaufbar gemeldet (Juni 2026)") und im `Dataset`-Markup der geplanten Chronik-Route. Damit würde ein möglicherweise zweiter Fehlalarm zur zitierfähigen Primärquelle erhoben, auf der Seite, deren gesamter Wert Ehrlichkeit ist. **Vor jeder Publikation: diesen einen Datensatz forensisch klären (Zeitstempel, HTTP-Response, Alert ausgelöst ja/nein).** Das ist der schwerwiegendste inhaltliche Fehler im ganzen Paket.

---

### 5. Widersprüche zwischen den Konzepten

| # | Widerspruch | Wer sagt was |
|---|---|---|
| 5.1 | **Positionierung vs. Investition.** K2 entscheidet „Europa-Park-Begleiter, Wartezeiten sind der Wiederkehrgrund" und rechtfertigt damit K1s 16–22 Personentage. K3 sagt gleichzeitig, der Wartezeiten-Term sei „nicht frontal gewinnbar" und legt die drei Erfolgsachsen auf ResortPass-Daten, Sprachen, Crawler-Zugang — keine davon ist Wartezeiten. | Niemand löst das auf. Es fehlt der Satz: „Wartezeiten sind ein Retention-Feature ohne Akquisitionsanspruch" — dann reicht ein Bruchteil des Umfangs. |
| 5.2 | **iCal-Export.** K1 listet „`.ics`-Export von Öffnungszeiten aus dem PQT-Payload" ausdrücklich unter *Nicht anfassen*. K2 nennt denselben Feed „unterschätzt", „bindet dauerhaft" und plant drei davon. | K2 ist auf der falschen Seite: Öffnungszeiten kommen aus `/api/crowd-calendar` = ParkQueueTimes. Ein iCal-Feed ist definitionsgemäss maschinenlesbare Weiterverteilung. |
| 5.3 | **Trendpfeil.** K1: „Priorität 3, umsetzen, lizenzlich unkritisch". K3 §2.5 führt „eigene Speicherung für Trendpfeil" als eine der fünf offenen Lizenzfragen und verbietet ihn bis zur Antwort. | K1 argumentiert mit Flüchtigkeit — baut aber gleichzeitig einen **serverseitigen** Ringpuffer für den REFURBISHMENT-Guard, also genau die Grenze, die es beim Trendpfeil zieht. |
| 5.4 | **Zwei Slugs für dieselbe Route.** K2: `/resortpass-verlauf/`. K3: `/verfuegbarkeits-verlauf/` — und schreibt die URL bereits hart in den FAQ-JSON-LD-Vorschlag. Gleiches Muster bei `/methodik/` (K2) vs. `/ueber-uns/` (K3, als `Person.url` im Entity-Graph). | Beide fordern zugleich „301 dauerhaft, nie zurücknehmen". Wer beides umsetzt, produziert genau den Redirect-Wildwuchs, den er verhindern will — und einen toten `Person.url`. |
| 5.5 | **FR-Slug.** K1/K2: `/fr/temps-d-attente/`. K3 §10.4: `/fr/temps-attente/`. | Ein Zeichen Differenz auf einem permanenten 301-Ziel. |
| 5.6 | **llms.txt.** K3 §6.3: „keine weitere Zeit investieren" — fordert aber in §6.2 einen kompletten Umbau beider Dateien. K1 will llms.txt „um Attraktionsinventar, Bereiche und Öffnungszeiten erweitern". | K1 macht genau das, was K3 ablehnt. |
| 5.7 | **K3 widerspricht sich selbst.** §10.3: Tier 2 (12 Sprachen) bekommt „neue Feature-Routen **bewusst nicht**". §7.1/7.2: `/verfuegbarkeits-verlauf/` und `/methodik/` „17 Sprachen, Aufwand M". | Zwei Kapitel derselben Datei, gegenläufige Regel. |

---

### 6. Randbedingungen, die verletzt oder unterschätzt werden

**6.1 Öffentliche `/api/*`-Endpunkte werden vergrössert statt geschlossen.** Alle drei erkennen, dass `/api/wait-times` und `/api/crowd-calendar` faktisch Rohdaten-Weitergabe sind. Alle drei verschieben den Fix auf „Woche 1 / Tag 4". Gleichzeitig fordern K1 (`/api/park-now`) und K3 (`/api/wartezeiten-fragment`) **neue** öffentliche PQT-Endpunkte. K1s `park-now` bündelt sogar Wartezeiten **und** 7-Tage-Crowd-Kalender **und** Öffnungszeiten in einem einzigen, ungeschützten JSON — der lizenzkritischste Payload der Site in einer Response.

**6.2 Kein-Tracking-Versprechen vs. veröffentlichte Log-Auswertung.** K3 §9 will Caddy-Access-Logs täglich aggregieren, Bots über publizierte IP-Listen verifizieren und das Ergebnis öffentlich machen. Access-Logs enthalten IPs; **[geprüft]** die Log-Rotation im Caddyfile rollt nach Grösse (`roll_size 10MiB, roll_keep 3`), nicht nach Aufbewahrungsfrist. Kein Konzept fasst die Datenschutzerklärung an — obwohl zusätzlich Favoriten in localStorage, Service Worker, Web Push (VAPID) und URL-State geplant sind.

**6.3 Web Push wird zweimal empfohlen, die harte iOS-Bedingung nirgends genannt.** Auf iOS funktioniert Web Push nur nach Homescreen-Installation. Für ein Ereignis, das einmal jährlich für ~60 Stunden eintritt, ist „Nutzer installiert Monate im Voraus" nahe null. Push ersetzt die E-Mail nicht, es ist ein zweiter Kanal mit eigener Fehlerquelle (Subscription-Ablauf, Key-Rotation) — Betriebsaufwand wird nirgends gegen den Nutzen gerechnet.

**6.4 Stufe B / Caddy-Include bricht am Deploy-Modell.** **[geprüft]** `dist` ist ein gemountetes Volume, das per rsync ersetzt wird. K1 will „Bun liest `dist/<pfad>/index.html` einmal beim Start ein" — nach jedem Deploy liefert der Server dann veraltetes HTML, bis der Container neu gestartet wird. Kein Restart-Hook vorgesehen.

**6.5 Astro-Stack-Kopplung übersehen.** Wenn `EUROPA_PARK_RIDE_LANDS` nach `src/data/rides.ts` wandert (K1 Stufe A, K3 §2.3), ist dieselbe Datei Build-Input **und** Server-Allowlist. Eine umbenannte Attraktion erfordert danach einen **Rebuild**, nicht nur einen Serverneustart — die Datenpflege wird an die nicht existierende Pipeline gekoppelt.

---

### 7. Fehlende Datenquellen für versprochene Features

**7.1 Der Winterpause-Zustand hat keine Datengrundlage.** K1 baut `SEASON_BREAK` mit „Saisonstart 27.03.2027" und Tages-Countdown und nennt ihn den Zustand mit dem grössten Gewinn (wochenlang aktiv). `/api/crowd-calendar` liefert 31 Tage. In der Winterpause liegt der Saisonstart 60–80 Tage voraus — **ausserhalb des Fensters**. Das Datum muss redaktionell gepflegt werden, jedes Jahr, in 17 Sprachen. Nicht als Pflegeaufgabe ausgewiesen.

**7.2 „Rulantica ganzjährig offen"** wird in K1s Winterpause-Zustand als Fakt gerendert. Rulantica hat eigene Wartungsschliessungen; **[geprüft]** die Allowlist filtert Rulantica bewusst aus dem Feed. Kein Beleg, keine Quelle, kein `checkedAt`.

**7.3 `numberOfItems: 36`** (K3 §3.3) ist ein hartkodierter Wert in strukturierten Daten. K1 erkennt an anderer Stelle selbst, dass die Bahnenzahl saisonal schwankt. Genau der Fehlertyp, den beide Konzepte sonst anprangern.

**7.4 `logo-512.png`** im Entity-Graph (K3 §3.1) existiert nicht — das Perf-Audit belegt nur `favicon.svg` + 180-px-Apple-Touch-Icon. K1 plant die Icons erst in Phase 7, K3 will den Graph in Woche 1.

---

### 8. Ganze Bereiche, die in keinem Konzept vorkommen

1. **Designsystem.** Die P0/P1-Befunde des Design-Audits — `DMSans-Bold.woff2` byte-identisch mit Regular (alle Gewichte > 700 werden auf 700 geklemmt), keine Radius-/Spacing-/Elevation-Tokens, 55 `font-size`-Werte, drei H1-Skalen, Ratgeberseiten als zweites Designsystem mit eigenem Footer — kommen in keinem Konzept vor. **K1 definiert stattdessen fünf neue Farbtokens (`--wait-l0..l4`) obendrauf.** Nach Umsetzung aller drei Konzepte ist der Wildwuchs grösser, nicht kleiner. Es fehlt ein viertes Konzept „Tokens/Designsystem" — und es ist die Voraussetzung für Dark Mode und für K1s Farbskala.
2. **Performance.** Der teuerste Einzelposten (406 KB Übersetzungsbundle, blockiert fünf Startseiten-API-Calls) taucht nirgends auf. K2 baut die Startseite komplett um, ohne den einen Blocker zu entfernen, der auf genau dieser Seite sitzt. Ebenso unbehandelt: kein Brotli, 2,4 MB OG-PNGs, 56 KB Fremd-CSS auf 14 Sprach-Startseiten, JetBrains Mono als `.woff`.
3. **Barrierefreiheit ausserhalb der Wartezeiten.** K1 nimmt drei A11y-Fixes mit. Nicht adressiert: Label-in-Name in **sieben** Locales (SC 2.5.3, **Level A**, Hauptnavigation, inkl. EN/FR/IT), `aria-live`-Fluten in fünf Planungs-Tools, Fokusverlust bei Zustandswechsel, RTL-Reste, doppelte Landmark-Namen.
4. **Die Alert-Pipeline selbst.** Sie ist das Produkt. Kein Konzept fragt: Hält der selbst gehostete Mailversand (**[geprüft]** eigener MX, SPF/DMARC in `setup.sh`) 884+ Adressen in dem Zeitfenster aus, in dem das Kontingent weg ist? Wie lange dauert ein Vollversand? Was passiert bei Bounces und Greylisting? Gibt es eine Testroutine? K2 sagt nur „nie anfassen, nach jedem Deploy testen" — das ist eine Regel, kein Konzept. **Der einzige Moment, für den die Seite existiert, ist der einzige, der nicht durchgeplant ist.**
5. **Monitoring.** K1 erweitert `/api/health` um `matchedRides` und will bei Unterschreitung 503 setzen, „damit das bestehende Monitoring anschlägt". Es gibt kein belegtes Monitoring, das den Endpunkt abfragt.

---

### 9. Aufwand ohne belegten Nutzen

- **K1 Phase 9, Drei-Spalten-Desktop (1–2 Tage)** für eine Seite, deren erklärte Hauptnutzung „im Park, eine Hand, Sonne" ist. Der genannte Zweck (interne Verlinkung) ist mit einem Streifen unter der Liste erledigt.
- **K1 „Park-Puls", 17 Bereichskacheln (M).** Die geprüften Findings zeigen: die Bereichssuche **funktioniert bereits**, sie ist nur unentdeckbar. Der belegte Fix ist ein geänderter Placeholder plus Filterchips (S). Die Kachelmatrix ist die teure Variante desselben Nutzens.
- **K1 Service Worker + PWA-Manifest (Phase 7).** Auf einer Site mit gehashten Astro-Assets, 17 Sprachen und 324 Seiten ist ein SW eine dauerhafte Fehlerquelle (Cache-Invalidierung nach jedem rsync-Deploy). Der Nutzen („schlechtes Netz im Park") ist nicht gemessen. `stale-while-revalidate` + der ohnehin geforderte ETag liefert 80 % davon ohne neue Laufzeit.
- **K3 Product/Offer + ItemList.** K3 §3.0 belegt selbst: Schema-Effekte liegen im Rauschen, Google dokumentiert „no special schema.org structured data". Dann baut es vier neue Markup-Blöcke. Konsequent wären nur Organization/Person/`sameAs` (Entitätsauflösung, billig) und `Dataset` auf der eigenen Chronik.
- **K2 Uptime-Balkendiagramm über 150+ Tage** — 150 identisch rosa Balken. Der Satz „seit 150 Tagen, 14.034 Prüfungen" leistet dasselbe für 5 Minuten Aufwand.
- **K1 `ride-names.ts` mit `sourceUrl`/`checkedAt`/`nextReviewAt` pro Attraktionsname.** Ein deutscher Attraktionsname ist kein Fakt mit Verfallsdatum. 36 Einträge in einen Review-Zyklus zu hängen ist reine Pflegelast.

---

### 10. Übersehene Reihenfolge-Abhängigkeiten

1. **`lastmod` vor `checkedAt`-Dezentralisierung.** K3 setzt Sitemap-`lastmod` auf Woche 1 (#4) und die `checkedAt`-Dezentralisierung auf Woche 4 (#14) — verlangt aber, `lastmod` aus dem jüngsten verwendeten `checkedAt` abzuleiten. In Woche 1 existiert das nicht. Also entweder Build-Datum (was K3 selbst als schädlich bezeichnet) oder gar nichts.
2. **Product/Offer mit `availability` vor dem Status-im-HTML-Fix.** Ohne den Fix wäre `OutOfStock` hartkodiert und am Verkaufstag falsch — im maschinenlesbaren Markup. K3 listet beides in derselben Woche, ohne Reihenfolge.
3. **URL-State vor Soft-404-Fix.** K1 bewirbt `?land=iceland` und `#silver-star` als teilbare Links. Solange jede URL HTTP 200 liefert, erzeugt jeder externe Link auf eine Parameter-URL zusätzliche Crawl-Pfade. Als Vorbedingung nirgends genannt.
4. **PQT-Lizenzbrief blockiert ~8–10 Personentage** (K1 Phase 10/11, K3 Stufe B, Teile von K2 Phase 4). Alle drei fordern ihn, **keiner formuliert ihn**. Fällt die Antwort negativ aus, ist die gesamte Reihenfolge falsch geplant — der Brief gehört auf Tag 1, nicht in „Woche 0" als Nebensatz.
5. **Search-Console-Baseline.** K2 macht die Domainentscheidung und K3 die Sprachen-Hochstufung davon abhängig. Niemand prüft, ob eine verifizierte Property überhaupt existiert. Falls nicht, verschiebt sich die Baseline um die Datensammlungsdauer — und mit ihr zwei strategische Entscheidungen.

---

### 11. Betrieb und Wartbarkeit: nein, so nicht für eine Person

**Aufwandssumme.** K1 nennt 16–22 PT bis Phase 9 (ohne 10/11). K2 nennt 14–22 Tage für Phase 0–4 plus „laufend". K3 nennt 16 Massnahmen über zwei Monate. Die Überschneidung ist erheblich, aber nicht deckungsgleich — konsolidiert **[abgeleitet]** eher 35–50 Personentage, plus Übersetzung jeder neuen Route. K2 plant 4 neue Routen (= 68 Seiten bei 17 Sprachen), K3 acht Content-Stücke (bis 136 Seiten). Das ist ein Jahresprogramm, präsentiert als Wochenplan. **Kein Konzept enthält ein „Wenn nur 5 Tage da sind"-Szenario oder eine Abbruchlinie.**

**Neue dauerhafte Pflichten, nirgends beziffert:**
`rides.ts` + `ride-names.ts` (36 Einträge), `attractions.ts` 6 → 40+ mit Review-Daten, Saison-/Winterpausendaten (kein Feed), Sperrtage, Preis-Chronik, Incident-Log, Changelog — **plus** K3 §9.1 Punkt 4: 30–50 Prompts, monatlich, in fünf Modellen, in mindestens vier Sprachen. Das sind realistisch 2–4 Stunden pro Monat manuelle Arbeit, dauerhaft, ohne Ende.

**Das CI-Gate ist ein Selbstblockade-Mechanismus.** K2 fordert: „`validUntil` überschritten = Build rot". **[geprüft]** 19 Fakten haben `nextReviewAt: 2026-08-15` — in zwei Wochen. Wenn das Gate nicht sauber zwischen *blockierend* (`validUntil`) und *warnend* (`nextReviewAt`) trennt, ist die Seite ab einem Stichtag nicht mehr deploybar, bis jemand Preise prüft. Für ein Nebenprojekt heisst das: eine Urlaubswoche legt das Deployment lahm.

**Kein Rollback-Konzept.** Bei 301-Redirects, die laut allen drei Konzepten „nie zurückgenommen" werden dürfen, bei einer Caddy-Instanz ausserhalb des Deployments und ohne Pipeline gibt es keinen definierten Weg zurück. Kein Konzept beschreibt einen.

**Keine Freeze-Regel.** Alle drei terminieren in Wochen ab dem 01.08.2026. Der Verkaufsstart ist unvorhersehbar — K2 stellt selbst fest, dass die letzten Fenster in der Winterpause lagen. K2s Phase 2 (Startseite komplett neu, 17 Sprachen, 3–4 Tage) kann damit exakt in das einzige kritische Fenster fallen. Es fehlt: „Ab dem ersten `available`-Signal keine Deploys ausser Hotfix, und die Alert-Pipeline wird vor jedem Deploy end-to-end getestet."

---

### 12. Kürzeste Konsequenz

Vor jedem Zeilenwechsel im Code sind vier Dinge zu klären, die in keinem Konzept stehen:

1. **Wie kommt ein Build auf den Server?** Ohne Antwort sind K2 Phase 1 und K3 §2.3 nicht umsetzbar.
2. **Wer besitzt die laufende Caddy-Konfiguration?** Ohne Antwort ist der einzige echte P0 (Soft-404) nicht terminierbar.
3. **Was ist der `available`-Treffer im Juni 2026?** Ohne Antwort darf die Chronik-Route nicht publiziert werden.
4. **Was sagt ParkQueueTimes?** Ohne Antwort sind ~8–10 Personentage der Planung Spekulation.

Und ein Vorschlag, der in keinem Konzept steht, aber alle drei entlastet: den **Checker** ein Status-Fragment nach `dist/` schreiben lassen, so wie er es mit `status.json` bereits tut. Das löst den teuersten Befund ohne Pipeline, ohne SSR und ohne Lizenzfrage.