import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { ReportListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import { formatDate, formatDateTime } from "lib/datetime";
import ReportFilter from "./filter";
import Filter from "components/widgets/filter";
import { isoStringToDate } from "lib/utils";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import CaseLink from "components/case/caseLink";
import { CalendarIcon, TableIcon } from "@heroicons/react/solid";
import Calendar from "components/widgets/calendar";
import { ReportDayEvents } from "components/report/dayEvents";
import { useTranslation } from "react-i18next";

const JSURL = require("jsurl");

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    throughDate: query.throughDate
      ? isoStringToDate(query.throughDate as string)
      : undefined,
    offset: query.offset ? parseInt(query.offset as string) : 0,
    authorities: query.authorities ? JSURL.parse(query.authorities) : [],
    reportTypes: query.reportTypes ? JSURL.parse(query.reportTypes) : [],
    isCalendar: query.isCalendar ? parseInt(query.isCalendar as string) : 0,
    calendarMonth: query.calendarMonth
      ? parseInt(query.calendarMonth as string)
      : undefined,
    calendarYear: query.calendarYear
      ? parseInt(query.calendarYear as string)
      : undefined,
  };
};

export const SwitchViewButton = tw.button`
  px-4 py-2 rounded
  flex items-center justify-center  
  ${(p: { active: number }) => {
    return p.active
      ? "text-white bg-blue-500"
      : "bg-white text-gray-500 border-gray-500 border";
  }}
`;

const ViewSwitch = ({
  isCalendarView,
  onSwitchView,
}: {
  isCalendarView: boolean;
  onSwitchView: (isCalendarView: boolean) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex space-x-2">
      <SwitchViewButton
        active={!isCalendarView ? 1 : 0}
        onClick={() => onSwitchView(false)}
      >
        <TableIcon className="w-5 h-5 mr-2" />
        <span>{t("filter.listView", "List")}</span>
      </SwitchViewButton>
      <SwitchViewButton
        active={isCalendarView ? 1 : 0}
        onClick={() => onSwitchView(true)}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>{t("filter.calendarView", "Calendar")}</span>
      </SwitchViewButton>
    </div>
  );
};

const ReportList = () => {
  const router = useRouter();
  const { reportService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<ReportListViewModel>(
    new ReportListViewModel(reportService)
  );

  useEffect(() => {
    if (router.isReady) {
      viewModel.setSearchValue(parseUrlParams(query));
    }
  }, [viewModel, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      fromDate: viewModel.filter.fromDate?.toISOString(),
      throughDate: viewModel.filter.throughDate?.toISOString(),
      offset: viewModel.offset,
      authorities: JSURL.stringify(viewModel.filter.authorities),
      reportTypes: JSURL.stringify(viewModel.filter.reportTypes),
      isCalendar: viewModel.isCalendarView ? 1 : 0,
      calendarMonth: viewModel.calendarViewModel.month,
      calendarYear: viewModel.calendarViewModel.year,
    });
  };

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <Observer>
      {() => (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <Filter
              onSearch={applySearch}
              onReset={() => {
                resetUrl();
              }}
            >
              <ReportFilter viewModel={viewModel} />
            </Filter>
            <ViewSwitch
              isCalendarView={viewModel.isCalendarView}
              onSwitchView={isCalendarView => {
                viewModel.switchView(isCalendarView);
                applySearch();
              }}
            />
          </div>

          <div className="mt-2">
            {viewModel.isCalendarView ? (
              <Calendar
                viewModel={viewModel.calendarViewModel}
                onMonthChange={() => {
                  applySearch();
                }}
                dayEvents={({ date, viewModel }) => (
                  <ReportDayEvents date={date} viewModel={viewModel} />
                )}
              />
            ) : (
              <>
                <Table
                  columns={[
                    {
                      label: "Created At",
                      get: record =>
                        formatDateTime(record.createdAt, router.locale),
                    },
                    {
                      label: "Incident Date",
                      get: record =>
                        formatDate(record.incidentDate, router.locale),
                    },
                    {
                      label: "Report Type",
                      get: record => record.reportTypeName,
                    },
                    {
                      label: "Data",
                      get: record => record.rendererData,
                    },
                    {
                      label: "",
                      get: record => <CaseLink caseId={record.caseId} />,
                    },
                  ]}
                  data={viewModel.data || []}
                  onView={record => router.push(`/reports/${record.id}`)}
                />
                <ErrorDisplay message={viewModel.errorMessage} />

                <Paginate
                  limit={viewModel.limit}
                  offset={viewModel.offset}
                  totalCount={viewModel.totalCount}
                  onChange={value => {
                    viewModel.offset = value;
                    applySearch();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </Observer>
  );
};

export default ReportList;
