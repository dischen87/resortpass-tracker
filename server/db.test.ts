import { expect, test } from 'bun:test';
import { Database } from 'bun:sqlite';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('subscriber community lifecycle keeps locale and removes related data', async () => {
  const testDir = mkdtempSync(join(tmpdir(), 'resortpass-db-test-'));

  try {
    const child = Bun.spawn([process.execPath, '--eval', `
      import assert from 'node:assert/strict';
      import {
        addSubscriber,
        confirmSubscriber,
        createCommunityPost,
        getConfirmedSubscribers,
        getDb,
        getSubscriberByCommunityToken,
        unsubscribe,
      } from './db.ts';

      const signup = addSubscriber('fan@example.test', true, false, 'fr');
      assert.equal(signup.isNew, true);
      assert.match(signup.confirmToken, /^[a-f0-9]{64}$/);
      assert.match(signup.communityToken, /^[a-f0-9]{64}$/);
      assert.equal(confirmSubscriber(signup.confirmToken), true);

      const db = getDb();
      assert.equal(db.query('PRAGMA busy_timeout').get().timeout, 10_000);
      const subscriber = db.query(
        'SELECT id, lang, unsubscribe_token, community_token FROM subscribers WHERE email = ?',
      ).get('fan@example.test');
      assert.equal(subscriber.lang, 'fr');
      assert.equal(subscriber.community_token, signup.communityToken);
      assert.match(subscriber.unsubscribe_token, /^[a-f0-9]{64}$/);

      assert.deepEqual(getSubscriberByCommunityToken(signup.communityToken), {
        id: subscriber.id,
        email: 'fan@example.test',
      });
      createCommunityPost(subscriber.id, 'Fan', 'Aktuelles', 'Der Pass bleibt ausverkauft.');
      assert.equal(db.query('SELECT COUNT(*) AS count FROM community_posts').get().count, 1);

      const confirmed = getConfirmedSubscribers('silver');
      assert.equal(confirmed.length, 1);
      assert.equal(confirmed[0].lang, 'fr');
      assert.equal(confirmed[0].community_token, signup.communityToken);

      const repeat = addSubscriber('fan@example.test', false, true, 'en');
      assert.equal(repeat.alreadyConfirmed, true);
      const unchanged = db.query(
        'SELECT notify_silver, notify_gold, lang FROM subscribers WHERE email = ?',
      ).get('fan@example.test');
      assert.deepEqual(unchanged, { notify_silver: 1, notify_gold: 0, lang: 'fr' });

      assert.equal(unsubscribe(subscriber.unsubscribe_token), true);
      assert.equal(db.query('SELECT COUNT(*) AS count FROM subscribers').get().count, 0);
      assert.equal(db.query('SELECT COUNT(*) AS count FROM community_posts').get().count, 0);
      assert.equal(unsubscribe(subscriber.unsubscribe_token), false);
      db.close();
    `], {
      cwd: import.meta.dir,
      env: { ...process.env, DB_PATH: join(testDir, 'resortpass.db') },
      stdout: 'ignore',
      stderr: 'pipe',
    });

    const [exitCode, stderr] = await Promise.all([
      child.exited,
      new Response(child.stderr).text(),
    ]);
    if (exitCode !== 0) throw new Error(stderr.trim() || `database test exited with ${exitCode}`);
    expect(exitCode).toBe(0);
  } finally {
    rmSync(testDir, { recursive: true, force: true });
  }
});

