import type {
  HTTPSUrl,
  ISODate,
  SourcePriority,
  VerificationStatus,
} from "./types";
import { EDITORIAL_CHECKED_AT } from "./review-dates";

export type AccommodationTypeId =
  | "official-themed-hotel"
  | "riverside-western-lodge"
  | "tipi-town"
  | "official-caravaning"
  | "official-tent-camping"
  | "independent-hotel-or-guesthouse-rust"
  | "independent-holiday-apartment-rust"
  | "accommodation-nearby-municipalities";

export type AccommodationScenarioId =
  | "operator-benefits-priority"
  | "park-and-rulantica-without-car"
  | "own-motorhome-or-caravan"
  | "own-tent"
  | "large-group-themed-stay"
  | "self-catering-filter"
  | "walkability-filter";

type ComparisonValue =
  | "verified"
  | "available_for_this_type"
  | "not_applicable"
  | "varies_by_property"
  | "must_verify";

export interface AccommodationComparisonType {
  id: AccommodationTypeId;
  label: string;
  operatorRelation: "resort_operated" | "independent";
  definition: string;
  comparison: {
    operatorGuestBenefits: ComparisonValue;
    selfCatering: ComparisonValue;
    ownSleepingUnitRequired: ComparisonValue;
    groupFormats: ComparisonValue;
    walkingAccess: ComparisonValue;
    shuttleOrTransit: ComparisonValue;
  };
  verifiedFactIds: readonly string[];
  mustVerifyBeforePublishing: readonly string[];
  sourceUrl: HTTPSUrl;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
  sourcePriority: SourcePriority;
  verifiedStatus: VerificationStatus;
  pricePolicy: "no_unverified_prices";
}

const CHECKED_AT = EDITORIAL_CHECKED_AT;

