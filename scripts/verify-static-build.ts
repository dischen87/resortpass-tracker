import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import {
  getLocaleDefinition,
  localeCodes,
  type LocaleCode,
} from '../src/i18n/locales';
import {
  getRoutePath,
  guideRouteKeys,
  type GuideRouteKey,
} from '../src/i18n/routes';

const SITE_URL = 'https://www.resortpass-europapark.ch';
const PROJECT_ROOT = resolve(import.meta.dir, '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist');
const EXPECTED_LOCALE_COUNT = 17;
const EXPECTED_GUIDE_COUNT = 12;
const EXPECTED_PAGE_COUNT = EXPECTED_LOCALE_COUNT * EXPECTED_GUIDE_COUNT;

const TOOL_ROUTE_KEYS = new Set<GuideRouteKey>([
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
]);

const ARTIFACT_PATTERNS = [
  {
    label: 'unfinished translation marker',
    pattern:
      /\b(?:TODO|TBD|FIXME|PLACEHOLDER|TRANSLATE|ZXQKEEP\d*|LOREM\s+IPSUM)\b/u,
  },
  {
    label: 'unresolved template expression',
    pattern: /(?:\{\{[^{}]+\}\}|<%[=-]?[\s\S]*?%>)/u,
  },
] as const;

type AttributeMap = Record<string, string>;

interface ParsedTag {
  name: string;
  attributes: AttributeMap;
  start: number;
  end: number;
}

interface ExpectedPage {
  locale: LocaleCode;
  routeKey: GuideRouteKey;
  routePath: string;
  canonicalUrl: string;
  outputPath: string;
}

interface VerificationIssue {
  category: string;
  context: string;
  message: string;
}

function decodeEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: '\u00a0',
    quot: '"',
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/giu,
    (match, entity: string) => {
      const lower = entity.toLowerCase();
      if (lower.startsWith('#x')) {
        const codePoint = Number.parseInt(lower.slice(2), 16);
        return Number.isSafeInteger(codePoint) &&
          codePoint >= 0 &&
          codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : match;
      }
      if (lower.startsWith('#')) {
        const codePoint = Number.parseInt(lower.slice(1), 10);
        return Number.isSafeInteger(codePoint) &&
          codePoint >= 0 &&
          codePoint <= 0x10ffff
          ? String.fromCodePoint(codePoint)
          : match;
      }
      return namedEntities[lower] ?? match;
    },
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function findClosingTag(
  markup: string,
  tagName: string,
  from: number,
): { start: number; end: number } | undefined {
  const pattern = new RegExp(
    `<\\/\\s*${escapeRegExp(tagName)}\\s*>`,
    'giu',
  );
  pattern.lastIndex = from;
  const match = pattern.exec(markup);
  if (!match) return undefined;
  return { start: match.index, end: pattern.lastIndex };
}

function findTagEnd(markup: string, start: number): number {
  let quote: '"' | "'" | undefined;

  for (let index = start + 1; index < markup.length; index += 1) {
    const character = markup[index];

    if (quote) {
      if (character === quote) quote = undefined;
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === '>') return index + 1;
  }

  return markup.length;
}

function parseAttributes(rawTag: string, nameEnd: number): AttributeMap {
  const attributes: AttributeMap = {};
  let cursor = nameEnd;

  while (cursor < rawTag.length) {
    while (
      cursor < rawTag.length &&
      (/\s/u.test(rawTag[cursor]!) || rawTag[cursor] === '/')
    ) {
      cursor += 1;
    }
    if (cursor >= rawTag.length) break;

    const nameStart = cursor;
    while (
      cursor < rawTag.length &&
      !/[\s=/>]/u.test(rawTag[cursor]!)
    ) {
      cursor += 1;
    }
    const attributeName = rawTag.slice(nameStart, cursor).toLowerCase();
    if (!attributeName) {
      cursor += 1;
      continue;
    }

    while (cursor < rawTag.length && /\s/u.test(rawTag[cursor]!)) {
      cursor += 1;
    }

    let attributeValue = '';
    if (rawTag[cursor] === '=') {
      cursor += 1;
      while (cursor < rawTag.length && /\s/u.test(rawTag[cursor]!)) {
        cursor += 1;
      }

      const quote = rawTag[cursor];
      if (quote === '"' || quote === "'") {
        cursor += 1;
        const valueStart = cursor;
        while (cursor < rawTag.length && rawTag[cursor] !== quote) {
          cursor += 1;
        }
        attributeValue = rawTag.slice(valueStart, cursor);
        if (rawTag[cursor] === quote) cursor += 1;
      } else {
        const valueStart = cursor;
        while (
          cursor < rawTag.length &&
          !/[\s>]/u.test(rawTag[cursor]!)
        ) {
          cursor += 1;
        }
        attributeValue = rawTag.slice(valueStart, cursor);
      }
    }

    attributes[attributeName] = decodeEntities(attributeValue);
  }

  return attributes;
}

