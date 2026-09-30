import { getLocaleDefinition, type LocaleCode } from '../i18n/locales';
import { getStatusContextCopy } from '../i18n/status-copy';
import { getTranslation } from '../i18n/translations';
import { formatStatusAnswer, type StatusCopy, type StatusSnapshot } from './status-format';
import { getBuildTimeStatus } from './status-snapshot';

/** Serialize just one locale's copy; the browser imports the pure formatter. */
export function getStatusCopy(locale: LocaleCode): StatusCopy {
  return {
    ...getStatusContextCopy(locale),
    available: getTranslation(locale, 'status.available'),
    soldOut: getTranslation(locale, 'status.sold_out'),
    unknown: getTranslation(locale, 'status.unknown_short'),
    error: getTranslation(locale, 'status.error'),
    lastCheck: getTranslation(locale, 'status.last_check'),
    refreshInterval: getTranslation(locale, 'status.updated_3x'),
  };
}

export async function getAvailabilityAnswer(locale: LocaleCode): Promise<string> {
  return formatAvailabilityAnswer(await getBuildTimeStatus(), locale);
}

export function formatAvailabilityAnswer(snapshot: StatusSnapshot, locale: LocaleCode): string {
  return formatStatusAnswer(snapshot, getStatusCopy(locale), getLocaleDefinition(locale).bcp47);
}
