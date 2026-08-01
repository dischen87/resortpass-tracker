# Strategie Auffindbarkeit: SEO + GEO/AEO
**resortpass-europapark.ch — Ziele 2 und 3**

Grundlage: geprüfte Audit-Findings (Stand 2026-08-01), Wettbewerbs- und Nachfragerecherche, plus eigene Kontrollen von `dist/robots.txt`, `dist/llms.txt`, `src/i18n/routes.ts` und `astro.config.mjs`.

**Lesehilfe:** `[BELEGT]` = im Code, im ausgelieferten HTML, in einer Live-Antwort oder in einer Primärquelle nachgeprüft. `[EINSCHÄTZUNG]` = begründete Empfehlung ohne harten Beleg. `[LIZENZ]` = berührt die ParkQueueTimes-Bedingungen und braucht vorher eine Klärung.

---

## 0. Die Ausgangslage in fünf Sätzen

`[BELEGT]` Die technische Substanz ist überdurchschnittlich: 272 indexierbare Seiten, 18 reziproke hreflang-Verweise pro Seite ohne Fehler, 324 unique Titles, konsistente www-Canonicals, 902/902 Bilder mit alt-Text, robots.txt ohne jede Sperre.

`[BELEGT]` Trotzdem ist die Seite für Antwortmaschinen bei ihren beiden Kernfunktionen **leer**: `/wartezeiten/` enthält im ausgelieferten HTML 3.777 Zeichen sichtbaren Text und keine einzige Attraktion mit Minutenwert; die Hero-Statuspills der Startseite sagen statisch „Wird geprüft…“.

`[BELEGT]` Jede erfundene URL liefert HTTP 200 mit der deutschen Startseite (identisches ETag) — die deployte Caddy-Konfiguration entspricht nicht dem Repo. Damit sind auch alle künftigen Weiterleitungen nicht verifizierbar.

`[BELEGT]` Der einzige unkopierbare Datenbestand — 14.034 dokumentierte Shop-Prüfungen seit 04.03.2026 — hat weder eine eigene URL noch ein einziges Faktum im HTML.

`[EINSCHÄTZUNG]` Der Wartezeiten-Head-Term ist gegen 14+ spezialisierte Wettbewerber nicht frontal gewinnbar. Gewonnen wird über drei Achsen, auf denen der Wettbewerb strukturell schwach ist: **eigene ResortPass-Daten**, **Sprachen jenseits von Deutsch**, und **offener Crawler-Zugang** (mehrere Wettbewerber sperren AI-Bots per robots.txt oder Bot-Challenge aus).

---

## 1. Sofortmassnahmen — Woche 1

Reihenfolge ist bindend: Punkt 1.1 blockiert die Verifizierbarkeit aller späteren Weiterleitungen.

### 1.1 Soft-404 beheben (Tag 1, Aufwand S) — der einzige echte Blocker

`[BELEGT]` `/gibtsnicht-xyz123/` → HTTP 200, 81.720 Bytes, ETag `dkav8pfl6scg1r20` — byteidentisch mit `/`. Ebenso `/Wartezeiten/`, `/en/deep/nonsense/path/`, `/wartezeiten/foo/bar/`. Zusätzlich: `/wartezeiten` (ohne Slash) und `/wartezeiten/index.html` liefern 200 statt der im Repo definierten 308. `/404.html` selbst antwortet mit 200. Der `server`-Header ist „Caddy“ — es liegt kein fremder CDN-Fallback davor, die laufende Konfiguration weicht schlicht vom Repo ab.

Vorgehen:
1. Laufende Konfiguration vom Server ziehen (`caddy adapt`, systemd-Unit / Container-Mount prüfen), gegen `deploy/Caddyfile` diffen, Repo-Version ausrollen, `caddy reload`.
2. Im `handle_errors`-Block den Statuscode explizit durchreichen — sonst kommt die 404-Seite mit Status 200:
   ```
   handle_errors 404 {
     rewrite * /404.html
     file_server { status {err.status_code} }
   }
   ```
3. Verifizieren: erfundene URL → 404, `/wartezeiten` → 308, `/wartezeiten/index.html` → 308, `/404.html` → noindex.
4. `[BELEGT]` `src/pages/404.astro` und `dist/404.html` existieren bereits mit `noindex` — es muss nichts neu gebaut werden.

**Wirkung:** Beendet die unbegrenzte Produktion indexierbarer Duplikate mit `index, follow`, macht Crawl-Budget frei und ist Voraussetzung für alle Slug-Weiterleitungen.

### 1.2 Canonical / www / Weiterleitungen — Bestandsaufnahme

`[BELEGT]` Hier ist **nichts kaputt**, entgegen dem üblichen Verdacht:
- Canonicals zeigen durchgängig auf `https://www.resortpass-europapark.ch`, konsistent mit `siteUrl` in `astro.config.mjs`.
- Apex → www funktioniert (308 bzw. 301, zwei Hops über HTTP).
- Query-Parameter werden korrekt kanonisiert (`?utm_source=x` liefert unverändert den parameterlosen Canonical).
- hreflang: 272 Seiten × 18 Alternates, nach URL-Normalisierung 0 Reziprozitätsfehler.

Offen bleibt nur, was 1.1 miterledigt: Trailing-Slash- und `index.html`-Redirects. **Einzige Restinkonsistenz** `[BELEGT]`: Bei den 14 hebräischen Routen ist der Canonical prozentkodiert, hreflang und Sitemap-Alternates sind roh — kein Indexierungsfehler, aber jedes externe Tool meldet es. Fix an der **Ausgabeschicht** (`encodeURI` beim Emittieren in Layout, Sprachumschalter, Sitemap-`serialize`), **nicht** in `normalizeRoutePath` — dort ist `decodeURI` für das Registry-Matching notwendig, eine Umstellung würde die hreflang-Alternates aller hebräischen Seiten aus der Sitemap kippen.

### 1.3 robots.txt aktualisieren (Tag 1, Aufwand S)

Siehe Abschnitt 5 für den vollständigen Vorschlag. Kern: Alt-Tokens raus, aktuelle Retrieval-Bots rein.

### 1.4 `{year}`-Bug in llms.txt (Tag 1, Aufwand S)

`[BELEGT]` `dist/llms.txt` enthält 17× den uninterpolierten Platzhalter `{year}` — je einmal pro Sprachblock, ausschliesslich aus `crowd.meta_title`. Ursache: `src/pages/llms.txt.ts:29` gibt `tr('crowd.meta_title')` roh aus, während die HTML-Seiten korrekt „2026“ einsetzen. `llms-full.txt` ist sauber.

Fix plus Build-Guard: Test, der `llms.txt`/`llms-full.txt` gegen `/\{[a-zA-Z_]+\}/` prüft und den Build bei einem Treffer scheitern lässt. Vorbild existiert (`planning.test.ts` prüft bereits auf `TODO|TBD|PLACEHOLDER`).

### 1.5 Sitemap-`lastmod` (Tag 2, Aufwand S)

`[BELEGT]` 272 `<loc>`, 0 `<lastmod>`. Die `serialize`-Funktion in `astro.config.mjs` setzt nur `links`. Das Datum existiert bereits: 205 Ratgeberseiten tragen `dateModified: "2026-07-29"` im JSON-LD.

Ergänzen — aber **nicht** pauschal das Build-Datum. Google entwertet `lastmod`, sobald es unglaubwürdig springt. Richtig: pro Route das jüngste `checkedAt` der tatsächlich verwendeten Fakten; für Startseite / Wartezeiten / Prognose das Datum der letzten *inhaltlichen* Änderung. `changefreq` und `priority` weglassen.

### 1.6 Server-Rendering Stufe A (Tag 2–3, Aufwand M) — grösster GEO-Hebel

Siehe Abschnitt 2. Minimalversion für Woche 1:
- Attraktions-Stammdaten (36 Namen + Themenbereich + Anker-ID) statisch in `/wartezeiten/` rendern.
- ResortPass-Status zur Build-Zeit aus `/api/status` in Hero-Pills, StatusCards und FAQ-JSON-LD schreiben, mit sichtbarem „Stand: <Datum, Uhrzeit, Zeitzone>“ und `dateModified`.
- Kein Minutenwert im statischen HTML (siehe 2.4).

### 1.7 Betreiber-Entität sichtbar machen (Tag 4, Aufwand S)

`[BELEGT]` `grep -rl sameAs dist/` → **0 Treffer** bei 324 HTML-Dateien. Organization existiert nur als Stub (`name` + `url`), Person nur als String, `grep -rl github dist/` → 0 Treffer, obwohl „Open Source“ zweimal auf der Startseite steht. Das Repository existiert und ist öffentlich, LICENSE = MIT.

Sofort: GitHub-Link in den Footer, vollständiger Entity-Graph mit `@id` und `sameAs` (Abschnitt 3.1). Die `/ueber-uns/`- bzw. `/methodik/`-Route folgt in Woche 2–3.

### 1.8 `/api/*` absichern + Lizenzbrief raus (Tag 4, Aufwand S)

`[LIZENZ]` `[BELEGT]` `/api/wait-times` und `/api/crowd-calendar` sind öffentlich und ohne Schlüssel abrufbar. Die ParkQueueTimes-AGB untersagen in §5 Weiterverteilung und abgeleitete Dienste, §8 die Weitergabe roher API-Daten. Das ist de facto Weiterverteilung — unabhängig davon, dass die Entwicklerseite kommerzielle Nutzung mit Attribution erlaubt.

