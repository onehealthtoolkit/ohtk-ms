import { FormTransitionViewModel } from "components/case/caseState/formTransitionViewModel";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseState } from "lib/services/case/case";
import { Me } from "lib/services/profile/me";
import { DeepStateDefinition } from "lib/services/stateDefinition/stateDefinition";
import { action, makeObservable, observable } from "mobx";

export class CaseStateViewViewModel extends BaseViewModel {
  caseId: string = "";
  stateDefinition?: DeepStateDefinition;
  states = Array<CaseState>();
  formTransitionViewModel?: FormTransitionViewModel = undefined;

  constructor(readonly me: Me, readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      states: observable,
      formTransitionViewModel: observable,
      showFormTransitionDialog: action,
    });
  }

  init(
    caseId: string,
    stateDefinition: DeepStateDefinition,
    states: Array<CaseState | null>
  ) {
    this.caseId = caseId;
    this.stateDefinition = stateDefinition;
    this.states.splice(0, this.states.length);
    states.forEach(state => {
      if (state !== null && typeof state !== "undefined") {
        this.states.push(state);
      }
    });
  }

  showFormTransitionDialog(transitionId: string, formDefinition?: string) {
    if (formDefinition) {
      this.formTransitionViewModel = new FormTransitionViewModel(
        this.caseService,
        this.caseId,
        transitionId,
        formDefinition
      );
      this.formTransitionViewModel.open(null);
    }
  }
}
