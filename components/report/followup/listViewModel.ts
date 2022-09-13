import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { Followup } from "lib/services/followup/followup";
import { IFollowupService } from "lib/services/followup/followupService";

export class FollowupListViewModel extends BaseViewModel {
  data: Followup[] = [];

  constructor(
    readonly followupService: IFollowupService,
    readonly incidentId: string
  ) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });

    this.fetch();
  }

  async fetch() {
    const result = await this.followupService.fetchFollowups(this.incidentId);
    runInAction(() => {
      this.data = result.items || [];
    });

    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
