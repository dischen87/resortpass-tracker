import { describe, expect, test } from 'bun:test';
import { allowedHosts, isSameOriginRequest } from './same-origin';

const SITE = 'https://www.resortpass-europapark.ch';

function headers(entries: Record<string, string>) {
  return new Headers(entries);
}

describe('provider-data origin gate', () => {
  test('lets our own pages through via Sec-Fetch-Site', () => {
    expect(isSameOriginRequest(headers({ 'sec-fetch-site': 'same-origin' }), SITE)).toBe(true);
    expect(isSameOriginRequest(headers({ 'sec-fetch-site': 'same-site' }), SITE)).toBe(true);
  });

  test('lets direct navigation through — that is our own page loading', () => {
    expect(isSameOriginRequest(headers({ 'sec-fetch-site': 'none' }), SITE)).toBe(true);
  });

  test('blocks a cross-site browser request even if it claims our Referer', () => {
    const blocked = headers({
      'sec-fetch-site': 'cross-site',
      referer: `${SITE}/wartezeiten/`,
    });
    // Sec-Fetch-Site is set by the browser and cannot be forged by page script,
    // so it wins over the forgeable Referer.
    expect(isSameOriginRequest(blocked, SITE)).toBe(false);
  });

  test('blocks a bare API client that sends no relationship headers', () => {
    expect(isSameOriginRequest(headers({}), SITE)).toBe(false);
    expect(isSameOriginRequest(headers({ 'user-agent': 'curl/8.7.1' }), SITE)).toBe(false);
  });

  test('falls back to Origin/Referer for browsers without Sec-Fetch-*', () => {
    expect(isSameOriginRequest(headers({ origin: SITE }), SITE)).toBe(true);
    expect(isSameOriginRequest(headers({ referer: `${SITE}/besucherprognose/` }), SITE)).toBe(true);
    expect(isSameOriginRequest(headers({ origin: 'https://scraper.example' }), SITE)).toBe(false);
    expect(isSameOriginRequest(headers({ referer: 'https://scraper.example/x' }), SITE)).toBe(false);
  });

  test('accepts the bare domain as well as www — the redirect happens at the edge', () => {
    expect(isSameOriginRequest(headers({ origin: 'https://resortpass-europapark.ch' }), SITE)).toBe(true);
  });

  test('accepts the dev server so local work is not broken', () => {
    expect(isSameOriginRequest(headers({ origin: 'http://localhost:4321' }), SITE)).toBe(true);
  });

  test('allowed hosts always contain both www and bare form', () => {
    const hosts = allowedHosts(SITE);
    expect(hosts.has('www.resortpass-europapark.ch')).toBe(true);
    expect(hosts.has('resortpass-europapark.ch')).toBe(true);
  });

  test('a garbage Origin does not throw', () => {
    expect(isSameOriginRequest(headers({ origin: 'null' }), SITE)).toBe(false);
    expect(isSameOriginRequest(headers({ referer: 'not a url' }), SITE)).toBe(false);
  });
});
