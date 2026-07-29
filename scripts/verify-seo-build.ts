import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

import {
  defaultLocale,
  getLocaleDefinition,
  isLocaleCode,
  localeCodes,
  type LocaleCode,
} from '../src/i18n/locales';
import {
  getRoutePath,
  routeRegistry,
  type RouteKey,
} from '../src/i18n/routes';

const SITE_URL = 'https://www.resortpass-europapark.ch';
const SITE_ORIGIN = new URL(SITE_URL).origin;
const PROJECT_ROOT = resolve(import.meta.dir, '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist');

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX_ROBOTS = 'noindex, nofollow';
const MIN_INDEXABLE_TITLE_LENGTH = 20;
const MAX_INDEXABLE_TITLE_LENGTH = 80;
const MIN_INDEXABLE_DESCRIPTION_LENGTH = 50;
const MAX_INDEXABLE_DESCRIPTION_LENGTH = 200;

type AttributeMap = Record<string, string>;

interface ParsedTag {
  name: string;
  attributes: AttributeMap;
  start: number;
  end: number;
}

interface ExpectedPage {
  locale: LocaleCode;
  routeKey?: RouteKey;
  routePath: string;
  canonicalUrl: string;
  outputPath: string;
  indexable: boolean;
  label: string;
}

interface VerificationIssue {
  category: string;
  context: string;
  message: string;
}

interface PageMetadata {
  page: ExpectedPage;
  title?: string;
  description?: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

function issue(
  category: string,
  context: string,
  message: string,
): VerificationIssue {
  return { category, context, message };
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
  const pattern = new RegExp(`<\\/\\s*${escapeRegExp(tagName)}\\s*>`, 'giu');
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
  const decodedSegments = relativePath
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });
  return join(DIST_DIR, ...decodedSegments, 'index.html');
}

function pageContext(page: ExpectedPage): string {
  return `${page.label} (${page.routePath})`;
}

function buildExpectedPages(): ExpectedPage[] {
  const pages: ExpectedPage[] = [];

  for (const [rawRouteKey, definition] of Object.entries(routeRegistry)) {
    const routeKey = rawRouteKey as RouteKey;
    for (const locale of localeCodes) {
      const routePath = getRoutePath(routeKey, locale);
      if (!routePath) continue;
      pages.push({
        locale,
        routeKey,
        routePath,
        canonicalUrl: expectedAbsoluteUrl(routePath),
        outputPath: outputPathForRoute(routePath),
        indexable: definition.indexable,
        label: `${locale}/${routeKey}`,
      });
    }
  }

  pages.push({
    locale: defaultLocale,
    routePath: '/404/',
    canonicalUrl: expectedAbsoluteUrl('/404/'),
    outputPath: join(DIST_DIR, '404.html'),
    indexable: false,
    label: 'de/404',
  });

  return pages;
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function collectHtmlFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectHtmlFiles(path));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path);
    }
  }
  return files;
}

function metaTags(
  tags: readonly ParsedTag[],
  attribute: 'name' | 'property',
  value: string,
): ParsedTag[] {
  const expected = value.toLowerCase();
  return tags.filter(
    (tag) =>
      tag.name === 'meta' &&
      (tag.attributes[attribute] ?? '').toLowerCase() === expected,
  );
}

function singleMetaContent(
  tags: readonly ParsedTag[],
  attribute: 'name' | 'property',
  value: string,
  context: string,
  issues: VerificationIssue[],
): string | undefined {
  const matches = metaTags(tags, attribute, value);
  if (matches.length !== 1) {
    issues.push(
      issue(
        'metadata',
        context,
        `expected exactly 1 ${attribute}="${value}" meta tag, found ${matches.length}`,
      ),
    );
    return matches[0]?.attributes.content;
  }

  const content = matches[0]!.attributes.content?.trim();
  if (!content) {
    issues.push(
      issue('metadata', context, `${attribute}="${value}" has empty content`),
    );
    return undefined;
  }
  return content;
}

