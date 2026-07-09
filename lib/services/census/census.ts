export type AnimalCensusFact = {
  rowKey: string;
  rowLabel: string;
  animalQuantity: number;
  householdQuantity: number;
};

export type VillageCensusSnapshot = {
  id: string;
  censusDate: string;
  submittedAt: string;
  villageHouseholdQuantity?: number | null;
  animalHouseholdQuantity?: number | null;
  reporterUsername?: string;
  facts: AnimalCensusFact[];
};
