Alle Belege stehen. Hier ist das Masterdokument.

---

# Von „gut" zu „ausgezeichnet"
## Design- und Umsetzungsplan für resortpass-europapark.ch

**Stand:** 1. August 2026 · **Adressat:** Betreiber/Entwickler (eine Person, Astro/Bun, kein Budget)

**Belegkennzeichnung:** `[belegt]` = im Repo, im ausgelieferten HTML oder in einer Live-Antwort selbst nachgeprüft. `[Annahme]` = begründeter Schluss ohne harten Beleg. `[ungeklärt]` = muss beantwortet werden, bevor geplant werden kann. `[Lizenz]` = berührt die ParkQueueTimes-Bedingungen.

---

## 1. Management-Zusammenfassung

Die Seite ist handwerklich deutlich besser als der Durchschnitt ihrer Kategorie: 272 indexierbare Seiten mit fehlerfreien hreflang-Clustern, konsistenten Canonicals, vollständigen Alt-Texten, sauberer Formularsemantik und einer Quellendisziplin mit Prüfdaten, die Affiliate-Konkurrenz nicht ansatzweise erreicht. Trotzdem sind ausgerechnet die zwei Funktionen, an denen die erklärten Ziele hängen, für Maschinen unsichtbar: `/wartezeiten/` enthält im ausgelieferten HTML keine einzige Attraktion, und die Statuspills der Startseite sagen statisch „Wird geprüft…" `[belegt]`. Darunter liegt ein Problem, das keines der drei Vorkonzepte benennt: Es existiert kein automatisierter Weg von einer Änderung auf den Server — kein CI, kein Deploy-Skript, `dist/` ist gitignored, das Setup-Skript nimmt „rsync from local" an `[belegt]`. Etwa die Hälfte aller vorgeschlagenen P0-Massnahmen setzt einen automatischen Rebuild voraus, den es nicht gibt. Gleichzeitig liegt der einzige unkopierbare Datenbestand — 14.034 dokumentierte Shop-Prüfungen seit dem 4. März 2026 — ohne eigene URL in einem Startseiten-Block, und in genau diesem Datensatz steckt ein bisher unerklärter Verfügbarkeitstreffer, der auf keinen Fall publiziert werden darf, bevor er geklärt ist. Der eigentliche Hebel ist deshalb nicht mehr Fläche, sondern das Schliessen von vier Lücken: Auslieferungsweg, Maschinenlesbarkeit, Datenwahrheit und ein Wartezeiten-Erlebnis, das auch dann etwas sagt, wenn der Park zu ist — also rund 15 von 24 Stunden plus Winterpause.

### Die fünf wichtigsten Hebel

| # | Hebel | Warum er zuerst kommt |
|---|---|---|
| **1** | **Vier Blockerfragen beantworten** (Deploy-Weg, Caddy-Besitz, Juni-Datenpunkt, PQT-Lizenz) | Ohne diese Antworten sind rund 40 % aller geplanten Arbeit nicht terminierbar und ein Teil davon rechtlich riskant. Kosten: ein halber Tag plus zwei E-Mails. |
| **2** | **Wahrheit ins ausgelieferte HTML** — ResortPass-Status und Attraktionsverzeichnis serverseitig, nicht per JavaScript | Kein Retrieval-Crawler ausser Google und Applebot führt JS aus `[belegt]`. Solange das so bleibt, ist jede weitere GEO-Massnahme wirkungslos, und am Verkaufstag würde die Seite in AI-Antworten weiterhin „nicht verfügbar" sagen. |
| **3** | **Wartezeiten: Zustandsmodell statt Zahlenliste** | Die Seite zeigt nachts drei Gedankenstriche und meldet 26 von 36 Bahnen als „In Wartung" `[belegt]` — an einem 1. August. Das ist der teuerste Vertrauensschaden, den eine Datenseite anrichten kann, und zugleich die grösste unbesetzte Nische im Markt. |
| **4** | **Die eigene Chronik zur zitierfähigen Primärquelle machen** | Europa-Park gibt zur Verfügbarkeit ausdrücklich keine Auskunft. Der einzige Datensatz ohne Lizenzrisiko beantwortet die eine Frage, die sonst niemand beantworten kann. |
| **5** | **Alert-Pipeline für den Ernstfall auslegen** | Der Versand ist sequenziell mit 500 ms Pause und ohne SMTP-Pool: 885 Abonnenten bedeuten mindestens 442 Sekunden reine Wartezeit `[belegt]`. Der einzige Moment, für den die Seite existiert, ist der einzige, den kein Konzept durchgeplant hat. |

---

## 2. Die Diagnose

### 2.1 Was heute wirklich gut ist

Das gehört ausdrücklich benannt, weil die Massnahmenliste sonst ein falsches Bild erzeugt.

**Internationalisierung.** 17 Sprachen mit exakter Schlüsselparität, testgestützt gegen Platzhalter und deutsche Fallbacks; 284 Kernschlüssel und 12 Ratgeber-Packs vollständig; Ungarisch, Griechisch, Hebräisch und Norwegisch lesen sich idiomatisch, nicht maschinell. 272 Seiten × 18 reziproke hreflang-Verweise, nach Normalisierung null Fehler. Das ist für ein Ein-Personen-Projekt aussergewöhnlich.

**Quellendisziplin.** `src/data/facts.ts`, `restaurants.ts`, `accommodations.ts` und `attractions.ts` führen `sourceUrl`, `checkedAt`, `nextReviewAt`, `confidence`, `sourcePriority` und `caveat`. Die 205 Ratgeberseiten liefern `dateModified`, `publisher`, `author`, `citation` und `about` im JSON-LD. Diese Struktur ist genau das, was Antwortmaschinen bevorzugen — sie wird nur auf den falschen Seiten nicht angewendet.

**Ehrlichkeit als Bauprinzip.** Der Checker bestätigt Verfügbarkeit erst nach zwei aufeinanderfolgenden Prüfungen und behandelt Netzfehler und Schutzseiten als „unknown" statt als Ergebnis `[belegt]`. Der Fehlalarm vom 19. März wird nicht nur zugegeben, sondern in `server/db.ts` per `FALSE_POSITIVE_AVAILABLE_DATE` dauerhaft aus allen Aggregaten herausgerechnet `[belegt]`. Bei der Bildlizenzierung wurde ein bereits heruntergeladenes Rulantica-Foto bewusst nicht verwendet, weil Kinder erkennbar sind. Das ist kein Marketingversprechen, das ist Substanz.

**Barrierefreiheits-Grundlage.** Alle Formularfelder korrekt verknüpft (0 Verstösse über 16 geprüfte Seiten), genau ein `h1` pro Seite ohne Ebenensprünge, Tabellen mit `th`/`scope`/`caption`, `prefers-reduced-motion` global sauber abgefangen inklusive der SMIL-Achterbahn, Textkontraste durchgängig AA.

**Marktposition beim Kernthema.** Der einzige direkte Konkurrent (`resortpassalarm.com`) kostet 2,49 €/Monat, nimmt keine neuen Anmeldungen an und meldete am 1. August „Zuletzt geprüft: Vor 19836 Minuten" — knapp 14 Tage tot `[belegt aus Recherche]`. Und die eigene englische Startseite wird bereits nachweislich in LLM-Antworten zitiert, mit wörtlicher Übernahme der Seitensätze.

**Die Positionierungsfrage ist damit entschieden, aber anders als in Konzept 2:** Die Seite bleibt ein ResortPass-Tracker mit Europa-Park-Begleitung — nicht umgekehrt. Der ResortPass ist das Einzige, wo sie den Markt besitzt, eigene Daten besitzt und heute schon zitiert wird. Die Wartezeiten sind ein **Retention-Feature ohne Akquisitionsanspruch**: Sie sollen den vorhandenen Besucher zum Wiederkommen bringen, nicht gegen 14 spezialisierte Anbieter um den Head-Term kämpfen. Diese Unterscheidung ist wichtig, weil sie den Umfang halbiert. Konzept 1 veranschlagt 16–22 Personentage für die Wartezeiten. Mit dem Retention-Anspruch reichen 6–9.

Domain und Marke bleiben. Ein Wechsel kostet Monate und verbrennt das einzige vorhandene Ranking-Asset; der `.ch`-Nachteil gegenüber dem deutschen Markt ist real, aber ohne Search-Console-Zahlen nicht entscheidbar.

---

### 2.2 Kernproblem 1: Es gibt keinen Weg von einer Änderung auf den Server

Das ist der blinde Fleck aller drei Vorkonzepte und der Grund, warum ihre Zeitpläne nicht halten.

**Was belegt ist:**
- Kein `.github/`, keine Workflows, kein Deploy-Skript. `deploy/setup.sh` ist ein einmaliges Setup, das mit dem Kommentar „assumes rsync from local" arbeitet und `docker compose up -d --build` ausführt.
- `dist/` ist gitignored. `docker-compose.yml` mountet `./dist:/app/dist` in beide Container.
- Beide Container sind auf 256 MB und 0,5 CPU begrenzt. Ein Vollbuild von 324 Seiten läuft dort nicht.
- `docker-compose.yml` setzt `SYNC_DIST=0` — diese Variable wird im gesamten Code nirgends gelesen. Toter Rest.

**Warum das durchschlägt:** Konzept 2 (Phase 1) und Konzept 3 (§2.3) bauen beide auf „Rebuild-Trigger bei Statuswechsel plus täglicher Rebuild". Das ist keine Codezeile, sondern eine eigene Infrastrukturaufgabe: Build-Runner, Toolchain in Produktion, atomarer Verzeichnistausch, Rollback, Fehlerpfad wenn `/api/status` beim Build nicht antwortet. In keinem Konzept taucht sie als Aufgabe, Aufwand oder Risiko auf.

**Und es gibt einen deutlich billigeren Weg, den alle drei übersehen haben — mit einer Einschränkung, die auch die Kritik nicht kennt.** `server/checker.ts:219-236` schreibt alle 15 Minuten `status.json` und `history-stats.json` nach `STATUS_JSON_PATH` (`/app/dist/api/`) `[belegt]`. Der Mechanismus „Prozess schreibt Datei in den ausgelieferten Baum" existiert also seit Beginn. **Aber:** Ein Live-Abruf von `/api/status.json` liefert HTTP 404 `[belegt]` — weil `deploy/Caddyfile` mit `handle /api/*` alles unter `/api/` zum Bun-Server proxied, der diesen Pfad nicht kennt. Die Datei wird geschrieben und nie ausgeliefert. Zusätzlich `[ungeklärt]`: Caddy setzt `root * /srv/www`, die Container mounten `./dist` aus dem Projektverzeichnis — ob das dasselbe Verzeichnis ist, lässt sich von hier nicht feststellen.

Der Weg funktioniert also — aber erst nach zwei Klärungen (Pfad ausserhalb von `/api/*`, Identität von `/srv/www` und `dist`).

---

### 2.3 Kernproblem 2: Die zwei wichtigsten Seiten existieren für Maschinen nicht

`[belegt]` `/wartezeiten/` liefert 61.062 Bytes HTML, davon 3.777 Zeichen sichtbaren Text. Darin: kein `blue fire`, kein `Poseidon`, kein `Euro-Mir`. Die drei Vorkommen von „Voltron" stammen aus Meta-Description, FAQ-Text und Suchfeld-Placeholder. Was ein Crawler stattdessen liest: „Live-Daten werden geladen" und „Aktiviere JavaScript, um die aktuellen Wartezeiten zu laden."

`[belegt]` Auf der Startseite stehen alle drei Statuszweige gleichzeitig im Markup, getrennt nur durch `class="hidden"` — inklusive „Jetzt verfügbar! Jetzt kaufen" mit aktivem Shop-Link. Gleichzeitig ist die einzige statische Antwort ein für immer eingefrorenes „Nein." im FAQ-JSON-LD.

`[belegt]` `dist/llms-full.txt` enthält null Treffer für „wait", „Wartezeit", „Prognose" oder „crowd". Der gesamte Live-Bereich fehlt in der Datei, die ausschliesslich für maschinelle Leser existiert — und in derselben Datei stehen 17 uninterpolierte `{year}`-Platzhalter.

Die Ursache ist nicht Nachlässigkeit, sondern eine Architekturentscheidung, die für Menschen richtig und für Maschinen falsch ist: alles Dynamische läuft über Client-Fetch. Kein Retrieval-Crawler ausser Googles Infrastruktur und Applebot führt JavaScript aus.

