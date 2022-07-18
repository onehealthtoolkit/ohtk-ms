import { InvitationCode } from "lib/services/invitationCode";
import { IInvitationCodeService } from "lib/services/invitationCode/invitationCodeService";
import { SaveResult } from "lib/services/interface";
import { InvitationCodeViewModel } from "./invitationCodeViewModel";

export class InvitationCodeUpdateViewModel extends InvitationCodeViewModel {
  id: string;
  constructor(id: string, invitationCodeService: IInvitationCodeService) {
    super(invitationCodeService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.invitationCodeService.getInvitationCode(this.id)
    ).data;
    if (data) {
      this.code = data.code;
      if (data.fromDate)
        this.fromDate = new Date(data.fromDate).toISOString().split("T")[0];
      if (data.throughDate)
        this.throughDate = new Date(data.throughDate)
          .toISOString()
          .split("T")[0];
      this.role = data.role!;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<InvitationCode>> {
    return this.invitationCodeService.updateInvitationCode(
      this.id,
      this.code,
      new Date(this.fromDate).toISOString(),
      new Date(this.throughDate).toISOString(),
      this.role
    );
  }
}
