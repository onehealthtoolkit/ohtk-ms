import { BaseViewModel } from "lib/baseViewModel";
import { CaseDefinition } from "lib/services/caseDefinition";
import { ICaseDefinitionService } from "lib/services/caseDefinition/caseDefinitionService";
import { makeObservable, observable } from "mobx";

export class CaseDefinitionViewViewModel extends BaseViewModel {
  id: string;
  data: CaseDefinition = {} as CaseDefinition;

  constructor(
    id: string,
    readonly caseDefinitionService: ICaseDefinitionService
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
      await this.caseDefinitionService.getCaseDefinition(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
