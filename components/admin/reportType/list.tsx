import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Filter from "./filter";
import { AdminReportTypeListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Link from "next/link";
import { AddButton } from "components/widgets/forms";

const ReportTypeList = () => {
  const services = useServices();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<AdminReportTypeListViewModel>();
  useEffect(() => {
    const viewModel = new AdminReportTypeListViewModel(
      services.reportTypeService
    );
    setViewModel(viewModel);
    viewModel.fetch();
  }, [services.reportTypeService]);

  if (viewModel === null) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mb-4">&gt;&gt; Report Type</div>

      <div className="flex items-center flex-wrap mb-4">
        <Filter viewModel={viewModel} />
        <div className="flex-grow"></div>
        <Link href={"/admin/report_types/create"} passHref>
          <AddButton />
        </Link>
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
          router.push(`/admin/report_types/${record.id}/update`)
        }
      />
      <ErrorDisplay message={viewModel?.errorMessage} />
    </div>
  );
};

export default observer(ReportTypeList);
