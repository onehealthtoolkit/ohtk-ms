import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IInvitationCodeService,
  InvitationCode,
} from "lib/services/invitationCode";

export class InvitaionCodeListViewModel extends BaseViewModel {
  data: InvitationCode[] = [];

  codeSearch: string = "";

  constructor(readonly invitationCodeService: IInvitationCodeService) {
    super();
    makeObservable(this, {
      data: observable,
      codeSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
  }

  setSearchValue(codeSearch: string = "", offset: number = 0) {
    this.codeSearch = codeSearch;
    this.offset = offset;
    this.fetch();
  }

  clearCodeSearch() {
    this.codeSearch = "";
  }

  async fetch(force?: boolean): Promise<void> {
    this.isLoading = true;
    const result = await this.invitationCodeService.fetchInvitationCodes(
      this.limit,
      this.offset,
      this.codeSearch,
      force
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
      this.isLoading = false;

      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.invitationCodeService.deleteInvitationCode(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    } else {
      this.fetch();
    }
  }
}
