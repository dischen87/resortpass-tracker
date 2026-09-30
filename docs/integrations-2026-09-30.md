# ResortPass Tracker: Integrationen und automatische Auslöser

Analyse vom 30. September 2026, erweitert für Release 1.1.0. Grundlage sind der vorhandene Code, die offiziellen OpenAI-Dokumentationen und eine Abfrage des verfügbaren Plugin-Katalogs. Der lokale Kalenderexport wurde umgesetzt und 19 ursprünglich überfällige Fakten wurden erneut geprüft. Für 1.1.0 sind ein lesender MCP-Endpunkt und ein automatisch auswählbarer Repo-Skill implementiert; ein portables Pluginpaket ist vorbereitet. Der wöchentliche Quellen-/Bildrechte-Heartbeat ist aktiviert: Montag um 09:00 Uhr lokal in Europe/Zurich, im selben Chat, still bei unverändertem Stand. Webhook-Abos, eigene ChatGPT-/Codex-Kontoverbindungen und Ereignisaufgaben sind weiterhin nur vorbereitet beziehungsweise vorgeschlagen.

## Die fünf sinnvollsten Ausbaupunkte

| Priorität | Auslöser → Aktion | Nutzen | Ausgangslage | Verbindung und Datengrenze |
| --- | --- | --- | --- | --- |
| P0, umgesetzt | Besuchsplan berechnet, Startdatum gewählt, „Im Kalender speichern“ gedrückt → lokale `.ics`-Datei erzeugen | Der mobile Plan wird ein konkreter Termin und bleibt zwischen Geräten nutzbar. | Datumsfeld und Kalenderdownload sind im Besuchsplaner vorhanden; neue Texte decken alle 17 Sprachen ab. | Kein Login, kein Plugin und kein Server-Speicher nötig. Nur das gewählte Datum, die empfohlene Planungsdauer und eigene redaktionelle Hinweise exportieren. |
| P1 | Bestätigter ResortPass-Wechsel `sold_out → available` → bestehenden E-Mail-Alarm und zusätzlich abonniertes Statusereignis liefern | Die knappe Verkaufsphase erreicht Nutzer in ihrem gewünschten Kanal. | Zweite Prüfung nach 30 Sekunden und E-Mail an bestätigte Abonnenten sind implementiert. Es fehlen Event-Outbox und Webhook-Abos. | Webhook und ChatGPT-Monitoring ausdrücklich abonnieren. Keine E-Mail-Adressen, Community- oder Abmeldetoken im Ereignis. |
| P1, implementiert; Verbindung separat | Frage zu ResortPass-Verfügbarkeit oder eigener Reiseplanung → passende Werkzeuge eines ResortPass-Plugins aufrufen | Der Tracker wird direkt aus ChatGPT/Codex nutzbar, ohne Inhalte manuell zu kopieren. | `/api/mcp` implementiert drei lesende Werkzeuge; portables Plugin und lokaler Katalog vorbereitet. Deployment und Kontoverbindung werden im Releaseablauf separat geprüft. | Private Abos und Buchungen bleiben ausserhalb der Werkzeuge. Keine ParkQueueTimes-Rohwerte in einem öffentlichen MCP-Datendienst. |
| P1, Skill und Wochenlauf aktiviert | Montag um 09:00 Uhr Europe/Zurich → fällige Quellen und Bildrechte prüfen; nur Änderungen, Fehler oder nötige Entscheidungen melden | Preise, Passregeln, Fotos und Übersetzungen bleiben nachvollziehbar gepflegt. | 19 ursprünglich überfällige Fakten wurden unverändert bestätigt. Repo-Skill mit impliziter Auswahl installiert; der getrennte Wochen-Heartbeat verwendet den bestehenden Chat. | Fällige Primärquellen lesen und belegten Diff erstellen; WIP isolieren. Kein Deployment, keine externen Nachrichten und keine unbelegten neuen Prüfdaten durch den Monitor. |
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

## P1: Implementierter lesender MCP-Server und vorbereitetes Plugin

`server/mcp.ts` implementiert diese drei klar begrenzten Werkzeuge:

