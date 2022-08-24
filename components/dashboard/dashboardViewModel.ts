import { computed, makeObservable, observable, runInAction } from "mobx";

export default class DashboardViewModel {
  _authorityId: number;
  authorityName: string;

  _fromDate: Date | undefined = undefined;
  _toDate: Date | undefined = undefined;

  constructor(authorityId: number, authorityName: string) {
    this._authorityId = authorityId;
    this.authorityName = authorityName;
    makeObservable(this, {
      _authorityId: observable,
      authorityId: computed,
      authorityName: observable,
      _fromDate: observable,
      fromDate: computed,
      _toDate: observable,
      toDate: computed,
    });
  }

  get authorityId() {
    return this._authorityId;
  }

  set authorityId(value: number) {
    this._authorityId = value;
  }

  get fromDate() {
    return this._fromDate;
  }

  set fromDate(value: Date | undefined) {
    this._fromDate = value;
  }
  get toDate() {
    return this._toDate;
  }

  set toDate(value: Date | undefined) {
    this._toDate = value;
  }

  setSearchValue(fromDate: Date | undefined, toDate: Date | undefined) {
    runInAction(() => {
      console.log("setSearchValue");
      this.fromDate = fromDate;
      this.toDate = toDate;
    });
  }
}
