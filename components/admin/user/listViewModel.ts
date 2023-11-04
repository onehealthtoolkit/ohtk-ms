import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IUserService, User } from "lib/services/user";
import { Authority } from "lib/services/authority";

export class AdminUserListViewModel extends BaseViewModel {
  data: User[] = [];

  nameSearch: string = "";
  roleSearch: string = "";
  authoritiesSearch: Pick<Authority, "id" | "code" | "name">[] = [];

  constructor(readonly userService: IUserService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      roleSearch: observable,
      authoritiesSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  setSearchValue(
    nameSearch: string = "",
    authoritiesSearch: Pick<Authority, "id" | "code" | "name">[],
    roleSearch: string,
    offset: number = 0
  ) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.authoritiesSearch = authoritiesSearch;
    this.roleSearch = roleSearch;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.userService.fetchUsers(
      this.limit,
      this.offset,
      this.nameSearch,
      this.authoritiesSearch,
      this.roleSearch,
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

  async delete(id: string): Promise<void> {
    const result = await this.userService.deleteUser(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async getLoginQrcodeToken(userId: string): Promise<string | undefined> {
    const result = await this.userService.getLoginQrToken(userId);
    return result.data;
  }
}
