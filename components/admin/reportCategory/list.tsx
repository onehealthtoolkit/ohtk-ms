import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportCategoryListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";

const ReportCategoryList = () => {
  const router = useRouter();
  const [viewModel, setViewModel] =
    useState<AdminReportCategoryListViewModel>();
  useEffect(() => {
    const viewModel = new AdminReportCategoryListViewModel();
    setViewModel(viewModel);
  }, []);

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
          router.push(`/settings/report_categories/edit/${record.id}`)
        }
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(ReportCategoryList);
