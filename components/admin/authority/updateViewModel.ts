import { Authority } from "lib/services/authority";
import { IAuthorityService } from "lib/services/authority/authorityService";
import { SaveResult } from "lib/services/interface";
import { AuthorityViewModel } from "./authorityViewModel";

export class AuthorityUpdateViewModel extends AuthorityViewModel {
  id: string;
  constructor(id: string, authorityService: IAuthorityService) {
    super(authorityService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (await this.authorityService.getAuthority(this.id)).data;
    if (data) {
      this.code = data.code;
      this.name = data.name;
      this.area = data.area;
      this.authorityInherits = data.inherits?.map(it => it.id) || [];
      this.authorityBoundaryConnects =
        data.boundaryConnects?.map(it => it.id) || [];
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<Authority>> {
    return this.authorityService.updateAuthority(
      this.id,
      this.code,
      this.name,
      this.area,
      this.authorityInherits,
      this.authorityBoundaryConnects
    );
  }
}
