import { Definition } from "components/admin/formBuilder/shared";
import { makeObservable } from "mobx";

export class LocationFieldViewModel {
  constructor() {
    makeObservable(this, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(definition: Definition) {}
}
