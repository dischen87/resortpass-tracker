import { describe, expect, it } from 'bun:test';
import { languages, t, type Lang } from '../src/i18n/translations';
import {
  localizedSiteUrl,
  renderAlertEmail,
  renderConfirmationEmail,
  renderUnsubscribeEmail,
} from './email';

const greetings: Record<Lang, string> = {
  de: 'Hallo!',
  fr: 'Bonjour !',
  it: 'Ciao!',
  en: 'Hello!',
};

describe('localized email rendering', () => {
  it('renders confirmation and unsubscribe emails in every supported language', () => {
    for (const lang of languages) {
      const confirm = renderConfirmationEmail('confirm token', lang);
      const unsubscribe = renderUnsubscribeEmail(lang);
      const prefix = lang === 'de' ? '' : `/${lang}`;

      expect(confirm.html).toContain(`<html lang="${lang}">`);
      expect(confirm.html).toContain(greetings[lang]);
      expect(confirm.html).toContain(`${prefix}/confirm?token=confirm%20token`);
      expect(confirm.text).toContain(greetings[lang]);
      expect(unsubscribe.html).toContain(`<html lang="${lang}">`);
      expect(unsubscribe.html).toContain(`${prefix}/`);
      expect(`${confirm.html}${unsubscribe.html}`).not.toContain('{{');
      expect(confirm.html).not.toContain('https://community.example/confirm-tip');
    }

    const confirm = renderConfirmationEmail('token', 'it', 'https://community.example/confirm-tip');
    expect(confirm.html).toContain('https://community.example/confirm-tip');
    expect(confirm.text).toContain('https://community.example/confirm-tip');
    expect(confirm.html).toContain('Condividi un consiglio');
  });

  it('renders localized alerts and includes a community link only when provided', () => {
    for (const lang of languages) {
      const alert = renderAlertEmail('silver', 'unsubscribe token', lang);
      const prefix = lang === 'de' ? '' : `/${lang}`;

      expect(alert.html).toContain(`<html lang="${lang}">`);
      expect(alert.html).toContain(greetings[lang]);
      expect(alert.html).toContain(`${prefix}/unsubscribe?token=unsubscribe%20token`);
      expect(alert.subject).toContain('Silver');
      expect(alert.html).not.toContain('{{');
      expect(alert.html).not.toContain('https://community.example/tip');
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
  });
});

describe('legal translations', () => {
  it('has complete, locale-specific legal copy', () => {
    const legalKeys = Object.keys(t.de).filter((key) => key.startsWith('imprint.'));

    for (const lang of languages) {
      for (const key of legalKeys) expect(t[lang][key]).toBeTruthy();
      expect(t[lang]['imprint.data_purpose_text']).toContain('Brevo');
      expect(t[lang]['imprint.hosting_text']).toContain('Hetzner');
      if (lang !== 'de') expect(t[lang]['imprint.tracking_text']).not.toBe(t.de['imprint.tracking_text']);
    }
  });
});
