import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Authority, IAuthorityService } from "lib/services/authority";

export class AdminAuthorityListViewModel extends BaseViewModel {
  data: Authority[] = [];

  nameSearch: string = "";

  constructor(
    readonly authorityService: IAuthorityService,
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
    const result = await this.authorityService.fetchAuthorities(
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
}
