import { BaseViewModel } from "lib/baseViewModel";
import { CaseDefinition } from "lib/services/caseDefinition";
import { ICaseDefinitionService } from "lib/services/caseDefinition/caseDefinitionService";
import { computed, makeObservable, observable } from "mobx";

export class CaseDefinitionViewViewModel extends BaseViewModel {
  id: string;
  _data: CaseDefinition = {} as CaseDefinition;

  constructor(
    id: string,
    readonly caseDefinitionService: ICaseDefinitionService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): CaseDefinition {
    return this._data;
  }
  set data(value: CaseDefinition) {
    this._data = value;
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
