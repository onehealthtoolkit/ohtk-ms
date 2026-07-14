import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  ClusterFilterData,
  IClusterService,
} from "lib/services/cluster/clusterService";
import { ClusterResult } from "lib/services/cluster";

const emptyFilter = (): ClusterFilterData => ({
  fromDate: undefined,
  throughDate: undefined,
  riskLevels: undefined,
  searchText: undefined,
});

type SearchParams = {
  fromDate?: Date;
  throughDate?: Date;
  offset?: number;
  riskLevels?: ClusterFilterData["riskLevels"];
  searchText?: string;
};

export class ClusterListViewModel extends BaseViewModel {
  data: ClusterResult[] = [];
  filter: ClusterFilterData = emptyFilter();
  _fromDate?: Date = undefined;
  _throughDate?: Date = undefined;

  constructor(readonly clusterService: IClusterService) {
    super();
    makeObservable(this, {
      _fromDate: observable,
      _throughDate: observable,
      fromDate: computed,
      throughDate: computed,
      data: observable,
      filter: observable,
      setSearchValue: action,
      fetch: action,
      filterReset: action,
    });
  }

  public get fromDate() {
    return this._fromDate;
  }

  public set fromDate(value: Date | undefined) {
    this._fromDate = value;
  }

  public get throughDate() {
    return this._throughDate;
  }

  public set throughDate(value: Date | undefined) {
    this._throughDate = value;
  }

  setSearchValue(params: SearchParams) {
    this.fromDate = params.fromDate;
    this.throughDate = params.throughDate;
    this.filter.fromDate = params.fromDate;
    this.filter.throughDate = params.throughDate;
    this.filter.riskLevels = params.riskLevels;
    this.filter.searchText = params.searchText;
    this.offset = params.offset || 0;
    this.fetch();
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.clusterService.fetchClusters(
      this.limit,
      this.offset,
      this.filter,
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

  filterReset() {
    this.filter = emptyFilter();
    this.fromDate = undefined;
    this.throughDate = undefined;
  }
}