function parseStartTags(markup: string): ParsedTag[] {
  const tags: ParsedTag[] = [];
  let cursor = 0;

  while (cursor < markup.length) {
    const start = markup.indexOf('<', cursor);
    if (start === -1) break;

    if (markup.startsWith('<!--', start)) {
      const commentEnd = markup.indexOf('-->', start + 4);
      cursor = commentEnd === -1 ? markup.length : commentEnd + 3;
      continue;
    }

    const nextCharacter = markup[start + 1];
    if (
      !nextCharacter ||
      nextCharacter === '/' ||
      nextCharacter === '!' ||
      nextCharacter === '?' ||
      !/[a-z]/iu.test(nextCharacter)
    ) {
      cursor = findTagEnd(markup, start);
      continue;
    }

    const end = findTagEnd(markup, start);
    const rawTag = markup.slice(start + 1, Math.max(start + 1, end - 1));
    let nameEnd = 0;
    while (
      nameEnd < rawTag.length &&
      !/[\s/>]/u.test(rawTag[nameEnd]!)
    ) {
      nameEnd += 1;
    }

    const name = rawTag.slice(0, nameEnd).toLowerCase();
    if (name) {
      tags.push({
        name,
        attributes: parseAttributes(rawTag, nameEnd),
        start,
        end,
      });
    }
    if (name === 'script' || name === 'style') {
      cursor = findClosingTag(markup, name, end)?.end ?? markup.length;
    } else {
      cursor = end;
    }
  }

  return tags;
}

function relContains(tag: ParsedTag, value: string): boolean {
  return (tag.attributes.rel ?? '')
    .toLowerCase()
    .split(/\s+/u)
    .includes(value);
}

function normaliseText(value: string): string {
  return decodeEntities(value)
    .replace(/<[^>]*>/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function extractElementContent(markup: string, tag: ParsedTag): string | undefined {
  const closingTag = findClosingTag(markup, tag.name, tag.end);
  if (!closingTag) return undefined;
  return markup.slice(tag.end, closingTag.start);
}

function absoluteUrl(value: string): string | undefined {
  try {
    return new URL(value).href;
  } catch {
    return undefined;
  }
}

function expectedAbsoluteUrl(routePath: string): string {
  return new URL(routePath, SITE_URL).href;
}

function outputPathForRoute(routePath: string): string {
  const relativePath = routePath.replace(/^\/+|\/+$/gu, '');
  const decodedSegments = relativePath.split('/').filter(Boolean).map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });
  return join(DIST_DIR, ...decodedSegments, 'index.html');
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

const fileExistenceCache = new Map<string, Promise<boolean>>();

function cachedIsFile(path: string): Promise<boolean> {
  const cached = fileExistenceCache.get(path);
  if (cached) return cached;
  const result = isFile(path);
  fileExistenceCache.set(path, result);
  return result;
}

function collectSchemaTypes(value: unknown, result = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaTypes(item, result);
    return result;
  }

  if (typeof value !== 'object' || value === null) return result;
  const record = value as Record<string, unknown>;
  const schemaType = record['@type'];

  if (typeof schemaType === 'string') {
    result.add(schemaType);
  } else if (Array.isArray(schemaType)) {
    for (const item of schemaType) {
      if (typeof item === 'string') result.add(item);
    }
  }

  for (const item of Object.values(record)) {
    collectSchemaTypes(item, result);
  }
  return result;
}

function pageContext(page: ExpectedPage): string {
  return `${page.locale}/${page.routeKey} (${page.routePath})`;
}

function issue(
  category: string,
  context: string,
  message: string,
): VerificationIssue {
  return { category, context, message };
}

