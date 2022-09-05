import PrimitiveField from "lib/opsvForm/models/fields/primitiveField";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { FieldParams } from ".";
import { ConditionOperator } from "../condition";

export type ImagesFieldParams = {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;
} & FieldParams;

export default class ImagesField extends PrimitiveField<Array<string>> {
  min?: number;
  max?: number;
  minMessage?: string;
  maxMessage?: string;

  // pending image ids to be uploaded to server
  _pendings?: Array<string> = undefined;

  constructor(id: string, name: string, params: ImagesFieldParams) {
    super(id, name, params);
    this.min = params.min;
    this.max = params.max;
    this.minMessage = params.minMessage;
    this.maxMessage = params.maxMessage;

    makeObservable(this, {
      _pendings: observable,
      pendings: computed,
      images: computed,
      addImage: action,
      removeImage: action,
    });
  }

  _validate(): boolean {
    return [this._validateRequired, this._validateMin, this._validateMax].every(
      fn => fn()
    );
  }

  _validateRequired = () => {
    if (!this.required) {
      return true;
    }
    const valid = this.pendings != undefined;
    if (!valid) {
      this.markError(this.requiredMessage || "This field is required");
    }
    return valid;
  };

  _validateMin = () => {
    if (!this.min) {
      return true;
    }

    const valid = this.pendings ? this.pendings.length >= this.min : true;
    if (!valid) {
      this.markError(
        this.minMessage ||
          `The number of images must be equal or greater than ${this.min}`
      );
    }
    return valid;
  };

  _validateMax = () => {
    if (!this.max) {
      return true;
    }

    const valid = this.pendings ? this.pendings.length <= this.max : true;
    if (!valid) {
      this.markError(
        this.maxMessage ||
          `The number of images must be equal or lesser than ${this.max}`
      );
    }
    return valid;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (this._value == undefined) {
      return false;
    } else {
      switch (operator) {
        case "contains":
          return this._value.includes(value);
        default:
          return false;
      }
    }
  }

  get pendings(): string[] | undefined {
    return this._pendings;
  }

  set pendings(value: string[] | undefined) {
    this.clearError();
    this._pendings = value;
  }

  get images(): string[] {
    const images =
      this._pendings
        ?.map(id => {
          const field = this.form?.images[this.name];
          return field ? (field[id] ? field[id] : null) : null;
        })
        .filter(img => img !== null) || [];
    return images as string[];
  }

  addImage(base64: string) {
    if (!this._pendings) {
      this._pendings = [];
    }
    const id = this.form?.addImage(this.name, base64);
    console.log(toJS(this.form?.images), "add image id", id);
    id && this._pendings?.push(id);
  }

  removeImage(id: string) {
    this.form?.removeImage(this.name, id);
    if (this._pendings) {
      const index = this._pendings.findIndex(val => id === val);
      if (index > -1) {
        console.log(toJS(this.form?.images), "remove image id", id);
        this._pendings.splice(index, 1);
      }
    }
  }
}
