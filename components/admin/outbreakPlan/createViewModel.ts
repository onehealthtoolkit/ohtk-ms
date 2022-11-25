import { OutbreakPlan } from "lib/services/outbreakPlan";
import { SaveResult } from "lib/services/interface";
import { OutbreakPlanViewModel } from "./outbreakPlanViewModel";

export class OutbreakPlanCreateViewModel extends OutbreakPlanViewModel {
  public _save(): Promise<SaveResult<OutbreakPlan>> {
    return this.outbreakPlanService.createOutbreakPlan(
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
