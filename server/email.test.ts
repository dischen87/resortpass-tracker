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
} as const;

describe('localized email rendering', () => {
  it('renders confirmation and unsubscribe emails in every supported language', () => {
    for (const lang of supportedLanguages) {
      const confirm = renderConfirmationEmail('confirm token', lang);
      const unsubscribe = renderUnsubscribeEmail(lang);
      const contentLanguage = lang in nativeGreetings ? lang as keyof typeof nativeGreetings : 'en';
      const prefix = contentLanguage === 'de' ? '' : `/${contentLanguage}`;

      expect(confirm.html).toContain(`<html lang="${contentLanguage}" dir="ltr">`);
      expect(confirm.html).toContain(nativeGreetings[contentLanguage]);
      expect(confirm.html).toContain(`${prefix}/confirm?token=confirm%20token`);
      expect(confirm.text).toContain(nativeGreetings[contentLanguage]);
      expect(unsubscribe.html).toContain(`<html lang="${contentLanguage}" dir="ltr">`);
      expect(unsubscribe.html).toContain(`${prefix}/`);
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
      const contentLanguage = lang in nativeGreetings ? lang as keyof typeof nativeGreetings : 'en';
      const prefix = contentLanguage === 'de' ? '' : `/${contentLanguage}`;

      expect(alert.html).toContain(`<html lang="${contentLanguage}" dir="ltr">`);
      expect(alert.html).toContain(nativeGreetings[contentLanguage]);
      expect(alert.html).toContain(`${prefix}/unsubscribe?token=unsubscribe%20token`);
      expect(alert.subject).toContain('Silver');
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
    expect(new URL(localizedSiteUrl('de', 'confirm')).pathname).toBe('/confirm');
    expect(new URL(localizedSiteUrl('fr', 'confirm')).pathname).toBe('/fr/confirm');
    expect(new URL(localizedSiteUrl('it')).pathname).toBe('/it/');
    expect(new URL(localizedSiteUrl('en', '/unsubscribe/')).pathname).toBe('/en/unsubscribe');
    expect(new URL(localizedSiteUrl('nl', 'confirm')).pathname).toBe('/en/confirm');
    expect(new URL(localizedSiteUrl('pt-BR', 'confirm')).pathname).toBe('/en/confirm');
    expect(new URL(localizedSiteUrl('unsupported', 'confirm')).pathname).toBe('/en/confirm');
  });

  it('uses a non-German correction email for every non-German subscriber locale', () => {
    for (const lang of supportedLanguages.filter((value) => value !== 'de')) {
      const incident = renderIncidentEmail(lang, 'unsubscribe token');
      const prefix = ['fr', 'it', 'en'].includes(lang) ? `/${lang}` : '/en';
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
