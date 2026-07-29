import { getDb } from './db';
import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { localizedSiteUrl, type RenderedEmail } from './email';
import { normalizeLanguage } from './locales';

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

export function renderIncidentEmail(lang: string, unsubscribeToken: string): RenderedEmail {
  const requestedLanguage = normalizeLanguage(lang);
  const siteUrl = localizedSiteUrl(requestedLanguage);
  const unsubscribeUrl = `${localizedSiteUrl(requestedLanguage, 'unsubscribe')}?token=${encodeURIComponent(unsubscribeToken)}`;

  if (requestedLanguage === 'de') {
    const html = loadTemplate()
      .replaceAll('{{SITE_URL}}', siteUrl.replace(/\/+$/, ''))
      .replaceAll('{{UNSUBSCRIBE_URL}}', unsubscribeUrl);
    return {
      subject: 'Sorry — der Alarm gestern war ein Fehlalarm',
      html,
      text: `Hallo!\n\nSorry, der Alarm von gestern war leider ein Fehlalarm.\n\nAm 19. März haben wir euch geschrieben, dass der ResortPass Silver und Gold wieder verfügbar sei — das stimmte leider nicht. Der Ticketshop hatte eine Schutzseite vorgeschaltet, die unser System falsch interpretiert hat.\n\nWir haben das sofort gefixt. Nochmals sorry für die Aufregung!\n\nMehr dazu: ${siteUrl}#news\n\n---\nAbmelden: ${unsubscribeUrl}`,
    };
  }

  const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>False alarm correction</title></head>
<body style="margin:0;padding:32px 16px;background:#FFF9F0;font-family:Verdana,Arial,sans-serif;color:#2E1065;">
  <div style="max-width:480px;margin:0 auto;background:#FFFFFF;border:3px solid #2E1065;border-radius:20px;padding:28px;box-sizing:border-box;">
    <h1 style="font-size:20px;line-height:1.3;margin:0 0 16px;">Sorry — yesterday's alert was a false alarm</h1>
    <p style="font-size:14px;line-height:1.65;">On 19 March, we told you that ResortPass Silver and Gold were available again. Unfortunately, that was incorrect: the ticket shop displayed a protection page which our system misinterpreted.</p>
    <p style="font-size:14px;line-height:1.65;">We fixed the checker immediately and added a second verification step. We are sorry for the confusion.</p>
    <p style="font-size:13px;line-height:1.6;margin-top:22px;"><a href="${siteUrl}#news">Read more on the website</a></p>
    <p style="font-size:11px;line-height:1.6;margin-top:22px;color:#8B7BB3;">You are receiving this email because you subscribed to ResortPass Tracker.<br /><a href="${unsubscribeUrl}">Unsubscribe</a></p>
  </div>
</body>
</html>`;

  return {
    subject: 'Correction — yesterday’s alert was a false alarm',
    html,
    text: `Hello,\n\nYesterday's ResortPass availability alert was a false alarm. The ticket shop displayed a protection page which our system misinterpreted.\n\nWe fixed the checker immediately and added a second verification step. We are sorry for the confusion.\n\nRead more: ${siteUrl}#news\n\n---\nUnsubscribe: ${unsubscribeUrl}`,
  };
}

async function main() {
  const db = getDb();

  const subscribers = db.query(
    'SELECT email, unsubscribe_token, lang FROM subscribers WHERE confirmed = 1'
  ).all() as { email: string; unsubscribe_token: string; lang: string }[];

  console.log(`Found ${subscribers.length} confirmed subscribers.`);

  if (subscribers.length === 0) {
    console.log('No subscribers to notify.');
    return;
  }

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      await transporter.sendMail({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: sub.email,
        ...renderIncidentEmail(sub.lang, sub.unsubscribe_token),
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

if (import.meta.main) {
  main().catch((err) => {
    console.error('Send incident mail failed:', err);
    process.exit(1);
  });
}
