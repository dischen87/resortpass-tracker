# ResortPass Tracker: Integrationen und automatische Auslöser

Analyse vom 30. September 2026. Grundlage sind der vorhandene Code, die offiziellen OpenAI-Dokumentationen und eine Abfrage des verfügbaren Plugin-Katalogs. Der lokale Kalenderexport wurde in diesem Auftrag umgesetzt und 19 ursprünglich überfällige Fakten wurden erneut geprüft. Die beschriebenen MCP-, Webhook-, Plugin- und Zeitplanverbindungen bleiben Vorschläge; sie wurden nicht angeschlossen oder aktiviert.

## Die fünf sinnvollsten Ausbaupunkte

| Priorität | Auslöser → Aktion | Nutzen | Ausgangslage | Verbindung und Datengrenze |
| --- | --- | --- | --- | --- |
| P0, umgesetzt | Besuchsplan berechnet, Startdatum gewählt, „Im Kalender speichern“ gedrückt → lokale `.ics`-Datei erzeugen | Der mobile Plan wird ein konkreter Termin und bleibt zwischen Geräten nutzbar. | Datumsfeld und Kalenderdownload sind im Besuchsplaner vorhanden; neue Texte decken alle 17 Sprachen ab. | Kein Login, kein Plugin und kein Server-Speicher nötig. Nur das gewählte Datum, die empfohlene Planungsdauer und eigene redaktionelle Hinweise exportieren. |
| P1 | Bestätigter ResortPass-Wechsel `sold_out → available` → bestehenden E-Mail-Alarm und zusätzlich abonniertes Statusereignis liefern | Die knappe Verkaufsphase erreicht Nutzer in ihrem gewünschten Kanal. | Zweite Prüfung nach 30 Sekunden und E-Mail an bestätigte Abonnenten sind implementiert. Es fehlen Event-Outbox und Webhook-Abos. | Webhook und ChatGPT-Monitoring ausdrücklich abonnieren. Keine E-Mail-Adressen, Community- oder Abmeldetoken im Ereignis. |
| P1 | Frage zu ResortPass-Verfügbarkeit oder eigener Reiseplanung → passende Werkzeuge eines ResortPass-Plugins aufrufen | Der Tracker wird direkt aus ChatGPT/Codex nutzbar, ohne Inhalte manuell zu kopieren. | Öffentliche eigene Status-JSON, RSS und redaktionelle `llms`-Dateien sind vorhanden. MCP-Server/Plugin fehlen. | Erste Version ausschliesslich lesend. Private Abos und Buchungen bleiben ausserhalb der Werkzeuge. Keine ParkQueueTimes-Rohwerte in einem öffentlichen MCP-Datendienst. |
| P1 | Ein `nextReviewAt` ist fällig oder eine geprüfte Bildrevision ändert sich → Quellen überprüfen und einen prüfbaren Aktualisierungsvorschlag erstellen | Preise, Passregeln, Fotos und Übersetzungen bleiben nachvollziehbar gepflegt. | Quellenregister und Prüfdaten existieren; 19 ursprünglich überfällige Fakten wurden am 30. September unverändert bestätigt. Ein Review-Automatismus fehlt. | Ein geplanter Codex-Lauf darf zunächst Quellen lesen und einen Diff erstellen. Kein automatisches Freigeben neuer Bildrechte oder unbelegtes Erhöhen des Prüfdatums. |
| P2 | Passendes GitHub-PR-Ereignis → ein unterstützter ChatGPT-Web-/Mobile-Task prüft betroffene mobile Ansichten, Formulare, Bildlizenzen und Mehrsprachigkeit | Wiederholte Designarbeit erhält eine konsistente Qualitätskontrolle. | GitHub ist laut Plugin-Katalog installiert. Ein Ereignis-Task wurde nicht eingerichtet. | Repository-Zugriff und konkret gewählte Ereignisfilter erforderlich. Review und Bericht zuerst; externe Kommentare, Merge und Deploy nur innerhalb einer entsprechend autorisierten Aufgabe. |

Diese Prioritäten sind eine Produktentscheidung aus dem vorhandenen Funktionsumfang: kalenderfähige Pläne und verlässliche Signale helfen einem Besucher unmittelbar; zusätzliche Accounts oder ein allgemeiner KI-Chat haben zunächst geringeren Nutzen.

## P0: Umgesetzter lokaler Kalenderexport

