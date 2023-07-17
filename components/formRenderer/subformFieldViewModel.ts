import { FormSimulationViewModel } from "components/admin/formBuilder/simulator/formSimulationViewModel";
import { BaseFormViewModel } from "lib/baseFormViewModel";
import SubformField from "lib/opsvForm/models/fields/subformField";
import { makeObservable, observable } from "mobx";

export class SubformFieldViewModel extends BaseFormViewModel {
  formSimulationViewModel?: FormSimulationViewModel = undefined;

  constructor(readonly field: SubformField) {
    super();
    makeObservable(this, {
      formSimulationViewModel: observable,
    });
  }

  openFormSimulationDialog(definition: string) {
    this.formSimulationViewModel = new FormSimulationViewModel(
      definition,
      this.field.formRef
    );
    this.dialog("subformFieldDialog")?.open(null);
  }
}
