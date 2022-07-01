function pad(n: number, width: number) {
  const tmp = 10 ** width + n;
  return tmp.toString().substring(1);
}

const MONTHS = [
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

export function formatThDateTime(
  isoDateStr: string,
  long: boolean = false
): string {
  function getTimeStr(date: Date) {
    const hh = pad(date.getHours(), 2);
    const mm = pad(date.getMinutes(), 2);
    return `${hh}:${mm}`;
  }

  if (long) {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);

    const d = formatThLongDate(isoDateStr);
    return d + ` เวลา ${getTimeStr(date)}`;
  } else {
    if (!isoDateStr) return "";
    const date = new Date(isoDateStr);

    const y = date.getFullYear();
    const m = SHORT_MONTHS[date.getMonth()];
    const d = pad(date.getDate(), 2);
    return `${d} ${m} ${y + 543} ⌽ ${getTimeStr(date)}`;
  }
}

export function formatDate(isoDateStr?: string): string {
  return isoDateStr ? new Date(isoDateStr).toLocaleDateString() : "";
}

export function formatDateTime(isoDateStr?: string): string {
  if (isoDateStr) {
    const d = new Date(isoDateStr);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
  return "";
}
