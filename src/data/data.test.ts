import { describe, expect, test } from "bun:test";
import { rides } from "./rides";
import type { VerifiedFamilyAttraction } from "./attractions";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  accommodationComparisonTypes,
  accommodationScenarios,
  centralFacts,
  licensedMedia,
  restaurantDirectory,
  verifiedFamilyAttractions,
} from "./index";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function expectValidDate(value: string | null) {
  if (value === null) return;
  expect(value).toMatch(ISO_DATE);
  expect(Number.isNaN(Date.parse(`${value}T00:00:00Z`))).toBe(false);
}

function expectHttps(value: string) {
  expect(value.startsWith("https://")).toBe(true);
}

describe("central facts", () => {
  test("have unique IDs and the required provenance fields", () => {
    expect(new Set(centralFacts.map(({ id }) => id)).size).toBe(
      centralFacts.length,
    );

    for (const fact of centralFacts) {
      expect(fact.value).not.toBeUndefined();
      expect(fact.unit.length).toBeGreaterThan(0);
      expectValidDate(fact.validFrom);
      expectValidDate(fact.validUntil);
      expectValidDate(fact.checkedAt);
      expectValidDate(fact.nextReviewAt);
      expectHttps(fact.sourceUrl);
      expect([1, 2, 3]).toContain(fact.sourcePriority);
      expect(Date.parse(fact.nextReviewAt)).toBeGreaterThan(
        Date.parse(fact.checkedAt),
      );

      if (fact.validFrom && fact.validUntil) {
        expect(Date.parse(fact.validUntil)).toBeGreaterThanOrEqual(
          Date.parse(fact.validFrom),
        );
      }
    }
  });

  test("retains caveats for non-exact claims", () => {
    for (const fact of centralFacts) {
      if (fact.qualifier !== "exact") {
        expect(fact.caveat).not.toBeNull();
      }
    }
  });
});

describe("accommodation data", () => {
  test("contains no price fields or price claims", () => {
    const serialized = JSON.stringify({
      accommodationComparisonTypes,
      accommodationScenarios,
    }).toLowerCase();

    expect(serialized).not.toContain('"price":');
    expect(serialized).not.toContain('"amount":');
    expect(serialized).not.toMatch(/\b\d+(?:[.,]\d{2})?\s*€/);

    for (const type of accommodationComparisonTypes) {
      expect(type.pricePolicy).toBe("no_unverified_prices");
      expectHttps(type.sourceUrl);
      expect(type.mustVerifyBeforePublishing.length).toBeGreaterThan(0);
    }
  });

  test("only references known accommodation types and facts", () => {
    const typeIds = new Set(
      accommodationComparisonTypes.map(({ id }) => id as string),
    );
    const factIds = new Set(centralFacts.map(({ id }) => id as string));

    for (const scenario of accommodationScenarios) {
      expect(scenario.candidateTypeIds.length).toBeGreaterThan(0);
      for (const typeId of scenario.candidateTypeIds) {
        expect(typeIds.has(typeId)).toBe(true);
      }
    }

    for (const type of accommodationComparisonTypes) {
      for (const factId of type.verifiedFactIds) {
        expect(factIds.has(factId)).toBe(true);
      }
    }
  });
});

describe("restaurant directory", () => {
  test("is explicitly neutral and reviewable", () => {
    expect(new Set(restaurantDirectory.map(({ id }) => id)).size).toBe(
      restaurantDirectory.length,
    );

    for (const restaurant of restaurantDirectory) {
      expect(restaurant.recommendationStatus).toBe(
        "directory_entry_not_recommendation",
      );
      expect(restaurant.verifiedStatus.length).toBeGreaterThan(0);
      expect(restaurant.uncertainties.length).toBeGreaterThan(0);
      expectHttps(restaurant.sourceUrl);
      expect(Date.parse(restaurant.nextReviewAt)).toBeGreaterThan(
        Date.parse(restaurant.checkedAt),
      );
    }
  });
});

