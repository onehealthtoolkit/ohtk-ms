import { BaseViewModel } from "lib/baseViewModel";
import { User } from "lib/services/user";
import { IUserService } from "lib/services/user/userService";
import { makeObservable, observable } from "mobx";

export class UserViewViewModel extends BaseViewModel {
  id: string;
  data: User = {} as User;

  constructor(id: string, readonly userService: IUserService) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
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
