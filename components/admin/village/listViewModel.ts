import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IVillageService, Village } from "lib/services/village";
import { ICensusCapabilityService } from "lib/services/census";

export class VillageListViewModel extends BaseViewModel {
  data: Village[] = [];
  nameSearch: string = "";
  villageEnabled: boolean = false;
  animalCensusEnabled: boolean = false;
  capabilityError: string = "";
  isUpdatingCapability: boolean = false;

  constructor(
    readonly villageService: IVillageService,
    readonly censusCapabilityService: ICensusCapabilityService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      villageEnabled: observable,
      animalCensusEnabled: observable,
      capabilityError: observable,
      isUpdatingCapability: observable,
      setSearchValue: action,
      fetch: action,
      fetchCapabilities: action,
      setAnimalCensusEnabled: action,
    });
    this.fetchCapabilities();
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.villageService.fetchVillages(
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

  async fetchCapabilities(force?: boolean): Promise<void> {
    const result = await this.censusCapabilityService.getCapabilities(force);
    runInAction(() => {
      if (result.data) {
        this.villageEnabled = result.data.villageEnabled;
        this.animalCensusEnabled = result.data.animalCensusEnabled;
      }
      this.capabilityError = result.error || "";
    });
  }

  async setAnimalCensusEnabled(enabled: boolean): Promise<void> {
    this.isUpdatingCapability = true;
    this.capabilityError = "";
    const previousValue = this.animalCensusEnabled;
    this.animalCensusEnabled = enabled;
    const result =
      await this.censusCapabilityService.updateAnimalCensusCapability(enabled);
    runInAction(() => {
      this.isUpdatingCapability = false;
      if (!result.success) {
        this.animalCensusEnabled = previousValue;
        this.capabilityError =
          result.message ||
          (result.fields as Record<string, string> | undefined)
            ?.animal_census_enabled ||
          "Unable to update Animal census capability";
      }
    });
  }
}
