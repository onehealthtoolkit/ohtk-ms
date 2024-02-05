import CaseLink from "components/case/caseLink";
import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { formatDate, formatDateTime } from "lib/datetime";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardCard from "./card";
import { DashBoardFilterData } from "./dashboardViewModel";
import { ReportTableViewModel } from "./reportsTableViewModel";
import DashboardTable from "./table";
import { useTranslation } from "react-i18next";

type ReportsTableViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const ReportsTableView: React.FC<ReportsTableViewProps> = ({
  authorityId,
  filter,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new ReportTableViewModel(services.reportService)
  );
  useEffect(() => {
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <DashboardCard
        titleClass="bg-[#DA3535]"
        title={`${t("dashboard.reports", "Reports")} [${
          viewModel?.totalCount
        }]`}
        action={
          <button
            className="text-white underline active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => router.push(`/reports/`)}
          >
            {t("dashboard.seeAll", "See all")}&nbsp;{">"}
          </button>
        }
      >
        <DashboardTable
          columns={[
            {
              label: t("dashboard.createdAt", "Created At"),
              get: record => formatDateTime(record.createdAt),
            },
            {
              label: t("dashboard.incidentDate", "Incident Date"),
              get: record => formatDate(record.incidentDate),
            },
            {
              label: t("dashboard.reportType", "Report type"),
              get: record => {
                return (
                  <>
                    {record.reportTypeName} <CaseLink caseId={record.caseId} />
                  </>
                );
              },
            },
            {
              label: t("dashboard.data", "Data"),
              get: record => record.rendererData,
            },
          ]}
          data={viewModel.data || []}
          onRowClick={record => router.push(`/reports/${record.id}`)}
        />
      </DashboardCard>
    </MaskingLoader>
  );
};

export default observer(ReportsTableView);
