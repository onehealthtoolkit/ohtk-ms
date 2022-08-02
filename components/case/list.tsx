import Spinner from "components/widgets/spinner";
import Table from "components/widgets/table";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CaseListViewModel } from "./listViewModel";
import ErrorDisplay from "components/widgets/errorDisplay";
import useServices from "lib/services/provider";
import Paginate from "components/widgets/table/paginate";
import { formatDate, formatDateTime } from "lib/datetime";
import CaseFilter from "./filter";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { ParsedUrlQuery } from "querystring";
import { isoStringToDate } from "lib/utils";
import Filter from "components/widgets/filter";
const JSURL = require("jsurl");

const parseUrlParams = (query: ParsedUrlQuery) => {
  return {
    fromDate: query.fromDate
      ? isoStringToDate(query.fromDate as string)
      : undefined,
    throughDate: query.throughDate
      ? isoStringToDate(query.throughDate as string)
      : undefined,
    offset: query.offset ? parseInt(query.offset as string) : 0,
    authorities: query.authorities ? JSURL.parse(query.authorities) : [],
  };
};

const CaseList = () => {
  const router = useRouter();
  const { caseService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();

  const [viewModel] = useState<CaseListViewModel>(() => {
    return new CaseListViewModel(caseService);
  });

  useEffect(() => {
    if (router.isReady) {
      viewModel.setSearchValue(parseUrlParams(query));
    }
  }, [viewModel, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      fromDate: viewModel.filter.fromDate?.toISOString(),
      throughDate: viewModel.filter.throughDate?.toISOString(),
      offset: viewModel.offset,
      authorities: JSURL.stringify(viewModel.filter.authorities),
    });
  };

  if (!viewModel) {
    return <Spinner />;
  }
  return (
    <Observer>
      {() => (
        <div className="flex flex-col">
          <Filter
            onSearch={applySearch}
            onReset={() => {
              resetUrl();
            }}
          >
            <CaseFilter viewModel={viewModel} />
          </Filter>
          <div className="mt-2">
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
              onChange={value => {
                viewModel.offset = value;
                applySearch();
              }}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};

export default CaseList;
