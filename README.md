# 🎢 ResortPass Tracker

> Nie wieder den Verkaufsstart verpassen.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Der Europa-Park ResortPass (Jahreskarte) ist chronisch ausverkauft. Es gibt keine offizielle Warteliste und keine Benachrichtigung. **ResortPass Tracker** prüft stündlich den Ticketshop und benachrichtigt dich per E-Mail, sobald der Pass wieder verfügbar ist.

🔗 **Live:** [www.resortpass-europapark.ch](https://www.resortpass-europapark.ch)

---

## Features

- **Stündlicher Verfügbarkeitscheck** — Silver & Gold ResortPass
- **E-Mail-Benachrichtigung** — Double Opt-In, sofortiger Alarm bei Verfügbarkeit
- **Verlaufsstatistiken** — Heatmap & Tracker seit Beginn der Überwachung
- **Mehrsprachig** — Deutsch, Englisch, Französisch, Italienisch
- **Kein Tracking** — Keine Cookies, kein Analytics, keine Werbung
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
│   │   ├── en/index.astro        # Englisch
│   │   ├── fr/index.astro        # Französisch
│   │   ├── it/index.astro        # Italienisch
│   │   ├── impressum.astro       # Impressum
│   │   ├── confirm.astro         # E-Mail bestätigt
│   │   ├── unsubscribe.astro     # Abgemeldet
│   │   ├── 404.astro
│   │   └── sitemap.xml.ts
│   ├── components/
│   │   ├── StatusCard.astro      # Verfügbarkeitskarte
│   │   ├── SubscribeForm.astro   # E-Mail-Formular
│   │   ├── HistorySection.astro  # Verlaufsstatistiken
│   │   ├── Hero.astro
│   │   ├── InfoSection.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── Footer.astro
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

# Checker Timer starten (stündlich)
sudo systemctl enable --now resortpass-checker.timer
```

---

## API Endpunkte

| Methode | Pfad | Beschreibung |
|---------|------|-------------|
| `GET` | `/api/status` | Aktueller Verfügbarkeitsstatus |
| `GET` | `/api/health` | Health Check |
| `GET` | `/api/history-stats` | Aggregierte Statistiken |
| `GET` | `/api/history/:type` | Monatliche Heatmap (silver/gold) |
| `GET` | `/api/recent-checks` | Letzte Checks (default: 24h) |
| `POST` | `/api/subscribe` | E-Mail-Abo anlegen |
| `GET` | `/api/confirm?token=` | E-Mail bestätigen (Double Opt-In) |
| `GET` | `/api/unsubscribe?token=` | Abmelden |

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
