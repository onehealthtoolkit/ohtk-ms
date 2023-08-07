import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import SubformField from "lib/opsvForm/models/fields/subformField";
import { action, computed, makeObservable, observable } from "mobx";

export class SubformFieldViewModel extends BaseFormViewModel {
  formSimulationViewModel?: FormSimulationViewModel = undefined;
  _values: Array<Record<string, any>> = [];
  _title: string = "";
  _description: string = "";

  constructor(readonly field: SubformField) {
    super();
    makeObservable(this, {
      formSimulationViewModel: observable,
      _values: observable,
      values: computed,
      _title: observable,
      title: computed,
      _description: observable,
      description: computed,
      supplantValues: action,
      openFormSimulationDialog: action,
    });
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

  get values() {
    return this._values;
  }

  set description(value: string) {
    this._description = value;
  }
  get description() {
    return this._description;
  }

  supplantValues() {
    const record: Record<string, any> = {};
    record.title = this.field.titleTemplate
      ? this.supplant(this.field.titleTemplate)
      : "";
    record.description = this.field.descriptionTemplate
      ? this.supplant(this.field.descriptionTemplate)
      : "";
    this._values.push(record);
  }

  supplant(strFormat: string) {
    const values = this.formSimulationViewModel?.form?.toJsonValue();
    if (values) {
      var value = strFormat.replace(/{{([^{}]*)}}/g, (a: any, b: string) => {
        b = b.trim();
        var r = values[b.substring(b.indexOf(".") + 1)];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });

      value = value.replace(/{([^{}]*)}/g, (a: any, b: string) => {
        b = b.trim();
        var r = values[b.substring(b.indexOf(".") + 1)];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });
      return value;
    }
    return strFormat;
  }
}
