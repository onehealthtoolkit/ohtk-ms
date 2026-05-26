import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { AnimalSpecies, IAnimalSpeciesService } from "lib/services/census";

export class AnimalSpeciesListViewModel extends BaseViewModel {
  data: AnimalSpecies[] = [];
  nameSearch: string = "";

  constructor(readonly animalSpeciesService: IAnimalSpeciesService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.animalSpeciesService.fetchAnimalSpecies(
      this.limit,
      this.offset,
      this.nameSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;
      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }
}
