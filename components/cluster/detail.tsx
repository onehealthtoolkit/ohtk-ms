import ErrorDisplay from "components/widgets/errorDisplay";
import { Divide, MaskingLoader } from "components/widgets/forms";
import { TR } from "components/widgets/renderData";
import Table from "components/widgets/table";
import ViewActionButtons from "components/widgets/viewActionButtons";
import RiskBadge, { getRiskRowStyle } from "components/risk/RiskBadge";
import { formatDate, formatYmdt } from "lib/datetime";
import useServices from "lib/services/provider";
import { Observer } from "mobx-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClusterDetailViewModel } from "./detailViewModel";

const ClusterMap = dynamic(() => import("./clusterMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const scoreText = (score?: number | null) => {
  if (score === null || score === undefined) return "-";
  return score.toFixed(2);
};

const windowText = (start?: string, end?: string, locale?: string) => {
  const from = formatDate(start, locale);
  const through = formatDate(end, locale);
  if (!from && !through) return "-";
  if (from === through) return from;
  return `${from} - ${through}`;
};

const metadataText = (metadata?: Record<string, unknown>) => {
  if (!metadata || Object.keys(metadata).length === 0) return "{}";
  const visibleMetadata = { ...metadata };
  delete visibleMetadata.status;
  if (Object.keys(visibleMetadata).length === 0) return "{}";
  return JSON.stringify(visibleMetadata, null, 2);
};

const ClusterDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const services = useServices();
  const { t } = useTranslation();
  const [viewModel, setViewModel] = useState<
    ClusterDetailViewModel | undefined
  >();

  useEffect(() => {
    setViewModel(new ClusterDetailViewModel(id, services.clusterService));
  }, [id, services.clusterService]);

  if (!viewModel) {
    return null;
  }

  return (
    <Observer>
      {() => {
        const data = viewModel.data;
        return (
          <MaskingLoader loading={viewModel.isLoading}>
            <>
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-xl font-semibold text-gray-900">
                      {data.externalClusterId || id}
                    </h1>
                    <RiskBadge level={data.riskLevel} />
                  </div>
                  <p className="pt-1 text-sm text-gray-600">
                    {data.integrationClient?.code} - {data.algorithmVersion}
                  </p>
                </div>
              </div>

              <Divide hilight={true} />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <table className="table-fixed border w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      <TR
                        label={t("cluster.label.window", "Window")}
                        value={windowText(
                          data.windowStart,
                          data.windowEnd,
                          router.locale
                        )}
                      />
                      <TR
                        label={t("cluster.label.reports", "Reports")}
                        value={data.reportCount?.toString() || "0"}
                      />
                      <TR
                        label={t("cluster.label.score", "Score")}
                        value={scoreText(data.score)}
                      />
                      <TR
                        label={t("cluster.label.radius", "Radius")}
                        value={
                          data.radiusMeters
                            ? `${Math.round(data.radiusMeters)} m`
                            : "-"
                        }
                      />
                      <TR
                        label={t("cluster.label.createdAt", "Created At")}
                        value={formatYmdt(data.createdAt)}
                      />
                      <TR
                        label={t("cluster.label.updatedAt", "Updated At")}
                        value={formatYmdt(data.updatedAt)}
                      />
                    </tbody>
                  </table>
                </div>
                <div className="h-[300px] min-h-[300px]">
                  <ClusterMap
                    geometry={data.geometry}
                    radiusMeters={data.radiusMeters}
                  />
                </div>
              </div>

              <Divide />

              <div>
                <h2 className="mb-3 text-sm font-bold uppercase text-gray-500">
                  {t("cluster.label.explanation", "Explanation")}
                </h2>
                <p className="text-sm leading-6 text-gray-700">
                  {data.explanation || "-"}
                </p>
              </div>

              <Divide />

              <div>
                <h2 className="mb-3 text-sm font-bold uppercase text-gray-500">
                  {t("cluster.label.linkedReports", "Linked Reports")}
                </h2>
                <Table
                  columns={[
                    {
                      label: t("form.label.risk", "Risk"),
                      get: record => <RiskBadge level={record.riskLevel} />,
                    },
                    {
                      label: t("form.label.incidentDate", "Incident Date"),
                      get: record =>
                        formatDate(record.incidentDate, router.locale),
                    },
                    {
                      label: t("form.label.reportType", "Report Type"),
                      get: record => record.reportTypeName,
                    },
                    {
                      label: t("form.label.authorityName", "Authority Name"),
                      get: record => record.authorityName,
                    },
                    {
                      label: t("form.label.data", "Data"),
                      get: record => record.rendererData,
                    },
                  ]}
                  data={data.linkedReports || []}
                  onLoading={viewModel.isLoading}
                  getRowStyle={record => getRiskRowStyle(record?.riskLevel)}
                  onView={record => router.push(`/reports/${record.id}`)}
                  contained
                />
              </div>

              <Divide />

              <div>
                <h2 className="mb-3 text-sm font-bold uppercase text-gray-500">
                  {t("cluster.label.metadata", "Metadata")}
                </h2>
                <pre className="overflow-x-auto rounded border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">
                  {metadataText(data.metadata)}
                </pre>
              </div>

              <ErrorDisplay message={viewModel.errorMessage} />
              <ViewActionButtons />
            </>
          </MaskingLoader>
        );
      }}
    </Observer>
  );
};

export default ClusterDetail;