Zwei Schritte parallel: Origin-Prüfung/Rate-Limit auf die eigene Site, und ein schriftlicher Freigabeantrag (Inhalt in 2.5).

### 1.9 Messbaseline setzen (Tag 5, Aufwand S)

Vor allen inhaltlichen Änderungen. Details in Abschnitt 9. **Ohne Baseline jetzt gibt es später keinen Vergleichspunkt.**

---

## 2. Server-Rendering der Live-Daten

### 2.1 Warum das der teuerste Einzelpunkt ist

`[BELEGT]` Die beste Messung (Vercel/MERJ, >500 Mio. GPTBot-Fetches) zeigt: **kein Retrieval-Crawler ausser Googles Infrastruktur und Applebot führt JavaScript aus.** GPTBot lädt JS in ~11,5 % der Requests herunter, ClaudeBot in ~23,8 % — ausgeführt wird es nie. Was diese Bots auf `/wartezeiten/` sehen, ist wörtlich: „Live-Daten werden geladen“ und „Aktiviere JavaScript, um die aktuellen Wartezeiten zu laden.“

`[BELEGT]` Gegenprobe: `blue fire` 0 Treffer, `Poseidon` 0, `Euro-Mir` 0 im gesamten HTML. Die drei Vorkommen von „Voltron“ stammen aus Meta-Description, FAQ-Text und Suchfeld-Placeholder.

`[BELEGT]` Zusätzlich stehen auf der Startseite alle drei Statuszweige gleichzeitig im Markup, getrennt nur durch `class="hidden"` — inklusive „Jetzt verfügbar! Jetzt kaufen“ mit aktivem Shop-Link. Textextraktion liefert die Kette „Verfügbarkeit wird geprüft… Ausverkauft Jetzt verfügbar! Jetzt kaufen“.

### 2.2 Die vier Optionen im Vergleich

| Option | Vorteile | Nachteile | Eignung |
|---|---|---|---|
| **A — Build-Zeit-Snapshot + häufiger Rebuild** | Bleibt reiner Static-Build, keine neue Laufzeit, volle Cache-Freundlichkeit, im vorhandenen Stack in Stunden umsetzbar | Wert friert zwischen Rebuilds ein; 324 Seiten × 17 Sprachen alle 5 Minuten neu bauen ist nicht tragbar; eingefrorene Minutenwerte werden nachweislich falsch | **Stammdaten + ResortPass-Status + Prognose** |
| **B — Astro-SSR für einzelne Routen** | Immer frisch, kein Staleness-Risiko | Bricht das Static-Modell, braucht Node/Bun-Adapter, doppelte Renderpfade, Cache-Strategie für 17 Sprachvarianten, TTFB steigt | Nicht empfohlen |
| **C — Hybrid: statische Hülle + Server-Include** (Caddy `templates` / `httpInclude` auf einen Fragment-Endpunkt des vorhandenen Hono-Servers) | Static bleibt static; genau ein Fragment-Endpunkt mit 5-Min-Cache; Crawler sehen echte Werte; JS-Insel bleibt Progressive Enhancement | `templates`-Direktive muss im `handle`-Block aktiviert werden (heute nur `try_files` + `file_server`); HTML wird dynamisch, Cache-Header müssen nachgezogen werden; ein zusätzliches bewegliches Teil | **Minutenwerte — Stufe B, nach Lizenzklärung** |
| **D — Edge** | — | Es gibt kein CDN vor Caddy; wäre eine Infrastruktur-Migration, kein Feature | Nicht empfohlen |

### 2.3 Empfehlung: nach Datentyp trennen, nicht nach Technik

**Stufe A (sofort, Option A, keine Lizenzfrage):**

1. `EUROPA_PARK_RIDE_LANDS` aus `server/wait-times.ts` nach `src/data/attraction-index.ts` verschieben und zur Build-Zeit als initialen `<ul>`-Inhalt rendern: 36 `<li>` mit Name, Themenbereich, Anker-ID (`id="silver-star"`), Status „Wird geladen“. Das Client-Script ersetzt sie ohnehin per `replaceChildren()`.
   **Wichtig** `[BELEGT]`: Auch der Fehlerpfad muss die Platzhalterliste überschreiben — heute räumt nur der Erfolgspfad auf; bei einem Fetch-Fehler bliebe „Wird geladen“ dauerhaft stehen.
2. ResortPass-Status zur Build-Zeit aus `/api/status` in Hero-Pills, StatusCards, `info.why_text` und FAQ-JSON-LD, inkl. sichtbarem „Stand: 1. August 2026, 08:15 Uhr (Europe/Berlin)“ und `dateModified`.
3. Rebuild-Trigger: Der 15-Minuten-Checker löst bei Statuswechsel (`sold_out ↔ available`) einen Rebuild aus; zusätzlich ein täglicher Rebuild, damit der Zeitstempel nicht altert.
4. Inaktive Statuszweige gar nicht erst rendern. Ersatzweise `<template>` — **mit dem Vorbehalt**, dass `<template>`-Inhalt nur für DOM-basierte Extraktoren inert ist; regex-basierte Textextraktion sieht ihn weiterhin.
5. Prognose: Tageswerte für 31 Tage, Crowd-Index und Öffnungszeiten statisch rendern, täglicher Rebuild reicht (die Werte sind tagesbasiert).
6. FAQ-Antworten wechselfest formulieren: „Stand 1.8.2026: Silver und Gold sind ausverkauft; der Tracker meldet Änderungen innerhalb von 15 Minuten“ statt eines eingefrorenen „Nein.“

**Stufe B (nach Lizenzklärung, Option C):** Fragment-Endpunkt `/api/wartezeiten-fragment` liefert die gerenderte Liste mit echten Minutenwerten aus dem bestehenden 5-Minuten-Cache; Caddy ersetzt einen Marker im gebauten HTML. Antwort mit `Cache-Control: public, max-age=60, stale-while-revalidate=300`. Attribution „Powered by ParkQueueTimes.com“ im selben Block.

### 2.4 Warum Minutenwerte *nicht* in den statischen Build gehören

`[EINSCHÄTZUNG]`, aber gut begründet: Ein Wartezeitwert im statischen HTML ist zwischen zwei Rebuilds nachweislich falsch. Bei einer Seite, deren einziges Kapital Ehrlichkeit ist, ist ein eingefrorener „Voltron 75 Min.“ schädlicher als gar kein Wert. Die Stammdaten-Variante bringt dagegen fast den kompletten Crawler-Nutzen (36 Entitäten, Sprungziele, sinnvolle No-JS-Seite, Themenbereichs-Abdeckung für „Welche Attraktionen sind in Island?“) **ohne** Aktualitäts- und Lizenzrisiko.

### 2.5 Umgang mit der ParkQueueTimes-Lizenz

`[BELEGT]` Aktuelle Lage: Free-Tier erlaubt auch kommerzielle Nutzung, wenn „Powered by ParkQueueTimes.com“ mit Link angezeigt wird; 60 Req/Min, 10.000/Tag. AGB §5 (keine Weiterverteilung, keine abgeleiteten Dienste), §6 (abgeleitete Werke nur mit schriftlicher Erlaubnis), §8 (keine Weitergabe roher Daten). Historien-/Analytics-Endpunkte sind angekündigt, aber noch nicht verfügbar. Ein Testabruf ergab HTTP 401 „Missing API key“ — der Zugriff braucht inzwischen `x-api-key`.

**Ein Brief, fünf Fragen** (jetzt schicken, nicht wenn es dringend wird):
1. Serverseitig gerendertes HTML der Live-Ansicht mit Attribution im selben Block — gedeckt?
2. Build-Zeit-Snapshot mit sichtbarem „Stand“-Zeitstempel — gedeckt?
3. Eigene Speicherung für Trendpfeil und Tagesverlauf — erlaubt, und zu welchen Bedingungen?
4. Die öffentlichen `/api/*`-Endpunkte — abschalten, absichern, oder freigegeben?
5. JSON-LD mit Minutenwerten (maschinenlesbare Ausspielung) — gedeckt?

**Bis zur Antwort gilt:** Anzeige der aktuellen Werte ja; Historie, Zeitreihen, `Dataset`-Markup über Wartezeiten, `.ics`-Export mit Öffnungszeiten und öffentliche Rohdaten-Endpunkte nein.

**Nicht lizenzpflichtig** und deshalb sofort machbar: Attraktionsnamen und Themenbereiche (eigenes Repo-Wissen), ein rein flüchtiger Client-Trendpfeil (JS-Variable, nie gespeichert, nie übertragen), und die komplette eigene ResortPass-Historie.

---

## 3. Strukturierte Daten — konkreter Plan

### 3.0 Zwei Vorbemerkungen, die Aufwand sparen

`[BELEGT]` **Schema ist kein Zitat-Hebel.** Die beste Evidenz ist eine kontrollierte Ahrefs-Studie (1.885 Seiten mit neu ergänztem JSON-LD gegen 4.000 gematchte Kontrollseiten): AI Overviews −4,6 %, AI Mode +2,4 %, ChatGPT +2,2 % — alles im Rauschen. Google schreibt in der Primärdoku wörtlich, es gebe „no special schema.org structured data that you need to add“. Die kursierende Zahl „40–60 % mehr Zitate durch Schema“ ist nicht haltbar.

**Konsequenz:** Markup nur dort ergänzen, wo es *Entitäts-Auflösung* oder *klassische Rich Results* leistet — nicht auf Verdacht. `HowTo` ersatzlos streichen (Google hat die Rich Results abgeschaltet). `speakable` nicht anfassen.

