import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { ObservationListViewModel, ObservationViewMode } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import { formatDateTime } from "lib/datetime";
import Filter from "components/widgets/filter";
import { isoStringToDate } from "lib/utils";
import { ParsedUrlQuery } from "querystring";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import {
  CalendarIcon,
  TableIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import Calendar from "components/widgets/calendar";
import { ObservationDayEvents } from "components/observation/dayEvents";
import { useTranslation } from "react-i18next";
import TotalItem from "components/widgets/table/totalItem";
import ObservationFilter from "./filter";
import { toJS } from "mobx";
import dynamic from "next/dynamic";
import FilterQuery from "components/observation/filterQuery";
import { ExportButton } from "components/widgets/forms";
import { currentExcelEndpoint } from "components/excel/filter";

export const Map = dynamic(() => import("./map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    definitionId: parseInt(query.definitionId as string),
    definitionName: query.definitionName as string,
    viewMode: query.viewMode ? parseInt(query.viewMode as string) : 0,
    q: query.q as string,
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
  viewMode,
  onSwitchView,
}: {
  viewMode: ObservationViewMode;
  onSwitchView: (isCalendarView: ObservationViewMode) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex space-x-2">
      <SwitchViewButton
        active={viewMode == ObservationViewMode.list ? 1 : 0}
        onClick={() => onSwitchView(ObservationViewMode.list)}
      >
        <TableIcon className="w-5 h-5 mr-2" />
        <span>{t("filter.listView", "List")}</span>
      </SwitchViewButton>
      <SwitchViewButton
        active={viewMode == ObservationViewMode.calendar ? 1 : 0}
        onClick={() => onSwitchView(ObservationViewMode.calendar)}
      >
        <CalendarIcon className="w-5 h-5 mr-2" />
        <span>{t("filter.calendarView", "Calendar")}</span>
      </SwitchViewButton>
      <SwitchViewButton
        active={viewMode == ObservationViewMode.map ? 1 : 0}
        onClick={() => onSwitchView(ObservationViewMode.map)}
      >
        <LocationMarkerIcon className="w-5 h-5 mr-2" />
        <span>{t("filter.mapView", "Map")}</span>
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
  const today = new Date();
  const fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

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
      viewMode: viewModel.viewMode,
      calendarMonth: viewModel.calendarViewModel.month,
      calendarYear: viewModel.calendarViewModel.year,
      q: viewModel.q,
    });
  };

  const render = () => {
    switch (viewModel.viewMode) {
      case ObservationViewMode.calendar:
        return (
          <Calendar
            viewModel={viewModel.calendarViewModel}
            onMonthChange={() => {
              applySearch();
            }}
            dayEvents={({ date, viewModel }) => (
              <ObservationDayEvents date={date} viewModel={viewModel} />
            )}
          />
        );
      case ObservationViewMode.map:
        return <Map data={toJS(viewModel.dataEvents)} />;
      case ObservationViewMode.list:
        return (
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
              onLoading={viewModel.isLoading}
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
        );
    }
  };

  const exportExcel = () => {
    return (
      <div className="flex space-x-2 ml-2">
        <form method="GET" action={`${currentExcelEndpoint()}observation`}>
          <input
            type="hidden"
            name="definitionId"
            value={viewModel.filter.definitionId}
          ></input>
          <input
            type="hidden"
            name="fromDate"
            value={
              viewModel.filter.fromDate?.toISOString() ||
              fromDate?.toISOString()
            }
          ></input>
          <input
            type="hidden"
            name="toDate"
            value={
              viewModel.filter.throughDate?.toISOString() ||
              toDate?.toISOString()
            }
          ></input>
          <input
            type="hidden"
            name="timezoneOffset"
            value={new Date().getTimezoneOffset()}
          ></input>
          <ExportButton type="submit" isSubmitting={viewModel.isSubmitting} />
        </form>
      </div>
    );
  };

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <Observer>
      {() => (
        <div className="flex flex-col">
          <div className="flex flex-wrap">
            {viewModel.viewMode != ObservationViewMode.calendar && (
              <Filter
                onSearch={applySearch}
                onReset={() => {
                  resetUrl({
                    definitionId: viewModel.filter.definitionId,
                    definitionName: router.query.definitionName as string,
                    q: viewModel.q,
                  });
                }}
              >
                <ObservationFilter viewModel={viewModel} />
              </Filter>
            )}
            <div
              className={`${
                viewModel.viewMode != ObservationViewMode.calendar
                  ? "ml-6 mr-4"
                  : ""
              }`}
            >
              <TotalItem
                totalCount={viewModel.totalCount}
                onRefresh={() => viewModel.fetch(true)}
              />
            </div>
            <FilterQuery
              querySearch={viewModel.q}
              onChange={value => {
                viewModel.q = value;
                applySearch();
              }}
            />
            <ViewSwitch
              viewMode={viewModel.viewMode}
              onSwitchView={viewMode => {
                viewModel.switchView(viewMode);
                applySearch();
              }}
            />
            {exportExcel()}
          </div>

          <div className="mt-2">{render()}</div>
        </div>
      )}
    </Observer>
  );
};

export default ObservationList;
