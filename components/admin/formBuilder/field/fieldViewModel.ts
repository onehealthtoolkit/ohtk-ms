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
  BaseViewModel,
  Definition,
  ParseError,
} from "components/admin/formBuilder/shared";
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
      this.setName("...");
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
      }

      if (definition.name !== undefined && definition.type !== undefined) {
        this.name = definition.name as string;
        this.fieldType = definition.type as TFieldValueType;

        if (definition.required !== undefined) {
          this.isRequired = Boolean(definition.required);
        }

        const fieldType = String(definition.type);
        switch (fieldType) {
          case "text":
            this.getExtension<"text">().parse(definition);
            break;
          case "integer":
            this.getExtension<"integer">().parse(definition);
            break;
          case "decimal":
            this.getExtension<"decimal">().parse(definition);
            break;
          case "date":
            this.getExtension<"date">().parse(definition);
            break;
          case "images":
            this.getExtension<"images">().parse(definition);
            break;
          case "location":
            this.getExtension<"location">().parse(definition);
            break;
          case "singlechoices":
            this.getExtension<"singlechoices">().parse(definition);
            break;
          case "multiplechoices":
            this.getExtension<"multiplechoices">().parse(definition);
            break;
          default:
            throw new ParseError("Invalid field type: " + fieldType);
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
}
