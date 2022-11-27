import { Configuration } from "lib/services/configuration";
import { IConfigurationService } from "lib/services/configuration/configurationService";
import { SaveResult } from "lib/services/interface";
import { ConfigurationViewModel } from "./configurationViewModel";
import { IReportTypeService } from "lib/services/reportType";

export class ConfigurationUpdateViewModel extends ConfigurationViewModel {
  id: string;
  constructor(
    id: string,
    configurationService: IConfigurationService,
    readonly reportTypeService: IReportTypeService
  ) {
    super(configurationService, reportTypeService);
    this.id = id;
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.configurationService.getConfiguration(this.id)
    ).data;
    if (data) {
      this.key = data.key;
      this.value = data.value;
    }
    this.isLoading = false;
  }

  public _save(): Promise<SaveResult<Configuration>> {
    return this.configurationService.updateConfiguration(
      this.id,
      this.key,
      this.value
    );
  }
}
