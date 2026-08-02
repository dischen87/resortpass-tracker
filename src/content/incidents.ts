/**
 * Published incident record.
 *
 * Both entries are false alarms: the checker told subscribers the pass was on
 * sale when it was not. They are listed here rather than hardcoded into the
 * news component so that adding the next one is a data change — the previous
 * shape assumed there would only ever be one, and that assumption is precisely
 * what let the second go unnoticed for eight weeks.
 *
 * Nothing is ever removed from this list. A tracker that quietly drops its own
 * mistakes is worth less than one that never had any.
 */
export interface Incident {
  /** UTC date of the incident. Must match an entry in FALSE_POSITIVE_AVAILABLE_DATES. */
  date: string;
  /** Translation keys carrying the copy, present in all 17 languages. */
  titleKey: string;
  badgeKey: string;
  textKey: string;
}

export const incidents: readonly Incident[] = [
  {
    date: '2026-06-09',
    titleKey: 'news.incident_2026_06_09_title',
    badgeKey: 'news.incident_2026_06_09_badge',
    textKey: 'news.incident_2026_06_09_text',
  },
  {
    date: '2026-03-19',
    titleKey: 'news.incident_2026_03_19_title',
    badgeKey: 'news.incident_2026_03_19_badge',
    textKey: 'news.incident_2026_03_19_text',
  },
];
