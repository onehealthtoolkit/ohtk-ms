import useStore from "lib/store";
import React, { useEffect, useState } from "react";
import DashboardViewModel from "./dashboardViewModel";
import StatView from "./statView";
import AuthorityFilter from "./authorityFilter";
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

export const MapView = dynamic(() => import("./mapView"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
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
  const [viewModel] = useState<DashboardViewModel>(() => {
    const dashboardViewModel = new DashboardViewModel(
      store.me!.authorityId,
      store.me!.authorityName
    );
    return dashboardViewModel;
  });

  useEffect(() => {
    if (router.isReady) {
      const filter = parseUrlParams(query);
      viewModel.setSearchValue(filter.fromDate, filter.toDate);
    }
  }, [viewModel, router.isReady, query]);

  const applySearch = () => {
    setUrl({
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

          <StatView authorityId={viewModel.authorityId} />
          <MapView authorityId={viewModel.authorityId} />
          <SummaryByCategoryView
            authorityId={viewModel.authorityId}
            fromDate={viewModel.fromDate}
            toDate={viewModel.toDate}
          />
          <div className="flex flex-wrap">
            <div className="w-full xl:w-1/2">
              <ReportsTableView authorityId={viewModel.authorityId} />
            </div>
            <div className="w-full xl:w-1/2 px-4">
              <CasesTableView authorityId={viewModel.authorityId} />
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};

export default observer(Dashboard);
