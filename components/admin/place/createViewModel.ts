import { Place } from "lib/services/place";
import { SaveResult } from "lib/services/interface";
import { PlaceViewModel } from "./placeViewModel";

export class PlaceCreateViewModel extends PlaceViewModel {
  public _save(): Promise<SaveResult<Place>> {
    return this.placeService.createPlace(
      this.name,
      this.latitude,
      this.longitude,
      this.notificationTo,
      this.authorityId
    );
  }
}
