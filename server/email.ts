import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  defaultLanguage,
  fallbackLanguage,
  isRtlLanguage,
  normalizeLanguage,
  type SupportedLanguage,
} from './locales';

const SITE_URL = process.env.SITE_URL || 'https://www.resortpass-europapark.ch';
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '25');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@resortpass-europapark.ch';
const FROM_NAME = process.env.FROM_NAME || 'ResortPass Tracker';
const localizedUiLanguages = new Set<SupportedLanguage>(['de', 'fr', 'it', 'en']);

const transportConfig: any = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
};

if (SMTP_USER && SMTP_PASS) {
  transportConfig.auth = {
    user: SMTP_USER,
    pass: SMTP_PASS,
  };
}

const transporter = nodemailer.createTransport(transportConfig);

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

interface EmailCopy {
  footer: string;
  confirm: {
    title: string;
    subject: string;
    greeting: string;
    message: string;
    button: string;
    ignore: string;
    community: string;
    communityButton: string;
    text: (url: string, communityUrl?: string) => string;
  };
  alert: {
    title: string;
    subject: (pass: string) => string;
    greeting: string;
    headline: (pass: string) => string;
    urgency: string;
    button: string;
    closing: string;
    reason: string;
    unsubscribe: string;
    community: string;
    communityButton: string;
    text: (pass: string, shopUrl: string, unsubscribeUrl: string, communityUrl?: string) => string;
  };
  unsubscribe: {
    title: string;
    subject: string;
    heading: string;
    message: string;
    resubscribe: string;
    text: (siteUrl: string) => string;
  };
}