**Eiserne Regel:** Kein Markup ohne sichtbare Entsprechung. Das betrifft konkret `[BELEGT]` die `BreadcrumbList` auf allen 272 Seiten, während sichtbare Breadcrumbs nur auf den 12 Guide-Routen existieren — entweder Breadcrumb auf `/wartezeiten/`, `/besucherprognose/` und `/impressum/` sichtbar ergänzen oder das Markup dort entfernen. Der einstufige Breadcrumb-Node auf der Startseite („Startseite“, Position 1) fliegt ersatzlos raus.

### 3.1 Entity-Graph — Priorität 1, einmal zentral

`[BELEGT]` Heute: kein `sameAs` im gesamten Build, Organization als Stub, `#website`-Referenz auf einen Node, den die Startseite ohne `@id` ausliefert, `Person` ohne `url`.

Auf jeder Sprach-Startseite, referenziert von allen Unterseiten:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.resortpass-europapark.ch/#publisher",
      "name": "ResortPass Tracker",
      "url": "https://www.resortpass-europapark.ch/",
      "description": "Unabhängiges, werbe- und trackingfreies Community-Projekt. Prüft die Verfügbarkeit des Europa-Park ResortPass alle 15 Minuten im offiziellen Ticketshop.",
      "foundingDate": "2026-03-04",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.resortpass-europapark.ch/#logo",
        "url": "https://www.resortpass-europapark.ch/logo-512.png",
        "width": 512,
        "height": 512
      },
      "sameAs": ["https://github.com/dischen87/resortpass-tracker"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "kontakt@resortpass-europapark.ch",
        "availableLanguage": ["de", "en", "fr", "it", "nl"]
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.resortpass-europapark.ch/#author",
      "name": "Mathias Graf",
      "url": "https://www.resortpass-europapark.ch/ueber-uns/",
      "sameAs": ["https://github.com/dischen87"],
      "knowsAbout": ["Europa-Park", "Europa-Park ResortPass", "Rulantica"]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.resortpass-europapark.ch/#website",
      "url": "https://www.resortpass-europapark.ch/",
      "name": "ResortPass Tracker",
      "publisher": { "@id": "https://www.resortpass-europapark.ch/#publisher" },
      "inLanguage": ["de", "en", "fr", "it", "nl", "es", "pt", "pl", "cs", "hu", "ro", "tr", "nl", "sv", "da", "nb", "el", "he"]
    },
    {
      "@type": "AmusementPark",
      "@id": "https://www.resortpass-europapark.ch/#europa-park",
      "name": "Europa-Park",
      "url": "https://www.europapark.de/",
      "sameAs": [
        "https://www.wikidata.org/wiki/Q159144",
        "https://de.wikipedia.org/wiki/Europa-Park"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Europa-Park-Straße 2",
        "postalCode": "77977",
        "addressLocality": "Rust",
        "addressRegion": "Baden-Württemberg",
        "addressCountry": "DE"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 48.2665, "longitude": 7.7215 }
    }
  ]
}
```

**Wichtig zur Abgrenzung:** Der `AmusementPark`-Node beschreibt eine fremde Entität. `publisher` bleibt strikt „ResortPass Tracker“, nirgends taucht Europa-Park als Herausgeber auf. Das ist zugleich das stärkste maschinenlesbare Nicht-Zugehörigkeits-Signal.

`[BELEGT]` Der Node ersetzt die heutige 17-fache `AmusementPark`-Duplikation (nur auf den Prognose-Seiten) und die 204-fache Organization-Duplikation.

### 3.2 Startseite — FAQPage, datumsfest, aus dem Build generiert

Ersetzt das heute eingefrorene „Nein.“ `[BELEGT]`. Der Text wird zur Build-Zeit aus `/api/status` generiert und steht **wortgleich sichtbar** unter der H1:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.resortpass-europapark.ch/#faq",
  "isPartOf": { "@id": "https://www.resortpass-europapark.ch/#website" },
  "about": { "@id": "https://www.resortpass-europapark.ch/#europa-park" },
  "publisher": { "@id": "https://www.resortpass-europapark.ch/#publisher" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Ist der Europa-Park ResortPass aktuell verfügbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stand 1. August 2026, 08:15 Uhr (Europe/Berlin): Nein. Der offizielle Ticketshop von MackInternational weist ResortPass Silver und ResortPass Gold als ausverkauft aus. Diese Seite prüft den Shop alle 15 Minuten und meldet eine Änderung innerhalb von 15 Minuten per E-Mail.",
        "dateCreated": "2026-08-01T08:15:00+02:00",
        "url": "https://www.resortpass-europapark.ch/#status"
      }
    },
    {
      "@type": "Question",
      "name": "Wann war der Europa-Park ResortPass zuletzt verfügbar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Seit Beginn der unabhängigen Messung am 4. März 2026 wurde ResortPass Silver in 14.034 dokumentierten Prüfungen genau einmal als kaufbar gemeldet (Juni 2026). Die vollständige Chronik der beobachteten Verkaufsfenster steht unter https://www.resortpass-europapark.ch/verfuegbarkeits-verlauf/.",
        "url": "https://www.resortpass-europapark.ch/verfuegbarkeits-verlauf/"
      }
    },
    {
      "@type": "Question",
      "name": "Gibt es eine offizielle Warteliste für den ResortPass?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nein. Europa-Park führt keine Warteliste und gibt zur künftigen Verfügbarkeit keine Auskunft — weder vor Ort noch telefonisch noch per E-Mail. Maßgeblich ist ausschließlich der offizielle Ticketshop."
      }
    }
  ]
}
```

`[EINSCHÄTZUNG]` Die zweite und dritte Frage sind die wertvollsten der ganzen Seite: Sie beantworten etwas, wozu der Betreiber selbst schweigt, mit einer Zahl und einem Datum.

### 3.3 `/wartezeiten/` — ItemList mit TouristAttraction (Stammdaten)

Setzt Abschnitt 2.3 Stufe A voraus (Attraktionen müssen sichtbar im HTML stehen). Ausschnitt für zwei von 36 Einträgen:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://www.resortpass-europapark.ch/wartezeiten/#attraktionen",
  "name": "Attraktionen im Europa-Park mit gemeldeter Wartezeit",
  "numberOfItems": 36,
  "itemListOrder": "https://schema.org/ItemListUnordered",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "TouristAttraction",
        "@id": "https://www.resortpass-europapark.ch/wartezeiten/#silver-star",
        "name": "Silver Star",
        "url": "https://www.resortpass-europapark.ch/wartezeiten/#silver-star",
        "containedInPlace": { "@id": "https://www.resortpass-europapark.ch/#europa-park" },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Themenbereich", "value": "Frankreich" },
          { "@type": "PropertyValue", "name": "Mindestgröße", "value": 140, "unitCode": "CMT" }
        ]
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "TouristAttraction",
        "@id": "https://www.resortpass-europapark.ch/wartezeiten/#wodan",
        "name": "WODAN – Timburcoaster",
        "url": "https://www.resortpass-europapark.ch/wartezeiten/#wodan",
        "containedInPlace": { "@id": "https://www.resortpass-europapark.ch/#europa-park" },
        "additionalProperty": [
          { "@type": "PropertyValue", "name": "Themenbereich", "value": "Island" },
          { "@type": "PropertyValue", "name": "Mindestgröße", "value": 120, "unitCode": "CMT" }
        ]
      }
    }
  ]
}
```

**Zwei harte Auflagen:**
- Mindestgrößen nur aus `src/data/attractions.ts` mit gepflegtem `checkedAt` — heute liegen dort nur 6 von 36 Bahnen vor `[BELEGT]`. Für die übrigen 30 das Feld **weglassen**, nicht schätzen.
- `[LIZENZ]` Der aktuelle Minutenwert gehört **nicht** in dieses Markup, bevor die Freigabe vorliegt. Nach Freigabe wäre die Form:
  ```json
  { "@type": "PropertyValue", "name": "Gemeldete Wartezeit",
    "value": 45, "unitCode": "MIN",
    "observationDate": "2026-08-01T14:35:00+02:00" }
  ```

### 3.4 `/resortpass-preise/` — Product + Offer

`[BELEGT]` Heute 0 Product-Nodes; die einzigen `Offer`-Objekte im Build sind `price: "0"` für die WebApplication. Die vier realen Preise (325/275/495/430 €) stehen nur als Fließtext.

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://www.resortpass-europapark.ch/resortpass-preise/#silver",
  "name": "Europa-Park ResortPass Silver",
  "category": "Jahreskarte",
  "brand": { "@type": "Organization", "name": "Europa-Park" },
  "url": "https://tickets.mackinternational.de/de/resortpass/uebersicht",
  "subjectOf": { "@id": "https://www.resortpass-europapark.ch/resortpass-preise/#webpage" },
  "offers": [
    {
      "@type": "Offer",
      "name": "Erwachsene ab 12 Jahren",
      "price": "325",
      "priceCurrency": "EUR",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/OutOfStock",
      "seller": { "@type": "Organization", "name": "MackInternational GmbH & Co. KG" },
      "url": "https://tickets.mackinternational.de/de/resortpass/uebersicht"
    },
    {
      "@type": "Offer",
      "name": "Kinder 4–11 Jahre und Senioren ab 60 Jahren",
      "price": "275",
      "priceCurrency": "EUR",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/OutOfStock",
      "seller": { "@type": "Organization", "name": "MackInternational GmbH & Co. KG" },
      "url": "https://tickets.mackinternational.de/de/resortpass/uebersicht"
    }
  ]
}
```

