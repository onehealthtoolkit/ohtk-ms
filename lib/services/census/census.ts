export type AnimalCensusFact = {
  speciesId: string;
  speciesCode: string;
  speciesName: string;
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
