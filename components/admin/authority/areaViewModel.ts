import { BaseFormViewModel } from "lib/baseFormViewModel";
import { IAuthorityService } from "lib/services/authority/authorityService";
import { computed, makeObservable, observable } from "mobx";

export type PolygonData = GeoJSON.Polygon | GeoJSON.MultiPolygon;

export class AuthorityAreaViewModel extends BaseFormViewModel {
  id: string;
  _data: PolygonData = {
    type: "Polygon",
    coordinates: [],
  };

  constructor(id: string, readonly authorityService: IAuthorityService) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  public get data() {
    return this._data;
  }

  public set data(value: PolygonData) {
    this._data = value;
    delete this.fieldErrors["data"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  async fetch() {
    this.isLoading = true;
    // get area

    // Mock data
    const data: PolygonData = {
      type: "Polygon",
      coordinates: [
        [
          [-122.48103886842728, 37.833075326166274],
          [-122.48065531253813, 37.832558431940114],
          [-122.4799284338951, 37.8322660885204],
          [-122.47963070869446, 37.83231693093747],
          [-122.47948586940764, 37.832467339549524],
          [-122.47945636510849, 37.83273426112019],
          [-122.47959315776825, 37.83289737938241],
          [-122.48004108667372, 37.833109220743104],
          [-122.48058557510376, 37.83328293020496],
          [-122.48080283403395, 37.83332529830436],
          [-122.48091548681259, 37.83322785163939],
        ],
      ],
    };
    this.data = data;
    this.isLoading = false;
  }

  async save() {
    console.log("polygon geojson", this.data);
  }
}
