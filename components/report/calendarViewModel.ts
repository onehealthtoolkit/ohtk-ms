import { CalendarViewModel } from "components/widgets/calendarViewModel";
import { Report } from "lib/services/report";
import { makeObservable, observable } from "mobx";

export type ReportCalendarParams = {
  isCalendar?: number;
  calendarMonth?: number;
  calendarYear?: number;
};

export type ReportEvent = {
  id: string;
  name: string;
  caseId?: string;
  testFlag: boolean;
  day: number;
  month: number;
  year: number;
};

export class ReportCalendarViewModel extends CalendarViewModel<ReportEvent> {
  reportEvents = Array<ReportEvent>();

  constructor() {
    super();
    makeObservable(this, {
      reportEvents: observable,
    });
  }

  get events(): ReportEvent[] {
    return this.reportEvents;
  }

  updateReportEvents(reports: Report[]) {
    this.reportEvents = reports.map(report => {
      const incidentDate = new Date(report.incidentDate);
      const day = incidentDate.getDate();
      const month = incidentDate.getMonth();
      const year = incidentDate.getFullYear();

      return {
        id: report.id,
        name: report.reportTypeName,
        caseId: report.caseId,
        testFlag: report.testFlag,
        day,
        month,
        year,
      };
    });
  }
}
