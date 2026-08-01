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

### Sonstiges
- `DMSans-Bold.woff2` war ein Duplikat der Regular-Datei — jeder Fettdruck war synthetisch,
  Gewichte über 700 wirkungslos. Eine Variable-Datei, 59 KB weniger.
- Prüfdatum von 39 Stellen auf eine zentralisiert.
- Design-Tokens in `:root`, angewandt auf die neu gebauten Komponenten.

## Bewusst offen

**Braucht Serverzugang — ich habe keinen:**
- Caddy-Konfiguration ausrollen. Die Repo-Fassung ist korrigiert; erst nach dem Ausrollen
  liefert eine erfundene URL 404. `bun run verify:live` zeigt den Fortschritt.
- `deploy.sh` einmal echt durchspielen (`DEPLOY_REMOTE` setzen).

**Braucht eine Entscheidung oder Auskunft:**
- **Der Verfügbarkeitstreffer im Juni 2026.** `/api/history/silver` meldet `available_checks: 1`,
  während der 19.-März-Fehlalarm bereits per SQL ausgeschlossen ist. Es gibt also einen zweiten,
  unerklärten Treffer. Bis das geklärt ist, wurde die Chronik-Route **nicht** gebaut — sonst
  würde womöglich ein Fehlalarm zur zitierfähigen Primärquelle.
- **Lizenzbrief an ParkQueueTimes** (fünf Fragen im Masterplan, Abschnitt 3/F4). Blockiert
  Tagesverlauf, Heatmap und jede eigene Zeitreihe.

**Nicht angefangen, bewusst:**
- Startseiten-Umbau (K5) über den Status hinaus, Übersetzungsbundle aus dem Client-Graph (P1),
  Entkannibalisierung der ResortPass-Seiten (M5), Slug-Korrektur en/fr/it (M6 — setzt den
  ausgerollten 404-Fix voraus), `/oeffnungszeiten/` (M3), Attraktionsdatensatz von 6 auf 40+ (M11).

Reihenfolge und Begründung: [00-MASTERPLAN.md](00-MASTERPLAN.md), Abschnitt 4 und 10.

## Prüfstand

    bun test          138 bestanden, 0 fehlgeschlagen
    bun run typecheck sauber
    bun run build     329 Seiten
    bun run verify:static  bestanden
    bun run verify:seo     bestanden (277 indexierbar)
    bun run verify:live    gegen die laufende Produktion — zeigt, was der Deploy noch behebt
