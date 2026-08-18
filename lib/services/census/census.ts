export type AnimalCensusFact = {
  rowKey: string;
  rowLabel: string;
  animalQuantity: number;
  householdQuantity: number;
};

export type VillageCensusFormData = {
  summary?: Record<string, number | string>;
  rows?: Array<{
    row_key?: string;
    measures?: Record<string, number | string>;
  }>;
  [key: string]: unknown;
};

export type VillageCensusSnapshot = {
  id: string;
  censusDate: string;
  submittedAt: string;
  villageHouseholdQuantity?: number | null;
  animalHouseholdQuantity?: number | null;
  reporterUsername?: string;
  definitionVersionId?: string;
  formData?: VillageCensusFormData;
  facts: AnimalCensusFact[];
};

export type SubmitVillageCensusInput = {
  villageId: number;
  definitionVersionId: number;
  occurrenceId?: number;
  censusDate: string;
  formData: VillageCensusFormData;
};