function validateDocumentMetadata(
  page: ExpectedPage,
  html: string,
  tags: readonly ParsedTag[],
): { issues: VerificationIssue[]; metadata: PageMetadata } {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const metadata: PageMetadata = { page };
  const locale = getLocaleDefinition(page.locale);

  const htmlTags = tags.filter(({ name }) => name === 'html');
  if (htmlTags.length !== 1) {
    issues.push(
      issue('html', context, `expected exactly 1 <html> tag, found ${htmlTags.length}`),
    );
  } else {
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
      issue('metadata', context, `expected exactly 1 <title>, found ${titleTags.length}`),
    );
  } else {
    const titleContent = extractElementContent(html, titleTags[0]!);
    const title = titleContent === undefined ? '' : normaliseText(titleContent);
    if (!title) {
      issues.push(issue('metadata', context, 'title is empty'));
    } else {
      metadata.title = title;
      if (
        page.indexable &&
        (title.length < MIN_INDEXABLE_TITLE_LENGTH ||
          title.length > MAX_INDEXABLE_TITLE_LENGTH)
      ) {
        issues.push(
          issue(
            'metadata',
            context,
            `indexable title length ${title.length} is outside ${MIN_INDEXABLE_TITLE_LENGTH}–${MAX_INDEXABLE_TITLE_LENGTH}`,
          ),
        );
      }
    }
  }

  const description = singleMetaContent(
    tags,
    'name',
    'description',
    context,
    issues,
  );
  if (description) {
    metadata.description = normaliseText(description);
    if (
      page.indexable &&
      (metadata.description.length < MIN_INDEXABLE_DESCRIPTION_LENGTH ||
        metadata.description.length > MAX_INDEXABLE_DESCRIPTION_LENGTH)
    ) {
      issues.push(
        issue(
          'metadata',
          context,
          `indexable description length ${metadata.description.length} is outside ${MIN_INDEXABLE_DESCRIPTION_LENGTH}–${MAX_INDEXABLE_DESCRIPTION_LENGTH}`,
        ),
      );
    }
  }

  const robots = singleMetaContent(tags, 'name', 'robots', context, issues);
  const expectedRobots = page.indexable ? INDEX_ROBOTS : NOINDEX_ROBOTS;
  if (robots && robots !== expectedRobots) {
    issues.push(
      issue(
        'robots',
        context,
        `expected "${expectedRobots}", received "${robots}"`,
      ),
    );
  }

  const canonicalLinks = tags.filter(
    (tag) => tag.name === 'link' && relContains(tag, 'canonical'),
  );
  if (canonicalLinks.length !== 1) {
    issues.push(
      issue(
        'canonical',
        context,
        `expected exactly 1 canonical, found ${canonicalLinks.length}`,
      ),
    );
  } else {
    const href = canonicalLinks[0]!.attributes.href ?? '';
    if (href !== page.canonicalUrl) {
      issues.push(
        issue(
          'canonical',
          context,
          `expected "${page.canonicalUrl}", received "${href}"`,
        ),
      );
    }
  }

  const h1Tags = tags.filter(({ name }) => name === 'h1');
  if (h1Tags.length !== 1) {
    issues.push(
      issue('content', context, `expected exactly 1 <h1>, found ${h1Tags.length}`),
    );
  } else {
    const h1Content = extractElementContent(html, h1Tags[0]!);
    if (h1Content === undefined || !normaliseText(h1Content)) {
      issues.push(issue('content', context, 'h1 is empty'));
    }
  }

  return { issues, metadata };
}

function expectedHreflangs(page: ExpectedPage): Map<string, string> {
  const expected = new Map<string, string>();
  if (!page.indexable || !page.routeKey) return expected;

  for (const locale of localeCodes) {
    const path = getRoutePath(page.routeKey, locale);
    if (!path) continue;
    expected.set(
      getLocaleDefinition(locale).hreflang,
      expectedAbsoluteUrl(path),
    );
  }

  const xDefaultPath = getRoutePath(page.routeKey, defaultLocale);
  if (xDefaultPath) {
    expected.set('x-default', expectedAbsoluteUrl(xDefaultPath));
  }
  return expected;
}

