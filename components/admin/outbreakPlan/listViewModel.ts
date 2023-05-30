import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IOutbreakPlanService, OutbreakPlan } from "lib/services/outbreakPlan";
import { IReportTypeService } from "lib/services/reportType";
import { SaveResult } from "lib/services/interface";
import { IStateStepService } from "lib/services/stateStep";

export class OutbreakPlanListViewModel extends BaseViewModel {
  data: OutbreakPlan[] = [];

  nameSearch: string = "";

  constructor(
    readonly outbreakPlanService: IOutbreakPlanService,
    readonly reportTypeService: IReportTypeService,
    readonly stateStepService: IStateStepService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      nameSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
  }

  setSearchValue(nameSearch: string = "", offset: number = 0) {
    this.nameSearch = nameSearch;
    this.offset = offset;
    this.fetch();
  }

  clearCodeSearch() {
    this.nameSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.outbreakPlanService.fetchOutbreakPlans(
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
    const result = await this.outbreakPlanService.deleteOutbreakPlan(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }

  async exportOutbreakPlan(id: number) {
    this.isLoading = true;
    const data = await (
      await this.outbreakPlanService.getOutbreakPlan(id)
    ).data;
    if (data) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(JSON.stringify(data, null, 2))
      );
      element.setAttribute("download", `outbreak-plan-${data.name}.json`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
    this.isLoading = false;
  }

  public async importOutbreakPlan(file: File): Promise<boolean> {
    this.isSubmitting = true;
    this.submitError = "";
    const data = (await this.readAsync(file)) as OutbreakPlan;
    var reportType;
    if (data.reportTypeId) {
      reportType = await (
        await this.reportTypeService.getReportType(data.reportTypeId)
      ).data;
    }

    if (!reportType && data.reportTypeName) {
      reportType = await this.reportTypeService.findByName(data.reportTypeName);
    }
    if (!reportType) {
      this.submitError = `Import errors : report type ${data.reportTypeName} not found.`;
      this.isSubmitting = false;
      return false;
    }
    data.reportTypeId = reportType.id;

    const stateSteps = await this.stateStepService.fetchStateStepsByReportType(
      reportType.id
    );

    const stateStep = stateSteps.find(
      item =>
        item.id == data.stateStepId.toString() ||
        item.name == data.stateStepName
    );
    if (!stateStep) {
      this.submitError = `Import errors : state step ${data.stateStepName} not found.`;
      this.isSubmitting = false;
      return false;
    }
    data.stateStepId = +stateStep.id;

    const outbreakPlan = await (
      await this.outbreakPlanService.getOutbreakPlan(+data.id)
    ).data;

    var result;
    if (outbreakPlan) {
      result = await this._updateOutbreakPlan(data);
    } else {
      result = await this._createOutbreakPlan(data);
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

  _createOutbreakPlan(data: OutbreakPlan): Promise<SaveResult<OutbreakPlan>> {
    return this.outbreakPlanService.createOutbreakPlan(
      data.name,
      data.description,
      data.reportTypeId,
      data.stateStepId,
      data.zone1Radius,
      data.zone1Color,
      data.zone1MessageTitle,
      data.zone1MessageBody,
      data.zone2Radius,
      data.zone2Color,
      data.zone2MessageTitle,
      data.zone2MessageBody,
      data.zone3Radius,
      data.zone3Color,
      data.zone3MessageTitle,
      data.zone3MessageBody
    );
  }

  _updateOutbreakPlan(data: OutbreakPlan): Promise<SaveResult<OutbreakPlan>> {
    return this.outbreakPlanService.updateOutbreakPlan(
      +data.id,
      data.name,
      data.description,
      data.reportTypeId,
      data.stateStepId,
      data.zone1Radius,
      data.zone1Color,
      data.zone1MessageTitle,
      data.zone1MessageBody,
      data.zone2Radius,
      data.zone2Color,
      data.zone2MessageTitle,
      data.zone2MessageBody,
      data.zone3Radius,
      data.zone3Color,
      data.zone3MessageTitle,
      data.zone3MessageBody
    );
  }
}
