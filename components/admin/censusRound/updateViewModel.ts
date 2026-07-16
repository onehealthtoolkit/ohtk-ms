import { CensusRoundDefinition } from "lib/services/census";
import { ICensusRoundService } from "lib/services/census";
import { SaveResult } from "lib/services/interface";
import { CensusRoundViewModel } from "./censusRoundViewModel";

export class CensusRoundUpdateViewModel extends CensusRoundViewModel {
  id: string;

  constructor(id: string, censusRoundService: ICensusRoundService) {
    super(censusRoundService);
    this.id = id;
    // Updates rematerialize only when the admin opts in.
    this.materialize = false;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const result = await this.censusRoundService.getDefinition(this.id);
    if (result.data) {
      this.applyDefinition(result.data);
    } else if (result.error) {
      this.submitError = result.error;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<{ definition: CensusRoundDefinition }>> {
    return this.censusRoundService.saveDefinition(
      this.buildSaveInput(parseInt(this.id, 10))
    );
  }
}
