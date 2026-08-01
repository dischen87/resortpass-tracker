# Neues Wartezeiten-Erlebnis — Konzept

*Grundlage: geprüfte Audit-Findings, Wettbewerbsrecherche, Codestand vom 01.08.2026 (`src/components/WaitTimesPage.astro` 580 Z., `server/wait-times.ts` 237 Z., `server/crowd-calendar.ts` 252 Z.)*

---

## 1. Die Kernidee in einem Satz

> **Jede andere Wartezeiten-Seite zeigt Zahlen, wenn der Park offen ist — diese Seite gibt in jedem Zustand eine Antwort und beantwortet nicht „wie lang ist die Schlange", sondern „was mache ich jetzt".**

Zwei belegbare Lücken machen das zum Alleinstellungsmerkmal:

1. **Der Park ist ~62 % der Uhrzeit geschlossen** (9 von 24 Std. offen im August) **plus Winterpause ca. 10.01.–Ende März.** Alle Wettbewerber zeigen dann Striche. Wir zeigen: Öffnungszeit, Countdown, Andrang der nächsten Tage, Attraktionsverzeichnis.
2. **Die offizielle Europa-Park-App geofenced die Wartezeiten** — sie funktionieren nur im Park. Der gesamte Planungs-Use-Case liegt per Design bei Dritten. Das gehört als eigener, zitierfähiger Abschnitt auf die Seite.

Dazu kommt der strukturelle GEO-Vorsprung: thrill-data.com sperrt ClaudeBot/GPTBot/CCBot, wartezeiten.app und park.fan stehen hinter Bot-Challenges, wartezeiten.cloud setzt `ai-train=no`. Wir erlauben alle — aber unser HTML enthält heute **null Attraktionen**. Das ist der teuerste Einzelfehler des Projekts.

---

## 2. Zustandsmodell

### 2.1 Eine Quelle der Wahrheit

Heute rendert die Seite aus `/api/wait-times` allein und kennt deshalb keine Öffnungszeiten. `server/crowd-calendar.ts` hält sie bereits (`openingTime`, `closingTime`, `isOpen`, `crowdPercent`, `park.status`) — nur nutzt die Wartezeitenseite sie nicht.

**Neuer Endpunkt `/api/park-now`** (Hono, `server/park-now.ts`), der beide Caches zusammenführt und den Zustand **serverseitig** entscheidet. Der Client interpretiert nichts mehr selbst.

```ts
// server/park-now.ts
export type ParkState =
  | 'SEASON_BREAK'      // kein Betriebstag in den nächsten 7 Tagen
  | 'CLOSED_TODAY'      // heute isOpen=false, aber Saison läuft
  | 'BEFORE_OPEN'       // heute Betriebstag, jetzt < openingTime
  | 'OPENING_SOON'      // BEFORE_OPEN und Δ <= 90 Min
  | 'OPEN'              // openingTime <= jetzt < closingTime
  | 'AFTER_CLOSE';      // jetzt >= closingTime

export type DataQuality =
  | 'fresh'             // updatedAt < 15 Min
  | 'stale'             // 15–30 Min (bestehende PROVIDER_STALE_MS-Logik)
  | 'unreliable'        // Massen-REFURBISHMENT, siehe 2.3
  | 'unavailable';      // kein Cache, Provider tot

export interface ParkNowResponse {
  state: ParkState;
  dataQuality: DataQuality;
  now: string;                       // ISO, Europe/Berlin-normalisiert
  today: { date: string; openingTime: string | null; closingTime: string | null; crowdPercent: number | null };
  next: { date: string; openingTime: string; crowdPercent: number | null } | null;  // nächster Betriebstag
  upcoming: Array<{ date: string; openingTime: string | null; closingTime: string | null; crowdPercent: number | null }>; // 7 Tage
  waitTimes: WaitTimesResponse | null; // nur bei state === 'OPEN' und dataQuality !== 'unavailable'
  rideInventory: RideMasterRecord[];   // IMMER — Name, Bereich, Slug, Kategorie (eigene Daten)
  source: { name: 'ParkQueueTimes.com'; url: 'https://parkqueuetimes.com/' };
}
```

`rideInventory` kommt aus einer neuen Datei `src/data/rides.ts` (die heutige Allowlist `EUROPA_PARK_RIDE_LANDS` aus `server/wait-times.ts:10-47`, angereichert um Slug, deutschen Namen, Kategorie, Headliner-Flag). **Das sind eigene redaktionelle Daten, keine ParkQueueTimes-Daten** — sie dürfen jederzeit statisch gerendert und in JSON-LD ausgegeben werden.

### 2.2 Was jeder Zustand zeigt

