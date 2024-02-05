import { MaskingLoader } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { formatDate, formatDateTime } from "lib/datetime";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CaseTableViewModel } from "./caseTableViewModel";
import DashboardCard from "./card";
import { DashBoardFilterData } from "./dashboardViewModel";
import DashboardTable from "./table";
import { useTranslation } from "react-i18next";

type CasesTableViewProps = {
  authorityId: number;
  filter: DashBoardFilterData;
};

const CasesTableView: React.FC<CasesTableViewProps> = ({
  authorityId,
  filter,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new CaseTableViewModel(services.caseService)
  );

  useEffect(() => {
    if (authorityId) viewModel.setSearchValue(authorityId, filter);
  }, [viewModel, authorityId, filter]);

  if (!authorityId) return <Spinner></Spinner>;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <DashboardCard
        titleClass="bg-[#5E7284]"
        title={`${t("dashboard.cases", "Cases")} [${viewModel?.totalCount}]`}
        action={
          <button
            className="text-white underline active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
            onClick={() => router.push(`/cases/`)}
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
              get: record => record.reportTypeName,
            },
            {
              label: t("dashboard.data", "Data"),
              get: record => record.rendererData,
            },
          ]}
          data={viewModel.data || []}
          onRowClick={record => router.push(`/cases/${record.id}`)}
        />
      </DashboardCard>
    </MaskingLoader>
  );
};

export default observer(CasesTableView);
