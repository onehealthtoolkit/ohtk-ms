import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IOutbreakPlanService, OutbreakPlan } from "lib/services/outbreakPlan";

export class OutbreakPlanListViewModel extends BaseViewModel {
  data: OutbreakPlan[] = [];

  nameSearch: string = "";

  constructor(readonly outbreakPlanService: IOutbreakPlanService) {
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
    const result = await this.outbreakPlanService.fetchOutbreakPlans(
      this.limit,
      this.offset,
      this.nameSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.outbreakPlanService.deleteOutbreakPlan(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
