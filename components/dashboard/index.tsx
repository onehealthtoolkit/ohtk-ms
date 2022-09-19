import useStore from "lib/store";
import React, { useEffect, useState } from "react";
import DashboardViewModel, { DashBoardFilterData } from "./dashboardViewModel";
import StatView from "./statView";
import SummaryByCategoryView from "./summaryByCategoryView";
import CasesTableView from "./casesTableView";
import { Observer, observer } from "mobx-react";
import dynamic from "next/dynamic";
import ReportsTableView from "./reportsTableView";
import { ParsedUrlQuery } from "querystring";
import { isoStringToDate } from "lib/utils";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { useRouter } from "next/router";
import DashboardFilter from "./filter";
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
  const { query } = useUrlParams();
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

  return (
    <Observer>
      {() => (
        <div className="grid gap-4">
          <DashboardFilter viewModel={viewModel} />
          <StatView authorityId={viewModel.authorityId} filter={filterData} />
          <MapView authorityId={viewModel.authorityId} filter={filterData} />
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <SummaryByCategoryView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
            <div className="">
              <SummaryByCategoryPieView
                authorityId={viewModel.authorityId}
                filter={filterData}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <ReportsTableView
              authorityId={viewModel.authorityId}
              filter={filterData}
            />
            <CasesTableView
              authorityId={viewModel.authorityId}
              filter={filterData}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

export default observer(Dashboard);
