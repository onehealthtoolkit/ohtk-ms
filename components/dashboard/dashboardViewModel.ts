import { computed, makeObservable, observable, runInAction } from "mobx";

export type DashBoardFilterData = {
  fromDate?: Date;
  toDate?: Date;
};

export default class DashboardViewModel {
  _authorityId: number = 0;
  authorityName: string = "";

  _fromDate: Date | undefined = undefined;
  _toDate: Date | undefined = undefined;

  constructor() {
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
    if (value) value.setHours(0, 0, 0, 0);
    this._fromDate = value;
  }
  get toDate() {
    return this._toDate;
  }

  set toDate(value: Date | undefined) {
    if (value) value.setHours(23, 59, 59, 999);
    this._toDate = value;
  }

  setSearchValue(
    authorityId: number,
    authorityName: string,
    fromDate: Date | undefined,
    toDate: Date | undefined
  ) {
    runInAction(() => {
      if (!fromDate && !toDate) {
        this.setDefaultSearchValue();
      } else {
        this.fromDate = fromDate;
        this.toDate = toDate;
      }
      this.authorityId = authorityId;
      this.authorityName = authorityName;
    });
  }

  setDefaultSearchValue() {
    const today = new Date();
    this.fromDate = new Date(new Date().setDate(today.getDate() - 30));
    this.toDate = new Date();
  }
}
