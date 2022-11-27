import { BaseViewModel } from "lib/baseViewModel";
import { Configuration } from "lib/services/configuration";
import { IConfigurationService } from "lib/services/configuration/configurationService";
import { computed, makeObservable, observable } from "mobx";

export class ConfigurationViewViewModel extends BaseViewModel {
  id: string;
  _data: Configuration = {} as Configuration;

  constructor(
    id: string,
    readonly configurationService: IConfigurationService
  ) {
    super();
    makeObservable(this, {
      _data: observable,
      data: computed,
    });
    this.id = id;
    this.fetch();
  }

  get data(): Configuration {
    return this._data;
  }
  set data(value: Configuration) {
    this._data = value;
  }

  async fetch() {
    this.isLoading = true;
    const data = await (
      await this.configurationService.getConfiguration(this.id)
    ).data;
    if (data) {
      this.data = data;
    }
    this.isLoading = false;
  }
}
