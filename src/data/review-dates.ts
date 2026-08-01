/**
 * When the editorial content was last verified against its sources.
 *
 * This date used to be written out at five separate constants plus 34 language
 * strings — 39 places that had to be changed together, feeding `dateModified`
 * for 204 guide pages. One of them drifting silently is a question of when, not
 * whether, so there is now exactly one place to edit.
 *
 * Grouped by what actually gets rechecked, because product prices and a park's
 * founding year do not move on the same schedule.
 */

/** Prices, product rules and anything the operator can change without notice. */
export const EDITORIAL_CHECKED_AT = '2026-07-29' as const;

/** Availability observations, which the checker updates on its own. */
export const TRACKING_STARTED_AT = '2026-03-04' as const;

/**
 * Per-route last-modified dates for the sitemap.
 *
 * Deliberately not the build timestamp: that would mark all 277 pages as
 * changed on every deploy and train crawlers to ignore the field entirely.
 * Routes whose content genuinely moves get the date of the last real change;
 * everything else gets the editorial check date.
 */
const ROUTE_LAST_MODIFIED: Record<string, string> = {
  // Rebuilt around the park-state model and the static ride directory.
  waitTimes: '2026-08-01',
  // New in this release.
  methodology: '2026-08-01',
  // Carries the availability answer, which is re-rendered on every deploy.
  home: '2026-08-01',
};

export function lastModifiedFor(routeKey: string): string {
  return ROUTE_LAST_MODIFIED[routeKey] || EDITORIAL_CHECKED_AT;
}