**Der Schaden ist doppelt:** Am Verkaufstag — dem einzigen Moment, der zählt — würde die Seite in AI Overviews und ChatGPT weiterhin „nicht verfügbar" ausliefern, während das JavaScript „verfügbar" zeigt. Das ist gleichzeitig ein GEO-Verlust und ein Vertrauensrisiko, und es trifft ausgerechnet die Positionierung, auf der alles aufbaut.

---

### 2.4 Kernproblem 3: Vier Fragen blockieren die Planung

Keine davon ist mit Code beantwortbar. Alle vier hängen an Massnahmen, die als „Woche 1, Aufwand S" geplant waren.

**(a) Wer besitzt die laufende Caddy-Konfiguration?** `[belegt]` Jede erfundene URL liefert HTTP 200 mit der deutschen Startseite; `/wartezeiten` und `/wartezeiten/index.html` liefern 200 statt 308; `/sitemap.xml` liefert 200 statt 308. **Aber**: `/api/status.json` antwortet mit 404 **und** `cache-control: public, max-age=60`, während `/api/gibtsnicht` denselben 404 **ohne** cache-control liefert `[belegt]`. Das ist exakt der `@status`-Block aus `deploy/Caddyfile`. Die laufende Konfiguration ist also **eine ältere Version derselben Datei** mit einem SPA-artigen Fallback im `handle`-Block — keine fremde Konfiguration. Das schärft die Diagnose erheblich und macht den Fix planbar. Offen bleibt, ob die Instanz weitere Sites bedient (`caddy-net` ist als `external` deklariert) und was ein Reload dort auslöst.

**(b) Wie kommt ein Build auf den Server?** Siehe 2.2.

**(c) Was ist der Verfügbarkeitstreffer im Juni 2026?** Das ist der schwerwiegendste inhaltliche Punkt im ganzen Paket. `server/db.ts:19-20` rechnet den 19. März bereits aus allen Aggregaten heraus `[belegt]`. Wenn `/api/history-stats` trotzdem `availableChecks: 1` meldet und `/api/history/silver` diesen Treffer im Juni 2026 verortet, existiert ein **zweiter, bisher unerklärter** Treffer. Konzept 3 will genau diesen Datenpunkt als Fakt in FAQ-JSON-LD und in ein `Dataset`-Markup schreiben. Damit würde möglicherweise ein zweiter Fehlalarm zur zitierfähigen Primärquelle erhoben — auf der Seite, deren gesamter Wert Ehrlichkeit ist. Konzept 2 behauptet umgekehrt, die Fehlalarm-Erzählung sei „nicht belegt"; das ist falsch, der Beleg steht im Code.

**(d) Was sagt ParkQueueTimes?** Rund 8–10 Personentage der Vorplanung hängen an einer Freigabe, die alle drei Konzepte fordern und keines formuliert.

---

### 2.5 Kernproblem 4: Fläche ohne Substanz — und ein Prüfdatum, das gleich kippt

`[belegt]` Das Prüfdatum `2026-07-29` steht an 39 Stellen hart im Code: fünf Konstanten (`facts.ts:3`, `media.ts:33`, `accommodations.ts:57`, `restaurants.ts:37`, `PlanningGuidePage.astro:27`) plus 34 Sprachstrings. Aus der Konstante in `PlanningGuidePage.astro` wird `dateModified` für alle 204 Ratgeberseiten gespeist. Und 19 Fakten tragen `nextReviewAt: 2026-08-15` — in zwei Wochen laufen sämtliche Ticket-, Rulantica- und ResortPass-Preise ins Review.

`[belegt]` Gleichzeitig erzwingt `planning-types.ts:29-30` per Tupel-Typ exakt drei Punkte und drei FAQ pro Ratgeber; die redaktionelle Prosa liegt bei 143–188 Wörtern. Die fünf ResortPass-Seiten teilen 82 % ihrer Textzeilen; pro Seite bleiben 151–190 eigene Wörter. Der Familien-Finder kennt 6 von über 100 Attraktionen.

`[belegt]` Dazu kommt eine Ebene, die in keinem Vorkonzept auftaucht: Es gibt keine Design-Tokens für Radius, Abstand, Typo-Skala oder Elevation. Im gebauten CSS stehen 20 Panel-Klassen mit `border: 3px solid`, 48 verschiedene `box-shadow`-Werte, 14 Radien, 55 `font-size`-Deklarationen, drei konkurrierende H1-Skalen. `DMSans-Bold.woff2` ist byte-identisch mit `DMSans-Regular.woff2` — jedes im CSS geforderte Gewicht über 700 wird auf 700 geklemmt, die sorgfältig gestufte Header-Hierarchie rendert als drei gleich dicke Zeilen. Konzept 1 setzt fünf weitere Farbtokens obendrauf, ohne die Basis anzufassen.

Die Zahlen wachsen, die Belastbarkeit nicht. Für einen Einzelbetreiber ist das der eigentliche Risikofaktor: Jede neue Route kostet 17 Seiten Pflege, jede Preisänderung 39 konsistente Handänderungen.

---

## 3. Vorab: die vier Blockerfragen (halber Tag, kein Code)

Diese vier Punkte gehören auf Tag 1, nicht in eine „Woche 0" als Nebensatz.

### F1 — Laufende Caddy-Konfiguration beschaffen
```bash
ssh <server> 'docker ps | grep -i caddy; ls -l /etc/caddy/; caddy fmt --overwrite /etc/caddy/Caddyfile 2>/dev/null; \
  diff /etc/caddy/Caddyfile /opt/resortpass-tracker/deploy/Caddyfile; \
  ls -ld /srv/www; readlink -f /srv/www; ls -ld /opt/resortpass-tracker/dist'
```
Drei Antworten werden gebraucht: (1) der Diff zur Repo-Version, (2) ob `/srv/www` auf `/opt/resortpass-tracker/dist` zeigt, (3) ob die Instanz weitere Sites bedient. Erwartung `[Annahme]`: eine ältere Fassung derselben Datei mit `try_files {path} {path}/ /index.html`.

### F2 — Deploy-Weg festlegen
Die Empfehlung ist bewusst unspektakulär: **ein einzelnes `deploy.sh` im Repo**, das lokal läuft — `bun run build`, `bun run verify:seo`, `bun run verify:static`, `rsync --delete` nach `/srv/www`, Smoke-Test gegen die Live-Domain. Kein GitHub-Actions-Setup, keine Toolchain auf dem VPS, kein Runner. Der Build bleibt dort, wo er heute schon läuft: auf dem Rechner des Betreibers. Damit ist der Deploy-Weg dokumentiert und reproduzierbar, ohne dass neue Infrastruktur entsteht, die gepflegt werden muss. **Aufwand S (2–3 Stunden).**

Automatischer Rebuild bei Statuswechsel wird damit **nicht** möglich — und das ist der Grund, warum Massnahme S3 (unten) den Weg über den Checker geht statt über einen Rebuild.

### F3 — Den Juni-Datenpunkt forensisch klären
```bash
sqlite3 data/resortpass.db \
"SELECT id, pass_type, available, checked_at FROM availability_history WHERE available = 1 ORDER BY checked_at;"
```
Dann gegen die Checker-Logs desselben Zeitpunkts halten: Wurde ein Alert versendet? Was war die HTTP-Antwort? Drei mögliche Ergebnisse, drei verschiedene Konsequenzen:
- **Echtes Verkaufsfenster** → das ist der wertvollste Einzelfakt der ganzen Seite und gehört prominent publiziert.
- **Zweiter Fehlalarm** → `FALSE_POSITIVE_AVAILABLE_DATE` muss zu einer Liste werden, und die Zuverlässigkeitsaussage lautet dann „2 Fehlalarme seit Trackingstart", nicht „1".
- **Nicht rekonstruierbar** → die Chronik wird ohne diesen Datenpunkt publiziert, mit ausdrücklichem Hinweis auf die Lücke.

**Bis eine dieser drei Antworten vorliegt, wird die Chronik-Route nicht veröffentlicht.**

### F4 — Lizenzbrief an ParkQueueTimes (30 Minuten, blockiert 8–10 PT)
Fünf Fragen, konkret formuliert, mit dem Hinweis, dass die Attribution bereits sichtbar geführt wird:
1. Serverseitig gerendertes HTML der Live-Ansicht mit Attribution im selben Block — gedeckt?
2. Build-Zeit-Snapshot mit sichtbarem „Stand"-Zeitstempel — gedeckt?
3. Eigene Kurzzeit-Speicherung für Trendpfeil und Tagesverlauf — erlaubt, zu welchen Bedingungen?
4. Die heute öffentlichen Endpunkte `/api/wait-times` und `/api/crowd-calendar` — abschalten, absichern oder freigegeben?
5. Minutenwerte in JSON-LD (maschinenlesbare Ausspielung) — gedeckt?

Punkt 4 ist unabhängig von der Antwort sofort zu handeln: Die Endpunkte sind heute ohne Schlüssel abrufbar und damit faktisch Rohdaten-Weitergabe. Origin-Prüfung oder Rate-Limit auf die eigene Site, noch in Woche 1.

---

## 4. Massnahmen

Aufwand: **S** ≤ 1 Tag, **M** 2–4 Tage, **L** 5+ Tage. Die Summe bis Ende Quartal 1 liegt bei etwa 28–36 Personentagen — bewusst weniger als die konsolidierten 35–50 der drei Vorkonzepte, weil Abschnitt 8 mehrere Vorschläge streicht.

### 4.1 Sofort — Woche 1

| ID | Massnahme | Warum | Wo im Code | Aufwand | Risiko / Abhängigkeit |
|---|---|---|---|---|---|
| **S0** | Die vier Blockerfragen aus Abschnitt 3 beantworten | Ohne sie sind S1, S3 und alle Redirects nicht terminierbar | — | S | Keins. Blockiert alles Weitere. |
| **S1** | Soft-404 beheben: Repo-Caddyfile ausrollen, im `handle_errors`-Block `file_server { status {err.status_code} }` ergänzen | Jede erfundene URL liefert 200 mit `index, follow` — unbegrenzt viele indexierbare Duplikate, verbranntes Crawl-Budget, kein Redirect verifizierbar | `deploy/Caddyfile:28-31` | S | **Hoch.** Setzt F1 voraus. Laufende Config vorher sichern, Wartungsfenster, Rollback bereit. Ohne `status`-Parameter antwortet Caddy weiterhin mit 200. |
| **S2** | `deploy.sh` schreiben (Build, Verifier, rsync, Smoke-Test) | Der Deploy-Weg existiert heute nur im Kopf des Betreibers | neu: `deploy/deploy.sh` | S | Setzt F1 voraus (Zielpfad) |
| **S3** | **Checker schreibt Status-Fragment als HTML** nach `dist/fragments/status-<lang>.html`, Caddy bindet es per `templates` in die Startseite ein | Löst den P0-Befund ohne Rebuild-Pipeline, ohne SSR, ohne Lizenzfrage. Der Schreibmechanismus existiert bereits | `server/checker.ts:219-236` (Vorbild), `deploy/Caddyfile` | M | **Pfad darf nicht unter `/api/*` liegen** — dort proxied Caddy alles weg (Beleg: `/api/status.json` → 404). Setzt F1 voraus. Fallback, falls `templates` nicht aktivierbar: siehe S3b. |
| **S3b** | *Fallback zu S3:* Status per Build-Zeit-Fetch rendern, täglicher manueller Deploy | Weniger frisch, aber ohne Caddy-Eingriff | `src/components/Hero.astro`, `StatusCard.astro`, `HomePage.astro:134-147` | S | Build darf nicht brechen, wenn `/api/status` nicht antwortet → letzter bekannter Wert im Repo als Fallback |
| **S4** | Attraktions-Stammdaten statisch rendern: `EUROPA_PARK_RIDE_LANDS` nach `src/data/rides.ts`, 36 `<li>` zur Build-Zeit mit Name, Themenbereich, Anker-ID | 36 Entitäten im HTML statt null. Grösster GEO-Einzelgewinn, keine Lizenzfrage (eigenes Repo-Wissen) | `server/wait-times.ts:10-47` → `src/data/rides.ts`; `WaitTimesPage.astro:226-240` | M | **Fehlerpfad beachten:** Heute räumt nur der Erfolgspfad per `replaceChildren()` auf; bei Fetch-Fehler bliebe „Wird geladen" dauerhaft stehen |
| **S5** | `{year}`-Bug beheben + Build-Guard gegen Platzhalter | 17 sichtbar defekte Templates in der einen Datei, die nur für Maschinen existiert | `src/pages/llms.txt.ts:29`; Test analog `planning.test.ts` | S | Keins |
| **S6** | `/api/wait-times` und `/api/crowd-calendar` auf eigene Origin beschränken | Faktische Rohdaten-Weitergabe, AGB §5/§8 | `server/index.ts:130,145` | S | `[Lizenz]` Unabhängig von F4 sofort umsetzen |
| **S7** | Entity-Graph: Organization mit `logo` und `sameAs` (GitHub), Person mit `url`/`sameAs`, WebSite mit `@id`, ein zentraler `AmusementPark`-Knoten | Null `sameAs` im gesamten Build; „Open Source" steht zweimal auf der Startseite, `github.com` nirgends | `src/layouts/Layout.astro`, `HomePage.astro` | S | **Abhängigkeit:** `logo-512.png` existiert nicht — entweder vorher erzeugen oder `logo` weglassen |
| **S8** | Messbaseline: Log-Auswertungsskript + 30-Prompt-Stichprobenbogen, einmal ausgeführt | Ohne Baseline jetzt gibt es später keinen Vergleichspunkt | neu: `scripts/analyze-logs.ts`, `journal/geo-baseline.csv` | S | Datenschutz: IPs nach Aggregation verwerfen, Aufbewahrungsfrist in `deploy/Caddyfile` ergänzen (heute nur `roll_size`) |
| **S9** | Post-Deploy-Smoke-Test gegen die Live-Domain | `scripts/verify-seo-build.ts` (1.509 Zeilen) enthält keinen einzigen `fetch()` und kann Laufzeitverhalten strukturell nicht sehen | neu: `scripts/verify-live.ts` | S | Setzt S1 voraus (sonst schlagen die Assertions fehl) |

