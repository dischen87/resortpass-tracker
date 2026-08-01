import { transform } from '@astrojs/compiler';
import { describe, expect, test } from 'bun:test';

const stayPath = new URL('./StayComparator.astro', import.meta.url);
const restaurantPath = new URL('./RestaurantFinder.astro', import.meta.url);
const resortPassPath = new URL('./ResortPassTool.astro', import.meta.url);
const visitPath = new URL('./VisitPlanner.astro', import.meta.url);
const costPath = new URL('./CostCalculator.astro', import.meta.url);
const familyPath = new URL('./FamilyFinder.astro', import.meta.url);
const rulanticaPath = new URL('./RulanticaPlanner.astro', import.meta.url);
const planningTypesPath = new URL('../../content/planning-types.ts', import.meta.url);
const staySource = await Bun.file(stayPath).text();
const restaurantSource = await Bun.file(restaurantPath).text();
const resortPassSource = await Bun.file(resortPassPath).text();
const visitSource = await Bun.file(visitPath).text();
const costSource = await Bun.file(costPath).text();
const familySource = await Bun.file(familyPath).text();
const rulanticaSource = await Bun.file(rulanticaPath).text();
const planningTypesSource = await Bun.file(planningTypesPath).text();

describe('planning tool Astro components', () => {
  for (const [name, path, source] of [
    ['StayComparator', stayPath, staySource],
    ['RestaurantFinder', restaurantPath, restaurantSource],
    ['ResortPassTool', resortPassPath, resortPassSource],
    ['VisitPlanner', visitPath, visitSource],
    ['CostCalculator', costPath, costSource],
    ['FamilyFinder', familyPath, familySource],
    ['RulanticaPlanner', rulanticaPath, rulanticaSource],
  ] as const) {
    test(`${name} compiles without Astro diagnostics`, async () => {
      const result = await transform(source, {
        filename: path.pathname,
        sourcemap: false,
      });

      expect(result.diagnostics).toEqual([]);
      expect(result.styleError).toEqual([]);
      expect(result.code.length).toBeGreaterThan(1_000);
    });
  }

  test('both tools progressively enhance an accessible server-rendered list', () => {
    for (const source of [staySource, restaurantSource]) {
      expect(source).toContain('aria-labelledby');
      expect(source).toContain('<fieldset');
      expect(source).toContain('<legend>');
      expect(source).toContain('aria-live="polite"');
      expect(source.match(/aria-live="polite"/g)).toHaveLength(1);
      expect(source).toContain('aria-atomic="true"');
      expect(source).toContain('data-no-js');
      expect(source).toContain('form.hidden = false');
      expect(source).toContain('card.hidden = !isVisible');
      expect(source).toContain('textContent = String(visible)');
      expect(source).not.toContain('innerHTML');
      expect(source).toContain('rel="noopener noreferrer"');
      expect(source).toContain('@media (prefers-reduced-motion: reduce)');
    }
  });

  test('stay comparison preserves sourced states and does not rank by price', () => {
    for (const state of [
      'verified',
      'available_for_this_type',
      'not_applicable',
      'varies_by_property',
      'must_verify',
    ]) {
      expect(planningTypesSource).toContain(`'${state}'`);
    }

    expect(staySource).toContain('scenario.candidateTypeIds.includes(entry.id)');
    expect(staySource).toContain('content.mustVerify');
    expect(staySource).toContain('entry.sourceUrl');
    expect(staySource).toContain('copy.notRanking');
    expect(staySource).toContain('copy.priceNoteText');
    expect(staySource).not.toMatch(/\d+(?:[.,]\d{2})?\s*(?:€|EUR)/);
    expect(staySource).not.toContain('.sort(');
  });

  test('restaurant finder exposes only evidence-backed optional facets', () => {
    expect(restaurantSource).toContain(
      'filterEvidence?: RestaurantFilterEvidenceById',
    );
    expect(restaurantSource).toContain('evidence.nextReviewAt >= asOfDate');
    expect(restaurantSource).toContain(
      'hasDistanceEvidence && availableDistanceOptions.length > 0',
    );
    expect(restaurantSource).toContain('availableDietFeatures.length > 0');
    expect(restaurantSource).toContain('copy.unavailableEvidence.distance');
    expect(restaurantSource).toContain('copy.unavailableEvidence.diet');
    expect(restaurantSource).toContain('entry.verifiedStatus');
    expect(restaurantSource).toContain('copy.notRecommendation');
    expect(restaurantSource).toContain('content.uncertainties');
    expect(restaurantSource).toContain('content.verificationNote');
    expect(restaurantSource).toContain('<bdi dir="auto">');
    expect(restaurantSource).not.toMatch(
      /\d+(?:[.,]\d{2})?\s*(?:€|EUR)/,
    );
  });

  test('ResortPass tool has sourced prices and useful no-JavaScript defaults', () => {
    for (const factId of [
      'resortpass-silver-adult-price-2026',
      'resortpass-gold-adult-price-2026',
      'europa-park-one-day-adult-price-range-2026',
      'rulantica-day-adult-price-range-2026',
    ]) {
      expect(resortPassSource).toContain(factId);
    }

    expect(resortPassSource).toContain('const defaultTotals =');
    expect(resortPassSource).toContain('{euro(defaultTotals.tickets)}');
    expect(resortPassSource).toContain('aria-live="polite"');
    expect(resortPassSource).toContain('aria-busy="true"');
    expect(resortPassSource).toContain('tabindex="0"');
    expect(resortPassSource).toContain("fetch('/api/status'");
    expect(resortPassSource).not.toContain('innerHTML');
    expect(resortPassSource).not.toContain('<strong>—</strong>');
  });

  test('visit and cost planners expose honest, useful default results', () => {
    expect(visitSource).not.toContain('name="date"');
    expect(visitSource).not.toContain('<li data-note="crowd">');
    expect(visitSource).toContain('copy.routes.balanced.map');
    expect(visitSource).toContain('document.createElement');
    expect(visitSource).not.toContain('innerHTML');

    expect(costSource).toContain('const defaultTotalMin =');
    expect(costSource).toContain('{euro(defaultTotalMin)}');
    expect(costSource).toContain('aria-live="polite"');
    expect(costSource).not.toContain('<strong data-total-min>—</strong>');
  });

  test('family finder exposes every dynamic eligibility state as text', () => {
    expect(familySource).toContain('data-state={stateFor(attraction)}');
    expect(familySource).toContain('data-status-label');
    expect(familySource).toContain('statusLabel.textContent = statusLabels[state]');
    expect(familySource).toContain('class="sr-only"');
    expect(familySource).not.toContain('family-results__legend" aria-hidden');
  });

  test('Rulantica planner progressively enhances a server-rendered recommendation', () => {
    expect(rulanticaSource).toContain('copy.recommendations.evening.title');
    expect(rulanticaSource).toContain('aria-live="polite"');
    expect(rulanticaSource).not.toContain('innerHTML');
  });
});