| Zustand | Live-Band | Kennzahlblock | Hauptbereich | CTA |
|---|---|---|---|---|
| **OPEN** | grüner Punkt, „Live · vor 2 Min." | Offen 24 · Ø 32 Min · Max 75 Min · **Kürzeste 5 Min** | „Jetzt am kürzesten" (3 Kacheln) → Filterleiste → gruppierte Liste → Accordion „Geschlossen (9)" | Prognose · Besuchsplaner |
| **OPENING_SOON** (≤90 Min) | violetter Punkt, „Öffnet in 47 Min" mit Minuten-Tick | Öffnet 09:00 · Schliesst 18:00 · Andrang heute 52 % (mittel) | „Die ersten 60 Minuten": Headliner-Kacheln mit „ab 09:00", darunter das volle Verzeichnis | Prognose |
| **BEFORE_OPEN** (>90 Min) | „Park geschlossen · öffnet heute um 09:00" | wie oben | Verzeichnis „36 Attraktionen im Europa-Park", gruppiert nach Bereich, ohne Zahlen | Prognose · Besuchsplaner |
| **AFTER_CLOSE** | „Park geschlossen · öffnet morgen um 09:00" | Morgen 09:00–18:00 · Andrang morgen 46 % (niedrig) | „Die nächsten 7 Tage" (Datum, Zeiten, Andrangsbalken) + Verzeichnis | Prognose · ResortPass-Alert |
| **CLOSED_TODAY** | „Heute geschlossen · nächster Öffnungstag: Sa 08.11., 11:00" | Nächster Tag + Andrang | 7-Tage-Block + Verzeichnis | Prognose |
| **SEASON_BREAK** | „Winterpause · Saisonstart 27.03.2027" mit Tages-Countdown | Saisonstart · Rulantica ganzjährig offen · ResortPass-Status | Verzeichnis + Erklärblock „Warum jetzt keine Wartezeiten" + Verweis Öffnungszeiten/Prognose/ResortPass | ResortPass-Alert (in der Winterpause fielen die letzten Verkaufsstarts!) |
| **dataQuality = stale** | gelbes Band, „Stand 14:12 · seit 22 Min keine neuen Daten" | letzte bekannte Werte, gedämpft | Liste bleibt, jede Zeile mit Zeitstempel-Hinweis | „Neu laden" |
| **dataQuality = unreliable** | gelbes Band, „Der Park meldet aktuell keine Betriebsdaten" | Zahlen ausgeblendet | Verzeichnis statt Liste, **keine Einzelstatus** | Offizielle App |
| **dataQuality = unavailable** | rotes Band, „Wartezeiten gerade nicht abrufbar" | — | Verzeichnis (statisch, immer da) + Retry | Offizielle App |

**Zwei Regeln, die alles zusammenhalten:**

- **Der Zustand kommt vom Zeitplan, nicht von den Wartezeiten.** `summary.openRides === 0` ist heute der einzige Indikator (`WaitTimesPage.astro:411`) und schaltet nur den Filter um. Das reicht nicht: 0 offene Bahnen um 03:00 nachts und 0 offene Bahnen wegen Provider-Ausfall sind zwei völlig verschiedene Aussagen.
- **Das Verzeichnis ist immer sichtbar.** In jedem Zustand — auch bei Totalausfall — stehen 36 Attraktionen mit Bereich im HTML. Damit hat die Seite nachts, im Winter und bei API-Ausfall Substanz für Nutzer *und* für Crawler.

### 2.3 Der REFURBISHMENT-Guard (P0 aus dem Audit)

Am 01.08.2026, 08:16 meldete der Provider **26 von 36 Bahnen als `REFURBISHMENT`** — inklusive Silver Star an einem Augusttag. Die Seite rendert das heute als harte Tatsachenbehauptung „In Wartung" (`WaitTimesPage.astro:364-368` → `translations.ts:99`). Das ist nicht belastbar.

Drei Schutzschichten in `server/park-now.ts`:

```ts
// 1) Ausserhalb der Öffnungszeiten: NIE einen Einzelstatus als Ursache rendern.
if (state !== 'OPEN') {
  // Client zeigt pro Zeile nur "ab 09:00" – kein "In Wartung", kein "Geschlossen"-Badge.
  waitTimes = null;
}

// 2) Massen-Refurbishment innerhalb der Öffnungszeiten:
const refurbShare = rides.filter(r => r.status === 'REFURBISHMENT').length / rides.length;
if (state === 'OPEN' && refurbShare > 0.6) dataQuality = 'unreliable';

// 3) Stabilitätsprüfung: "In Wartung" nur, wenn über 3 aufeinanderfolgende
//    Abrufe (= 15 Min) stabil. Flüchtiger Ringpuffer im Prozess-RAM,
//    dieselbe Klasse wie der bestehende `cached`-Zustand – keine Historie,
//    keine Persistenz, keine Weitergabe.
const stableRefurb = statusRing.isStable(ride.id, 'REFURBISHMENT', 3);
```

Sonst lautet der Text neutral: *„Aktuell keine Wartezeit gemeldet"*.

---

## 3. Layout Mobile-first (390 × 844)

Zielwert: **erste Wartezeit über der Falz**, heute erst bei y ≈ 1553 px.

```
y=0     ┌─────────────────────────────────────────┐
        │ SiteHeader (sticky, 69 px)              │  bestehend
y=69    ├─────────────────────────────────────────┤
        │ LIVE-BAND (sticky, 44 px)               │  NEU
        │ ● Live · vor 2 Min.            [↻ 44px] │
y=113   ├─────────────────────────────────────────┤
        │ H1 26px/1.1  "Europa-Park Wartezeiten"  │  gekürzt
        │ Subline 15px, eine Zeile, ≤ 90 Zeichen  │
y=185   ├─────────────────────────────────────────┤
        │ ZUSTANDSBLOCK (60–96 px, s. Abschnitt 2)│  NEU
        │ [Offen 24] [Ø 32 Min] [Kürzeste 5 Min]  │
y=257   ├─────────────────────────────────────────┤
        │ "Jetzt am kürzesten"  Label 13px        │  NEU
        │ ┌──────┐ ┌──────┐ ┌──────┐  scroll-snap │
        │ │ 5 Min│ │10 Min│ │15 Min│  je 108×112  │
        │ │WODAN │ │Pegasus│ │ARTHUR│             │
        │ └──────┘ └──────┘ └──────┘              │
y=400   ├─────────────────────────────────────────┤
        │ FILTERLEISTE (sticky, 48 px)            │  NEU sticky
        │ [🔍] [Offen 24][≤15 Min 6][Bereich][⇅]  │
y=448   ├─────────────────────────────────────────┤
        │ ▸ ISLAND · 3 offen · Ø 42 Min  (sticky) │  NEU Gruppierung
y=480   │ ┃ blue fire Megacoaster        45 ★     │  Zeile 64 px
        │ ┃ ██████████░░░░░░░░░░░  Min             │
y=544   │ ┃ WODAN – Timburcoaster        30 ☆     │
        │ …                                       │
        ├─────────────────────────────────────────┤
        │ ▸ Geschlossen (9)          [aufklappen] │  Accordion
        ├─────────────────────────────────────────┤
        │ Powered by ParkQueueTimes.com           │  Pflicht-Attribution
        │ Erklärblock · FAQ · Prognose-CTA        │
        └─────────────────────────────────────────┘
```