### 4.2 Kurzfristig — Monat 1

Schwerpunkt: das Wartezeiten-Erlebnis (Abschnitt 5) plus die UX-Korrekturen mit dem besten Verhältnis von Wirkung zu Aufwand.

| ID | Massnahme | Warum | Wo im Code | Aufwand | Risiko / Abhängigkeit |
|---|---|---|---|---|---|
| **K1** | **Wartezeiten-Zustandsmodell** (Abschnitt 5.1–5.2) inkl. REFURBISHMENT-Guard | 26 von 36 Bahnen als „In Wartung" an einem 1. August ist eine unbelastbare Tatsachenbehauptung. Der Park ist rund 15 von 24 Stunden zu | neu: `server/park-now.ts`; `WaitTimesPage.astro:411,364-368` | M | Setzt S4 voraus |
| **K2** | **Wartezeiten-Liste neu** (Abschnitt 5.3): Zeilenhöhe 64/72 px, 5-Stufen-Skala mit Balken, Gruppierung nach Themenbereich, Favoriten | 36 identische 106-px-Boxen; alles über 30 Min. sieht gleich aus — Voltron mit 120 Min. wie eine Bahn mit 35 | `WaitTimesPage.astro:327-333,507-549` | M | Setzt T1 (Token-Schicht) voraus, sonst wächst der CSS-Wildwuchs |
| **K3** | A11y-Fixes auf der Wartezeiten-Seite: Fokusring-Clipping, Toolbar-`z-index`/`top`, Badge-Wortbruch, `aria-live` verkleinern | `overflow: hidden` schneidet den 3-px-Fokusring des ersten Filter-Buttons vollständig weg — SC 2.4.7, **Level AA** | `WaitTimesPage.astro:486-492,474-484,524-543` | S | Fällt teilweise mit K2 zusammen |
| **K4** | **Label-in-Name in 7 Locales** beheben (cs, pl, es, ro, fr, it, en) + Unit-Test über alle 17 | SC 2.5.3, **Level A**, Hauptnavigation. Sprachsteuerungs-Nutzer können den Link nicht ansprechen | `SiteHeader.astro:126-134,201,229`; Test in `site-header-model.ts` | S | Keins. Der einzige Level-A-Verstoss im ganzen Audit. |
| **K5** | **Startseite straffen** (Abschnitt 4.5): Redundanz auflösen, Live-Block einziehen, Formular aufwerten | Von 8.853 px auf ca. 4.400 px; die sechs fertigen Tools sind von der wichtigsten Seite aus unsichtbar | `HomePage.astro`, `InfoSection.astro`, `NewsSection.astro`, `HistorySection.astro`, `SubscribeForm.astro` | M | 17 Sprachen: DE zuerst vollständig, dann eine Übersetzungscharge |
| **K6** | **Alarm-Formular auf die Entscheidungsseiten** (`SubscribeForm.astro` als wiederverwendbare Insel) | `type="email"` existiert in exakt 17 Dateien — allen Sprach-Startseiten, sonst nirgends. Auf `/resortpass-silver-oder-gold/` steht „Silver — nicht verfügbar" und kein Formular | `PlanningGuidePage.astro:419-434`, `SubscribeForm.astro` | S | Harte IDs (`#subscribe-form`, `#email`, `#benachrichtigung`) müssen parametrisiert werden |
| **K7** | Datenschutz-Link am Formular, Double-Opt-In benennen, Erfolgspanel mit Spam-Ordner-Hinweis | Der einzige Impressum-Link steht ca. 5.350 px unterhalb der Erhebungsstelle | `SubscribeForm.astro:84-96` | S | Keins |
| **K8** | **Alert-Pipeline für den Ernstfall** (Abschnitt 4.6) | 885 Abonnenten × 500 ms = ≥ 442 s reine Wartezeit, ohne SMTP-Pool, sequenziell, und der Versand blockiert den nächsten Check | `server/checker.ts:199-217`, `server/email.ts:23-36` | M | **Testroutine zwingend** — Trockenlauf gegen eine Testadresse |
| **T1** | **Token-Schicht anlegen** (`--radius-*`, `--elev-*`, `--space-section`, `--text-*`) und die Wartezeiten-Komponenten darauf umstellen | 48 Schattenwerte, 14 Radien, 55 Schriftgrössen. Ohne Basis multipliziert jede neue Komponente den Wildwuchs | `src/styles/global.css:31-53` | M | Voraussetzung für K2. Nicht die ganze Site umstellen — nur `:root` plus die neu gebauten Komponenten. |
| **T2** | `DMSans-Bold.woff2` durch die Variable-Datei ersetzen (`font-weight: 100 1000`), zweite Datei löschen, Preload-Ziel anpassen | Byte-identisches Duplikat, 48 KB doppelt geladen; alle Gewichte über 700 werden geklemmt | `src/styles/global.css:55-69`, `Layout.astro:112` | S | **Optik springt**: das bisher stumme 800 wird sofort sichtbar. Gewichtsleiter in einem Schritt mitziehen (900/950 in `SiteHeader.astro`, `LanguageSwitcher.astro` streichen). |
| **P1** | Übersetzungsbundle aus dem Client-Graph der Startseite entfernen (`clientCopy`-Muster wie auf `/wartezeiten/`) | 406 KB / 121 KB gzip blockieren fünf Startseiten-API-Calls, ohne Modulepreload also seriell | `HomePage.astro`, `NewsSection.astro`, `HistorySection.astro`, `SubscribeForm.astro` | M | Passt zeitlich zu K5 — dieselben Dateien |

### 4.3 Mittelfristig — Quartal 1

| ID | Massnahme | Warum | Wo im Code | Aufwand | Risiko / Abhängigkeit |
|---|---|---|---|---|---|
| **M1** | **`/resortpass-verlauf/`** — Chronik-Route mit `Dataset`-Markup und CC0-Download | Der einzige unkopierbare, lizenzfreie Datensatz. Europa-Park gibt keine Auskunft; im Fanforum läuft ein Dauerthread mit 201 Beiträgen | neu; `src/i18n/routes.ts` | M | **Blockiert durch F3.** Keine Lückenlosigkeits-Behauptung: real ca. 97,8 % Abdeckung (14.034 statt ~14.350 erwartete Prüfungen) |
| **M2** | **`/methodik/`** — Wer, Wie geprüft wird, Datenquellen, Korrekturen-Log | Kein Autorenprofil, keine Methodikseite. „Woher weiss die Seite das?" hat keine zitierbare Antwort. Der Fehlalarm-Bericht sitzt am Ende der Newsliste | neu; `src/i18n/routes.ts` | M | Setzt S7 voraus (`Person.url` muss zielen) |
| **M3** | **`/oeffnungszeiten/`** | Eigener, stabiler Suchcluster, keine einzige Route dafür. Die Daten liegen bereits vor (`/api/crowd-calendar`, 31 Tage) | neu | S | Winterpause: Saisonstart liegt ausserhalb des 31-Tage-Fensters → redaktionelles Feld nötig (siehe 5.2) |
| **M4** | `checkedAt` dezentralisieren + CI-Gate | 39 Stellen, ein Datum, `dateModified` für 204 Seiten. Am 15.08. laufen 19 Fakten ins Review | `facts.ts:3`, `media.ts:33`, `accommodations.ts:57`, `restaurants.ts:37`, `PlanningGuidePage.astro:27` | M | **Gate muss trennen:** `validUntil` überschritten = Build rot; `nextReviewAt` überfällig = Warnung + sichtbarer UI-Hinweis. Sonst legt eine Urlaubswoche das Deployment lahm. |
| **M5** | ResortPass-Seiten entkannibalisieren: Tool nur noch voll auf `/resortpass-guide/`, Reservierung und Rulantica als Abschnitte einfalten, 301 | Fünf Seiten mit je 151–190 eigenen Wörtern | `PlanningGuidePage.astro:419-434`; `src/i18n/routes.ts` | M | Setzt S1 voraus. 301 dauerhaft, alte Pfade nie neu vergeben. |
| **M6** | **Slug-Korrektur en/fr/it** (Wartezeiten, Impressum) + `x-default` auf `en` | Ausgerechnet die drei reichweitenstärksten Fremdsprachen laufen auf deutschen Slugs, während 13 kleinere korrekt lokalisiert sind | `src/i18n/routes.ts:74-93,118-138,511` | M | **Reihenfolge zwingend:** S1 → Slug-Umzug → `x-default`. Sonst zementiert `x-default` `/en/wartezeiten/`. |
| **M7** | Sitemap-`lastmod` aus echten Änderungsdaten | 272 `<loc>`, 0 `<lastmod>` | `astro.config.mjs` (`serialize`) | S | **Nach M4**, nicht davor. Ohne dezentrale `checkedAt` bleibt nur das Build-Datum, und das entwertet das Signal. |
| **M8** | Vier Brücken zwischen den Silos | `/besucherprognose/` hat im `<main>` genau einen internen Link; der Ratgeber-Hub verlinkt weder Wartezeiten noch Prognose noch ResortPass-Guide | `CrowdCalendarPage.astro:432-439`, `PlanningGuidePage.astro:347,101`, `VisitPlanner.astro` | M | `dateLabel` ist in 17 Sprachen übersetzt und wird nirgends gerendert — als Datumsinput ausgeben |
| **M9** | Guide-Hub: alle 12 Ratgeber zeigen, `slice(1,7)` aufheben, Related-Block entdoppeln, `.planning-footer` durch `Footer.astro` mit `showCta`-Prop ersetzen | Hub zeigt 6 von 12 und wiederholt drei davon wortgleich; Ratgeberseiten verlieren die gesamte Querverlinkung | `PlanningGuidePage.astro:347,101,119`, `PlanningPage.astro:318` | S | Keins |
| **M10** | `aria-live` in fünf Planungs-Tools verkleinern (Vorbild: `StayComparator.astro:111`) | Jeder Tastendruck löst sieben Textänderungen in einer Live-Region aus; die Verlaufstabelle liest 20 Zeilen pro Blätterschritt vor | `CostCalculator.astro:137`, `FamilyFinder.astro:105`, `RulanticaPlanner.astro:86`, `ResortPassTool.astro:198`, `RestaurantFinder.astro:296`, `HistorySection.astro:25` | S | Das richtige Muster existiert im Projekt bereits |
| **M11** | Attraktionsdatensatz von 6 auf 40+ ausbauen | Der Familien-Finder liefert bei jeder Eingabe praktisch dieselben sechs Bahnen; Voraussetzung für alles Weitere | `src/data/attractions.ts` | L | Reine Redaktionsarbeit, lizenzfrei. **Vor** jeder Detailseite. |
| **M12** | Deutsche Attraktionsnamen + Suchaliase | Auf der deutschen Seite steht „Jim Button – Journey through Morrowland", „Tirol Log Flume", „Swiss Bob Run" | neu: `src/data/ride-names.ts` | S | Provider-Schreibweise als unsichtbarer Alias behalten. **Ohne** `nextReviewAt` — ein Attraktionsname ist kein Fakt mit Verfallsdatum. |
| **P2** | Brotli/zstd vorziehen, OG-PNGs quantisieren, verwaiste Assets löschen, JetBrains Mono nach woff2 | `encode gzip zstd` liefert Browsern gzip (17.316 B statt 16.619 B zstd); 2,4 MB OG-PNGs; ~470 KB Waisen | `deploy/Caddyfile:62`, `public/` | S | Keins |
| **P3** | Fremd-CSS auf 14 Sprach-Startseiten beseitigen | `dist/pl/index.html` und `dist/el/index.html` laden 3 Stylesheets statt 1; +56 KB render-blockierend auf Einstiegsseiten | `astro.config.mjs`, Routenstruktur | M | Ursache ist die Routenstruktur, nicht der Inhalt (DE/EN/FR laden korrekt nur eines) |

