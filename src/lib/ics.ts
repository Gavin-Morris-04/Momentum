/** Pure ICS builders — standards-compliant VCALENDAR/VEVENT. */

export interface CalendarEventInput {
  uid: string;
  title: string;
  description: string;
  /** Local date YYYY-MM-DD */
  startDate: string;
  /** Minutes from midnight */
  startMinutes: number;
  durationMinutes: number;
  /** IANA timezone, e.g. America/Chicago */
  timeZone: string;
  /** RRULE COUNT */
  count: number;
  /** BYDAY: MO,TU,WE,TH,FR,SA,SU — omit for daily */
  byDay?: string;
  freq?: "WEEKLY" | "DAILY";
}

const CRLF = "\r\n";

export function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n/g, "\\n")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\n");
}

/** Fold lines to 75 octets (bytes), continuing with space. */
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(line);
  if (bytes.length <= 75) return line;

  const parts: string[] = [];
  let start = 0;
  let first = true;
  const decoder = new TextDecoder();

  while (start < bytes.length) {
    const limit = first ? 75 : 74;
    let end = Math.min(start + limit, bytes.length);
    // Avoid splitting a multi-byte UTF-8 sequence
    while (end > start && (bytes[end] & 0xc0) === 0x80) end -= 1;
    if (end === start) end = Math.min(start + limit, bytes.length);

    const chunk = decoder.decode(bytes.slice(start, end));
    parts.push(first ? chunk : ` ${chunk}`);
    start = end;
    first = false;
  }

  return parts.join(CRLF);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/** Format local floating datetime YYYYMMDDTHHMMSS */
export function formatLocalDateTime(dateKey: string, minutes: number): string {
  const [y, m, d] = dateKey.split("-");
  const h = Math.floor(minutes / 60);
  const min = minutes % 60;
  return `${y}${m}${d}T${pad(h)}${pad(min)}00`;
}

export function buildVEvent(event: CalendarEventInput): string {
  const dtStart = formatLocalDateTime(event.startDate, event.startMinutes);
  const endMinutes = event.startMinutes + event.durationMinutes;
  const endDate = event.startDate;
  let endKey = endDate;
  let endMin = endMinutes;
  if (endMinutes >= 24 * 60) {
    endMin = endMinutes - 24 * 60;
    const [y, m, d] = endDate.split("-").map(Number);
    const next = new Date(y, m - 1, d + 1);
    endKey = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
  }
  const dtEnd = formatLocalDateTime(endKey, endMin);
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${event.timeZone}:${dtStart}`,
    `DTEND;TZID=${event.timeZone}:${dtEnd}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    event.freq === "DAILY" || !event.byDay
      ? `RRULE:FREQ=DAILY;COUNT=${event.count}`
      : `RRULE:FREQ=WEEKLY;COUNT=${event.count};BYDAY=${event.byDay}`,
    "END:VEVENT",
  ];

  return lines.map(foldLine).join(CRLF);
}

export function buildCalendar(events: CalendarEventInput[]): string {
  const body = events.map(buildVEvent).join(CRLF);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//The Standard//Guide//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    body,
    "END:VCALENDAR",
  ];
  return lines.join(CRLF) + CRLF;
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Google Calendar template URL for a single recurring event. */
export function googleCalendarUrl(event: CalendarEventInput): string {
  const start = formatLocalDateTime(event.startDate, event.startMinutes);
  const endMinutes = event.startMinutes + event.durationMinutes;
  let endKey = event.startDate;
  let endMin = endMinutes;
  if (endMinutes >= 24 * 60) {
    endMin = endMinutes - 24 * 60;
    const [y, m, d] = event.startDate.split("-").map(Number);
    const next = new Date(y, m - 1, d + 1);
    endKey = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`;
  }
  const end = formatLocalDateTime(endKey, endMin);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    dates: `${start}/${end}`,
    ctz: event.timeZone,
    recur:
      event.freq === "DAILY" || !event.byDay
        ? `RRULE:FREQ=DAILY;COUNT=${event.count}`
        : `RRULE:FREQ=WEEKLY;COUNT=${event.count};BYDAY=${event.byDay}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export const BYDAY_MAP: Record<string, string> = {
  monday: "MO",
  tuesday: "TU",
  wednesday: "WE",
  thursday: "TH",
  friday: "FR",
  saturday: "SA",
  sunday: "SU",
};

export function nextWeekdayDate(weekday: string, from: Date = new Date()): string {
  const map: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const target = map[weekday];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const diff = (target - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function getBrowserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
