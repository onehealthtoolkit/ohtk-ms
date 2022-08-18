import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { ReportCalendarViewModel } from "components/report/calendarViewModel";
import { MONTHS } from "lib/datetime";
import { observer } from "mobx-react";
import { useRouter } from "next/router";

type ReportCalendarProps = {
  viewModel: ReportCalendarViewModel;
};

type DayEventsProps = {
  day: number | null;
  viewModel: ReportCalendarViewModel;
};

const DayEvents = observer(({ day, viewModel }: DayEventsProps) => {
  const router = useRouter();
  const events = viewModel.getDayEvents(day);
  return (
    <div className="flex-grow flex flex-col gap-1 overflow-y-scroll ">
      {events.map(event => (
        <p
          key={event.report.id}
          className="font-bold hover:bg-gray-100"
          onClick={() => router.push(`/reports/${event.report.id}`)}
        >
          {event.report.reportTypeName}{" "}
          {event.report.caseId && (
            <span
              className="float-right bg-red-500 text-white 
                font-normal rounded px-1
              "
            >
              case
            </span>
          )}
        </p>
      ))}
    </div>
  );
});

const ReportCalendar = ({ viewModel }: ReportCalendarProps) => {
  return (
    <div>
      <div className="py-4 px-8 flex flex-row justify-between item-center bg-gray-100">
        <h1 className="font-medium text-lg leading-10">
          {MONTHS[viewModel.month]} {viewModel.year}
        </h1>
        <button
          className="rounded-md bg-white border border-gray-300 
                p-2 flex flex-row items-center
              "
        >
          <ChevronLeftIcon
            className="w-5 h-5 text-gray-400"
            onClick={() => viewModel.previousMonth()}
          />
          <span
            className="px-5 text-sm text-gray-600"
            onClick={() => viewModel.today()}
          >
            Today
          </span>
          <ChevronRightIcon
            className="w-5 h-5 text-gray-400"
            onClick={() => viewModel.nextMonth()}
          />
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="text-xs text-center">
            <th className="font-medium p-3 border">Sun</th>
            <th className="font-medium p-3 border">Mon</th>
            <th className="font-medium p-3 border">Tue</th>
            <th className="font-medium p-3 border">Wed</th>
            <th className="font-medium p-3 border">Thu</th>
            <th className="font-medium p-3 border">Fri</th>
            <th className="font-medium p-3 border">Sat</th>
          </tr>
        </thead>
        <tbody>
          {viewModel.days.map(w => (
            <tr key={"week" + w} className="">
              {w.map((d, idx) => (
                <td
                  key={w + "day" + idx}
                  className={`w-[14%] first:w-[15%] last:w-[15%] 
                  p-2 border text-xs text-gray-600 ${
                    d ? "bg-white" : "bg-gray-100"
                  }
                `}
                >
                  <div className="h-32 flex flex-col">
                    <span
                      className={`rounded-full block w-6 p-1 text-center mb-2 ${
                        viewModel.isToday(d) ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {d}
                    </span>
                    <DayEvents day={d} viewModel={viewModel} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default observer(ReportCalendar);
