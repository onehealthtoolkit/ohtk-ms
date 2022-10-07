function pad(n: number, width: number) {
  const tmp = 10 ** width + n;
  return tmp.toString().substring(1);
}

export const MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฏาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const SHORT_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

export function formatThLongDate(isoDateStr: string | null): string {
  if (!isoDateStr) return "";
  const date = new Date(isoDateStr);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${
    date.getFullYear() + 543
  }`;
}

export function formatThDate(
  isoDateStr: string | null,
  long: boolean = false
): string {
  if (long) {
    return formatThLongDate(isoDateStr);
  } else {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);

    const y = date.getFullYear();
    const m = SHORT_MONTHS[date.getMonth()];
    const d = pad(date.getDate(), 2);
    return `${d} ${m} ${y + 543}`;
  }
}

function getYYYYMMDD(date: Date) {
  const dd = pad(date.getDate(), 2);
  const mm = pad(date.getMonth() + 1, 2);
  const yy = date.getFullYear();
  return `${yy}-${mm}-${dd}`;
}

function getHHMM(date: Date) {
  const hh = pad(date.getHours(), 2);
  const mm = pad(date.getMinutes(), 2);
  return `${hh}:${mm}`;
}

export function formatThDateTime(
  isoDateStr: string,
  long: boolean = false
): string {
  if (long) {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);

    const d = formatThLongDate(isoDateStr);
    return d + ` เวลา ${getHHMM(date)}`;
  } else {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);

    const y = date.getFullYear();
    const m = SHORT_MONTHS[date.getMonth()];
    const d = pad(date.getDate(), 2);
    return `${d} ${m} ${y + 543} ⌽ ${getHHMM(date)}`;
  }
}

export function formatDate(isoDateStr?: string, locale?: string): string {
  return isoDateStr ? new Date(isoDateStr).toLocaleDateString(locale) : "";
}

export function formatDateTime(isoDateStr?: string, locale?: string): string {
  if (isoDateStr) {
    const d = new Date(isoDateStr);
    return `${d.toLocaleDateString(locale)} ${d.toLocaleTimeString(locale)}`;
  }
  return "";
}

export function formatYmd(isoDateStr?: string): string {
  return isoDateStr ? getYYYYMMDD(new Date(isoDateStr)) : "";
}

export function formatYmdt(isoDateStr?: string): string {
  if (isoDateStr) {
    const d = new Date(isoDateStr);
    return `${getYYYYMMDD(d)} ${getHHMM(d)}`;
  }
  return "";
}
