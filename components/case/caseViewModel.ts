import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseDetail } from "lib/services/case/case";
import { CaseStateViewViewModel } from "components/case/caseState/viewViewModel";
import { Me } from "lib/services/profile/me";
import { FetchPolicy } from "@apollo/client";

export class CaseViewModel extends BaseViewModel {
  data: CaseDetail = {} as CaseDetail;
  id: string;
  _activeTabIndex: number = 0;
  stateViewViewModel: CaseStateViewViewModel;

  constructor(id: string, readonly me: Me, readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      data: observable,
      fetch: action,
      _activeTabIndex: observable,
      activeTabIndex: computed,
    });
    this.id = id;
    this.stateViewViewModel = observable(
      new CaseStateViewViewModel(me, caseService)
    );
    this.fetch();
  }

  public get activeTabIndex(): number {
    return this._activeTabIndex;
  }
  public set activeTabIndex(value: number) {
    this._activeTabIndex = value;
  }

  async fetch(policy?: FetchPolicy) {
    this.isLoading = true;
    const data = (await this.caseService.getCase(this.id, policy)).data;
    if (data) {
      runInAction(() => {
        this.data = data;
        if (data.stateDefinition && data.states) {
          this.stateViewViewModel?.init(
            data.id,
            data.stateDefinition,
            data.states
          );
        }
      });
    }
    this.isLoading = false;
  }
}
