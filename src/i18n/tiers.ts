import type { LocaleCode } from './locales';

/**
 * Languages that get every new route and are kept editorially current.
 *
 * These are exactly the five languages Europa-Park runs its own website in,
 * which is the most defensible demand proxy available to this project. New
 * feature routes ship here first; the remaining locales keep the core four
 * routes (home, wait times, crowd forecast, guide hub) plus the existing
 * guides. The long tail stays published — it is free once the build is
 * automated — it just must never carry an unchecked claim.
 */
export const primaryLocales = ['de', 'en', 'fr', 'nl', 'it'] as const satisfies readonly LocaleCode[];

export type PrimaryLocale = (typeof primaryLocales)[number];

const primarySet: ReadonlySet<string> = new Set<string>(primaryLocales);

export function isPrimaryLocale(locale: LocaleCode): locale is PrimaryLocale {
  return primarySet.has(locale);
}