| Implementiertes Werkzeug | Eingabe | Ergebnis |
| --- | --- | --- |
| `get_status` | optional `language` | Eigener Silver-/Gold-Status mit jeweiligem `lastCheck`, Alter, Frische und Link zur Statusseite; fehlende, ungültige oder mehr als 45 Minuten alte Beobachtungen bleiben unbekannt |
| `find_guide` | `topic` oder `query` mit Wörtern eines lokalisierten Titels, optional `language` | Bis zu drei eigene Ratgeber mit redaktionellem Prüfdatum, offizieller Quelle und lokalisiertem Canonical-Link; keine Live-Statusbehauptung |
| `plan_visit` | optional `date`, `days`, `group`, `arrival`, selbst gewählte `crowd`, `includesRulantica`, `language` | Dieselbe deterministische Empfehlung wie der Website-Planer, mit optionalem Datum und exklusivem Enddatum; keine Reservierung, keine fremden Live-Daten |

Der Hono-Mount in `server/index.ts` nutzt den offiziellen TypeScript-SDK `@modelcontextprotocol/sdk` mit Web-Standard-Streamable-HTTP-Transport. `/api/mcp` liefert zustandslose JSON-Antworten auf POST; es speichert keine MCP-Sessions und bietet keine SSE-, Event-, Kalender-Schreib- oder Abooperationen. Eingaben sind auf die Tool-Schemata begrenzt, Request-Bodies auf 8 KiB. Host und vorhandener Origin werden geprüft. Statusdaten werden ausdrücklich auf die öffentlichen Felder reduziert; private Datenbankfelder werden nicht ausgegeben. `generatedAt` datiert nur die Antwort, die echten Beobachtungszeiten stehen getrennt pro Pass. Die Guide-Quellen stammen aus der bestehenden Projektzuordnung, jetzt gemeinsam in `src/data/guide-sources.ts` von Website und MCP verwendet; es wurden keine neuen Quellenpfade erfunden. [Offizielles Hono-/Web-Standard-SDK-Beispiel](https://github.com/modelcontextprotocol/typescript-sdk/blob/v1.x/src/examples/server/honoWebStandardStreamableHttp.ts)

`server/mcp.test.ts` prüft den wirklichen `/api/mcp`-Mount über den offiziellen SDK-Client: Protokollinitialisierung, Tool-Liste, read-only Kennzeichnungen, SQLite-UTC/Frische, Guide-Suche und RTL-Link, Planer-Regeln, ungültige Eingaben sowie Host-, Origin- und Bodygrenzen. Sechs Tests mit 51 Assertions bestanden. Dies ist keine Behauptung einer bereits registrierten ChatGPT-Kontoverbindung oder Veröffentlichung im öffentlichen Plugin-Verzeichnis.

Das portable Paket liegt unter `plugins/resortpass-tracker/` (`plugin.json`, `mcp.json`, Version 1.1.0). Es verweist auf `https://www.resortpass-europapark.ch/api/mcp`. `.agents/plugins/marketplace.json` macht es im lokalen Repository-Katalog als **AVAILABLE** auffindbar, installiert oder aktiviert es aber nicht. Das Paket folgt dem aktuellen Agent-Plugins-Format. Eine Veröffentlichung im universellen Plugin-Verzeichnis oder Workspace benötigt den vorgesehenen Registrierungs-/Veröffentlichungsablauf; es wird keine technische `plugin_asdk_app`-ID erfunden. [OpenAI: Pluginpakete und MCP-Konfiguration](https://developers.openai.com/plugins/build/plugins#bundled-mcp-servers-and-lifecycle-hooks)

Nach einem verifizierten Deployment kann ein unterstützter Client den öffentlichen read-only Endpunkt ohne Accountzugriff verbinden. Für Codex ist beispielsweise `codex mcp add resortpass-tracker --url https://www.resortpass-europapark.ch/api/mcp` eine gezielte Verbindung; sie wird nur bei entsprechendem Aktivierungsauftrag eingerichtet. Die Repo-Skill-Auswahl benötigt diese Verbindung nicht.

Werkzeuge sind über Namen, Beschreibung und Eingabeschema auffindbar. Das Modell wählt sie passend zu einer Aufgabe und der Server validiert die Eingaben. Ein Produktionsserver sollte einen stabilen HTTPS-Endpunkt nutzen; private Daten und Nutzeraktionen benötigen die entsprechende Autorisierung. Ein MCP-Werkzeug allein startet keinen Hintergrundlauf. [OpenAI: MCP-Server](https://developers.openai.com/plugins/concepts/mcp-server)

Die Beschreibungen sollten konkrete positive und negative Fälle enthalten. Beispiel: „Bei Fragen nach aktuell kaufbarem ResortPass Silver/Gold eigenen Status mit Prüfzeitpunkt lesen. Nicht für individuelle Buchungen, Kontingente oder Eintrittsreservierungen verwenden.“ Testprompts sollten direkte Fragen, indirekte Besuchsplanung und Fehlanwendungen wie „Kaufe mir den Pass“ einschliessen. Das verbessert die Auswahl; es garantiert keinen Aufruf bei jeder ähnlich formulierten Frage. [OpenAI: Tool-Metadaten optimieren](https://developers.openai.com/plugins/guides/optimize-metadata)

Die lesenden Werkzeuge sollten als lesend und nicht destruktiv gekennzeichnet sein. Solche Kennzeichnungen ersetzen keine serverseitige Autorisierung. Ein öffentlicher Statusabruf benötigt keine Abonnentenliste; Bestätigungs-, Community- und Abmeldetoken dürfen weder in Werkzeugergebnissen noch in Logs eines fremden Systems auftauchen. [OpenAI: Werkzeug-Kennzeichnungen](https://developers.openai.com/plugins/reference#annotations)

`llms.txt` und `llms-full.txt` sind bereits hilfreiche Inhaltsverzeichnisse. Sie installieren keinen Skill und erzeugen kein Ereignis-Abo. Die im ersten Review gefundene Abweichung zu den bekannten Fehlalarmen wurde für 1.1.0 synchronisiert: `llms-full.txt` nennt jetzt wie die Methodik den 19. März und den 9. Juni 2026.

## P1: Installierter Repo-Skill für redaktionelle Pflege

Der projektspezifische Skill liegt in `.agents/skills/resortpass-editorial-review/SKILL.md`, mit `policy.allow_implicit_invocation: true` in `agents/openai.yaml`. Er ist auf Fakten-/Quellenpflege, lizenzierte Fotos und mobile/Web-UX dieses Repositories begrenzt. Das Frontmatter und die Metadaten wurden mit dem Skill-Creator-Validator geprüft. Codex entdeckt diesen Repo-Pfad automatisch; eine zweite globale Kopie ist nicht nötig und würde doppelte Einträge erzeugen. Codex/ChatGPT kann installierte Skills automatisch auswählen, wenn deren Beschreibung zur Aufgabe passt. Diese implizite Auswahl reagiert auf eine Aufgabe im Chat; sie ist kein Website-Klick- oder Hintergrundereignis. [OpenAI: lokale Skillpfade](https://learn.chatgpt.com/docs/build-skills#where-to-save-skills)

Der Skill unterstützt diesen Ablauf:

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

Die getrennte Aufgabe `resortpass-quellen-und-bildrechte-pr-fen` wurde im Releaseauftrag als Wochen-Heartbeat aktiviert: Montag, 09:00 Uhr in Europe/Zurich, Fortsetzung dieses Chats. Sie prüft fällige Primärquellen, erstellt bei belegten Abweichungen einen prüfbaren Diff, isoliert vorhandene WIP-Änderungen und sendet keine externen Nachrichten oder Deployments. Bei unveränderten oder nicht handlungsrelevanten Ergebnissen bleibt sie ruhig; nur neue Abweichungen, Fehlschläge oder nötige Entscheidungen werden gemeldet. Die manuelle Skillprobe fand unter 36 Fakten und 8 Fotoakten keine aktuell fälligen Einträge. Desktop-Aufgaben mit lokalen Dateien benötigen einen eingeschalteten Rechner und die laufende App. Der Skill selbst richtet keinen Zeitplan ein; implizite Auswahl und Scheduler sind zwei getrennte Auslöser. [OpenAI: geplante Aufgaben](https://learn.chatgpt.com/docs/automations)

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

Eine Kalenderverbindung genügt. Für den Kalenderdownload wird keine benötigt. Linear bringt erst Mehrwert, wenn die Pflege bereits dort stattfindet. Es wurden keine Account-Plugins installiert, Kontoverbindungen eingerichtet, Rechte geändert oder externen Nachrichten versandt. Der eigene Repo-Skill, das vorbereitete lokale Pluginpaket und der aktivierte Wochen-Heartbeat benötigen diese Account-Verbindungen nicht. Installation bedeutet zudem noch keine verifizierte individuelle Account-Verbindung. Weitere Angebote können im [Plugin-Verzeichnis](https://chatgpt.com/plugins) geprüft werden.

## Die wichtige Lizenzgrenze für Live-Daten

Wartezeiten und Besucherprognosen kommen aus ParkQueueTimes. Der Code sperrt die Endpunkte `/api/wait-times`, `/api/park-now` und `/api/crowd-calendar` für die Weiterverwendung ausserhalb eigener Seiten. Diese Grenze sollte ein neues Plugin nicht umgehen.

Die aktuell gelesene API-Lizenz erlaubt Nutzung, Speicherung, Analyse, eigene Schlussfolgerungen und Anzeige im eigenen Produkt. Sie untersagt die Weiterlieferung der Daten in weitgehend ursprünglicher Form als Datei, Feed, API oder Kundendatensatz. Eine separate Enterprise-Vereinbarung kann solche Rechte einräumen. Auf dem Free-Plan bleibt sichtbare verlinkte Attribution erforderlich. Der vorhandene README-Satz, auch abgeleitete Datendienste benötigten grundsätzlich eine gesonderte Erlaubnis, ist pauschaler als die aktuelle Lizenz: eigene Prognosen und Empfehlungen sind dort grundsätzlich erlaubt; Datenweiterlieferung ist die entscheidende Grenze. [ParkQueueTimes: API-Datenlizenz, Abschnitt 8](https://parkqueuetimes.com/terms)

Folgerung für die Ausbauten: `.ics` und die implementierten MCP-Werkzeuge nutzen persönliche Eingaben, eigene ResortPass-Beobachtungen und eigenes redaktionelles Wissen. Wartezeitreihen, Crowd-Tabellen und Anbieteröffnungszeiten bleiben ausserhalb der Exporte. Für eine spätere externe Live-Daten-Integration muss der genaue Nutzungsfall und das vorhandene Lizenzmodell separat geprüft werden.

## Konkrete Reihenfolge

Lokale Kalenderdateien und die Prüfung der 19 ursprünglich überfälligen Fakten sind umgesetzt. Release 1.1.0 ergänzt den Repo-Pflege-Skill und einen kleinen lesenden MCP-Server mit eigenen Daten. Der Wochen-Heartbeat ist aktiviert; Deployment und eine echte MCP-Kontoverbindung werden separat im Releaseablauf verifiziert. Ein echter ResortPass-Ereigniskanal folgt erst mit persistentem Outbox-/Abo-Lebenszyklus und vollständigen Zustelltests. Persönliche Kalenderverbindungen und Event-Tasks werden nach konkret gewähltem Kanal eingerichtet.

## Statusbefunde und Umsetzung in 1.1.0

Die vier ursprünglichen Statusbefunde waren im Designauftrag noch offen und wurden für den anschliessend autorisierten Release im Code bearbeitet. Ihre Deployment-/Live-Prüfung gehört zum abschliessenden Releasebericht:

1. **P1: Historischen Snapshot als aktuellen Ersatz entfernen.** `resolveBuildTimeStatus()` in `src/data/status-snapshot.ts` liefert nach einem Ausfall oder einer unbekannten Antwort nun Ungewissheit. Der committed Snapshot bleibt historische Dokumentation und wird nicht als aktuelle Verfügbarkeit verwendet.
2. **P1: Antwort und FAQ gemeinsam aktualisieren.** `applyStatus()` in `src/components/HomePage.astro` nutzt den gemeinsamen Formatierer aus `src/data/status-format.ts` für Karten, Pills, ausführliche Antwort, Metabeschreibungen und strukturierte FAQ. Ein fehlgeschlagener Refresh versetzt auch zuvor verfügbare Karten in Unknown.
3. **P2: Gemischte Zustände pro Pass ausgeben.** Die gemeinsame Formatierung benennt Silver und Gold jeweils mit eigenem Zustand. Ein unbekannter Pass wird dadurch nicht mehr als bestätigtes Nein zusammengefasst.
4. **P2: Guide-Texte vom nächsten Verkauf entkoppeln.** Guide-Antworten und Kauf-FAQ in allen 17 Sprachpaketen verweisen für kurzfristige Kaufverfügbarkeit nun auf Live-Tracker beziehungsweise offiziellen Ticketshop. Die redaktionellen Preise und Regeln behalten ihre jeweilige Quellen-/Prüfdatierung.
