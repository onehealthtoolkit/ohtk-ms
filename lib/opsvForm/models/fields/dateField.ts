import { formatYmd, formatYmdt } from "lib/datetime";
import { computed, makeObservable, observable } from "mobx";
import Field, { FieldParams } from ".";
import { ConditionOperator } from "../condition";

export type DateFieldParams = {
  withTime?: boolean;
  backwardDaysOffset?: number;
  forwardDaysOffset?: number;
} & FieldParams;

export default class DateField extends Field {
  withTime: boolean;
  backwardDaysOffset?: number;
  forwardDaysOffset?: number;

  _day?: number = undefined; // 1-31
  _month?: number = undefined; // 1-12
  _year?: number = undefined;
  _hour?: number = undefined;
  _minute?: number = undefined;

  constructor(id: string, name: string, params: DateFieldParams) {
    super(id, name, params);
    this.withTime = params.withTime != undefined ? params.withTime! : false;
    this.backwardDaysOffset = params.backwardDaysOffset;
    this.forwardDaysOffset = params.forwardDaysOffset;

    makeObservable(this, {
      _day: observable,
      _month: observable,
      _year: observable,
      _hour: observable,
      _minute: observable,
      day: computed,
      month: computed,
      year: computed,
      hour: computed,
      minute: computed,
    });
  }

  get day(): number | undefined {
    return this._day;
  }
  set day(day: number | undefined) {
    this._day = day;
  }

  get month(): number | undefined {
    return this._month;
  }
  set month(month: number | undefined) {
    this._month = month;
  }

  get year(): number | undefined {
    return this._year;
  }
  set year(year: number | undefined) {
    this._year = year;
  }

  get hour(): number | undefined {
    return this._hour;
  }
  set hour(hour: number | undefined) {
    this._hour = hour;
  }

  get minute(): number | undefined {
    return this._minute;
  }
  set minute(minute: number | undefined) {
    this._minute = minute;
  }

  get value(): string | undefined {
    if (
      this.year === undefined ||
      this.month === undefined ||
      this.day === undefined ||
      (this.withTime && (this.hour === undefined || this.minute === undefined))
    ) {
      return undefined;
    }
    const date = new Date(this.year, this.month - 1, this.day);
    if (this.withTime) {
      if (this.hour !== undefined) {
        date.setHours(this.hour);
      }
      if (this.minute !== undefined) {
        date.setMinutes(this.minute);
      }
    } else {
      date.setHours(0);
      date.setMinutes(0);
    }
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  }

  toJsonValue(json: Record<string, any>): void {
    json[this.name] = this.value;
    json[this.name + "__value"] = this.renderedValue;
  }

  loadJsonValue(json: Record<string, any>): void {
    const value = json[this.name];
    if (value !== undefined) {
      const date = new Date(value);
      this.day = date.getDate();
      this.month = date.getMonth() + 1;
      this.year = date.getFullYear();
      if (this.withTime) {
        this.hour = date.getHours();
        this.minute = date.getMinutes();
      }
    }
  }

  _validate(): boolean {
    return [this._validateRequired, this._validateMin, this._validateMax].every(
      fn => fn()
    );
  }

  // using arrow function to avoid "this" binding issue.
  _validateRequired = () => {
    if (!this.required) {
      return true;
    }
    const valid = this.value != undefined && this.value.length > 0;
    if (!valid) {
      this.markError(this.requiredMessage || "This field is required");
    }
    return valid;
  };

  _validateMin = () => {
    if (this.backwardDaysOffset === undefined) {
      return true;
    }

    let valid = true;
    if (this.value) {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() - this.backwardDaysOffset);

      if (!this.withTime) {
        minDate.setHours(0);
        minDate.setMinutes(0);
        minDate.setSeconds(0);
        minDate.setMilliseconds(0);
      }

      const selectedDate = new Date(this.value);
      valid = selectedDate.getTime() >= minDate.getTime();

      if (!valid) {
        this.markError(
          `This value must be equal or greater than ${minDate.toLocaleDateString()} ` +
            (this.withTime ? minDate.toLocaleTimeString() : "")
        );
      }
    }
    return valid;
  };

  _validateMax = () => {
    if (this.forwardDaysOffset === undefined) {
      return true;
    }

    let valid = true;
    if (this.value) {
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + this.forwardDaysOffset);

      if (!this.withTime) {
        maxDate.setHours(0);
        maxDate.setMinutes(0);
        maxDate.setSeconds(0);
        maxDate.setMilliseconds(0);
      }

      const selectedDate = new Date(this.value);
      valid = selectedDate.getTime() <= maxDate.getTime();

      if (!valid) {
        this.markError(
          `This value must be equal or less than ${maxDate.toLocaleDateString()} ` +
            (this.withTime ? maxDate.toLocaleTimeString() : "")
        );
      }
    }
    return valid;
  };

  evaluate(operator: ConditionOperator, value: string): boolean {
    if (operator === "=") {
      try {
        // expect value to be in yyyy-dd-mm
        const date = new Date(value);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (this.day == day && this.month == month && this.year == year) {
          return true;
        }
      } catch (e) {
        console.error(e);
      }
    }

    return false;
  }

  get renderedValue(): string {
    return this.value !== null && typeof this.value !== "undefined"
      ? this.withTime
        ? formatYmdt(this.value)
        : formatYmd(this.value)
      : "";
  }
}
