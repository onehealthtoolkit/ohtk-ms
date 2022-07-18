import Layout from "components/layout";
import useStore from "lib/store";
import React, { useState } from "react";
import DashboardViewModel from "./dashboardViewModel";
import StatView from "./statView";
import AuthorityFilter from "./authorityFilter";
import MapView from "./mapView";
import SummaryByCategoryView from "./summaryByCategoryView";
import CasesTableView from "./casesTableView";

const Dashboard: React.FC = () => {
  const store = useStore();
  const [viewModel] = useState(() => {
    const dashboardViewModel = new DashboardViewModel(
      store.me!.authorityId,
      store.me!.authorityName
    );
    return dashboardViewModel;
  });
  return (
    <Layout>
      <p>Dashboard</p>
      <AuthorityFilter viewModel={viewModel} />
      <StatView authorityId={viewModel.authorityId} />
      <MapView authorityId={viewModel.authorityId} />
      <SummaryByCategoryView authorityId={viewModel.authorityId} />
      <CasesTableView authorityId={viewModel.authorityId} />
    </Layout>
  );
};

export default Dashboard;
