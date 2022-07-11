import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CaseListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import {
  NumberParam,
  StringParam,
  useSearchParams,
} from "components/hooks/searchParam";
import Paginate from "components/widgets/table/paginate";
import { formatDate, formatDateTime } from "lib/datetime";
import CaseFilter from "./filter";

const CaseList = () => {
  const router = useRouter();
  const { caseService } = useServices();

  const [searchValue, onSearchChange] = useSearchParams({
    q: StringParam,
    limit: NumberParam,
    offset: NumberParam,
  });
  const [viewModel] = useState<CaseListViewModel>(() => {
    return new CaseListViewModel(caseService, searchValue.offset as number);
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
          <CaseFilter viewModel={viewModel} />
          <div>
            <Table
              columns={[
                {
                  label: "Created At",
                  get: record =>
                    formatDateTime(record.createdAt, router.locale),
                },
                {
                  label: "Incident Date",
                  get: record => formatDate(record.incidentDate, router.locale),
                },
                {
                  label: "Case Type",
                  get: record => record.reportTypeName,
                },
                {
                  label: "Data",
                  get: record => record.rendererData,
                },
              ]}
              data={viewModel.data || []}
              onView={record => router.push(`/cases/${record.id}`)}
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

export default CaseList;