test('subscriber locale migration preserves rows and expands the existing CHECK constraint', async () => {
  const testDir = mkdtempSync(join(tmpdir(), 'resortpass-db-locale-migration-'));
  const databasePath = join(testDir, 'resortpass.db');

  try {
    const legacy = new Database(databasePath, { create: true });
    legacy.exec(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        notify_silver BOOLEAN DEFAULT 1,
        notify_gold BOOLEAN DEFAULT 1,
        confirmed BOOLEAN DEFAULT 0,
        confirm_token TEXT,
        unsubscribe_token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        community_token TEXT,
        lang TEXT NOT NULL DEFAULT 'de' CHECK(lang IN ('de', 'fr', 'it', 'en'))
      );
      CREATE UNIQUE INDEX idx_subscribers_community_token ON subscribers (community_token);
      CREATE TABLE community_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subscriber_id INTEGER NOT NULL,
        author_name TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (subscriber_id) REFERENCES subscribers(id)
      );
      INSERT INTO subscribers (
        id, email, notify_silver, notify_gold, confirmed, unsubscribe_token, community_token, lang
      ) VALUES (
        7, 'legacy@example.test', 1, 0, 1, 'legacy-unsubscribe', 'legacy-community', 'fr'
      );
      INSERT INTO community_posts (
        subscriber_id, author_name, title, body
      ) VALUES (
        7, 'Legacy fan', 'Existing post', 'This row must survive the migration.'
      );
    `);
    legacy.close();

    const child = Bun.spawn([process.execPath, '--eval', `
      import assert from 'node:assert/strict';
      import { addSubscriber, confirmSubscriber, getConfirmedSubscribers, getDb } from './db.ts';
      import { supportedLanguages } from './locales.ts';

      const db = getDb();
      const legacySubscriber = db.query(
        'SELECT id, email, lang, community_token FROM subscribers WHERE id = 7',
      ).get();
      assert.deepEqual(legacySubscriber, {
        id: 7,
        email: 'legacy@example.test',
        lang: 'fr',
        community_token: 'legacy-community',
      });
      assert.equal(
        db.query('SELECT COUNT(*) AS count FROM community_posts WHERE subscriber_id = 7').get().count,
        1,
      );

      const schema = db.query(
        "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'subscribers'",
      ).get().sql;
      for (const lang of supportedLanguages) assert.ok(schema.includes("'" + lang + "'"));

      for (const lang of supportedLanguages) {
        const signup = addSubscriber(lang + '@example.test', true, true, lang);
        assert.equal(confirmSubscriber(signup.confirmToken), true);
      }

      const fallback = addSubscriber('fallback@example.test', true, false, 'unsupported');
      assert.equal(confirmSubscriber(fallback.confirmToken), true);
      assert.equal(
        db.query('SELECT lang FROM subscribers WHERE email = ?').get('fallback@example.test').lang,
        'en',
      );

      const confirmedLanguages = new Set(
        getConfirmedSubscribers('silver').map((subscriber) => subscriber.lang),
      );
      for (const lang of supportedLanguages) assert.ok(confirmedLanguages.has(lang));
      assert.deepEqual(db.query('PRAGMA foreign_key_check').all(), []);
      db.close();
    `], {
      cwd: import.meta.dir,
      env: { ...process.env, DB_PATH: databasePath },
      stdout: 'ignore',
      stderr: 'pipe',
    });

    const [exitCode, stderr] = await Promise.all([
      child.exited,
      new Response(child.stderr).text(),
    ]);
    if (exitCode !== 0) throw new Error(stderr.trim() || `database migration test exited with ${exitCode}`);
    expect(exitCode).toBe(0);
  } finally {
    rmSync(testDir, { recursive: true, force: true });
  }
});

test('known false alarms are excluded from every aggregate', async () => {
  const testDir = mkdtempSync(join(tmpdir(), 'resortpass-fp-test-'));

  try {
    const child = Bun.spawn([process.execPath, '--eval', `
      import assert from 'node:assert/strict';
      import {
        FALSE_POSITIVE_AVAILABLE_DATES,
        getDb,
        getHistoryStats,
        getMonthlyHeatmap,
        logHistory,
      } from './db.ts';

      const db = getDb();
      // Both documented false alarms, plus a genuine-looking hit that must survive.
      const rows = [
        ['silver', 1, '2026-03-19 18:23:25'],
        ['gold',   1, '2026-03-19 18:23:25'],
        ['silver', 1, '2026-06-09 21:30:14'],
        ['gold',   1, '2026-06-09 21:35:06'],
        ['silver', 1, '2026-07-01 10:00:00'],
        ['silver', 0, '2026-07-01 10:15:00'],
      ];
      for (const [type, available, at] of rows) {
        db.run('INSERT INTO availability_history (pass_type, available, checked_at) VALUES (?, ?, ?)', [type, available, at]);
      }

      assert.deepEqual([...FALSE_POSITIVE_AVAILABLE_DATES], ['2026-03-19', '2026-06-09']);

      const stats = getHistoryStats();
      // Only the July row counts; the four false-alarm rows do not.
      assert.equal(stats.silver.availableChecks, 1, 'silver should count only the genuine hit');
      assert.equal(stats.gold.availableChecks, 0, 'gold had no hit outside the false alarms');
      // The checks themselves stay in the totals — they really were performed.
      assert.equal(stats.silver.totalChecks, 4);

      const months = Object.fromEntries(getMonthlyHeatmap('silver').map((m) => [m.year + '-' + m.month, m.available_checks]));
      assert.equal(months['2026-03'], 0, 'March false alarm must not appear');
      assert.equal(months['2026-06'], 0, 'June false alarm must not appear');
      assert.equal(months['2026-07'], 1, 'the genuine hit must survive');
    `], {
      cwd: join(import.meta.dir),
      env: { ...process.env, DB_PATH: join(testDir, 'test.db') },
      stdout: 'pipe',
      stderr: 'pipe',
    });

    const [code, stderr] = await Promise.all([child.exited, new Response(child.stderr).text()]);
    expect(stderr).toBe('');
    expect(code).toBe(0);
  } finally {
    rmSync(testDir, { recursive: true, force: true });
  }
});
