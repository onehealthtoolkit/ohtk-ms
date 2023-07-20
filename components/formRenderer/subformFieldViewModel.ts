import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import SubformField from "lib/opsvForm/models/fields/subformField";
import { action, computed, makeObservable, observable } from "mobx";

export class SubformFieldViewModel extends BaseFormViewModel {
  formSimulationViewModel?: FormSimulationViewModel = undefined;
  _title: string = "";
  _description: string = "";

  constructor(readonly field: SubformField) {
    super();
    makeObservable(this, {
      formSimulationViewModel: observable,
      _title: observable,
      title: computed,
      _description: observable,
      description: computed,
      supplantValues: action,
      openFormSimulationDialog: action,
    });

    this.supplantValues();
  }

  openFormSimulationDialog(definition: string) {
    this.formSimulationViewModel = new FormSimulationViewModel(
      definition,
      this.field.formRef
    );
    this.dialog("subformFieldDialog")?.open(null);
  }

  set title(value: string) {
    this._title = value;
  }
  get title() {
    return this._title;
  }

  set description(value: string) {
    this._description = value;
  }
  get description() {
    return this._description;
  }

  supplantValues() {
    this.title = this.field.titleTemplate
      ? this.supplant(this.field.titleTemplate)
      : "";
    this.description = this.field.descriptionTemplate
      ? this.supplant(this.field.descriptionTemplate)
      : "";
  }

  supplant(strFormat: string) {
    const values = this.formSimulationViewModel?.form?.toJsonValue();
    if (values)
      return strFormat.replace(/{{([^{}]*)}}/g, (a: any, b: string) => {
        b = b.trim();
        var r = values[b.substring(b.indexOf(".") + 1)];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });
    return strFormat;
  }
}
