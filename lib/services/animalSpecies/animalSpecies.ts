export type AnimalSpecies = {
  id: string;
  code: string;
  name: string;
  active: boolean;
  sortOrder: number;
};

export type AnimalCensusFact = {
  speciesId: string;
  speciesCode: string;
  speciesName: string;
  animalQuantity: number;
  householdQuantity: number;
};
