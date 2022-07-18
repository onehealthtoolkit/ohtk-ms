import { computed, makeObservable, observable } from "mobx";

export default class DashboardViewModel {
  _authorityId: number;
  authorityName: string;

  constructor(authorityId: number, authorityName: string) {
    this._authorityId = authorityId;
    this.authorityName = authorityName;
    makeObservable(this, {
      _authorityId: observable,
      authorityId: computed,
      authorityName: observable,
    });
  }

  get authorityId() {
    return this._authorityId;
  }

  set authorityId(value: number) {
    this._authorityId = value;
  }
}
