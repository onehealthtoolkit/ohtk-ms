import { OutbreakPlan } from "lib/services/outbreakPlan";
import { IOutbreakPlanService } from "lib/services/outbreakPlan/outbreakPlanService";
import { SaveResult } from "lib/services/interface";
import { OutbreakPlanViewModel } from "./outbreakPlanViewModel";
import { IReportTypeService } from "lib/services/reportType";

export class OutbreakPlanUpdateViewModel extends OutbreakPlanViewModel {
  id: number;
  constructor(
    id: number,
    outbreakPlanService: IOutbreakPlanService,
    readonly reportTypeService: IReportTypeService
  ) {
    super(outbreakPlanService, reportTypeService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.outbreakPlanService.getOutbreakPlan(this.id)
    ).data;
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.reportTypeId = data.reportTypeId;
      this.stateStepId = data.stateStepId;
      this.zone1Radius = data.zone1Radius;
      this.zone1Color = data.zone1Color;
      this.zone1MessageTitle = data.zone1MessageTitle;
      this.zone1MessageBody = data.zone1MessageBody;
      this.zone2Radius = data.zone2Radius;
      this.zone2Color = data.zone2Color;
      this.zone2MessageTitle = data.zone2MessageTitle;
      this.zone2MessageBody = data.zone2MessageBody;
      this.zone3Radius = data.zone3Radius;
      this.zone3Color = data.zone3Color;
      this.zone3MessageTitle = data.zone3MessageTitle;
      this.zone3MessageBody = data.zone3MessageBody;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<OutbreakPlan>> {
    return this.outbreakPlanService.updateOutbreakPlan(
      this.id,
      this.name,
      this.description,
      this.reportTypeId,
      this.stateStepId,
      this.zone1Radius,
      this.zone1Color,
      this.zone1MessageTitle,
      this.zone1MessageBody,
      this.zone2Radius,
      this.zone2Color,
      this.zone2MessageTitle,
      this.zone2MessageBody,
      this.zone3Radius,
      this.zone3Color,
      this.zone3MessageTitle,
      this.zone3MessageBody
    );
  }
}
