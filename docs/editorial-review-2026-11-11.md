# Quellen- und Bildrechteprüfung · 11. November 2026

Ausführung mit `resortpass-editorial-review`, Zeitzone Europe/Zurich. Ausgangsstand: `8b404c3d04b23cf89270abbc48462cd81c714620`, saubere Arbeitskopie auf `codex/editorial-review-2026-10-06`. Der neue Vorschlag liegt auf `codex/editorial-review-2026-11-11` und enthält als Vorgeschichte die bereits gepushte, noch nicht in `main` enthaltene Oktoberprüfung.

Fällig waren 24 von 36 Fakten und keine der acht Medienprüfungen. Sieben registrierte offizielle Primärquellen waren erreichbar; es gab keine Abruffehler. 23 bestehende Fakten konnten erneut verifiziert werden. Der abgelaufene Sommer-Früheintritt ist aus der inzwischen umgestellten Quelle nicht erneut belegbar.

## Belegte Korrekturen

- **ResortPass-Beginn:** Die [FAQ](https://www.europapark.de/de/resortpass/faq) bestätigt ein Jahr ab dem beim Kauf gewählten Startdatum innerhalb der folgenden 14 Tage. Der bisherige Homepage-Text behauptete in allen 17 Sprachen einen Beginn mit dem ersten Besuch. Nur `info.what_text` wurde in den vier Hauptsprachen und 13 weiteren Sprachdateien korrigiert. InfoSection und Homepage-FAQ beziehen denselben Text.
- **Saisonwechsel:** Die [Hotelvorteile](https://www.europapark.de/de/uebernachten/uebernachtungsmoeglichkeiten/erlebnishotels/vorteile-fuer-hotelgaeste) nennen jetzt 10:00 Uhr und datieren HALLOWinter auf 02.–27.11.2026. Dafür gibt es einen eigenen Fact; der Hotelvergleich referenziert ihn. Der Sommer-Fact mit 08:15 Uhr bis 01.11.2026 bleibt historisch unverändert. Die aktuelle Quelle belegt ihn nicht erneut; seine Prüfdaten bleiben 06.10./01.11.2026. Das ist kein Beleg, dass der frühere Sommerwert falsch war.
- **ResortPass-Preisfenster:** Die [Ticketseite](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) bestätigt weiterhin Silver 325/275 EUR und Gold 495/430 EUR, veröffentlicht dafür jedoch keine festen Preisgültigkeitsgrenzen. Bei diesen vier Facts werden beide Grenzen `null`. Caveats verweisen für aktuelle Kaufbarkeit auf Live-Tracker und Ticketshop, statt eine statische Verkaufsbeobachtung an das neue Prüfdatum zu hängen.
- **Parken:** Die [Anreiseseite](https://www.europapark.de/de/freizeitpark/infos/planen-sie-ihren-besuch/anreise-zum-europa-park) bestätigt 10 EUR und kündigt 12 EUR ab 20.03.2027 an. Der vorhandene Wert bis 19.03.2027 bleibt erhalten, der unbekannte Beginn wird `null`; die angekündigte Folgegebühr steht getrennt im Caveat.
- **Bedingungen präzisiert:** Die FAQ unterscheidet Portalreservierungen, Europa-Park-Eintritte über eine qualifizierende Übernachtungsbuchung mit hinterlegter Pass-ID und weiterhin separat zu reservierende Rulantica-Besuche. Die Silver-Tagesgastregel und diese Hotelausnahmen sind jetzt in den Fact-Caveats getrennt beschrieben. Für die regulären [Rulantica-Zeiten](https://www.europapark.de/de/rulantica/infos/planen-sie-ihren-besuch/rulantica-oeffnungszeiten) nennt das Register auch die bevorstehende Schließung vom 16.–27.11.2026 sowie die Weihnachts- und Silvester-Ausnahmen.

## Quelle → Fakten

| Gelesene Primärquelle | Verifizierter Registerumfang |
| --- | --- |
| [Hotelvorteile](https://www.europapark.de/de/uebernachten/uebernachtungsmoeglichkeiten/erlebnishotels/vorteile-fuer-hotelgaeste) | `hotel-guests-rulantica-early-entry` (09:00 Uhr), `hotel-resort-shuttle` (kostenfrei); neuer `hotel-guests-europa-park-early-entry-hallowinter-2026` (10:00 Uhr, 02.–27.11.). Abgeschlossener Sommer-Fact nicht neu bestätigt. |
| [Rulantica-Öffnungszeiten](https://www.europapark.de/de/rulantica/infos/planen-sie-ihren-besuch/rulantica-oeffnungszeiten) | `rulantica-standard-opening-time`, `rulantica-standard-closing-time`: regulär 09:30–22:00 Uhr, mit veröffentlichten Schließ- und Sonderzeiten. |
| [Anreise](https://www.europapark.de/de/freizeitpark/infos/planen-sie-ihren-besuch/anreise-zum-europa-park) | `europa-park-standard-parking-price-2026`, einschließlich angekündigtem Folgepreis. |
| [Europa-Park-Tickets](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) | Vier Europa-Park-Ein-/Zweitages-Preisbereiche, vier Silver-/Gold-Preise und `resortpass-silver-predefined-opening-days`. Alle Zahlen unverändert. Ein-/Zweitagesfenster 28.03.2026–09.01.2027 bestätigt. |
| [Rulantica-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | Fünf reguläre Onlinepreisbereiche: Tag Erwachsene/Kinder, Abend Erwachsene/Kinder, Moonlight. Zahlen und Zeitraum 28.03.2026–19.03.2027 bestätigt; Hoteltarife separat. |
| [ResortPass-FAQ](https://www.europapark.de/de/resortpass/faq) | `resortpass-validity-period` (ein Jahr), `resortpass-simultaneous-europa-park-reservations` (fünf Portalreservierungen), zusätzliche Belege zu Startdatum und Hotel-/Rulantica-Ausnahmen. |
| [ResortPass-Produktübersicht](https://www.europapark.de/de/resortpass/europa-park-resortpass) | `resortpass-gold-all-opening-days`, `resortpass-gold-rulantica-day-tickets` (zwei persönliche Tagestickets innerhalb der Passgültigkeit). |

Die ebenfalls veröffentlichten 2027-Ticketblöcke ersetzen nicht die korrekt datierten 2026-Preisbereiche. Der Kostenrechner erhält durch diesen Vorschlag keine neue Tarifauswahl für 2027.

## Prüfdaten und Umfang

Nur die 23 erneut verifizierten bestehenden Facts erhalten `checkedAt: 2026-11-11` und `nextReviewAt: 2026-12-01`. Der neue HALLOWinter-Fact wird zum 27.11.2026 erneut fällig. Alle zwölf nicht fälligen Facts und der historische Sommer-Fact bleiben vollständig unverändert; letzterer bleibt ausdrücklich als nicht erneut verifizierter, fälliger Datensatz sichtbar.

Das Änderungsdatum der Homepages wird wegen der tatsächlichen Textkorrektur auf 11.11.2026 gesetzt. Das globale Guide-Prüfdatum und die übrigen Guide-Daten werden nicht angehoben. Änderungen an Fact-Metadaten und Caveats gelangen in das generierte `llms-full.txt`. Die acht Medien sind erst am 01.07.2027 fällig; Commons-Abfragen, Credit-Änderungen und neue Bild-Prüfdaten waren nicht erforderlich.

## Validierung

44 fokussierte Daten-, Sprach-, Guide- und Routentests bestanden, 9.688 Assertions; Typecheck bestanden. Build mit 334 HTML-Seiten, statische Prüfung für 204 Guides/17 Sprachen und SEO-Prüfung für 282 indexierbare Seiten bestanden. Ein zusätzlicher Vergleich bestätigt 23 bestehende Prüfdatumsänderungen, 13 unveränderte Originaldatensätze, einen neuen saisonalen Fact sowie identische HTML-/FAQ-Antworten in allen 17 Sprachen und das hebräische RTL-Markup. Diff-Prüfung ohne Fehler.

Dies ist ein geprüfter Pflegevorschlag. Browserlayout, Barrierefreiheit und Produktionszustand wurden in diesem Lauf nicht erneut abgenommen. Kein Deployment und keine externen Nachrichten sind Teil dieses Auftrags.
