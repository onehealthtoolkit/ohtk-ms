import { Report } from "lib/services/report";
import { action, makeObservable, observable, toJS } from "mobx";

type Event = {
  report: Report;
  day: number;
  month: number;
  year: number;
};

/**
 * Based on C program to print the month by month calendar for the given year
 * https://www.geeksforgeeks.org/c-program-to-display-month-by-month-calendar-for-a-given-year/
 */
export class ReportCalendarViewModel {
  now = new Date();
  year = 0; // yyyy
  month = 0; // 0-11
  // a calendar month has 6-week slots, each week has 7-day slots
  days = [...Array(6)].map<Array<number | null>>(() =>
    [...Array<number | null>(7)].map(() => null)
  );
  events = Array<Event>();

  constructor() {
    makeObservable(this, {
      year: observable,
      month: observable,
      days: observable,
      events: observable,
      printDays: action,
      previousMonth: action,
      today: action,
      nextMonth: action,
    });
    this.year = this.now.getFullYear();
    this.month = this.now.getMonth();
    this.printDays();
  }

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

    // leading days before 1st
    for (weekday = 0; weekday < current; weekday++) {
      this.days[week][weekday] = null;
    }

    // actual days
    for (let i = 1; i <= numOfDays; i++) {
      this.days[week][weekday] = i;

      if (++weekday > 6) {
        weekday = 0;
        week++;
      }
    }

    // tailing days after end of month
    while (week <= 5) {
      for (let j = weekday; j < 7; j++) {
        this.days[week][j] = null;
      }
      weekday = 0;
      week++;
    }
    console.log("calendar", toJS(this.days));
  }

  updateEvents(reports: Report[]) {
    this.events = reports.map(report => {
      const incidentDate = new Date(report.incidentDate);
      const day = incidentDate.getDate();
      const month = incidentDate.getMonth();
      const year = incidentDate.getFullYear();

      return {
        report,
        day,
        month,
        year,
      };
    });
  }

  getDayEvents(day: number | null) {
    return day
      ? this.events.filter(
          event =>
            event.day === day &&
            event.month === this.month &&
            event.year === this.year
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
