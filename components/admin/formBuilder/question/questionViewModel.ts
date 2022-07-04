import {
  FieldViewModel,
  TFieldValueType,
} from "components/admin/formBuilder/field";
import {
  Definition,
  MovableItemsViewModel,
  ParseError,
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
      deleteField: action,
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
    this.currentField?.unsetCurrent();
    this.currentField = undefined;

    const field = this.fields.find(field => field.id === id);
    if (field) {
      this.currentField = field;
      field.setCurrent();
    }
  }

  toggleFieldMenus() {
    this.isFieldMenusOpen = !this.isFieldMenusOpen;
  }

  addField(type: TFieldValueType) {
    const id = crypto.randomUUID();
    this.fields.push(new FieldViewModel(id, "field...", type));
  }

  deleteField(id: string) {
    const fieldIndex = this.fields.findIndex(field => field.id === id);
    if (fieldIndex > -1) {
      this.fields.splice(fieldIndex, 1);
    }
  }

  parse(definition: Definition) {
    try {
      if (definition.label !== undefined) {
        this.label = definition.label as string;
      }

      if (Array.isArray(definition.fields)) {
        const fields = Array<FieldViewModel>();

        definition.fields.forEach(fieldDefinition => {
          const id = crypto.randomUUID();
          const fieldViewModel = new FieldViewModel(
            id,
            "Field...",
            fieldDefinition.type
          );
          fieldViewModel.parse(fieldDefinition);
          fields.push(fieldViewModel);
        });
        this.fields.splice(0, this.fields.length, ...fields);
      }
    } catch (e) {
      if (e instanceof ParseError) {
        throw new ParseError(e.message + " << question: " + definition.label);
      } else {
        throw new ParseError(
          "Error while building a question with label: " + definition.label
        );
      }
    }
  }
}
