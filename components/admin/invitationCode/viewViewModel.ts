import { BaseViewModel } from "lib/baseViewModel";
import { InvitationCode } from "lib/services/invitationCode";
import { IInvitationCodeService } from "lib/services/invitationCode/invitationCodeService";
import { computed, makeObservable, observable } from "mobx";

export class InvitationCodeViewViewModel extends BaseViewModel {
  id: string;
  _data: InvitationCode = {} as InvitationCode;

  constructor(
    id: string,
    readonly invitationCodeService: IInvitationCodeService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): InvitationCode {
    return this._data;
  }
  set data(value: InvitationCode) {
    this._data = value;
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