**Erste Wartezeit bei y ≈ 480 px** statt 1553 px. Der Fold auf 390×844 endet bei 844 — es sind also 5–6 Zeilen sichtbar.

### Konkrete Änderungen an `WaitTimesPage.astro`

| Element | Heute | Neu |
|---|---|---|
| Hero-Section (Z. 100–147) | 829 px, `pt-12 pb-10 md:pt-16 md:pb-14` | `<640px`: `pt-4 pb-3`, H1 `text-[1.65rem]`, Subline `text-[0.95rem]`, max. eine Zeile |
| `ResponsiveIllustration` (Z. 138–145) | 191 px hoch, `eager` auf jedem Viewport | `<picture>` mit `media="(min-width: 768px)"` — unter 768 px **gar nicht laden** (`display:none` spart den Download nicht) |
| Prognose-CTA (Z. 135–137) | im Fold | unter die Liste |
| Attributionszeile (Z. 130–132) | im Fold | direkt unter die Liste, im selben Sichtfeld wie die Zahlen (Lizenzpflicht bleibt erfüllt) |
| `.wait-toolbar` (Z. 576) | `position: static` unter 640 px | sticky, einzeilig, 48 px |
| `max-w-6xl` (Z. 104/148/166) | 72 rem | `.section-shell` (76 rem) — beseitigt den 64-px-Breitensprung Startseite → Wartezeiten |

**Farben (bestehende Tokens):** Hintergrund `--color-bg-light` `#F7F4FF` im Hero, `--color-bg` `#FFF9F0` im Listenbereich, Karten `--color-surface` `#FFFFFF`, Rahmen `--color-border` `#2E1065`. Die neobrutalistische Signatur bleibt — aber der 3-px-Rahmen mit Versatzschatten umschliesst **einmal die ganze Liste**, nicht 36-mal jede Zeile. Zeilentrenner: 1 px `--color-border-light`.

**Live-Band-Farben:**
- `fresh` → Punkt `--color-available` `#15803D`, Fläche `--available-bg` `#F0FDF4`
- `stale` → Punkt `--color-gold` `#D97706`, Fläche `#FFFBEB`
- `unavailable` → Punkt `--color-unavailable` `#BE185D`, Fläche `--unavailable-bg` `#FEF2F2`
- geschlossen/Zeitplan → Punkt `--color-accent` `#7C3AED`, Fläche `#F7F4FF` (kein Puls!)

**Der Puls-Punkt (`global.css:440-452`) läuft ausschliesslich bei `dataQuality === 'fresh'` und `state === 'OPEN'`.** Er ist heute auf der Startseite über einer Abonnentenzahl verschwendet; „Live" muss Live bedeuten.

---

## 4. Die Attraktionsliste

### 4.1 Zeilenaufbau

```
Grid: [6px Farbstreifen] [1fr Name + Bereichs-Chip + Balken] [64px Zahl] [44px Stern]
Höhe: 64 px mobil / 72 px Desktop (heute 106 px)
```

```html
<li class="ride-row" data-level="3" data-land="Iceland" id="blue-fire-megacoaster">
  <span class="ride-rail" aria-hidden="true"></span>
  <div class="ride-main">
    <h3 class="ride-name">blue fire Megacoaster</h3>
    <span class="ride-chip">Island</span>
    <div class="ride-bar" aria-hidden="true"><i style="--pct:37.5%"></i></div>
  </div>
  <p class="ride-wait">
    <strong>45</strong><span class="ride-unit">Min.</span>
    <span class="sr-only">— lange Wartezeit</span>
  </p>
  <button class="ride-fav" aria-pressed="false"
          aria-label="blue fire Megacoaster zu Favoriten hinzufügen">★</button>
</li>
```

### 4.2 Farbskala — 5 Stufen, WCAG AA, Farbe nie allein

Heute drei Stufen (`WaitTimesPage.astro:327-333`): alles über 30 Min ist „high" — Voltron mit 120 Min sieht aus wie eine Bahn mit 35 Min. Neu:

| Stufe | Wartezeit | Balken/Streifen | Textfarbe | Kontrast auf `#FFFFFF` | Label (sr-only + ab 768 px sichtbar) |
|---|---|---|---|---|---|
| L0 | 0–10 Min | `#15803D` | `#15803D` | **5.02 : 1** | „sehr kurz" |
| L1 | 11–25 Min | `#4D7C0F` | `#4D7C0F` | **5.00 : 1** | „kurz" |
| L2 | 26–45 Min | `#B45309` | `#B45309` | **5.05 : 1** | „normal" |
| L3 | 46–70 Min | `#C2410C` | `#C2410C` | **5.20 : 1** | „lang" |
| L4 | > 70 Min | `#BE185D` | `#BE185D` | **6.20 : 1** | „sehr lang" |
| — | unbekannt | `#6B5E8C` | `#6B5E8C` | 5.36 : 1 | „keine Angabe" |
| — | geschlossen | `#DED4EF` | `#5B4C82` | 6.4 : 1 | „geschlossen" |

`#15803D`, `#B45309` und `#BE185D` sind bereits Tokens (`--color-available`, `--color-gold-light`, `--color-unavailable`). Neu hinzu: nur `#4D7C0F` und `#C2410C`.

**Vier redundante Kodierungen pro Zeile — Farbe ist nie der einzige Träger:**
1. **Balkenlänge** auf gemeinsamer 0–120-Minuten-Skala (`--pct` clamped bei 100 %)
2. **Zahl** in `font-variant-numeric: tabular-nums`, rechtsbündig auf gemeinsamer Achse, 26 px; ab 60 Min 30 px, ≤ 10 Min 22 px (Extremwerte springen heraus)
3. **Textlabel** („lang", „sehr lang") — `sr-only` mobil, sichtbar ab 768 px
4. **Muster** bei L4: `repeating-linear-gradient(45deg, …)` auf dem Balken — funktioniert auch in `forced-colors: active`

