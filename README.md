# 🎢 ResortPass Tracker

> Nie wieder den Verkaufsstart verpassen.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Der Europa-Park ResortPass ist derzeit ausverkauft; ein neuer Verkaufstermin ist nicht angekündigt. **ResortPass Tracker** prüft den offiziellen Ticketshop alle 15 Minuten und benachrichtigt bestätigte Abonnenten, sobald ein Pass wirklich kaufbar ist.

🔗 **Live:** [www.resortpass-europapark.ch](https://www.resortpass-europapark.ch)

---

## Features

- **15-Minuten-Verfügbarkeitscheck** — Silver & Gold, mit zweiter Bestätigung vor einem Alert
- **E-Mail-Benachrichtigung** — Double Opt-In, sofortiger Alarm bei Verfügbarkeit
- **Verlauf und Feed** — reale Prüfungen, tägliche Zusammenfassungen und RSS
- **Mehrsprachig** — Deutsch, Englisch, Französisch, Italienisch
- **Kein Nutzer-Tracking** — keine Tracking-Cookies, kein Analytics, keine Werbung; technische Server-Logs sind in der Datenschutzerklärung beschrieben
- **Community** — moderierte Tipps von bestätigten Abonnenten
- **Open Source** — 100% transparent

---

## Tech-Stack

| Komponente | Technologie |
|-----------|-------------|
| Website | Astro 5 + Tailwind CSS v4 |
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
│   │   ├── {en,fr,it}/            # Lokalisierte Seiten
│   │   ├── impressum.astro       # Impressum + Datenschutz
│   │   ├── confirm.astro         # E-Mail-Bestätigung
│   │   ├── unsubscribe.astro     # Abmeldebestätigung
│   │   └── 404.astro
│   ├── components/
│   │   ├── HomePage.astro        # Gemeinsame lokalisierte Startseite
│   │   ├── TokenPage.astro       # Bestätigung und Abmeldung
│   │   ├── CommunityFormPage.astro
│   │   ├── StatusCard.astro
│   │   ├── SubscribeForm.astro
│   │   ├── NewsSection.astro
│   │   └── HistorySection.astro
│   ├── i18n/translations.ts
│   └── styles/global.css
├── server/                       # Backend (Bun + Hono)
│   ├── index.ts                  # API Server
│   ├── db.ts                     # SQLite Setup & Queries
│   ├── email.ts                  # E-Mail Versand
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
- Node.js 18+ (optional, für Kompatibilität)

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
```

### Starten

```bash
# Astro Dev Server (Frontend)
bun run dev

# API Server (Backend)
bun run server

# Checker einmalig ausführen
bun run check

# Tests und Typen
bun run test
bun run typecheck
```

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

---

## Disclaimer

Dies ist ein **inoffizielles Community-Projekt** und steht in keiner Verbindung zum Europa-Park oder der Mack Rides GmbH. Alle Markenrechte liegen bei den jeweiligen Inhabern.

---

## Lizenz

[MIT](LICENSE) — Frei nutzbar, auch kommerziell.
