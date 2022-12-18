import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { ObservationListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import { formatDateTime } from "lib/datetime";
import Filter from "components/widgets/filter";
import { isoStringToDate } from "lib/utils";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { CalendarIcon, TableIcon } from "@heroicons/react/solid";
import Calendar from "components/widgets/calendar";
import { ObservationDayEvents } from "components/observation/dayEvents";
import { useTranslation } from "react-i18next";
import TotalItem from "components/widgets/table/totalItem";
import ObservationFilter from "./filter";

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    definitionId: parseInt(query.definitionId as string),
    definitionName: query.definitionName as string,
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    throughDate: query.throughDate
      ? isoStringToDate(query.throughDate as string)
      : undefined,
    offset: query.offset ? parseInt(query.offset as string) : 0,
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
      ? `text-white bg-blue-500 hover:bg-blue-600`
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

const ObservationList = () => {
  const router = useRouter();
  const { observationService } = useServices();
  const { setUrl, resetUrl, query } = useUrlParams();

  const [viewModel] = useState<ObservationListViewModel>(
    new ObservationListViewModel(observationService)
  );

  useEffect(() => {
    if (router.isReady) {
      viewModel.setSearchValue(parseUrlParams(query));
    }
  }, [viewModel, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      definitionId: viewModel.filter.definitionId,
      definitionName: query.definitionName,
      fromDate: viewModel.filter.fromDate?.toISOString(),
      throughDate: viewModel.filter.throughDate?.toISOString(),
      offset: viewModel.offset,
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
                resetUrl({
                  definitionId: viewModel.filter.definitionId,
                  definitionName: router.query.definitionName as string,
                });
              }}
            >
              <ObservationFilter viewModel={viewModel} />
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
                  <ObservationDayEvents date={date} viewModel={viewModel} />
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
                      label: "Identity",
                      get: record => record.identity,
                    },
                    {
                      label: "Title",
                      get: record => record.title,
                    },
                    {
                      label: "Description",
                      get: record => record.description,
                    },
                  ]}
                  data={viewModel.data || []}
                  onView={record =>
                    router.push({
                      pathname: `/observations/${record.id}`,
                      query: {
                        definitionId: viewModel.filter.definitionId,
                        definitionName: router.query.definitionName as string,
                      },
                    })
                  }
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

export default ObservationList;
