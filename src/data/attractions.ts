import type { HTTPSUrl, ISODate } from "./types";

export interface VerifiedFamilyAttraction {
  id: string;
  name: string;
  minAge: number;
  minHeight: number;
  accompaniedUntilAge?: number;
  accompaniedUntilHeight?: number;
  category: "calm" | "family" | "thrill";
  indoor?: boolean;
  pregnancyAllowed?: boolean;
  sourceUrl: HTTPSUrl;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
}

/**
 * Small, deliberately verified starter set for the family finder.
 * This is not a complete attraction inventory. Zero means the official page
 * does not publish a positive minimum for that field, not that every guest is
 * guaranteed admission.
 */
export const verifiedFamilyAttractions = [
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
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
  },
  {
    id: "pegasus",
    name: "Pegasus – die YoungStar Achterbahn",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/pegasus-die-youngstar-achterbahn",
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
  },
  {
    id: "arthur",
    name: "ARTHUR",
    minAge: 4,
    minHeight: 100,
    accompaniedUntilAge: 6,
    accompaniedUntilHeight: 120,
    category: "family",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/arthur",
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
  },
  {
    id: "wodan",
    name: "WODAN – Timburcoaster",
    minAge: 6,
    minHeight: 120,
    accompaniedUntilAge: 8,
    accompaniedUntilHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/wodan-timburcoaster",
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
  },
  {
    id: "voltron",
    name: "Voltron Nevera powered by Rimac",
    minAge: 8,
    minHeight: 130,
    category: "thrill",
    pregnancyAllowed: false,
    sourceUrl:
      "https://www.europapark.de/de/freizeitpark/attraktionen/voltron-nevera-powered-rimac",
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
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
    checkedAt: "2026-07-29",
    nextReviewAt: "2026-10-01",
  },
] as const satisfies readonly VerifiedFamilyAttraction[];
