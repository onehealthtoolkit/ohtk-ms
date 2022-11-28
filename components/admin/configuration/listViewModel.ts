import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IConfigurationService,
  Configuration,
} from "lib/services/configuration";

export class ConfigurationListViewModel extends BaseViewModel {
  data: Configuration[] = [];

  nameSearch: string = "";

  constructor(readonly configurationService: IConfigurationService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearCodeSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    const result = await this.configurationService.fetchConfigurations(
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
    const result = await this.configurationService.deleteConfiguration(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
