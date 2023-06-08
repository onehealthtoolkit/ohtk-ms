import PrimitiveField from "lib/opsvForm/models/fields/primitiveField";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { FieldParams } from ".";
import { ConditionOperator } from "../condition";

export type FilesFieldParams = {
  min?: number;
  max?: number;
  maxSize?: number;
  audio?: boolean;
  video?: boolean;
  document?: boolean;
  supportTypes: Array<string>;
} & FieldParams;

export default class FilesField extends PrimitiveField<Array<string>> {
  min?: number;
  max?: number;
  maxSize?: number;
  audio?: boolean;
  video?: boolean;
  document?: boolean;
  supportTypes = Array<string>();

  // pending file ids to be uploaded to server
  _pendings?: Array<string> = undefined;

  constructor(id: string, name: string, params: FilesFieldParams) {
    super(id, name, params);
    this.min = params.min;
    this.max = params.max;
    this.maxSize = params.maxSize;
    this.audio = params.audio;
    this.video = params.video;
    this.document = params.document;
    this.supportTypes = params.supportTypes || [];

    makeObservable(this, {
      _pendings: observable,
      pendings: computed,
      files: computed,
      addFile: action,
      removeFile: action,
    });
  }

  _validate(): boolean {
    return [
      this._validateRequired,
      this._validateMin,
      this._validateMax,
      this._validateMaxSize,
      this._validateSupportTypes,
    ].every(fn => fn());
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
        `The number of files must be equal or greater than ${this.min}`
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
        `The number of files must be equal or lesser than ${this.max}`
      );
    }
    return valid;
  };

  _validateMaxSize = () => {
    if (!this.maxSize) {
      return true;
    }

    let valid = true;
    let index = 0;
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (file.size > this.maxSize) {
        valid = false;
        index = i;
        break;
      }
    }

    if (!valid) {
      this.markError(
        `File #${index + 1} must be equal or lesser than ${this.maxSize} bytes`
      );
    }
    return valid;
  };

  _validateSupportTypes = () => {
    if (this.supportTypes.length === 0) {
      return true;
    }

    let valid = true;
    let index = 0;
    let fileType = "";
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      if (this.supportTypes.indexOf(file.type) === -1) {
        valid = false;
        index = i;
        fileType = file.type;
        break;
      }
    }

    if (!valid) {
      this.markError(
        `File #${index + 1} with type: ${fileType} is not supported`
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

  get files(): File[] {
    const files =
      this._pendings
        ?.map(id => {
          const field = this.form?.files[this.name];
          return field ? (field[id] ? field[id] : null) : null;
        })
        .filter(f => f !== null) || [];
    return files as File[];
  }

  addFile(file: File) {
    if (!this._pendings) {
      this._pendings = [];
    }
    const id = this.form?.addFile(this.name, file);
    if (id) {
      console.log("Add file id", id);
      console.log("Total files", toJS(this.form?.files[this.name]));
      this._pendings?.push(id);
      this.clearError();
    }
  }

  removeFile(id: string) {
    this.form?.removeFile(this.name, id);
    if (this._pendings) {
      const index = this._pendings.findIndex(val => id === val);
      if (index > -1) {
        console.log("Remove file id", id);
        console.log("Total files", toJS(this.form?.files[this.name]));
        this._pendings.splice(index, 1);
        this.clearError();
      }
    }
  }
}
