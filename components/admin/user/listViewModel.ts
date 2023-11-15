import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IUserService, User } from "lib/services/user";
import { Authority } from "lib/services/authority";

export class AdminUserListViewModel extends BaseViewModel {
  data: User[] = [];

  nameSearch: string = "";
  roleSearch: string = "";
  authoritiesSearch: Pick<Authority, "id" | "code" | "name">[] = [];
  _fromDate?: Date = undefined;
  _throughDate?: Date = undefined;

  constructor(readonly userService: IUserService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      roleSearch: observable,
      authoritiesSearch: observable,
      _fromDate: observable,
      _throughDate: observable,
      fromDate: computed,
      throughDate: computed,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
    });
  }

  public get fromDate() {
    return this._fromDate;
  }

  public set fromDate(value: Date | undefined) {
    this._fromDate = value;
  }

  public get throughDate() {
    return this._throughDate;
  }

  public set throughDate(value: Date | undefined) {
    this._throughDate = value;
  }

  setSearchValue(
    nameSearch: string = "",
    authoritiesSearch: Pick<Authority, "id" | "code" | "name">[],
    roleSearch: string,
    fromDate: Date | undefined = undefined,
    throughDate: Date | undefined = undefined,
    offset: number = 0
  ) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.authoritiesSearch = authoritiesSearch;
    this.roleSearch = roleSearch;
    this.fromDate = fromDate;
    this.throughDate = throughDate;
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
      this.fromDate,
      this.throughDate,
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