describe('live regions stay small', () => {
  /**
   * A live region wrapped around a whole result block re-announces everything
   * on every keystroke, and the history card announced all twenty table rows
   * per pagination click. The rule: aria-live belongs on the short summary that
   * changed, together with aria-atomic so it is read as one sentence.
   */
  const componentsWithResults = [
    'CostCalculator.astro',
    'FamilyFinder.astro',
    'RulanticaPlanner.astro',
    'ResortPassTool.astro',
    'RestaurantFinder.astro',
    'StayComparator.astro',
    'VisitPlanner.astro',
  ];

  test('no live region wraps a result container', async () => {
    const offenders: string[] = [];
    for (const name of componentsWithResults) {
      const source = await Bun.file(new URL(`./${name}`, import.meta.url)).text();
      for (const match of source.matchAll(/<div[^>]*aria-live[^>]*>/g)) {
        const tag = match[0];
        // A container is anything whose class ends in -results / -result / -grid.
        if (/class="[^"]*(?:-results?|__grid|-grid)"/.test(tag)) {
          offenders.push(`${name}: ${tag.slice(0, 90)}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  test('every live region is atomic', async () => {
    const offenders: string[] = [];
    for (const name of componentsWithResults) {
      const source = await Bun.file(new URL(`./${name}`, import.meta.url)).text();
      for (const match of source.matchAll(/<[a-z0-9]+[^>]*aria-live="polite"[^>]*>/g)) {
        if (!match[0].includes('aria-atomic')) offenders.push(`${name}: ${match[0].slice(0, 90)}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
