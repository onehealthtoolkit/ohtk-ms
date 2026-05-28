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
  reporterUsername?: string;
  facts: AnimalCensusFact[];
};
