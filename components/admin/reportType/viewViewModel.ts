import { BaseViewModel } from "lib/baseViewModel";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { computed, makeObservable, observable } from "mobx";

export class ReportTypeViewViewModel extends BaseViewModel {
  id: string;
  _data: ReportType = {} as ReportType;

  constructor(id: string, readonly reportTypeService: IReportTypeService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): ReportType {
    return this._data;
  }
  set data(value: ReportType) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.reportTypeService.getReportType(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