const emailCopy: Partial<Record<SupportedLanguage, EmailCopy>> & Record<'de' | 'fr' | 'it' | 'en', EmailCopy> = {
  de: {
    footer: 'ResortPass Tracker — inoffizielles Community-Projekt',
    confirm: {
      title: 'E-Mail bestätigen',
      subject: 'Bitte bestätige deine E-Mail — ResortPass Tracker',
      greeting: 'Hallo!',
      message: 'Bitte bestätige deine Anmeldung, damit wir dich benachrichtigen können, sobald der Europa-Park ResortPass wieder verfügbar ist.',
      button: 'E-Mail bestätigen',
      ignore: 'Wenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach.',
      community: 'Nach der Bestätigung kannst du deinen Tipp mit der Community teilen.',
      communityButton: 'Community-Tipp teilen',
      text: (url, communityUrl) => `Hallo!\n\nBitte bestätige deine Anmeldung beim ResortPass Tracker:\n${url}\n\nWenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach.${communityUrl ? `\n\nNach der Bestätigung kannst du deinen Tipp mit der Community teilen:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass verfügbar!',
      subject: (pass) => `ResortPass ${pass} ist jetzt verfügbar!`,
      greeting: 'Hallo!',
      headline: (pass) => `Der Europa-Park ResortPass ${pass} ist gerade wieder im Ticketshop verfügbar!`,
      urgency: 'Erfahrungsgemäss sind die Kontingente schnell vergriffen, also am besten sofort zuschlagen:',
      button: 'Jetzt kaufen →',
      closing: 'Viel Spass im Europa-Park!',
      reason: 'Du erhältst diese E-Mail, weil du dich auf resortpass-europapark.ch angemeldet hast.',
      unsubscribe: 'Abmelden',
      community: 'Du hast einen Tipp? Teile ihn mit der Community.',
      communityButton: 'Community-Tipp teilen',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Hallo!\n\nGute Nachrichten — der Europa-Park ResortPass ${pass} ist gerade wieder im Ticketshop verfügbar!\n\nErfahrungsgemäss sind die Kontingente schnell vergriffen, also am besten sofort zuschlagen:\n${shopUrl}\n\nViel Spass im Europa-Park!${communityUrl ? `\n\nDu hast einen Tipp? Teile ihn mit der Community:\n${communityUrl}` : ''}\n\n---\nAbmelden: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Abmeldung bestätigt',
      subject: 'Abmeldung bestätigt — ResortPass Tracker',
      heading: 'Du wurdest erfolgreich abgemeldet.',
      message: 'Deine Daten wurden vollständig gelöscht. Du erhältst keine weiteren E-Mails von uns.',
      resubscribe: 'Falls du dich wieder anmelden möchtest:',
      text: (siteUrl) => `Du wurdest erfolgreich vom ResortPass Tracker abgemeldet.\n\nDeine Daten wurden gelöscht. Du erhältst keine weiteren E-Mails.\n\nFalls du dich wieder anmelden möchtest: ${siteUrl}`,
    },
  },
  fr: {
    footer: 'ResortPass Tracker — projet communautaire non officiel',
    confirm: {
      title: 'Confirmer votre adresse e-mail',
      subject: 'Veuillez confirmer votre adresse e-mail — ResortPass Tracker',
      greeting: 'Bonjour !',
      message: 'Veuillez confirmer votre inscription afin que nous puissions vous avertir dès que le ResortPass Europa-Park sera à nouveau disponible.',
      button: 'Confirmer mon adresse e-mail',
      ignore: 'Si vous ne vous êtes pas inscrit, vous pouvez simplement ignorer cet e-mail.',
      community: 'Après la confirmation, vous pourrez partager votre astuce avec la communauté.',
      communityButton: 'Partager une astuce',
      text: (url, communityUrl) => `Bonjour !\n\nVeuillez confirmer votre inscription au ResortPass Tracker :\n${url}\n\nSi vous ne vous êtes pas inscrit, vous pouvez simplement ignorer cet e-mail.${communityUrl ? `\n\nAprès la confirmation, vous pourrez partager votre astuce avec la communauté :\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass disponible !',
      subject: (pass) => `Le ResortPass ${pass} est disponible maintenant !`,
      greeting: 'Bonjour !',
      headline: (pass) => `Bonne nouvelle : le ResortPass Europa-Park ${pass} est à nouveau disponible dans la billetterie !`,
      urgency: 'Les contingents sont souvent épuisés rapidement. Mieux vaut donc ne pas attendre :',
      button: 'Acheter maintenant →',
      closing: 'Bon séjour à Europa-Park !',
      reason: 'Vous recevez cet e-mail parce que vous vous êtes inscrit sur resortpass-europapark.ch.',
      unsubscribe: 'Se désabonner',
      community: 'Vous avez une astuce ? Partagez-la avec la communauté.',
      communityButton: 'Partager une astuce',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Bonjour !\n\nBonne nouvelle : le ResortPass Europa-Park ${pass} est à nouveau disponible dans la billetterie !\n\nLes contingents sont souvent épuisés rapidement. Mieux vaut donc ne pas attendre :\n${shopUrl}\n\nBon séjour à Europa-Park !${communityUrl ? `\n\nVous avez une astuce ? Partagez-la avec la communauté :\n${communityUrl}` : ''}\n\n---\nSe désabonner : ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Désabonnement confirmé',
      subject: 'Désabonnement confirmé — ResortPass Tracker',
      heading: 'Votre désabonnement a bien été pris en compte.',
      message: 'Vos données ont été entièrement supprimées. Vous ne recevrez plus d’e-mails de notre part.',
      resubscribe: 'Si vous souhaitez vous réinscrire :',
      text: (siteUrl) => `Votre désabonnement au ResortPass Tracker a bien été pris en compte.\n\nVos données ont été supprimées. Vous ne recevrez plus d’e-mails.\n\nSi vous souhaitez vous réinscrire : ${siteUrl}`,
    },
  },
  it: {
    footer: 'ResortPass Tracker — progetto della community non ufficiale',
    confirm: {
      title: 'Conferma il tuo indirizzo e-mail',
      subject: 'Conferma il tuo indirizzo e-mail — ResortPass Tracker',
      greeting: 'Ciao!',
      message: 'Conferma la tua iscrizione per ricevere una notifica non appena il ResortPass Europa-Park sarà di nuovo disponibile.',
      button: 'Conferma il mio indirizzo e-mail',
      ignore: 'Se non ti sei iscritto, ignora semplicemente questa e-mail.',
      community: 'Dopo la conferma potrai condividere il tuo consiglio con la community.',
      communityButton: 'Condividi un consiglio',
      text: (url, communityUrl) => `Ciao!\n\nConferma la tua iscrizione al ResortPass Tracker:\n${url}\n\nSe non ti sei iscritto, ignora semplicemente questa e-mail.${communityUrl ? `\n\nDopo la conferma potrai condividere il tuo consiglio con la community:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass disponibile!',
      subject: (pass) => `Il ResortPass ${pass} è disponibile ora!`,
      greeting: 'Ciao!',
      headline: (pass) => `Ottime notizie: il ResortPass Europa-Park ${pass} è di nuovo disponibile nel negozio di biglietti!`,
      urgency: 'I contingenti si esauriscono spesso in fretta, quindi ti consigliamo di non aspettare:',
      button: 'Acquista ora →',
      closing: 'Buon divertimento a Europa-Park!',
      reason: 'Ricevi questa e-mail perché ti sei iscritto su resortpass-europapark.ch.',
      unsubscribe: 'Disiscriviti',
      community: 'Hai un consiglio? Condividilo con la community.',
      communityButton: 'Condividi un consiglio',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Ciao!\n\nOttime notizie: il ResortPass Europa-Park ${pass} è di nuovo disponibile nel negozio di biglietti!\n\nI contingenti si esauriscono spesso in fretta, quindi ti consigliamo di non aspettare:\n${shopUrl}\n\nBuon divertimento a Europa-Park!${communityUrl ? `\n\nHai un consiglio? Condividilo con la community:\n${communityUrl}` : ''}\n\n---\nDisiscriviti: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Disiscrizione confermata',
      subject: 'Disiscrizione confermata — ResortPass Tracker',
      heading: 'La tua disiscrizione è stata confermata.',
      message: 'I tuoi dati sono stati eliminati completamente. Non riceverai altre e-mail da parte nostra.',
      resubscribe: 'Se vuoi iscriverti di nuovo:',
      text: (siteUrl) => `La tua disiscrizione dal ResortPass Tracker è stata confermata.\n\nI tuoi dati sono stati eliminati. Non riceverai altre e-mail.\n\nSe vuoi iscriverti di nuovo: ${siteUrl}`,
    },
  },
  en: {
    footer: 'ResortPass Tracker — unofficial community project',
    confirm: {
      title: 'Confirm your email address',
      subject: 'Please confirm your email — ResortPass Tracker',
      greeting: 'Hello!',
      message: 'Please confirm your subscription so we can notify you as soon as the Europa-Park ResortPass becomes available again.',
      button: 'Confirm my email',
      ignore: 'If you did not sign up, you can simply ignore this email.',
      community: 'After confirming, you can share your tip with the community.',
      communityButton: 'Share a community tip',
      text: (url, communityUrl) => `Hello!\n\nPlease confirm your ResortPass Tracker subscription:\n${url}\n\nIf you did not sign up, you can simply ignore this email.${communityUrl ? `\n\nAfter confirming, you can share your tip with the community:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass available!',
      subject: (pass) => `ResortPass ${pass} is available now!`,
      greeting: 'Hello!',
      headline: (pass) => `Good news: the Europa-Park ResortPass ${pass} is back in stock in the ticket shop!`,
      urgency: 'Allocations often sell out quickly, so it is best not to wait:',
      button: 'Buy now →',
      closing: 'Have a great time at Europa-Park!',
      reason: 'You are receiving this email because you signed up at resortpass-europapark.ch.',
      unsubscribe: 'Unsubscribe',
      community: 'Have a tip? Share it with the community.',
      communityButton: 'Share a community tip',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Hello!\n\nGood news: the Europa-Park ResortPass ${pass} is back in stock in the ticket shop!\n\nAllocations often sell out quickly, so it is best not to wait:\n${shopUrl}\n\nHave a great time at Europa-Park!${communityUrl ? `\n\nHave a tip? Share it with the community:\n${communityUrl}` : ''}\n\n---\nUnsubscribe: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Unsubscription confirmed',
      subject: 'Unsubscription confirmed — ResortPass Tracker',
      heading: 'You have been successfully unsubscribed.',
      message: 'Your data has been completely deleted. You will not receive any more emails from us.',
      resubscribe: 'If you would like to subscribe again:',
      text: (siteUrl) => `You have been successfully unsubscribed from ResortPass Tracker.\n\nYour data has been deleted. You will not receive any more emails.\n\nIf you would like to subscribe again: ${siteUrl}`,
    },
  },
};

