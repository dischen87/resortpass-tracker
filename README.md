# 🎢 ResortPass Tracker

> Nie wieder den Verkaufsstart verpassen.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Der Europa-Park ResortPass ist derzeit ausverkauft; ein neuer Verkaufstermin ist nicht angekündigt. **ResortPass Tracker** prüft den offiziellen Ticketshop alle 15 Minuten und benachrichtigt bestätigte Abonnenten, sobald ein Pass wirklich kaufbar ist.

🔗 **Live:** [www.resortpass-europapark.ch](https://www.resortpass-europapark.ch)

---

## Features

- **15-Minuten-Verfügbarkeitscheck** — Silver & Gold, mit zweiter Bestätigung vor einem Alert
- **Live-Wartezeiten** — Europa-Park-Attraktionen, serverseitig alle fünf Minuten aktualisiert
- **Besucherprognose** — kommende Öffnungstage mit Crowd-Index und gemeldeten Öffnungszeiten, stündlich aktualisiert
- **E-Mail-Benachrichtigung** — Double Opt-In, sofortiger Alarm bei Verfügbarkeit
- **Verlauf und Feed** — reale Prüfungen, tägliche Zusammenfassungen und RSS
- **Planungswissen in 17 Sprachen** — Deutsch, Englisch, Französisch, Italienisch, Niederländisch, Spanisch, Schwedisch, Rumänisch, Tschechisch, Polnisch, Türkisch, Dänisch, Griechisch, Portugiesisch, Norwegisch, Hebräisch und Ungarisch
- **Interaktive Reiseplanung** — Besuchsdauer, Kosten, Familienattraktionen, Rulantica, Unterkunft, Restaurants und ResortPass-Entscheidung
- **Saubere Suchmaschinen-Signale** — lokalisierte Canonicals und `hreflang`, strukturierte Daten, Sitemap sowie `llms.txt`/`llms-full.txt`
- **Kein Nutzer-Tracking** — keine Tracking-Cookies, kein Analytics, keine Werbung; technische Server-Logs sind in der Datenschutzerklärung beschrieben
- **Community** — moderierte Tipps von bestätigten Abonnenten
- **Open Source** — 100% transparent

---

## Tech-Stack

| Komponente | Technologie |
|-----------|-------------|
| Website | Astro 6 + Tailwind CSS v4 |
| Runtime | Bun |
| Scraper | Bun Script mit `fetch()` + HTML-Parsing |
| Datenbank | SQLite (via `bun:sqlite`) |
| E-Mail | Brevo SMTP Relay (via nodemailer) |
| Webserver | Caddy (automatisches HTTPS) |
| Container | Docker + Docker Compose |
| Hosting | Hetzner Cloud VPS |

---

## Projektstruktur

```
resortpass-tracker/
├── src/                          # Astro Website
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro           # Hauptseite (DE)
│   │   ├── [...guide].astro      # 12 Ratgeber × 17 Sprachen
│   │   ├── wartezeiten.astro     # Live-Wartezeiten (DE)
│   │   ├── besucherprognose.astro # Besucherprognose (DE)
│   │   ├── {en,fr,it}/            # Lokalisierte Seiten
│   │   ├── llms.txt.ts            # KI-lesbarer Ratgeberindex
│   │   ├── llms-full.txt.ts       # Vollständiger KI-Kontext
│   │   ├── impressum.astro       # Impressum + Datenschutz
│   │   ├── confirm.astro         # E-Mail-Bestätigung
│   │   ├── unsubscribe.astro     # Abmeldebestätigung
│   │   └── 404.astro
│   ├── components/
│   │   ├── planning/             # Ratgeber-Layouts und sieben Planungswerkzeuge
│   │   ├── HomePage.astro        # Gemeinsame lokalisierte Startseite
│   │   ├── WaitTimesPage.astro   # Gemeinsame Live-Wartezeiten-Seite
│   │   ├── CrowdCalendarPage.astro # Gemeinsame Besucherprognose-Seite
│   │   ├── TokenPage.astro       # Bestätigung und Abmeldung
│   │   ├── CommunityFormPage.astro
│   │   ├── StatusCard.astro
│   │   ├── SubscribeForm.astro
│   │   ├── NewsSection.astro
│   │   └── HistorySection.astro
│   ├── content/                  # 17 native Ratgeberpakete + Inhalts-QA
│   ├── data/                     # Geprüfte Fakten, Quellen und Bildlizenzen
│   ├── i18n/                     # UI-Texte, Sprachregister und Routen
│   └── styles/global.css
├── scripts/
│   └── verify-static-build.ts    # Prüft alle 204 Ratgeber-Ausgaben
├── server/                       # Backend (Bun + Hono)
│   ├── index.ts                  # API Server
│   ├── db.ts                     # SQLite Setup & Queries
│   ├── email.ts                  # E-Mail Versand
│   ├── wait-times.ts             # Wartezeiten-API, Cache und Normalisierung
│   ├── crowd-calendar.ts         # Prognose/Öffnungszeiten, Cache und Normalisierung
│   └── checker.ts                # Scraper/Checker Script
├── emails/                       # E-Mail Templates (HTML)
│   ├── confirm.html
│   ├── alert.html
│   └── unsubscribe.html
├── systemd/                      # Systemd Services (Non-Docker)
│   ├── resortpass-api.service
│   ├── resortpass-checker.service
│   └── resortpass-checker.timer
├── deploy/
│   ├── Caddyfile                 # Caddy Reverse Proxy Config
│   └── setup.sh                  # Hetzner VPS Setup Script
├── docker-compose.yml
├── Dockerfile
└── package.json
```

---

## Lokale Entwicklung

### Voraussetzungen

- [Bun](https://bun.sh/) >= 1.0
- Node.js 22.12+ (optional, für Astro-Kompatibilität)

### Installation

```bash
git clone https://github.com/dischen87/resortpass-tracker.git
cd resortpass-tracker
bun install
```

### Umgebungsvariablen

Erstelle eine `.env`-Datei:

```env
SITE_URL=http://localhost:4321
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
FROM_EMAIL=noreply@resortpass-europapark.ch
FROM_NAME=ResortPass Tracker
PARK_QUEUE_TIMES_API_KEY=your-parkqueuetimes-api-key
```

### Starten

```bash
# Astro Dev Server (Frontend)
bun run dev

# API Server (Backend)
bun run server

# Checker einmalig ausführen
bun run check

# Tests, Typen, Produktions-Build und statische SEO-QA
bun run test
bun run typecheck
bun run build
bun run verify:static
```

Die vollständige Benachrichtigungsoberfläche ist weiterhin auf Deutsch, Englisch, Französisch und Italienisch verfügbar. Die 13 zusätzlichen Sprachen veröffentlichen bewusst zuerst die vollständigen Planungsratgeber und Werkzeuge; dadurch führen E-Mail-Aktionen nie auf noch nicht vorhandene lokalisierte Konto-Seiten.

Fakten mit Ablaufdatum liegen zentral mit Quelle, Prüfdatum und nächstem Review-Termin. Die eingesetzten Europa-Park- und Rulantica-Bilder stammen aus Wikimedia Commons; Autor, Lizenz und Lizenzlink werden direkt am Bild sowie als strukturierte Daten ausgegeben.

---

## Deployment (Docker)

### Mit Docker Compose

```bash
# .env-Datei erstellen (siehe oben)

# Bauen und starten
docker compose up -d --build

# Logs anzeigen
docker compose logs -f

# Stoppen
docker compose down
```

### Ohne Docker (systemd)

Für ein direktes Deployment auf einem VPS ohne Docker stehen systemd-Service-Dateien bereit:

```bash
# Service-Dateien kopieren
sudo cp systemd/*.service systemd/*.timer /etc/systemd/system/

# Pfade in den Service-Dateien anpassen
sudo systemctl daemon-reload

# API Server starten
sudo systemctl enable --now resortpass-api

# Checker Timer starten (alle 15 Minuten)
sudo systemctl enable --now resortpass-checker.timer
```

---

## API Endpunkte

| Methode | Pfad | Beschreibung |
|---------|------|-------------|
| `GET` | `/api/status` | Aktueller Verfügbarkeitsstatus |
| `GET` | `/api/wait-times` | Aktuelle Europa-Park-Wartezeiten (5-Minuten-Cache) |
| `GET` | `/api/crowd-calendar` | Normalisierte Besucherprognose und gemeldete Öffnungszeiten (1-Stunden-Cache) |
| `GET` | `/api/health` | Health Check |
| `GET` | `/api/news?lang=de` | Tägliche, lokalisierte Statusberichte |
| `GET` | `/api/feed.xml?lang=de` | RSS-Feed |
| `GET` | `/api/history-stats` | Aggregierte Statistiken |
| `GET` | `/api/history/:type` | Monatliche Heatmap (silver/gold) |
| `GET` | `/api/recent-checks` | Letzte Checks (default: 24h) |
| `POST` | `/api/subscribe` | E-Mail-Abo anlegen |
| `GET` | `/api/confirm?token=` | E-Mail bestätigen (Double Opt-In) |
| `POST` | `/api/unsubscribe` | Abmelden (Token im JSON-Body) |
| `GET` | `/api/community` | Freigegebene Community-Tipps |
| `POST` | `/api/community/submit` | Tipp mit Community-Token einreichen |
| `GET` | `/api/community/pending` | Offene Tipps (`Authorization: Bearer …`) |
| `POST` | `/api/community/moderate` | Tipp moderieren (`Authorization: Bearer …`) |

---

## Überwachte URLs

| Pass-Typ | URL |
|-----------|-----|
| ResortPass Silver | `https://tickets.mackinternational.de/de/ticket/resortpass-silver` |
| ResortPass Gold | `https://tickets.mackinternational.de/de/ticket/resortpass-gold` |
| Übersicht | `https://tickets.mackinternational.de/de/resortpass/uebersicht` |

Die Live-Wartezeiten werden über die dokumentierte ParkQueueTimes-API geladen und serverseitig fünf Minuten zwischengespeichert. Dafür ist `PARK_QUEUE_TIMES_API_KEY` erforderlich. Die geforderte Attribution „Powered by ParkQueueTimes.com“ wird auf jeder Wartezeiten-Seite angezeigt. Der browserseitige Endpunkt ist nur für die eigene Website vorgesehen, nicht indexierbar und liefert normalisierte Anzeigefelder. Rohdaten-Feeds, Historien, abgeleitete Datendienste oder eine Weitergabe erfordern vorab eine gesonderte Erlaubnis des Anbieters.

Die Besucherprognose kombiniert den von ParkQueueTimes gelieferten Crowd-Index mit gemeldeten Öffnungszeiten. Sie zeigt nur heute und zukünftige Tage aus dem aktuell verfügbaren Quellzeitraum, wird stündlich erneuert und bleibt ausdrücklich eine Orientierung — keine Besucherzählung, Wartezeitgarantie oder eigene KI-Prognose.

Da Park-ID 31 auch Rulantica- und Resort-Einträge enthält, lässt der Server ausschliesslich die gepflegte Europa-Park-Bahn-Liste zu. Neue oder umbenannte Attraktionen müssen nach einer echten API-Antwort bewusst ergänzt werden; unbekannte Namen werden nicht veröffentlicht.

---

## Disclaimer

Dies ist ein **inoffizielles Community-Projekt** und steht in keiner Verbindung zum Europa-Park oder der Mack Rides GmbH. Alle Markenrechte liegen bei den jeweiligen Inhabern.

---

## Lizenz

[MIT](LICENSE) — Frei nutzbar, auch kommerziell.
