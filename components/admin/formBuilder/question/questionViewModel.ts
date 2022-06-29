import { FieldViewModel } from "components/admin/formBuilder/field";
import {
  Definition,
  MovableItemsViewModel,
} from "components/admin/formBuilder/shared";
import { action, makeObservable, observable } from "mobx";

export class QuestionViewModel extends MovableItemsViewModel<FieldViewModel> {
  isCurrent = false;
  isFieldMenusOpen = false;
  fields = Array<FieldViewModel>();
  currentField: FieldViewModel | undefined = undefined;

  constructor(id: string, name: string) {
    super(id, name);
    makeObservable(this, {
      isCurrent: observable,
      setCurrent: action,
      unsetCurrent: action,
      currentField: observable,
      selectField: action,
      isFieldMenusOpen: observable,
      toggleFieldMenus: action,
      fields: observable,
      addField: action,
    });
  }

  get movableItems() {
    return this.fields;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
  }

  selectField(id: string) {
    const field = this.fields.find(field => field.id === id);
    if (field) {
      this.currentField?.unsetCurrent();
      this.currentField = field;
      field.setCurrent();
    }
  }

  toggleFieldMenus() {
    this.isFieldMenusOpen = !this.isFieldMenusOpen;
  }

  addField(type: string) {
    const id = crypto.randomUUID();
    this.fields.push(new FieldViewModel(id, "field...", type));
  }

  parse(definition: Definition): boolean {
    if (definition.label !== undefined) {
      this.label = definition.label as string;

      if (Array.isArray(definition.fields)) {
        const fields = Array<FieldViewModel>();

        definition.fields.forEach(fieldDefinition => {
          const id = crypto.randomUUID();
          const fieldViewModel = new FieldViewModel(
            id,
            "Field...",
            fieldDefinition.type
          );
          const success = fieldViewModel.parse(fieldDefinition);
          if (success) {
            fields.push(fieldViewModel);
          }
        });
        this.fields.splice(0, this.fields.length, ...fields);
        return true;
      }
    }
    return false;
  }
}
