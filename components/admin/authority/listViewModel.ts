import { action, makeObservable, observable, runInAction } from "mobx";
import { Authority, IAuthorityService } from "lib/services/authority";
import { BaseViewModel } from "lib/baseViewModel";

export class AdminAuthorityListViewModel extends BaseViewModel {
  data: Authority[] = [];

  nameSearch: string = "";

  constructor(readonly authorityService: IAuthorityService) {
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
    const result = await this.authorityService.fetchAuthorities(
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
    const result = await this.authorityService.deleteAuthority(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
