import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseDetail } from "lib/services/case/case";

export class CaseViewModel extends BaseViewModel {
  data: CaseDetail = {} as CaseDetail;
  id: string;

  constructor(id: string, readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
    });
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = (await this.caseService.getCase(this.id)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
      });
    }
    this.isLoading = false;
  }
}
