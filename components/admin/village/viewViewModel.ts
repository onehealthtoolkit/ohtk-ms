import { BaseViewModel } from "lib/baseViewModel";
import {
  ICensusSnapshotService,
  VillageCensusSnapshot,
} from "lib/services/census";
import { IVillageService, Village } from "lib/services/village";
import { computed, makeObservable, observable, runInAction } from "mobx";

export class VillageViewViewModel extends BaseViewModel {
  _data: Village = {} as Village;
  _latestCensus: VillageCensusSnapshot | undefined = undefined;

  constructor(
    readonly id: number,
    readonly villageService: IVillageService,
    readonly censusSnapshotService: ICensusSnapshotService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
      _latestCensus: observable,
      latestCensus: computed,
    });
    this.fetch();
  }

  get data(): Village {
    return this._data;
  }
  set data(value: Village) {
    this._data = value;
  }

  get latestCensus(): VillageCensusSnapshot | undefined {
    return this._latestCensus;
  }
  set latestCensus(value: VillageCensusSnapshot | undefined) {
    this._latestCensus = value;
  }

  async fetch() {
    this.isLoading = true;
    const [village, latestCensus] = await Promise.all([
      this.villageService.getVillage(this.id),
      this.censusSnapshotService.getLatestAnimalVillageCensus(this.id),
    ]);
    runInAction(() => {
      if (village.data) {
        this.data = village.data;
      }
      this.latestCensus = latestCensus.data;
      this.isLoading = false;
    });
  }
}
