import {
  AbstractDefinitionViewModel,
  Definition,
} from "components/admin/formBuilder/shared";
import { makeObservable, observable } from "mobx";

export class DateFieldViewModel extends AbstractDefinitionViewModel {
  withTime = false;
  separatedFields = false;
  backwardDaysOffset = "";
  forwardDaysOffset = "";

  constructor() {
    super();
    makeObservable(this, {
      withTime: observable,
      separatedFields: observable,
      backwardDaysOffset: observable,
      forwardDaysOffset: observable,
    });
  }

  setWithTime(value: boolean) {
    this.withTime = value;
  }

  setSeparatedFields(value: boolean) {
    this.separatedFields = value;
  }

  setBackwardDaysOffset(value: string) {
    const intVal = parseInt(value || "");
    this.backwardDaysOffset = intVal >= 0 ? String(intVal) : "";
  }

  setForwarDaysOffset(value: string) {
    const intVal = parseInt(value || "");
    this.forwardDaysOffset = intVal >= 0 ? String(intVal) : "";
  }

  parse(definition: Definition) {
    this.withTime = Boolean(definition.withTime);
    this.separatedFields = Boolean(definition.separatedFields);
    if (definition.backwardDaysOffset !== undefined) {
      this.backwardDaysOffset = String(definition.backwardDaysOffset);
    } else {
      this.backwardDaysOffset = "";
    }
    if (definition.forwardDaysOffset !== undefined) {
      this.forwardDaysOffset = String(definition.forwardDaysOffset);
    } else {
      this.forwardDaysOffset = "";
    }
  }

  toJson() {
    const json: Definition = {
      withTime: this.withTime,
      separatedFields: this.separatedFields,
    };

    const backwardDaysOffsetNum = parseInt(this.backwardDaysOffset || "");
    if (backwardDaysOffsetNum >= 0) {
      json.backwardDaysOffset = backwardDaysOffsetNum;
    }

    const forwardDaysOffsetNum = parseInt(this.forwardDaysOffset || "");
    if (forwardDaysOffsetNum >= 0) {
      json.forwardDaysOffset = forwardDaysOffsetNum;
    }
    return json;
  }
}
