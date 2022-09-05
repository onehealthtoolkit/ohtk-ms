import {
  FieldViewModel,
  TFieldValueType,
} from "components/admin/formBuilder/field";
import {
  ComparableOperatorViewModel,
  ConditionDefinition,
  Definition,
  MovableItemsViewModel,
  OperatorViewModel,
  ParseError,
} from "components/admin/formBuilder/shared";
import { action, computed, makeObservable, observable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export class QuestionViewModel extends MovableItemsViewModel<FieldViewModel> {
  isCurrent = false;
  isFieldMenusOpen = false;
  fields = Array<FieldViewModel>();
  currentField: FieldViewModel | undefined = undefined;
  isAdvanceOn = false;
  _condition: OperatorViewModel = new ComparableOperatorViewModel("=", "", "");

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
      isAdvanceOn: observable,
      toggleAdvanceOn: action,
      _condition: observable,
      condition: computed,
    });
  }

  get movableItems() {
    return this.fields;
  }

  get condition(): OperatorViewModel {
    return this._condition;
  }
  set condition(condition: OperatorViewModel) {
    this._condition = condition;
  }

  toggleAdvanceOn() {
    return (this.isAdvanceOn = !this.isAdvanceOn);
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
    this.isAdvanceOn = false;
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
    const id = uuidv4();
    this.fields.push(new FieldViewModel(id, "", type));
    this.selectField(id);
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
      } else {
        this.label = "Question";
      }
      if (definition.description !== undefined) {
        this.description = definition.description as string;
      } else {
        this.description = "";
      }

      if (Array.isArray(definition.fields)) {
        const fields = Array<FieldViewModel>();

        definition.fields.forEach(fieldDefinition => {
          const id = uuidv4();
          const fieldViewModel = new FieldViewModel(
            id,
            "Field",
            fieldDefinition.type as TFieldValueType
          );
          fieldViewModel.parse(fieldDefinition);
          fields.push(fieldViewModel);
        });
        this.fields.splice(0, this.fields.length, ...fields);
      } else {
        this.fields.splice(0, this.fields.length);
      }

      if (definition.condition !== undefined) {
        const condition = definition.condition as ConditionDefinition;
        if (condition.operator !== undefined) {
          this.condition = new OperatorViewModel(condition.operator);
          this.condition.parse(condition);
        } else {
          throw new ParseError(
            "Error building condition with invalid operator: " +
              definition.operator
          );
        }
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

  toJson() {
    const json: Definition = {
      label: this.label,
      description: this.description,
    };
    const fields = Array<Definition>();
    this.fields.forEach(field => {
      fields.push(field.toJson());
    });
    json.fields = fields;

    const condition = this.condition.toJson();
    if (Object.keys(condition).length > 0) {
      json.condition = condition;
    }
    return json;
  }
}
