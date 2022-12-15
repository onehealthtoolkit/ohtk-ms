import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ObservationDefinition } from "lib/services/observationDefinition";
import { IObservationDefinitionService } from "lib/services/observationDefinition/observationDefinitionService";

export class AdminObservationDefinitionListViewModel extends BaseViewModel {
  data: ObservationDefinition[] = [];

  nameSearch: string = "";

  constructor(
    readonly observationDefinitionService: IObservationDefinitionService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    const result =
      await this.observationDefinitionService.fetchObservationDefinitions(
        this.limit,
        this.offset,
        this.nameSearch,
        force
      );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  async delete(id: string): Promise<void> {
    const result =
      await this.observationDefinitionService.deleteObservationDefinition(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
