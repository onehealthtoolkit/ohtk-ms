import { computed, makeObservable, observable } from "mobx";
import Field, { FieldParams } from ".";
import { ConditionOperator } from "../condition";

export type DateFieldParams = {
  withTime?: boolean;
  beInFuture?: boolean;
  beInPast?: boolean;
} & FieldParams;

export default class DateField extends Field {
  withTime: boolean;
  beInFuture: boolean;
  beInPast: boolean;

  _day?: number = undefined; // 1-31
  _month?: number = undefined; // 1-12
  _year?: number = undefined;
  _hour?: number = undefined;
  _minute?: number = undefined;

  constructor(id: string, name: string, params: DateFieldParams) {
    super(id, name, params);
    this.withTime = params.withTime != undefined ? params.withTime! : false;
    this.beInFuture =
      params.beInFuture != undefined ? params.beInFuture! : true;
    this.beInPast = params.beInPast != undefined ? params.beInPast! : true;
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

  get value(): any {
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
    }
    return date.toISOString();
  }

  toJsonValue(json: Record<string, any>): void {
    json[this.name] = this.value;
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
    return [this._validateRequired].every(fn => fn());
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
}
