import type { HTTPSUrl, ISODate } from "./types";
import { EDITORIAL_CHECKED_AT } from "./review-dates";

export interface VerifiedFamilyAttraction {
  id: string;
  name: string;
  minAge: number;
  minHeight: number;
  accompaniedUntilAge?: number;
  accompaniedUntilHeight?: number;
  /** Some rides publish an upper bound as well, e.g. "120 bis 195 cm". */
  maxHeight?: number;
  category: "calm" | "family" | "thrill";
  indoor?: boolean;
  pregnancyAllowed?: boolean;
  sourceUrl: HTTPSUrl;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
}

/**
 * Age and height limits for every Europa-Park ride with published queue data.
 *
 * Extracted from the operator's own attraction pages by
 * scripts/scrape-attraction-limits.ts, never entered by hand and never
 * estimated: a parent may plan a day around whether a child clears 130 cm, so
 * an invented number here is worse than no page at all. The scraper reproduces
 * the three entries that were previously verified by hand exactly.
 *
 * Zero means the official page publishes no positive minimum for that field —
 * not that every guest is guaranteed admission.
 *
 * This was six entries, so the family finder returned virtually the same
 * handful of rides for every input.
 */
export const verifiedFamilyAttractions = [
  {
    id: "alpine-express-enzian",
    name: "Alpine Express ‚Enzian‘",
    minAge: 3,
    minHeight: 90,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/alpenexpress-enzian",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "josefinas-imperial-journey",
    name: "Josefinas Kaiserliche Zauberreise",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/josefinas-kaiserliche-zauberreise",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "tiroler-wildwasserbahn",
    name: "Tiroler Wildwasserbahn",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/tiroler-wildwasserbahn",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "vienna-wave-swing",
    name: "Wiener Wellenflug ‚Glückspilz‘",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/wiener-wellenflieger-glueckspilz",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "voltron-nevera",
    name: "Voltron Nevera powered by Rimac",
    minAge: 8,
    minHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/voltron-nevera-powered-rimac",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "arena-of-football",
    name: "Arena of Football – Be Part of It!",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/arena-football-be-part-it",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "euro-tower",
    name: "Euro-Tower",
    minAge: 6,
    minHeight: 120,
    category: "thrill",
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/euro-tower",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "eurosat-cancan-coaster",
    name: "Eurosat – CanCan Coaster",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    maxHeight: 195,
    category: "thrill",
    indoor: true,
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/eurosat-cancan-coaster",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "eurosat-coastiality",
    name: "Eurosat Coastiality",
    minAge: 12,
    minHeight: 130,
    maxHeight: 195,
    category: "thrill",
    indoor: true,
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/eurosat-coastiality",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "madame-freudenreich-curiosites",
    name: "Madame Freudenreich Curiosités",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/madame-freudenreich-curiosites",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "silver-star",
    name: "Silver Star",
    minAge: 11,
    minHeight: 140,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/silver-star",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "jim-knopf",
    name: "Jim Knopf – Reise durch Lummerland",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/jim-knopf-reise-durch-lummerland",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "voletarium",
    name: "Voletarium",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    indoor: true,
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/voletarium",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "atlantis-adventure",
    name: "Atlantis Adventure",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/abenteuer-atlantis",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "pegasus",
    name: "Pegasus",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/pegasus-die-youngstar-achterbahn",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "poseidon",
    name: "Wasserachterbahn Poseidon",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/wasserachterbahn-poseidon",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "blue-fire-megacoaster",
    name: "blue fire Megacoaster",
    minAge: 7,
    minHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/blue-fire-megacoaster",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "whale-adventures",
    name: "Whale Adventures – Northern Lights",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/whale-adventures-northern-lights",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "wodan-timburcoaster",
    name: "WODAN – Timburcoaster",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/wodan-timburcoaster",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "baaa-express",
    name: "Ba-a-a-Express",
    minAge: 3,
    minHeight: 90,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/ba-express",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "dancing-dingie",
    name: "Dancing Dingie",
    minAge: 3,
    minHeight: 90,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/dancing-dingie",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "old-mac-donalds-tractor-fun",
    name: "Old Mac Donald’s Tractor Fun",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "calm",
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/old-mac-donalds-tractor-fun",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "castello-dei-medici",
    name: "Castello dei Medici",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/castello-dei-medici",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "volo-da-vinci",
    name: "Volo da Vinci",
    minAge: 3,
    minHeight: 90,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/volo-da-vinci",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "grand-prix-edventure",
    name: "GRAND PRIX EDventure",
    minAge: 3,
    minHeight: 90,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/grand-prix-edventure",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "arthur",
    name: "ARTHUR – Im Königreich der Minimoys",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "family",
    indoor: true,
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/arthur",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "poppy-towers",
    name: "Poppy Towers",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/poppy-towers",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "piraten-in-batavia",
    name: "Piraten in Batavia",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/piraten-batavia",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "atlantica-supersplash",
    name: "Atlantica SuperSplash",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/atlantica-supersplash",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "euro-mir",
    name: "Euro-Mir",
    minAge: 8,
    minHeight: 130,
    maxHeight: 195,
    category: "thrill",
    indoor: true,
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/euro-mir",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "fjord-rafting",
    name: "Fjord-Rafting",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/fjord-rafting",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "snorri-touren",
    name: "Snorri Touren",
    minAge: 0,
    minHeight: 0,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "calm",
    indoor: true,
    pregnancyAllowed: true,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/snorri-touren",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "vindjammer",
    name: "Vindjammer",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/vindjammer",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "kolumbusjolle",
    name: "Kolumbusjolle",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/kolumbusjolle",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "matterhorn-blitz",
    name: "Matterhorn-Blitz",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/matterhorn-blitz",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
  {
    id: "schweizer-bobbahn",
    name: "Schweizer Bobbahn",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/schweizer-bobbahn",
    checkedAt: EDITORIAL_CHECKED_AT,
    nextReviewAt: "2027-03-01",
  },
] as const satisfies readonly VerifiedFamilyAttraction[];
