import { CalendarViewModel } from "components/widgets/calendarViewModel";
import { Case } from "lib/services/case";
import { makeObservable, observable } from "mobx";

export type CaseCalendarParams = {
  isCalendar?: number;
  calendarMonth?: number;
  calendarYear?: number;
};

export type CaseEvent = {
  id: string;
  name: string;
  isFinished: boolean;
  day: number;
  month: number;
  year: number;
};

export class CaseCalendarViewModel extends CalendarViewModel<CaseEvent> {
  caseEvents = Array<CaseEvent>();

  constructor() {
    super();
    makeObservable(this, {
      caseEvents: observable,
    });
  }

  get events(): CaseEvent[] {
    return this.caseEvents;
  }

  updateCaseEvents(cases: Case[]) {
    this.caseEvents = cases.map(reportCase => {
      let day = 0,
        month = 0,
        year = 0;

      if (reportCase.incidentDate) {
        const incidentDate = new Date(reportCase.incidentDate);
        day = incidentDate.getDate();
        month = incidentDate.getMonth();
        year = incidentDate.getFullYear();
      }

      return {
        id: reportCase.id,
        isFinished: reportCase.isFinished,
        name: reportCase.reportTypeName || "",
        day,
        month,
        year,
      };
    });
  }
}
