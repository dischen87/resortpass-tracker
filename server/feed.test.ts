import { afterEach, describe, expect, test } from 'bun:test';
import { Database } from 'bun:sqlite';
import {
  getDailyAvailabilityAggregates,
  getHistoryStats,
  getMonthlyHeatmap,
  type DailyAvailabilityAggregate,
} from './db';
import { buildRss, formatDailyDigest, normalizeFeedLanguage, type NewsDigest } from './feed';
import { supportedLanguages } from './locales';

const databases: Database[] = [];

function historyDb(rows: Array<[string, 0 | 1, string]>): Database {
  const db = new Database(':memory:');
  databases.push(db);
  db.exec(`
    CREATE TABLE availability_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pass_type TEXT NOT NULL,
      available BOOLEAN NOT NULL,
      checked_at DATETIME NOT NULL
    )
  `);
  const insert = db.query('INSERT INTO availability_history (pass_type, available, checked_at) VALUES (?, ?, ?)');
  for (const row of rows) insert.run(...row);
  return db;
}

afterEach(() => {
  for (const db of databases.splice(0)) db.close();
});

describe('daily availability feed', () => {
  const row: DailyAvailabilityAggregate = {
    date: '2026-07-18',
    silverChecks: 4,
    silverAvailableChecks: 1,
    goldChecks: 4,
    goldAvailableChecks: 0,
    firstCheckedAt: '2026-07-18 00:00:00',
    lastCheckedAt: '2026-07-18 23:45:00',
  };

  test('formats deterministic localized prose', () => {
    expect(formatDailyDigest(row, 'de').summary).toContain('1 von 4 Prüfungen');
    expect(formatDailyDigest(row, 'fr').summary).toContain('1 contrôle sur 4');
    expect(formatDailyDigest(row, 'it').summary).toContain('1 controllo su 4');
    expect(formatDailyDigest(row, 'en').summary).toContain('1 of 4 checks');
    expect(formatDailyDigest(row, 'en')).toMatchObject({
      id: 'availability-2026-07-18',
      updatedAt: '2026-07-18T23:45:00.000Z',
      status: {
        silver: { state: 'available', availableChecks: 1, totalChecks: 4 },
        gold: { state: 'sold_out', availableChecks: 0, totalChecks: 4 },
      },
    });
    for (const lang of supportedLanguages) {
      const digest = formatDailyDigest(row, lang);
      expect(digest.title.length).toBeGreaterThan(10);
      expect(digest.summary).toContain('ResortPass Silver');
      expect(digest.summary).toContain('ResortPass Gold');
    }
    expect(normalizeFeedLanguage('es')).toBe('es');
    expect(normalizeFeedLanguage('pt-BR')).toBe('pt');
    expect(normalizeFeedLanguage('unsupported')).toBe('en');
    expect(normalizeFeedLanguage(undefined)).toBe('de');
  });

  test('builds escaped RSS 2.0 with a stable guid', () => {
    const item: NewsDigest = {
      ...formatDailyDigest(row, 'en'),
      title: 'Silver & Gold <status>',
      summary: 'Checked "Silver" & Gold',
    };
    const xml = buildRss('en', [item], 'https://example.com/');

    expect(xml).toStartWith('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('Silver &amp; Gold &lt;status&gt;');
    expect(xml).toContain('Checked &quot;Silver&quot; &amp; Gold');
    expect(xml).toContain('<guid isPermaLink="false">urn:resortpass:availability-2026-07-18</guid>');
    expect(xml).toContain('<atom:link href="https://example.com/api/feed.xml?lang=en"');
    expect(xml).not.toContain('Silver & Gold <status>');

    const hebrewXml = buildRss('he', [formatDailyDigest(row, 'he')], 'https://example.com/');
    expect(hebrewXml).toContain('<language>he-IL</language>');
    expect(hebrewXml).toContain('<link>https://example.com/he/</link>');
    expect(hebrewXml).toContain('<link>https://example.com/he/#history</link>');
    expect(hebrewXml).toContain('lang=he');

    for (const lang of supportedLanguages) {
      const localizedXml = buildRss(lang, [formatDailyDigest(row, lang)], 'https://example.com/');
      const prefix = lang === 'de' ? '/' : `/${lang}/`;
      expect(localizedXml).toContain(`<link>https://example.com${prefix}</link>`);
      expect(localizedXml).toContain(`<link>https://example.com${prefix}#history</link>`);
    }
  });
});

test('aggregate queries retain but normalize the 2026-03-19 false positives', () => {
  const db = historyDb([
    ['silver', 1, '2026-03-19 08:00:00'],
    ['silver', 1, '2026-03-19 08:15:00'],
    ['silver', 0, '2026-03-19 08:30:00'],
    ['gold', 1, '2026-03-19 08:00:00'],
    ['silver', 1, '2026-03-20 08:00:00'],
    ['gold', 0, '2026-03-20 08:00:00'],
  ]);

  expect(getDailyAvailabilityAggregates(30, db)).toEqual([
    {
      date: '2026-03-20',
      silverChecks: 1,
      silverAvailableChecks: 1,
      goldChecks: 1,
      goldAvailableChecks: 0,
      firstCheckedAt: '2026-03-20 08:00:00',
      lastCheckedAt: '2026-03-20 08:00:00',
    },
    {
      date: '2026-03-19',
      silverChecks: 3,
      silverAvailableChecks: 0,
      goldChecks: 1,
      goldAvailableChecks: 0,
      firstCheckedAt: '2026-03-19 08:00:00',
      lastCheckedAt: '2026-03-19 08:30:00',
    },
  ]);

  expect(getHistoryStats(db)).toMatchObject({
    silver: { totalChecks: 4, availableChecks: 1, percentage: 25 },
    gold: { totalChecks: 2, availableChecks: 0, percentage: 0 },
  });
  expect(getMonthlyHeatmap('silver', db)).toEqual([
    { year: '2026', month: '03', total_checks: 4, available_checks: 1, availability_pct: 25 },
  ]);
});