**Auflagen:**
- `availability` **muss** aus derselben Build-Quelle kommen wie der sichtbare Status. Ohne Abschnitt 2.3 wäre `OutOfStock` hartcodiert und am Verkaufstag falsch — genau der Fehler, den die Seite nicht machen darf.
- `brand`/`seller` zeigen auf Europa-Park bzw. MackInternational, `publisher` der Seite bleibt ResortPass Tracker. Saubere Trennung von „wer verkauft“ und „wer berichtet“.
- Googles Product-Richtlinien setzen eine Seite voraus, die von genau einem Produkt handelt. Auf `/resortpass-preise/` trifft das zu; auf der **Startseite** (Tracker + Alert + FAQ + Verlauf) ist es grenzwertig — dort nur per `isRelatedTo` referenzieren, keinen vollen Product-Node.

### 3.5 `/verfuegbarkeits-verlauf/` (neu) — Dataset über eigene Messdaten

`[BELEGT]` Der einzige Datensatz ohne jede Lizenzberührung: eigene HTTP-Prüfungen eines fremden Shops.

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://www.resortpass-europapark.ch/verfuegbarkeits-verlauf/#dataset",
  "name": "Verfügbarkeitshistorie Europa-Park ResortPass (Silver und Gold)",
  "description": "Ergebnisse einer unabhängigen, automatisierten Prüfung des offiziellen Europa-Park-Ticketshops im 15-Minuten-Takt seit dem 4. März 2026. Ein Datensatz je Prüfung mit Zeitstempel und Zustand (available, sold_out, unknown).",
  "creator": { "@id": "https://www.resortpass-europapark.ch/#publisher" },
  "license": "https://creativecommons.org/publicdomain/zero/1.0/",
  "isAccessibleForFree": true,
  "temporalCoverage": "2026-03-04/..",
  "dateModified": "2026-08-01",
  "measurementTechnique": "Automatisierter HTTP-Abruf der öffentlichen Produktseite im Ticketshop. Netzfehler, Warteschlangen- und Schutzseiten werden als 'unknown' gewertet; 'available' wird erst nach doppelter Bestätigung gemeldet.",
  "variableMeasured": [
    { "@type": "PropertyValue", "name": "checked_at", "description": "Zeitpunkt der Prüfung (ISO 8601, Europe/Berlin)" },
    { "@type": "PropertyValue", "name": "silver_state", "description": "available | sold_out | unknown" },
    { "@type": "PropertyValue", "name": "gold_state", "description": "available | sold_out | unknown" }
  ],
  "distribution": [
    { "@type": "DataDownload", "encodingFormat": "text/csv",
      "contentUrl": "https://www.resortpass-europapark.ch/daten/availability-history.csv" },
    { "@type": "DataDownload", "encodingFormat": "application/json",
      "contentUrl": "https://www.resortpass-europapark.ch/daten/availability-history.json" }
  ]
}
```

`[EINSCHÄTZUNG]` Das ist der stärkste GEO-Baustein des ganzen Projekts. Nichts wird häufiger zitiert als eine Zahl, die es sonst nirgends gibt.

### 3.6 Was auf jeder Ratgeberseite bleibt

`[BELEGT]` Die 205 Ratgeberseiten sind bereits vorbildlich (`dateModified`, `publisher`, `author`, `citation`, `about`). Zwei Korrekturen:
- `checkedAt` ist projektweit eine einzige hartcodierte Konstante `2026-07-29` (5 Code-Stellen + 34 Locale-Strings) `[BELEGT]`. Pro Seite aus dem jüngsten tatsächlich verwendeten Fakt ableiten, sonst wird das Frischesignal zum Misstrauenssignal.
- `author` bekommt `url` und `sameAs` (siehe 3.1).

---

## 4. Zitierbarkeits-Architektur

### 4.1 Das Prinzip: Passagen, nicht Seiten

`[BELEGT]` Google dokumentiert „query fan-out“ selbst: Eine Frage wird in mehrere Unterfragen zerlegt, extrahiert werden **Passagen**. Ein arXiv-Survey über die GEO-Literatur 2023–2026 identifiziert als kausal wirksam nur: thematische Passung, Position im Kontextfenster, und **extrahierbare Evidenz** (Statistiken, Definitionen, Zitate, Daten, explizite Preise). Reine Formatierungstricks: wirkungslos. Keyword-Stuffing: negativ.

`[BELEGT]` Und es funktioniert bereits: Bei einer Suche nach „Europa Park resort pass annual pass sold out“ erscheint `/en/` zwischen den offiziellen Seiten, und die Ergebniszusammenfassung paraphrasiert wörtlich die Kernsätze der Seite („checks the ticket shop every 15 minutes“, „there is no official waiting list“). Das Muster existiert — es ist nur auf den ResortPass-Cluster beschränkt.

### 4.2 Sieben Muster für diese Seite

**Muster 1 — Frage-Antwort-Block (Standard für alle neuen Inhalte)**

```
## Wie lange sind die Wartezeiten im Europa-Park heute?

Am 1. August 2026 um 14:35 Uhr melden 31 von 36 Attraktionen Betrieb.
Die durchschnittliche gemeldete Wartezeit beträgt 24 Minuten, am längsten
wartet man bei Voltron Nevera powered by Rimac mit 75 Minuten.
Quelle: ParkQueueTimes.com, abgerufen 14:35 Uhr (Europe/Berlin).
```

Regeln: H2 in der Fragenform, die Menschen tatsächlich tippen. Antwort **im ersten Satz** vollständig. Zahl + Datum + Quelle. Keine Präambel („In diesem Abschnitt erklären wir…“). Der Block muss **ohne Seitenkontext** funktionieren — genau das ist die Bedingung für Passage-Extraktion.

`[BELEGT]` Heute lauten die FAQ-Antworten auf `/wartezeiten/` wörtlich „Suche in der Live-Liste nach Voltron, WODAN oder Silver Star“ — ein Verweis auf ein UI-Element, also für einen Extraktor null Information. Genau in dieser Lücke gewinnen Regionalzeitungen mit einem einzigen konkreten Satz.

**Muster 2 — Datierte Faktenkarte mit Quelle**

Existiert bereits als `SourceStamp` auf den Ratgeberseiten `[BELEGT]` und ist das beste Bauteil des Projekts. Konsequent ausrollen, mit vier Feldern: Aussage · Wert · geprüft am · Quelle (verlinkt). Plus, wo es zutrifft, ein sichtbarer Vorbehalt („Preise können sich ohne Ankündigung ändern“).

**Muster 3 — „Stand vom“-Signale, vierfach redundant**

Bei zeitkritischen Aussagen alle vier setzen:
1. Sichtbarer Klartext im ersten Satz: „Stand 1. August 2026, 14:35 Uhr (Europe/Berlin)“
2. `<time datetime="2026-08-01T14:35:00+02:00">` — maschinenlesbar
3. `dateModified` im JSON-LD `[BELEGT]`: fehlt heute auf allen drei Kernrouten
4. `<lastmod>` in der Sitemap `[BELEGT]`: fehlt komplett

**Wichtig für die Anzeige:** relative Zeit („vor 4 Minuten“) für Menschen, absolute Zeit im `datetime`-Attribut für Maschinen. Nicht das eine gegen das andere tauschen.

**Muster 4 — Definitionen**

Ein eigener, kurzer Block pro Fachbegriff, der eigenständig zitierbar ist:
- „Was bedeutet *ausverkauft* beim ResortPass?“ — Kontingent im offiziellen Ticketshop erschöpft; keine Warteliste; neue Kontingente werden ohne Vorankündigung freigeschaltet.
- „Was ist ein *Sperrtag*?“ — Tag, an dem ResortPass Silver keinen Eintritt gewährt; Gold gilt ganzjährig; mit Hotelübernachtung im Resort entfallen Sperrtage.
- „Was bedeutet *In Wartung* in der Wartezeitenliste?“ — Statuswert des Datenanbieters, nicht zwingend eine tatsächliche Wartung; vor Parköffnung melden viele Bahnen diesen Zustand.

`[BELEGT]` Der letzte Punkt ist zugleich ein Trust-Fix: Am 1.8. um 08:16 meldeten 26 von 36 Bahnen `REFURBISHMENT`, was 1:1 als „In Wartung“ ausgegeben wurde — an einem Augusttag betrieblich unmöglich.

**Muster 5 — Vergleichstabellen**

Drei sind inhaltlich tragfähig: (a) Silver vs. Gold vs. Tageskarte mit Break-even in Besuchstagen; (b) Wartezeiten-Quellen im Vergleich (offizielle App: nur im Park nutzbar — das ist der Grund, warum dieser Markt existiert `[BELEGT]`); (c) diese Seite vs. der einzige kostenpflichtige ResortPass-Alarmdienst `[BELEGT]`: 0 € vs. 2,49 €/Monat, offen vs. „Wir machen Pause – neue Anmeldungen nicht möglich“, sichtbarer Prüfzeitstempel vs. „Zuletzt geprüft: Vor 19836 Minuten“ (≈13,8 Tage). **Sachlich, mit Abrufdatum, ohne Häme** — eine Vergleichstabelle mit Datum ist zitierfähig, eine Abwertung nicht.

**Muster 6 — Eindeutige Entitäten**

Immer die volle Bezeichnung, nie die Kurzform: „Europa-Park ResortPass Silver“, nicht „Silver“. „Voltron Nevera powered by Rimac“, nicht „Voltron“. Ort, Betreiber und Verkäufer benennen: Rust, Baden-Württemberg; Europa-Park; MackInternational als Shop-Betreiber. Das ist keine Keyword-Fülle, sondern Auflösbarkeit — LLMs verknüpfen über Entitätsnamen, nicht über Pronomen.

**Muster 7 — Betreiber-Angaben und Korrekturpolitik**

`[BELEGT]` Heute existiert weder eine `/ueber-uns/`- noch eine `/methodik/`-Route (`routeRegistry` hat 19 Keys, keiner davon). Die Methodik ist gut formuliert („Netzfehler, Warteschlangen und Schutzseiten gelten als unbekannt … Verfügbarkeit wird doppelt bestätigt“), steht aber nur als eine von drei FAQ-Karten auf der Startseite. Der Fehlalarm-Bericht vom 19. März — der stärkste Vertrauensbeleg der ganzen Seite — sitzt am Ende der Newsliste bei ~4.400 px Scrolltiefe und rutscht mit jedem Tagesbericht weiter nach unten.

Neue Route `/methodik/` (17 Sprachen) mit vier Blöcken:
1. **Wer** — Person, Ort, Bezug zum Park, seit wann getrackt, Zahl der Abonnenten, ausdrückliche Nicht-Zugehörigkeit
2. **Wie geprüft wird** — 15-Minuten-Zyklus, Doppelbestätigung, Behandlung von Schutzseiten und Timeouts, wann *kein* Alert ausgelöst wird
3. **Woher die Daten stammen** — offizieller Ticketshop, ParkQueueTimes (mit Attribution), Betreiberseiten mit Erklärung der `sourcePriority`-Stufen
4. **Korrekturen** — dauerhafter Incident-Log, beginnend mit dem 19. März, im festen Schema Datum · Ursache · Auswirkung · Fix · Prüfdatum des Fixes

`[EINSCHÄTZUNG]` „Woher weiss diese Seite, ob der Pass kaufbar ist?“ ist eine Frage, auf die ein LLM heute keine zitierbare Antwort findet. Eine offengelegte Methodik ist zugleich das, was Modelle bei konkurrierenden Quellen bevorzugt: Der Survey zeigt, dass Quellen, die ihre Grenzen benennen, besser abschneiden.

---

## 5. robots.txt — konkreter Vorschlag

`[BELEGT]` Ist-Zustand: `User-agent: *` / `Allow: /`, danach zehn Einzelgruppen (GPTBot, Google-Extended, ChatGPT-User, OAI-SearchBot, CCBot, anthropic-ai, Claude-Web, ClaudeBot, PerplexityBot, Bytespider), alle `Allow: /`. Praxistest mit echten User-Agent-Strings: GPTBot, ClaudeBot, PerplexityBot → jeweils HTTP 200, kein Blocking in Caddy.

**Bewertungsraster** (Anbieter-Primärdoku):

| Kategorie | Was der Bot tut | Empfehlung |
|---|---|---|
| **Retrieval / Antwort** (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Googlebot`, `Bingbot`, `Applebot`, `DuckAssistBot`) | Baut den Index, aus dem zitiert wird | **Zulassen.** OpenAI dokumentiert: wer OAI-SearchBot ausschliesst, erscheint nicht in ChatGPT-Suchantworten. |
| **Nutzerausgelöst** (`ChatGPT-User`, `Claude-User`, `Perplexity-User`, `MistralAI-User`) | Holt die Seite, weil gerade ein Mensch fragt | **Zulassen.** Perplexity dokumentiert ausdrücklich, dass `Perplexity-User` robots.txt „generally ignores“; OpenAI schreibt, robots.txt-Regeln greifen hier ggf. nicht. Steuerbar ist das ohnehin kaum. |
| **Training** (`GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Meta-ExternalAgent`) | Kein Rückkanal, keine Zitate | **Bewusste Entscheidung.** Für dieses Projekt: zulassen (siehe unten). |
| **Hohe Last ohne Gegenwert** (`Bytespider`) | Höchster Traffic-Anteil, schlechteste Compliance-Bilanz, kein zitierendes Endprodukt | **Sperren** `[EINSCHÄTZUNG]` |

