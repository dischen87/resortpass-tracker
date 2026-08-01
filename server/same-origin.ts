/**
 * Gate for endpoints that serve ParkQueueTimes-licensed data.
 *
 * The provider's terms forbid redistributing raw API data and running derived
 * data services. `/api/wait-times` and `/api/crowd-calendar` used to answer any
 * anonymous request with the full normalized payload, which is redistribution
 * in everything but name. `X-Robots-Tag` and `Cross-Origin-Resource-Policy`
 * were already set, but neither stops a plain HTTP client — CORP only governs
 * how a browser may embed a response.
 *
 * This is deliberately not a security boundary: headers can be forged. It is a
 * licence-compliance measure that stops the endpoints from being a convenient
 * public feed, while leaving our own pages working.
 */

export interface SameOriginRequestHeaders {
  get(name: string): string | null | undefined;
}

function hostOf(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Hosts our own pages are served from. `www` and the bare domain both appear
 * because the redirect happens at the edge and a same-origin fetch issued
 * before it can still carry the bare host.
 */
export function allowedHosts(siteUrl: string): Set<string> {
  const hosts = new Set<string>();
  const primary = hostOf(siteUrl);
  if (primary) {
    hosts.add(primary);
    hosts.add(primary.startsWith('www.') ? primary.slice(4) : `www.${primary}`);
  }
  // astro dev, astro preview and the container's own health probes.
  for (const dev of ['localhost:4321', '127.0.0.1:4321', 'localhost:3000', '127.0.0.1:3000']) {
    hosts.add(dev);
  }
  return hosts;
}

export function isSameOriginRequest(
  headers: SameOriginRequestHeaders,
  siteUrl: string,
): boolean {
  // Modern browsers label the relationship themselves and cannot be talked out
  // of it by page script, so this is the most reliable signal we get.
  const fetchSite = headers.get('sec-fetch-site');
  if (fetchSite) {
    return fetchSite === 'same-origin' || fetchSite === 'same-site' || fetchSite === 'none';
  }

  // Older browsers omit Sec-Fetch-*. Fall back to where the request claims to
  // come from; a same-origin fetch always carries at least a Referer.
  const hosts = allowedHosts(siteUrl);
  const origin = hostOf(headers.get('origin'));
  if (origin) return hosts.has(origin);
  const referer = hostOf(headers.get('referer'));
  if (referer) return hosts.has(referer);

  // No relationship claimed at all — a bare API client.
  return false;
}
