import {
  DateFieldViewModel,
  DecimalFieldViewModel,
  ImagesFieldViewModel,
  IntegerFieldViewModel,
  LocationFieldViewModel,
  MultiplechoicesFieldViewModel,
  SinglechoicesFieldViewModel,
  TextFieldViewModel,
} from "components/admin/formBuilder/field/extensions";
import {
  AbstractDefinitionViewModel,
  BaseViewModel,
  Definition,
  ParseError,
} from "components/admin/formBuilder/shared";
import {
  ComparableOperatorViewModel,
  ConditionDefinition,
  OperatorViewModel,
} from "components/admin/formBuilder/shared/operatorViewModel";
import { action, computed, makeObservable, observable } from "mobx";

export const FIELD_TYPES = [
  "text",
  "integer",
  "decimal",
  "date",
  "images",
  "location",
  "singlechoices",
  "multiplechoices",
] as const;

export type TFieldValueType = typeof FIELD_TYPES[number];
export type TFieldExtensionType<T> = T extends "text"
  ? TextFieldViewModel
  : T extends "integer"
  ? IntegerFieldViewModel
  : T extends "decimal"
  ? DecimalFieldViewModel
  : T extends "date"
  ? DateFieldViewModel
  : T extends "images"
  ? ImagesFieldViewModel
  : T extends "location"
  ? LocationFieldViewModel
  : T extends "singlechoices"
  ? SinglechoicesFieldViewModel
  : T extends "multiplechoices"
  ? MultiplechoicesFieldViewModel
  : never;

export class FieldViewModel extends BaseViewModel {
  isCurrent = false;
  name = "";
  fieldType: TFieldValueType = "text";
  isNameEditing = false;
  isRequired = false;
  isAdvanceOn = false;
  _extension: unknown = undefined;
  _condition: OperatorViewModel = new ComparableOperatorViewModel("=", "", "");

  constructor(id: string, label: string, type: TFieldValueType = "text") {
    super(id, label);
    makeObservable(this, {
      name: observable,
      fieldType: observable,
      isCurrent: observable,
      isNameEditing: observable,
      setIsNameEditing: action,
      setName: action,
      setCurrent: action,
      unsetCurrent: action,
      isRequired: observable,
      toggleRequired: action,
      isAdvanceOn: observable,
      toggleAdvanceOn: action,
      _extension: observable,
      fieldTypeName: computed,
      _condition: observable,
      condition: computed,
    });
    this.fieldType = type;
    this.name = "name";
    this._extension = this.constructExtension(type);
  }

  constructExtension(type: string): TFieldExtensionType<TFieldValueType> {
    switch (type) {
      case "text":
        return new TextFieldViewModel();
      case "integer":
        return new IntegerFieldViewModel();
      case "decimal":
        return new DecimalFieldViewModel();
      case "date":
        return new DateFieldViewModel();
      case "images":
        return new ImagesFieldViewModel();
      case "location":
        return new LocationFieldViewModel();
      case "singlechoices":
        return new SinglechoicesFieldViewModel();
      case "multiplechoices":
        return new MultiplechoicesFieldViewModel();
      default:
        return new TextFieldViewModel();
    }
  }

  get condition(): OperatorViewModel {
    return this._condition;
  }
  set condition(condition: OperatorViewModel) {
    this._condition = condition;
  }

  get fieldTypeName() {
    switch (this.fieldType) {
      case "text":
        return "Text";
      case "integer":
        return "Integer";
      case "decimal":
        return "Decimal";
      case "date":
        return "Date";
      case "images":
        return "Images";
      case "location":
        return "Location";
      case "singlechoices":
        return "Single choice";
      case "multiplechoices":
        return "Multiple choices";
      default:
        return "Unknown";
    }
  }

  getExtension<T>() {
    return this._extension as TFieldExtensionType<T>;
  }

  setIsNameEditing(editing: boolean) {
    if (!editing && !this.name) {
      this.setName("");
    }
    this.isNameEditing = editing;
  }

  setName(name: string) {
    this.name = name;
  }

  setCurrent() {
    this.isCurrent = true;
  }

  unsetCurrent() {
    this.isCurrent = false;
    this.isAdvanceOn = false;
    this.closeAllDialogs();
  }

  toggleRequired() {
    return (this.isRequired = !this.isRequired);
  }

  toggleAdvanceOn() {
    return (this.isAdvanceOn = !this.isAdvanceOn);
  }

  parse(definition: Definition) {
    try {
      if (definition.label !== undefined) {
        this.label = definition.label as string;
      } else {
        this.label = "Field";
      }

      if (definition.name !== undefined && definition.type !== undefined) {
        this.name = definition.name as string;
        this.fieldType = definition.type as TFieldValueType;

        if (definition.required !== undefined) {
          this.isRequired = Boolean(definition.required);
        } else {
          this.isRequired = false;
        }

        const fieldType = String(definition.type);
        if (FIELD_TYPES.indexOf(this.fieldType) > -1) {
          (this.getExtension() as AbstractDefinitionViewModel).parse(
            definition
          );
        } else {
          throw new ParseError("Invalid field type: " + fieldType);
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
      } else {
        throw new ParseError(
          "Error while building a field without name or type"
        );
      }
    } catch (e) {
      if (e instanceof ParseError) {
        throw new ParseError(e.message + " << field: " + definition.label);
      } else {
        throw new ParseError(
          "Error while building a field with name: " + definition.name
        );
      }
    }
  }

  toJson() {
    const json: Definition = {
      id: this.name,
      label: this.label,
      name: this.name,
      type: this.fieldType,
      required: this.isRequired,
    };

    let ext = {};
    if (FIELD_TYPES.indexOf(this.fieldType) > -1) {
      ext = (this.getExtension() as AbstractDefinitionViewModel).toJson();
    }

    const condition = this.condition.toJson();
    if (Object.keys(condition).length > 0) {
      json.condition = condition;
    }
    return { ...json, ...ext };
  }
}
