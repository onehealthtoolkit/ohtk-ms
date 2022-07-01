import { BaseViewModel } from "lib/baseViewModel";
import { InvitationCode } from "lib/services/invitationCode";
import { IInvitationCodeService } from "lib/services/invitationCode/invitationCodeService";
import { makeObservable, observable } from "mobx";

export class InvitationCodeViewViewModel extends BaseViewModel {
  id: string;
  data: InvitationCode = {} as InvitationCode;

  constructor(
    id: string,
    readonly invitationCodeService: IInvitationCodeService
  ) {
    super();
    makeObservable(this, {
      data: observable,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.invitationCodeService.getInvitationCode(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
