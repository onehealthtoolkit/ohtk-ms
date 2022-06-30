import { BaseViewModel } from "lib/baseViewModel";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { makeObservable, observable } from "mobx";

export class ReportTypeViewViewModel extends BaseViewModel {
  id: string;
  data: ReportType = {} as ReportType;

  constructor(id: string, readonly reportTypeService: IReportTypeService) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
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
