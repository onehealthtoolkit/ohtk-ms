import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IUserService, User } from "lib/services/user";

export class AdminUserListViewModel extends BaseViewModel {
  data: User[] = [];

  nameSearch: string = "";

  constructor(readonly userService: IUserService) {
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

  async fetch(): Promise<void> {
    const result = await this.userService.fetchUsers(
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
    const result = await this.userService.deleteUser(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