export const accommodationComparisonTypes = [
  {
    id: "official-themed-hotel",
    label: "Europa-Park Erlebnishotel",
    operatorRelation: "resort_operated",
    definition:
      "Eines der sechs vom Resort geführten 4-Sterne-(Superior)-Erlebnishotels.",
    comparison: {
      operatorGuestBenefits: "verified",
      selfCatering: "not_applicable",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "varies_by_property",
      walkingAccess: "varies_by_property",
      shuttleOrTransit: "verified",
    },
    verifiedFactIds: [
      "europa-park-themed-hotels",
      "hotel-guests-europa-park-early-entry-2026",
      "hotel-guests-rulantica-early-entry",
      "hotel-resort-shuttle",
    ],
    mustVerifyBeforePublishing: [
      "Vorteile für den konkreten Reisetermin",
      "welche Attraktionen beim früheren Eintritt tatsächlich geöffnet sind",
      "Zimmerbelegung und Barrierefreiheit",
      "ob Eintrittskarten im gewählten Arrangement enthalten oder separat sind",
    ],
    sourceUrl:
      "https://www.europapark.de/de/uebernachten/uebernachtungsmoeglichkeiten/erlebnishotels/vorteile-fuer-hotelgaeste",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "riverside-western-lodge",
    label: "Riverside Western Lodge",
    operatorRelation: "resort_operated",
    definition:
      "Zimmerunterkunft in Silver Lake City mit eigenem Gästevorteilsprofil.",
    comparison: {
      operatorGuestBenefits: "verified",
      selfCatering: "not_applicable",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "varies_by_property",
      walkingAccess: "verified",
      shuttleOrTransit: "verified",
    },
    verifiedFactIds: [
      "silver-lake-city-riverside-lodge-rooms",
      "silver-lake-city-walking-time-to-main-entrance",
    ],
    mustVerifyBeforePublishing: [
      "aktueller Rust-Bus-Fahrplan",
      "Vorteile für den konkreten Reisetermin",
      "Zimmerbelegung und Barrierefreiheit",
      "mögliche Veranstaltungslärmphasen in Silver Lake City",
    ],
    sourceUrl:
      "https://www.europapark.de/de/uebernachten/riverside-lodge",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "tipi-town",
    label: "Tipi Town",
    operatorRelation: "resort_operated",
    definition:
      "Thematisierte Gruppen- und Familienunterkünfte in Tipis, Planwagen, Blockhauszimmern und Western Houses.",
    comparison: {
      operatorGuestBenefits: "available_for_this_type",
      selfCatering: "must_verify",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "verified",
      walkingAccess: "verified",
      shuttleOrTransit: "must_verify",
    },
    verifiedFactIds: [
      "silver-lake-city-walking-time-to-main-entrance",
    ],
    mustVerifyBeforePublishing: [
      "Sanitär- und Schlafraumkonfiguration der gewählten Kategorie",
      "ob Frühstück verpflichtend oder zubuchbar ist",
      "Vorteile für den konkreten Reisetermin",
      "mögliche Veranstaltungslärmphasen",
      "Eignung der Etagenbettlängen für die Reisenden",
    ],
    sourceUrl:
      "https://www.europapark.de/de/uebernachten/silver-lake-city",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "official-caravaning",
    label: "Europa-Park Caravaning",
    operatorRelation: "resort_operated",
    definition:
      "Stellplätze in Silver Lake City für Wohnmobile und Caravans.",
    comparison: {
      operatorGuestBenefits: "available_for_this_type",
      selfCatering: "available_for_this_type",
      ownSleepingUnitRequired: "verified",
      groupFormats: "not_applicable",
      walkingAccess: "verified",
      shuttleOrTransit: "must_verify",
    },
    verifiedFactIds: [
      "silver-lake-city-caravan-pitches",
      "silver-lake-city-walking-time-to-main-entrance",
    ],
    mustVerifyBeforePublishing: [
      "Fahrzeugmaße und passende Stellplatzkategorie",
      "Strom- und Wasserbedingungen der konkreten Buchung",
      "Anreise-, Ruhe- und Abreisezeiten",
      "aktuelle Vorteile und Rust-Bus-Fahrplan",
    ],
    sourceUrl:
      "https://www.europapark.de/de/uebernachten/europa-park-camping",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "official-tent-camping",
    label: "Europa-Park Camping",
    operatorRelation: "resort_operated",
    definition:
      "Zeltplatz in Silver Lake City für Gäste mit eigenem Zelt.",
    comparison: {
      operatorGuestBenefits: "available_for_this_type",
      selfCatering: "must_verify",
      ownSleepingUnitRequired: "verified",
      groupFormats: "must_verify",
      walkingAccess: "verified",
      shuttleOrTransit: "must_verify",
    },
    verifiedFactIds: [
      "silver-lake-city-walking-time-to-main-entrance",
    ],
    mustVerifyBeforePublishing: [
      "Zelt- und Stellflächenregeln",
      "Strombedarf und Anschlussbedingungen",
      "Sanitär- und Frühstücksoptionen",
      "Wetter, Ruhezeiten und aktuelle Gästevorteile",
    ],
    sourceUrl:
      "https://www.europapark.de/de/uebernachten/camping/buchung",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "independent-hotel-or-guesthouse-rust",
    label: "Unabhängiges Hotel oder Gästehaus in Rust",
    operatorRelation: "independent",
    definition:
      "Unterkunft eines unabhängigen Betriebs innerhalb der Gemeinde Rust.",
    comparison: {
      operatorGuestBenefits: "not_applicable",
      selfCatering: "varies_by_property",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "varies_by_property",
      walkingAccess: "varies_by_property",
      shuttleOrTransit: "varies_by_property",
    },
    verifiedFactIds: [],
    mustVerifyBeforePublishing: [
      "aktuelle Betriebs- und Buchungsverfügbarkeit",
      "tatsächliche Fußroute zu dem benötigten Eingang",
      "Frühstück, Parken, Stornierung und Barrierefreiheit",
      "keine Resort-Hotelvorteile unterstellen",
    ],
    sourceUrl:
      "https://www.rust.de/de-de/tourismus/uebernachten/unterkuenfte",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 2,
    verifiedStatus: "public_directory_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "independent-holiday-apartment-rust",
    label: "Unabhängige Ferienwohnung in Rust",
    operatorRelation: "independent",
    definition:
      "Von der Gemeinde Rust als Ferienwohnung geführte unabhängige Unterkunft.",
    comparison: {
      operatorGuestBenefits: "not_applicable",
      selfCatering: "varies_by_property",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "varies_by_property",
      walkingAccess: "varies_by_property",
      shuttleOrTransit: "varies_by_property",
    },
    verifiedFactIds: [],
    mustVerifyBeforePublishing: [
      "Küchen- und Essplatzausstattung statt sie aus der Kategorie abzuleiten",
      "tatsächliche Fußroute zu dem benötigten Eingang",
      "Mindestaufenthalt, Endreinigung, Parken und Stornierung",
      "aktuelle Registrierung und Verfügbarkeit",
    ],
    sourceUrl:
      "https://www.rust.de/de-de/tourismus/uebernachten/unterkuenfte",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 2,
    verifiedStatus: "public_directory_verified",
    pricePolicy: "no_unverified_prices",
  },
  {
    id: "accommodation-nearby-municipalities",
    label: "Unterkunft in einer Nachbargemeinde",
    operatorRelation: "independent",
    definition:
      "Unabhängige Unterkunft in einer der Gemeinden der Erlebnisregion Europa-Park außerhalb von Rust.",
    comparison: {
      operatorGuestBenefits: "not_applicable",
      selfCatering: "varies_by_property",
      ownSleepingUnitRequired: "not_applicable",
      groupFormats: "varies_by_property",
      walkingAccess: "not_applicable",
      shuttleOrTransit: "varies_by_property",
    },
    verifiedFactIds: [],
    mustVerifyBeforePublishing: [
      "Verbindung am konkreten Wochentag und zu Parkschluss",
      "letzte Rückfahrt sowie Umstiege",
      "Parken am Ziel und an der Unterkunft",
      "aktuelle Betriebs- und Buchungsverfügbarkeit",
    ],
    sourceUrl:
      "https://www.erlebnisregion-europapark.de/planen-buchen/uebernachten",
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-10-01",
    sourcePriority: 2,
    verifiedStatus: "public_directory_verified",
    pricePolicy: "no_unverified_prices",
  },
] as const satisfies readonly AccommodationComparisonType[];