function validateHreflangs(
  page: ExpectedPage,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const expected = expectedHreflangs(page);
  const alternateLinks = tags.filter(
    (tag) =>
      tag.name === 'link' &&
      relContains(tag, 'alternate') &&
      typeof tag.attributes.hreflang === 'string',
  );
  const actual = new Map<string, string>();

  for (const link of alternateLinks) {
    const hreflang = (link.attributes.hreflang ?? '').toLowerCase();
    const href = link.attributes.href ?? '';
    if (!hreflang) {
      issues.push(issue('hreflang', context, 'alternate has empty hreflang'));
      continue;
    }
    if (actual.has(hreflang)) {
      issues.push(
        issue('hreflang', context, `duplicate hreflang="${hreflang}"`),
      );
      continue;
    }
    const normalisedHref = absoluteUrl(href);
    if (!normalisedHref) {
      issues.push(
        issue('hreflang', context, `hreflang="${hreflang}" has invalid URL "${href}"`),
      );
      continue;
    }
    actual.set(hreflang, normalisedHref);
  }

  for (const [hreflang, expectedHref] of expected) {
    const actualHref = actual.get(hreflang);
    if (!actualHref) {
      issues.push(
        issue('hreflang', context, `missing hreflang="${hreflang}"`),
      );
    } else if (actualHref !== expectedHref) {
      issues.push(
        issue(
          'hreflang',
          context,
          `hreflang="${hreflang}" expected "${expectedHref}", received "${actualHref}"`,
        ),
      );
    }
  }

  for (const hreflang of actual.keys()) {
    if (!expected.has(hreflang)) {
      issues.push(
        issue('hreflang', context, `unexpected hreflang="${hreflang}"`),
      );
    }
  }

  return issues;
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

function validateJsonLd(
  page: ExpectedPage,
  html: string,
  tags: readonly ParsedTag[],
): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);
  const scripts = tags.filter(
    (tag) =>
      tag.name === 'script' &&
      (tag.attributes.type ?? '').toLowerCase() === 'application/ld+json',
  );
  const schemaTypes = new Set<string>();

  for (const [index, script] of scripts.entries()) {
    const rawContent = extractElementContent(html, script)?.trim() ?? '';
    if (!rawContent) {
      issues.push(
        issue('structured-data', context, `JSON-LD script ${index + 1} is empty`),
      );
      continue;
    }
    try {
      const value: unknown = JSON.parse(rawContent);
      collectSchemaTypes(value, schemaTypes);
    } catch (error) {
      issues.push(
        issue(
          'structured-data',
          context,
          `JSON-LD script ${index + 1} is invalid: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ),
      );
    }
  }

  if (page.indexable && !schemaTypes.has('WebPage')) {
    issues.push(
      issue(
        'structured-data',
        context,
        'indexable page is missing a valid WebPage schema',
      ),
    );
  }
  return issues;
}

function pngDimensions(buffer: Uint8Array): ImageDimensions | undefined {
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (
    buffer.length < 24 ||
    pngSignature.some((byte, index) => buffer[index] !== byte)
  ) {
    return undefined;
  }
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  return {
    width: view.getUint32(16, false),
    height: view.getUint32(20, false),
  };
}

function jpegDimensions(buffer: Uint8Array): ImageDimensions | undefined {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return undefined;
  }

  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1]!;
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 2 > buffer.length) break;
    const segmentLength = view.getUint16(offset, false);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      if (segmentLength < 7) return undefined;
      return {
        height: view.getUint16(offset + 3, false),
        width: view.getUint16(offset + 5, false),
      };
    }
    offset += segmentLength;
  }
  return undefined;
}

function webpDimensions(buffer: Uint8Array): ImageDimensions | undefined {
  if (
    buffer.length < 30 ||
    String.fromCharCode(...buffer.slice(0, 4)) !== 'RIFF' ||
    String.fromCharCode(...buffer.slice(8, 12)) !== 'WEBP'
  ) {
    return undefined;
  }

  const chunkType = String.fromCharCode(...buffer.slice(12, 16));
  if (chunkType === 'VP8X') {
    return {
      width: 1 + buffer[24]! + (buffer[25]! << 8) + (buffer[26]! << 16),
      height: 1 + buffer[27]! + (buffer[28]! << 8) + (buffer[29]! << 16),
    };
  }
  if (
    chunkType === 'VP8 ' &&
    buffer.length >= 30 &&
    buffer[23] === 0x9d &&
    buffer[24] === 0x01 &&
    buffer[25] === 0x2a
  ) {
    return {
      width: (buffer[26]! | (buffer[27]! << 8)) & 0x3fff,
      height: (buffer[28]! | (buffer[29]! << 8)) & 0x3fff,
    };
  }
  if (chunkType === 'VP8L' && buffer.length >= 25 && buffer[20] === 0x2f) {
    const bits =
      buffer[21]! |
      (buffer[22]! << 8) |
      (buffer[23]! << 16) |
      (buffer[24]! << 24);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return undefined;
}

async function readImageDimensions(path: string): Promise<ImageDimensions | undefined> {
  const buffer = await readFile(path);
  return (
    pngDimensions(buffer) ??
    jpegDimensions(buffer) ??
    webpDimensions(buffer)
  );
}

const imageDimensionCache = new Map<
  string,
  Promise<ImageDimensions | undefined>
>();

function cachedImageDimensions(
  path: string,
): Promise<ImageDimensions | undefined> {
  const cached = imageDimensionCache.get(path);
  if (cached) return cached;
  const result = readImageDimensions(path);
  imageDimensionCache.set(path, result);
  return result;
}

function localOutputPathForUrl(url: URL): string | undefined {
  if (url.origin !== SITE_ORIGIN || url.search || url.hash) return undefined;
  let pathname: string;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    return undefined;
  }
  const outputPath = resolve(DIST_DIR, `.${pathname}`);
  const pathFromDist = relative(DIST_DIR, outputPath);
  if (pathFromDist.startsWith('..') || pathFromDist === '') return undefined;
  return outputPath;
}

async function validateSocialMetadata(
  page: ExpectedPage,
  tags: readonly ParsedTag[],
  metadata: PageMetadata,
): Promise<VerificationIssue[]> {
  const issues: VerificationIssue[] = [];
  const context = pageContext(page);

  const ogType = singleMetaContent(tags, 'property', 'og:type', context, issues);
  const ogUrl = singleMetaContent(tags, 'property', 'og:url', context, issues);
  const ogTitle = singleMetaContent(tags, 'property', 'og:title', context, issues);
  const ogDescription = singleMetaContent(
    tags,
    'property',
    'og:description',
    context,
    issues,
  );
  const ogImage = singleMetaContent(tags, 'property', 'og:image', context, issues);
  const ogImageWidth = singleMetaContent(
    tags,
    'property',
    'og:image:width',
    context,
    issues,
  );
  const ogImageHeight = singleMetaContent(
    tags,
    'property',
    'og:image:height',
    context,
    issues,
  );
  const ogImageAlt = singleMetaContent(
    tags,
    'property',
    'og:image:alt',
    context,
    issues,
  );
  singleMetaContent(tags, 'property', 'og:site_name', context, issues);
  const ogLocale = singleMetaContent(
    tags,
    'property',
    'og:locale',
    context,
    issues,
  );

  const twitterCard = singleMetaContent(
    tags,
    'name',
    'twitter:card',
    context,
    issues,
  );
  const twitterTitle = singleMetaContent(
    tags,
    'name',
    'twitter:title',
    context,
    issues,
  );
  const twitterDescription = singleMetaContent(
    tags,
    'name',
    'twitter:description',
    context,
    issues,
  );
  const twitterImage = singleMetaContent(
    tags,
    'name',
    'twitter:image',
    context,
    issues,
  );
  const twitterImageAlt = singleMetaContent(
    tags,
    'name',
    'twitter:image:alt',
    context,
    issues,
  );

  if (ogType && ogType !== 'website') {
    issues.push(
      issue('social', context, `expected og:type="website", received "${ogType}"`),
    );
  }
  if (ogUrl && ogUrl !== page.canonicalUrl) {
    issues.push(
      issue(
        'social',
        context,
        `og:url must equal canonical "${page.canonicalUrl}", received "${ogUrl}"`,
      ),
    );
  }
  if (metadata.title && ogTitle && ogTitle !== metadata.title) {
    issues.push(issue('social', context, 'og:title does not match <title>'));
  }
  if (
    metadata.description &&
    ogDescription &&
    normaliseText(ogDescription) !== metadata.description
  ) {
    issues.push(
      issue('social', context, 'og:description does not match meta description'),
    );
  }
  if (twitterCard && twitterCard !== 'summary_large_image') {
    issues.push(
      issue(
        'social',
        context,
        `expected twitter:card="summary_large_image", received "${twitterCard}"`,
      ),
    );
  }
  if (ogTitle && twitterTitle && twitterTitle !== ogTitle) {
    issues.push(issue('social', context, 'twitter:title does not match og:title'));
  }
  if (
    ogDescription &&
    twitterDescription &&
    normaliseText(twitterDescription) !== normaliseText(ogDescription)
  ) {
    issues.push(
      issue('social', context, 'twitter:description does not match og:description'),
    );
  }
  if (
    ogImage &&
    twitterImage &&
    absoluteUrl(twitterImage) !== absoluteUrl(ogImage)
  ) {
    issues.push(issue('social', context, 'twitter:image does not match og:image'));
  }
  if (ogImageAlt && twitterImageAlt && twitterImageAlt !== ogImageAlt) {
    issues.push(
      issue('social', context, 'twitter:image:alt does not match og:image:alt'),
    );
  }

  const expectedOgLocale = getLocaleDefinition(page.locale).ogLocale;
  if (ogLocale && ogLocale !== expectedOgLocale) {
    issues.push(
      issue(
        'social',
        context,
        `expected og:locale="${expectedOgLocale}", received "${ogLocale}"`,
      ),
    );
  }

  const expectedAlternateLocales = new Set(
    [...expectedHreflangs(page).keys()]
      .filter((hreflang) => hreflang !== 'x-default' && hreflang !== page.locale)
      .flatMap((hreflang) =>
        isLocaleCode(hreflang)
          ? [getLocaleDefinition(hreflang).ogLocale]
          : [],
      ),
  );
  const actualAlternateLocales = metaTags(
    tags,
    'property',
    'og:locale:alternate',
  ).map((tag) => tag.attributes.content?.trim() ?? '');
  const actualAlternateLocaleSet = new Set(actualAlternateLocales);

  if (actualAlternateLocaleSet.size !== actualAlternateLocales.length) {
    issues.push(issue('social', context, 'duplicate og:locale:alternate value'));
  }
  for (const value of expectedAlternateLocales) {
    if (!actualAlternateLocaleSet.has(value)) {
      issues.push(
        issue('social', context, `missing og:locale:alternate="${value}"`),
      );
    }
  }
  for (const value of actualAlternateLocaleSet) {
    if (!expectedAlternateLocales.has(value)) {
      issues.push(
        issue('social', context, `unexpected og:locale:alternate="${value}"`),
      );
    }
  }

  if (ogImage) {
    let imageUrl: URL | undefined;
    try {
      imageUrl = new URL(ogImage);
    } catch {
      issues.push(issue('social', context, `og:image is not an absolute URL: "${ogImage}"`));
    }

    if (imageUrl) {
      const outputPath = localOutputPathForUrl(imageUrl);
      if (!outputPath) {
        issues.push(
          issue(
            'social',
            context,
            `og:image must reference a same-origin local asset without query/hash: "${ogImage}"`,
          ),
        );
      } else if (!(await isFile(outputPath))) {
        issues.push(
          issue(
            'social',
            context,
            `og:image asset is missing from dist: ${relative(DIST_DIR, outputPath)}`,
          ),
        );
      } else {
        const declaredWidth = Number.parseInt(ogImageWidth ?? '', 10);
        const declaredHeight = Number.parseInt(ogImageHeight ?? '', 10);
        if (
          !Number.isSafeInteger(declaredWidth) ||
          declaredWidth <= 0 ||
          String(declaredWidth) !== ogImageWidth
        ) {
          issues.push(
            issue('social', context, `invalid og:image:width "${ogImageWidth ?? ''}"`),
          );
        }
        if (
          !Number.isSafeInteger(declaredHeight) ||
          declaredHeight <= 0 ||
          String(declaredHeight) !== ogImageHeight
        ) {
          issues.push(
            issue(
              'social',
              context,
              `invalid og:image:height "${ogImageHeight ?? ''}"`,
            ),
          );
        }

        try {
          const actualDimensions = await cachedImageDimensions(outputPath);
          if (!actualDimensions) {
            issues.push(
              issue(
                'social',
                context,
                `could not read dimensions for ${relative(DIST_DIR, outputPath)}`,
              ),
            );
          } else if (
            actualDimensions.width !== declaredWidth ||
            actualDimensions.height !== declaredHeight
          ) {
            issues.push(
              issue(
                'social',
                context,
                `declared ${declaredWidth}×${declaredHeight}, actual ${actualDimensions.width}×${actualDimensions.height} for ${relative(DIST_DIR, outputPath)}`,
              ),
            );
          }
        } catch (error) {
          issues.push(
            issue(
              'social',
              context,
              `failed to inspect ${relative(DIST_DIR, outputPath)}: ${
                error instanceof Error ? error.message : String(error)
              }`,
            ),
          );
        }
      }
    }
  }

  return issues;
}

function validateDuplicates(metadata: readonly PageMetadata[]): VerificationIssue[] {
  const issues: VerificationIssue[] = [];
  const indexableMetadata = metadata.filter(({ page }) => page.indexable);

  for (const field of ['title', 'description'] as const) {
    const groups = new Map<string, PageMetadata[]>();
    for (const item of indexableMetadata) {
      const value = item[field];
      if (!value) continue;
      const key = value.replace(/\s+/gu, ' ').trim().toLocaleLowerCase();
      const group = groups.get(key) ?? [];
      group.push(item);
      groups.set(key, group);
    }

    for (const group of groups.values()) {
      if (group.length < 2) continue;
      issues.push(
        issue(
          'duplicates',
          group.map(({ page }) => page.label).join(', '),
          `duplicate indexable ${field}: "${group[0]![field]}"`,
        ),
      );
    }
  }

  return issues;
}

function parseXmlAttributes(rawTag: string): AttributeMap {
  const attributes: AttributeMap = {};
  const pattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/gu;
  for (const match of rawTag.matchAll(pattern)) {
    attributes[match[1]!.toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? '');
  }
  return attributes;
}

function parseXmlLocations(xml: string): string[] {
  return [...xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/giu)]
    .map((match) => decodeEntities(match[1]!.trim()))
    .filter(Boolean);
}

function parseSitemapUrlEntries(
  xml: string,
  source: string,
  issues: VerificationIssue[],
): Map<string, Map<string, string>> {
  const entries = new Map<string, Map<string, string>>();
  for (const blockMatch of xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/giu)) {
    const block = blockMatch[1]!;
    const locationMatch = block.match(/<loc\b[^>]*>([\s\S]*?)<\/loc>/iu);
    const location = locationMatch
      ? decodeEntities(locationMatch[1]!.trim())
      : '';
    if (!location) {
      issues.push(issue('sitemap', source, 'url entry is missing <loc>'));
      continue;
    }
    if (entries.has(location)) {
      issues.push(issue('sitemap', source, `duplicate <loc>${location}</loc>`));
      continue;
    }

    const alternates = new Map<string, string>();
    for (const linkMatch of block.matchAll(/<xhtml:link\b([^>]*)\/?>/giu)) {
      const attributes = parseXmlAttributes(linkMatch[1]!);
      if ((attributes.rel ?? '').toLowerCase() !== 'alternate') continue;
      const hreflang = (attributes.hreflang ?? '').toLowerCase();
      const href = attributes.href ?? '';
      if (!hreflang || !href) {
        issues.push(
          issue(
            'sitemap',
            location,
            'xhtml:link alternate is missing hreflang or href',
          ),
        );
        continue;
      }
      if (alternates.has(hreflang)) {
        issues.push(
          issue('sitemap', location, `duplicate xhtml hreflang="${hreflang}"`),
        );
        continue;
      }
      alternates.set(hreflang, href);
    }
    entries.set(location, alternates);
  }
  return entries;
}

async function validateSitemaps(
  pages: readonly ExpectedPage[],
): Promise<VerificationIssue[]> {
  const issues: VerificationIssue[] = [];
  const sitemapIndexPath = join(DIST_DIR, 'sitemap-index.xml');
  if (!(await isFile(sitemapIndexPath))) {
    return [
      issue('sitemap', 'sitemap-index.xml', 'missing generated sitemap index'),
    ];
  }

  const sitemapIndex = await readFile(sitemapIndexPath, 'utf8');
  const childUrls = parseXmlLocations(sitemapIndex);
  if (childUrls.length === 0) {
    issues.push(
      issue('sitemap', 'sitemap-index.xml', 'contains no child sitemap locations'),
    );
  }
  if (new Set(childUrls).size !== childUrls.length) {
    issues.push(
      issue('sitemap', 'sitemap-index.xml', 'contains duplicate child sitemap locations'),
    );
  }

  const sitemapEntries = new Map<string, Map<string, string>>();
  for (const childUrlValue of childUrls) {
    let childUrl: URL;
    try {
      childUrl = new URL(childUrlValue);
    } catch {
      issues.push(
        issue('sitemap', 'sitemap-index.xml', `invalid child URL "${childUrlValue}"`),
      );
      continue;
    }
    if (childUrl.origin !== SITE_ORIGIN || childUrl.search || childUrl.hash) {
      issues.push(
        issue(
          'sitemap',
          'sitemap-index.xml',
          `child sitemap must be a same-origin URL without query/hash: "${childUrlValue}"`,
        ),
      );
      continue;
    }
    const childPath = localOutputPathForUrl(childUrl);
    if (!childPath || extname(childPath) !== '.xml' || !(await isFile(childPath))) {
      issues.push(
        issue(
          'sitemap',
          'sitemap-index.xml',
          `missing child sitemap file for "${childUrlValue}"`,
        ),
      );
      continue;
    }

    const childXml = await readFile(childPath, 'utf8');
    const childEntries = parseSitemapUrlEntries(
      childXml,
      relative(DIST_DIR, childPath),
      issues,
    );
    for (const [location, alternates] of childEntries) {
      if (sitemapEntries.has(location)) {
        issues.push(
          issue('sitemap', location, 'location occurs in multiple child sitemaps'),
        );
      } else {
        sitemapEntries.set(location, alternates);
      }
    }
  }

  const indexablePages = pages.filter(({ indexable }) => indexable);
  const expectedLocations = new Map(
    indexablePages.map((page) => [page.canonicalUrl, page] as const),
  );

  for (const [location, page] of expectedLocations) {
    const actualAlternates = sitemapEntries.get(location);
    if (!actualAlternates) {
      issues.push(
        issue('sitemap', pageContext(page), `missing sitemap location "${location}"`),
      );
      continue;
    }

    const expectedAlternates = expectedHreflangs(page);
    for (const [hreflang, expectedHref] of expectedAlternates) {
      const actualHref = actualAlternates.get(hreflang);
      if (!actualHref) {
        issues.push(
          issue(
            'sitemap',
            pageContext(page),
            `missing xhtml hreflang="${hreflang}"`,
          ),
        );
      } else if (actualHref !== expectedHref) {
        issues.push(
          issue(
            'sitemap',
            pageContext(page),
            `xhtml hreflang="${hreflang}" expected encoded URL "${expectedHref}", received "${actualHref}"`,
          ),
        );
      }
    }
    for (const hreflang of actualAlternates.keys()) {
      if (!expectedAlternates.has(hreflang)) {
        issues.push(
          issue(
            'sitemap',
            pageContext(page),
            `unexpected xhtml hreflang="${hreflang}"`,
          ),
        );
      }
    }
  }

  for (const location of sitemapEntries.keys()) {
    if (!expectedLocations.has(location)) {
      issues.push(issue('sitemap', location, 'unexpected/non-indexable sitemap URL'));
    }
  }

  if (sitemapEntries.size !== indexablePages.length) {
    issues.push(
      issue(
        'sitemap',
        'all sitemap files',
        `expected exactly ${indexablePages.length} indexable URLs, found ${sitemapEntries.size}`,
      ),
    );
  }

  return issues;
}

async function validateRobotsTxt(): Promise<VerificationIssue[]> {
  const robotsPath = join(DIST_DIR, 'robots.txt');
  if (!(await isFile(robotsPath))) {
    return [issue('robots', 'robots.txt', 'missing generated robots.txt')];
  }
  const robots = await readFile(robotsPath, 'utf8');
  const sitemapDeclarations = robots
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => /^sitemap\s*:/iu.test(line))
    .map((line) => line.replace(/^sitemap\s*:\s*/iu, ''));
  const expected = `${SITE_URL}/sitemap-index.xml`;

  if (sitemapDeclarations.length !== 1) {
    return [
      issue(
        'robots',
        'robots.txt',
        `expected exactly 1 Sitemap declaration, found ${sitemapDeclarations.length}`,
      ),
    ];
  }
  if (sitemapDeclarations[0] !== expected) {
    return [
      issue(
        'robots',
        'robots.txt',
        `expected Sitemap declaration "${expected}", received "${sitemapDeclarations[0]}"`,
      ),
    ];
  }
  return [];
}

function printIssues(issues: readonly VerificationIssue[]): void {
  const sorted = [...issues].sort((left, right) =>
    `${left.category}\u0000${left.context}\u0000${left.message}`.localeCompare(
      `${right.category}\u0000${right.context}\u0000${right.message}`,
    ),
  );
  let previousCategory = '';
  for (const current of sorted) {
    if (current.category !== previousCategory) {
      console.error(`\n[${current.category}]`);
      previousCategory = current.category;
    }
    console.error(`- ${current.context}: ${current.message}`);
  }
}

async function main(): Promise<void> {
  const issues: VerificationIssue[] = [];
  if (!(await isFile(join(DIST_DIR, 'index.html')))) {
    throw new Error('dist is missing. Run "bun run build" before verify:seo.');
  }

  const pages = buildExpectedPages();
  const registeredPages = pages.filter(({ routeKey }) => routeKey);
  const expectedHtmlPageCount = registeredPages.length + 1;

  const pagesByCanonical = new Map<string, ExpectedPage[]>();
  for (const page of pages) {
    const matches = pagesByCanonical.get(page.canonicalUrl) ?? [];
    matches.push(page);
    pagesByCanonical.set(page.canonicalUrl, matches);
  }
  for (const [canonicalUrl, matches] of pagesByCanonical) {
    if (matches.length < 2) continue;
    issues.push(
      issue(
        'coverage',
        matches.map(({ label }) => label).join(', '),
        `route registry collision at canonical "${canonicalUrl}"`,
      ),
    );
  }

  const expectedOutputPaths = new Set(pages.map(({ outputPath }) => outputPath));
  const actualHtmlFiles = await collectHtmlFiles(DIST_DIR);
  for (const outputPath of expectedOutputPaths) {
    if (!(await isFile(outputPath))) {
      const page = pages.find((item) => item.outputPath === outputPath)!;
      issues.push(
        issue(
          'coverage',
          pageContext(page),
          `missing output ${relative(DIST_DIR, outputPath)}`,
        ),
      );
    }
  }
  for (const outputPath of actualHtmlFiles) {
    if (!expectedOutputPaths.has(outputPath)) {
      issues.push(
        issue(
          'coverage',
          relative(DIST_DIR, outputPath),
          'unexpected HTML output not represented in the route registry or 404',
        ),
      );
    }
  }
  if (actualHtmlFiles.length !== expectedHtmlPageCount) {
    issues.push(
      issue(
        'coverage',
        'dist',
        `expected exactly ${expectedHtmlPageCount} registered + 404 HTML files, found ${actualHtmlFiles.length}`,
      ),
    );
  }

  const pageMetadata: PageMetadata[] = [];
  for (const page of pages) {
    if (!(await isFile(page.outputPath))) continue;
    const html = await readFile(page.outputPath, 'utf8');
    const tags = parseStartTags(html);
    const documentResult = validateDocumentMetadata(page, html, tags);
    issues.push(...documentResult.issues);
    issues.push(...validateHreflangs(page, tags));
    issues.push(...validateJsonLd(page, html, tags));
    issues.push(
      ...await validateSocialMetadata(page, tags, documentResult.metadata),
    );
    pageMetadata.push(documentResult.metadata);
  }

  issues.push(...validateDuplicates(pageMetadata));
  issues.push(...await validateSitemaps(pages));
  issues.push(...await validateRobotsTxt());

  if (issues.length > 0) {
    printIssues(issues);
    console.error(
      `\nSEO build verification failed with ${issues.length} issue${
        issues.length === 1 ? '' : 's'
      } across ${pages.length} expected pages.`,
    );
    process.exitCode = 1;
    return;
  }

  const indexableCount = pages.filter(({ indexable }) => indexable).length;
  const noindexCount = pages.length - indexableCount;
  console.log(
    `SEO build verification passed: ${pages.length} HTML pages (${indexableCount} indexable, ${noindexCount} noindex), exact metadata/hreflang/social/schema coverage, ${indexableCount} sitemap URLs, and robots.txt.`,
  );
}

await main();