### 4.4 Später / Optional

| Massnahme | Bedingung | Aufwand | Ehrliche Einschätzung |
|---|---|---|---|
| **Wartezeiten-Snapshot mit Minutenwerten im HTML** (Caddy-Fragment aus dem 5-Min-Cache) | F4 positiv | M–L | Der eigentliche GEO-Sprung für `/wartezeiten/`. **Aber**: bricht das reine Static-Modell, und bei rsync-Deploys muss der Bun-Prozess neu geladen werden, sonst liefert er veraltetes HTML. |
| **Tagesverlauf / Heatmap Attraktion × Uhrzeit** | F4 positiv, schriftlich | L | Der visuell stärkste Differenzierer der ganzen Seite. Ohne Freigabe nicht bauen. |
| **Attraktions-Detailseiten** (10–12 Bahnen, 4 Sprachen) | M11 abgeschlossen | L | 40–48 neue URLs. Nur mit je 250–400 Wörtern eigenem Text, sonst Thin Content. |
| **Silver-Sperrtage-Kalender** | — | M | Ein Wartezeiten-Anbieter rankt derzeit für eine reine ResortPass-Frage. Offene Flanke im eigenen Kernthema. |
| **Ausverkauft-Kalender für Tagestickets** | Schriftliche Anfrage bei MackInternational | M | Der grösste unbesetzte USP im Markt. `checkAvailabilityUrl` existiert und antwortet als JSON. Der Shop hat keine offene API-Lizenz — anfragen, nicht einfach abrufen. |
| **Anreise & Parken** mit Schweiz-Sektion | — | M | Naheliegendste eigene Nische für eine `.ch`-Domain. |
| **Dark Mode** | T1 abgeschlossen und auf die ganze Site ausgerollt | M | Erst nach der Token-Schicht überhaupt machbar. Vorher: unbezahlbar. |

---

### 4.5 Die Startseite in Kurzform (K5)

Zielhöhe Desktop ca. 4.400 px statt 8.853 px. Reihenfolge:

