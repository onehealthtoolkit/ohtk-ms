import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { BaseViewModel } from "lib/baseViewModel";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { action, makeObservable, observable, runInAction } from "mobx";

export class AdminReportTypeListViewModel extends BaseViewModel {
  data: ReportType[] = [];
  nameSearch: string = "";

  formSimulationViewModel?: FormSimulationViewModel = undefined;

  constructor(readonly reportTypeService: IReportTypeService) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
      formSimulationViewModel: observable,
      openFormSimulationDialog: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearNameSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.reportTypeService.fetchReportTypes(
      this.limit,
      this.offset,
      this.nameSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.reportTypeService.deleteReportType(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  openFormSimulationDialog(definition: string) {
    this.formSimulationViewModel = new FormSimulationViewModel(definition);
    this.dialog("formSimulation")?.open(null);
  }
}
