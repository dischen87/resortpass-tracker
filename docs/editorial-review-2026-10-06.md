# Quellen- und Bildrechteprüfung · 6. Oktober 2026

Pflegelauf mit dem projektspezifischen `resortpass-editorial-review`-Skill. Ausführungstag: 2026-10-06, Europe/Zurich. Basis: `62fedc51ac6c3b51125835bd2694b721870318cf`; die Arbeitskopie war vor Beginn sauber. Fällig waren fünf von 36 Fakten und keine der acht Medienprüfungen.

Die beiden registrierten offiziellen Primärquellen wurden erfolgreich gelesen. Alle fünf Werte und ihre Qualifier sind weiterhin bestätigt. Bei drei Rulantica-Fakten sind jedoch die gespeicherten Datumsgrenzen nicht durch diese Quellen belegt.

| Fact-ID | Primärquelle und verifizierter Inhalt | Gültigkeitsgrenzen im Diff |
| --- | --- | --- |
| `hotel-guests-europa-park-early-entry-2026` | [Hotelvorteile](https://www.europapark.de/de/uebernachten/uebernachtungsmoeglichkeiten/erlebnishotels/vorteile-fuer-hotelgaeste): Sommereintritt ab 08:15 Uhr mit gültigem Ticket; ausdrücklich genannte Sommersaison 28.03.–01.11.2026. | Bestehendes Saisonfenster bestätigt. |
| `hotel-guests-rulantica-early-entry` | Dieselbe Hotelvorteile-Seite: regulärer Rulantica-Eintritt ab 09:00 Uhr; Abend- und Moonlight-Tickets haben eigene frühere Einlasszeiten. | `validFrom` und `validUntil` auf `null`; für diesen Vorteil werden keine festen Datumsgrenzen veröffentlicht. |
| `hotel-resort-shuttle` | Dieselbe Hotelvorteile-Seite: kostenfreier Resort-Shuttle zwischen Erlebnishotels, Hotelgäste-Parkeingängen und Eatrenalin. | Bestehende offene Grenzen bestätigt. |
| `rulantica-standard-opening-time` | [Rulantica-Öffnungszeiten](https://www.europapark.de/de/rulantica/infos/planen-sie-ihren-besuch/rulantica-oeffnungszeiten): regulär 09:30 Uhr, unter Berücksichtigung veröffentlichter Ausnahmen. | Beide Grenzen auf `null`. |
| `rulantica-standard-closing-time` | Dieselbe Öffnungszeiten-Seite: regulär 22:00 Uhr, unter Berücksichtigung veröffentlichter Ausnahmen. | Beide Grenzen auf `null`. |

Der 19.03.2027 bezeichnet auf der Rulantica-Seite die Preisgültigkeit und auf der Hotelvorteile-Seite die Eatrenalin-Buchbarkeit. Diese Angaben belegen kein Gültigkeitsfenster für die drei Rulantica-Zeitangaben. Auch der 28.03.2026 wird für diese drei Angaben nicht als Beginn genannt. Die Korrektur entfernt daher unbelegte Grenzen und ergänzt die entsprechenden Caveats. Sie behauptet keine geänderten Öffnungszeiten oder dauerhafte Gültigkeit.

Die Hinweise auf Ausnahmen bleiben erforderlich: Die Öffnungszeiten-Seite nennt Schließtage vom 16.–27.11. sowie am 24./25.12.2026 und eine Schließung um 19:00 Uhr am 31.12.2026. Die regulären Zeiten ersetzen keine Prüfung des Besuchstags.

Nur die fünf tatsächlich verifizierten Fakten erhalten `checkedAt: 2026-10-06` und `nextReviewAt: 2026-11-01`. Die übrigen 31 Fakten und die globalen Guide-Prüfdaten wurden nicht erneut verifiziert. Die geänderten Datumsgrenzen und Caveats erscheinen im generierten `llms-full.txt`; die fachlichen Werte bleiben gleich. Lokalisierte Guide-Texte und Bildcredits benötigen dafür keine Anpassung.

Alle acht Medien haben `nextReviewAt: 2027-07-01`; kein Commons-Abruf war fällig. Die unabhängige Registerprüfung fand keine Fehler an Prüfdaten, Herkunft, Lizenzangaben oder lokalen Dateien; die 21 registrierten responsiven Bildmaße stimmen. Medien-Prüfdaten wurden nicht angehoben.

Validierung: 12 Daten-/Provenienztests bestanden, TypeScript bestanden, 334 Seiten gebaut, statische Prüfung für 204 Guides in 17 Sprachen und SEO-Prüfung für 282 indexierbare Seiten bestanden. Die Quellen-/Datumsinvariante bestätigt genau fünf heute geprüfte Fakten sowie keine verbleibenden fälligen Fakten oder Medien in diesem Vorschlag. Diff-Prüfung ohne Fehler.

Der geprüfte Vorschlag liegt auf `codex/editorial-review-2026-10-06`. Dieser Pflegeauftrag enthält kein Produktionsdeployment, keine Nachrichten an Abonnenten und keine Kontoverbindungen.