1. **Antwort-Hero** — H1 als Frage, server-gerenderte Antwortkarte mit Zeitstempel („Stand 1. August 2026, 08:15 Uhr, Europe/Berlin"), zwei Status-Pills mit echtem Wert, Streak-Zeile, CTA, vier Feature-Pills. Der pulsierende „LIVE"-Badge über der Abonnentenzahl entfällt — der Puls gehört zu echten Live-Daten. Die hartcodierte `800` wird zur Build-Zeit aus `/api/subscriber-count` befüllt (live: 885).
2. **„Was wir wissen — und was nicht"** — Dauer, Muster, 3-Punkte-Vorbereitungscheckliste. Das Wort „seit" kommt heute im gesamten Startseiten-HTML nicht vor `[belegt]`.
3. **Alarm-Formular** — mit Datenschutz-Link, Double-Opt-In-Erklärung, Social Proof und der Zuverlässigkeitszeile, die heute 2.800 px *nach* dem Formular steht.
4. **„Live jetzt im Park"** — drei Karten mit echten Werten: Wartezeiten (drei kürzeste, mit Attribution), Prognose (Index heute/morgen), Öffnungszeiten. Heute wird `/wartezeiten/` zwischen Hero-Ende und Footer kein einziges Mal erwähnt `[belegt]`.
5. **„Deinen Besuch planen"** — die sechs Tools, die von der Startseite aus heute unsichtbar sind.
6. **ResortPass verstehen** — vier Karten plus FAQ. FAQ-Karte 02 („Ist der ResortPass verfügbar? Nein.") und die H3, die zeichengleich mit der H1 ist, entfallen.
7. **Chronik-Teaser** — eine Headline-Zahl, ein Link. Die 34-Seiten-Tabelle (21 % der Seitenhöhe) zieht auf `/resortpass-verlauf/` um.
8. **„Warum du uns glauben kannst"** — vier Belege, GitHub-Link, `/methodik/`.

**Entfällt:** Community-Sektion (443 px leerer Zustand, rendert erst ab 3 freigegebenen Tipps), die drei wortgleichen Auto-News (1.211 px, ersetzt durch eine Zeile im Ruhezustand), die dekorative 668×351-Illustration, der doppelte „Zuletzt geprüft"-Absatz.

**Mobil zusätzlich:** Die Verlaufstabelle hat `overflow: hidden` — auf 375 px sind 64 % des Gold-Badges unsichtbar und nicht scrollbar `[belegt]`. Auf der Chronik-Route wird daraus unter 640 px ein Zeilen-Layout.

---

### 4.6 Die Alert-Pipeline (K8) — der ungeplante Ernstfall

Das ist das Produkt. Kein Vorkonzept hat es angesehen.

**Was belegt ist:** `server/checker.ts:199-217` versendet sequenziell, mit 500 ms Pause zwischen den Mails, und fängt Fehler pro Empfänger ab. `server/email.ts:23-36` erzeugt einen nodemailer-Transport **ohne** `pool`-Option — jede Mail baut eine eigene SMTP-Verbindung auf. Live sind es 885 Abonnenten.

**Die Rechnung:** 885 × 0,5 s = 442 Sekunden reine Wartezeit. Plus Verbindungsaufbau, Handshake und Übertragung pro Mail. `[Annahme]` Realistisch 10–20 Minuten für einen Durchlauf. Werden Silver und Gold gleichzeitig verfügbar, läuft `sendAlerts` zweimal hintereinander. Der Checker läuft in einer `while true; sleep 900`-Schleife `[belegt]` — der Versand blockiert also den nächsten Verfügbarkeitscheck.

Bei einem Kontingent, das im Februar 2026 nach 60 Stunden erschöpft war, ist eine Verzögerung von 20 Minuten für die letzten Empfänger vertretbar. Bei einem Fenster, das in Minuten schliesst, ist es das nicht.

**Massnahmen, alle klein:**
- `pool: true, maxConnections: 3, maxMessages: 100` im Transport — Verbindungsaufbau entfällt, Delay kann auf 100–200 ms sinken.
- Versand in `sendAlerts` nebenläufig mit begrenzter Parallelität (3–5 gleichzeitig) statt strikt sequenziell.
- **Versand vom Check entkoppeln:** Der nächste Verfügbarkeitscheck darf nicht auf den Mailversand warten.
- **Trockenlauf-Modus** (`DRY_RUN=1`) plus eine Testroutine, die den Versand gegen eine einzelne Testadresse durchspielt und die Gesamtdauer misst. Vor jedem Deploy ausführen.
- Bounce-Behandlung: Heute wird pro Empfänger nur geloggt. Bei dauerhaften Fehlern sollte die Adresse markiert werden, sonst wächst die Liste mit toten Adressen und die Versanddauer mit ihr.

**Nicht empfohlen:** Web Push als Ersatz. Auf iOS funktioniert es nur nach Homescreen-Installation — bei einem Ereignis, das einmal jährlich für rund 60 Stunden eintritt, ist die Wahrscheinlichkeit, dass jemand Monate im Voraus installiert hat, nahe null. Push ist ein zweiter Kanal mit eigener Fehlerquelle (Subscription-Ablauf, VAPID-Key-Rotation), kein Ersatz für die E-Mail.

---

## 5. Das neue Wartezeiten-Erlebnis

### 5.0 Der Anspruch, präzise formuliert

Nicht: „die beste Wartezeiten-Seite Deutschlands". Der Head-Term ist gegen 14+ spezialisierte Anbieter — darunter der eigene Datenlieferant, der selbst eine SEO-Landingpage dafür betreibt — nicht frontal gewinnbar.

Sondern: **Die einzige Seite, die in jedem Zustand eine Antwort gibt, und die nicht sagt „wie lang ist die Schlange", sondern „was mache ich jetzt".**

Zwei belegte Lücken machen das möglich:

1. **Der Park ist rund 15 von 24 Stunden geschlossen** (9 Std. Betrieb im August), plus Winterpause von etwa Anfang Januar bis Ende März. Alle Wettbewerber zeigen dann Striche. `/api/crowd-calendar` liefert die Öffnungszeiten bereits `[belegt]` — sie werden nur nicht genutzt.
2. **Die offizielle Europa-Park-App geofenced die Wartezeiten** — sie funktionieren nur im Park `[belegt aus Recherche]`. Der gesamte Planungs-Use-Case liegt per Design bei Dritten. Das gehört als eigener, zitierfähiger Abschnitt auf die Seite: „Warum sehe ich die Wartezeiten in der offiziellen App nicht von zuhause?"

---

### 5.1 Zustandsmodell

Heute rendert die Seite ausschliesslich aus `/api/wait-times` und kennt deshalb keine Öffnungszeiten. Die gesamte Geschlossen-Behandlung ist eine Zeile: `WaitTimesPage.astro:411` schaltet bei `openRides === 0` den Filter auf `all` `[belegt]`. Das reicht nicht — 0 offene Bahnen um 03:00 Uhr und 0 offene Bahnen wegen Provider-Ausfall sind zwei völlig verschiedene Aussagen.

**Neuer Endpunkt `server/park-now.ts`**, der beide vorhandenen Caches zusammenführt und den Zustand **serverseitig** entscheidet. Der Client interpretiert nichts mehr selbst.

```ts
export type ParkState =
  | 'SEASON_BREAK'   // kein Betriebstag im bekannten Zeitraum
  | 'CLOSED_TODAY'   // heute isOpen=false, Saison läuft
  | 'BEFORE_OPEN'    // Betriebstag, jetzt < openingTime
  | 'OPENING_SOON'   // BEFORE_OPEN und Δ ≤ 90 Min
  | 'OPEN'
  | 'AFTER_CLOSE';

export type DataQuality =
  | 'fresh'        // updatedAt < 15 Min
  | 'stale'        // 15–30 Min (bestehende PROVIDER_STALE_MS-Logik)
  | 'unreliable'   // Massen-REFURBISHMENT, siehe 5.2
  | 'unavailable'; // kein Cache

export interface ParkNowResponse {
  state: ParkState;
  dataQuality: DataQuality;
  now: string;                        // ISO, Europe/Berlin
  today: { date, openingTime, closingTime, crowdPercent };
  next:  { date, openingTime, crowdPercent } | null;
  upcoming: Array<{ date, openingTime, closingTime, crowdPercent }>;  // 7 Tage
  waitTimes: WaitTimesResponse | null; // nur bei OPEN und dataQuality !== 'unavailable'
  rideInventory: RideMasterRecord[];   // IMMER — eigene Daten, keine PQT-Daten
  source: { name: 'ParkQueueTimes.com', url: '…' };
}
```

`rideInventory` kommt aus `src/data/rides.ts` (Massnahme S4): heutige Allowlist plus Slug, deutscher Name, Kategorie, Headliner-Flag. **Das sind eigene redaktionelle Daten** und dürfen jederzeit statisch gerendert werden.

`[Lizenz]` **Wichtig:** `/api/park-now` wird von Anfang an auf die eigene Origin beschränkt (Massnahme S6). Ein Endpunkt, der Wartezeiten, 7-Tage-Crowd-Kalender und Öffnungszeiten in einer öffentlichen Response bündelt, wäre der lizenzkritischste Payload der ganzen Site.

**Was jeder Zustand zeigt:**

| Zustand | Statusband | Kennzahlen | Hauptbereich |
|---|---|---|---|
| **OPEN** | grüner Punkt, „Live · vor 2 Min." | Offen 24 · Ø 32 Min · Max 75 Min · **Kürzeste 5 Min** | „Jetzt am kürzesten" (3 Kacheln) → Filterleiste → gruppierte Liste → Accordion „Geschlossen (9)" |
| **OPENING_SOON** (≤ 90 Min) | violetter Punkt, „Öffnet in 47 Min", Minuten-Tick | Öffnet 09:00 · Schliesst 18:00 · Andrang heute 52 % | „Die ersten 60 Minuten": Headliner mit „ab 09:00", darunter das volle Verzeichnis |
| **BEFORE_OPEN** | „Park geschlossen · öffnet heute um 09:00" | wie oben | Verzeichnis „36 Attraktionen im Europa-Park", nach Bereich gruppiert, ohne Zahlen |
| **AFTER_CLOSE** | „Öffnet morgen um 09:00" | Morgen 09:00–18:00 · Andrang morgen 46 % | 7-Tage-Vorschau + Verzeichnis |
| **CLOSED_TODAY** | „Heute geschlossen · nächster Öffnungstag: Sa 08.11., 11:00" | Nächster Tag + Andrang | 7-Tage-Block + Verzeichnis |
| **SEASON_BREAK** | „Winterpause · Saisonstart 27.03.2027" + Tages-Countdown | Saisonstart · ResortPass-Status | Verzeichnis + „Warum jetzt keine Wartezeiten" + Verweise |
| **stale** | gelbes Band, „Stand 14:12 · seit 22 Min keine neuen Daten" | letzte Werte, gedämpft | Liste bleibt, mit Zeitstempel-Hinweis |
| **unreliable** | gelbes Band, „Der Park meldet aktuell keine Betriebsdaten" | ausgeblendet | Verzeichnis statt Liste, **kein Einzelstatus** |
| **unavailable** | rotes Band, „Wartezeiten gerade nicht abrufbar" | — | Verzeichnis (statisch, immer da) + Retry |

**Zwei Regeln halten das zusammen:**
- Der Zustand kommt vom **Zeitplan**, nicht von den Wartezeiten.
- Das **Verzeichnis ist immer sichtbar** — auch bei Totalausfall stehen 36 Attraktionen mit Bereich im HTML. Damit hat die Seite nachts, im Winter und bei API-Ausfall Substanz für Nutzer und für Crawler.

**Datenlücke, die die Vorkonzepte übersehen** `[belegt]`: `/api/crowd-calendar` liefert 31 Tage. In der Winterpause liegt der Saisonstart 60–80 Tage voraus — **ausserhalb dieses Fensters**. Der `SEASON_BREAK`-Zustand braucht also ein redaktionell gepflegtes Feld in `src/data/facts.ts` mit `sourceUrl` und `checkedAt`, jährlich zu aktualisieren. Ohne dieses Feld kann der Zustand kein Datum nennen und muss auf „Der Park ist in der Winterpause" ohne Countdown zurückfallen. Ebenso: „Rulantica ist ganzjährig offen" ist ohne Beleg und ohne Prüfdatum nicht renderbar — Rulantica hat eigene Wartungsschliessungen und ist bewusst aus dem Feed gefiltert.

---

### 5.2 Der REFURBISHMENT-Guard

`[belegt]` Am 1. August 2026 um 08:16 Uhr meldete der Provider 26 von 36 Bahnen als `REFURBISHMENT` — darunter Silver Star, Eurosat CanCan Coaster, Matterhorn-Blitz, Pegasus, Pirates in Batavia. `WaitTimesPage.astro:364-368` übersetzt das über `translations.ts:99` in eine harte Tatsachenbehauptung: „In Wartung". An einem Augusttag ist das betrieblich unmöglich.

Drei Schutzschichten in `server/park-now.ts`:

```ts
// 1) Ausserhalb der Öffnungszeiten: NIE einen Einzelstatus als Ursache rendern.
if (state !== 'OPEN') {
  waitTimes = null;           // Client zeigt pro Zeile nur "ab 09:00"
}

// 2) Massen-Refurbishment innerhalb der Öffnungszeiten:
const share = rides.filter(r => r.status === 'REFURBISHMENT').length / rides.length;
if (state === 'OPEN' && share > 0.6) dataQuality = 'unreliable';

// 3) Stabilitätsprüfung: "In Wartung" nur, wenn über 3 aufeinanderfolgende
//    Abrufe (15 Min) stabil. Ringpuffer im Prozess-RAM — dieselbe Klasse
//    wie der bestehende `cached`-Zustand, keine Persistenz, keine Weitergabe.
const stable = statusRing.isStable(ride.id, 'REFURBISHMENT', 3);
```

Sonst lautet der Text neutral: *„Aktuell keine Wartezeit gemeldet"*.

`[Lizenz]` **Konsistenzhinweis:** Punkt 3 ist serverseitiger Kurzzeit-Zustand über PQT-Daten. Konzept 1 stuft ihn als unkritisch ein und gleichzeitig einen rein clientseitigen Trendpfeil als klärungsbedürftig — das ist genau verkehrt herum. Beide gehören in denselben Topf: Der flüchtige Client-Vergleich ist **unkritischer** als der Server-Ringpuffer. Beide gehören in F4 Frage 3, beide sind bis zur Antwort vertretbar (flüchtiger Betriebszustand, keine Historie, keine Weitergabe), aber die Einordnung muss einheitlich sein.

---

### 5.3 Die Liste

**Zeilenaufbau:**
```
Grid: [6px Farbstreifen] [1fr Name + Bereichs-Chip + Balken] [64px Zahl] [44px Stern]
Höhe: 64 px mobil / 72 px Desktop   (heute: 106 px)
```

Der 3-px-Rahmen mit Versatzschatten umschliesst **einmal die ganze Liste**, nicht 36-mal jede Zeile. Zeilentrenner: 1 px. Die neobrutalistische Signatur bleibt, das Zebra aus 36 schweren Rahmen verschwindet.

**Farbskala — 5 Stufen statt 3, alle Kontraste selbst nachgerechnet:**

Heute (`WaitTimesPage.astro:327-333`) gibt es drei Stufen; alles über 30 Minuten ist „high". Voltron mit 120 Minuten sieht aus wie eine Bahn mit 35 — obwohl das der Unterschied zwischen „später nochmal" und „jetzt sofort hin" ist.

| Stufe | Schwelle | Farbe | vs. `#FFFFFF` | vs. `#FFF9F0` | vs. `#F7F4FF` | Label |
|---|---|---|---|---|---|---|
| L0 | 0–10 Min | `#15803D` | 5,02 : 1 | 4,79 : 1 | 4,62 : 1 | sehr kurz |
| L1 | 11–25 Min | `#4D7C0F` | 4,99 : 1 | 4,77 : 1 | 4,60 : 1 | kurz |
| L2 | 26–45 Min | `#B45309` | 5,02 : 1 | 4,80 : 1 | 4,62 : 1 | normal |
| L3 | 46–70 Min | `#C2410C` | 5,18 : 1 | 4,95 : 1 | 4,77 : 1 | lang |
| L4 | > 70 Min | `#BE185D` | 6,04 : 1 | 5,77 : 1 | 5,56 : 1 | sehr lang |
| — | unbekannt | `#6B5E8C` | 5,83 : 1 | 5,56 : 1 | 5,36 : 1 | keine Angabe |
| — | geschlossen | Text `#5B4C82` auf `#DED4EF` | 7,50 : 1 | — | — | geschlossen |

Alle Stufen bestehen WCAG AA (≥ 4,5 : 1) auf allen drei Hintergrundfarben der Site. `#15803D`, `#B45309` und `#BE185D` sind bereits vorhandene Tokens; neu sind nur `#4D7C0F` und `#C2410C` — und sie gehören in die Token-Schicht aus T1, nicht daneben.

**Vier redundante Kodierungen pro Zeile — Farbe trägt nie allein:**
1. **Balkenlänge** auf gemeinsamer 0–120-Minuten-Skala (`--pct`, bei 100 % geklemmt)
2. **Zahl** mit `font-variant-numeric: tabular-nums`, rechtsbündig auf gemeinsamer Achse, 26 px; ab 60 Min 30 px, ≤ 10 Min 22 px — Extremwerte springen heraus
3. **Textlabel** („lang", „sehr lang") — `sr-only` mobil, sichtbar ab 768 px
4. **Muster** bei L4: `repeating-linear-gradient(45deg, …)` auf dem Balken, funktioniert auch bei `forced-colors: active`

**Gruppierung nach Themenbereich.** Die 17 Bereiche liegen vollständig vor (`server/wait-times.ts:10-47`), werden aber nur als 12-px-Label über jedem Namen ausgegeben — 36-mal derselbe Platzverbrauch ohne Orientierung. Neu: sticky Zwischenüberschriften („Island · 3 offen · Ø 42 Min", 48 px), Bereich als Chip **neben** dem Namen, vierte Sortieroption „Nach Bereich".

**Filter mit Trefferzahl**, horizontal scrollbar: `Alle 36` · `Offen 24` · `≤ 15 Min 6` · `Favoriten 4` · dann Bereichs-Chips. Man weiss vor dem Tippen, was einen erwartet.

**Suche.** `WaitTimesPage.astro:338` matcht bereits über `${ride.name} ${localizedLand(ride.land)}` — Bereichssuche funktioniert also, ist aber unentdeckbar `[belegt]`. Der Placeholder ändert sich auf „z. B. Voltron, WODAN oder Skandinavien". Dazu `src/data/ride-names.ts` mit deutschen Namen und Aliasen (Provider-Schreibweise bleibt als unsichtbarer Alias, damit „Jim Knopf" **und** „Jim Button" treffen).

**Favoriten** in `localStorage` unter `rp.fav.rides`, 44 × 44 px Stern mit `aria-pressed`. Bei ≥ 1 Favorit erscheint oben der Block „Meine Bahnen". Direkt daneben der Satz: *„Wird nur in deinem Browser gespeichert, nicht auf unserem Server."* — das ist ein **Beweis** für das Kein-Tracking-Versprechen, kein Verstoss dagegen. Nebeneffekt: behebt den Bug, dass `WaitTimesPage.astro:411` bei jedem Auto-Refresh den Filter auf `all` zurücksetzt, sobald der Park schliesst.

**Zwei Fehler, die dabei mitverschwinden:**
- `.wait-badge { flex: 0 0 5rem }` plus `overflow-wrap: anywhere` bricht „Geschlossen" zu „Geschloss/en" — 36-mal pro Seite, in allen 17 Sprachen `[belegt]`. Geschlossene Bahnen bekommen kein Textbadge mehr.
- `.filter-group { overflow: hidden }` schneidet den 3-px-Fokusring (`global.css:792-800`) beim ersten Button vollständig weg — **SC 2.4.7, Level AA** `[belegt]`. Fix: Radien und Rahmen auf die Buttons legen (logische Eigenschaften wegen RTL), `overflow: visible`. **Nicht** `overflow-clip-margin` — Safari-Lücke.

---

### 5.4 Layout: Mobile first

Heute erscheint auf 390 px die erste Wartezeit bei y = 1.553 px — fast zwei volle Bildschirme `[belegt]`. Ziel: y ≈ 480 px.

```
y=0    Header (sticky, 69 px)
y=69   LIVE-BAND (sticky, 44 px)   ● Live · vor 2 Min.        [↻ 44px]
y=113  H1 26px einzeilig + Subline eine Zeile
y=185  ZUSTANDSBLOCK (60–96 px)    [Offen 24][Ø 32 Min][Kürzeste 5 Min]
y=257  "Jetzt am kürzesten"        3 Kacheln, scroll-snap
y=400  FILTERLEISTE (sticky, 48 px)
y=448  ▸ ISLAND · 3 offen · Ø 42 Min      (sticky)
y=480  ┃ blue fire Megacoaster       45 ★
       ┃ ██████████░░░░░░░░  Min
       …
       ▸ Geschlossen (9)
       Powered by ParkQueueTimes.com
       Erklärblock · FAQ · Prognose-CTA
```

**Konkrete Änderungen:**

| Element | Heute | Neu |
|---|---|---|
| Hero-Section (Z. 100–147) | 829 px | `< 640px`: `pt-4 pb-3`, H1 `text-[1.65rem]`, Subline einzeilig |
| Illustration (Z. 138–145) | 191 px, `eager` auf jedem Viewport | `<picture>` mit `media="(min-width: 768px)"` — unter 768 px gar nicht laden (`display:none` spart den Download nicht) |
| Prognose-CTA (Z. 135–137) | im Fold | unter die Liste |
| Attribution (Z. 130–132) | im Fold | direkt unter die Liste, im selben Sichtfeld wie die Zahlen — Lizenzpflicht bleibt erfüllt |
| `.wait-toolbar` (Z. 576) | `position: static` unter 640 px | sticky, einzeilig, 48 px |
| `max-w-6xl` (Z. 104/148/166) | 72 rem | `.section-shell` (76 rem) — beseitigt den 64-px-Breitensprung von der Startseite |

**Sticky-Offset korrekt lösen:** `--site-header-height` per `ResizeObserver` auf `documentElement` publizieren (das Muster existiert bereits für `--site-header-planner-height`, `SiteHeader.astro:324-343`), dann `top: calc(var(--site-header-height) + 0.5rem)`, `z-index: 30`, und `scroll-padding-top` daraus ableiten. Das behebt gleichzeitig den 10-px-Ankerversatz auf den Ratgeberseiten.

**Der Live-Puls** (`global.css:440-452`) läuft ausschliesslich bei `dataQuality === 'fresh'` und `state === 'OPEN'`. Auf der Startseite pulsiert er heute über einer Abonnentenzahl — „Live" muss Live bedeuten.

---

### 5.5 Über die Liste hinaus

| Priorität | Feature | Nutzen | Aufwand | Lizenz |
|---|---|---|---|---|
| **1** | **„Jetzt am kürzesten" / Die grossen Fünf** — Streifen über der Filterleiste, bei geschlossenem Park „ab 09:00". Provider-IDs: 1193 Silver Star, 1273 blue fire, 1274 WODAN, 1201 Eurosat CanCan, 1278 Voltron Nevera | Beantwortet „Wo gehe ich jetzt hin?" statt „wie lang ist die Schlange" — der Punkt, an dem laut Branchenvergleich alle Wettbewerber aufhören | S | unkritisch (Anzeige aktueller Werte) |
| **2** | **Trendpfeil** `▲ +10 Min` seit dem vorherigen Abruf, rein clientseitig | Eine Zahl ohne Richtung ist halb so nützlich | S | in F4 Frage 3 mitklären, aber unkritischer als der Server-Ringpuffer |
| **3** | **Bereichs-Chips mit Trefferzahl** (statt Kachelmatrix) | Der Europa-Park ist räumlich in Länderbereiche gegliedert — das ist die mentale Karte jedes Besuchers. Die Bereichssuche funktioniert bereits, sie ist nur unentdeckbar | S | unkritisch |
| **—** | **Tagesverlauf / Heatmap Attraktion × Uhrzeit** | Der visuell stärkste Moment und der grösste Differenzierer gegenüber der offiziellen App | L | **Setzt eine eigene Zeitreihe voraus. Ohne schriftliche Freigabe nicht bauen.** |

**Technischer Hinweis zum Trendpfeil:** Das Delta darf **nur** berechnet werden, wenn sich `data.updatedAt` geändert hat. Server-Cache-TTL und Client-Intervall betragen beide 5 Minuten und laufen nicht synchron — sonst zeigt der Pfeil willkürlich 0 oder springt.

---

### 5.6 Aktualisierung und Datenfluss

```
ParkQueueTimes ─┬─→ server/wait-times.ts      (Cache 5 Min)
                └─→ server/crowd-calendar.ts  (Cache 60 Min)
                          │
                          ▼
                 server/park-now.ts   ← Zustandsmaschine + REFURBISHMENT-Guard
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
   GET /api/park-now         Statisches HTML mit rideInventory
   (ETag, max-age=60,        (Build-Zeit, aus src/data/rides.ts)
    origin-beschränkt)                │
              │                       │
              └──── JS-Insel ─────────┘  (Progressive Enhancement)
```

| Trigger | Verhalten |
|---|---|
| Initial | `fetch('/api/park-now')` |
| Intervall | 5 Min, **nur** wenn `document.visibilityState === 'visible'` |
| `visibilitychange` / `focus` | Nachladen, wenn `updatedAt` älter als 5 Min. iOS Safari friert Timer in Hintergrund-Tabs ein — ohne diesen Listener sieht man nach 10 Minuten veraltete Zahlen unter dem Label „Live-Daten" |
| `online` | Sofort nachladen, Offline-Banner entfernen |
| Manuell | 44 × 44 px Icon-Button im Live-Band (heute: 91 × 20 px Textlink im Fliesstext) |

**Serverseitig ergänzen:** `ETag` auf `/api/park-now` — heute fehlt er auf `/api/wait-times` `[belegt]`, sodass wiederholte Abrufe im überlasteten Parknetz jedes Mal 5 KB JSON kosten. Erst danach `cache: 'no-cache'` im Client entfernen; vorher verpufft der Effekt.

**Zeitstempel:** relativ („vor 2 Min.", alle 30 s neu gerechnet), absolut als `<time datetime="…" title="14:12">`. Ab 10 Min Alter wird das Band gelb, ab 20 Min rot — konsistent zu `PROVIDER_STALE_MS`/`MAX_STALE_MS` in `server/wait-times.ts:4-5`.

**Skeleton-Reservierung:** Heute 5 Skeletons (ca. 500 px) für 36 Zeilen (ca. 2.300 px). `min-height` aus der zuletzt bekannten Bahnenzahl als Build-Zeit-`data`-Attribut — die Zahl schwankt saisonal. Dazu `content-visibility: auto` mit `contain-intrinsic-size: 0 64px` auf die Zeilen.

**Kein Service Worker.** Auf einer Site mit gehashten Astro-Assets, 17 Sprachen und rsync-Deploys ist er eine dauerhafte Cache-Invalidierungs-Fehlerquelle. `stale-while-revalidate` plus der ohnehin geforderte ETag liefern den Grossteil des Nutzens ohne neue Laufzeit.

---

## 6. In LLMs und organisch gefunden werden

### 6.1 Belegt wirksam

**(a) Der Inhalt muss im ausgelieferten HTML stehen.** Die beste Messung (Vercel/MERJ, über 500 Mio. GPTBot-Fetches) zeigt: kein Retrieval-Crawler ausser Googles Infrastruktur und Applebot führt JavaScript aus. GPTBot lädt JS in ca. 11,5 % der Requests, ClaudeBot in ca. 23,8 % — ausgeführt wird es nie. Das ist die Grundvoraussetzung, und sie ist heute nicht erfüllt.

**(b) Snippet-Fähigkeit bei Google.** Googles Primärdoku ist unzweideutig: „There are no additional requirements to appear in AI Overviews or AI Mode." Voraussetzung ist allein, dass die Seite indexiert und snippet-fähig ist. Konsequenz: `nosnippet`, `data-nosnippet` und `max-snippet:0` nirgends einsetzen. Der bestehende `max-snippet:-1, max-image-preview:large` ist korrekt und bleibt. Und: `Google-Extended` zu blockieren entfernt eine Seite **nicht** aus AI Overviews — das steuert nur Gemini-Training.

**(c) Extrahierbare Evidenz.** Ein arXiv-Survey über die GEO-Literatur 2023–2026 identifiziert als kausal wirksam: thematische Passung, Position im Kontextfenster, und Statistiken, Definitionen, Zitate, Daten sowie explizite Preise. Reine Formatierungsänderungen: wirkungslos. Keyword-Stuffing: negativ. Praktisch heisst das: **Faktendichte statt Textlänge.** Jede Aussage mit Zahl, Datum und Quelle.

**(d) Passage-Struktur.** Google dokumentiert „query fan-out" selbst — eine Frage wird in Unterfragen zerlegt, extrahiert werden Passagen. Deshalb: H2 in der Frageform, die Menschen tippen; Antwort im **ersten** Satz vollständig; keine Präambel; jeder Block muss ohne Seitenkontext funktionieren. Heute lauten die FAQ-Antworten auf `/wartezeiten/` wörtlich „Suche in der Live-Liste nach Voltron, WODAN oder Silver Star" — ein Verweis auf ein UI-Element, für einen Extraktor null Information.

**(e) Aktualitätssignale.** Vierfach redundant bei zeitkritischen Aussagen: sichtbarer Klartext, `<time datetime>`, `dateModified` im JSON-LD (fehlt heute auf allen drei Kernrouten), `<lastmod>` in der Sitemap (fehlt komplett).

**(f) Es funktioniert bereits.** Bei einer Suche nach „Europa Park resort pass annual pass sold out" erscheint `/en/` zwischen den offiziellen Mack- und Europa-Park-Seiten, und die generierte Zusammenfassung übernimmt die Seitensätze wörtlich `[belegt aus Recherche]`. Das Muster existiert — es ist nur auf den ResortPass-Cluster beschränkt.

**(g) robots.txt korrekt halten.** Aktuell sind zwei tote Tokens gelistet (`anthropic-ai`, `Claude-Web`) und die heute zitat-erzeugenden Bots fehlen. Neu aufnehmen: `Claude-User`, `Claude-SearchBot`, `Perplexity-User`, `Applebot-Extended`, `Amazonbot`, `MistralAI-User`, `DuckAssistBot`, `Google-CloudVertexBot`. `Bytespider` sperren (höchste Crawl-Last, kein zitierendes Endprodukt). Trainings-Crawler bewusst erlauben — bei einem MIT-lizenzierten Community-Projekt ohne Werbeerlöse gibt es nichts zu schützen, und Modellkenntnis der Entität zahlt direkt auf das Ziel ein. Diese Entscheidung als Kommentar in der Datei dokumentieren, damit sie nicht versehentlich gekippt wird.

### 6.2 Plausibel, aber unbelegt

**Schema-Markup als Zitat-Hebel — widerlegt.** Die beste kontrollierte Studie (1.885 Seiten mit neu ergänztem JSON-LD gegen 4.000 gematchte Kontrollseiten) findet: AI Overviews −4,6 %, AI Mode +2,4 %, ChatGPT +2,2 % — alles im Rauschen. Google schreibt selbst „no special schema.org structured data that you need to add". Die verbreitete Behauptung „40–60 % mehr Zitate durch Schema" ist nicht haltbar. **Konsequenz:** Markup nur für Entitäts-Auflösung (Organization, Person, `sameAs`, ein zentraler `AmusementPark`) und für den eigenen `Dataset`. `HowTo` streichen — Google hat die Rich Results 2023 abgeschaltet. `Product`/`Offer` und `ItemList` sind vertretbar, aber niedrig priorisiert.

**llms.txt — überwiegend Kult.** Google schreibt in der Primärdoku, es brauche keine „AI text files"; keine der vier Anbieter-Crawler-Dokumentationen erwähnt die Datei; John Mueller verglich sie öffentlich mit dem keywords-Meta-Tag. Empfehlung: behalten (kostet nichts), die drei Bugs beheben (`{year}`, Grössenkonvention umdrehen — `llms.txt` ist 79.877 B, `llms-full.txt` nur 20.335 B, harte Fakten nach oben), dann **nichts mehr investieren**. Die Energie gehört in den RSS-Feed, der nachweislich abgerufen wird.

**Drittseiten-Erwähnungen — stark korreliert, kausal unbelegt.** Der Survey ordnet die Evidenz ausdrücklich als „observational" ein, und ein Teil der Reddit-Dominanz ist schlicht einlizenziert. Off-Site ist eine begründete Wette. Die plausibelste: **Der Tracker ist eine Nachricht.** „ResortPass wieder verfügbar" hat regionalen und Fach-Nachrichtenwert. Die Mitteilung vorbereiten, **bevor** es eintritt — mit Zahlen aus der eigenen Chronik. Das Alleinstellungsmerkmal ist die Zahl, die sonst niemand hat.

**Genauer Wirkungsgrad einzelner Passagen-Formate.** Die in GEO-Blogs kursierenden Zahlen („8–12 Unterfragen", „optimale Passagenlänge 134–167 Wörter", „44,2 % der Zitate aus den ersten 30 % eines Dokuments") sind nirgends bestätigt und stammen aus Anbieter-Reverse-Engineering ohne offengelegte Methodik. Der Mechanismus ist belegt, die Zahlen sind es nicht.

### 6.3 Erwartungsmanagement

Cloudflare veröffentlicht Crawl-zu-Referral-Verhältnisse: Anthropic je nach Zeitraum 10.300 : 1 bis 70.900 : 1, OpenAI ca. 900–1.276 : 1, Perplexity ca. 193 : 1 — gegenüber ca. 5 : 1 bei Google. **GEO erzeugt Präsenz, kaum Traffic.**

Die Erfolgsdefinition lautet deshalb nicht „Klicks aus ChatGPT", sondern: *Wenn jemand eine AI fragt, ob der ResortPass gerade kaufbar ist, kommt die richtige Antwort — idealerweise mit Nennung der Quelle.* Deshalb muss im server-gerenderten HTML jeder Kernseite ein knapper Satz stehen, der Markennamen und Domain trägt.

### 6.4 Messung ohne Tracking

Vier Signale, absteigend nach Aussagekraft:
1. **Server-Logs nach User-Agent.** `ChatGPT-User`, `Perplexity-User`, `Claude-User` feuern nur, wenn gerade ein Mensch fragt — das direkteste verfügbare Signal. Verifizierbar über die publizierten IP-Listen.
2. **Referer-Header** (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`), plus `?utm_source=chatgpt.com`. Bekannte Lücke: die native Claude-App sendet keinen Referer.
3. **Google Search Console**, „Search Generative AI"-Bericht seit 3. Juni 2026 — nur Impressionen, keine Klicks, keine Queries.
4. **Manuelle Stichproben**, 30–50 feste Prompts, monatlich, in fünf Modellen, mindestens DE/EN/FR/NL. Die einzige Methode, die auch Zero-Click-Erwähnungen ohne Link erfasst.

`[Datenschutz]` Access-Logs enthalten IPs. `deploy/Caddyfile` rollt heute nach Grösse (`roll_size 10MiB, roll_keep 3`), nicht nach Frist. Vor der Auswertung: Aufbewahrungsfrist festlegen, IPs nach Aggregation verwerfen, und die Datenschutzerklärung um Server-Logs, `localStorage`-Favoriten und URL-State ergänzen. Ehrliche Aufwandseinschätzung zu Punkt 4: 2–4 Stunden pro Monat, dauerhaft — das ist der teuerste Dauerposten des ganzen Plans und sollte quartalsweise statt monatlich laufen, wenn die Zeit knapp wird.

---

## 7. Was man sonst noch machen könnte

Priorisiert nach Wirkung geteilt durch Aufwand, mit ehrlicher Einschätzung.

| Idee | Wirkung | Aufwand | Einschätzung |
|---|---|---|---|
| **Silver-Sperrtage-Kalender** | hoch | M | Ein Wartezeiten-Anbieter besetzt derzeit eine reine ResortPass-Frage. Auf einer Domain namens `resortpass-europapark.ch` ist das eine offene Flanke. Verknüpfbar mit Prognose und Wartezeiten. **Machen, sobald M1/M2 stehen.** |
| **Ausverkauft-Kalender Tagestickets** | sehr hoch | M | Der grösste unbesetzte USP im ganzen Markt. `checkAvailabilityUrl` existiert im Shop-HTML und antwortet als JSON. **Aber**: keine offene API-Lizenz. Erst anfragen, dann bauen — sonst wiederholt man den PQT-Fehler mit einem zweiten Anbieter. |
| **Bright Sky / DWD-Unwetterwarnung** für die Warnzelle „Gemeinde Rust" | mittel-hoch | S | Key-frei, CC BY, punktgenau. Bei Gewitter schliessen die Achterbahnen — das ist genau die Information, die im Park fehlt und die niemand liefert. Halber Tag. Bestes Verhältnis im ganzen Katalog. |
| **Schulferien-Kalender** (OpenHolidaysAPI, key-frei, DE-BW/CH/FR-GE/NL) | mittel-hoch | M | Der Hauptreiber des Andrangs. Als Kontextzeile in der Prognose („In BW, im Elsass und in Basel gleichzeitig Ferien") erklärt es den Index, ohne ihn zu verändern — damit lizenzsauber. |
| **`/oeffnungszeiten/`** | mittel-hoch | S | Eigener Suchcluster, Daten liegen vor. Bereits als M3 eingeplant. |
| **iCal-Feed** (Saison, Veranstaltungen, Ferien) | mittel | S | Bindet dauerhaft ohne ein einziges Tracking-Pixel, niemand im Umfeld bietet es an. **Wichtige Korrektur zu Konzept 2:** Öffnungszeiten kommen aus `/api/crowd-calendar`, also von ParkQueueTimes. Ein iCal-Export davon ist maschinenlesbare Weiterverteilung. **Nur mit eigenen bzw. redaktionell belegten Daten bauen** (Saisonblöcke aus `facts.ts`, Ferien aus OpenHolidays) — nicht aus dem PQT-Payload. |
| **Anreise & Parken** mit Schweiz-Sektion | mittel | M | RailCoaster Zürich–Ringsheim, Kombiticket ab 99 CHF. Naheliegendste eigene Nische für eine `.ch`-Domain. |
| **Vollständige Höhen-/Alters-/Zugangsmatrix** | mittel | L | Reine Fleissarbeit, aber der stärkste Long-Tail-Hebel im Familiensegment und genau das Tabellenformat, das LLMs übernehmen. Bereits als M11 eingeplant. |
| **`/europa-park-bei-regen/`** | mittel | M | Cluster ist mit statischen Ratgebern dicht besetzt, aber niemand verbindet ihn mit Live-Daten: „Von den X Indoor-Attraktionen melden gerade Y Betrieb." |
| **Neuheiten 2026** (Monaco als 18. Themenbereich) | mittel | S | Saisonthema, das die Seite komplett verschweigt. Jahresneutraler Slug mit Jahres-Sektionen. |
| **Embed-Snippet für die eigenen Daten** | mittel | S | Drei Zeilen HTML für Foren und Fanblogs, mit Rücklink. `[Lizenz]` **Nur eigene Daten** — die PQT-Wartezeiten dürfen ohne Freigabe nicht per Embed weiterverteilt werden. |
| **Barrierefreiheits-Guide** | niedrig-mittel | M | Hohe Nutzerdringlichkeit, fast keine Konkurrenz. Passt exakt zur „inoffiziell, aber sauber belegt"-Positionierung. |
| **Preis-Chronik auf `/resortpass-preise/`** | niedrig-mittel | S | Der Substanzblock, der diese Seite von den vier Schwesterseiten unterscheidet. Fällt mit M5 zusammen. |
| **Rulantica-Tab in den Wartezeiten** | unklar | M | `[ungeklärt]` Der Codekommentar sagt, Park 31 enthalte Rulantica, die Live-Antwort ist aber bereits gefiltert. Ob Rulantica-Rutschen überhaupt Wartezeiten publizieren, ist nicht verifiziert — **vor jeder Planung mit einem Rohabruf prüfen.** |

---

## 8. Bewusst nicht empfohlen

Geprüft und verworfen. Das schützt vor Aufwandsverschwendung.

| Verworfen | Begründung |
|---|---|
| **Domainwechsel** | Kostet einen Einzelbetreiber Monate und verbrennt das einzige vorhandene Ranking-Asset. Der `.ch`-Nachteil ist real, aber ohne Search-Console-Zahlen nach Land nicht entscheidbar. Frühestens nach 6 Monaten Datensammlung. |
| **`bcp47` / `og:locale` von `de-CH` auf `de-DE`** | Wurde als „kostenloser Quick Win" gehandelt. Google nutzt weder das `lang`-Attribut noch `og:locale` zur Sprach- oder Geobestimmung; der Effekt wäre **null**, und es bricht die Systematik der anderen 14 Sprachen (en-GB, nl-NL, sv-SE …). |
| **Native App** | Der Store ist besetzt (EPbuddy, ParkPing, coaster.cloud, MagicWait, offizielle Queue-Times-App). Der Stack passt nicht. Und Nutzer nennen „ohne App, ohne Werbung, ohne Cookie-Frage" selbst als Verkaufsargument. |
| **Service Worker / PWA-Offline** | Auf einer Site mit gehashten Astro-Assets, 17 Sprachen und rsync-Deploys ist er eine dauerhafte Cache-Invalidierungs-Fehlerquelle. Der Nutzen ist nicht gemessen. `stale-while-revalidate` plus ETag liefert 80 % davon ohne neue Laufzeit. |
| **Web Push als Alert-Kanal** | Auf iOS nur nach Homescreen-Installation. Bei einem Ereignis, das einmal jährlich für ca. 60 Stunden eintritt, ist die Installationswahrscheinlichkeit nahe null. Zweiter Kanal mit eigener Fehlerquelle, ohne Nutzenrechnung. Erst wenn die E-Mail-Pipeline nachweislich schnell genug ist. |
| **Wettrennen um Wartezeiten-Rohdaten** | 14+ spezialisierte Anbieter, darunter der eigene Datenlieferant mit eigener SEO-Landingpage. Nicht frontal gewinnbar. Gewonnen wird über Sprache (fr/nl/it), Kontext (Wartezeit + Prognose + Öffnungszeiten in *einer* Antwort) und Entscheidung („Was fahre ich jetzt?"). |
| **`HowTo`-Schema** | Google hat die Rich Results 2023 abgeschaltet. Kein Gegenwert. |
| **Weitere Schema-Typen auf Verdacht** | Die beste kontrollierte Studie zeigt Effekte im Rauschen, bei AI Overviews sogar −4,6 %. Die vorhandenen 714 JSON-LD-Blöcke reichen. Investiert wird in sichtbaren Fliesstext. |
| **Weiterer Ausbau von `llms.txt`** | Kein grosser Anbieter wertet sie nachweislich aus, Google sagt es explizit. Bugs beheben, dann Schluss. |
| **Drei-Spalten-Desktop-Layout für `/wartezeiten/`** (Konzept 1, Phase 9) | 1–2 Tage für eine Seite, deren erklärte Hauptnutzung „im Park, eine Hand, Sonne" ist. Der genannte Zweck — interne Verlinkung — ist mit einem Streifen unter der Liste erledigt. |
| **„Park-Puls" als 17-Kachel-Matrix** | Die geprüften Findings zeigen: Die Bereichssuche **funktioniert bereits**, sie ist nur unentdeckbar. Der belegte Fix ist ein geänderter Placeholder plus Filterchips (S). Die Kachelmatrix (M) ist die teure Variante desselben Nutzens. |
| **Schematische SVG-Parkkarte** | Reizvoll, aber markenrechtlich heikel (keine Nachzeichnung des offiziellen Parkplans) und L-Aufwand für einen Nutzen, den Bereichs-Chips zu einem Bruchteil liefern. |
| **Uptime-Balkendiagramm über 150+ Tage** auf der Startseite | 150 identisch rosa Balken. Der Satz „Seit 150 Tagen unverändert · 14.034 Prüfungen" leistet dasselbe für 5 Minuten Aufwand. Auf der Chronik-Route sinnvoll, auf der Startseite nicht. |
| **`nextReviewAt` für Attraktionsnamen** | Ein deutscher Attraktionsname ist kein Fakt mit Verfallsdatum. 36 Einträge in einen Review-Zyklus zu hängen ist reine Pflegelast. |
| **`.ics`-Export von Öffnungszeiten aus dem PQT-Payload** | Maschinenlesbare Weiterverteilung. Der iCal-Feed wird nur mit eigenen bzw. redaktionell belegten Daten gebaut. |
| **Wikipedia-Eintrag** | Relevanzkriterien nicht erfüllt, Selbsteintrag ist regelwidrig. |
| **Gutschein-, Deal- oder Affiliate-Inhalte** | Würde die werbe- und trackingfreie Positionierung beschädigen — und genau diese Neutralität ist der Grund, warum LLMs bei Preisfragen zitieren, weil die Alternative durchgehend kommerziell verzerrt ist. |
| **Redaktionelle „Community-Tipps"** als Platzhalter | Als Community-Beiträge getarnte Redaktionsinhalte würden die Ehrlichkeits-Positionierung beschädigen. Die Sektion wird stattdessen ausgeblendet, bis echte Tipps da sind. |
| **KI-generierte Füllmeldungen, „Wusstest du"-Trivia als Nachricht, Countdown auf ein unangekündigtes Datum** | Alles, was Aktivität simuliert, wo keine ist. Der Ruhezustand wird bewusst ruhig gestaltet. |

---

## 9. Randbedingungen und Risiken

### 9.1 ParkQueueTimes-Lizenz

**Stand:** Free-Tier erlaubt inzwischen auch kommerzielle Nutzung, sofern „Powered by ParkQueueTimes.com" mit Link angezeigt wird; 60 Requests/Minute, 10.000/Tag. Die AGB sind strenger als die Entwicklerseite: §5 untersagt Weiterverteilung und abgeleitete Dienste, §6 verlangt für abgeleitete Werke ausdrückliche schriftliche Erlaubnis, §8 untersagt die Weitergabe roher API-Daten. Historien- und Analytics-Endpunkte sind angekündigt, aber noch nicht verfügbar. Der Zugriff braucht inzwischen einen `x-api-key`.

**Was heute schon problematisch ist:** `/api/wait-times` und `/api/crowd-calendar` sind öffentlich und ohne Schlüssel abrufbar — faktisch Weitergabe roher Daten. **Sofort absichern** (S6), unabhängig von der Antwort auf F4.

**Was ohne Freigabe gebaut werden darf:** Anzeige der aktuellen Werte mit Attribution im selben Sichtfeld; Attraktionsnamen und Themenbereiche (eigenes Repo-Wissen); Aggregate des Momentanzustands; ein flüchtiger Client-Trendpfeil.

**Was nicht:** Historie, Zeitreihen, Heatmaps, „typischerweise 60 Min um 14 Uhr", `Dataset`- oder `ItemList`-Markup über Minutenwerte, `.ics`-Export von Öffnungszeiten, öffentliche Rohdaten-Endpunkte, Embeds mit PQT-Werten.

**Zusätzliches Risiko:** Ein stiller Ausfall, falls der Server den `x-api-key` nicht mitsendet. Prüfen und in `/api/health` sichtbar machen. Als Absicherung gegen Einzelanbieter-Abhängigkeit `[Annahme]`: eine kostenlose Zweitquelle evaluieren, aber nicht parallel betreiben — zwei Quellen bedeuten zwei Lizenzregime.

### 9.2 Markenrecht und inoffizieller Status

Der Disclaimer und die Attribution existieren. Beim Ausbau gilt:
- **Keine Vereinnahmung als offizieller Kanal.** Verweise auf den Ticketshop bleiben Verweise auf Dritte.
- **Keine Nachzeichnung des offiziellen Parkplans.** Eine eigene, bewusst abstrahierte Darstellung mit sichtbarem Hinweis wäre zulässig — sie steht aber unter „nicht empfohlen".
- **Eigene Formulierungen**, keine Übernahme von Texten aus europapark.de.
- **Im Schema-Graph** zeigt `brand`/`seller` auf Europa-Park bzw. MackInternational, `publisher` bleibt strikt „ResortPass Tracker". Das ist zugleich das stärkste maschinenlesbare Nicht-Zugehörigkeits-Signal.
- **Neue Bilder** mit derselben Sorgfalt wie bisher (`licensedMedia` führt Revisions-SHA1, Attribution und lokalisierte Bearbeitungsangabe; das Rulantica-Foto wurde wegen erkennbarer Kinder bewusst nicht verwendet).
- **Beim Ausverkauft-Kalender**: Der Mack-Shop hat keine offene API-Lizenz. Anfragen, nicht abrufen.

### 9.3 Kein-Tracking-Versprechen

Das Versprechen ist ein Verkaufsargument, das nachweislich zieht. Es wird von keiner Massnahme dieses Plans gebrochen — aber drei Dinge brauchen Nachführung:

- **`localStorage`-Favoriten und URL-State** sind kein Tracking (kein Netz-Request, kein Cookie, keine Profilbildung), gehören aber in die Datenschutzerklärung. Und: Der Satz „Wird nur in deinem Browser gespeichert" gehört sichtbar an den Block — dann ist es ein Beweis statt einer Erklärungslast.
- **Server-Log-Auswertung** ist zulässig, aber `deploy/Caddyfile` definiert heute nur `roll_size`/`roll_keep`, keine Aufbewahrungsfrist. Frist festlegen, IPs nach Aggregation verwerfen, Vorgehen dokumentieren.
- **Kein Analytics, keine Cookies, keine Werbung, keine Affiliate-Links** — auch nicht „nur einmal für den Preisvergleich".

Positiv gewendet: Eine strenge CSP wäre für diese Site der überprüfbare Beleg des Versprechens. Heute fehlt sie ebenso wie HSTS, während der wirkungslose `X-XSS-Protection`-Header noch gesetzt ist. Als Report-Only-Rollout ein guter Kandidat für Quartal 2.

### 9.4 Wartbarkeit als Ein-Personen-Projekt

Das ist die Randbedingung, an der Pläne dieser Art normalerweise scheitern.

**Die Abbruchlinie.** Wenn nur fünf Tage zur Verfügung stehen, sind es diese: S0 (Blockerfragen), S1 (Soft-404), S3/S3b (Status im HTML), S4 (Attraktionen im HTML), K4 (Level-A-Verstoss). Alles andere ist verschiebbar. Diese fünf beheben den einzigen Konformitätsverstoss, den teuersten SEO-Defekt und den einzigen Fehler, der am Verkaufstag Schaden anrichtet.

**Die Freeze-Regel.** Der Verkaufsstart ist unvorhersehbar, und die letzten Fenster lagen in der Winterpause. Deshalb: **Ab dem ersten `available`-Signal keine Deploys ausser Hotfix.** Die Alert-Pipeline wird vor jedem Deploy end-to-end getestet und nie im selben Deploy wie eine UI-Änderung angefasst.

**Das CI-Gate darf nicht zur Selbstblockade werden.** 19 Fakten tragen `nextReviewAt: 2026-08-15`. Wenn das Gate nicht sauber trennt — `validUntil` überschritten = Build rot, `nextReviewAt` überfällig = Warnung plus sichtbarer UI-Hinweis — ist die Seite ab einem Stichtag nicht mehr deploybar, bis jemand Preise prüft. Für ein Nebenprojekt heisst das: eine Urlaubswoche legt das Deployment lahm.

**Rollback.** Bei 301-Redirects, die nie zurückgenommen werden dürfen, und einer Caddy-Instanz ausserhalb des Deployments braucht es einen definierten Weg zurück: die laufende Caddy-Config vor F1 sichern, `dist` vor jedem rsync als datierte Kopie behalten, und in `deploy.sh` ein `--rollback`-Flag vorsehen.

**Sprachpolitik: zwei Tiers.** Europa-Park betreibt seine eigene Website in exakt fünf Sprachen (de, en, fr, it, nl) `[belegt aus Recherche]` — der belastbarste verfügbare Nachfrage-Proxy.
- **Tier 1 (de, en, fr, nl, it):** alle neuen Routen, redaktionell gepflegt.
- **Tier 2 (12 weitere):** nur Startseite, Wartezeiten, Prognose, Guide-Hub. **Neue Feature-Routen bewusst nicht ausrollen.** Keine harten Preis- oder Terminangaben ohne aktuelles Prüfdatum — im Zweifel Fakt weglassen statt veralten lassen.

Nicht löschen: Der Long-Tail ist gratis, solange der Build automatisiert ist. Er darf nur nichts Falsches behaupten. **Dies löst zugleich einen Widerspruch in Konzept 3 auf**, das die Tier-Regel aufstellt und zwei Kapitel weiter zwei neue Routen „17 Sprachen" plant.

**Konventionen, die jetzt festgelegt werden, damit sie nicht zweimal umgezogen werden müssen:**

| Entscheidung | Festlegung | Grund |
|---|---|---|
| Chronik-Route | `/resortpass-verlauf/` | Kürzer, näher am Markennamen. Konzept 3 verwendet `/verfuegbarkeits-verlauf/` und schreibt es bereits in JSON-LD-Vorschläge — dort korrigieren. |
| Über-uns-Route | `/methodik/` | Beschreibt, was drinsteht. `Person.url` im Entity-Graph zeigt dorthin, nicht auf `/ueber-uns/`. |
| FR-Slug Wartezeiten | `/fr/temps-d-attente/` | Korrekte französische Schreibweise mit Bindestrich. |
| Dauerhaftes Prüfdatum | pro Fakt, nie global | siehe M4 |

**Neue Dauerpflichten, ehrlich beziffert:** `rides.ts` und `ride-names.ts` (36 Einträge, einmalig), `attractions.ts` von 6 auf 40+ (L, einmalig, dann quartalsweise Review), Saison-/Winterpausendaten (jährlich), Sperrtage (jährlich), Incident-Log (ereignisgetrieben), LLM-Stichproben (quartalsweise, 1–2 Stunden). Das ist tragbar. Alles darüber hinaus ist es nicht.

---

## 10. Die ersten zehn Arbeitsschritte

In dieser Reihenfolge. Die Abhängigkeiten sind real, nicht kosmetisch.

**1. Blockerfragen beantworten** *(halber Tag, kein Code)*
SSH auf den Server: laufende Caddy-Config diffen, `/srv/www` gegen `/opt/resortpass-tracker/dist` prüfen, feststellen ob die Instanz weitere Sites bedient. Parallel: den Lizenzbrief an ParkQueueTimes absenden (fünf Fragen aus Abschnitt 3, F4). *Ohne Schritt 1 sind die Schritte 2, 4 und 5 nicht terminierbar.*

**2. Juni-Datenpunkt forensisch klären** *(1–2 Stunden)*
`sqlite3` gegen `availability_history`, alle `available = 1`-Zeilen mit Zeitstempel; gegen die Checker-Logs halten. Ergebnis in `journal/` dokumentieren. *Bis dahin wird die Chronik-Route nicht gebaut und der Datenpunkt in keinem Markup verwendet.*

**3. `deploy.sh` schreiben und einmal durchspielen** *(2–3 Stunden)*
Build, `verify:seo`, `verify:static`, rsync mit datierter Sicherung, Smoke-Test. Plus `--rollback`. *Der Weg auf den Server muss existieren, bevor irgendetwas ausgerollt wird.*

**4. Soft-404 beheben** *(halber Tag, Wartungsfenster)*
Repo-Caddyfile ausrollen, `file_server { status {err.status_code} }` im `handle_errors`-Block ergänzen. Verifizieren: erfundene URL → 404, `/wartezeiten` → 308, `/wartezeiten/index.html` → 308, `/sitemap.xml` → 308, `/404.html` → noindex. Laufende Config vorher sichern. *Blockiert alle späteren Redirects.*

**5. Status ins HTML bringen** *(1–2 Tage)*
Bevorzugt über den Checker (Fragment nach `dist/fragments/`, **nicht** unter `/api/*`, plus `templates`-Direktive in Caddy). Falls F1 das ausschliesst: Build-Zeit-Fetch mit täglichem Deploy. In beiden Fällen: Hero-Pills, StatusCards, `info.why_text` und FAQ-JSON-LD aus derselben Quelle, sichtbarer „Stand"-Zeitstempel, `dateModified`, wechselfeste FAQ-Formulierung, inaktive Statuszweige nicht mehr rendern.

**6. Attraktionen ins HTML bringen** *(1 Tag)*
`EUROPA_PARK_RIDE_LANDS` nach `src/data/rides.ts`, 36 `<li>` zur Build-Zeit mit Name, Themenbereich und Anker-ID; **Fehlerpfad überschreibt die Platzhalter**. Dazu `{year}`-Bug in `llms.txt.ts:29` plus Build-Guard, und `/api/wait-times` sowie `/api/crowd-calendar` auf die eigene Origin beschränken.

**7. Live-Smoke-Test und Messbaseline** *(halber Tag)*
`scripts/verify-live.ts` mit neun Assertions in `deploy.sh` einhängen. Log-Auswertungsskript einmal laufen lassen, 30-Prompt-Stichprobe einmal durchführen und in `journal/` ablegen. *Ab hier ist jede weitere Änderung messbar.*

**8. Level-A-Verstoss und Entity-Graph** *(1 Tag)*
Label-in-Name in sieben Locales beheben (`sr-only`-Span statt `aria-label`-Override), Unit-Test über alle 17 in `site-header-model.ts`. Entity-Graph mit `sameAs` auf das GitHub-Repo, GitHub-Link in den Footer. `logo` nur, wenn das PNG vorher existiert.

**9. Token-Schicht plus Schriftfix** *(1–2 Tage)*
`--radius-*`, `--elev-*`, `--space-section`, `--text-*` in `:root`. `DMSans-Bold.woff2` durch die Variable-Datei ersetzen, Gewichtsleiter in einem Schritt neu setzen (900/950 streichen). *Voraussetzung dafür, dass das Wartezeiten-Redesign den CSS-Wildwuchs nicht vergrössert.*

**10. Wartezeiten-Zustandsmodell** *(2–3 Tage)*
`server/park-now.ts` mit Zustandsmaschine und REFURBISHMENT-Guard, Unit-Tests für Zustandsgrenzen, Mitternacht, Zeitzone und `bulkRefurbishment`. Alle sechs Zustände im UI, Live-Band mit Countdown, Kennzahlen umgewidmet, 7-Tage-Vorschau, Verzeichnis-Modus. `/api/health` um `matchedRides` und `unknownRideNames` erweitern — mit dem Hinweis, dass es heute **kein** Monitoring gibt, das den Endpunkt abfragt; ein `curl`-Cronjob mit Mailversand an den Betreiber ist der billigste Weg dorthin.

**Danach** folgen Listen-Redesign (K2/K3), Startseite (K5/P1), Alert-Pipeline (K8) und die Content-Routen des Quartals. Aber die ersten zehn Schritte sind die, nach denen die Seite aufhört, ihre eigenen Stärken zu verstecken.

---

### Der eine Satz, wenn nur einer bleibt

Solange `/wartezeiten/` für einen Crawler „Aktiviere JavaScript" sagt, die Hero-Pills „Wird geprüft…" und es keinen dokumentierten Weg gibt, eine Korrektur auf den Server zu bringen, ist jede weitere Massnahme dieses Plans wirkungslos — und alles andere darin baut darauf auf.