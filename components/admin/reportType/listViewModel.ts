import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { BaseViewModel } from "lib/baseViewModel";
import { SaveResult } from "lib/services/interface";
import { IReportCategoryService } from "lib/services/reportCategory";
import { ReportType } from "lib/services/reportType";
import { IReportTypeService } from "lib/services/reportType/reportTypeService";
import { IStateDefinitionService } from "lib/services/stateDefinition";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

export class AdminReportTypeListViewModel extends BaseViewModel {
  data: ReportType[] = [];
  nameSearch: string = "";

  formSimulationViewModel?: FormSimulationViewModel = undefined;

  _submitError: string = "";
  _isSubmitting: boolean = false;

  constructor(
    readonly reportTypeService: IReportTypeService,
    readonly reportCategoryService: IReportCategoryService,
    readonly stateDefinitionService: IStateDefinitionService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearNameSearch: action,
      fetch: action,
      formSimulationViewModel: observable,
      openFormSimulationDialog: action,
      exportReportType: action,
      _submitError: observable,
      _isSubmitting: observable,
      submitError: computed,
      isSubmitting: computed,
      publishReportType: action,
      unpublishReportType: action,
    });
  }

  public get submitError(): string {
    return this._submitError;
  }

  public set submitError(value: string) {
    this._submitError = value;
  }

  public get isSubmitting(): boolean {
    return this._isSubmitting;
  }

  public set isSubmitting(value: boolean) {
    this._isSubmitting = value;
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

  async exportReportType(id: string) {
    this.isLoading = true;
    const data = await (await this.reportTypeService.getReportType(id)).data;
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(
            JSON.stringify(
              {
                id: data.id,
                name: data.name,
                definition: JSON.parse(data.definition || "{}"),
                categoryName: data.categoryName,
                stateDefinitionName: data.stateDefinitionName,
                ordering: data.ordering,
                rendererDataTemplate: data.rendererDataTemplate || "",
                followupDefinition: JSON.parse(data.followupDefinition || "{}"),
                rendererFollowupDataTemplate:
                  data.rendererFollowupDataTemplate || "",
              },
              null,
              2
            )
          )
      );
      element.setAttribute("download", `report-${data.name}.json`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importReportType(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as ReportType;
    const reportCategory = await this.reportCategoryService.findByName(
      data.categoryName
    );
    if (!reportCategory) {
      this.submitError = "Import errors : report category not found.";
      this.isSubmitting = false;
      return false;
    }

    const reportType = await (
      await this.reportTypeService.getReportType(data.id)
    ).data;
    data.categoryId = +reportCategory.id;
    if (data.stateDefinitionName) {
      const stateDefinition = await this.stateDefinitionService.findByName(
        data.stateDefinitionName
      );
      if (stateDefinition) data.stateDefinitionId = +stateDefinition.id;
    }
    var result;
    if (reportType) {
      result = await this._updateReportType(data);
    } else {
      result = await this._createReportType(data);
    }

    this.isSubmitting = false;

    if (!result.success) {
      if (result.message) {
        this.submitError = "Import errors : " + result.message;
      }
      if (result.fields) {
        this.submitError =
          "Import errors : " + Object.values(result.fields).join(",");
      }
    }
    return result.success;
  }

  _createReportType(data: ReportType): Promise<SaveResult<ReportType>> {
    return this.reportTypeService.createReportType(
      data.name,
      data.categoryId,
      JSON.stringify(data.definition, null, 2),
      data.ordering,
      data.stateDefinitionId,
      data.rendererDataTemplate,
      JSON.stringify(data.followupDefinition, null, 2),
      data.rendererFollowupDataTemplate
    );
  }

  _updateReportType(data: ReportType): Promise<SaveResult<ReportType>> {
    return this.reportTypeService.updateReportType(
      data.id,
      data.name,
      data.categoryId,
      JSON.stringify(data.definition, null, 2),
      data.ordering,
      data.stateDefinitionId,
      data.rendererDataTemplate,
      JSON.stringify(data.followupDefinition, null, 2),
      data.rendererFollowupDataTemplate
    );
  }

  openFormSimulationDialog(definition: string) {
    this.formSimulationViewModel = new FormSimulationViewModel(definition);
    this.dialog("formSimulation")?.open(null);
  }

  readAsync(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(JSON.parse(reader.result as string));
      };
      reader.onerror = () => {
        reject(new Error("Unable to read.."));
      };
      reader.readAsText(file);
    });
  }

  async publishReportType(id: string) {
    this.isLoading = true;
    const data = await await this.reportTypeService.publishReportType(id);
    if (data) {
      this.fetch();
    }
    this.isLoading = false;
  }

  async unpublishReportType(id: string) {
    this.isLoading = true;
    const data = await await this.reportTypeService.unpublishReportType(id);
    if (data) {
      this.fetch();
    }
    this.isLoading = false;
  }
}
