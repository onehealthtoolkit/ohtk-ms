import { BaseViewModel } from "lib/baseViewModel";
import { Contribution, User } from "lib/services/user";
import { IUserService } from "lib/services/user/userService";
import { computed, makeObservable, observable } from "mobx";

export class UserViewViewModel extends BaseViewModel {
  id: string;
  _data: User = {} as User;
  _contribution?: { string: number } = undefined;

  constructor(id: string, readonly userService: IUserService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
      _contribution: observable,
      contribution: computed,
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

  get contribution(): { string: number } | undefined {
    return this._contribution;
  }
  set contribution(value: { string: number } | undefined) {
    this._contribution = value;
  }

  async fetch() {
    this.isLoading = true;

    const data = await (await this.userService.getUser(this.id)).data;
    if (data) {
      this.data = data;
    }

    const today = new Date();
    const fromDate = new Date(today.getFullYear(), 0, 1);
    const toDate = new Date();
    const contributionData = await this.userService.fetchContribution(
      +this.id,
      fromDate,
      toDate
    );
    this.contribution = contributionData.reduce(function (
      map: any,
      obj: Contribution
    ) {
      map[obj.day] = obj.total;
      return map;
    },
    {});

    this.isLoading = false;
  }
}
