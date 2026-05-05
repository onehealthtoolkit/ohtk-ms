import { SaveResult } from "lib/services/interface";
import { IVillageService, Village } from "lib/services/village";
import { VillageViewModel } from "./villageViewModel";

export class VillageUpdateViewModel extends VillageViewModel {
  id: number;

  constructor(id: number, villageService: IVillageService) {
    super(villageService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.villageService.getVillage(this.id)).data;
    if (data) {
      this.code = data.code;
      this.name = data.name;
      this.authorityId = data.authorityId;
      this.latitude = data.latitude || null;
      this.longitude = data.longitude || null;
      this.active = data.active;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<Village>> {
    return this.villageService.updateVillage(
      this.id,
      this.code,
      this.name,
      this.authorityId,
      this.latitude,
      this.longitude,
      this.active
    );
  }
}
