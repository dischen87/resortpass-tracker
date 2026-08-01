/**
 * Extracts the published age and height minimums from the operator's own
 * attraction pages. Deterministic parsing only — these numbers are safety
 * relevant and must never be guessed.
 */
import { rides } from '../src/data/rides';

const BASE = 'https://www.europapark.de/de/freizeitpark/attraktionen';

/** Official page slugs, verified by checking the page names the ride. */
const SLUGS: Record<string, string> = {
  'alpine-express-enzian': 'alpenexpress-enzian',
  'josefinas-imperial-journey': 'josefinas-kaiserliche-zauberreise',
  'tiroler-wildwasserbahn': 'tiroler-wildwasserbahn',
  'vienna-wave-swing': 'wiener-wellenflieger-glueckspilz',
  'voltron-nevera': 'voltron-nevera-powered-rimac',
  'arena-of-football': 'arena-football-be-part-it',
  'euro-tower': 'euro-tower',
  'eurosat-cancan-coaster': 'eurosat-cancan-coaster',
  'eurosat-coastiality': 'eurosat-coastiality',
  'madame-freudenreich-curiosites': 'madame-freudenreich-curiosites',
  'silver-star': 'silver-star',
  'jim-knopf': 'jim-knopf-reise-durch-lummerland',
  'voletarium': 'voletarium',
  'atlantis-adventure': 'abenteuer-atlantis',
  'pegasus': 'pegasus-die-youngstar-achterbahn',
  'poseidon': 'wasserachterbahn-poseidon',
  'blue-fire-megacoaster': 'blue-fire-megacoaster',
  'whale-adventures': 'whale-adventures-northern-lights',
  'wodan-timburcoaster': 'wodan-timburcoaster',
  'baaa-express': 'ba-express',
  'dancing-dingie': 'dancing-dingie',
  'old-mac-donalds-tractor-fun': 'old-mac-donalds-tractor-fun',
  'castello-dei-medici': 'castello-dei-medici',
  'volo-da-vinci': 'volo-da-vinci',
  'grand-prix-edventure': 'grand-prix-edventure',
  'arthur': 'arthur',
  'poppy-towers': 'poppy-towers',
  'piraten-in-batavia': 'piraten-batavia',
  'atlantica-supersplash': 'atlantica-supersplash',
  'euro-mir': 'euro-mir',
  'fjord-rafting': 'fjord-rafting',
  'snorri-touren': 'snorri-touren',
  'vindjammer': 'vindjammer',
  'kolumbusjolle': 'kolumbusjolle',
  'matterhorn-blitz': 'matterhorn-blitz',
  'schweizer-bobbahn': 'schweizer-bobbahn',
};

function textify(htmlSource: string): string {
  let t = htmlSource.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ');
  t = t.replace(/<[^>]+>/g, '|');
  t = t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#\d+;/g, ' ')
       .replace(/&auml;/g, 'ä').replace(/&ouml;/g, 'ö').replace(/&uuml;/g, 'ü')
       .replace(/&szlig;/g, 'ß').replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö').replace(/&Uuml;/g, 'Ü');
  return t.replace(/\|+/g, '|').replace(/[ \t]+/g, ' ');
}

/** Returns the segment following a labelled field, or null. */
function fieldAfter(text: string, label: string, span = 260): string | null {
  const idx = text.indexOf(`|${label}|`);
  if (idx < 0) return null;
  return text.slice(idx + label.length + 2, idx + label.length + 2 + span);
}

interface Extracted {
  slug: string;
  ok: boolean;
  url: string;
  minAge: number | null;
  minHeight: number | null;
  accompaniedUntilAge: number | null;
  accompaniedUntilHeight: number | null;
  maxHeight: number | null;
  pregnancyAllowed: boolean | null;
  evidenceAge: string | null;
  evidenceHeight: string | null;
  note?: string;
}

async function scrape(slug: string, name: string): Promise<Extracted> {
  const path = SLUGS[slug];
  const url = `${BASE}/${path}`;
  const base: Extracted = { slug, ok: false, url, minAge: null, minHeight: null,
    accompaniedUntilAge: null, accompaniedUntilHeight: null, maxHeight: null, pregnancyAllowed: null,
    evidenceAge: null, evidenceHeight: null };
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; resortpass-tracker editorial check)' }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) return { ...base, note: `HTTP ${res.status}` };
    const text = textify(await res.text());

    const ageBlock = fieldAfter(text, 'Alter');
    const heightBlock = fieldAfter(text, 'Größe');
    const pregBlock = fieldAfter(text, 'Schwangere', 120);

    const minAgeM = ageBlock?.match(/(\d{1,2})\s*\+\s*Jahre/);
    const accAgeM = ageBlock?.match(/unter\s*(\d{1,2})\s*Jahren?\s*nur in Begleitung/i);
    // Two published forms: "120+ cm" and "120 bis 195 cm". Missing the range
    // form reported a 130 cm minimum as no minimum at all — the one direction
    // this data must never be wrong in.
    const minHM = heightBlock?.match(/(\d{2,3})\s*\+\s*cm/);
    const rangeHM = heightBlock?.match(/(\d{2,3})\s*bis\s*(\d{2,3})\s*cm/);
    const accHM = heightBlock?.match(/unter\s*(\d{2,3})\s*cm\s*nur in Begleitung/i);

    return {
      ...base,
      ok: Boolean(ageBlock || heightBlock),
      minAge: minAgeM ? Number(minAgeM[1]) : (ageBlock ? 0 : null),
      minHeight: minHM ? Number(minHM[1]) : rangeHM ? Number(rangeHM[1]) : (heightBlock ? 0 : null),
      maxHeight: rangeHM ? Number(rangeHM[2]) : null,
      accompaniedUntilAge: accAgeM ? Number(accAgeM[1]) : null,
      accompaniedUntilHeight: accHM ? Number(accHM[1]) : null,
      pregnancyAllowed: pregBlock ? !/verboten|nicht erlaubt|nicht gestattet/i.test(pregBlock) : null,
      evidenceAge: ageBlock?.replace(/\|/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) || null,
      evidenceHeight: heightBlock?.replace(/\|/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110) || null,
    };
  } catch (error) {
    return { ...base, note: error instanceof Error ? error.message : String(error) };
  }
}

const results: Extracted[] = [];
for (const ride of rides) {
  if (!SLUGS[ride.slug]) { console.error(`kein Slug: ${ride.slug}`); continue; }
  results.push(await scrape(ride.slug, ride.name));
  await new Promise((r) => setTimeout(r, 350));
}
await Bun.write('/tmp/attractions-scraped.json', JSON.stringify(results, null, 2));
const ok = results.filter((r) => r.ok);
console.log(`${ok.length}/${results.length} Seiten mit auswertbaren Angaben`);
for (const r of results.filter((r) => !r.ok)) console.log(`  fehlt: ${r.slug} (${r.note || 'kein Feld gefunden'})`);
