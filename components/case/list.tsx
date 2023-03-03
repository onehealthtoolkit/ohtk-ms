import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { CaseListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import { formatDate, formatDateTime } from "lib/datetime";
import CaseFilter from "./filter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { ParsedUrlQuery } from "querystring";
import { isoStringToDate } from "lib/utils";
import Filter from "components/widgets/filter";
import CaseStatus from "./caseStatus";
import { CalendarIcon, TableIcon } from "@heroicons/react/solid";
import { CaseDayEvents } from "components/case/dayEvents";
import Calendar from "components/widgets/calendar";
import TotalItem from "components/widgets/table/totalItem";

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

const SwitchViewButton = tw.button`
  px-4 py-2 rounded
  flex items-center justify-center  
  ${(p: { active: number }) => {
    return p.active
      ? `text-white bg-[color:var(--button-bg-color)] hover:bg-[color:var(--button-hover-color)]   
        active:bg-[color:var(--button-bg-active-color)]
        active:border-[color:var(--button-border-active-color)]
        active:text-[color:var(--button-text-active-color)]
      `
      : `bg-white text-gray-500 border-gray-500 border hover:bg-gray-100`;
  }}
`;

const ViewSwitch = ({
  isCalendarView,
  onSwitchView,
}: {
  isCalendarView: boolean;
  onSwitchView: (isCalendarView: boolean) => void;
}) => {
  return (
    <div className="flex space-x-2">
      <SwitchViewButton
        active={!isCalendarView ? 1 : 0}
        onClick={() => onSwitchView(false)}
      >
        <TableIcon className="w-5 h-5 mr-2" />
        <span>ตาราง</span>
      </SwitchViewButton>
      <SwitchViewButton
        active={isCalendarView ? 1 : 0}
        onClick={() => onSwitchView(true)}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>ดูปฏิทินงาน</span>
      </SwitchViewButton>
    </div>
  );
};

const CaseList = () => {
  const router = useRouter();
  const { caseService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<CaseListViewModel>(() => {
    return new CaseListViewModel(caseService);
  });

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
          <div className="flex flex-wrap">
            <Filter
              onSearch={applySearch}
              onReset={() => {
                resetUrl();
              }}
            >
              <CaseFilter viewModel={viewModel} />
            </Filter>
            <div className="flex-grow ml-6">
              <TotalItem
                totalCount={viewModel.totalCount}
                onRefresh={() => viewModel.fetch(true)}
              />
            </div>
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
                  <CaseDayEvents date={date} viewModel={viewModel} />
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
                      label: "Case Type",
                      get: record => record.reportTypeName,
                    },
                    {
                      label: "Data",
                      get: record => record.rendererData,
                    },
                    {
                      label: "",
                      get: record => (
                        <CaseStatus isFinished={record.isFinished} />
                      ),
                    },
                  ]}
                  onLoading={viewModel.isLoading}
                  data={viewModel.data || []}
                  onView={record => router.push(`/cases/${record.id}`)}
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

export default CaseList;
