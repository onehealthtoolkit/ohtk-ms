import { BaseViewModel } from "lib/baseViewModel";
import { Authority } from "lib/services/authority";
import { IAuthorityService } from "lib/services/authority/authorityService";
import { IVillageService, Village } from "lib/services/village";
import { computed, makeObservable, observable } from "mobx";

export class AuthorityViewViewModel extends BaseViewModel {
  _id: string = "";
  _data: Authority = {} as Authority;
  _inheritsDown?: Authority[] = undefined;
  _villages: Village[] = [];

  constructor(
    id: string,
    readonly authorityService: IAuthorityService,
    readonly villageService: IVillageService
  ) {
    super();
    makeObservable(this, {
      _id: observable,
      id: computed,
      _data: observable,
      data: computed,
      _inheritsDown: observable,
      inheritsDown: computed,
      _villages: observable,
      villages: computed,
    });
    this.id = id;
  }

  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get data(): Authority {
    return this._data;
  }
  set data(value: Authority) {
    this._data = value;
  }

  get inheritsDown(): Authority[] | undefined {
    return this._inheritsDown;
  }
  set inheritsDown(value: Authority[] | undefined) {
    this._inheritsDown = value;
  }

  get villages(): Village[] {
    return this._villages;
  }
  set villages(value: Village[]) {
    this._villages = value;
  }

  async fetch(includeVillages = false) {
    this.isLoading = true;
    const data = await (await this.authorityService.getAuthority(this.id)).data;
    if (data) {
      this.data = data;
    }

    this.inheritsDown =
      await this.authorityService.lookupAuthorityInheritsDownShallow(this.id);
    if (includeVillages) {
      const result = await this.villageService.fetchVillages(500, 0, "", true);
      const authorityId = parseInt(this.id);
      this.villages = (result.items || []).filter(
        village => village.authorityId === authorityId
      );
    } else {
      this.villages = [];
    }
    this.isLoading = false;
  }
}
