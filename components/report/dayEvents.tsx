import { ReportEvent } from "components/report/calendarViewModel";
import { DayEventsProps } from "components/widgets/calendar";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

export const ReportDayEvents = observer(
  ({ date, viewModel }: DayEventsProps<ReportEvent>) => {
    const router = useRouter();
    const events = viewModel.getDayEvents(date);
    return (
      <div className="flex-grow flex flex-col gap-1 overflow-y-auto">
        {events.map(event => (
          <p
            key={event.id}
            className="font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push(`/reports/${event.id}`)}
          >
            {event.name}
            {event.caseId && (
              <span
                className="float-right bg-red-500 text-white 
                  font-normal rounded px-1
                "
                onClick={e => {
                  e.stopPropagation();
                  router.push(`/cases/${event.caseId}`);
                }}
              >
                case
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
);
