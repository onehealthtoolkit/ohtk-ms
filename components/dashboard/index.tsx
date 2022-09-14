import useStore from "lib/store";
import React, { useEffect, useState } from "react";
import DashboardViewModel, { DashBoardFilterData } from "./dashboardViewModel";
import StatView from "./statView";
import SummaryByCategoryView from "./summaryByCategoryView";
import CasesTableView from "./casesTableView";
import { Observer, observer } from "mobx-react";
import dynamic from "next/dynamic";
import ReportsTableView from "./reportsTableView";
import Filter from "components/widgets/filter";
import { ParsedUrlQuery } from "querystring";
import { isoStringToDate } from "lib/utils";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useRouter } from "next/router";
import DashboardFilter from "./filter";
import AuthorityFilter from "./authorityFilter";
import SummaryByCategoryPieView from "./summaryByCategoryPieView";

export const MapView = dynamic(() => import("./mapView"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    authorityId: query.authorityId,
    authorityName: query.authorityName,
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    toDate: query.toDate ? isoStringToDate(query.toDate as string) : undefined,
  };
};

const Dashboard: React.FC = () => {
  const { setUrl, query, resetUrl } = useUrlParams();
  const router = useRouter();
  const store = useStore();
  const [filterData, setFilterData] = useState<DashBoardFilterData>({});
  const [viewModel] = useState<DashboardViewModel>(() => {
    const dashboardViewModel = new DashboardViewModel();
    return dashboardViewModel;
  });

  useEffect(() => {
    if (router.isReady) {
      const filter = parseUrlParams(query);
      if (!filter.authorityId) {
        filter.authorityId = store.me!.authorityId.toString();
        filter.authorityName = store.me!.authorityName;
      }
      viewModel.setSearchValue(
        parseInt(filter.authorityId as string),
        filter.authorityName as string,
        filter.fromDate,
        filter.toDate
      );
      setFilterData({
        fromDate: viewModel.fromDate,
        toDate: viewModel.toDate,
      });
    }
  }, [viewModel, store.me, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      authorityId: viewModel.authorityId,
      authorityName: viewModel.authorityName,
      fromDate: viewModel.fromDate?.toISOString(),
      toDate: viewModel.toDate?.toISOString(),
    });
  };

  return (
    <Observer>
      {() => (
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="w-full md:w-1/4">
              <AuthorityFilter viewModel={viewModel} />
            </div>
            <div className="px-4">
              <Filter
                onSearch={applySearch}
                onReset={() => {
                  resetUrl();
                }}
                popPositionClass="right-0"
              >
                <DashboardFilter viewModel={viewModel} />
              </Filter>
            </div>
          </div>

          <StatView authorityId={viewModel.authorityId} filter={filterData} />
          <MapView authorityId={viewModel.authorityId} filter={filterData} />
          <div className="flex items-stretch flex-wrap">
            <div className="w-full xl:w-8/12 xl:mb-0">
              <SummaryByCategoryView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
            <div className="w-full xl:w-4/12 md:px-4">
              <SummaryByCategoryPieView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2">
              <ReportsTableView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
            <div className="w-full xl:w-1/2 md:px-4">
              <CasesTableView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default observer(Dashboard);