**Zwei Fakten, die häufig verwechselt werden** `[BELEGT]`:
- `Google-Extended` steuert **nur** Gemini-Training/Grounding, **nicht** AI Overviews oder AI Mode. Diese laufen über `Googlebot` und den normalen Suchindex.
- `anthropic-ai` und `Claude-Web` sind Alt-Tokens, die in Anthropics aktueller Doku nicht mehr geführt werden.

**Vorschlag:**

```
# robots.txt — www.resortpass-europapark.ch
#
# Grundhaltung: offenes, werbe- und trackingfreies Community-Projekt.
# Alles ist erlaubt. Die Einzelgruppen unten sind DOKUMENTATION, keine
# Einschränkung — die *-Gruppe erlaubt bereits alles.
#
# ACHTUNG für spätere Änderungen: Eine benannte User-agent-Gruppe
# ÜBERSTEUERT die *-Gruppe vollständig. Wer hier eine Regel ergänzt,
# muss sie vollständig ausformulieren.

User-agent: *
Allow: /

# --------------------------------------------------------------------
# 1) RETRIEVAL- UND ANTWORT-BOTS — müssen erlaubt bleiben.
#    Sie holen Seiten, um konkrete Nutzerfragen zu beantworten.
#    Ein Ausschluss hier kostet unmittelbar Zitate und Nennungen.
# --------------------------------------------------------------------
User-agent: Googlebot
Allow: /
# steuert auch AI Overviews und AI Mode

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: OAI-SearchBot
Allow: /
# ChatGPT-Suchindex. Ausschluss = keine Anzeige in ChatGPT-Suchantworten.

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: DuckAssistBot
Allow: /

# --------------------------------------------------------------------
# 2) NUTZERAUSGELÖSTE FETCHER — holen die Seite, weil gerade ein
#    Mensch danach fragt. Laut Anbieterdoku greifen robots.txt-Regeln
#    hier teils gar nicht; die Einträge sind dokumentarisch.
# --------------------------------------------------------------------
User-agent: ChatGPT-User
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: Amazonbot
Allow: /

# --------------------------------------------------------------------
# 3) TRAININGS-CRAWLER — bewusste Entscheidung, kein Automatismus.
#    Kein direkter Rückkanal, aber langfristige Modellkenntnis der
#    Entität "ResortPass Tracker" und ihrer Fakten.
#    Entscheidung 2026-08: ERLAUBEN. Der Quellcode steht unter MIT,
#    die Inhalte sind quellenbelegte, öffentliche Fakten. Ein
#    Ausschluss brächte keinen Vorteil, nur weniger Bekanntheit.
#    Bei Statuswechsel hier neu entscheiden, nicht stillschweigend.
# --------------------------------------------------------------------
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
# steuert NUR Gemini-Training/Grounding, NICHT AI Overviews/AI Mode

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

# --------------------------------------------------------------------
# 4) AUSGESCHLOSSEN: hohe Crawl-Last, kein zitierendes Endprodukt.
# --------------------------------------------------------------------
User-agent: Bytespider
Disallow: /

# --------------------------------------------------------------------
# 5) ENTFERNT (Alt-Tokens, in der Anbieterdoku nicht mehr geführt):
#    anthropic-ai, Claude-Web
# --------------------------------------------------------------------

Sitemap: https://www.resortpass-europapark.ch/sitemap-index.xml
```

**Begründung der Trainings-Entscheidung** `[EINSCHÄTZUNG]`: Bei einem kommerziellen Verlag wäre ein Ausschluss vertretbar. Hier nicht — das Projekt hat keine Werbeerlöse zu schützen, sein Code ist MIT-lizenziert, und Modellkenntnis der Entität „ResortPass Tracker“ zahlt direkt auf Ziel 2 ein. Der Punkt gehört aber als bewusste Entscheidung dokumentiert, nicht als kopierte Blogliste.

**Ergänzend, ausserhalb robots.txt** `[BELEGT]`: Nirgends `nosnippet`, `data-nosnippet` oder `max-snippet:0` einsetzen. Google dokumentiert, dass Snippet-Fähigkeit die *einzige* Voraussetzung für AI-Sichtbarkeit ist. Der bestehende `max-snippet:-1, max-image-preview:large` ist korrekt und bleibt.

---

## 6. llms.txt / llms-full.txt — ehrliche Einschätzung

### 6.1 Die Beleglage

`[BELEGT]` **Kein grosser Anbieter wertet llms.txt nachweislich aus.**
- Google schreibt in der Primärdoku: „You don't need to create new machine readable files, **AI text files**, or markup to appear in these features.“
- Keine der vier Anbieter-Crawler-Dokumentationen (OpenAI, Anthropic, Perplexity, Google) erwähnt llms.txt — geprüft.
- John Mueller verglich es öffentlich mit dem längst entwerteten keywords-Meta-Tag.

`[EINSCHÄTZUNG, schwache Quellen]` Log-Auswertungen von GEO-Tool-Anbietern berichten, dass die Datei praktisch nie abgerufen wird (Grössenordnung: einige hundert Requests von über 500 Mio. AI-Bot-Visits in 90 Tagen; ~97 % der publizierten Dateien mit null Requests). Absolute Zahlen mit Vorsicht — die Richtung ist durch die Anbieter-Doku unabhängig gestützt.

### 6.2 Was trotzdem hineingehört

Die Dateien existieren, sind generiert und kosten laufend nichts. Drei Korrekturen, dann nichts mehr:

