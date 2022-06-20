import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportCategoryListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";

const ReportCategoryList = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] =
    useState<AdminReportCategoryListViewModel>();
  useEffect(() => {
    const viewModel = new AdminReportCategoryListViewModel(
      services.reportCategoryService
    );
    setViewModel(viewModel);
    viewModel.fetch();
  }, [services.reportCategoryService]);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Report Category</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter viewModel={viewModel} />
      </div>

      <Table
        columns={[
          {
            label: "Id",
            get: record => record.id,
          },
          {
            label: "Name",
            get: record => record.name,
          },
        ]}
        data={viewModel?.data || []}
        onEdit={record =>
          router.push(`/admin/report_categories//${record.id}/update`)
        }
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(ReportCategoryList);
