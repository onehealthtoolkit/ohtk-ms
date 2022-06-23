import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import {
  IInvitationCodeService,
  InvitationCode,
} from "lib/services/invitationCode";

export class InvitaionCodeListViewModel extends BaseViewModel {
  data: InvitationCode[] = [];

  codeSearch: string = "";

  constructor(
    readonly invitationCodeService: IInvitationCodeService,
    codeSearch: string = "",
    offset: number = 0
  ) {
    super();
    makeObservable(this, {
      data: observable,
      codeSearch: observable,
      setSearchValue: action,
      clearCodeSearch: action,
      fetch: action,
    });
    this.codeSearch = codeSearch;
    this.offset = offset;
    this.fetch();
  }

  setSearchValue(codeSearch: string = "", offset: number = 0) {
    if (codeSearch != this.codeSearch || this.offset != offset) {
      this.codeSearch = codeSearch;
      this.offset = offset;
      this.fetch();
    }
  }

  clearCodeSearch() {
    this.codeSearch = "";
  }

  async fetch(): Promise<void> {
    const result = await this.invitationCodeService.fetchInvitationCodes(
      this.limit,
      this.offset,
      this.codeSearch
    );
    runInAction(() => {
      this.data = result.items || [];
      this.totalCount = result.totalCount || 0;
    });
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.invitationCodeService.deleteInvitationCode(id);
    if (result.error) {
      this.setErrorMessage(result.error);
    }
  }
}
