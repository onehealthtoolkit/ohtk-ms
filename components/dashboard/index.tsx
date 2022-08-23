import useStore from "lib/store";
import React, { useState } from "react";
import DashboardViewModel from "./dashboardViewModel";
import StatView from "./statView";
import AuthorityFilter from "./authorityFilter";
import SummaryByCategoryView from "./summaryByCategoryView";
import CasesTableView from "./casesTableView";
import { Observer, observer } from "mobx-react";
import dynamic from "next/dynamic";
import ReportsTableView from "./reportsTableView";

export const MapView = dynamic(() => import("./mapView"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const Dashboard: React.FC = () => {
  const store = useStore();
  const [viewModel] = useState<DashboardViewModel>(() => {
    const dashboardViewModel = new DashboardViewModel(
      store.me!.authorityId,
      store.me!.authorityName
    );
    return dashboardViewModel;
  });
  return (
    <Observer>
      {() => (
        <div className="grid gap-4">
          <AuthorityFilter viewModel={viewModel} />
          <StatView authorityId={viewModel.authorityId} />
          <MapView authorityId={viewModel.authorityId} />
          <SummaryByCategoryView authorityId={viewModel.authorityId} />
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
