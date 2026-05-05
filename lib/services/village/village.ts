import { AnimalCensusFact } from "lib/services/animalSpecies";

export type Village = {
  id: string;
  code: string;
  name: string;
  active: boolean;
  latitude?: number;
  longitude?: number;
  authorityId: number;
  authorityName?: string;
};

export type VillageCensusSnapshot = {
  id: string;
  censusDate: string;
  submittedAt: string;
  reporterUsername?: string;
  facts: AnimalCensusFact[];
};