function loadTemplate(name: string): string {
  return readFileSync(join(import.meta.dir, '..', 'emails', `${name}.html`), 'utf-8')
    .replace('<html lang="{{LANG}}">', '<html lang="{{LANG}}" dir="{{DIR}}">');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function replacePlaceholders(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, escapeHtml(value));
  }
  return result;
}

function emailContext(value: unknown) {
  const requestedLanguage = normalizeLanguage(value);
  const localizedCopy = emailCopy[requestedLanguage];
  const contentLanguage = localizedCopy ? requestedLanguage : fallbackLanguage;
  return {
    requestedLanguage,
    contentLanguage,
    copy: localizedCopy || emailCopy.en,
  };
}

export function localizedSiteUrl(lang: string = defaultLanguage, route = ''): string {
  const base = SITE_URL.replace(/\/+$/, '');
  const normalizedLanguage = normalizeLanguage(lang);
  const routeLanguage = localizedUiLanguages.has(normalizedLanguage)
    ? normalizedLanguage
    : fallbackLanguage;
  const locale = routeLanguage === defaultLanguage ? '' : `/${routeLanguage}`;
  const path = route.replace(/^\/+|\/+$/g, '');
  return `${base}${locale}/${path}`;
}

function linkSection(message: string, button: string, url?: string): string {
  if (!url) return '';
  return `<p style="color: #94A3B8; font-size: 14px; line-height: 1.5; margin: 20px 0 0; text-align: center;">${escapeHtml(message)}<br /><a href="${escapeHtml(url)}" style="color: #3B82F6; text-decoration: none;">${escapeHtml(button)}</a></p>`;
}

