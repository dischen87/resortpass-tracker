import type {
  HTTPSUrl,
  ISODate,
  SourcePriority,
  VerificationStatus,
} from "./types";
import { EDITORIAL_CHECKED_AT } from "./review-dates";

export type RestaurantDirectoryId =
  | "gasthaus-adler-rust"
  | "hardys-rust"
  | "casa-rustica-rust"
  | "hotel-restaurant-mythos"
  | "kaiserstuehler-hof-rust"
  | "restaurant-fenix-rust"
  | "la-terrassa-rust"
  | "my-denis-rust";

export interface RestaurantDirectoryEntry {
  id: RestaurantDirectoryId;
  name: string;
  locality: "Rust";
  address: string;
  cuisineEvidence: readonly string[];
  serviceEvidence: readonly string[];
  officialWebsiteUrl: HTTPSUrl | null;
  sourceUrl: HTTPSUrl;
  corroboratingSourceUrl: HTTPSUrl | null;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
  sourcePriority: SourcePriority;
  verifiedStatus: VerificationStatus;
  recommendationStatus: "directory_entry_not_recommendation";
  verificationNote: string;
  uncertainties: readonly string[];
}

const CHECKED_AT = EDITORIAL_CHECKED_AT;
const NEXT_REVIEW = "2026-10-15" as const;
const MUNICIPAL_DIRECTORY =
  "https://www.rust.de/de-de/tourismus/gastronomie" as const;

/**
 * Neutral inventory of nearby food businesses. Inclusion means that an
 * operator page or the municipal directory was verified; it is not an
 * endorsement. Ratings, price levels and subjective quality claims are
 * intentionally excluded.
 */
