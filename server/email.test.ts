import { describe, expect, it } from 'bun:test';
import { languages as frontendLanguages, t } from '../src/i18n/translations';
import {
  localizedSiteUrl,
  renderAlertEmail,
  renderConfirmationEmail,
  renderUnsubscribeEmail,
} from './email';
import { renderIncidentEmail } from './send-incident-mail';
import { supportedLanguages } from './locales';

const nativeGreetings = {
  de: 'Hallo!',
  fr: 'Bonjour !',
  it: 'Ciao!',
  en: 'Hello!',
  nl: 'Hallo!',
  es: '¡Hola!',
  sv: 'Hej!',
  ro: 'Bună!',
  cs: 'Dobrý den!',
  pl: 'Cześć!',
  tr: 'Merhaba!',
  da: 'Hej!',
  el: 'Γεια σας!',
  pt: 'Olá!',
  nb: 'Hei!',
  he: 'שלום!',
  hu: 'Szia!',
} as const satisfies Record<(typeof supportedLanguages)[number], string>;

describe('localized email rendering', () => {
  it('renders confirmation and unsubscribe emails in every supported language', () => {
    for (const lang of supportedLanguages) {
      const confirm = renderConfirmationEmail('confirm token', lang);
      const unsubscribe = renderUnsubscribeEmail(lang);
      const prefix = lang === 'de' ? '' : `/${lang}`;
      const direction = lang === 'he' ? 'rtl' : 'ltr';

      expect(confirm.html).toContain(`<html lang="${lang}" dir="${direction}">`);
      expect(confirm.html).toContain(nativeGreetings[lang]);
      expect(confirm.html).toContain(`${prefix}/confirm?token=confirm%20token`);
      expect(confirm.text).toContain(nativeGreetings[lang]);
      expect(unsubscribe.html).toContain(`<html lang="${lang}" dir="${direction}">`);
      expect(unsubscribe.html).toContain(`${prefix}/`);
      expect(confirm.html).toContain('src="https://www.resortpass-europapark.ch/favicon.svg"');
      expect(unsubscribe.html).toContain('src="https://www.resortpass-europapark.ch/favicon.svg"');
      if (lang !== 'de') expect(`${confirm.html}${unsubscribe.html}`).not.toContain(`${prefix}/favicon.svg`);
      expect(`${confirm.html}${unsubscribe.html}`).not.toContain('{{');
      expect(confirm.html).not.toContain('https://community.example/confirm-tip');
      if (lang !== 'de') {
        expect(confirm.text).not.toContain('Bitte bestätige deine Anmeldung');
        expect(unsubscribe.text).not.toContain('Du wurdest erfolgreich');
      }
    }

    const confirm = renderConfirmationEmail('token', 'it', 'https://community.example/confirm-tip');
    expect(confirm.html).toContain('https://community.example/confirm-tip');
    expect(confirm.text).toContain('https://community.example/confirm-tip');
    expect(confirm.html).toContain('Condividi un consiglio');
  });

  it('renders localized alerts and includes a community link only when provided', () => {
    for (const lang of supportedLanguages) {
      const alert = renderAlertEmail('silver', 'unsubscribe token', lang);
      const prefix = lang === 'de' ? '' : `/${lang}`;
      const direction = lang === 'he' ? 'rtl' : 'ltr';

      expect(alert.html).toContain(`<html lang="${lang}" dir="${direction}">`);
      expect(alert.html).toContain(nativeGreetings[lang]);
      expect(alert.html).toContain(`${prefix}/unsubscribe?token=unsubscribe%20token`);
      expect(alert.subject).toContain('Silver');
      expect(alert.html).toContain('src="https://www.resortpass-europapark.ch/favicon.svg"');
      if (lang !== 'de') expect(alert.html).not.toContain(`${prefix}/favicon.svg`);
      expect(alert.html).not.toContain('{{');
      expect(alert.html).not.toContain('https://community.example/tip');
      if (lang !== 'de') expect(alert.text).not.toContain('Gute Nachrichten');
    }

    const alert = renderAlertEmail('gold', 'token', 'fr', 'https://community.example/tip');
    expect(alert.html).toContain('https://community.example/tip');
    expect(alert.text).toContain('https://community.example/tip');
    expect(alert.html).toContain('Partager une astuce');
  });

  it('builds locale-aware site routes', () => {
    for (const lang of supportedLanguages) {
      const prefix = lang === 'de' ? '' : `/${lang}`;
      expect(new URL(localizedSiteUrl(lang, 'confirm')).pathname).toBe(`${prefix}/confirm`);
      expect(new URL(localizedSiteUrl(lang, 'unsubscribe')).pathname).toBe(`${prefix}/unsubscribe`);
    }

    expect(new URL(localizedSiteUrl('it')).pathname).toBe('/it/');
    expect(new URL(localizedSiteUrl('en', '/unsubscribe/')).pathname).toBe('/en/unsubscribe');
    expect(new URL(localizedSiteUrl('nl', 'confirm')).pathname).toBe('/nl/confirm');
    expect(new URL(localizedSiteUrl('pt-BR', 'confirm')).pathname).toBe('/pt/confirm');
    expect(new URL(localizedSiteUrl('iw-IL', 'confirm')).pathname).toBe('/he/confirm');
    expect(new URL(localizedSiteUrl('unsupported', 'confirm')).pathname).toBe('/en/confirm');
  });

  it('uses the normalized language copy and an English fallback for unsupported values', () => {
    const portuguese = renderConfirmationEmail('token', 'pt-BR');
    expect(portuguese.html).toContain('<html lang="pt" dir="ltr">');
    expect(portuguese.html).toContain(nativeGreetings.pt);
    expect(portuguese.html).toContain('/pt/confirm?token=token');

    const hebrew = renderAlertEmail('gold', 'token', 'iw-IL');
    expect(hebrew.html).toContain('<html lang="he" dir="rtl">');
    expect(hebrew.html).toContain(nativeGreetings.he);
    expect(hebrew.html).toContain('/he/unsubscribe?token=token');
    expect(hebrew.text).toContain('ה־ResortPass Gold');

    const unsupported = renderConfirmationEmail('token', 'unsupported');
    expect(unsupported.html).toContain('<html lang="en" dir="ltr">');
    expect(unsupported.html).toContain(nativeGreetings.en);
    expect(unsupported.html).toContain('/en/confirm?token=token');

    const defaulted = renderConfirmationEmail('token');
    expect(defaulted.html).toContain('<html lang="de" dir="ltr">');
    expect(defaulted.html).toContain(nativeGreetings.de);
    expect(defaulted.html).toContain('/confirm?token=token');
  });

  it('uses a non-German correction email for every non-German subscriber locale', () => {
    for (const lang of supportedLanguages.filter((value) => value !== 'de')) {
      const incident = renderIncidentEmail(lang, 'unsubscribe token');
      const prefix = `/${lang}`;
      expect(incident.html).toContain('<html lang="en" dir="ltr">');
      expect(incident.html).toContain(`${prefix}/unsubscribe?token=unsubscribe%20token`);
      expect(incident.text).not.toContain('Fehlalarm');
      expect(incident.text).toContain('false alarm');
    }
  });
});

describe('legal translations', () => {
  it('has complete, locale-specific legal copy', () => {
    const legalKeys = Object.keys(t.de).filter((key) => key.startsWith('imprint.'));

    for (const lang of frontendLanguages) {
      for (const key of legalKeys) expect(t[lang][key]).toBeTruthy();
      expect(t[lang]['imprint.data_purpose_text']).toContain('Brevo');
      expect(t[lang]['imprint.hosting_text']).toContain('Hetzner');
      if (lang !== 'de') expect(t[lang]['imprint.tracking_text']).not.toBe(t.de['imprint.tracking_text']);
    }
  });
});
