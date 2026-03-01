import { Database } from 'bun:sqlite';
import { randomBytes } from 'crypto';

const DB_PATH = process.env.DB_PATH || './data/resortpass.db';

let db: Database;

export function getDb(): Database {
  if (!db) {
    db = new Database(DB_PATH, { create: true });
    db.exec('PRAGMA journal_mode = WAL');
    db.exec('PRAGMA foreign_keys = ON');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      notify_silver BOOLEAN DEFAULT 1,
      notify_gold BOOLEAN DEFAULT 1,
      confirmed BOOLEAN DEFAULT 0,
      confirm_token TEXT,
      unsubscribe_token TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS status_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pass_type TEXT NOT NULL,
      available BOOLEAN NOT NULL,
      checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}

export function addSubscriber(email: string, notifySilver: boolean, notifyGold: boolean) {
  const d = getDb();
  const confirmToken = generateToken();
  const unsubscribeToken = generateToken();

  // Check if subscriber already exists
  const existing = d.query('SELECT id, confirmed FROM subscribers WHERE email = ?').get(email) as { id: number; confirmed: boolean } | null;

  if (existing) {
    // Update preferences
    d.query('UPDATE subscribers SET notify_silver = ?, notify_gold = ?, confirm_token = ? WHERE email = ?')
      .run(notifySilver ? 1 : 0, notifyGold ? 1 : 0, confirmToken, email);
    return { confirmToken, isNew: false, alreadyConfirmed: existing.confirmed };
  }

  d.query(
    'INSERT INTO subscribers (email, notify_silver, notify_gold, confirm_token, unsubscribe_token) VALUES (?, ?, ?, ?, ?)'
  ).run(email, notifySilver ? 1 : 0, notifyGold ? 1 : 0, confirmToken, unsubscribeToken);

  return { confirmToken, isNew: true, alreadyConfirmed: false };
}

export function confirmSubscriber(token: string): boolean {
  const d = getDb();
  const result = d.query('UPDATE subscribers SET confirmed = 1, confirm_token = NULL WHERE confirm_token = ?').run(token);
  return result.changes > 0;
}

export function unsubscribe(token: string): boolean {
  const d = getDb();
  const result = d.query('DELETE FROM subscribers WHERE unsubscribe_token = ?').run(token);
  return result.changes > 0;
}

export function getConfirmedSubscribers(passType: 'silver' | 'gold') {
  const d = getDb();
  const column = passType === 'silver' ? 'notify_silver' : 'notify_gold';
  return d.query(`SELECT email, unsubscribe_token FROM subscribers WHERE confirmed = 1 AND ${column} = 1`).all() as {
    email: string;
    unsubscribe_token: string;
  }[];
}

export function getLatestStatus() {
  const d = getDb();
  const silver = d.query(
    'SELECT available, checked_at FROM status_log WHERE pass_type = ? ORDER BY checked_at DESC LIMIT 1'
  ).get('silver') as { available: number; checked_at: string } | null;

  const gold = d.query(
    'SELECT available, checked_at FROM status_log WHERE pass_type = ? ORDER BY checked_at DESC LIMIT 1'
  ).get('gold') as { available: number; checked_at: string } | null;

  return {
    silver: silver ? { available: !!silver.available, lastCheck: silver.checked_at } : null,
    gold: gold ? { available: !!gold.available, lastCheck: gold.checked_at } : null,
  };
}

export function logStatus(passType: 'silver' | 'gold', available: boolean) {
  const d = getDb();
  d.query('INSERT INTO status_log (pass_type, available) VALUES (?, ?)').run(passType, available ? 1 : 0);
}

export function getPreviousStatus(passType: 'silver' | 'gold'): boolean | null {
  const d = getDb();
  const row = d.query(
    'SELECT available FROM status_log WHERE pass_type = ? ORDER BY checked_at DESC LIMIT 1'
  ).get(passType) as { available: number } | null;
  return row ? !!row.available : null;
}