export const restaurantDirectory = [
  {
    id: "gasthaus-adler-rust",
    name: "Gasthaus Adler",
    locality: "Rust",
    address: "Karl-Friedrich-Straße 8, 77977 Rust",
    cuisineEvidence: ["gutbürgerliche Küche"],
    serviceEvidence: ["Abendservice laut Betreiberseite"],
    officialWebsiteUrl: "https://adler-rust.de/",
    sourceUrl: "https://adler-rust.de/",
    corroboratingSourceUrl: MUNICIPAL_DIRECTORY,
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite und Impressum waren erreichbar; Adresse, Kontakt, Küchenprofil und aktuelle Öffnungshinweise wurden am Prüftag angezeigt.",
    uncertainties: [
      "Sonderöffnungen und Betriebsferien sind zeitabhängig.",
      "Reservierungsverfügbarkeit wurde nicht geprüft.",
    ],
  },
  {
    id: "hardys-rust",
    name: "Hardy's Bar & Restaurant",
    locality: "Rust",
    address: "Klarastraße 14, 77977 Rust",
    cuisineEvidence: [
      "regionale und internationale Gerichte",
      "Burger, Ribs, Pasta und Steak laut Betreiber",
    ],
    serviceEvidence: [
      "Frühstück laut Betreiberseite",
      "Abendservice laut Betreiberseite",
    ],
    officialWebsiteUrl: "https://www.hardys-rust.de/de",
    sourceUrl: "https://www.hardys-rust.de/de",
    corroboratingSourceUrl: null,
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite war erreichbar und nannte Adresse, Speiseprofil sowie Frühstücksangebot.",
    uncertainties: [
      "Live-Öffnungsstatus auf der Seite kann kurzfristig wechseln.",
      "Selbstdarstellung und eingebettete Bewertungen wurden nicht als Qualitätsbeleg übernommen.",
    ],
  },
  {
    id: "casa-rustica-rust",
    name: "Restaurant Casa Rustica",
    locality: "Rust",
    address: "Fischerstraße 44, 77977 Rust",
    cuisineEvidence: ["italienische Küche"],
    serviceEvidence: ["Abendservice laut kommunalem Verzeichnis"],
    officialWebsiteUrl: "https://www.hotel-casa-rustica.de/",
    sourceUrl: "https://www.hotel-casa-rustica.de/",
    corroboratingSourceUrl:
      "https://www.rust.de/site/Rust/node/2647762/zmdetail_1573025589/RestaurantCasaRustica.html?nodeID=1573025589&zm.sid=zm2vp1z9lxh1",
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite bestätigt Betrieb, Adresse und italienisches Restaurant; das kommunale Verzeichnis liefert einen aktuellen Öffnungsrahmen.",
    uncertainties: [
      "Öffnungszeiten vor Besuch auf der Betreiberseite oder telefonisch bestätigen.",
      "Die vom Betreiber genannte Gehzeit zum Park wurde nicht unabhängig gemessen.",
    ],
  },
  {
    id: "hotel-restaurant-mythos",
    name: "Hotel-Restaurant Mythos",
    locality: "Rust",
    address: "Hausenerstraße 1, 77977 Rust",
    cuisineEvidence: ["griechische und internationale Küche"],
    serviceEvidence: ["Kinderspeisekarte laut Betreiberseite"],
    officialWebsiteUrl: "https://www.hotel-mythos-rust.de/restaurant.php",
    sourceUrl: "https://www.hotel-mythos-rust.de/restaurant.php",
    corroboratingSourceUrl: MUNICIPAL_DIRECTORY,
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite war erreichbar und bestätigte Adresse, Küchenprofil und Reservierungskontakt.",
    uncertainties: [
      "Die Betreiberseite nennt im auslesbaren Inhalt keine stabilen Wochenöffnungszeiten.",
      "Tischverfügbarkeit wurde nicht geprüft.",
    ],
  },
  {
    id: "kaiserstuehler-hof-rust",
    name: "Kaiserstühler Hof Rust",
    locality: "Rust",
    address: "Hindenburgstraße 6, 77977 Rust",
    cuisineEvidence: ["badische Küche", "regionale Gerichte"],
    serviceEvidence: ["Abendservice laut Betreiberseite"],
    officialWebsiteUrl: "https://www.kaiserstuehlerhof-rust.de/",
    sourceUrl: "https://www.kaiserstuehlerhof-rust.de/",
    corroboratingSourceUrl: null,
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite war erreichbar und nannte Adresse, badisches Küchenprofil und aktuellen Wochenrhythmus.",
    uncertainties: [
      "Betriebsferien und Ruhetag vor Besuch erneut prüfen.",
      "Keine Aussagen zur Eignung bei Allergien ohne direkte Rückfrage.",
    ],
  },
  {
    id: "restaurant-fenix-rust",
    name: "Restaurant FENIX",
    locality: "Rust",
    address: "Tullastraße 8, 77977 Rust",
    cuisineEvidence: ["Küchenrichtung auf der Primärquelle nicht eindeutig benannt"],
    serviceEvidence: ["Abendservice laut Betreiberseite"],
    officialWebsiteUrl: "https://www.restaurants-rust.de/en/reservierung",
    sourceUrl: "https://www.restaurants-rust.de/en/reservierung",
    corroboratingSourceUrl: MUNICIPAL_DIRECTORY,
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 1,
    verifiedStatus: "first_party_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Betreiberseite und kommunaler Eintrag bestätigen Betrieb, Adresse und Kontakt. Marketingaussagen wurden nicht übernommen.",
    uncertainties: [
      "Küchenrichtung vor redaktioneller Kategorisierung anhand der aktuellen Speisekarte manuell prüfen.",
      "Die Betreiberseite nennt abweichende Öffnungszeiten gegenüber Drittplattformen; nur Betreiberangaben verwenden.",
    ],
  },
  {
    id: "la-terrassa-rust",
    name: "La Terrassa Restaurant",
    locality: "Rust",
    address: "Hindenburgstraße 3, 77977 Rust",
    cuisineEvidence: ["Küchenrichtung im kommunalen Eintrag nicht ausgewiesen"],
    serviceEvidence: ["Terrasse laut kommunalem Verzeichnis"],
    officialWebsiteUrl: "https://www.pension-mimosa.de/",
    sourceUrl: MUNICIPAL_DIRECTORY,
    corroboratingSourceUrl: "https://www.pension-mimosa.de/",
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 2,
    verifiedStatus: "public_directory_verified",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Das Restaurant wird im aktuellen kommunalen Verzeichnis geführt; die verlinkte Betriebsseite beschreibt primär die Pension und bestätigt keine Restaurantdetails.",
    uncertainties: [
      "Betriebsstatus, Küchenrichtung und Öffnungszeiten direkt beim Betrieb bestätigen.",
      "Bis zur direkten Bestätigung nicht als redaktionell geprüfte Restaurantoption hervorheben.",
    ],
  },
  {
    id: "my-denis-rust",
    name: "My Denis Rust",
    locality: "Rust",
    address: "Ritterstraße 19, 77977 Rust",
    cuisineEvidence: ["Küchenrichtung im kommunalen Eintrag nicht ausgewiesen"],
    serviceEvidence: ["Lieferung laut kommunalem Verzeichnis"],
    officialWebsiteUrl: null,
    sourceUrl: MUNICIPAL_DIRECTORY,
    corroboratingSourceUrl: null,
    checkedAt: CHECKED_AT,
    nextReviewAt: "2026-09-01",
    sourcePriority: 2,
    verifiedStatus: "needs_reverification",
    recommendationStatus: "directory_entry_not_recommendation",
    verificationNote:
      "Nur im kommunalen Verzeichnis auffindbar; keine belastbare eigene Website wurde am Prüftag gefunden.",
    uncertainties: [
      "Betriebsstatus, Kontakt, Küchenrichtung und Öffnungszeiten direkt bestätigen.",
      "Nicht in nutzerseitige Empfehlungen oder Rankings aufnehmen, bevor eine First-Party-Prüfung erfolgt ist.",
    ],
  },
] as const satisfies readonly RestaurantDirectoryEntry[];
