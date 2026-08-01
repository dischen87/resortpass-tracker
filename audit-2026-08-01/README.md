# UX/UI-, SEO- und GEO-Audit — 1. August 2026

Vollständige Prüfung von [www.resortpass-europapark.ch](https://www.resortpass-europapark.ch)
mit dem Ziel, die Seite von „gut" auf „ausgezeichnet" zu bringen — für Menschen, für
Suchmaschinen und für Antwortmaschinen (LLMs).

## Dokumente

| Datei | Inhalt |
|---|---|
| [00-MASTERPLAN.md](00-MASTERPLAN.md) | **Hier anfangen.** Diagnose, priorisierte Massnahmen nach Zeithorizont, das neue Wartezeiten-Erlebnis, GEO-Strategie, „bewusst nicht empfohlen", die ersten zehn Arbeitsschritte. |
| [02-konzept-wartezeiten.md](02-konzept-wartezeiten.md) | Ausführliches Einzelkonzept Wartezeiten-Seite. |
| [03-konzept-informationsarchitektur.md](03-konzept-informationsarchitektur.md) | Ausführliches Einzelkonzept Positionierung, Seitenstruktur, Startseite. |
| [04-konzept-geo-sichtbarkeit.md](04-konzept-geo-sichtbarkeit.md) | Ausführliches Einzelkonzept SEO/GEO inkl. JSON-LD-Beispielen und robots.txt-Vorschlag. |
| [05-kritik-der-konzepte.md](05-kritik-der-konzepte.md) | Adversarische Gegenprüfung der drei Konzepte. Die Korrekturen daraus sind im Masterplan bereits eingearbeitet. |
| [06-findings.json](06-findings.json) | 123 Einzelbefunde aus 9 Prüfbereichen, je mit Beleg, Severity, Vorschlag, Aufwand und Prüfvermerk. |
| [07-recherche.json](07-recherche.json) | 56 Rechercheergebnisse zu Wettbewerb, GEO-Praxis, Feature-Chancen und Suchnachfrage. |

## Methode

Neun parallele Prüfbereiche (UX Startseite / Wartezeiten / Prognose+Planung, Barrierefreiheit,
Performance, technisches SEO, GEO/LLM-Sichtbarkeit, Content+i18n, Designsystem), jeder Befund
anschliessend adversarisch gegen Repo, ausgeliefertes HTML und Live-Antworten gegengeprüft
(3 von 126 Befunden wurden dabei widerlegt und entfernt). Dazu vier Recherchestränge, drei
Design-Konzepte, eine Vollständigkeitskritik und die Synthese zum Masterplan.

Grundlage: Repo-Stand `681df3b`, Live-Abrufe vom 1. August 2026, sowie 64 Screenshots
(16 Seiten × Desktop-Fold, Desktop-Full, Mobile-Full; Mobile mit echter Geräte-Emulation
über das DevTools-Protokoll bei 390 × 844, DPR 2).

## Unabhängig nachgeprüfte Kernbefunde

Die folgenden Punkte wurden nach Abschluss der Analyse noch einmal direkt gegen die Live-Seite
und das Repo verifiziert.

| Befund | Prüfung | Ergebnis |
|---|---|---|
| `/wartezeiten/` enthält keine Attraktionen im ausgelieferten HTML | `curl` + grep nach `blue fire`, `Poseidon`, `Euro-Mir` | **0 Treffer.** Stattdessen: „Aktiviere JavaScript, um die aktuellen Wartezeiten zu laden." |
| Soft-404 | `GET /gibtsdefinitivnicht-xyz123/` | **HTTP 200** mit der deutschen Startseite **und** `robots: index, follow`. Ebenso `/wartezeiten` (ohne Slash) → 200 statt 308, `/404.html` → 200. |
| Statuspills stehen statisch im HTML | `curl /` | Alle drei Zweige gleichzeitig im Markup: „Wird geprüft…", „Ausverkauft", „Jetzt verfügbar!" |
| `DMSans-Bold.woff2` ist ein Duplikat | `md5` | **Identisch** mit `DMSans-Regular.woff2` (`fe8c67c9…`, beide 48 388 B). Jedes Gewicht über 700 wird geklemmt. |
| `{year}`-Platzhalter in `llms.txt` | `curl` + grep | **17 uninterpolierte Vorkommen.** |
| Grössenkonvention `llms.txt` / `llms-full.txt` vertauscht | `curl` + `wc -c` | `llms.txt` **79 877 B**, `llms-full.txt` **20 335 B**. Und: 0 Treffer für „Wartezeit" in `llms-full.txt`. |
| `robots.txt` listet tote Tokens, es fehlen die zitat-erzeugenden Bots | `curl /robots.txt` | `anthropic-ai` und `Claude-Web` sind tot; `Claude-User`, `Claude-SearchBot`, `Perplexity-User`, `Applebot-Extended` fehlen; `Bytespider` ist erlaubt. |
| API-Endpunkte öffentlich ohne Schlüssel | `curl` | `/api/wait-times` → 200 (4 822 B), `/api/crowd-calendar` → 200 (4 466 B). |
| Zweiter, unerklärter Verfügbarkeitstreffer | `/api/history/silver` | **Juni 2026: `available_checks: 1`** — bei 2 876 Prüfungen. Der 19.-März-Fehlalarm ist in `server/db.ts:19-20` bereits per SQL ausgeschlossen, dieser Treffer ist es nicht. |
| Alert-Versand sequenziell, kein SMTP-Pool | `server/checker.ts:204-215`, `server/email.ts:23-36` | Bestätigt: `for`-Schleife mit `await setTimeout(…, 500)`, Transport ohne `pool`. Live **885 Abonnenten** → ≥ 442 s reine Wartezeit. |
| „In Wartung"-Masse ist ein Geschlossen-Artefakt | `/api/wait-times` um 08:16 vs. 09:14 | Um 08:16 (Park zu): 26 von 36 `REFURBISHMENT`. Um 09:14 (Park offen): **34 OPERATING, 2 REFURBISHMENT**. Die Daten sind gesund — die Seite interpretiert den Geschlossen-Zustand falsch. |

### Ausdrücklich **kein** Problem

- **www / non-www** ist sauber gelöst: `https://resortpass-europapark.ch/` antwortet mit **301** auf die
  www-Variante, der Canonical zeigt konsistent auf `https://www.resortpass-europapark.ch/`.
- **Horizontaler Overflow auf Mobile existiert nicht.** Auf allen 16 geprüften Seiten gilt bei 390 px
  `innerWidth == scrollWidth == 390`. Frühe Headless-Screenshots ohne Geräte-Emulation legten das
  Gegenteil nahe — das war ein Rendering-Artefakt, keine Eigenschaft der Seite.
