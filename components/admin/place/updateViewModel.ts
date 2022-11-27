import { Place } from "lib/services/place";
import { IPlaceService } from "lib/services/place/placeService";
import { SaveResult } from "lib/services/interface";
import { PlaceViewModel } from "./placeViewModel";
import { IReportTypeService } from "lib/services/reportType";

export class PlaceUpdateViewModel extends PlaceViewModel {
  id: number;
  constructor(
    id: number,
    placeService: IPlaceService,
    readonly reportTypeService: IReportTypeService
  ) {
    super(placeService, reportTypeService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.placeService.getPlace(this.id)).data;
    if (data) {
      this.name = data.name;
      this.latitude = data.latitude;
      this.longitude = data.longitude;
      this.notificationTo = data.notificationTo;
      this.authorityId = data.authorityId;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<Place>> {
    return this.placeService.updatePlace(
      this.id,
      this.name,
      this.latitude,
      this.longitude,
      this.notificationTo,
      this.authorityId
    );
  }
}
