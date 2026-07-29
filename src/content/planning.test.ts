import { describe, expect, test } from 'bun:test';

import { localeCodes, type LocaleCode } from '../i18n/locales';
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
import type {
  PlanningLocalePack,
  PlanningPageKey,
} from './planning-types';

const EXPECTED_LOCALES = [
  'de',
  'fr',
  'it',
  'en',
  'nl',
  'es',
  'sv',
  'ro',
  'cs',
  'pl',
  'tr',
  'da',
  'el',
  'pt',
  'nb',
  'he',
  'hu',
] as const satisfies readonly LocaleCode[];

const PAGE_KEYS = [
  'parkGuide',
  'visitPlanner',
  'costCalculator',
  'familyGuide',
  'rulanticaGuide',
  'stayGuide',
  'restaurantGuide',
  'resortPassGuide',
  'resortPassCompare',
  'resortPassPrices',
  'resortPassReservation',
  'resortPassRulantica',
] as const satisfies readonly PlanningPageKey[];

const TOOL_KEYS = [
  'visitPlanner',
  'costCalculator',
  'familyFinder',
  'rulanticaPlanner',
  'stayComparator',
  'restaurantFinder',
  'resortPassTool',
] as const satisfies readonly (keyof PlanningLocalePack)[];

const planningByLocale = {
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
} satisfies Record<LocaleCode, PlanningLocalePack>;

type PathPart = string | number;

interface Leaf {
  path: PathPart[];
  value: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function formatPath(path: readonly PathPart[]): string {
  return path.reduce<string>(
    (result, part) =>
      typeof part === 'number' ? `${result}[${part}]` : `${result}.${part}`,
    '',
  );
}

function collectLeaves(value: unknown, path: PathPart[] = []): Leaf[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectLeaves(item, [...path, index]),
    );
  }

  if (isRecord(value)) {
    return Object.entries(value).flatMap(([key, item]) =>
      collectLeaves(item, [...path, key]),
    );
  }

  return [{ path, value }];
}

function readPath(value: unknown, path: readonly PathPart[]): unknown {
  let current = value;

  for (const part of path) {
    if (typeof part === 'number') {
      if (!Array.isArray(current)) return undefined;
      current = current[part];
      continue;
    }

    if (!isRecord(current)) return undefined;
    current = current[part];
  }

  return current;
}

function valueKind(value: unknown): string {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function collectShapeIssues(
  reference: unknown,
  candidate: unknown,
  path: PathPart[] = [],
): string[] {
  const label = formatPath(path) || '<root>';

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      return [`${label}: expected array, received ${valueKind(candidate)}`];
    }

    const issues =
      reference.length === candidate.length
        ? []
        : [`${label}: expected ${reference.length} items, received ${candidate.length}`];
    const sharedLength = Math.min(reference.length, candidate.length);

    for (let index = 0; index < sharedLength; index += 1) {
      issues.push(
        ...collectShapeIssues(
          reference[index],
          candidate[index],
          [...path, index],
        ),
      );
    }

    return issues;
  }

  if (isRecord(reference)) {
    if (!isRecord(candidate)) {
      return [`${label}: expected object, received ${valueKind(candidate)}`];
    }

    const issues: string[] = [];
    const referenceKeys = Object.keys(reference).sort();
    const candidateKeys = Object.keys(candidate).sort();
    const missing = referenceKeys.filter((key) => !(key in candidate));
    const extra = candidateKeys.filter((key) => !(key in reference));

    if (missing.length > 0) {
      issues.push(`${label}: missing keys ${missing.join(', ')}`);
    }
    if (extra.length > 0) {
      issues.push(`${label}: unexpected keys ${extra.join(', ')}`);
    }

    for (const key of referenceKeys) {
      if (key in candidate) {
        issues.push(
          ...collectShapeIssues(
            reference[key],
            candidate[key],
            [...path, key],
          ),
        );
      }
    }

    return issues;
  }

  return typeof reference === typeof candidate
    ? []
    : [`${label}: expected ${typeof reference}, received ${typeof candidate}`];
}

function normaliseText(value: string): string {
  return value.replace(/\s+/gu, ' ').trim();
}

function normalisedNumericTokens(value: string): string[] {
  // "17 Uhr", "17:00" and "17.00" describe the same whole-hour value.
  const normalisedWholeHours = value.replace(
    /(\d{1,2})[:.]00\b/gu,
    (_match, hour: string) => hour,
  );
  return normalisedWholeHours.match(/\d+/gu) ?? [];
}

function duplicateValues(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  return [...duplicates];
}

function looksLikeUrl(value: unknown): boolean {
  return typeof value === 'string' && /^https?:\/\//u.test(value);
}

