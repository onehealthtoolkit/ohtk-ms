import { BaseViewModel } from "lib/baseViewModel";
import { Place } from "lib/services/place";
import { IPlaceService } from "lib/services/place/placeService";
import { computed, makeObservable, observable } from "mobx";

export class PlaceViewViewModel extends BaseViewModel {
  id: number;
  _data: Place = {} as Place;

  constructor(id: number, readonly placeService: IPlaceService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): Place {
    return this._data;
  }
  set data(value: Place) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.placeService.getPlace(this.id)).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
