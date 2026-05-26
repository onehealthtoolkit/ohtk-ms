import { CensusKind } from "lib/services/census";

export function formatPublishedAt(value?: string | null) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

export function formatCensusKind(
  t: (key: string, fallback: string) => string,
  kind: CensusKind
) {
  return t(`censusDefinition.kind.${kind}`, kind);
}
