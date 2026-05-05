import { AnimalSpecies } from "lib/services/animalSpecies";
import { SaveResult } from "lib/services/interface";
import { AnimalSpeciesViewModel } from "./animalSpeciesViewModel";

export class AnimalSpeciesCreateViewModel extends AnimalSpeciesViewModel {
  public _save(): Promise<SaveResult<AnimalSpecies>> {
    return this.animalSpeciesService.createAnimalSpecies(
      this.code,
      this.name,
      this.active,
      this.sortOrder
    );
  }
}
