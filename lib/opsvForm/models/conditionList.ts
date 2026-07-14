import Decimal from "decimal.js";

/**
 * Helpers for condition operators that take a comma-separated list
 * (e.g. operator "in" with value "cat,dog,elephant").
 * Never throws: bad tokens / values evaluate as non-match.
 */

export function splitConditionList(value: string | null | undefined): string[] {
  if (value == null || value === "") {
    return [];
  }
  return String(value)
    .split(",")
    .map(v => v.trim())
    .filter(v => v.length > 0);
}

export function stringValueInList(
  current: string | null | undefined,
  listValue: string
): boolean {
  if (current == null || current === "") {
    return false;
  }
  try {
    return splitConditionList(listValue).includes(current);
  } catch {
    return false;
  }
}

/** Safe Decimal equality; returns false if either side is not a valid number. */
export function decimalEquals(
  current: Decimal | null | undefined,
  raw: string
): boolean {
  if (current == null || raw == null || String(raw).trim() === "") {
    return false;
  }
  try {
    return current.eq(new Decimal(String(raw).trim()));
  } catch {
    return false;
  }
}

export function decimalValueInList(
  current: Decimal | null | undefined,
  listValue: string
): boolean {
  if (current == null) {
    return false;
  }
  try {
    return splitConditionList(listValue).some(token =>
      decimalEquals(current, token)
    );
  } catch {
    return false;
  }
}
