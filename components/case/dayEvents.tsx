import { CaseEvent } from "components/case/calendarViewModel";
import { DayEventsProps } from "components/widgets/calendar";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function finishedBadgeClass(
  closeOutcome?: string,
  closeSource?: string
): string {
  if (closeSource === "system") {
    return "bg-amber-50 text-amber-800 border border-amber-200";
  }
  if (closeOutcome === "false_positive") {
    return "bg-slate-100 text-slate-600 border border-slate-300";
  }
  if (closeOutcome === "close_case") {
    return "bg-green-500 text-white";
  }
  return "bg-green-400 text-white";
}

function finishedBadgeLabel(
  t: (k: string, d: string) => string,
  closeOutcome?: string,
  closeSource?: string
): string {
  if (closeSource === "system") {
    return t("case.finish.systemTimeout", "Automatic close");
  }
  if (closeOutcome === "false_positive") {
    return t("case.finish.falsePositive", "False positive");
  }
  if (closeOutcome === "close_case") {
    return t("case.finish.closeCase", "Close case");
  }
  return t("status.finished", "Finished");
}

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
                className={`float-right font-normal rounded px-1 text-xs ${finishedBadgeClass(
                  event.closeOutcome,
                  event.closeSource
                )}`}
              >
                {finishedBadgeLabel(t, event.closeOutcome, event.closeSource)}
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
);
