import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { StateDefinition } from "lib/services/stateDefinition";
import { IStateDefinitionService } from "lib/services/stateDefinition/stateDefinitionService";

export class AdminStateDefinitionListViewModel extends BaseViewModel {
  data: StateDefinition[] = [];

  nameSearch: string = "";

  constructor(
    readonly stateDefinitionService: IStateDefinitionService,
    nameSearch: string = "",
    offset: number = 0
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });

    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    if (nameSearch != this.nameSearch || this.offset != offset) {
      this.nameSearch = nameSearch;
      this.offset = offset;
      this.fetch();
    }
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(): Promise<void> {
    const result = await this.stateDefinitionService.fetchStateDefinitions(
      this.limit,
      this.offset,
      this.nameSearch
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
    const result = await this.stateDefinitionService.deleteStateDefinition(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