1. `[BELEGT]` **`{year}`-Bug beheben** — 17 sichtbar defekte Templates in der einen Datei, die ausschliesslich für maschinelle Leser existiert. Plus Build-Guard gegen Platzhalter.
2. `[BELEGT]` **Grössenkonvention umdrehen** — `llms.txt` ist 79.877 Bytes, `llms-full.txt` nur 20.335. Die „full“-Datei ist ein Viertel so gross wie die Kurzfassung. Richtig: `llms.txt` = kompakte Navigationskarte (ein Sprachblock pro Sprache reicht, dazu Verweis auf Sitemap und hreflang), `llms-full.txt` = das vollständige Fakten-Ledger.
3. **Harte Fakten nach oben.** Der Abschnitt „Data and editorial rules“ ist der einzige Teil mit echtem Eigenwert. Er gehört an den Anfang, erweitert um: aktueller ResortPass-Status mit Prüfzeitpunkt, die vier Preise, Gold = genau zwei Rulantica-Tagestickets, Trackingbeginn und Zahl der Prüfungen, ausdrückliche Nicht-Zugehörigkeit.

`[BELEGT]` `llms-full.txt` enthält heute **null Treffer** für „wait“, „Wartezeit“, „Prognose“ oder „crowd“ — der gesamte Live-Bereich fehlt. Ergänzen, sobald die Wartezeiten-Stammdaten im HTML stehen (Abschnitt 2).

### 6.3 Fazit

`[EINSCHÄTZUNG]` **llms.txt ist derzeit überwiegend Kult, nicht Wirkung.** Behalten, die drei Bugs fixen, nicht als GEO-Massnahme kommunizieren, keine weitere Zeit investieren. Die freiwerdende Energie gehört in Server-Rendering, sichtbare Faktendichte und den RSS-Feed — Feeds werden von Retrieval-Crawlern nachweislich abgerufen, `llms.txt` nicht.

---

## 7. Content-Plan — priorisiert

**Vorbemerkung zur Datenlage** `[EINSCHÄTZUNG]`: Es liegen keine Keyword-Volumendaten vor. Die Nachfrage-Einschätzung stützt sich auf SERP-Zusammensetzung, Zahl und Spezialisierung der Wettbewerber, offizielle Park-Signale und Foren-Formulierungen.

### Priorität 0 — Woche 2–4

**7.1 `/verfuegbarkeits-verlauf/` — ResortPass-Chronik** (17 Sprachen, Aufwand M)
`[BELEGT]` Der einzige unkopierbare Datenbestand: 14.034 Prüfungen seit 04.03.2026, heute nur clientseitig, ohne eigene URL (der Footer-Link zeigt auf `/#history`). Europa-Park gibt zur künftigen Verfügbarkeit ausdrücklich keine Auskunft; im offiziellen Fanforum läuft ein Dauerthread mit 201 Beiträgen über 11 Seiten.
H2-Struktur: „Wann war der ResortPass zuletzt verfügbar?“ · „Wie lange blieb er verfügbar?“ · „Wie viele Verkaufsfenster gab es seit Trackingbeginn?“ · „Gibt es ein Muster bei Wochentag und Uhrzeit?“
**Zwei Auflagen** `[BELEGT]`: Keine Lückenlosigkeits-Behauptung — bei ~149,5 Tagen × 96 Checks wären ~14.350 Prüfungen zu erwarten, tatsächlich sind es 14.034 (~97,8 % Abdeckung). Und keine Fehlalarm-Erzählung ohne Beleg: Die eine `available`-Meldung liegt laut `/api/history/silver` im Juni 2026, nicht im März — die Zuordnung zum 19.3. ist unbelegt.

**7.2 `/methodik/` + Korrekturen-Log** (17 Sprachen, Aufwand M) — siehe 4.2 Muster 7.

**7.3 `/oeffnungszeiten/`** (17 Sprachen, Aufwand S)
`[BELEGT]` Eigener, stabiler Suchcluster mit einer ganzen Riege Nischenseiten — die Site hat dafür keine einzige Route. Die Daten liegen bereits vor: `/api/crowd-calendar` liefert `openingTime`/`closingTime` für 31 Tage. Saisonblöcke 2026/27 sind belegt (Sommersaison 28.03.–01.11., Halloween 26.09.–01.11., HALLOWinter 02.–27.11., Winterzauber 28.11.–09.01.2027, geschlossen 24./25.12.).
Zielfragen: „Hat der Europa-Park heute geöffnet?“ · „Wann öffnet der Europa-Park 2027 wieder?“ · „Hat der Europa-Park im Januar geschlossen?“

**7.4 „Was ist heute geschlossen?“** (Sektion auf `/wartezeiten/` mit eigener H2 + Sprungmarke, Aufwand S)
`[BELEGT]` Für diese Suchintention liefert die Suche praktisch nichts Brauchbares — die Treffer sind Listen *ehemaliger* Attraktionen. Der Datenpunkt liegt im vorhandenen Feed. `[LIZENZ]` Reine Live-Anzeige mit Attribution = derselbe Rahmen wie die Wartezeiten. Eine Ausfall-*Historie* wäre ein abgeleiteter Dienst.

### Priorität 1 — Monat 2

**7.5 `/neuheiten-2026/`** (Aufwand S) — `[BELEGT]` Monaco als 18. Themenbereich rund um Silver Star (Eröffnung 28.03.2026), Sally's Café im blue fire Dome, Riverside Western Lodge (119 Zimmer, Juni), Silver Lake Brew, YULLBE GO im Wilden Westen. Saisonthema, das die Seite komplett verschweigt. Jahresneutraler Slug mit Jahres-Sektionen.

**7.6 `/resortpass-sperrtage/`** (Aufwand M) — `[BELEGT]` Ein Wartezeiten-Anbieter (wartezeiten.cloud) rankt derzeit für eine reine ResortPass-Frage mit einem 12-Monats-Sperrtage-Kalender. Das ist eine offene Flanke auf einer Domain, die `resortpass-europapark.ch` heisst. Eigener Vorteil, den dort niemand hat: Sperrtag + Besucherprognose + Wartezeiten in einer Ansicht.

**7.7 `/parkbesuch-faq/`** (Aufwand M) — `[BELEGT]` Ein ganzer Block hochfrequenter Alltagsfragen wird in keiner Sprache beantwortet: Essen mitbringen (erlaubt, ohne Glas/Alkohol/Messer), Hunde (angeleint, nicht in Fahrgeschäften, 15 „Hunde-Tankstellen“), Kinderwagenverleih (5 €), Schließfächer, Baby-Switch, farbige Messarmbänder, Single Rider (Voletarium, blue fire, WODAN, Arthur), VirtualLine.

**7.8 `/anreise-europa-park/`** (Aufwand M) — `[BELEGT]` Keine Route, obwohl volumenstarker Cluster. Wegen der `.ch`-Domain die naheliegendste eigene Nische: RailCoaster Zürich–Basel SBB–Ringsheim (samstags 28.03.–31.10.), Kombiticket ab Basel SBB ab 99 CHF, Shuttlebus Linie 7231 (3,20 € / 2,10 €), Parken 10 € bzw. 32 € Reserved. Alle Preise mit `checkedAt`/`nextReviewAt`.

### Priorität 2 — Monat 3+

**7.9 Attraktions-Detailseiten** für 10–12 Publikumsmagnete unter `/wartezeiten/<slug>/`, zunächst de/en/fr/it (Aufwand L). **Reihenfolge zwingend:** erst `src/data/attractions.ts` von 6 auf 12 Einträge ausbauen (mit `sourceUrl`/`checkedAt`/`nextReviewAt`), **dann** Seiten generieren — sonst 40–48 Thin-Content-URLs auf einer Site mit bereits 272 Seiten.

**7.10 Vollständige Höhen-/Alters-/Zugangsmatrix** (Aufwand L) — `[BELEGT]` Der Familien-Finder läuft heute auf 6 Attraktionen; jede Filterkombination liefert praktisch dieselbe Handvoll. Reine Fleissarbeit gegen die offiziellen Attraktionsseiten, aber der stärkste Long-Tail-Hebel im Familiensegment und exakt das Tabellenformat, das LLMs übernehmen.

**7.11 `/europa-park-bei-regen/`** (Aufwand M) — `[BELEGT]` Cluster ist mit statischen Ratgebern dicht besetzt, aber niemand verbindet ihn mit Live-Daten. Kombination aus redaktionellem Wissen (Indoor-Attraktionen, Shows, Rulantica als Ausweichoption) und Live-Status: „Von den X Indoor-Attraktionen melden gerade Y Betrieb.“ Optional gekoppelt mit Bright Sky (DWD-Warnzelle „Gemeinde Rust“, `warn_cell_id` 808317114, key-frei, CC BY) — bei Gewitter schliessen die Achterbahnen.

**7.12 `/europa-park-preise-2026/`** (Aufwand S) — `[BELEGT]` Belegt: Erwachsene Hauptsaison 76 €, Nebensaison 67 €, Rulantica ab 51 €. Bewusst **ohne** Gutscheincodes und Affiliate-Links — genau diese Neutralität ist der Grund, warum LLMs bei Preisfragen zitieren, da die Alternative durchgehend kommerziell verzerrt ist.

### Der Wildcard-Punkt

**7.13 Ausverkauft-Kalender für Tagestickets** `[EINSCHÄTZUNG, hohes Potenzial]`
`[BELEGT]` Im HTML der Tagesticket-Produktseite steckt `"checkAvailabilityUrl":"/de/availabilities/889d4a81-..."` mit den Labels `soldOutLabel: "ausverkauft"`, `closedLabel: "Geschlossen"`. Ein Testabruf ohne Parameter liefert HTTP 400 mit `application/json` — der Endpunkt existiert. Gleiche Domain, die der ResortPass-Checker ohnehin abfragt. **Kein Wettbewerber bietet einen Ausverkauft-Kalender.**
**Vor jeder Umsetzung:** höfliche schriftliche Anfrage an MackInternational (1× täglich, gecacht, mit Rücklink zum Shop). Der Shop hat keine offene API-Lizenz.

