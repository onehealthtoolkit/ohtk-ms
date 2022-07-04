import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ReportListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "components/hooks/searchParam";
import Paginate from "components/widgets/table/paginate";
import { formatThDate, formatThDateTime } from "lib/datetime";
import ReportFilter from "./filter";

const ReportList = () => {
  const router = useRouter();
  const { reportService } = useServices();

  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });
  const [viewModel] = useState<ReportListViewModel>(() => {
    return new ReportListViewModel(reportService, searchValue.offset as number);
  });

  useEffect(() => {
    viewModel.setSearchValue(searchValue.offset as number);
  }, [searchValue, viewModel]);

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <Observer>
      {() => (
        <div className="flex flex-wrap">
          <ReportFilter viewModel={viewModel} />
          <div>
            <Table
              columns={[
                {
                  label: "Created At",
                  get: record => formatThDateTime(record.createdAt),
                },
                {
                  label: "Incident Date",
                  get: record => formatThDate(record.incidentDate),
                },
                {
                  label: "Report Type",
                  get: record => record.reportTypeName,
                },
                {
                  label: "Data",
                  get: record => record.rendererData,
                },
              ]}
              data={viewModel.data || []}
              onView={record => router.push(`/reports/${record.id}`)}
            />
            <ErrorDisplay message={viewModel.errorMessage} />

            <Paginate
              limit={viewModel.limit}
              offset={viewModel.offset}
              totalCount={viewModel.totalCount}
              onChange={value => onSearchChange("offset", value)}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

export default ReportList;
