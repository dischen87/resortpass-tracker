import { describe, expect, test } from 'bun:test';
import { rideLands, rides, ridesByLand, rideSearchTerms } from './rides';

describe('ride inventory', () => {
  test('slugs are unique and URL-safe', () => {
    const slugs = rides.map((ride) => ride.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  test('provider names are unique — they are the join key against the feed', () => {
    const names = rides.map((ride) => ride.providerName);
    expect(new Set(names).size).toBe(names.length);
  });

  test('every land is declared in the display order', () => {
    for (const ride of rides) {
      expect(rideLands).toContain(ride.land);
    }
  });

  test('grouping covers every ride exactly once', () => {
    const grouped = ridesByLand().flatMap((group) => group.rides);
    expect(grouped).toHaveLength(rides.length);
    expect(new Set(grouped.map((ride) => ride.slug)).size).toBe(rides.length);
  });

  test('search terms always include both the display and provider spelling', () => {
    for (const ride of rides) {
      const terms = rideSearchTerms(ride);
      expect(terms).toContain(ride.name);
      expect(terms).toContain(ride.providerName);
    }
  });

  test('the headliners a visitor actually queues for are marked', () => {
    const headliners = rides.filter((ride) => ride.headliner).map((ride) => ride.slug);
    for (const slug of ['silver-star', 'blue-fire-megacoaster', 'wodan-timburcoaster', 'voltron-nevera', 'eurosat-cancan-coaster']) {
      expect(headliners).toContain(slug);
    }
  });

  test('display names are German where the provider ships an English one', () => {
    const byslug = Object.fromEntries(rides.map((ride) => [ride.slug, ride]));
    expect(byslug['jim-knopf'].name).toBe('Jim Knopf – Reise durch Lummerland');
    expect(byslug['poseidon'].name).toBe('Wasserachterbahn Poseidon');
    expect(byslug['schweizer-bobbahn'].name).toBe('Schweizer Bobbahn');
    expect(byslug['tiroler-wildwasserbahn'].name).toBe('Tiroler Wildwasserbahn');
    // The provider spelling has to survive as a search term, or visitors who
    // know the ride from another app cannot find it.
    expect(rideSearchTerms(byslug['jim-knopf'])).toContain('Jim Button – Journey through Morrowland');
  });
});