### Was *nicht* gebaut wird

`[BELEGT]` Nicht auf „Europa Park queue times“ (EN, generisch) optimieren — der eigene Datenlieferant betreibt selbst eine SEO-optimierte Landingpage dafür, ist aktueller, breiter und autoritativer. Ebenso wenig gegen wartezeiten.app auf Wartezeit-Statistiken antreten: Genau dieses Feld ist lizenzrechtlich versperrt.

---

## 8. Off-Site ohne Werbebudget

`[BELEGT]` **Vorbemerkung zur Kausalität:** Dass Drittseiten-Erwähnungen mit AI-Zitaten korrelieren, ist gut belegt. Dass sie sie *verursachen*, ist es nicht — der arXiv-Survey stuft die Evidenz ausdrücklich als „observational“ ein. Zudem ist ein Teil der Reddit-Dominanz schlicht einlizenziert (Google ~60 Mio. USD/Jahr, OpenAI geschätzt ~70 Mio.), also kein organisches Ranking-Ergebnis. Off-Site ist eine begründete Wette, keine belegte Massnahme.

**8.1 Der Tracker ist eine Nachricht** `[EINSCHÄTZUNG — plausibel der stärkste Einzelhebel]`
„ResortPass wieder verfügbar“ ist ein Ereignis mit regionalem und Fach-Nachrichtenwert. Vorbereiten, **bevor** es eintritt: fertige Pressemitteilung mit Zahlen aus der eigenen Chronik („nach 149 Tagen und 14.034 dokumentierten Prüfungen erstmals wieder kaufbar; das letzte Fenster schloss nach 60 Stunden“). Verteiler: Badische Zeitung, Lahrer Zeitung, baden24; für CH 20min/Blick/watson; Fachmedien parkerlebnis.de, freizeitparknews.de, themepark-central.de, achterbahnreporter.de, looopings.nl, ooparc.com. Das Alleinstellungsmerkmal ist die **Zahl**, die sonst niemand hat.

**8.2 Foren — antworten, nicht droppen**
`[BELEGT]` ep-board.de führt einen Thread „Wann ist der Resortpass wieder verfügbar?“ mit 201 Beiträgen. Dazu epfriends.de, epfans.nl (NL), r/Europapark und r/rollercoasters. Vorgehen: Der Betreiber beantwortet Fragen fachlich und nennt die Quelle nur dort, wo sie objektiv die beste Antwort ist. Kein wiederholtes Verlinken, keine Zweitaccounts.

**8.3 Embed-Snippet für die *eigenen* Daten** (Aufwand S)
Drei Zeilen HTML für Foren, Fanblogs und Reiseseiten: „ResortPass-Status: seit X Tagen ausverkauft“ bzw. der Ausverkauft-Kalender, mit Rücklink.
`[LIZENZ]` **Nur eigene Daten.** Die PQT-Wartezeiten dürfen ohne schriftliche Freigabe nicht per Embed weiterverteilt werden.

**8.4 Offene Daten als Verbreitungskanal**
Der CC0-Datensatz aus 3.5 ist selbst ein Verbreitungsvehikel: Er ist zitierbar für Datenjournalismus, für Fan-Analysen und für Fachmedien. Dazu eine „So zitierst du diese Zahl“-Box mit vorformulierter Quellenangabe und permanenter URL auf jeder Faktenseite.

**8.5 Open Source als Trust- und Reichweitensignal**
`[BELEGT]` Repo öffentlich, MIT-lizenziert — aber nirgends verlinkt. README als eigenständige Landingpage ausbauen (was das Projekt misst, wie, seit wann), `sameAs` setzen, Footer-Link. `[EINSCHÄTZUNG]` Eintrag in einschlägige „awesome“-Listen; ein Show-HN oder ein Beitrag zur Methodik der Verfügbarkeitsmessung ist plausibel, aber unsicher.

**8.6 Was nicht gemacht wird**
Kein Wikipedia-Selbsteintrag (Relevanzkriterien nicht erfüllt, und Selbsteintrag ist regelwidrig). Keine gekauften Links, keine PBNs, keine Kommentar-Drops, keine generierten Gastbeiträge. Keine Gutschein-/Affiliate-Kooperationen — das würde die werbe- und trackingfreie Positionierung beschädigen, die das eigentliche Verkaufsargument ist.

---

## 9. Messung ohne Tracking

`[BELEGT]` Die Infrastruktur existiert: `deploy/Caddyfile` schreibt bereits `/var/log/caddy/resortpass-access.log`. Server-Logs sind kein Tracking — keine Cookies, keine Client-Skripte, keine Profilbildung. IPs nach der Aggregation verwerfen.

### 9.1 Vier Signale, absteigend nach Aussagekraft

**(1) Server-Logs nach User-Agent** — das wertvollste Signal.
- `ChatGPT-User`, `Perplexity-User`, `Claude-User`: feuern **nur**, wenn gerade ein Mensch eine Frage stellt, deren Antwort diese Seite braucht. Das ist der direkteste verfügbare Beleg für Zitat-Relevanz.
- `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`: Index-Aufnahme.
- `GPTBot`, `ClaudeBot`, `Google-Extended`: nur Training, geringe Aussagekraft.
Verifizierbar über die publizierten IP-Listen (`openai.com/searchbot.json`, `/chatgpt-user.json`, `perplexity.com/perplexitybot.json`) — schliesst UA-Spoofing aus.

**(2) Referer-Header** — `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`. ChatGPT hängt zusätzlich `?utm_source=chatgpt.com` an, auswertbar ohne jedes Client-Skript.
`[BELEGT]` **Bekannte Lücke:** Traffic aus der nativen Claude-App sendet gar keinen Referer — Claude-Referrals sind systematisch untererfasst. Nicht als Rückgang fehlinterpretieren.

**(3) Google Search Console** — `[BELEGT]` Seit 03.06.2026 gibt es einen eigenen „Search Generative AI“-Bericht mit getrennten Impressionen aus AI Overviews und AI Mode (Daten ab 18.05.2026). Nur Impressionen, keine Klicks, keine CTR, keine Queries. Serverdaten-Reporting, kein Tracking auf der eigenen Seite.

**(4) Manuelle LLM-Stichproben** — unelegant, aber die einzige Methode, die auch **Zero-Click-Erwähnungen ohne Link** erfasst, und das ist der Grossteil der AI-Sichtbarkeit. Fester Satz von 30–50 Prompts, monatlich in ChatGPT, Claude, Perplexity, Gemini und Google AI Mode, Ergebnis als CSV im Repo (Datum · Modell · Prompt · Seite genannt ja/nein · Link ja/nein · Aussage korrekt ja/nein). Mehrsprachig, mindestens DE/EN/FR/NL.
Beispiel-Prompts: „Ist der Europa-Park ResortPass gerade kaufbar?“ · „Wie oft ist der ResortPass verfügbar?“ · „Wie lange sind die Wartezeiten im Europa-Park heute?“ · „Wann ist im Europa-Park am wenigsten los?“ · „Warum sehe ich die Wartezeiten in der offiziellen App nicht von zuhause?“ · „Hat der Europa-Park im Februar geöffnet?“

### 9.2 Umsetzung

Ein Bun-Skript neben `scripts/verify-seo-build.ts`, das täglich aggregiert: Hits pro AI-User-Agent, Hits pro Referer-Host, Top-Pfade je Agent, Abrufe von `/llms.txt`, `/llms-full.txt`, `/api/feed.xml` und `/sitemap-0.xml`. Ausgabe als statisches JSON/Markdown im Repo.

`[EINSCHÄTZUNG]` Diese Auswertung öffentlich zu machen, wäre selbst wieder ein zitierfähiges Original-Datum — „Welche AI-Crawler holen tatsächlich Seiten ab?“ ist eine Frage, zu der es kaum unabhängige Zahlen gibt.

### 9.3 Post-Deploy-Smoke-Test

`[BELEGT]` `scripts/verify-seo-build.ts` (1.509 Zeilen) arbeitet ausschliesslich gegen `dist/` und enthält **keinen einzigen `fetch()`-Aufruf**. Er kann Laufzeitverhalten strukturell nicht sehen — deshalb ist ihm keiner der drei Live-Defekte aufgefallen.

Zweites, kleines Skript gegen die Live-Domain, bewusst getrennt (der Build bleibt offline):
1. `GET /gibtsnicht-<random>/` → 404
2. `GET /wartezeiten` → 308 auf `/wartezeiten/`
3. `GET /wartezeiten/index.html` → 308
4. Apex → 301/308 auf www
5. `robots.txt` enthält die Retrieval-Bot-Gruppen
6. `sitemap-0.xml`: 272 `<loc>` **und** ebenso viele `<lastmod>`
7. `llms.txt` enthält kein `/\{[a-z]+\}/`
8. `/wartezeiten/` enthält ≥ 30 bekannte Attraktionsnamen im HTML
9. Canonical und Selbst-hreflang byteweise identisch

### 9.4 Erwartungsmanagement — der wichtigste Satz dieses Abschnitts

