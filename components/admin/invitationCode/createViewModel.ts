import { InvitationCode } from "lib/services/invitationCode";
import { SaveResult } from "lib/services/interface";
import { InvitationCodeViewModel } from "./invitationCodeViewModel";

export class InvitationCodeCreateViewModel extends InvitationCodeViewModel {
  public _save(): Promise<SaveResult<InvitationCode>> {
    return this.invitationCodeService.createInvitationCode(
      this.code,
      this.authorityId,
      new Date(this.fromDate).toISOString(),
      new Date(this.throughDate).toISOString()
    );
  }
}