```css
:root {
  --wait-l0: #15803D; --wait-l1: #4D7C0F; --wait-l2: #B45309;
  --wait-l3: #C2410C; --wait-l4: #BE185D;
  --wait-unknown: #6B5E8C; --wait-closed: #DED4EF;
}
.ride-row[data-level="4"] .ride-bar i {
  background: repeating-linear-gradient(45deg,
    var(--wait-l4) 0 6px, color-mix(in oklab, var(--wait-l4), #fff 22%) 6px 12px);
}
```

**Zusätzlich zu beheben (P0/P1 aus dem Audit):**
- `.wait-badge { flex: 0 0 5rem }` + `overflow-wrap: anywhere` (Z. 524-543) bricht „Geschlossen" zu „Geschloss/en" — 36-mal pro Seite. Fällt weg, weil geschlossene Bahnen kein Textbadge mehr bekommen.
- `.filter-group { overflow: hidden }` (Z. 486-492) schneidet den 3-px-Fokusring (`global.css:792-800`) beim ersten Button **vollständig** weg → SC 2.4.7 verletzt. Fix: Radien und Rahmen auf die Buttons legen (logische Eigenschaften wegen RTL), `overflow: visible`. **Nicht** `overflow-clip-margin` — Safari-Lücke.
- `.wait-toolbar { top: 0.5rem; z-index: 20 }` gegen `.site-header { z-index: 60, 69px }`: `--site-header-height` per ResizeObserver auf `documentElement` publizieren, `top: calc(var(--site-header-height) + 0.5rem)`, `z-index: 30`, und `scroll-padding-top` daraus ableiten (behebt zugleich den 10-px-Ankerversatz auf Ratgeberseiten).

### 4.3 Gruppierung nach Themenbereich

17 Bereiche liegen vollständig vor (`server/wait-times.ts:10-47`), werden aber nur als 12-px-Label über jedem Namen ausgegeben — 36-mal derselbe Platzverbrauch ohne Orientierung.

- **Sticky Zwischenüberschriften:** `Island · 3 offen · Ø 42 Min` (48 px, `--color-bg`, 2 px Unterkante)
- Die Bereichszeile pro Attraktion entfällt → wird zum Chip **neben** dem Namen
- Sortierung „Nach Bereich" als vierte Option, Bereiche absteigend nach Anzahl offener Bahnen
- Lokalisierung bleibt wie in `WaitTimesPage.astro:321-325` (`Intl.DisplayNames` + `specialLands`)

### 4.4 Sortierung, Filter, Suche

**Sortierung** (Bottom-Sheet mobil, `<select>` Desktop): Längste zuerst *(Default bei OPEN)* · Kürzeste zuerst · Nach Bereich · Name A–Z.

**Filter** als horizontal scrollbare Chip-Reihe **mit Trefferzahl** — man weiss vor dem Tippen, was einen erwartet:
`Alle 36` · `Offen 24` · `≤ 15 Min 6` · `Favoriten 4` · `Achterbahnen 11` · dann 17 Bereichs-Chips.

**Suche:** Der Placeholder lautet heute „z. B. Voltron oder WODAN" und verrät nicht, dass `WaitTimesPage.astro:338` bereits über `${ride.name} ${localizedLand(ride.land)}` matcht — Bereichssuche funktioniert, ist aber unentdeckbar. Neu: *„z. B. Voltron, WODAN oder Skandinavien"*.

**Alias-Index** in `src/data/ride-names.ts` — heute steht auf der **deutschen** Seite „Jim Button – Journey through Morrowland", „Tirol Log Flume", „Swiss Bob Run", „Pirates in Batavia", „Water rollercoaster Poseidon", „Vienna Wave Swing – 'Glückspilz'". Kein deutscher Nutzer sucht so.

```ts
// src/data/ride-names.ts – eigene Redaktionsleistung, keine Providerdaten-Weitergabe
export const rideNames = {
  'Jim Button – Journey through Morrowland': {
    de: 'Jim Knopf – Reise durch Lummerland',
    aliases: ['Jim Knopf', 'Lummerland', 'Jim Button'],
    sourceUrl: 'https://www.europapark.de/de/freizeitpark/attraktionen/…',
    checkedAt: '2026-08-15', nextReviewAt: '2027-02-15',
  },
  // Piraten in Batavia, Tiroler Wildwasserbahn, Schweizer Bobbahn,
  // Wiener Wellenflug – "Glückspilz", Poseidon …
};
```
Die Provider-Schreibweise bleibt als unsichtbarer Suchalias erhalten, damit „Jim Knopf" **und** „Jim Button" treffen. Generische Aliase ergänzen: „Achterbahn", „Coaster", „Wasserbahn", „Silberstern".

### 4.5 Favoriten (localStorage, kein Tracking)

```ts
const FAV_KEY = 'rp.fav.rides';           // Array<number> der Provider-IDs
const load  = () => { try { return JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]'); } catch { return []; } };
const save  = (ids) => { try { localStorage.setItem(FAV_KEY, JSON.stringify(ids)); } catch {} };
```

- 44 × 44 px Stern-Button pro Zeile, `aria-pressed`, sprechendes `aria-label`
- Bei ≥ 1 Favorit erscheint ganz oben der Block **„Meine Bahnen"** — dieselben Kacheln wie „Jetzt am kürzesten"
- Filterchip `Favoriten (4)`
- Direkt am Block der Satz: *„Wird nur in deinem Browser gespeichert, nicht auf unserem Server."* — das ist ein **Beweis** für das Kein-Tracking-Versprechen, kein Verstoss dagegen
- **Bug, den das nebenbei behebt:** `WaitTimesPage.astro:411` überschreibt `activeFilter` bei jedem Auto-Refresh auf `'all'`, sobald `openRides === 0`. Die Nutzerauswahl geht heute im laufenden Betrieb verloren.

