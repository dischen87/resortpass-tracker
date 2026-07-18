import { getDb } from './db';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = process.env.SITE_URL || 'https://www.resortpass-europapark.ch';
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '25');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@resortpass-europapark.ch';
const FROM_NAME = process.env.FROM_NAME || 'ResortPass Tracker';

const transportConfig: any = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
};

if (SMTP_USER && SMTP_PASS) {
  transportConfig.auth = { user: SMTP_USER, pass: SMTP_PASS };
}

const transporter = nodemailer.createTransport(transportConfig);

function loadTemplate(): string {
  return readFileSync(join(import.meta.dir, '..', 'emails', 'incident.html'), 'utf-8');
}

async function main() {
  const db = getDb();

  const subscribers = db.query(
    'SELECT email, unsubscribe_token FROM subscribers WHERE confirmed = 1'
  ).all() as { email: string; unsubscribe_token: string }[];

  console.log(`Found ${subscribers.length} confirmed subscribers.`);

  if (subscribers.length === 0) {
    console.log('No subscribers to notify.');
    return;
  }

  const template = loadTemplate();

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${sub.unsubscribe_token}`;

    let html = template
      .replaceAll('{{SITE_URL}}', SITE_URL)
      .replaceAll('{{UNSUBSCRIBE_URL}}', unsubscribeUrl);

    try {
      await transporter.sendMail({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: sub.email,
        subject: 'Sorry — der Alarm gestern war ein Fehlalarm',
        html,
        text: `Hallo!\n\nSorry, der Alarm von gestern war leider ein Fehlalarm.\n\nAm 19. März haben wir euch geschrieben, dass der ResortPass Silver und Gold wieder verfügbar sei — das stimmte leider nicht. Der Ticketshop hatte eine Schutzseite vorgeschaltet, die unser System falsch interpretiert hat.\n\nWir haben das sofort gefixt. Nochmals sorry für die Aufregung!\n\nMehr dazu: ${SITE_URL}/#news\n\n---\nAbmelden: ${unsubscribeUrl}`,
      });
      sent++;
      console.log(`[${sent}/${subscribers.length}] Sent to ${sub.email}`);
    } catch (err) {
      failed++;
      console.error(`Failed to send to ${sub.email}:`, err);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone! Sent: ${sent}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error('Send incident mail failed:', err);
  process.exit(1);
});