describe("media license registry", () => {
  test("contains the four reviewed Wikimedia records and traces local derivatives", () => {
    expect(licensedMedia).toHaveLength(4);

    for (const media of licensedMedia) {
      expect(media.licenseId).toBe("CC-BY-SA-4.0");
      expect(media.verifiedStatus).toBe("license_page_verified");
      expect(media.attributionText).toContain(media.author);
      expect(media.attributionText).toContain("CC BY-SA 4.0");
      expectHttps(media.filePageUrl);
      expectHttps(media.originalFileUrl);
      expectHttps(media.licenseUrl);
      expect(Number.isNaN(Date.parse(media.sourceRevisionAt))).toBe(false);
      expect(media.sourceRevisionSha1).toMatch(/^[a-f0-9]{40}$/);
      expect(media.width).toBeGreaterThan(0);
      expect(media.height).toBeGreaterThan(0);
      expect(media.usageRisks.length).toBeGreaterThan(0);

      if (media.downloaded) {
        expect(media.localPath).toMatch(/^\/images\/.+\.webp$/);
        expect(media.derivativeDescription?.length).toBeGreaterThan(20);
        expect(existsSync(join(import.meta.dir, "../..", "public", media.localPath!))).toBe(true);
      }
    }
  });
});

describe('attraction limits are safe to publish', () => {
  /**
   * These numbers decide whether a family drives two hours to find their child
   * cannot ride. They are scraped from the operator's own pages, never typed by
   * hand, and these are the invariants that would catch a parser regression.
   */
  test('every entry cites the operator page it came from', () => {
    for (const attraction of verifiedFamilyAttractions) {
      expect(attraction.sourceUrl).toMatch(
        /^https:\/\/www\.europapark\.de\/de\/freizeitpark\/attraktionen\/[a-z0-9-]+$/,
      );
      expect(attraction.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(attraction.nextReviewAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('no ride claims an age limit while reporting no height limit', () => {
    // The exact failure a "120 bis 195 cm" page produced before the range
    // pattern existed: a 130 cm minimum published as none.
    const suspicious = verifiedFamilyAttractions
      .filter((a) => a.minAge >= 6 && a.minHeight === 0)
      .map((a) => a.id);
    expect(suspicious).toEqual([]);
  });

  test('limits stay inside physically plausible bounds', () => {
    // `as const` gives each entry its own literal type, so the optional fields
    // only exist on some members of the union. Read through the interface.
    const all: VerifiedFamilyAttraction[] = [...verifiedFamilyAttractions];
    for (const attraction of all) {
      expect(attraction.minAge).toBeGreaterThanOrEqual(0);
      expect(attraction.minAge).toBeLessThanOrEqual(18);
      expect(attraction.minHeight).toBeGreaterThanOrEqual(0);
      expect(attraction.minHeight).toBeLessThanOrEqual(200);
      if (attraction.maxHeight !== undefined) {
        expect(attraction.maxHeight).toBeGreaterThan(attraction.minHeight);
      }
      if (attraction.accompaniedUntilHeight !== undefined) {
        // Being accompanied only matters above the hard minimum.
        expect(attraction.accompaniedUntilHeight).toBeGreaterThanOrEqual(attraction.minHeight);
      }
    }
  });

  test('ids and names line up with the ride inventory', () => {
    const slugs = new Set(rides.map((ride) => ride.slug));
    for (const attraction of verifiedFamilyAttractions) {
      expect(slugs.has(attraction.id)).toBe(true);
    }
  });

  test('covers the whole inventory, not a handful', () => {
    // It used to hold six of more than a hundred attractions, so the family
    // finder answered nearly every question with the same six rides.
    // Both arrays are `as const`, so their lengths are literal types; compare
    // the widened values or TypeScript rejects the assertion outright.
    const covered: number = verifiedFamilyAttractions.length;
    const inventory: number = rides.length;
    expect(covered).toBe(inventory);
  });

  test('the three hand-verified entries are unchanged by the scraper', () => {
    const byId = Object.fromEntries(verifiedFamilyAttractions.map((a) => [a.id, a]));
    expect(byId['snorri-touren']).toMatchObject({ minAge: 0, minHeight: 0, accompaniedUntilAge: 8, accompaniedUntilHeight: 130 });
    expect(byId['pegasus']).toMatchObject({ minAge: 4, minHeight: 100, accompaniedUntilAge: 8, accompaniedUntilHeight: 130 });
    expect(byId['arthur']).toMatchObject({ minAge: 4, minHeight: 100, accompaniedUntilAge: 6 });
  });
});
