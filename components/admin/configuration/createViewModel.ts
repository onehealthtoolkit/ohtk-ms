import { Configuration } from "lib/services/configuration";
import { SaveResult } from "lib/services/interface";
import { ConfigurationViewModel } from "./configurationViewModel";

export class ConfigurationCreateViewModel extends ConfigurationViewModel {
  public _save(): Promise<SaveResult<Configuration>> {
    return this.configurationService.createConfiguration(this.key, this.value);
  }
}
