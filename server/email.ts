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
  secure: false,
  tls: { rejectUnauthorized: false },
};

if (SMTP_USER && SMTP_PASS) {
  transportConfig.auth = {
    user: SMTP_USER,
    pass: SMTP_PASS,
  };
}

const transporter = nodemailer.createTransport(transportConfig);

function loadTemplate(name: string): string {
  try {
    return readFileSync(join(import.meta.dir, '..', 'emails', `${name}.html`), 'utf-8');
  } catch {
    return '';
  }
}

function replacePlaceholders(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

export async function sendConfirmationEmail(email: string, confirmToken: string) {
  const template = loadTemplate('confirm');
  const confirmUrl = `${SITE_URL}/confirm?token=${confirmToken}`;

  const html = replacePlaceholders(template, {
    CONFIRM_URL: confirmUrl,
    SITE_URL: SITE_URL,
  });

  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: 'Bitte bestätige deine E-Mail — ResortPass Tracker',
    html,
    text: `Hallo!\n\nBitte bestätige deine Anmeldung beim ResortPass Tracker:\n${confirmUrl}\n\nWenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach.`,
  });
}

export async function sendAlertEmail(
  email: string,
  passType: 'silver' | 'gold',
  unsubscribeToken: string
) {
  const template = loadTemplate('alert');
  const passLabel = passType === 'silver' ? 'Silver' : 'Gold';
  const shopUrl =
    passType === 'silver'
      ? 'https://tickets.mackinternational.de/de/ticket/resortpass-silver'
      : 'https://tickets.mackinternational.de/de/ticket/resortpass-gold';
  const unsubscribeUrl = `${SITE_URL}/unsubscribe?token=${unsubscribeToken}`;

  const html = replacePlaceholders(template, {
    PASS_TYPE: passLabel,
    SHOP_URL: shopUrl,
    UNSUBSCRIBE_URL: unsubscribeUrl,
    SITE_URL: SITE_URL,
  });

  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: `ResortPass ${passLabel} ist JETZT verfügbar!`,
    html,
    text: `Hallo!\n\nGute Nachrichten — der Europa-Park ResortPass ${passLabel} ist gerade wieder im Ticketshop verfügbar!\n\nErfahrungsgemäss sind die Kontingente schnell vergriffen, also am besten sofort zuschlagen:\n${shopUrl}\n\nViel Spass im Europa-Park!\n\n---\nAbmelden: ${unsubscribeUrl}`,
  });
}

export async function sendUnsubscribeConfirmation(email: string) {
  const template = loadTemplate('unsubscribe');

  const html = replacePlaceholders(template, {
    SITE_URL: SITE_URL,
  });

  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    subject: 'Abmeldung bestätigt — ResortPass Tracker',
    html,
    text: `Du wurdest erfolgreich vom ResortPass Tracker abgemeldet.\n\nDeine Daten wurden gelöscht. Du erhältst keine weiteren E-Mails.\n\nFalls du dich wieder anmelden möchtest: ${SITE_URL}`,
  });
}
