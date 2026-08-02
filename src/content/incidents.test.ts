import { describe, expect, test } from 'bun:test';
import { incidents } from './incidents';
import { methodologyPacks } from './methodology';
import { FALSE_POSITIVE_AVAILABLE_DATES } from '../../server/db';
import { localeCodes } from '../i18n/locales';
import { getTranslation } from '../i18n/translations';

describe('incident record', () => {
  /**
   * Every published false alarm must also be excluded from the statistics, and
   * every exclusion must be published. A date in only one of the two places is
   * either a silently corrected number or an undisclosed incident — the June
   * case was the first for eight weeks.
   */
  test('published incidents and statistical exclusions are the same set', () => {
    const published = incidents.map((incident) => incident.date).sort();
    const excluded = [...FALSE_POSITIVE_AVAILABLE_DATES].sort();
    expect(published).toEqual(excluded);
  });

  test('newest first, so the most recent is the one that opens', () => {
    const dates = incidents.map((incident) => incident.date);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  test('every incident has copy in all 17 languages', () => {
    for (const incident of incidents) {
      for (const locale of localeCodes) {
        for (const key of [incident.titleKey, incident.badgeKey, incident.textKey]) {
          const value = getTranslation(locale, key);
          // getTranslation echoes the key back when it is missing.
          expect(value).not.toBe(key);
          expect(value.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  test('the methodology corrections log covers them too', () => {
    for (const [locale, pack] of Object.entries(methodologyPacks)) {
      const logged = pack.corrections.map((correction) => correction.iso).sort();
      expect(logged).toEqual([...FALSE_POSITIVE_AVAILABLE_DATES].sort());
      for (const correction of pack.corrections) {
        expect(correction.iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(correction.text.length).toBeGreaterThan(120);
      }
      expect(locale.length).toBe(2);
    }
  });
});