`[BELEGT]` Cloudflare veröffentlicht Crawl-zu-Referral-Verhältnisse: Anthropic je nach Zeitraum 70.900:1 bis ~10.300:1, OpenAI ~900:1 bis ~1.276:1, Perplexity ~193:1 — gegenüber ~5:1 bei Google. (Methodische Vorbehalte: aggregiert Training-, Such- und Nutzer-Crawls; fehlender Referer bei der Claude-App verzerrt nach oben.)

**Konsequenz für die Erfolgsdefinition:** Ziel ist nicht „Klicks aus ChatGPT“, sondern: *Wenn jemand eine AI fragt, ob der ResortPass gerade kaufbar ist, kommt die richtige Antwort — idealerweise mit Nennung der Quelle.* Wer GEO als Traffic-Kanal budgetiert, wird enttäuscht. Deshalb muss im serverseitig gerenderten HTML jeder Kernseite ein knapper, zitierfähiger Satz stehen, der Markennamen und Domain trägt — damit auch eine Zero-Click-Antwort die Quelle nennt.

---

## 10. Sprachstrategie: Sind 17 Sprachen richtig?

### 10.1 Der belastbarste verfügbare Nachfrage-Proxy

`[BELEGT]` Europa-Park betreibt seine eigene Website in **exakt fünf** Sprachen: de, en, fr, it, nl (hreflang direkt geprüft). Ein Konzern mit über 7 Mio. Gästen und eigenem Marketingbudget wählt diese fünf.

Marktseitig passt es: Schweizer sind die grösste internationale Gruppe (~1,5 Mio./Jahr, 27 % der Hotelbuchungen), die Niederlande haben eine dichte eigene Fanszene (looopings.nl, parkplanner.nl, epfans.nl), Frankreich ebenfalls (ooparc.com, parc-loisir.fr).

`[BELEGT]` Für he, el, nb, hu, da, cs, ro, tr, pt, sv, pl, es findet sich weder ein Wettbewerber-Ökosystem noch ein offizielles Park-Signal. `[EINSCHÄTZUNG]` Zusammen vermutlich ein kleiner einstelliger Prozentsatz der Sitzungen.

### 10.2 Die Kosten sind nicht der Speicherplatz

`[BELEGT]` Der laufende Aufwand ist die Pflege. Konkrete Belege dafür, dass die Breite bereits Schaden anrichtet:
- Das Prüfdatum `2026-07-29` steht an **39 Stellen** (5 Code-Konstanten + 34 Locale-Strings). Eine Preisaktualisierung sind 39 konsistente Handänderungen.
- Am 15.08.2026 laufen sämtliche Ticket-, Rulantica- und ResortPass-Preise ins Review — ohne Build-Gate zeigt die Seite sie danach unverändert weiter, mit dem Label „Geprüft: 29. Juli 2026“ daneben. Das ist nicht nur veraltet, sondern aktiv irreführend.
- Der Bildnachweis erscheint in allen 17 Sprachen auf Deutsch, inklusive deutscher Anführungszeichen mitten in einer RTL-Seite.
- Die 12 Ratgeber laufen durch ein per Typsystem erzwungenes 3-Punkte/3-FAQ-Raster mit 143–188 Wörtern eigener Prosa — bei 17 Sprachen multipliziert das Dünne, nicht die Substanz.

### 10.3 Empfehlung: zwei Tiers, nicht löschen

**Tier 1 — de, en, fr, nl, it** (die fünf, die der Park selbst führt)
- Alle neuen Routen aus Abschnitt 7
- Redaktionell gepflegt, saisonale Aktualisierung, vollständige Faktentiefe
- Hier liegt die **Tiefe statt Breite**: `[EINSCHÄTZUNG]` Für „temps d'attente Europa-Park“, „wachttijden Europa-Park“ und „tempi di attesa Europa-Park“ ist das Feld dünn besetzt — deutlich dünner als für die deutsche Entsprechung. Dass die englische Startseite bereits nachweisbar für ResortPass-Abfragen rankt `[BELEGT]`, bestätigt diese Achse.

**Tier 2 — die übrigen 12**
- Nur die drei Kernrouten (Startseite, Wartezeiten, Prognose) plus generischer Guide
- Neue Feature-Routen **bewusst nicht** ausrollen
- Keine harten Preis- oder Terminangaben ohne aktuelles Prüfdatum — im Zweifel Fakt weglassen statt veralten lassen
- Der Long-Tail ist gratis, solange der Build automatisiert ist; er darf nur nichts Falsches behaupten

**Hochstufung** erst, wenn eine Tier-2-Sprache messbare Nachfrage zeigt — über anonyme serverseitige Zähler pro Sprachpfad (Abschnitt 9), nicht über Vermutung.

### 10.4 Drei Fixes, unabhängig von der Tier-Frage

1. `[BELEGT]` **Slugs angleichen**: `/en/wartezeiten/`, `/fr/wartezeiten/`, `/it/wartezeiten/` und `/en|fr|it/impressum/` sind deutsche Slugs auf fremdsprachigen URLs, während 13 kleinere Sprachen korrekt lokalisiert sind. Neu: `/en/wait-times/`, `/fr/temps-attente/`, `/it/tempi-di-attesa/` plus dauerhafte 301. **Reihenfolge:** erst 404-Fix (1.1), dann Slug-Umzug — sonst lässt sich der Redirect nicht verifizieren. Danach Sitemap, hreflang, `llms.txt` und interne Links nachziehen.
2. `[BELEGT]` **x-default** zeigt bei allen 272 Seiten auf Deutsch. `getXDefaultPath` von `defaultLocale` auf eine eigene Konstante `xDefaultLocale = 'en'` entkoppeln — **erst nach** dem Slug-Fix, sonst zeigt x-default auf `/en/wartezeiten/` und zementiert die falsche URL. `defaultLocale` selbst nicht anfassen (würde die deutsche URL-Struktur ändern). *Erwarteter Effekt: klein, Kosten: nahe null.*
3. `[BELEGT]` **Orthografie klären**: `bcp47` ist `de-CH`, der Text enthält aber „ß“ (bundesdeutsche Orthografie; Schweizer Hochdeutsch kennt kein ß). Entweder konsequent das eine oder das andere — aktuell ist das Markup schweizbezogen und der Text nicht. **Nicht** `bcp47`/`ogLocale` von `de-CH` auf `de` umstellen: Google nutzt weder das `lang`-Attribut noch `og:locale` zur Sprach- oder Geobestimmung; der Effekt wäre null, die Systematik gegenüber den anderen 14 Sprachen (en-GB, nl-NL, sv-SE …) wäre gebrochen.

### 10.5 Zur `.ch`-Domain

`[BELEGT]` Eine ccTLD ist für Google ein hartes Geotargeting-Signal auf die Schweiz und in der Search Console **nicht** überschreibbar. Der Europa-Park liegt in Rust, Baden-Württemberg; der überwiegende Teil der Suchnachfrage kommt aus Deutschland.

`[EINSCHÄTZUNG]` Das ist eine strategische Randbedingung, kein behebbarer Defekt — und ein Domainwechsel ist ein Grossprojekt mit temporärem Rankingverlust. **Vorgehen:** Erst die Search-Console-Impressionen nach Land auswerten, um den tatsächlichen DE-Anteil zu messen. Ohne diese Zahl ist jede Domainentscheidung Spekulation. Nicht nebenbei entscheiden. Der Umkehrschluss ist aber sinnvoll: Solange `.ch` bleibt, ist die Schweiz-Achse (RailCoaster, CHF-Kontext, Anreise Basel–Ringsheim, fr-CH und it-CH) ein Vorteil, den man ausspielen sollte statt ihn zu bedauern.

---

## 11. Zusammenfassung: die Reihenfolge

| # | Massnahme | Woche | Aufwand | Zahlt auf |
|---|---|---|---|---|
| 1 | Soft-404 + Redirects (Caddy) | 1 | S | SEO |
| 2 | robots.txt aktualisieren | 1 | S | GEO |
| 3 | `{year}`-Bug + Build-Guard | 1 | S | GEO |
| 4 | Sitemap `lastmod` | 1 | S | SEO |
| 5 | **Server-Rendering Stufe A** (Status + Attraktions-Stammdaten + „Stand“) | 1–2 | M | **GEO + SEO + Trust** |
| 6 | Entity-Graph + GitHub-Link | 1 | S | GEO + Trust |
| 7 | `/api/*` absichern + PQT-Lizenzbrief | 1 | S | Recht |
| 8 | Messbaseline (Logs + 40 Prompts) | 1 | S | Steuerung |
| 9 | `/verfuegbarkeits-verlauf/` + Dataset | 2–3 | M | **GEO (Originalquelle)** |
| 10 | `/methodik/` + Korrekturen-Log | 2–3 | M | GEO + Trust |
| 11 | `/oeffnungszeiten/` + „heute geschlossen“ | 3–4 | S | SEO |
| 12 | Product/Offer + ItemList-Markup | 3–4 | S | SEO |
| 13 | Slugs en/fr/it + x-default | 4 | S | SEO |
| 14 | `checkedAt` dezentralisieren + Build-Gate | 4 | M | Trust |
| 15 | Content Priorität 1 (7.5–7.8) | Monat 2 | M–L | SEO |
| 16 | Server-Rendering Stufe B (nach Freigabe) | offen | M–L | GEO |

**Der eine Satz, wenn nur einer bleibt:** Solange `/wartezeiten/` für einen Crawler „Aktiviere JavaScript“ sagt und die Hero-Pills „Wird geprüft…“, ist jede weitere GEO-Massnahme wirkungslos — und alles andere in dieser Strategie baut darauf auf.