Der Besuchsplaner enthält jetzt ein optionales Startdatum und eine Downloadaktion am berechneten Ergebnis. Exportiert wird ein ganztägiger, selbst geplanter Besuch über die empfohlenen Tage. Datum und Plan entstehen vollständig im Browser. Die 17 Sprachfassungen machen deutlich, dass dies ein persönlicher Plan und keine Eintritts- oder ResortPass-Reservierung ist.

Die Datei entsteht als Browser-Blob und benötigt keine Kalenderberechtigung. Öffnungszeiten, Crowd-Indizes oder Wartezeiten werden nicht übernommen. Sie enthält eigene Routenvorschläge, Hinweise und den Link zurück zum lokalisierten Planer. Ein fehlendes oder ungültiges Datum führt zu einer lokalisierten Meldung und Fokus auf das Datumsfeld. Der Kalendertermin trägt `STATUS:TENTATIVE` und `TRANSP:TRANSPARENT`; er stellt keine Buchung dar.

Die Implementierung in `src/lib/visit-calendar.ts` erzeugt `VCALENDAR`, `VERSION:2.0`, `PRODID`, `VEVENT`, `UID`, `DTSTAMP`, `DTSTART;VALUE=DATE`, `DTEND;VALUE=DATE`, `SUMMARY`, `DESCRIPTION` und `URL`. Das Enddatum ist exklusiv: ein zweitägiger Besuch ab dem 1. Oktober erhält den 3. Oktober als `DTEND`. CRLF, korrektes Text-Escaping und Faltung langer UTF-8-Zeilen vermeiden fehlerhafte Kalenderimporte. Bei Ganztagsterminen muss keine geschätzte Öffnungszeit oder Zeitzone erfunden werden. [iCalendar, RFC 5545](https://www.rfc-editor.org/rfc/rfc5545.html#section-3.6.1)

Google Calendar oder Outlook Calendar lohnen sich als spätere persönliche Komfortverbindung, wenn jemand ausdrücklich freie Termine abgleichen oder den fertigen Plan in einen verbundenen Kalender eintragen möchte. Das Schreiben eines Kalendertermins ist eine getrennte Aktion. Die Website sollte den Export auch ohne solche Verbindungen anbieten.

## P1: Statusereignisse an der bestehenden Bestätigung aufhängen

Der Checker verwirft Bot-Schutzseiten und unklare Antworten. Ein positives Ergebnis wird nach 30 Sekunden erneut geprüft. Erst der bestätigte Wechsel von einem vorherigen `false` zu `true` löst `sendAlerts()` aus. Genau dort sollte ein eigenes Ereignis `resortpass.availability_confirmed` entstehen. Ein Kaltstart ohne vorherigen verlässlichen Status oder ein `unknown` ist kein Verkaufsereignis.

Empfohlenes fachliches Payload:

```json
{
  "eventId": "stable-per-confirmed-transition",
  "name": "resortpass.availability_confirmed",
  "timestamp": "2026-10-01T10:30:00Z",
  "data": {
    "passType": "silver",
    "state": "available",
    "checkedAt": "2026-10-01T10:30:00Z",
    "url": "https://www.resortpass-europapark.ch/"
  }
}
```

Das Beispiel ist eine vorgeschlagene Form, kein historischer Verkauf. Ein dauerhaft gespeichertes Outbox-Ereignis verhindert, dass ein Prozessabbruch zwischen Statusspeicherung und Zustellung das Signal verliert. Zustellversuche nutzen dieselbe Event-ID, begrenzte Wiederholungen und einen separaten Worker. Empfänger deduplizieren damit wiederholte Zustellungen. Diese Architektur ist eine Empfehlung für diesen Tracker.

Für eine spätere eigene ChatGPT-Verbindung sind inzwischen **MCP Events** dokumentiert: Ein Nutzer wählt ausdrücklich, was überwacht werden soll und was nach einem Ereignis geschehen soll. Der Server benötigt MCP 2.0 mit Protokollversion `2026-07-28`, die Methoden `events/list`, `events/subscribe`, `events/unsubscribe`, dauerhaft gespeicherte Abos und signierte HTTPS-Callbacks. Callback-Verifikation, Ablauf, Abmeldung und Zugriffsentzug gehören zum vollständigen Lebenszyklus. Die dokumentierte Integration verwendet Webhooks; Polling und Streaming sind dafür nicht unterstützt. Diese optionale Erweiterung ist eine Implementierungsoption für ChatGPT, keine hier verifizierte Desktop-Codex-Funktion. [OpenAI: MCP Events](https://developers.openai.com/plugins/build/mcp-events)

Das bestehende E-Mail-Abo bleibt der verfügbare Alarmweg. RSS enthält deterministische Tageszusammenfassungen und ist deshalb für Beobachtung und Archivierung geeignet; es ersetzt keinen unmittelbaren Verkaufsalarm.

## P1: Ein kleines eigenes Plugin statt eines breiten Assistenten

Eine erste ResortPass-Integration sollte drei klar begrenzte Werkzeuge anbieten:

| Vorgeschlagenes Werkzeug | Eingabe | Ergebnis |
| --- | --- | --- |
| `resortpass.get_status` | optional Sprache | Eigener Silver-/Gold-Status mit Prüfzeitpunkt, Alter, Frische und Link zur Statusseite |
| `resortpass.find_guide` | Frage oder Themen-ID, Sprache | Passender eigener Ratgeber mit Quellendatum und lokalisiertem Canonical-Link |
| `resortpass.plan_visit` | Startdatum, Tage, Gruppe, Ankunftswunsch, selbst gewählte Belastung, Rulantica-Wunsch | Eigener deterministischer Plan mit Einschränkungen; keine Reservierung, keine fremden Live-Daten |

Werkzeuge sind über Namen, Beschreibung und Eingabeschema auffindbar. Das Modell wählt sie passend zu einer Aufgabe und der Server validiert die Eingaben. Ein Produktionsserver sollte einen stabilen HTTPS-Endpunkt nutzen; private Daten und Nutzeraktionen benötigen die entsprechende Autorisierung. Ein MCP-Werkzeug allein startet keinen Hintergrundlauf. [OpenAI: MCP-Server](https://developers.openai.com/plugins/concepts/mcp-server)

Die Beschreibungen sollten konkrete positive und negative Fälle enthalten. Beispiel: „Bei Fragen nach aktuell kaufbarem ResortPass Silver/Gold eigenen Status mit Prüfzeitpunkt lesen. Nicht für individuelle Buchungen, Kontingente oder Eintrittsreservierungen verwenden.“ Testprompts sollten direkte Fragen, indirekte Besuchsplanung und Fehlanwendungen wie „Kaufe mir den Pass“ einschliessen. Das verbessert die Auswahl; es garantiert keinen Aufruf bei jeder ähnlich formulierten Frage. [OpenAI: Tool-Metadaten optimieren](https://developers.openai.com/plugins/guides/optimize-metadata)

Die lesenden Werkzeuge sollten als lesend und nicht destruktiv gekennzeichnet sein. Solche Kennzeichnungen ersetzen keine serverseitige Autorisierung. Ein öffentlicher Statusabruf benötigt keine Abonnentenliste; Bestätigungs-, Community- und Abmeldetoken dürfen weder in Werkzeugergebnissen noch in Logs eines fremden Systems auftauchen. [OpenAI: Werkzeug-Kennzeichnungen](https://developers.openai.com/plugins/reference#annotations)

`llms.txt` und `llms-full.txt` sind bereits hilfreiche Inhaltsverzeichnisse. Sie installieren keinen Skill und erzeugen kein Ereignis-Abo. Zusätzlich findet sich in `llms-full.txt` zur bekannten Korrektur nur der 19. März, während die Methodik auch den 9. Juni dokumentiert: ein geeigneter Fall für die nächste redaktionelle Synchronisierung.

## P1: Automatische redaktionelle Pflege mit einem eng gefassten Skill

Ein projektspezifischer Skill ist ein sinnvoller nächster Schritt für wiederholte Änderungen an mobilem Design, Fotos, Preisen oder ResortPass-Regeln. Seine Beschreibung kann auf die tatsächlich benötigten Aufgaben begrenzt sein. Codex/ChatGPT kann installierte Skills automatisch auswählen, wenn deren Beschreibung zur Aufgabe passt. Diese implizite Auswahl reagiert auf eine Aufgabe im Chat; sie ist kein Website-Klick- oder Hintergrundereignis. [OpenAI: Skills verwenden](https://learn.chatgpt.com/docs/build-skills#how-chatgpt-and-codex-use-skills)

Vorgeschlagener Ablauf für einen späteren Skill `resortpass-editorial-review`:

1. Fällige Fakten aus `src/data/facts.ts` sowie Bildrevisionen und Lizenzdatensätze aus `src/data/media.ts` identifizieren.
2. Nur deren angegebene Primärquellen lesen. Änderungen, unveränderte Fakten und nicht zugängliche Quellen auseinanderhalten.
3. Belegte Änderungen in den zentralen Daten vorschlagen und ihre betroffenen Sprachpakete bestimmen.
4. Prüfdaten nur nach tatsächlicher Verifikation aktualisieren. Eine unveränderte Quelle kann einen neuen Prüfzeitpunkt rechtfertigen; ein fehlgeschlagener Abruf nicht.
5. Relevante Typ-, Build-, Übersetzungs-, Quellen- und Layoutprüfungen ausführen. Bildausschnitte separat visuell prüfen.
6. Den Diff mit Quelle, Grund und offenen Punkten vorlegen. Keine fremden WIP-Dateien mitnehmen.

Zu Beginn der Analyse waren **19 von 36 Fakten** nach ihrem Review-Termin vom 15. August überfällig: Ticket- und Rulantica-Preise, Parken, Passpreise und Passregeln. Diese 19 Einträge wurden am **30. September 2026** anhand aktueller Primärquellen **unverändert bestätigt**. Nur ihre Felder `checkedAt` und `nextReviewAt` wurden auf `2026-09-30` beziehungsweise `2026-11-01` gesetzt. Der gemeinsame redaktionelle Prüfzeitpunkt und die übrigen 17 Einträge bleiben unverändert.

### Konkrete Zuordnung der erneuten Prüfung

Die folgende Tabelle nennt jeden geprüften Datensatz in `src/data/facts.ts` und die tatsächlich gelesene Betreiberquelle. Die Quellenadressen in den Datensätzen bleiben erhalten. Bei ResortPass-Einträgen wurde die Betreiber-Ticketshopübersicht zusätzlich als direkte Bestätigung von Preisen, Einschränkungen und Leistungsumfang herangezogen.

| Primärquelle | Fact-ID | Unverändert bestätigter Wert |
| --- | --- | --- |
| [Europa-Park Tickets](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) | `europa-park-one-day-adult-price-range-2026` | 67–76 EUR |
| [Europa-Park Tickets](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) | `europa-park-one-day-child-price-range-2026` | 56,50–65 EUR |
| [Europa-Park Tickets](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) | `europa-park-two-day-adult-price-range-2026` | 127–143,50 EUR |
| [Europa-Park Tickets](https://www.europapark.de/de/freizeitpark/europa-park-tickets-angebote) | `europa-park-two-day-child-price-range-2026` | 105–119 EUR |
| [Europa-Park Anreise](https://www.europapark.de/de/freizeitpark/infos/planen-sie-ihren-besuch/anreise-zum-europa-park) | `europa-park-standard-parking-price-2026` | 10 EUR pro regulärem Parktag |
| [Rulantica Online-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | `rulantica-day-adult-price-range-2026` | 41–54 EUR |
| [Rulantica Online-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | `rulantica-day-child-price-range-2026` | 38–51 EUR |
| [Rulantica Online-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | `rulantica-evening-adult-price-range-2026` | 37,50–46,50 EUR; regulär ab 17 Uhr |
| [Rulantica Online-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | `rulantica-evening-child-price-range-2026` | 35–43,50 EUR; regulär ab 17 Uhr |
| [Rulantica Online-Tickets](https://www.europapark.de/de/rulantica/tickets-angebote/tickets-angebote) | `rulantica-moonlight-price-range-2026` | 28–34 EUR für Erwachsene und Kinder; regulär ab 19 Uhr |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-silver-adult-price-2026` | 325 EUR |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-silver-reduced-price-2026` | 275 EUR für Kinder und Senioren |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-gold-adult-price-2026` | 495 EUR |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-gold-reduced-price-2026` | 430 EUR für Kinder und Senioren |
| [ResortPass FAQ](https://www.europapark.de/de/resortpass/faq) | `resortpass-validity-period` | 1 Jahr; gewählter Start innerhalb der nächsten 14 Tage |
| [ResortPass FAQ](https://www.europapark.de/de/resortpass/faq) | `resortpass-simultaneous-europa-park-reservations` | bis zu 5 Besuchstermine gleichzeitig, nach Verfügbarkeit |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-silver-predefined-opening-days` | Silver-Tagesgastzugang an vorab definierten Öffnungstagen |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-gold-all-opening-days` | Gold-Zugang an allen Öffnungstagen, mit Reservierung |
| [ResortPass Ticketshop](https://tickets.mackinternational.de/de/resortpass/uebersicht) | `resortpass-gold-rulantica-day-tickets` | 2 Rulantica-Tagestickets, mit Reservierung nach Verfügbarkeit |

Bei den Rulantica-Preisen wurde die Tabelle für reguläre Online-Tickets geprüft; die gesonderten Preise für Hotelgäste ersetzen diese Tarifgruppe nicht. Die ResortPass-Übersicht und FAQ führen Silver und Gold am Prüftag weiterhin ausdrücklich als nicht verfügbar. Das bestätigt den aktuellen Verkaufshinweis, garantiert aber keinen späteren Status.

Eine geplante Aufgabe kann diesen Skill täglich oder wöchentlich ausdrücklich verwenden. Desktop-Aufgaben mit lokalen Dateien benötigen einen eingeschalteten Rechner und die laufende App. Cloud-/Web-Aufgaben benötigen zugängliche Quellen und Verbindungen. Bei unveränderten oder nicht handlungsrelevanten Ergebnissen sollte der vorgeschlagene Monitor ruhig bleiben und nur neue Abweichungen, Fehlschläge oder nötige Entscheidungen melden. Ein Zeitplan wurde in diesem Auftrag nicht angelegt. [OpenAI: geplante Aufgaben](https://learn.chatgpt.com/docs/automations)

## P2: Vorhandene App-Ereignisse für Pflege nutzen

Laut der aktuellen offiziellen Dokumentation können berechtigte ChatGPT-Web-/Mobile-Pläne Aufgaben durch unterstützte Gmail-, Slack- oder GitHub-Ereignisse starten. Das gilt nicht für Desktop, CLI oder IDE. Ereignis-Tasks benötigen autorisierte App-Verbindungen; ein Task kombiniert keine Ereignistrigger mit einem Zeitplan. GitHub kann PR-Aktivität nach Repository, PR, Autor, Titel oder Label filtern. Gmail unterstützt neue eingehende Nachrichten mit optionalem Absender-/Betrefffilter. Das genaue Konto-/Workspace-Angebot muss bei der Einrichtung geprüft werden. [OpenAI: App-Ereignistrigger](https://learn.chatgpt.com/docs/automations#trigger-tasks-from-app-events)

Für diesen Tracker ist GitHub die erste nützliche App-Verbindung: Ein PR mit Änderungen an Komponenten, Stilregeln oder Medien kann einen gezielten UX-Review auslösen. Ein separater Review-Skill kann gemeinsame Anforderungen für 390-Pixel-Handyansichten, Desktop, Hebräisch/RTL, Tastaturbedienung und Bildcredits wiederverwenden. Der Trigger ist das gefilterte PR-Ereignis; die Arbeit bestimmt der gespeicherte Prompt.

Eine Gmail-Brücke wäre möglich: Ein Nutzer verbindet Gmail und abonniert ResortPass-E-Mails; nur eine neue bestätigte Alarmnachricht des bekannten Absenders löst eine Zusammenfassung mit offiziellem Shoplink aus. Sie gibt dem Mail-Plugin Zugriff innerhalb seiner Kontoberechtigungen und ist breiter als ein eigenes Status-Abo. Deshalb ist sie eine persönliche Zusatzoption. Sie darf keinen automatischen Kauf oder eine Reservierung auslösen.

## Verifizierter Plugin-Stand

Die Plugin-Katalogabfrage in dieser Sitzung ergab:

| Plugin | Stand | Sinnvolle Aufgabe |
| --- | --- | --- |
| GitHub | installiert | Repository- und PR-Kontext, später gefilterte PR-Ereignisse |
| Google Calendar | verfügbar, nicht installiert | Auf ausdrücklichen Wunsch freie Termine vergleichen oder Besuchstermin eintragen |
| Outlook Calendar | verfügbar, nicht installiert | Alternative für Microsoft-Kalender; dieselbe eng gefasste Aufgabe |
| Gmail | verfügbar, nicht installiert | Persönliche optionale Alarm-Mail-Brücke |
| Linear | verfügbar, nicht installiert | Findings als Tickets pflegen, wenn bereits ein Linear-Teamworkflow besteht |

Eine Kalenderverbindung genügt. Für den Kalenderdownload wird keine benötigt. Linear bringt erst Mehrwert, wenn die Pflege bereits dort stattfindet. Es wurden keine Plugins installiert, Verbindungen eingerichtet, Rechte geändert oder externen Nachrichten versandt. Installation bedeutet zudem noch keine verifizierte individuelle Account-Verbindung. Weitere Angebote können im [Plugin-Verzeichnis](https://chatgpt.com/plugins) geprüft werden.

## Die wichtige Lizenzgrenze für Live-Daten

Wartezeiten und Besucherprognosen kommen aus ParkQueueTimes. Der Code sperrt die Endpunkte `/api/wait-times`, `/api/park-now` und `/api/crowd-calendar` für die Weiterverwendung ausserhalb eigener Seiten. Diese Grenze sollte ein neues Plugin nicht umgehen.

Die aktuell gelesene API-Lizenz erlaubt Nutzung, Speicherung, Analyse, eigene Schlussfolgerungen und Anzeige im eigenen Produkt. Sie untersagt die Weiterlieferung der Daten in weitgehend ursprünglicher Form als Datei, Feed, API oder Kundendatensatz. Eine separate Enterprise-Vereinbarung kann solche Rechte einräumen. Auf dem Free-Plan bleibt sichtbare verlinkte Attribution erforderlich. Der vorhandene README-Satz, auch abgeleitete Datendienste benötigten grundsätzlich eine gesonderte Erlaubnis, ist pauschaler als die aktuelle Lizenz: eigene Prognosen und Empfehlungen sind dort grundsätzlich erlaubt; Datenweiterlieferung ist die entscheidende Grenze. [ParkQueueTimes: API-Datenlizenz, Abschnitt 8](https://parkqueuetimes.com/terms)

Folgerung für die hier vorgeschlagenen Ausbauten: `.ics` und erste MCP-Werkzeuge nutzen persönliche Eingaben, eigene ResortPass-Beobachtungen und eigenes redaktionelles Wissen. Wartezeitreihen, Crowd-Tabellen und Anbieteröffnungszeiten bleiben ausserhalb der Exporte. Für eine spätere externe Live-Daten-Integration muss der genaue Nutzungsfall und das vorhandene Lizenzmodell separat geprüft werden.

## Konkrete Reihenfolge

Lokale Kalenderdateien und die Prüfung der 19 ursprünglich überfälligen Fakten sind umgesetzt. Als nächste Schritte folgen robuste Verfügbarkeitsantworten und ein gezielter Pflege-Skill. Anschliessend einen kleinen lesenden MCP-Prototypen mit eigenen Daten bauen und mit direkten, indirekten und negativen Prompts testen. Ein echter ResortPass-Ereigniskanal folgt erst mit persistentem Outbox-/Abo-Lebenszyklus und vollständigen Zustelltests. Zeitpläne, persönliche Kalenderverbindungen und Event-Tasks werden anschliessend nach konkret gewähltem Kanal eingerichtet.

## Priorisierte technische Folgearbeiten

Diese beim Quellcode-Review gefundenen Statusfragen bestehen bereits im Projekt und wurden in diesem Designauftrag nicht umgebaut:

1. **P1: Unbekannt nicht durch einen alten Verkaufsstatus ersetzen.** `getBuildTimeStatus()` in `src/data/status-snapshot.ts` ersetzt eine aktuelle Antwort mit zwei unbekannten Zuständen oder einen Abruffehler durch den fest gespeicherten `sold_out`-Snapshot vom 1. August. Der alte Nachweis sollte als historische Beobachtung behandelt werden; eine aktuelle Ungewissheit braucht eine entsprechende Antwort.
2. **P1: Sichtbare Antwort und FAQ synchron zum Status halten.** `loadStatus()` in `src/components/HomePage.astro` aktualisiert Karten, Statuspills und `WebPage.dateModified`, aber nicht die ausführliche Verfügbarkeitsantwort oder das FAQ-Markup. Bei einem echten Wechsel können Teile derselben Seite widersprüchliche Antworten zeigen. Eine gemeinsame Zustandsformatierung sollte alle sichtbaren Statusaussagen aktualisieren.
3. **P2: Gemischte Zustände pro Pass ausgeben.** `formatAvailabilityAnswer()` in `src/data/availability-answer.ts` verwendet bei `unknown + sold_out` die kombinierte Nichtverfügbarkeitsantwort. Jeder Pass benötigt seine eigene Aussage, damit ein unbekannter Zustand nicht als bestätigtes Nein erscheint.
4. **P2: Guide-Texte von kurzfristiger Verfügbarkeit entkoppeln.** Die Antworten auf `resortPassGuide` und `resortPassPrices` sowie deren Kauf-FAQ in den 17 Sprachpaketen beschreiben dauerhaft Nichtverfügbarkeit. Das ist am 30. September offiziell richtig, kann beim nächsten Verkauf aber veralten. Datierte Beobachtungen und ein Verweis zum aktuellen Tracker passen hier besser als eine zeitlose Verkaufsbehauptung.
