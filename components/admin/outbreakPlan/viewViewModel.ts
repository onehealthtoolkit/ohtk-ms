import { BaseViewModel } from "lib/baseViewModel";
import { OutbreakPlan } from "lib/services/outbreakPlan";
import { IOutbreakPlanService } from "lib/services/outbreakPlan/outbreakPlanService";
import { computed, makeObservable, observable } from "mobx";

export class OutbreakPlanViewViewModel extends BaseViewModel {
  id: number;
  _data: OutbreakPlan = {} as OutbreakPlan;

  constructor(id: number, readonly outbreakPlanService: IOutbreakPlanService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): OutbreakPlan {
    return this._data;
  }
  set data(value: OutbreakPlan) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.outbreakPlanService.getOutbreakPlan(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
