import { CalendarViewModel } from "components/widgets/calendarViewModel";
import { ObservationSubject } from "lib/services/observation";
import { makeObservable, observable } from "mobx";

export type ObservationCalendarParams = {
  isCalendar?: number;
  calendarMonth?: number;
  calendarYear?: number;
};

export type ObservationEvent = {
  id: string;
  name: string;
  caseId?: string;
  day: number;
  month: number;
  year: number;
};

export class ObservationCalendarViewModel extends CalendarViewModel<ObservationEvent> {
  observationEvents = Array<ObservationEvent>();

  constructor() {
    super();
    makeObservable(this, {
      observationEvents: observable,
    });
  }

  get events(): ObservationEvent[] {
    return this.observationEvents;
  }

  updateObservationEvents(observations: ObservationSubject[]) {
    this.observationEvents = observations.map(observation => {
      const createdAt = new Date(observation.createdAt);
      const day = createdAt.getDate();
      const month = createdAt.getMonth();
      const year = createdAt.getFullYear();

      return {
        id: observation.id,
        name: observation.title,
        day,
        month,
        year,
      };
    });
  }
}
