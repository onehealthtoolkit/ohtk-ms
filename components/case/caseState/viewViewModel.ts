import { FormTransitionViewModel } from "components/case/caseState/formTransitionViewModel";
import { BaseViewModel } from "lib/baseViewModel";
import { ICaseService } from "lib/services/case";
import { CaseState } from "lib/services/case/case";
import { ICommentService } from "lib/services/comment/commentService";
import { Me } from "lib/services/profile/me";
import { DeepStateDefinition } from "lib/services/stateDefinition/stateDefinition";
import { StateTransitionRef } from "lib/services/stateTransition/stateTransition";
import { action, makeObservable, observable } from "mobx";

export class CaseStateViewViewModel extends BaseViewModel {
  caseId: string = "";
  threadId?: number | null;
  stateDefinition?: DeepStateDefinition;
  states = Array<CaseState>();
  formTransitionViewModel?: FormTransitionViewModel = undefined;

  constructor(
    readonly me: Me,
    readonly caseService: ICaseService,
    readonly commentService: ICommentService
  ) {
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
    states: Array<CaseState | null>,
    threadId?: number | null
  ) {
    this.caseId = caseId;
    this.threadId = threadId;
    this.stateDefinition = stateDefinition;
    this.states.splice(0, this.states.length);
    states.forEach(state => {
      if (state !== null && typeof state !== "undefined") {
        this.states.push(state);
      }
    });
  }

  showFormTransitionDialog(
    transition: StateTransitionRef,
    formDefinition?: string
  ) {
    if (formDefinition) {
      this.formTransitionViewModel = new FormTransitionViewModel(
        this.caseService,
        this.commentService,
        this.caseId,
        transition,
        formDefinition,
        this.threadId
      );
      this.formTransitionViewModel.open(null);
    }
  }
}
