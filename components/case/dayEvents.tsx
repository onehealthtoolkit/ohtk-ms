import { CaseEvent } from "components/case/calendarViewModel";
import { DayEventsProps } from "components/widgets/calendar";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export const CaseDayEvents = observer(
  ({ date, viewModel }: DayEventsProps<CaseEvent>) => {
    const { t } = useTranslation();
    const router = useRouter();
    const events = viewModel.getDayEvents(date);
    return (
      <div className="flex-grow flex flex-col gap-1 overflow-y-auto">
        {events.map(event => (
          <p
            key={event.id}
            className="font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push(`/cases/${event.id}`)}
          >
            {event.name}
            {event.isFinished && (
              <span
                className="float-right bg-green-400 text-white 
                  font-normal rounded px-1
                "
              >
                {t("status.finished", "finished")}
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
);
