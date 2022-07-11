import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IReportService } from "lib/services/report";
import { ReportDetail } from "lib/services/report/report";
import { ICaseService } from "lib/services/case";

export class ReportViewModel extends BaseViewModel {
  data: ReportDetail = {} as ReportDetail;
  id: string;

  constructor(
    id: string,
    readonly reportService: IReportService,
    readonly caseService: ICaseService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
      promoteToCase: action,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = (await this.reportService.getReport(this.id)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }

  public async promoteToCase(): Promise<String> {
    this.isLoading = true;
    const result = await this.caseService.promoteToCase(this.id);
    this.isLoading = false;
    return result;
  }
}
