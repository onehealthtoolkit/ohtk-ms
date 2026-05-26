import { AnimalSpecies, IAnimalSpeciesService } from "lib/services/census";
import { SaveResult } from "lib/services/interface";
import { AnimalSpeciesViewModel } from "./animalSpeciesViewModel";

export class AnimalSpeciesUpdateViewModel extends AnimalSpeciesViewModel {
  id: number;

  constructor(id: number, animalSpeciesService: IAnimalSpeciesService) {
    super(animalSpeciesService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.animalSpeciesService.getAnimalSpecies(this.id)
    ).data;
    if (data) {
      this.code = data.code;
      this.name = data.name;
      this.active = data.active;
      this.sortOrder = data.sortOrder;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<AnimalSpecies>> {
    return this.animalSpeciesService.updateAnimalSpecies(
      this.id,
      this.code,
      this.name,
      this.active,
      this.sortOrder
    );
  }
}