function validateDocumentMetadata(
  page: ExpectedPage,
  html: string,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const htmlTags = tags.filter(({ name }) => name === 'html');

  if (htmlTags.length !== 1) {
    issues.push(
      issue('html', context, `expected exactly 1 <html> tag, found ${htmlTags.length}`),
    );
  } else {
    const locale = getLocaleDefinition(page.locale);
    const root = htmlTags[0]!;

    if (root.attributes.lang !== locale.bcp47) {
      issues.push(
        issue(
          'html',
          context,
          `expected lang="${locale.bcp47}", received "${root.attributes.lang ?? ''}"`,
        ),
      );
    }
    if (root.attributes.dir !== locale.direction) {
      issues.push(
        issue(
          'html',
          context,
          `expected dir="${locale.direction}", received "${root.attributes.dir ?? ''}"`,
        ),
      );
    }
  }

  const titleTags = tags.filter(({ name }) => name === 'title');
  if (titleTags.length !== 1) {
    issues.push(
      issue(
        'metadata',
        context,
        `expected exactly 1 <title>, found ${titleTags.length}`,
      ),
    );
  } else {
    const title = extractElementContent(html, titleTags[0]!);
    const titleText = title === undefined ? '' : normaliseText(title);
    if (titleText.length < 20) {
      issues.push(
        issue(
          'metadata',
          context,
          `title is not substantial (${titleText.length} characters)`,
        ),
      );
    }
  }

  const descriptionTags = tags.filter(
    ({ name, attributes }) =>
      name === 'meta' && attributes.name?.toLowerCase() === 'description',
  );
  if (descriptionTags.length !== 1) {
    issues.push(
      issue(
        'metadata',
        context,
        `expected exactly 1 meta description, found ${descriptionTags.length}`,
      ),
    );
  } else {
    const description = normaliseText(
      descriptionTags[0]!.attributes.content ?? '',
    );
    if (description.length < 60) {
      issues.push(
        issue(
          'metadata',
          context,
          `meta description is not substantial (${description.length} characters)`,
        ),
      );
    }
  }

  return issues;
}

function validateCanonicalAndAlternates(
  page: ExpectedPage,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const canonicalLinks = tags.filter(
    (tag) => tag.name === 'link' && relContains(tag, 'canonical'),
  );

  if (canonicalLinks.length !== 1) {
    issues.push(
      issue(
        'canonical',
        context,
        `expected exactly 1 canonical link, found ${canonicalLinks.length}`,
      ),
    );
  } else {
    const href = canonicalLinks[0]!.attributes.href ?? '';
    const canonical = absoluteUrl(href);
    if (canonical !== page.canonicalUrl) {
      issues.push(
        issue(
          'canonical',
          context,
          `expected ${page.canonicalUrl}, received ${href || '<missing href>'}`,
        ),
      );
    }
  }

  const expectedAlternates = new Map<string, string>();
  for (const alternateLocale of localeCodes) {
    const alternatePath = getRoutePath(page.routeKey, alternateLocale);
    if (alternatePath) {
      expectedAlternates.set(
        getLocaleDefinition(alternateLocale).hreflang,
        expectedAbsoluteUrl(alternatePath),
      );
    }
  }
  const germanPath = getRoutePath(page.routeKey, 'de');
  if (germanPath) {
    expectedAlternates.set('x-default', expectedAbsoluteUrl(germanPath));
  }

  const alternateLinks = tags.filter(
    (tag) =>
      tag.name === 'link' &&
      relContains(tag, 'alternate') &&
      typeof tag.attributes.hreflang === 'string',
  );
  if (alternateLinks.length !== localeCodes.length + 1) {
    issues.push(
      issue(
        'hreflang',
        context,
        `expected ${localeCodes.length + 1} hreflang links, found ${alternateLinks.length}`,
      ),
    );
  }

  const actualAlternates = new Map<string, string[]>();
  for (const link of alternateLinks) {
    const language = link.attributes.hreflang!;
    const entries = actualAlternates.get(language) ?? [];
    entries.push(link.attributes.href ?? '');
    actualAlternates.set(language, entries);
  }

  const expectedLanguages = [...expectedAlternates.keys()].sort();
  const actualLanguages = [...actualAlternates.keys()].sort();
  if (JSON.stringify(actualLanguages) !== JSON.stringify(expectedLanguages)) {
    issues.push(
      issue(
        'hreflang',
        context,
        `expected languages [${expectedLanguages.join(', ')}], received [${actualLanguages.join(', ')}]`,
      ),
    );
  }

  for (const [language, expectedUrl] of expectedAlternates) {
    const entries = actualAlternates.get(language) ?? [];
    if (entries.length !== 1) {
      issues.push(
        issue(
          'hreflang',
          context,
          `${language}: expected exactly 1 alternate, found ${entries.length}`,
        ),
      );
      continue;
    }

    const actualUrl = absoluteUrl(entries[0]!);
    if (actualUrl !== expectedUrl) {
      issues.push(
        issue(
          'hreflang',
          context,
          `${language}: expected ${expectedUrl}, received ${entries[0] || '<missing href>'}`,
        ),
      );
    }
  }

  return issues;
}

