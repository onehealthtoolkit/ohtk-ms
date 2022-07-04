import { BaseViewModel } from "lib/baseViewModel";
import { Authority } from "lib/services/authority";
import { IAuthorityService } from "lib/services/authority/authorityService";
import { makeObservable, observable } from "mobx";

export class AuthorityViewViewModel extends BaseViewModel {
  id: string;
  data: Authority = {} as Authority;

  constructor(id: string, readonly authorityService: IAuthorityService) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.authorityService.getAuthority(this.id)).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
