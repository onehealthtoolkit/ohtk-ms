import { AuthorityViewModel } from "components/admin/authority/authorityViewModel";
import { Authority } from "lib/services/authority";
import { PolygonData } from "lib/services/authority/authority";
import { IAuthorityService } from "lib/services/authority/authorityService";
import { SaveResult } from "lib/services/interface";
import { computed, makeObservable, observable } from "mobx";

export class AuthorityAreaViewModel extends AuthorityViewModel {
  id: string;
  _area?: PolygonData = undefined;

  constructor(id: string, readonly authorityService: IAuthorityService) {
    super(authorityService);
    makeObservable(this, {
      _area: observable,
      area: computed,
    });
    this.id = id;
    this.fetch();
  }

  public get area() {
    return this._area;
  }

  public set area(value: PolygonData | undefined) {
    this._area = value;
    delete this.fieldErrors["area"];
    if (this.submitError.length > 0) {
      this.submitError = "";
    }
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.authorityService.getAuthority(this.id)).data;
    if (data) {
      this.code = data.code;
      this.name = data.name;
      this.area = data.area;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<Authority>> {
    return this.authorityService.updateAuthorityArea(
      this.id,
      this.code,
      this.name,
      this.area
    );
  }
}
