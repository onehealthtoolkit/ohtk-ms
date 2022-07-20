import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseState } from "lib/services/case/case";
import { Me } from "lib/services/profile/me";
import { DeepStateDefinition } from "lib/services/stateDefinition/stateDefinition";
import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";
import { action, makeObservable, observable, runInAction } from "mobx";

export class CaseStateViewViewModel extends BaseViewModel {
  caseId: string = "";
  stateDefinition?: DeepStateDefinition;
  states = Array<CaseState>();

  constructor(readonly me: Me, readonly caseService: ICaseService) {
    super();
    makeObservable(this, {
      states: observable,
      forwardState: action,
      updateCaseStateTransition: action,
    });
  }

  init(
    caseId: string,
    stateDefinition: DeepStateDefinition,
    states: Array<CaseState | null>
  ) {
    this.caseId = caseId;
    this.stateDefinition = stateDefinition;
    states.forEach(state => {
      if (state !== null && typeof state !== "undefined") {
        this.states.push(state);
      }
    });
  }

  async forwardState(caseStateId: string, transitionId: string) {
    this.isLoading = true;
    const result = await this.caseService.forwardState(
      this.caseId,
      transitionId
    );
    runInAction(() => {
      if (result.data) {
        this.states.push(result.data);
        this.updateCaseStateTransition(caseStateId, transitionId);
      }
      if (result.error) {
        this.setErrorMessage(result.error);
      }
    });
    this.isLoading = false;
  }

  updateCaseStateTransition(caseStateId: string, transitionId: string) {
    const caseState = this.states.find(
      caseState => caseState.id === caseStateId
    );
    if (caseState) {
      const now = new Date();
      runInAction(() => {
        caseState.transition = {
          id: now.getTime().toString(),
          createdAt: now.toISOString(),
          createdBy: {
            id: this.me.id.toString(),
            firstName: this.me.firstName,
            lastName: this.me.lastName,
          },
          formData: "",
          transition: caseState.state.toTransitions?.find(transition => {
            return transition?.id === transitionId;
          }) as StateTransitionRef,
        };
      });
    }
  }
}
