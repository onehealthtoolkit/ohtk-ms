import useStore from "lib/store";
import React, { useState } from "react";
import DashboardViewModel from "./dashboardViewModel";
import StatView from "./statView";
import AuthorityFilter from "./authorityFilter";
import MapView from "./mapView";
import SummaryByCategoryView from "./summaryByCategoryView";
import CasesTableView from "./casesTableView";
import { Observer, observer } from "mobx-react";

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
          <CasesTableView authorityId={viewModel.authorityId} />
        </div>
      )}
    </Observer>
  );
};

export default observer(Dashboard);
