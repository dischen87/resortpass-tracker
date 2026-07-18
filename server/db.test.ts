import { expect, test } from 'bun:test';
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
