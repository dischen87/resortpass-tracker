import { describe, expect, test } from 'bun:test';
import { getLocaleDefinition, localeCodes } from '../i18n/locales';
import { getTranslation } from '../i18n/translations';
import { formatAvailabilityAnswer, getStatusCopy } from './availability-answer';
import {
  createUnknownSnapshot, formatPassLabel, formatStatusAnswer, formatStatusDescription, formatStatusRequest,
  normalizePassSnapshot, snapshotFromPayload, updateAvailabilityFaq, type PassState,
} from './status-format';

const capturedAt = '2026-09-30T12:30:00.000Z';
const recent = '2026-09-30 12:16:00';

describe('current status and historical observations', () => {
  test('unknown takes precedence over legacy availability and old confirmed observations', () => {
    expect(normalizePassSnapshot({ state: 'unknown', available: false, lastCheck: recent }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'unknown', available: true, lastCheck: recent }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'sold_out', fresh: false, lastCheck: recent }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'available', lastCheck: '2026-08-01 07:46:00' }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'available', lastCheck: '2026-09-30 13:16:00' }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'sold_out', lastCheck: 'invalid' }, capturedAt).state).toBe('unknown');
    expect(normalizePassSnapshot({ state: 'sold_out', lastCheck: recent }, capturedAt).state).toBe('sold_out');
    expect(normalizePassSnapshot({ available: true, lastCheck: recent }, capturedAt).state).toBe('available');
    expect(snapshotFromPayload(null, capturedAt).silver.state).toBe('unknown');
  });

  test('mixed available, sold out and unknown states stay distinct for both passes in all 17 languages', () => {
    const states: PassState[] = ['available', 'sold_out', 'unknown'];
    for (const locale of localeCodes) {
      const copy = getStatusCopy(locale);
      for (const silver of states) for (const gold of states) {
        const snapshot = {
          silver: { state: silver, lastCheck: recent },
          gold: { state: gold, lastCheck: recent },
          capturedAt, live: true,
        };
        const answer = formatAvailabilityAnswer(snapshot, locale);
        expect(answer).toContain(`ResortPass Silver: ${formatPassLabel(snapshot.silver, copy)}`);
        expect(answer).toContain(`ResortPass Gold: ${formatPassLabel(snapshot.gold, copy)}`);
        expect(answer).not.toContain(getTranslation(locale, 'info.why_text'));
        expect(answer).toBe(formatStatusAnswer(snapshot, copy, getLocaleDefinition(locale).bcp47));
        const description = formatStatusDescription(snapshot, copy);
        expect(description).toContain(`ResortPass Silver: ${formatPassLabel(snapshot.silver, copy)}`);
        expect(description).toContain(`ResortPass Gold: ${formatPassLabel(snapshot.gold, copy)}`);
        expect(description.length).toBeGreaterThanOrEqual(60);
        expect(description.length).toBeLessThanOrEqual(200);
        if (silver === 'unknown' || gold === 'unknown') expect(answer).toContain(copy.currentUnknown);
      }
      expect(Object.values(copy).every((value) => value.trim().length > 0)).toBe(true);
    }
  });

  test('each confirmed pass keeps its own check time; unknown does not claim a historical check as current', () => {
    const snapshot = snapshotFromPayload({
      silver: { state: 'sold_out', lastCheck: '2026-09-30 12:16:00' },
      gold: { state: 'unknown', lastCheck: '2026-08-01 07:46:00', fresh: false },
    }, capturedAt);
    const answer = formatAvailabilityAnswer(snapshot, 'de');
    expect(answer).toContain('14:16');
    expect(answer).toContain('14:30');
    expect(answer).not.toContain('1. Aug.');
    expect(answer).toContain('ResortPass Gold: Unbekannt');
    expect(answer).not.toContain('ResortPass Gold: Ausverkauft');
  });

  test('unknown explanation belongs only to that pass and does not negate an available pass', () => {
    const snapshot = snapshotFromPayload({
      silver: { state: 'unknown', lastCheck: recent },
      gold: { state: 'available', lastCheck: recent },
    }, capturedAt);
    const copy = getStatusCopy('en');
    const answer = formatAvailabilityAnswer(snapshot, 'en');
    const [silver, gold, request] = answer.split(' · ');
    expect(silver).toContain(copy.currentUnknown);
    expect(gold).toContain(copy.available);
    expect(gold).not.toContain(copy.currentUnknown);
    expect(request).toContain(copy.fetchedAt);
    expect(request).not.toContain(copy.currentUnknown);
  });

  test('a failed refresh replaces both current states, visible answer and FAQ while leaving other questions intact', () => {
    const previous = snapshotFromPayload({
      silver: { state: 'available', lastCheck: recent },
      gold: { state: 'sold_out', lastCheck: recent },
    }, capturedAt);
    const previousAnswer = formatAvailabilityAnswer(previous, 'en');
    const schema = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is it?', acceptedAnswer: { '@type': 'Answer', text: 'A personal annual pass.' } },
        { '@type': 'Question', name: 'Is it available?', acceptedAnswer: { '@type': 'Answer', text: previousAnswer } },
        { '@type': 'Question', name: 'How does it work?', acceptedAnswer: { '@type': 'Answer', text: 'Automatic checks.' } },
      ],
    };
    const current = createUnknownSnapshot(capturedAt, true);
    const answer = formatAvailabilityAnswer(current, 'en');
    const updated = updateAvailabilityFaq(schema, answer) as typeof schema;
    expect(answer).toContain('ResortPass Silver: Unknown');
    expect(answer).toContain('ResortPass Gold: Unknown');
    expect(answer).not.toContain('Available now');
    expect(answer).not.toContain('Sold out');
    expect(updated.mainEntity[1].acceptedAnswer.text).toBe(answer);
    expect(updated.mainEntity[0]).toEqual(schema.mainEntity[0]);
    expect(updated.mainEntity[2]).toEqual(schema.mainEntity[2]);
    expect(schema.mainEntity[1].acceptedAnswer.text).toBe(previousAnswer);
    expect(formatStatusRequest(current, getStatusCopy('en'), 'en-GB')).toContain('Could not load status');
  });
});
