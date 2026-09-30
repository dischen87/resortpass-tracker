import { describe, expect, test } from 'bun:test';
import { localeCodes } from '../i18n/locales';
import { getExperienceCopy } from '../i18n/experience';
import {
  createVisitCalendar,
  escapeCalendarText,
  foldCalendarLine,
  getAllDayRange,
  getRecommendedVisitDays,
} from './visit-calendar';

const fixture = {
  date: '2026-09-30', days: 2,
  summary: 'Europa-Park: Reiseplan + Rulantica',
  description: 'Morgens: Attraktionen\nAbends: Pause\nReiseplan, keine Buchung.',
  url: 'https://example.com/fr/planifier/#visit-planner',
  uid: 'trip-123@resortpass-tracker',
  createdAt: new Date('2026-09-30T12:34:56.789Z'),
};

describe('all-day visit calendar', () => {
  test('end is exclusive across month and year boundaries', () => {
    expect(getAllDayRange('2026-09-30', 2)).toEqual({ start: '20260930', end: '20261002' });
    expect(getAllDayRange('2026-12-31', 3)).toEqual({ start: '20261231', end: '20270103' });
    expect(getAllDayRange('2028-02-28', 2)).toEqual({ start: '20280228', end: '20280301' });
    expect(getAllDayRange('2026-03-29', 1)).toEqual({ start: '20260329', end: '20260330' });
    expect(getAllDayRange('0099-12-31', 1)).toEqual({ start: '00991231', end: '01000101' });
  });

  test('rejects impossible dates, malformed input and overflowing dates', () => {
    for (const date of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-00-01', '2026-01-00', '0000-01-01', '2026-9-30', '', '2026-10-01\nSUMMARY:injected']) {
      expect(() => getAllDayRange(date, 1)).toThrow(RangeError);
    }
    expect(() => getAllDayRange('9999-12-31', 1)).toThrow(RangeError);
    for (const days of [0, -1, 1.5, NaN, Infinity, 4]) {
      expect(() => getAllDayRange('2026-09-30', days)).toThrow(RangeError);
    }
  });

  test('calendar span uses the planner recommendation including Rulantica', () => {
    expect(getRecommendedVisitDays(1, 'low', 'opening', false)).toBe(1);
    expect(getRecommendedVisitDays(1, 'high', 'opening', false)).toBe(2);
    expect(getRecommendedVisitDays(1, 'low', 'late', false)).toBe(2);
    expect(getRecommendedVisitDays(1, 'low', 'opening', true)).toBe(2);
    expect(getRecommendedVisitDays(2, 'high', 'opening', true)).toBe(3);
  });

  test('exports a portable tentative event with a localized planner link', () => {
    const ics = createVisitCalendar(fixture);
    expect(ics).toContain('DTSTART;VALUE=DATE:20260930\r\nDTEND;VALUE=DATE:20261002');
    expect(ics).toContain('DTSTAMP:20260930T123456Z');
    expect(ics).toContain('URL:https://example.com/fr/planifier/#visit-planner');
    expect(ics).toContain('STATUS:TENTATIVE\r\nTRANSP:TRANSPARENT');
    expect(ics).toEndWith('END:VEVENT\r\nEND:VCALENDAR\r\n');
    expect(ics.replaceAll('\r\n', '')).not.toMatch(/[\r\n]/);
    expect(ics).not.toContain('METHOD:REQUEST');
    expect(ics).not.toContain('ATTENDEE');
    expect(ics).not.toContain('VALARM');
  });

  test('escapes text values so punctuation and newlines cannot inject properties', () => {
    expect(escapeCalendarText('a\\b;c,d\r\ne:f\rg\nh')).toBe('a\\\\b\\;c\\,d\\ne:f\\ng\\nh');
    const ics = createVisitCalendar({ ...fixture, summary: 'Plan\nBEGIN:VALARM', description: 'Route; tickets, pauses\\snacks\r\nSUMMARY:injected' });
    const unfolded = ics.replaceAll('\r\n ', '');
    expect(unfolded).toContain('SUMMARY:Plan\\nBEGIN:VALARM\r\n');
    expect(unfolded).toContain('DESCRIPTION:Route\\; tickets\\, pauses\\\\snacks\\nSUMMARY:injected\r\n');
    expect(ics.split('\r\n')).not.toContain('BEGIN:VALARM');
    expect(() => createVisitCalendar({ ...fixture, uid: 'trip\r\nBEGIN:VALARM' })).toThrow(RangeError);
    expect(() => createVisitCalendar({ ...fixture, url: 'https://example.com\nBEGIN:VALARM' })).toThrow(RangeError);
    expect(() => createVisitCalendar({ ...fixture, url: 'javascript:alert(1)' })).toThrow(RangeError);
  });

  test('folds long Unicode lines at 75 UTF-8 octets without breaking characters', () => {
    const line = `DESCRIPTION:${'🌊 Grüße שלום '.repeat(30)}`;
    const folded = foldCalendarLine(line);
    expect(folded.replaceAll('\r\n ', '')).toBe(line);
    for (const part of folded.split('\r\n')) {
      expect(new TextEncoder().encode(part).length).toBeLessThanOrEqual(75);
      expect(part).not.toContain('\uFFFD');
    }
    expect(folded.split('\r\n').slice(1).every((part) => part.startsWith(' '))).toBe(true);
  });

  test('new experience and calendar copy is present in every supported locale', () => {
    const keys = Object.keys(getExperienceCopy('de')).sort();
    for (const locale of localeCodes) {
      const copy = getExperienceCopy(locale);
      expect(Object.keys(copy).sort()).toEqual(keys);
      expect(Object.values(copy).every((value) => value.trim().length > 0)).toBe(true);
      const ics = createVisitCalendar({ ...fixture, summary: copy.calendarTripTitle, description: copy.calendarDisclaimer });
      expect(ics.replaceAll('\r\n ', '')).toContain(`SUMMARY:${escapeCalendarText(copy.calendarTripTitle)}`);
    }
  });
});
