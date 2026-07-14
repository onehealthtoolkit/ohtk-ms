/**
 * Option A animal census fact rows:
 * - group:*  → household_quantity only
 * - species:* → animal_quantity only
 */

export function isGroupCensusRowKey(rowKey?: string | null): boolean {
  return !!rowKey && rowKey.startsWith("group:");
}

export function isSpeciesCensusRowKey(rowKey?: string | null): boolean {
  return !!rowKey && rowKey.startsWith("species:");
}

export function censusRowKindLabel(
  rowKey: string,
  groupLabel = "Group HH",
  speciesLabel = "Species"
): string {
  if (isGroupCensusRowKey(rowKey)) {
    return groupLabel;
  }
  if (isSpeciesCensusRowKey(rowKey)) {
    return speciesLabel;
  }
  return speciesLabel;
}

export function formatCensusFactHouseholds(
  rowKey: string,
  householdQuantity: number
): string {
  if (isGroupCensusRowKey(rowKey)) {
    return String(householdQuantity ?? 0);
  }
  if (isSpeciesCensusRowKey(rowKey)) {
    return "—";
  }
  // Legacy flat rows: both measures on each species row
  return String(householdQuantity ?? 0);
}

export function formatCensusFactAnimals(
  rowKey: string,
  animalQuantity: number
): string {
  if (isGroupCensusRowKey(rowKey)) {
    return "—";
  }
  return String(animalQuantity ?? 0);
}
