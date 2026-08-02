# Umsetzungsstand

Stand: 1. August 2026. Branch `audit-umsetzung`.

## Umgesetzt

### Maschinenlesbarkeit (die P0-Blocker)
- `/wartezeiten/` liefert alle 36 Attraktionen nach Themenbereich im HTML aus.
  Quelle: `src/data/rides.ts` — eigene redaktionelle Daten, keine Lizenzfrage.
  `server/wait-times.ts` liest dieselbe Liste, Verzeichnis und Feed können nicht auseinanderlaufen.
- Der ResortPass-Status wird zur Build-Zeit aufgelöst (`src/data/status-snapshot.ts`).
  Nur der wahre Zweig steht im Markup; `Jetzt kaufen` wird clientseitig erzeugt, wenn der Shop
  wirklich öffnet. Der Build bricht nie an einer unerreichbaren API.
- Die FAQ-Antwort folgt dem Snapshot statt einem eingefrorenen „Nein." und trägt ihr Prüfdatum.
- `llms.txt` ist wieder ein Index (vorher 80 KB gegen 20 KB „full"), `llms-full.txt` dokumentiert
  alle drei Live-Dienste und das Attraktionsverzeichnis. 17 `{year}`-Platzhalter behoben,
  Build-Guard gegen unaufgelöste Platzhalter ergänzt und gegengeprüft.

### Wartezeiten-Erlebnis
- `server/park-now.ts`: sechs Betriebszustände aus dem Zeitplan, vier Datenqualitätsstufen,
  22 Tests inklusive Mitternacht, Zeitzone und Zustandsgrenzen.
- Wartungs-Guard: 26 von 36 Bahnen als `REFURBISHMENT` bei geschlossenem Park werden nicht mehr
  als Tatsache gerendert.
- Fünf Wartezeit-Stufen statt drei, vier redundante Kodierungen pro Zeile.
- Zeilenhöhe 106 → 64 px, ein Rahmen statt 36, klebende Bereichsköpfe, Filter mit Trefferzahl,
  Favoriten in `localStorage`.
- „Jetzt am kürzesten" beschränkt auf die Publikumsmagneten.
- 40 neue Übersetzungsschlüssel in allen 17 Sprachen, je Sprache übersetzt und gegengeprüft.

### Barrierefreiheit
- WCAG 2.5.3 (Level A): Label-in-Name in sechs Sprachen behoben, Test über alle 17.
- WCAG 2.4.7: Fokusring der Filter-Buttons wird nicht mehr abgeschnitten.
- `aria-live` in sechs Planungstools und im Verlauf auf die Zusammenfassung verkleinert, mit Test.
- Klebende Elemente versetzen gegen gemessene Header- und Bandhöhe statt gegen Schätzwerte.

### Auffindbarkeit
- Entity-Graph auf jeder Seite: Organization, Person, WebSite, ein gemeinsamer `AmusementPark`.
  Vorher: null `sameAs` im gesamten Build.
- Neue Route `/methodik/` in fünf Sprachen mit Korrekturprotokoll.
- `robots.txt` korrigiert: tote Tokens raus, `Disallow` greift wieder für alle Bots,
  Bytespider gesperrt, Entscheidung im Kommentar begründet.
- Sitemap mit `lastmod` aus dem redaktionellen Prüfdatum.

### Betrieb
- Alert-Pipeline: SMTP-Pool, begrenzte Nebenläufigkeit, vom Check entkoppelt, `ALERT_DRY_RUN`,
  Drain vor Prozessende. Vorher ≥ 442 s reine Wartezeit bei 885 Abonnenten.
- `/api/wait-times` und `/api/crowd-calendar` nur noch für die eigene Origin.
- `deploy/deploy.sh` mit Verifikation, datierter Sicherung, Smoke-Test und `--rollback`.
- `scripts/verify-live.ts`: 19 Prüfungen gegen die laufende Seite.
- Caddy: 404 liefert 404, HSTS, zstd vor gzip, Aufbewahrungsfrist für Logs.

### Performance
- Das 469-KB-Übersetzungsbundle (121 KB gzip) ist vollständig aus dem Browser verschwunden.
  Vier Startseiten-Inseln zogen die vollständige 17-Sprachen-Tabelle, um 21 Strings
  nachzuschlagen, und blockierten damit jeden API-Aufruf der Seite. Startseiten-JS: 480 KB -> 10,4 KB,
  Build-JS gesamt: 490 KB -> 12,5 KB.

### Inhalte und Startseite
- Neue Route `/oeffnungszeiten/` in fünf Sprachen, mit vier Evergreen-Antworten, die auch
  ohne die Live-Tabelle tragen.
- Alle 36 Attraktionen mit echten Alters- und Grössengrenzen, von den offiziellen Seiten
  extrahiert (`scripts/scrape-attraction-limits.ts`), nie geschätzt. Der Familien-Finder
  kannte vorher 6 von über 100. Dabei gefunden und korrigiert: zwei Bahnen mit 130 cm
  Mindestgrösse wurden als grenzenlos ausgewiesen, weil die Seite den Bereich
  „120 bis 195 cm" statt „120+ cm" schreibt.
- Silver Star liegt laut Betreiberseite in **Monaco**, dem 2026 eröffneten 18. Themenbereich,
  nicht in Frankreich. Der Provider-Feed meldet noch den alten Bereich.
- Sechs Planungswerkzeuge waren von der Startseite aus in keiner Sprache erreichbar. Neuer
  Block „Besuch planen", gebaut aus den vorhandenen Ratgeber-Texten, also sofort in allen 17 Sprachen.
- Die Community-Sektion beanspruchte im Leerzustand eine volle Sektion; sie klappt jetzt
  auf eine Zeile zusammen, bis es echte Tipps gibt.

### Sonstiges
- `DMSans-Bold.woff2` war ein Duplikat der Regular-Datei — jeder Fettdruck war synthetisch,
  Gewichte über 700 wirkungslos. Eine Variable-Datei, 59 KB weniger.
- Prüfdatum von 39 Stellen auf eine zentralisiert.
- Design-Tokens in `:root`, angewandt auf die neu gebauten Komponenten.

## Ausgeliefert

Alles oben Genannte läuft seit dem 1. August 2026 auf `www.resortpass-europapark.ch`.
`bun run verify:live` prüft **24 von 24** Punkten grün gegen die Produktion.

Die Server-Topologie war anders als das Repo behauptete und ist jetzt korrekt abgebildet:
Ein einziger Caddy-Container bedient rund 20 Site-Blöcke aus 11 Dateien für sieben weitere
Produktivsysteme (kizi prod+staging, prämienfuchs, cyberversicherung, diisi, eigernest, maus).
Die massgebliche Fragmentdatei liegt unter `/opt/infrastructure/caddy/sites.d/resortpass.caddy`,
das Build unter `/opt/resortpass-tracker/dist` (read-only nach `/srv/www` gemountet).
Die Repo-Fassung `deploy/Caddyfile` beschrieb eine Topologie, die es nicht gibt — sie hätte
beim Ausrollen sieben fremde Sites offline genommen. Massgeblich ist jetzt
[deploy/resortpass.caddy](../deploy/resortpass.caddy).

Die Soft-404-Ursache war exakt eine Zeile: `try_files … /index.html` — ein SPA-Muster auf
einer statischen Mehrseiten-Site. Jede Konfigurationsänderung wird vor dem Reload mit
`caddy validate` gegen die **gesamte** Konfiguration geprüft; schlägt sie fehl, bleibt die
alte Fassung live. Sicherungen liegen datiert unter `/opt/resortpass-releases/`.

**Zusätzlich live gegangen:** Slug-Korrektur für die drei reichweitenstärksten Fremdsprachen
(`/en/wartezeiten/` → `/en/wait-times/`, `/fr/` → `/temps-d-attente/`, `/it/` → `/tempi-di-attesa/`
sowie die drei Impressum-Pfade), jeweils mit dauerhafter 301-Weiterleitung. Ein Test in
`src/i18n/routes.test.ts` erzwingt, dass jeder stillgelegte Pfad eine Weiterleitung hat und
nie wiederverwendet wird.

### Beim Ausrollen gefunden

- **`SYNC_DIST` ist kein toter Rest.** Das Audit hielt die Variable für unbenutzt; sie wird
  vom Entrypoint im `Dockerfile` gelesen und ist standardmässig `1`. Der API-Container
  kopierte damit bei **jedem Neustart** den im Image gebackenen `dist` über das per rsync
  ausgelieferte Verzeichnis — `cp -a` überschreibt, ohne zu löschen, also wären alte Seiten
  zurückgekommen und neue geblieben. Das hätte die lokalisierten Slugs stillschweigend
  rückgängig gemacht. Der Checker hatte `SYNC_DIST=0`, die API nicht. Jetzt beide, und ein
  Neustart-Test bestätigt, dass der Deploy ihn übersteht.

## Bewusst offen

**Braucht eine Entscheidung oder Auskunft:**
- **Der Verfügbarkeitstreffer im Juni 2026.** `/api/history/silver` meldet `available_checks: 1`,
  während der 19.-März-Fehlalarm bereits per SQL ausgeschlossen ist. Es gibt also einen zweiten,
  unerklärten Treffer. Bis das geklärt ist, wurde die Chronik-Route **nicht** gebaut — sonst
  würde womöglich ein Fehlalarm zur zitierfähigen Primärquelle.
- **Lizenzbrief an ParkQueueTimes** (fünf Fragen im Masterplan, Abschnitt 3/F4). Blockiert
  Tagesverlauf, Heatmap und jede eigene Zeitreihe.

**Bewusst nicht umgesetzt — eine inhaltliche Entscheidung, keine technische:**
- **Entkannibalisierung der ResortPass-Seiten (M5).** Fünf Seiten teilen 86 % ihres Textes.
  Der Masterplan schlägt vor, `/resortpass-reservierung/` und `/resortpass-rulantica/` in
  `/resortpass-guide/` einzufalten und per 301 umzuleiten. Das entfernt zwei indexierte
  Seiten in 17 Sprachen — 34 URLs. Technisch ist der Weg jetzt frei; ob die Seiten
  verschwinden sollen, ist eine redaktionelle Entscheidung des Betreibers, keine, die ein
  Audit alleine treffen sollte.

**Nicht angefangen:**
- Vollständiger Startseiten-Umbau auf die im Masterplan skizzierte Zielhöhe. Die drei
  wirksamsten Teile sind umgesetzt (Status statisch, Werkzeuge sichtbar, leere Sektion
  eingeklappt); die weitere Straffung ist Feinarbeit ohne Blocker.

Reihenfolge und Begründung: [00-MASTERPLAN.md](00-MASTERPLAN.md), Abschnitt 4 und 10.

## Prüfstand

    bun test          138 bestanden, 0 fehlgeschlagen
    bun run typecheck sauber
    bun run build     329 Seiten
    bun run verify:static  bestanden
    bun run verify:seo     bestanden (277 indexierbar)
    bun run verify:live    gegen die laufende Produktion — zeigt, was der Deploy noch behebt
