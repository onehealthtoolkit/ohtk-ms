import { BaseViewModel } from "lib/baseViewModel";
import {
  CensusRoundDefinition,
  ICensusRoundService,
} from "lib/services/census";
import { computed, makeObservable, observable } from "mobx";

export class CensusRoundViewViewModel extends BaseViewModel {
  id: string;
  _data: CensusRoundDefinition = {} as CensusRoundDefinition;

  constructor(
    id: string,
    readonly censusRoundService: ICensusRoundService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): CensusRoundDefinition {
    return this._data;
  }
  set data(value: CensusRoundDefinition) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.censusRoundService.getDefinition(this.id);
    if (result.data) {
      this.data = result.data;
    } else if (result.error) {
      this.setErrorMessage(result.error);
    }
    this.isLoading = false;
  }
}
