import { Authority } from "lib/services/authority";
import { SaveResult } from "lib/services/interface";
import { AuthorityViewModel } from "./authorityViewModel";

export class AuthorityCreateViewModel extends AuthorityViewModel {
  public _save(): Promise<SaveResult<Authority>> {
    return this.authorityService.createAuthority(
      this.code,
      this.name,
      this.area,
      this.authorityInherits,
      this.authorityBoundaryConnects
    );
  }
}