**URL-State** per `history.replaceState`: `?q=voltron&filter=open&sort=longest&land=iceland&fav=1193,1273`. Teilbar per Chat, Zurück-Button funktioniert, Lesezeichen möglich. Kein Indexierungsrisiko — der Canonical zeigt bereits parameterlos auf `/wartezeiten/` (live geprüft).

---

## 5. Über die Liste hinaus

### A. „Jetzt am kürzesten" + Die grossen Fünf — **umsetzen, Priorität 1**

Ein Streifen über der Filterleiste, der je nach Zustand kippt:
- **OPEN:** die drei kürzesten Wartezeiten unter den Headlinern (`headlinerRideIds` in `src/data/rides.ts`: 1193 Silver Star, 1273 blue fire, 1274 WODAN, 1201 Eurosat CanCan, 1278 Voltron Nevera; saisonal 1200 Pirates in Batavia, 1194 Poseidon)
- **BEFORE_OPEN / OPENING_SOON:** dieselben fünf Kacheln mit „ab 09:00"
- **Nutzen:** beantwortet „Wo gehe ich jetzt hin?" statt „wie lang ist die Schlange" — das ist der Punkt, an dem laut Branchenvergleich alle Wettbewerber aufhören
- **Daten:** identischer Payload, keine neue Quelle
- **Lizenz:** unkritisch, reine Anzeige aktueller Werte mit Attribution
- **Aufwand:** S (½–1 Tag)

### B. Bereichs-Übersicht „Park-Puls" — **umsetzen, Priorität 2**

17 Bereichskacheln, eingefärbt nach durchschnittlicher Wartezeit der offenen Bahnen, mit Anzahl. Tap filtert die Liste. Auf Desktop in der rechten Spalte dauerhaft sichtbar.

- **Nutzen:** Der Europa-Park ist räumlich in Länderbereiche gegliedert — das ist die mentale Karte jedes Besuchers. Die Frage lautet nie „welche Bahn ist irgendwo frei", sondern „ich stehe in Island, was ist hier frei?"
- **Daten:** Aggregation des aktuellen Payloads
- **Lizenz:** Anzeige-Aggregat des Momentanzustands, keine Historie → unkritisch. Attribution im selben Sichtfeld.
- **Ausbaustufe (später, L):** schematische SVG-Karte. **Wichtig: keine Nachzeichnung des offiziellen Parkplans** (Urheber-/Markenrecht) — bewusst abstrahierte eigene Darstellung mit sichtbarem Hinweis „schematisch, kein offizieller Parkplan".
- **Aufwand:** M (1–2 Tage ohne Karte)

### C. Trendpfeil — **umsetzen, Priorität 3**

`▲ +10 Min` / `▼ −5 Min` seit dem vorherigen Abruf, rein clientseitig.

- **Nutzen:** Eine Zahl ohne Richtung ist halb so nützlich. „45 Min" beantwortet nicht, ob man warten oder wiederkommen soll.
- **Daten:** Vorheriger Wert bleibt in einer JS-Variable, wird **nie gespeichert, nie übertragen**
- **Kritische technische Bedingung:** Delta **nur** berechnen, wenn sich `data.updatedAt` geändert hat. Server-Cache-TTL und Client-Intervall betragen beide 5 Minuten und laufen nicht synchron — sonst zeigt der Pfeil willkürlich 0 oder springt.
- **Lizenz:** kein gespeicherter, weitergegebener oder abgeleiteter Datendienst → unkritisch
- **Aufwand:** S (½ Tag)

### D. Tagesverlauf / Heatmap Attraktion × Uhrzeit — **NICHT bauen, lizenzgesperrt**

Das wäre der visuell stärkste Moment der ganzen Seite und der grösste Differenzierer gegenüber der offiziellen App. **Er setzt eine eigene Zeitreihe aus ParkQueueTimes-Daten voraus.** Die AGB (§5 Weiterverteilung, §6 abgeleitete Werke, §8 Rohdaten-Weitergabe) verbieten das ohne ausdrückliche schriftliche Erlaubnis; Historien-/Analytics-Endpunkte sind als kostenpflichtige Stufe angekündigt.

**→ Anfrage jetzt stellen** (der Anbieter lädt auf `parkqueuetimes.com/developers` selbst dazu ein). Bis zur Antwort ausschliesslich A–C ausliefern und die Frage „wann lohnt sich Anstehen?" redaktionell beantworten („erste 60 Minuten nach Öffnung, letzte 90 Minuten vor Schliessung, während der grossen Show") — klar als Empfehlung gekennzeichnet, nicht als Messung.

---

## 6. Desktop-Adaption

**≥ 1280 px — drei Spalten in `.section-shell` (76 rem):**

```
┌──────────────┬────────────────────────────────┬──────────────────┐
│ LINKE SPALTE │ MITTE (1fr)                    │ RECHTE SPALTE    │
│ 240 px sticky│                                │ 300 px sticky    │
│              │ Live-Band + Zustandsblock      │                  │
│ Suchfeld     │ "Jetzt am kürzesten" 5 Kacheln │ PARK-PULS        │
│ ──────────   │ ────────────────────────────── │ 17 Bereiche      │
│ Status:      │ ▸ ISLAND · 3 offen · Ø 42 Min  │ als 2-spaltiges  │
│ ○ Alle 36    │  ┃ blue fire      45 ▲  ★      │ Raster, farbig   │
│ ● Offen 24   │  ┃ WODAN          30 ▼  ☆      │ ──────────────── │
│ ○ ≤15 Min 6  │ ▸ FRANKREICH · 4 offen         │ HEUTE            │
│ ○ Favoriten 4│  ┃ Silver Star    75 ▲  ★      │ 09:00–18:00      │
│ ──────────   │  …                             │ Andrang 52 %     │
│ Bereiche:    │                                │ ──────────────── │
│ Island 3     │ ▸ Geschlossen (9)              │ RUHIGERE TAGE    │
│ Frankreich 4 │                                │ So 16.08. · 43 % │
│ …            │ Powered by ParkQueueTimes.com  │ [Zur Prognose]   │
└──────────────┴────────────────────────────────┴──────────────────┘
```

