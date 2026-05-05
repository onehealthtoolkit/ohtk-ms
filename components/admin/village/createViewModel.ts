import { SaveResult } from "lib/services/interface";
import { Village } from "lib/services/village";
import { VillageViewModel } from "./villageViewModel";

export class VillageCreateViewModel extends VillageViewModel {
  public _save(): Promise<SaveResult<Village>> {
    return this.villageService.createVillage(
      this.code,
      this.name,
      this.authorityId,
      this.latitude,
      this.longitude,
      this.active
    );
  }
}