export function renderConfirmationEmail(
  confirmToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const confirmUrl = `${localizedSiteUrl(requestedLanguage, 'confirm')}?token=${encodeURIComponent(confirmToken)}`;
  const template = loadTemplate('confirm').replaceAll(
    '{{COMMUNITY_SECTION}}',
    linkSection(copy.confirm.community, copy.confirm.communityButton, communityUrl),
  );
  const html = replacePlaceholders(template, {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.confirm.title,
    GREETING: copy.confirm.greeting,
    MESSAGE: copy.confirm.message,
    BUTTON: copy.confirm.button,
    IGNORE: copy.confirm.ignore,
    FOOTER: copy.footer,
    CONFIRM_URL: confirmUrl,
    SITE_URL: localizedSiteUrl(requestedLanguage),
  });

  return { subject: copy.confirm.subject, html, text: copy.confirm.text(confirmUrl, communityUrl) };
}

export function renderAlertEmail(
  passType: 'silver' | 'gold',
  unsubscribeToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const passLabel = passType === 'silver' ? 'Silver' : 'Gold';
  const shopUrl = 'https://tickets.mackinternational.de/de/resortpass/uebersicht';
  const unsubscribeUrl = `${localizedSiteUrl(requestedLanguage, 'unsubscribe')}?token=${encodeURIComponent(unsubscribeToken)}`;
  const template = loadTemplate('alert').replaceAll(
    '{{COMMUNITY_SECTION}}',
    linkSection(copy.alert.community, copy.alert.communityButton, communityUrl),
  );
  const html = replacePlaceholders(template, {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.alert.title,
    GREETING: copy.alert.greeting,
    HEADLINE: copy.alert.headline(passLabel),
    URGENCY: copy.alert.urgency,
    BUTTON: copy.alert.button,
    CLOSING: copy.alert.closing,
    REASON: copy.alert.reason,
    UNSUBSCRIBE: copy.alert.unsubscribe,
    SHOP_URL: shopUrl,
    UNSUBSCRIBE_URL: unsubscribeUrl,
    SITE_URL: localizedSiteUrl(requestedLanguage),
  });

  return {
    subject: copy.alert.subject(passLabel),
    html,
    text: copy.alert.text(passLabel, shopUrl, unsubscribeUrl, communityUrl),
  };
}

export function renderUnsubscribeEmail(lang: string = defaultLanguage): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const siteUrl = localizedSiteUrl(requestedLanguage);
  const html = replacePlaceholders(loadTemplate('unsubscribe'), {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.unsubscribe.title,
    HEADING: copy.unsubscribe.heading,
    MESSAGE: copy.unsubscribe.message,
    RESUBSCRIBE: copy.unsubscribe.resubscribe,
    FOOTER: copy.footer,
    SITE_URL: siteUrl,
  });

  return { subject: copy.unsubscribe.subject, html, text: copy.unsubscribe.text(siteUrl) };
}

export async function sendConfirmationEmail(
  email: string,
  confirmToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderConfirmationEmail(confirmToken, lang, communityUrl),
  });
}

export async function sendAlertEmail(
  email: string,
  passType: 'silver' | 'gold',
  unsubscribeToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderAlertEmail(passType, unsubscribeToken, lang, communityUrl),
  });
}

export async function sendUnsubscribeConfirmation(email: string, lang: string = defaultLanguage) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderUnsubscribeEmail(lang),
  });
}