- **1024–1279 px:** zwei Spalten (Filter links 240 px, Liste + Park-Puls rechts als horizontales Kachelband über der Liste)
- **< 1024 px:** einspaltig, Filter als sticky Chip-Leiste, Park-Puls als scroll-snap-Band
- Zeilenhöhe 72 px, Trendpfeil und Textlabel („lang") nur ab 768 px sichtbar
- Die rechte Spalte schliesst die im Audit belegte Silo-Lücke: `/wartezeiten/` hat heute **genau einen** internen Link im `<main>` (`/besucherprognose/`). Hier entstehen drei sinnvolle Brücken: Prognose, Besuchsplaner, ResortPass-Status.
- Illustration (`ResponsiveIllustration`, 191 px) bleibt **nur** ab 768 px — als Hero-Element rechts neben H1, nicht über der Liste

---

## 7. Technische Umsetzung im bestehenden Stack

### 7.1 Datenfluss

```
ParkQueueTimes  ──┬─→ server/wait-times.ts       (Cache 5 Min, Poller)
(api key)         └─→ server/crowd-calendar.ts   (Cache 60 Min, Poller)
                            │
                            ▼
                  server/park-now.ts             NEU: merge + Zustandsmaschine
                            │
              ┌─────────────┴──────────────┐
              ▼                            ▼
    GET /api/park-now              Caddy httpInclude / Bun-Injektion
    (ETag, max-age=60,                     │
     stale-while-revalidate=300)           ▼
              │                   server-gerendertes HTML
              ▼                            │
    JS-Insel (Progressive Enhancement) ────┘
```

### 7.2 Rendering — zwei Stufen

**Stufe A — sofort, kein Infrastruktur-Eingriff (Priorität!)**

`EUROPA_PARK_RIDE_LANDS` nach `src/data/rides.ts` verschieben und **zur Build-Zeit** die vollständige Liste als initialen `<ul>`-Inhalt rendern: 36 `<li>` mit Name (lokalisiert), Bereich, Anker-ID (`id="silver-star"`), neutralem Status. Das Client-Skript ersetzt sie ohnehin per `replaceChildren()`.

```astro
<ul id="ride-list" class="ride-list">
  {ridesByLand.map(([land, rides]) => (
    <>
      <li class="ride-group" role="presentation"><h3>{localizedLand(land)}</h3></li>
      {rides.map(ride => (
        <li class="ride-row" data-ride-id={ride.id} data-land={land} id={ride.slug}>
          <div class="ride-main">
            <h3 class="ride-name">{localizedName(ride, lang)}</h3>
            <span class="ride-chip">{localizedLand(land)}</span>
          </div>
          <p class="ride-wait" data-placeholder>—</p>
        </li>
      ))}
    </>
  ))}
</ul>
```

**Fallstrick (aus dem Audit):** Heute räumt nur der Erfolgspfad auf (`replaceChildren`, Z. 356). Bei fetch-Fehler bliebe die Platzhalterliste mit „—" dauerhaft stehen, obwohl Z. 424-427 den Error-Block einblendet. **Der Fehlerpfad muss die Platzhalter explizit auf den Zustand `unavailable` setzen**, nicht auf „lädt".

Ergebnis Stufe A: **36 Entitäten im HTML**, funktionierende No-JS-Seite, Sprungziele für Deeplinks, JSON-LD `ItemList` mit 36 `TouristAttraction` (`name`, `containedInPlace`, `url`) — **ohne Minutenwerte**, damit lizenzfrei.

**Stufe B — Live-Snapshot im HTML (nach Lizenzklärung)**

Der Caddy-Block hat heute nur `try_files` + `file_server`. Für die Live-Werte im HTML:

```caddy
# deploy/Caddyfile – vor dem statischen handle-Block
@waitTimes path /wartezeiten/ /en/wait-times/ /fr/temps-d-attente/ … (17 Pfade)
handle @waitTimes {
    reverse_proxy resortpass-api:3000
}
```

Bun liest `dist/<pfad>/index.html` einmal beim Start ein und ersetzt pro Request den Marker `<!--WAIT_SNAPSHOT-->` durch das gerenderte Listen-Markup aus dem 5-Minuten-Cache. Antwort mit `Cache-Control: public, max-age=60, stale-while-revalidate=300` und `ETag`.

**Aufwand realistisch M–L, nicht M** — es bricht das reine Static-File-Modell, die Cache-Header-Strategie für `/_astro` und HTML muss mitgezogen werden, und 17 Pfade sind zu pflegen.

**Lizenz-Flag:** Ein permanent gecachter, serverseitig eingebetteter Snapshot ist näher an „Weiterverteilung" als reine Client-Anzeige. Vor Stufe B **schriftlich mit ParkQueueTimes klären.** Ohne Freigabe bleibt Stufe A — sie bringt bereits den Grossteil des Crawler-Nutzens (36 Entitäten, Bereiche, Öffnungszeiten) ohne Risiko.

### 7.3 Aktualisierung

| Trigger | Verhalten |
|---|---|
| Initial | `fetch('/api/park-now')` (ohne `cache: 'no-cache'`, siehe unten) |
| Intervall | 5 Min, **nur** wenn `document.visibilityState === 'visible'` |
| `visibilitychange` / `focus` | Nachladen, wenn `updatedAt` älter als 5 Min. iOS Safari friert Timer in Hintergrund-Tabs ein — ohne diesen Listener sieht man nach 10 Min veraltete Zahlen unter dem Label „Live-Daten" |
| `online` | Sofort nachladen + Offline-Banner entfernen |
| Manuell | 44 × 44 px Icon-Button mit Kreispfeil im Live-Band (heute: 91 × 20 px Textlink im Fliesstext, weit unter der Touch-Mindestgrösse) |

**Serverseitig ergänzen:** `ETag` auf `/api/park-now` (fehlt heute auf `/api/wait-times`), damit wiederholte Abrufe im überlasteten Parknetz mit 304 statt 5 KB JSON beantwortet werden. Erst dann `cache: 'no-cache'` im Client entfernen — vorher verpufft der Effekt.

**Zeitstempel:** relativ („vor 2 Min.", alle 30 s neu gerechnet), absolut als `<time datetime="2026-08-01T14:12:00+02:00" title="14:12">`. Ab 10 Min Alter wird das Band gelb, ab 20 Min rot — konsistent zu `PROVIDER_STALE_MS`/`MAX_STALE_MS` in `server/wait-times.ts:4-5`.

### 7.4 Sichtbarkeit für Crawler und LLMs

Belegt: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot und Perplexity-User **führen kein JavaScript aus**. Sie sehen heute auf `/wartezeiten/` 3752 Zeichen Text, davon keine einzige Attraktion ausser drei Namen im FAQ, plus den Satz „Aktiviere JavaScript, um die aktuellen Wartezeiten zu laden."

Nach Stufe A: 36 Attraktionsnamen, 17 Bereiche, Öffnungszeiten, Zustandssatz — alles im ausgelieferten HTML.

**Zusätzlich:**
- `dateModified` im JSON-LD (fehlt heute komplett auf `/wartezeiten/`)
- `<lastmod>` in der Sitemap (272 `<loc>`, **0 `<lastmod>`** — in `astro.config.mjs`, `serialize()`-Hook)
- `robots.txt` aktualisieren: `Claude-User`, `Claude-SearchBot`, `Perplexity-User`, `Applebot-Extended`, `Amazonbot`, `MistralAI-User`, `DuckAssistBot` ergänzen; die toten Tokens `anthropic-ai` und `Claude-Web` als Legacy kommentieren oder entfernen
- `llms.txt`/`llms-full.txt` um Attraktionsinventar, Bereiche und Öffnungszeiten erweitern (heute: **0 Treffer** für „wait" oder „Wartezeit"). **Keine Minutenwerte** — Lizenz.
- Den `{year}`-Platzhalter in `src/pages/llms.txt.ts:29` fixen (17-mal live ausgeliefert) plus Regressionstest auf `/\{[a-z_]+\}/`

### 7.5 Schlechtes Netz

Die Hauptnutzung ist: im Park, eine Hand, Sonne, überlastetes Mobilfunknetz.

1. **Service Worker** (`@vite-pwa/astro`, Astro-6-kompatibel): Shell-Precache, `NetworkFirst` für `/api/park-now` mit 10-Minuten-Fallback
2. **Offline-Banner:** „Kein Netz — angezeigt wird der Stand von 14:12" statt stiller Falschanzeige
3. **Manifest ergänzen:** 192- und 512-px-PNG plus maskable (heute nur `favicon.svg` + 180-px-Apple-Touch-Icon) — ohne das keine zuverlässige Android-Installation und auf iOS **kein Web Push**
4. `content-visibility: auto` + `contain-intrinsic-size: 0 64px` auf `.ride-row` — reduziert die Layout-Kosten der 36-Zeilen-Liste
5. Skeleton-Reservierung: heute 5 Skeletons (~500 px) für 36 Zeilen (~2 300 px). `min-height` am Ladecontainer aus der zuletzt bekannten Bahnenzahl (Build-Zeit-`data`-Attribut) — die Zahl schwankt saisonal

---

## 8. SEO/GEO-Wirkung

| Massnahme | Wirkung |
|---|---|
| **Stufe A (36 Entitäten im HTML)** | Von „Seite ohne zitierbaren Inhalt" zu „Seite mit 36 Entitäten + 17 Bereichen". Beantwortet erstmals „Welche Attraktionen hat der Europa-Park?" und „Was ist in Island?" |
| **Geschlossen-Zustand mit Öffnungszeiten** | Erschliesst den kompletten Cluster „Europa-Park Öffnungszeiten" (eigener, stabiler Suchcluster mit einem halben Dutzend Nischenseiten), für den die Site heute **keine einzige Route** hat — und zwar in dem Zeitfenster, in dem sonst nichts passiert |
| **„Was ist heute geschlossen?"** (Anker im OPEN-Zustand) | Für diese Frage liefert die Suche heute praktisch nichts Brauchbares. Wir haben den Datenpunkt bereits im Payload. |
| **FAQ-Antworten selbsttragend machen** | Heute: *„Suche in der Live-Liste nach Voltron, WODAN oder Silver Star."* Das ist für einen Extraktor null Information. Neu: Antwort im ersten Satz, mit Zahl, Datum und Quelle — inkl. der bislang unbeantworteten Frage **„Warum sehe ich die Wartezeiten in der offiziellen App nicht von zuhause?"** |
| **Slug-Fix `en`/`fr`/`it`** | `/en/wartezeiten/` → `/en/wait-times/`, `/fr/temps-d-attente/`, `/it/tempi-di-attesa/` mit dauerhaftem 301. 13 kleinere Sprachen sind korrekt lokalisiert, ausgerechnet die drei reichweitenstärksten nicht. **Reihenfolge zwingend: erst den Soft-404 fixen** (jede unbekannte URL liefert heute HTTP 200 mit der Startseite), sonst lässt sich kein Redirect verifizieren. |
| **Ride-Anker + URL-State** | Deeplinks `/wartezeiten/#silver-star` und `?land=iceland` — teilbar, zitierbar, und die Vorstufe für spätere Attraktions-Detailseiten |
| **`ItemList` / `TouristAttraction`** | Nur Stammdaten (Name, Bereich, `containedInPlace` → Europa-Park). **Minutenwerte NICHT** in JSON-LD — das wäre strukturierte Rohdaten-Weitergabe. |
| **Konkurrenz-Vorsprung** | thrill-data.com, wartezeiten.app, park.fan und touringplans.com sind für LLM-Crawler gesperrt oder unsichtbar. Wir sind offen — dieser Vorsprung ist strukturell und wird erst durch SSR nutzbar. |

**Ehrliche Erwartung:** Der Head-Term „Europa-Park Wartezeiten" ist gegen 14 spezialisierte Wettbewerber (darunter unser eigener Datenlieferant) nicht frontal gewinnbar. Der Ertrag liegt in (a) den 16 Nicht-Deutsch-Sprachen, wo das Feld dünn ist, (b) den Longtail-Unterfragen, die niemand sauber bedient, und (c) der Zitierbarkeit in AI-Antworten. Crawl-zu-Referral-Verhältnisse bei AI-Anbietern liegen im drei- bis fünfstelligen Bereich — GEO erzeugt Präsenz, kaum Traffic.

---

## 9. Umsetzungsschritte

**Woche 0 — Lizenzanfrage an ParkQueueTimes (30 Min, blockiert Phase 6 und Stufe B)**
Eine Mail, drei Fragen: (1) serverseitig gerenderter HTML-Snapshot der Live-Ansicht mit Attribution, (2) eigene Zeitreihe für Tagesverlauf/Trend, (3) die heute öffentlichen Endpunkte `/api/wait-times` und `/api/crowd-calendar`. Punkt 3 ist de facto Weitergabe roher Daten und sollte bis zur Antwort per Origin-Prüfung + Rate-Limit auf die eigene Site beschränkt werden.

| # | Phase | Inhalt | Aufwand |
|---|---|---|---|
| **1** | **Fundament** | `src/data/rides.ts` (Allowlist + Slug + Kategorie + Headliner-Flag) · `server/park-now.ts` mit Zustandsmaschine · REFURBISHMENT-Guard inkl. Ringpuffer · Unit-Tests (Zustandsgrenzen, Mitternacht, Zeitzone, `bulkRefurbishment`) · `/api/health` um `matchedRides`/`unknownRideNames` erweitern (heute verschwinden umbenannte Bahnen still) | **M**, 2 Tage |
| **2** | **Zustände sichtbar** | Alle 6 Zustände im UI · Live-Band (sticky, 44 px) mit Countdown · Kennzahlblock umwidmen · 7-Tage-Block · Verzeichnis-Modus · Winterpause-Text | **M**, 2–3 Tage |
| **3** | **Liste neu** | Zeilenlayout 64/72 px · 5-Stufen-Farbskala + Balken + Label + Muster · Gruppierung mit sticky Headern · Filterchips mit Trefferzahl · Sortierung „Nach Bereich" · Favoriten + URL-State · `src/data/ride-names.ts` (deutsche Namen + Aliase) · **A11y-Fixes:** Fokusring-Clipping, Toolbar-`z-index`/`top`, Badge-Wortbruch, `aria-live` verkleinern | **L**, 3–4 Tage |
| **4** | **Mobile-First-Fold** | Hero eindampfen, Illustration `<picture media>` ab 768 px, Attribution + CTA nach unten, `.section-shell` statt `max-w-6xl`, Skeleton-Reservierung, `content-visibility` | **S**, 1 Tag |
| **5** | **SSR + GEO (Stufe A)** | 36 `<li>` zur Build-Zeit + Anker-IDs + Fehlerpfad-Fix · `ItemList`/`TouristAttraction` · `dateModified` · FAQ-Antworten selbsttragend umschreiben · Block „Warum die offizielle App keine Wartezeiten zeigt" · `llms.txt`-Fix + Erweiterung · Sitemap-`lastmod` · `robots.txt` aktualisieren | **M**, 2–3 Tage |
| **6** | **Über die Liste hinaus** | „Jetzt am kürzesten" / Die grossen Fünf (S) · Park-Puls-Bereichsübersicht (M) · Trendpfeil mit `updatedAt`-Guard (S) | **M**, 2–3 Tage |
| **7** | **Netz & Offline** | `ETag` auf `/api/park-now` · `visibilitychange`/`focus`/`online` · 44-px-Refresh-Button · Service Worker + Manifest-Icons (192/512/maskable) · Offline-Banner | **M**, 1–2 Tage |
| **8** | **Slugs & Redirects** | *Vorher:* Soft-404 fixen (Caddy-Config ausrollen + `file_server { status {err.status_code} }`) · dann `en`/`fr`/`it`-Slugs + dauerhafte 301 · Sitemap, hreflang, `llms.txt`, interne Links, Nav-Labels nachziehen | **M**, 1–2 Tage |
| **9** | **Desktop-Ausbau** | Drei-Spalten-Layout ≥1280 px · rechte Rail (Park-Puls, Heute, ruhigere Tage, CTAs) · Zwischenstufe 1024–1279 px | **S–M**, 1–2 Tage |
| **10** | *Nach Freigabe:* Stufe B | Caddy-Route + Bun-Injektion `<!--WAIT_SNAPSHOT-->` für 17 Pfade, Cache-Header-Strategie | **L**, 2–3 Tage |
| **11** | *Nach Freigabe:* Tagesverlauf | Serverseitige Zeitreihe, Sparkline pro Bahn, Heatmap Attraktion × Uhrzeit, „typisch um 14 Uhr" | **L**, 4–5 Tage |

**Summe bis Phase 9 (ohne Lizenz-Blocker): ca. 16–22 Personentage.**

Die Phasen 1, 2 und 5 sind der eigentliche Sprung — sie machen die Seite in den ~15 von 24 Stunden brauchbar, in denen sie heute wertlos ist, und für Crawler überhaupt erst sichtbar. Phase 3 macht sie im Park benutzbar. Alles danach ist Kür.

**Nicht anfassen, obwohl es verlockend ist:** eigene Wartezeit-Historie ohne schriftliche Freigabe, Minutenwerte in JSON-LD, `.ics`-Export von Öffnungszeiten aus dem PQT-Payload, Nachzeichnung des offiziellen Parkplans.