import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { makeObservable } from "mobx";

export class DateFieldViewModel extends AbstractDefinitionViewModel {
  constructor() {
    super();
    makeObservable(this, {});
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parse(definition: Definition) {}

  toJson() {
    return {};
  }
}
