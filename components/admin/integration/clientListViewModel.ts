import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IIntegrationService,
  IntegrationClient,
} from "lib/services/integration";

export class IntegrationClientListViewModel extends BaseViewModel {
  data: IntegrationClient[] = [];
  searchText: string = "";

  constructor(readonly integrationService: IIntegrationService) {
    super();
    makeObservable(this, {
      data: observable,
      searchText: observable,
      setSearchValue: action,
      fetch: action,
      disable: action,
    });
  }

  setSearchValue(searchText: string = "", offset: number = 0) {
    this.searchText = searchText;
    this.offset = offset;
    this.fetch();
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.integrationService.fetchClients(
      this.limit,
      this.offset,
      this.searchText,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;
      if (result.error) this.setErrorMessage(result.error);
    });
  }

  async disable(id: string): Promise<void> {
    const result = await this.integrationService.disableClient(id);
    if (!result.success) {
      this.setErrorMessage(result.message || "Unable to disable client");
      return;
    }
    this.fetch(true);
  }
}
