import ErrorDisplay from "components/widgets/errorDisplay";
import Filter from "components/widgets/filter";
import Paginate from "components/widgets/table/paginate";
import Table from "components/widgets/table";
import TotalItem from "components/widgets/table/totalItem";
import RiskBadge, { getRiskRowStyle } from "components/risk/RiskBadge";
import useUrlParams from "lib/hooks/urlParams/useUrlParams";
import { formatDate, formatDateTime } from "lib/datetime";
import { isoStringToDate } from "lib/utils";
import useServices from "lib/services/provider";
import { Observer } from "mobx-react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClusterFilter from "./filter";
import { ClusterListViewModel } from "./listViewModel";

const JSURL = require("jsurl");

const parseUrlParams = (query: ParsedUrlQuery) => ({
  fromDate: query.fromDate
    ? isoStringToDate(query.fromDate as string)
    : undefined,
  throughDate: query.throughDate
    ? isoStringToDate(query.throughDate as string)
    : undefined,
  offset: query.offset ? parseInt(query.offset as string) : 0,
  riskLevels: query.riskLevels ? JSURL.parse(query.riskLevels) : [],
  searchText: query.searchText ? (query.searchText as string) : undefined,
});

const scoreText = (score?: number | null) => {
  if (score === null || score === undefined) return "-";
  return score.toFixed(2);
};

const windowText = (start: string, end: string, locale?: string) => {
  const from = formatDate(start, locale);
  const through = formatDate(end, locale);
  if (!from && !through) return "-";
  if (from === through) return from;
  return `${from} - ${through}`;
};

const statusText = (status?: string) => {
  if (!status) return "New";
  return status
    .toLowerCase()
    .split("_")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

const ClusterList = () => {
  const router = useRouter();
  const { clusterService } = useServices();
  const { setUrl, query, resetUrl } = useUrlParams();
  const { t } = useTranslation();

  const [viewModel] = useState<ClusterListViewModel>(
    new ClusterListViewModel(clusterService)
  );

  useEffect(() => {
    if (router.isReady) {
      viewModel.setSearchValue(parseUrlParams(query));
    }
  }, [viewModel, router.isReady, query]);

  const applySearch = () => {
    setUrl({
      fromDate: viewModel.fromDate?.toISOString(),
      throughDate: viewModel.throughDate?.toISOString(),
      offset: viewModel.offset,
      riskLevels: JSURL.stringify(viewModel.filter.riskLevels),
      searchText: viewModel.filter.searchText,
    });
  };

  return (
    <Observer>
      {() => (
        <div className="flex flex-col">
          <div className="flex flex-wrap">
            <Filter
              onSearch={applySearch}
              onReset={() => {
                viewModel.filterReset();
                resetUrl();
              }}
            >
              <ClusterFilter viewModel={viewModel} />
            </Filter>
            <div className="flex-grow ml-6">
              <TotalItem
                totalCount={viewModel.totalCount}
                onRefresh={() => viewModel.fetch(true)}
              />
            </div>
          </div>

          <div className="mt-2">
            <Table
              columns={[
                {
                  label: t("form.label.risk", "Risk"),
                  get: record => <RiskBadge level={record.riskLevel} />,
                },
                {
                  label: t("cluster.label.cluster", "Cluster"),
                  get: record => (
                    <div>
                      <div className="font-medium text-gray-900">
                        {record.externalClusterId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {record.integrationClient.code}
                      </div>
                    </div>
                  ),
                },
                {
                  label: t("cluster.label.window", "Window"),
                  get: record =>
                    windowText(
                      record.windowStart,
                      record.windowEnd,
                      router.locale
                    ),
                },
                {
                  label: t("cluster.label.reports", "Reports"),
                  get: record => record.reportCount.toString(),
                },
                {
                  label: t("cluster.label.score", "Score"),
                  get: record => scoreText(record.score),
                },
                {
                  label: t("cluster.label.status", "Status"),
                  get: record => (
                    <span className="inline-flex rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      {statusText(record.status)}
                    </span>
                  ),
                },
                {
                  label: t("form.label.updatedAt", "Updated At"),
                  get: record =>
                    formatDateTime(record.updatedAt, router.locale),
                },
              ]}
              onLoading={viewModel.isLoading}
              data={viewModel.data || []}
              getRowStyle={record => getRiskRowStyle(record?.riskLevel)}
              onView={record => router.push(`/clusters/${record.id}`)}
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

export default ClusterList;
