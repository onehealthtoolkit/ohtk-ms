import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { IInvitationCodeService } from "lib/services/invitationCode";

type InvitationCode = {
  id: string;
  code: string;
};

export class InvitaionCodeViewModel extends BaseViewModel {
  data: InvitationCode[] = [];

  searchText: string = "";

  constructor(readonly invitationCodeService: IInvitationCodeService) {
    super();
    makeObservable(this, {
      data: observable,
      searchText: observable,
      setSearchText: action,
      clearSearchText: action,
      fetch: action,
    });
  }

  setSearchText(value: string) {
    this.searchText = value;
  }

  clearSearchText() {
    this.searchText = "";
  }

  async fetch(): Promise<void> {
    const result = await this.invitationCodeService.fetchInvitationCodes(
      this.searchText
    );
    runInAction(() => (this.data = result.items || []));
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
