import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ClusterResult, IClusterService } from "lib/services/cluster";

export class ClusterDetailViewModel extends BaseViewModel {
  data: ClusterResult = {} as ClusterResult;

  constructor(
    readonly id: string,
    readonly clusterService: IClusterService
  ) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.clusterService.getCluster(this.id);
    runInAction(() => {
      if (result.data) {
        this.data = result.data;
      }
      if (result.error) {
        this.setErrorMessage(result.error);
      }
      this.isLoading = false;
    });
  }
}
