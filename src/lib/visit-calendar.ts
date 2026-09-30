/** Calendar export follows RFC 5545: DATE values, exclusive DTEND and UTF-8 folding. */
export interface VisitCalendarInput {
  date: string;
  days: number;
  summary: string;
  description: string;
  url: string;
  uid: string;
  createdAt?: Date;
  location?: string;
}

export function getRecommendedVisitDays(
  requestedDays: number,
  crowd: string,
  arrival: string,
  includesRulantica: boolean,
): number {
  let days = Math.min(3, Math.max(1, Number.isInteger(requestedDays) ? requestedDays : 2));
  if ((crowd === 'high' || arrival === 'late') && days === 1) days = 2;
  if (includesRulantica && days < 2) days = 2;
  if (includesRulantica && crowd === 'high' && days < 3) days = 3;
  return days;
}

function parseDate(date: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) throw new RangeError('Expected a valid YYYY-MM-DD date');
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(0);
  // setUTCFullYear avoids Date.UTC treating years 00–99 as 1900–1999.
  parsed.setUTCFullYear(year, month - 1, day);
  parsed.setUTCHours(0, 0, 0, 0);
  if (
    year < 1 || parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day
  ) throw new RangeError('Expected a valid calendar date');
  return parsed;
}

export function getAllDayRange(date: string, days: number): { start: string; end: string } {
  if (!Number.isInteger(days) || days < 1 || days > 3) {
    throw new RangeError('A visit plan covers one to three days');
  }
  const start = parseDate(date);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + days);
  if (end.getUTCFullYear() > 9999) throw new RangeError('Calendar end date exceeds year 9999');
  const format = (value: Date) => value.toISOString().slice(0, 10).replaceAll('-', '');
  return { start: format(start), end: format(end) };
}

export function escapeCalendarText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replaceAll('\\', '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replaceAll(';', '\\;')
    .replaceAll(',', '\\,');
}

const encoder = new TextEncoder();

/** Fold at 75 octets, counting the continuation space and preserving code points. */
export function foldCalendarLine(line: string): string {
  let folded = '';
  let octets = 0;
  for (const character of line) {
    const width = encoder.encode(character).length;
    if (octets + width > 75) {
      folded += '\r\n ';
      octets = 1;
    }
    folded += character;
    octets += width;
  }
  return folded;
}

export function createVisitCalendar(input: VisitCalendarInput): string {
  const { start, end } = getAllDayRange(input.date, input.days);
  const stamp = input.createdAt ?? new Date();
  if (!Number.isFinite(stamp.getTime()) || stamp.getUTCFullYear() < 1 || stamp.getUTCFullYear() > 9999) {
    throw new RangeError('Expected a valid creation timestamp');
  }
  if (!/^[a-zA-Z0-9@._-]+$/.test(input.uid)) throw new RangeError('Expected a safe calendar UID');
  if (/[\r\n]/.test(input.url)) throw new RangeError('Expected a safe calendar URL');
  const url = new URL(input.url);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new RangeError('Expected an HTTP calendar URL');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ResortPass Tracker//Visit Planner//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${input.uid}`,
    `DTSTAMP:${stamp.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeCalendarText(input.summary)}`,
    `DESCRIPTION:${escapeCalendarText(input.description)}`,
    `LOCATION:${escapeCalendarText(input.location ?? 'Europa-Park, Rust, Deutschland')}`,
    `URL:${url.href}`,
    'STATUS:TENTATIVE',
    'TRANSP:TRANSPARENT',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return `${lines.map(foldCalendarLine).join('\r\n')}\r\n`;
}
