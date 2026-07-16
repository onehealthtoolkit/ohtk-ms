import { CensusRoundDefinition } from "lib/services/census";
import { SaveResult } from "lib/services/interface";
import { CensusRoundViewModel } from "./censusRoundViewModel";

export class CensusRoundCreateViewModel extends CensusRoundViewModel {
  public _save(): Promise<SaveResult<{ definition: CensusRoundDefinition }>> {
    return this.censusRoundService.saveDefinition(this.buildSaveInput());
  }
}