function validateJsonLd(
  page: ExpectedPage,
  html: string,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const scripts = tags.filter(
    ({ name, attributes }) =>
      name === 'script' &&
      attributes.type?.toLowerCase() === 'application/ld+json',
  );
  const schemaTypes = new Set<string>();

  if (scripts.length === 0) {
    issues.push(issue('json-ld', context, 'no JSON-LD blocks found'));
    return issues;
  }

  scripts.forEach((script, index) => {
    const content = extractElementContent(html, script);
    if (content === undefined) {
      issues.push(
        issue('json-ld', context, `block ${index + 1} has no closing </script>`),
      );
      return;
    }

    try {
      const parsed: unknown = JSON.parse(content.trim());
      collectSchemaTypes(parsed, schemaTypes);
    } catch (error) {
      issues.push(
        issue(
          'json-ld',
          context,
          `block ${index + 1} is invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
    }
  });

  for (const requiredType of ['WebPage', 'FAQPage']) {
    if (!schemaTypes.has(requiredType)) {
      issues.push(
        issue('json-ld', context, `missing schema type ${requiredType}`),
      );
    }
  }
  if (
    TOOL_ROUTE_KEYS.has(page.routeKey) &&
    !schemaTypes.has('WebApplication')
  ) {
    issues.push(
      issue('json-ld', context, 'tool page is missing schema type WebApplication'),
    );
  }

  return issues;
}

function validateArtifacts(
  page: ExpectedPage,
  html: string,
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);

  for (const { label, pattern } of ARTIFACT_PATTERNS) {
    const match = html.match(pattern);
    if (match) {
      issues.push(
        issue('artifact', context, `${label}: "${match[0]}"`),
      );
    }
  }

  return issues;
}

function hasAttribute(tag: ParsedTag, name: string): boolean {
  return Object.prototype.hasOwnProperty.call(tag.attributes, name);
}

function describeTag(tag: ParsedTag): string {
  const id = tag.attributes.id?.trim();
  const name = tag.attributes.name?.trim();
  const source =
    tag.attributes.src?.trim() ??
    tag.attributes.href?.trim() ??
    tag.attributes.type?.trim();
  if (id) return `<${tag.name} id="${id}">`;
  if (name) return `<${tag.name} name="${name}">`;
  if (source) return `<${tag.name} ${source}>`;
  return `<${tag.name}> at byte ${tag.start}`;
}

function hasValidAriaName(
  tag: ParsedTag,
  knownIds: ReadonlySet<string>,
): boolean {
  if ((tag.attributes['aria-label'] ?? '').trim()) return true;

  const references = (tag.attributes['aria-labelledby'] ?? '')
    .trim()
    .split(/\s+/u)
    .filter(Boolean);
  return references.length > 0 && references.every((id) => knownIds.has(id));
}

function nestedImageAltText(content: string): string {
  return parseStartTags(content)
    .filter(
      (tag) =>
        tag.name === 'img' &&
        hasAttribute(tag, 'alt') &&
        Boolean((tag.attributes.alt ?? '').trim()),
    )
    .map((tag) => tag.attributes.alt!.trim())
    .join(' ');
}

function hasElementContentName(
  markup: string,
  tag: ParsedTag,
): boolean {
  const content = extractElementContent(markup, tag);
  if (content === undefined) return false;
  return Boolean(normaliseText(content) || nestedImageAltText(content));
}

function validateAccessibilityBasics(
  page: ExpectedPage,
  html: string,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const headings = tags.filter(({ name }) => name === 'h1');

  if (headings.length !== 1) {
    issues.push(
      issue(
        'accessibility',
        context,
        `expected exactly 1 <h1>, found ${headings.length}`,
      ),
    );
  }

  const idCounts = new Map<string, number>();
  for (const tag of tags) {
    if (!hasAttribute(tag, 'id')) continue;
    const id = (tag.attributes.id ?? '').trim();
    if (!id) continue;
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
  }
  const knownIds = new Set(idCounts.keys());
  for (const [id, count] of idCounts) {
    if (count > 1) {
      issues.push(
        issue(
          'accessibility',
          context,
          `duplicate id="${id}" appears ${count} times`,
        ),
      );
    }
  }

  for (const image of tags.filter(({ name }) => name === 'img')) {
    if (!hasAttribute(image, 'alt')) {
      issues.push(
        issue(
          'accessibility',
          context,
          `${describeTag(image)} is missing an alt attribute`,
        ),
      );
    }
  }

  const labels = tags.filter(({ name }) => name === 'label');
  const labelledControlIds = new Set(
    labels
      .filter((label) => hasElementContentName(html, label))
      .map((label) => (label.attributes.for ?? '').trim())
      .filter(Boolean),
  );
  const wrappingLabelRanges = labels
    .filter((label) => hasElementContentName(html, label))
    .map((label) => ({
      start: label.end,
      end: findClosingTag(html, label.name, label.end)?.start ?? label.end,
    }));

  const controls = tags.filter(({ name }) =>
    ['button', 'input', 'select', 'textarea'].includes(name),
  );
  for (const control of controls) {
    const inputType = (control.attributes.type ?? 'text').toLowerCase();
    if (control.name === 'input' && inputType === 'hidden') continue;

    const id = (control.attributes.id ?? '').trim();
    const hasExplicitLabel = Boolean(id && labelledControlIds.has(id));
    const hasWrappingLabel = wrappingLabelRanges.some(
      (range) => control.start >= range.start && control.start < range.end,
    );
    const hasAriaName = hasValidAriaName(control, knownIds);
    const hasNativeButtonName =
      control.name === 'button' && hasElementContentName(html, control);
    const hasInputButtonName =
      control.name === 'input' &&
      ['button', 'reset', 'submit'].includes(inputType) &&
      Boolean((control.attributes.value ?? '').trim());
    const hasInputImageName =
      control.name === 'input' &&
      inputType === 'image' &&
      Boolean((control.attributes.alt ?? '').trim());

    if (
      !hasExplicitLabel &&
      !hasWrappingLabel &&
      !hasAriaName &&
      !hasNativeButtonName &&
      !hasInputButtonName &&
      !hasInputImageName
    ) {
      issues.push(
        issue(
          'accessibility',
          context,
          `${describeTag(control)} has no associated label or accessible name`,
        ),
      );
    }
  }

  const siteOrigin = new URL(SITE_URL).origin;
  for (const link of tags.filter(({ name }) => name === 'a')) {
    const href = (link.attributes.href ?? '').trim();
    let internal = !href;
    try {
      const url = new URL(href || '/', SITE_URL);
      internal =
        !/^(?:mailto|tel|sms|data|javascript):/iu.test(href) &&
        url.origin === siteOrigin;
    } catch {
      internal = href.startsWith('#') || !href;
    }
    if (!internal) continue;

    if (
      !hasValidAriaName(link, knownIds) &&
      !hasElementContentName(html, link)
    ) {
      issues.push(
        issue(
          'accessibility',
          context,
          `${describeTag(link)} is an empty internal link`,
        ),
      );
    }
  }

  return issues;
}

function outputCandidatesForUrl(url: URL): string[] {
  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(url.pathname);
  } catch {
    decodedPath = url.pathname;
  }

  const directPath = resolve(DIST_DIR, decodedPath.replace(/^\/+/u, ''));
  if (
    directPath !== DIST_DIR &&
    !directPath.startsWith(`${DIST_DIR}/`)
  ) {
    return [];
  }

  const candidates = [directPath];
  if (url.pathname.endsWith('/') || directPath === DIST_DIR) {
    candidates.push(join(directPath, 'index.html'));
  } else if (!/\/[^/]+\.[^/]+$/u.test(url.pathname)) {
    candidates.push(join(directPath, 'index.html'), `${directPath}.html`);
  }
  return [...new Set(candidates)];
}

async function validateInternalLinkTargets(
  page: ExpectedPage,
  tags: readonly ParsedTag[],
): Promise<VerificationIssue[]> {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const siteOrigin = new URL(SITE_URL).origin;
  const internalLinks = tags.filter(({ name }) => name === 'a');

  await Promise.all(
    internalLinks.map(async (link) => {
      const href = (link.attributes.href ?? '').trim();
      if (
        !href ||
        href.startsWith('#') ||
        /^(?:mailto|tel|sms|data|javascript):/iu.test(href)
      ) {
        return;
      }

      let target: URL;
      try {
        target = new URL(href, page.canonicalUrl);
      } catch {
        issues.push(
          issue(
            'links',
            context,
            `${describeTag(link)} has an invalid href`,
          ),
        );
        return;
      }

      if (
        target.origin !== siteOrigin ||
        /^\/api(?:\/|$)/u.test(target.pathname)
      ) {
        return;
      }

      const candidates = outputCandidatesForUrl(target);
      const existence = await Promise.all(candidates.map(cachedIsFile));
      if (candidates.length === 0 || !existence.some(Boolean)) {
        issues.push(
          issue(
            'links',
            context,
            `${describeTag(link)} points to missing internal target ${target.pathname}`,
          ),
        );
      }
    }),
  );

  return issues;
}

async function validatePage(page: ExpectedPage): Promise<VerificationIssue[]> {
  if (!(await isFile(page.outputPath))) {
    return [
      issue(
        'output',
        pageContext(page),
        `missing ${page.outputPath.replace(`${PROJECT_ROOT}/`, '')}`,
      ),
    ];
  }

  let html: string;
  try {
    html = await readFile(page.outputPath, 'utf8');
  } catch (error) {
    return [
      issue(
        'output',
        pageContext(page),
        `could not read output: ${error instanceof Error ? error.message : String(error)}`,
      ),
    ];
  }

  const tags = parseStartTags(html);
  const linkTargetIssues = await validateInternalLinkTargets(page, tags);
  return [
    ...validateDocumentMetadata(page, html, tags),
    ...validateCanonicalAndAlternates(page, tags),
    ...validateJsonLd(page, html, tags),
    ...validateArtifacts(page, html),
    ...validateAccessibilityBasics(page, html, tags),
    ...linkTargetIssues,
  ];
}

async function loadSitemapLocations(
  issues: VerificationIssue[],
): Promise<Set<string> | undefined> {
  let entries;
  try {
    entries = await readdir(DIST_DIR, { withFileTypes: true });
  } catch (error) {
    issues.push(
      issue(
        'sitemap',
        'dist',
        `could not list sitemap files: ${error instanceof Error ? error.message : String(error)}`,
      ),
    );
    return undefined;
  }

  const sitemapFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        /^sitemap(?:-[^.]+)?\.xml$/u.test(entry.name),
    )
    .map((entry) => join(DIST_DIR, entry.name))
    .sort();

  if (sitemapFiles.length === 0) {
    issues.push(issue('sitemap', 'dist', 'no sitemap XML files found'));
    return undefined;
  }

  const locations = new Set<string>();
  for (const sitemapPath of sitemapFiles) {
    let xml: string;
    try {
      xml = await readFile(sitemapPath, 'utf8');
    } catch (error) {
      issues.push(
        issue(
          'sitemap',
          sitemapPath.replace(`${PROJECT_ROOT}/`, ''),
          `could not read file: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
      continue;
    }

    for (const tag of parseStartTags(xml).filter(({ name }) => name === 'loc')) {
      const content = extractElementContent(xml, tag);
      if (content === undefined) continue;
      const rawUrl = normaliseText(content);
      const url = absoluteUrl(rawUrl);
      if (!url) {
        issues.push(
          issue(
            'sitemap',
            sitemapPath.replace(`${PROJECT_ROOT}/`, ''),
            `invalid <loc> URL "${rawUrl}"`,
          ),
        );
      } else {
        locations.add(url);
      }
    }
  }

  return locations;
}

async function readLlmsFile(
  issues: VerificationIssue[],
): Promise<string | undefined> {
  const path = join(DIST_DIR, 'llms.txt');
  try {
    return await readFile(path, 'utf8');
  } catch (error) {
    issues.push(
      issue(
        'llms',
        'dist/llms.txt',
        `could not read file: ${error instanceof Error ? error.message : String(error)}`,
      ),
    );
    return undefined;
  }
}

function buildExpectedPages(issues: VerificationIssue[]): ExpectedPage[] {
  if (localeCodes.length !== EXPECTED_LOCALE_COUNT) {
    issues.push(
      issue(
        'configuration',
        'locale registry',
        `expected ${EXPECTED_LOCALE_COUNT} locales, found ${localeCodes.length}`,
      ),
    );
  }
  if (guideRouteKeys.length !== EXPECTED_GUIDE_COUNT) {
    issues.push(
      issue(
        'configuration',
        'guide route registry',
        `expected ${EXPECTED_GUIDE_COUNT} guides, found ${guideRouteKeys.length}`,
      ),
    );
  }

  const pages: ExpectedPage[] = [];
  for (const locale of localeCodes) {
    for (const routeKey of guideRouteKeys) {
      const routePath = getRoutePath(routeKey, locale);
      if (!routePath) {
        issues.push(
          issue(
            'configuration',
            `${locale}/${routeKey}`,
            'route registry has no published path',
          ),
        );
        continue;
      }

      pages.push({
        locale,
        routeKey,
        routePath,
        canonicalUrl: expectedAbsoluteUrl(routePath),
        outputPath: outputPathForRoute(routePath),
      });
    }
  }

  if (pages.length !== EXPECTED_PAGE_COUNT) {
    issues.push(
      issue(
        'configuration',
        'expected page matrix',
        `expected ${EXPECTED_PAGE_COUNT} pages, resolved ${pages.length}`,
      ),
    );
  }

  const paths = pages.map(({ routePath }) => routePath);
  if (new Set(paths).size !== paths.length) {
    const duplicates = [...new Set(
      paths.filter((path, index) => paths.indexOf(path) !== index),
    )];
    issues.push(
      issue(
        'configuration',
        'route registry',
        `duplicate guide paths: ${duplicates.join(', ')}`,
      ),
    );
  }

  return pages;
}

function report(issues: readonly VerificationIssue[]): void {
  if (issues.length === 0) {
    console.log(
      `Static build verified: ${EXPECTED_PAGE_COUNT} guide pages, ${localeCodes.length} locales, ${guideRouteKeys.length} guides.`,
    );
    return;
  }

  const grouped = new Map<string, VerificationIssue[]>();
  for (const currentIssue of issues) {
    const categoryIssues = grouped.get(currentIssue.category) ?? [];
    categoryIssues.push(currentIssue);
    grouped.set(currentIssue.category, categoryIssues);
  }

  console.error(
    `Static build verification failed with ${issues.length} issue${issues.length === 1 ? '' : 's'}:`,
  );
  for (const [category, categoryIssues] of grouped) {
    console.error(`\n[${category}] ${categoryIssues.length}`);
    for (const currentIssue of categoryIssues) {
      console.error(`  - ${currentIssue.context}: ${currentIssue.message}`);
    }
  }
}

async function main(): Promise<void> {
  const issues: VerificationIssue[] = [];
  if (!(await isFile(join(DIST_DIR, 'index.html')))) {
    issues.push(
      issue(
        'output',
        'dist',
        'build output is missing; run `astro build` before this verifier',
      ),
    );
    report(issues);
    process.exitCode = 1;
    return;
  }

  const pages = buildExpectedPages(issues);
  const [pageIssueGroups, sitemapLocations, llmsText] = await Promise.all([
    Promise.all(pages.map((page) => validatePage(page))),
    loadSitemapLocations(issues),
    readLlmsFile(issues),
  ]);
  for (const pageIssues of pageIssueGroups) issues.push(...pageIssues);

  if (sitemapLocations) {
    for (const page of pages) {
      if (!sitemapLocations.has(page.canonicalUrl)) {
        issues.push(
          issue(
            'sitemap',
            pageContext(page),
            `canonical is missing from sitemap: ${page.canonicalUrl}`,
          ),
        );
      }
    }
  }

  if (llmsText !== undefined) {
    for (const page of pages) {
      const expectedLink = `(${SITE_URL}${page.routePath})`;
      if (!llmsText.includes(expectedLink)) {
        issues.push(
          issue(
            'llms',
            pageContext(page),
            `path is missing from llms.txt: ${page.routePath}`,
          ),
        );
      }
    }
  }

  report(issues);
  if (issues.length > 0) process.exitCode = 1;
}

await main();
