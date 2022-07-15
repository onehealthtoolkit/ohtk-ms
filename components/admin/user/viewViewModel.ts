import { BaseViewModel } from "lib/baseViewModel";
import { User } from "lib/services/user";
import { IUserService } from "lib/services/user/userService";
import { computed, makeObservable, observable } from "mobx";

export class UserViewViewModel extends BaseViewModel {
  id: string;
  _data: User = {} as User;

  constructor(id: string, readonly userService: IUserService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): User {
    return this._data;
  }
  set data(value: User) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.userService.getUser(this.id)).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
