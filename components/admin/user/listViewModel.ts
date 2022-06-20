import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IUserService, User } from "lib/services/user";

export class AdminUserListViewModel extends BaseViewModel {
  data: User[] = [];

  searchText: string = "";

  constructor(readonly userService: IUserService) {
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
    const result = await this.userService.fetchUsers(this.searchText);
    runInAction(() => (this.data = result.items || []));
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
