import { getLocaleDefinition, type LocaleCode } from '../i18n/locales';
import { getTranslation } from '../i18n/translations';
import { getBuildTimeStatus, type StatusSnapshot } from './status-snapshot';

/**
 * The single, dated answer to "is the ResortPass on sale right now?".
 *
 * The FAQ copy hard-codes "Nein." — correct today, and permanently frozen into
 * the markup. On the one day it stops being true, every answer engine working
 * from a cached crawl would still be saying no while the pills say yes. Making
 * the answer follow the snapshot removes that trap, and stamping the check time
 * onto it is what lets a quote of this sentence stay honest later.
 *
 * Both call sites — the visible card and the FAQPage markup — read from here so
 * they cannot drift apart.
 */
export async function getAvailabilityAnswer(locale: LocaleCode): Promise<string> {
  const snapshot = await getBuildTimeStatus();
  return formatAvailabilityAnswer(snapshot, locale);
}

export function formatAvailabilityAnswer(
  snapshot: StatusSnapshot,
  locale: LocaleCode,
): string {
  const tr = (key: string) => getTranslation(locale, key);
  const localeTag = getLocaleDefinition(locale).bcp47;
  const checked = new Date(snapshot.capturedAt);
  const stamp = Number.isNaN(checked.getTime())
    ? null
    : checked.toLocaleString(localeTag, { dateStyle: 'medium', timeStyle: 'short' });

  const anyAvailable = snapshot.silver.state === 'available' || snapshot.gold.state === 'available';
  const bothUnknown = snapshot.silver.state === 'unknown' && snapshot.gold.state === 'unknown';

  let body: string;
  if (anyAvailable) {
    const parts = [
      snapshot.silver.state === 'available' ? `ResortPass Silver: ${tr('status.available')}` : null,
      snapshot.gold.state === 'available' ? `ResortPass Gold: ${tr('status.available')}` : null,
    ].filter(Boolean);
    body = `${parts.join(' · ')} — ${tr('status.to_shop')}.`;
  } else if (bothUnknown) {
    body = tr('status.error');
  } else {
    body = tr('info.why_text');
  }

  return stamp ? `${body} (${tr('status.last_check')}: ${stamp})` : body;
}
