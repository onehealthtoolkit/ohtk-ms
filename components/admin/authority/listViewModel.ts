import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Authority, IAuthorityService } from "lib/services/authority";

export class AdminAuthorityListViewModel extends BaseViewModel {
  data: Authority[] = [];

  searchText: string = "";

  constructor(readonly authorityService: IAuthorityService) {
    super();
    makeObservable(this, {
      data: observable,
      searchText: observable,
      setSearchText: action,
      clearSearchText: action,
      fetch: action,
    });
  }

  setSearchText(value: string) {
    this.searchText = value;
  }

  clearSearchText() {
    this.searchText = "";
  }

  async fetch(): Promise<void> {
    const result = await this.authorityService.fetchAuthorities(
      this.limit,
      this.offset,
      this.searchText
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
