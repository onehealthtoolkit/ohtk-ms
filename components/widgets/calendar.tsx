import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  CalendarDate,
  CalendarEvent,
  CalendarViewModel,
} from "components/widgets/calendarViewModel";
import { observer } from "mobx-react";
import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

type CalendarProps<T extends CalendarEvent> = {
  viewModel: CalendarViewModel<T>;
  onMonthChange: () => void;
  dayEvents: (p: DayEventsProps<T>) => ReactElement;
};

export type DayEventsProps<T extends CalendarEvent> = {
  date: CalendarDate | null;
  viewModel: CalendarViewModel<T>;
};

const Calendar = <T extends CalendarEvent>({
  viewModel,
  onMonthChange,
  dayEvents,
}: CalendarProps<T>) => {
  const { t } = useTranslation();
  const monthNames = t("months", { joinArrays: "," }).split(",");
  const dayNames = t("days", { joinArrays: "," }).split(",");

  return (
    <div>
      <div className="py-4 px-8 flex flex-row justify-between item-center bg-gray-100">
        <h1 className="font-medium text-lg leading-10">
          {monthNames[viewModel.month]} {viewModel.year}
        </h1>
        <button
          className="rounded-md bg-white border border-gray-300 
                p-2 flex flex-row items-center hover:bg-gray-100
              "
        >
          <ChevronLeftIcon
            className="w-5 h-5 text-gray-400"
            onClick={() => {
              viewModel.previousMonth();
              onMonthChange();
            }}
          />
          <span
            className="px-5 text-sm text-gray-600"
            onClick={() => {
              viewModel.today();
              onMonthChange();
            }}
          >
            {t("filter.today", "Today")}
          </span>
          <ChevronRightIcon
            className="w-5 h-5 text-gray-400"
            onClick={() => {
              viewModel.nextMonth();
              onMonthChange();
            }}
          />
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="text-xs text-center">
            <th className="font-medium p-3 border">{dayNames[0]}</th>
            <th className="font-medium p-3 border">{dayNames[1]}</th>
            <th className="font-medium p-3 border">{dayNames[2]}</th>
            <th className="font-medium p-3 border">{dayNames[3]}</th>
            <th className="font-medium p-3 border">{dayNames[4]}</th>
            <th className="font-medium p-3 border">{dayNames[5]}</th>
            <th className="font-medium p-3 border">{dayNames[6]}</th>
          </tr>
        </thead>
        <tbody>
          {viewModel.days.map(
            (w, wIdx) =>
              w != null && (
                <tr key={"week" + wIdx} className="">
                  {w.map((d, idx) => (
                    <td
                      key={"week" + wIdx + "day" + idx}
                      className={`w-[14%] first:w-[15%] last:w-[15%] 
                    p-2 border text-xs ${
                      d && d.month === viewModel.month
                        ? "bg-white text-gray-700"
                        : "bg-gray-100 text-gray-400"
                    }
                  `}
                    >
                      <div className="h-24 flex flex-col">
                        <span
                          className={`rounded-full block w-6 p-1 text-center mb-2 ${
                            d && viewModel.isToday(d)
                              ? "bg-blue-500 text-white"
                              : ""
                          }`}
                        >
                          {d?.day}
                        </span>
                        {dayEvents({ date: d, viewModel })}
                      </div>
                    </td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default observer(Calendar);
