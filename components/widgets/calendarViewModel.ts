import { action, makeObservable, observable, toJS } from "mobx";

export type CalendarEvent = {
  id: string;
  name: string;
  day: number;
  month: number;
  year: number;
};

export type CalendarDate = {
  key: string;
  day: number;
  month: number;
  year: number;
};

/**
 * Based on C program to print the month by month calendar for the given year
 * https://www.geeksforgeeks.org/c-program-to-display-month-by-month-calendar-for-a-given-year/
 */
export abstract class CalendarViewModel<TEventModel extends CalendarEvent> {
  // config
  withDaysInOtherMonths = true;

  now = new Date();
  year = 0; // yyyy
  month = 0; // 0-11

  // a calendar month has 6-week slots, each week has 7-day slots
  days: Array<Array<CalendarDate | null> | null> = [...Array(6)].map<
    Array<CalendarDate | null>
  >(() => [...Array<CalendarDate | null>(7)].map(() => null));

  constructor({
    showDaysInOtherMonths,
  }: { showDaysInOtherMonths?: boolean } = {}) {
    makeObservable(this, {
      year: observable,
      month: observable,
      days: observable,
      printDays: action,
      previousMonth: action,
      today: action,
      nextMonth: action,
      toMonthYear: action,
    });
    if (showDaysInOtherMonths !== undefined) {
      this.withDaysInOtherMonths = showDaysInOtherMonths;
    }
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.printDays();
  }

  abstract get events(): Array<TEventModel>;

  isToday(day: number | null): boolean {
    return (
      this.now.getDate() === day &&
      this.month === this.now.getMonth() &&
      this.year === this.now.getFullYear()
    );
  }

  today() {
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.printDays();
  }

  toMonthYear(month: number, year: number) {
    this.year = year;
    this.month = month;
    this.printDays();
  }

  previousMonth() {
    if (this.month > 0) {
      this.month--;
    } else {
      this.month = 11;
      this.year--;
    }
    this.printDays();
  }

  nextMonth() {
    if (this.month < 11) {
      this.month++;
    } else {
      this.month = 0;
      this.year++;
    }
    this.printDays();
  }

  printDays() {
    // weekday from 0-6 for the first day of month
    const current = new Date(this.year, this.month, 1, 0, 0, 0, 0).getDay();
    const numOfDays = numberOfDays(this.month, this.year);
    console.log("current", current, "numOfDays", numOfDays);

    let week = 0;
    let weekday = 0;

    // leading days (previous month's days) before 1st of selected month
    this.days[week] ??= [];
    if (this.withDaysInOtherMonths) {
      const startDate = this.getStartDate();
      const day = startDate.getDate();
      const month = startDate.getMonth();
      const year = startDate.getFullYear();

      for (weekday = 0; weekday < current; weekday++) {
        this.days[week]![weekday] = {
          key: `${year}:${month}:${day + weekday}`,
          day: day + weekday,
          month,
          year,
        };
      }
    } else {
      for (weekday = 0; weekday < current; weekday++) {
        this.days[week]![weekday] = null;
      }
    }

    // actual days
    for (let i = 1; i <= numOfDays; i++) {
      this.days[week] ??= [];
      this.days[week]![weekday] = {
        key: `${this.year}:${this.month}:${i}`,
        day: i,
        month: this.month,
        year: this.year,
      };

      if (++weekday > 6) {
        weekday = 0;
        week++;
      }
    }

    // tailing days (next month's days) after end of selected month
    if (week < 6 && weekday > 0) {
      if (this.withDaysInOtherMonths) {
        const endDate = this.getEndDate();
        const day = endDate.getDate();
        const month = endDate.getMonth();
        const year = endDate.getFullYear();

        for (let j = 1; j <= day; j++) {
          this.days[week]![weekday] = {
            key: `${year}:${month}:${j}`,
            day: j,
            month,
            year,
          };
          weekday++;
        }
      } else {
        for (let j = weekday; j < 7; j++) {
          this.days[week]![j] = null;
        }
      }
      week++;
    }

    // remove week with no days
    while (week < 6) {
      this.days[week] = null;
      week++;
    }
    console.log("calendar", toJS(this.days));
  }

  getStartDate(): Date {
    let startDate: Date;

    if (this.withDaysInOtherMonths) {
      let month: number;
      let year: number;

      if (this.month > 0) {
        month = this.month - 1;
        year = this.year;
      } else {
        month = 11;
        year = this.year - 1;
      }

      const numOfDays = numberOfDays(month, year);
      const weekdayOfFirst = new Date(
        this.year,
        this.month,
        1,
        0,
        0,
        0,
        0
      ).getDay();

      if (weekdayOfFirst === 0) {
        startDate = new Date(this.year, this.month, 1, 0, 0, 0, 0);
      } else {
        const day = numOfDays - weekdayOfFirst + 1;
        startDate = new Date(year, month, day, 0, 0, 0, 0);
      }
    } else {
      startDate = new Date(this.year, this.month, 1, 0, 0, 0, 0);
    }

    console.log("startDate", startDate);
    return startDate;
  }

  getEndDate() {
    let endDate: Date;

    if (this.withDaysInOtherMonths) {
      let month: number;
      let year: number;

      if (this.month < 11) {
        month = this.month + 1;
        year = this.year;
      } else {
        month = 0;
        year = this.year + 1;
      }

      const weekdayOfNextMonthFirst = new Date(
        year,
        month,
        1,
        0,
        0,
        0,
        0
      ).getDay();

      if (weekdayOfNextMonthFirst === 0) {
        const numOfDays = numberOfDays(this.month, this.year);
        endDate = new Date(this.year, this.month, numOfDays, 23, 59, 59, 999);
      } else {
        const day = 7 - weekdayOfNextMonthFirst;
        endDate = new Date(year, month, day, 23, 59, 59, 999);
      }
    } else {
      const numOfDays = numberOfDays(this.month, this.year);
      endDate = new Date(this.year, this.month, numOfDays, 23, 59, 59, 999);
    }

    console.log("endDate", endDate);
    return endDate;
  }

  getDayEvents(date: CalendarDate | null) {
    return date
      ? this.events.filter(
          event =>
            event.day === date.day &&
            event.month === date.month &&
            event.year === date.year
        )
      : [];
  }
}

// Return the number of days in a month
function numberOfDays(monthNumber: number, year: number) {
  // January
  if (monthNumber == 0) return 31;

  // February
  if (monthNumber == 1) {
    // History about leap year:
    // https://www.quora.com/Calendars-Why-did-September-1752-have-fewer-days
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) return 29;
    else return 28;
  }

  // March
  if (monthNumber == 2) return 31;

  // April
  if (monthNumber == 3) return 30;

  // May
  if (monthNumber == 4) return 31;

  // June
  if (monthNumber == 5) return 30;

  // July
  if (monthNumber == 6) return 31;

  // August
  if (monthNumber == 7) return 31;

  // September
  if (monthNumber == 8) return 30;

  // October
  if (monthNumber == 9) return 31;

  // November
  if (monthNumber == 10) return 30;

  // December
  if (monthNumber == 11) return 31;

  return 0;
}
