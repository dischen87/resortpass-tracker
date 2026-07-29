import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  accommodationComparisonTypes,
  accommodationScenarios,
  centralFacts,
  licensedMedia,
  restaurantDirectory,
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
