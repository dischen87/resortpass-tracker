import { describe, expect, test } from 'bun:test';
import {
  checkDetailPage,
  checkOverviewPage,
  isRealShopPage,
  isTrustedShopUrl,
  resolveConfirmation,
  toAvailabilityValue,
} from './checker';

const realPage = (content: string) =>
  `<html><body>mackinternational ${content} ${'x'.repeat(5_000)}</body></html>`;

const productCard = (type: 'silver' | 'gold', status = '') => `
  <article class="b-teaser-card is-teaser-type-product">
    <span>${status}</span>
    <a href="/de/ticket/resortpass-${type}">ResortPass ${type}</a>
  </article>`;

describe('shop-page parsing', () => {
  test('rejects bot gates, short pages, and pages without the shop marker', () => {
    expect(isRealShopPage(realPage('document.location.href = "/queue"'))).toBe(false);
    expect(isRealShopPage('mackinternational')).toBe(false);
    expect(isRealShopPage(`<html>${'x'.repeat(5_100)}</html>`)).toBe(false);
  });

  test('accepts Queue-it scripts embedded in a real shop page but rejects a Queue-it redirect', () => {
    const embeddedScript = '<script src="//static.queue-it.net/script/queueclient.min.js"></script>';
    expect(isRealShopPage(realPage(embeddedScript))).toBe(true);
    expect(
      checkDetailPage(
        'silver',
        realPage(`${embeddedScript} Leider ist dieses Produkt derzeit nicht verfügbar`),
      ),
    ).toBe('sold_out');
    expect(
      checkOverviewPage(
        'gold',
        realPage(`${embeddedScript} ${productCard('gold', 'Derzeit nicht verfügbar')}`),
      ),
    ).toBe('sold_out');
    expect(isTrustedShopUrl('https://tickets.mackinternational.de/de/resortpass/uebersicht')).toBe(true);
    expect(isTrustedShopUrl('https://europapark.queue-it.net/?c=europapark')).toBe(false);
  });

  test('distinguishes real sold-out and available detail pages', () => {
    expect(
      checkDetailPage('silver', realPage('Leider ist dieses Produkt derzeit nicht verfügbar')),
    ).toBe('sold_out');
    expect(checkDetailPage('gold', realPage('&quot;addToBasketUrl&quot;: "/de/basket/add"'))).toBe(
      'available',
    );
    expect(checkDetailPage('gold', realPage('Unbekanntes neues Shop-Template'))).toBe('unknown');
    expect(checkDetailPage('gold', realPage('document.location.href = "/gate"'))).toBe('unknown');
  });

  test('reads the matching pass region on the overview page', () => {
    const page = realPage(`
      <nav><a href="/de/ticket/resortpass-silver">Silver</a></nav>
      ${productCard('silver', 'Derzeit nicht verfügbar')}
      ${productCard('gold')}
    `);
    expect(checkOverviewPage('silver', page)).toBe('sold_out');
    expect(checkOverviewPage('gold', page)).toBe('available');
    expect(checkOverviewPage('gold', realPage('Gold Kaufen'))).toBe('unknown');
  });
});

describe('confirmation decisions', () => {
  test('keeps unknown unknown instead of turning it into sold out', () => {
    expect(resolveConfirmation('unknown')).toBe('unknown');
    expect(resolveConfirmation('available', 'unknown')).toBe('unknown');
    expect(toAvailabilityValue('unknown')).toBeNull();
  });

  test('keeps real sold-out results and requires two available checks', () => {
    expect(resolveConfirmation('sold_out')).toBe('sold_out');
    expect(resolveConfirmation('available', 'sold_out')).toBe('sold_out');
    expect(resolveConfirmation('available', 'available')).toBe('available');
    expect(toAvailabilityValue('sold_out')).toBe(false);
    expect(toAvailabilityValue('available')).toBe(true);
  });
});
