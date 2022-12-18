import { ObservationEvent } from "components/observation/calendarViewModel";
import { DayEventsProps } from "components/widgets/calendar";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

export const ObservationDayEvents = observer(
  ({ date, viewModel }: DayEventsProps<ObservationEvent>) => {
    const router = useRouter();
    const events = viewModel.getDayEvents(date);
    return (
      <div className="flex-grow flex flex-col gap-1 overflow-y-auto">
        {events.map(event => (
          <p
            key={event.id}
            className="font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() =>
              router.push({
                pathname: `/observations/${event.id}`,
                query: {
                  definitionId: router.query.definitionId,
                  definitionName: router.query.definitionName,
                },
              })
            }
          >
            {event.name}
          </p>
        ))}
      </div>
    );
  }
);
