import type { LocaleCode } from '../i18n/locales';
import type { PlanningLocalePack } from './planning-types';
import { csPlanning } from './locales/cs';
import { daPlanning } from './locales/da';
import { dePlanning } from './locales/de';
import { elPlanning } from './locales/el';
import { enPlanning } from './locales/en';
import { esPlanning } from './locales/es';
import { frPlanning } from './locales/fr';
import { hePlanning } from './locales/he';
import { huPlanning } from './locales/hu';
import { itPlanning } from './locales/it';
import { nbPlanning } from './locales/nb';
import { nlPlanning } from './locales/nl';
import { plPlanning } from './locales/pl';
import { ptPlanning } from './locales/pt';
import { roPlanning } from './locales/ro';
import { svPlanning } from './locales/sv';
import { trPlanning } from './locales/tr';

/**
 * A locale enters this registry only once every page and tool string is
 * translated. Dynamic guide routes are generated from this exact set, so an
 * incomplete locale cannot accidentally become indexable.
 */
export const planningPacks: Record<LocaleCode, PlanningLocalePack> = {
  de: dePlanning,
  fr: frPlanning,
  it: itPlanning,
  en: enPlanning,
  nl: nlPlanning,
  es: esPlanning,
  sv: svPlanning,
  ro: roPlanning,
  cs: csPlanning,
  pl: plPlanning,
  tr: trPlanning,
  da: daPlanning,
  el: elPlanning,
  pt: ptPlanning,
  nb: nbPlanning,
  he: hePlanning,
  hu: huPlanning,
};

export function hasPlanningPack(locale: LocaleCode): boolean {
  return locale in planningPacks;
}

export function getPlanningPack(locale: LocaleCode): PlanningLocalePack {
  return planningPacks[locale];
}