export interface AccommodationScenario {
  id: AccommodationScenarioId;
  userNeed: string;
  candidateTypeIds: readonly AccommodationTypeId[];
  rationale: string;
  decisionQuestions: readonly string[];
  excludedClaims: readonly string[];
}

/**
 * These are comparison scenarios, not rankings or recommendations.
 * They narrow the research set and always retain a user-facing verification
 * checklist. No price or "cheapest/best" claim is allowed here.
 */
export const accommodationScenarios = [
  {
    id: "operator-benefits-priority",
    userNeed: "Früheren Eintritt und Resort-Transport priorisieren",
    candidateTypeIds: ["official-themed-hotel"],
    rationale:
      "Nur die Betreiberquelle bestätigt das gebündelte Hotelgäste-Vorteilsprofil aus frühem Eintritt und Resort-Shuttle.",
    decisionQuestions: [
      "Gelten die Vorteile am konkreten Reisetermin?",
      "Ist für alle Reisenden eine gültige Eintrittskarte vorhanden?",
      "Sind die gewünschten frühen Attraktionen tatsächlich geöffnet?",
    ],
    excludedClaims: [
      "kein Preisvorteil behaupten",
      "keine Zeitersparnis garantieren",
    ],
  },
  {
    id: "park-and-rulantica-without-car",
    userNeed: "Europa-Park und Rulantica ohne eigenes Auto kombinieren",
    candidateTypeIds: [
      "official-themed-hotel",
      "riverside-western-lodge",
    ],
    rationale:
      "Für diese Typen sind resortinterne Transportangebote aus Betreiberquellen belegt; Fahrpläne bleiben tagesabhängig.",
    decisionQuestions: [
      "Wann fährt die letzte Verbindung am Besuchstag?",
      "Welcher Eingang wird bedient?",
      "Ist die Verbindung barrierefrei nutzbar?",
    ],
    excludedClaims: [
      "keine durchgehende 24-Stunden-Verbindung behaupten",
      "keine Gehzeit zwischen Park und Rulantica schätzen",
    ],
  },
  {
    id: "own-motorhome-or-caravan",
    userNeed: "Mit eigenem Wohnmobil oder Caravan anreisen",
    candidateTypeIds: ["official-caravaning"],
    rationale:
      "Der Typ ist ausdrücklich für Wohnmobile und Caravans vorgesehen; die konkrete Stellplatzkategorie muss zum Fahrzeug passen.",
    decisionQuestions: [
      "Welche Fahrzeuglänge und Anschlüsse werden benötigt?",
      "Welche Anreise- und Ruhezeiten gelten?",
      "Werden Haustier- oder Zusatzfahrzeugregeln relevant?",
    ],
    excludedClaims: [
      "keinen freien Stellplatz versprechen",
      "keine Zusatzleistungen ohne Buchungsprüfung zusagen",
    ],
  },
  {
    id: "own-tent",
    userNeed: "Mit eigenem Zelt übernachten",
    candidateTypeIds: ["official-tent-camping"],
    rationale:
      "Der Betreiber führt Camping mit eigenem Zelt getrennt vom Caravaning und von Tipi Town.",
    decisionQuestions: [
      "Wird Strom benötigt?",
      "Sind Frühstück oder Selbstversorgung geplant?",
      "Sind Wetter- und Ruhebedingungen für die Reisegruppe passend?",
    ],
    excludedClaims: [
      "keine Wettereignung garantieren",
      "keine Inklusivleistung ohne aktuelle Buchungsprüfung nennen",
    ],
  },
  {
    id: "large-group-themed-stay",
    userNeed: "Thematisierte Unterkunft für Familie, Verein oder Gruppe",
    candidateTypeIds: ["tipi-town"],
    rationale:
      "Die Betreiberseite nennt mehrere Schlafkategorien mit unterschiedlichen Gruppengrößen; Komfort und Sanitärkonzept variieren.",
    decisionQuestions: [
      "Wie viele Personen schlafen in einem Raum?",
      "Welche Betten- und Sanitärkonfiguration ist akzeptabel?",
      "Sind Frühstück und Ruhebedingungen passend?",
    ],
    excludedClaims: [
      "Tipi Town nicht pauschal als Hotelkomfort beschreiben",
      "keine Eignung für Kleinkinder oder Mobilitätseinschränkungen unterstellen",
    ],
  },
  {
    id: "self-catering-filter",
    userNeed: "Selbstversorgung als Auswahlkriterium",
    candidateTypeIds: ["independent-holiday-apartment-rust"],
    rationale:
      "Die kommunale Kategorie eignet sich als erster Filter; eine Küche ist trotzdem je Objekt zu verifizieren.",
    decisionQuestions: [
      "Welche Koch- und Kühlausstattung ist tatsächlich vorhanden?",
      "Wo liegen Lebensmittelgeschäfte und wann sind sie geöffnet?",
      "Gibt es Endreinigung, Mindestaufenthalt oder Kaution?",
    ],
    excludedClaims: [
      "Ferienwohnung nicht automatisch mit vollwertiger Küche gleichsetzen",
      "keine Einsparung gegenüber Hotels behaupten",
    ],
  },
  {
    id: "walkability-filter",
    userNeed: "Unterkunft nach Fußweg zum Haupteingang filtern",
    candidateTypeIds: [
      "riverside-western-lodge",
      "tipi-town",
      "official-caravaning",
      "official-tent-camping",
      "independent-hotel-or-guesthouse-rust",
      "independent-holiday-apartment-rust",
    ],
    rationale:
      "Mehrere Typen liegen in Rust oder Silver Lake City; die konkrete, sichere Route ist wichtiger als eine Luftlinienangabe.",
    decisionQuestions: [
      "Zu welchem Eingang muss die Reisegruppe?",
      "Ist die Route nachts, mit Kinderwagen oder Rollstuhl geeignet?",
      "Wie lang ist die Route laut aktuellem Routenplaner?",
    ],
    excludedClaims: [
      "keine pauschale Gehzeit für eine Unterkunftskategorie",
      "keine Barrierefreiheit aus der Entfernung ableiten",
    ],
  },
] as const satisfies readonly AccommodationScenario[];
