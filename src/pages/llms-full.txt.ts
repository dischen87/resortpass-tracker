import { centralFacts, licensedMedia } from '../data';

export const prerender = true;

const siteUrl = 'https://www.resortpass-europapark.ch';

export function GET() {
  const lines = [
    '# ResortPass Tracker — facts, provenance and reuse notes',
    '',
    `Canonical overview: ${siteUrl}/llms.txt`,
    '',
    '## Interpretation',
    '',
    '- This is an independent editorial and planning service, not an Europa-Park operator channel.',
    '- `checkedAt` records the last editorial source check. `nextReviewAt` is the scheduled recheck, not a validity guarantee.',
    '- `validUntil: open` means the source did not publish a fixed end date; recheck before relying on the value.',
    '- Source priority 1 is an operator/owner source, 2 a public authority or official destination body, and 3 a rights registry.',
    '- Dynamic prices, availability, queues, opening hours and reservation rules can change after the check time.',
    '',
    '## Source-backed facts',
    '',
  ];

  for (const fact of centralFacts) {
    lines.push(
      `### ${fact.label}`,
      '',
      `- id: ${fact.id}`,
      `- topic: ${fact.topic}`,
      `- value: ${fact.value}${fact.unit ? ` ${fact.unit}` : ''}`,
      `- qualifier: ${fact.qualifier}`,
      `- validFrom: ${fact.validFrom || 'open'}`,
      `- validUntil: ${fact.validUntil || 'open'}`,
      `- checkedAt: ${fact.checkedAt}`,
      `- nextReviewAt: ${fact.nextReviewAt}`,
      `- confidence: ${fact.confidence}`,
      `- sourcePriority: ${fact.sourcePriority}`,
      `- source: ${fact.sourceUrl}`,
      `- caveat: ${fact.caveat || 'none recorded'}`,
      '',
    );
  }

  lines.push(
    '## Locally used Creative Commons media',
    '',
  );

  for (const media of licensedMedia.filter((item) => item.downloaded)) {
    lines.push(
      `### ${media.title}`,
      '',
      `- local URL: ${siteUrl}${media.localPath}`,
      `- file page: ${media.filePageUrl}`,
      `- creator: ${media.author}`,
      `- attribution: ${media.attributionText}`,
      `- license: ${media.licenseId} — ${media.licenseUrl}`,
      `- modification: ${media.derivativeDescription}`,
      `- checkedAt: ${media.checkedAt}`,
      '',
    );
  }

  lines.push(
    '## Live endpoints',
    '',
    `- ResortPass status: ${siteUrl}/api/status`,
    `- Localized status feed: ${siteUrl}/api/feed.xml?lang=de (replace de with a published language code)`,
    '- Live endpoints may be cached briefly and should not be republished as historical or guaranteed operator data.',
    '',
  );

  return new Response(`${lines.join('\n')}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