function isTechnicalExactText(path: readonly PathPart[], value: string): boolean {
  if (path.at(-1) === 'icon' || looksLikeUrl(value)) return true;

  const technicalTokens = [
    'Europa-Park',
    'ResortPass',
    'Rulantica',
    'Silver',
    'Gold',
    'Moonlight',
    'VirtualLine',
    'Single Rider',
    'Riverside Western Lodge',
    'Tipi Town',
    'Europa-Park Caravaning',
    'Europa-Park Camping',
    'EUR',
  ];
  let residue = value;

  for (const token of technicalTokens) {
    residue = residue.replaceAll(token, '');
  }

  return residue.replace(/[\s+\-–—/().,:;0-9]/gu, '').length === 0;
}

describe('planning locale packs', () => {
  test('imports exactly one complete pack for every configured locale', () => {
    expect(localeCodes).toEqual([...EXPECTED_LOCALES]);
    expect(Object.keys(planningByLocale)).toEqual([...EXPECTED_LOCALES]);
    expect(new Set(Object.keys(planningByLocale)).size).toBe(17);
  });

  test('keeps the canonical schema and all 12 planning pages in every locale', () => {
    const issues: string[] = [];

    for (const code of EXPECTED_LOCALES) {
      const pack = planningByLocale[code];
      const pageKeys = Object.keys(pack.pages).sort();
      const expectedPageKeys = [...PAGE_KEYS].sort();

      if (JSON.stringify(pageKeys) !== JSON.stringify(expectedPageKeys)) {
        issues.push(
          `${code}.pages: expected ${expectedPageKeys.join(', ')}, received ${pageKeys.join(', ')}`,
        );
      }

      for (const issue of collectShapeIssues(dePlanning, pack)) {
        issues.push(`${code}${issue}`);
      }

      for (const leaf of collectLeaves(pack)) {
        if (
          typeof leaf.value === 'string' &&
          normaliseText(leaf.value).length === 0
        ) {
          issues.push(`${code}${formatPath(leaf.path)}: empty string`);
        }
      }
    }

    expect(issues).toEqual([]);
  });

  test('provides substantial, unique search copy and complete FAQs per page', () => {
    const issues: string[] = [];
    const minimumLengths = {
      title: 20,
      description: 60,
      heading: 20,
      answer: 80,
    } as const;

    for (const code of EXPECTED_LOCALES) {
      const pack = planningByLocale[code];
      const titles: string[] = [];
      const descriptions: string[] = [];

      for (const pageKey of PAGE_KEYS) {
        const page = pack.pages[pageKey];

        for (const [field, minimum] of Object.entries(minimumLengths)) {
          const value = normaliseText(
            page[field as keyof typeof minimumLengths],
          );
          if (value.length < minimum) {
            issues.push(
              `${code}.pages.${pageKey}.${field}: ${value.length} characters, expected at least ${minimum}`,
            );
          }
        }

        titles.push(normaliseText(page.title).toLocaleLowerCase());
        descriptions.push(
          normaliseText(page.description).toLocaleLowerCase(),
        );

        if (page.faqs.length !== 3) {
          issues.push(
            `${code}.pages.${pageKey}.faqs: expected 3 entries, received ${page.faqs.length}`,
          );
        }

        page.faqs.forEach((faq, index) => {
          const questionLength = normaliseText(faq.question).length;
          const answerLength = normaliseText(faq.answer).length;

          if (questionLength < 10) {
            issues.push(
              `${code}.pages.${pageKey}.faqs[${index}].question: too short (${questionLength})`,
            );
          }
          if (answerLength < 60) {
            issues.push(
              `${code}.pages.${pageKey}.faqs[${index}].answer: too short (${answerLength})`,
            );
          }
        });
      }

      const duplicateTitles = duplicateValues(titles);
      const duplicateDescriptions = duplicateValues(descriptions);
      if (duplicateTitles.length > 0) {
        issues.push(`${code}: duplicate page titles: ${duplicateTitles.join(' | ')}`);
      }
      if (duplicateDescriptions.length > 0) {
        issues.push(
          `${code}: duplicate page descriptions: ${duplicateDescriptions.join(' | ')}`,
        );
      }
    }

    expect(issues).toEqual([]);
  });

  test('fills every tool string and preserves every tool map key', () => {
    const issues: string[] = [];

    for (const code of EXPECTED_LOCALES) {
      const pack = planningByLocale[code];

      for (const toolKey of TOOL_KEYS) {
        for (const issue of collectShapeIssues(
          dePlanning[toolKey],
          pack[toolKey],
          [toolKey],
        )) {
          issues.push(`${code}${issue}`);
        }

        for (const leaf of collectLeaves(pack[toolKey], [toolKey])) {
          if (
            typeof leaf.value === 'string' &&
            normaliseText(leaf.value).length === 0
          ) {
            issues.push(`${code}${formatPath(leaf.path)}: empty string`);
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });

  test('preserves non-linguistic icons, URLs, currency and numerical facts', () => {
    const issues: string[] = [];
    const referenceLeaves = collectLeaves(dePlanning);

    for (const code of EXPECTED_LOCALES) {
      const pack = planningByLocale[code];

      for (const { path, value: referenceValue } of referenceLeaves) {
        const candidateValue = readPath(pack, path);
        const label = `${code}${formatPath(path)}`;
        const isIcon = path.at(-1) === 'icon';
        const isCurrency = formatPath(path) === '.costCalculator.currency';
        const isNumericPrimitive = typeof referenceValue === 'number';
        const isUrl =
          looksLikeUrl(referenceValue) || looksLikeUrl(candidateValue);

        if (
          (isIcon || isCurrency || isNumericPrimitive || isUrl) &&
          candidateValue !== referenceValue
        ) {
          issues.push(
            `${label}: expected non-linguistic value ${String(referenceValue)}, received ${String(candidateValue)}`,
          );
        }

        if (
          typeof referenceValue === 'string' &&
          typeof candidateValue === 'string' &&
          !isIcon &&
          !isUrl
        ) {
          const expectedNumbers = normalisedNumericTokens(referenceValue);
          const candidateNumbers = normalisedNumericTokens(candidateValue);

          if (
            JSON.stringify(expectedNumbers) !==
            JSON.stringify(candidateNumbers)
          ) {
            issues.push(
              `${label}: expected numeric values [${expectedNumbers.join(', ')}], received [${candidateNumbers.join(', ')}]`,
            );
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });

  test('keeps canonical brand spellings without spaced or mutated aliases', () => {
    const issues: string[] = [];
    const forbiddenBrandVariants = [
      /\bEuropa\s+Park\b/iu,
      /\bEuropapark\b/u,
      /\bResort\s+Pass\b/iu,
      /\bResortpass\b/u,
      /\bRulantika\b/iu,
      /\bRulántica\b/iu,
    ];

    for (const code of EXPECTED_LOCALES) {
      const pack = planningByLocale[code];

      if (pack.navigation.parkGuide !== 'Europa-Park') {
        issues.push(`${code}.navigation.parkGuide must preserve Europa-Park`);
      }
      if (pack.navigation.rulanticaGuide !== 'Rulantica') {
        issues.push(`${code}.navigation.rulanticaGuide must preserve Rulantica`);
      }
      if (pack.navigation.resortPassGuide !== 'ResortPass') {
        issues.push(`${code}.navigation.resortPassGuide must preserve ResortPass`);
      }
      if (pack.resortPassTool.silver !== 'Silver') {
        issues.push(`${code}.resortPassTool.silver must preserve Silver`);
      }
      if (pack.resortPassTool.gold !== 'Gold') {
        issues.push(`${code}.resortPassTool.gold must preserve Gold`);
      }

      for (const leaf of collectLeaves(pack)) {
        if (typeof leaf.value !== 'string') continue;

        for (const pattern of forbiddenBrandVariants) {
          if (pattern.test(leaf.value)) {
            issues.push(
              `${code}${formatPath(leaf.path)}: suspicious brand spelling "${leaf.value}"`,
            );
          }
        }
      }
    }

    expect(issues).toEqual([]);
  });

  test('does not reuse long German source copy in non-German packs', () => {
    const issues: string[] = [];
    const germanByPath = new Map(
      collectLeaves(dePlanning).map(({ path, value }) => [
        formatPath(path),
        value,
      ]),
    );

    for (const code of EXPECTED_LOCALES) {
      if (code === 'de') continue;

      for (const leaf of collectLeaves(planningByLocale[code])) {
        if (typeof leaf.value !== 'string') continue;

        const path = formatPath(leaf.path);
        const germanValue = germanByPath.get(path);
        const candidate = normaliseText(leaf.value);

        if (
          typeof germanValue === 'string' &&
          candidate.length >= 40 &&
          candidate === normaliseText(germanValue) &&
          !isTechnicalExactText(leaf.path, candidate)
        ) {
          issues.push(`${code}${path}: exact German long-form fallback`);
        }
      }
    }

    expect(issues).toEqual([]);
  });

  test('contains no translation placeholders or editing artefacts', () => {
    const issues: string[] = [];
    const artefactPattern =
      /\b(?:TODO|TBD|FIXME|PLACEHOLDER|TRANSLATE|ZXQKEEP\d*|LOREM\s+IPSUM)\b/u;

    for (const code of EXPECTED_LOCALES) {
      for (const leaf of collectLeaves(planningByLocale[code])) {
        if (typeof leaf.value !== 'string') continue;

        if (artefactPattern.test(leaf.value)) {
          issues.push(
            `${code}${formatPath(leaf.path)}: translation artefact "${leaf.value}"`,
          );
        }
        if (code !== 'es' && /[¿¡]/u.test(leaf.value)) {
          issues.push(
            `${code}${formatPath(leaf.path)}: unexpected Spanish punctuation "${leaf.value}"`,
          );
        }
      }
    }

    expect(issues).toEqual([]);
  });
});
