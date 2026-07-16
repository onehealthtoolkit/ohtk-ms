import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { CensusRoundViewViewModel } from "./viewViewModel";
import { useTranslation } from "react-i18next";
import ViewActionButtons from "components/widgets/viewActionButtons";
import ErrorDisplay from "components/widgets/errorDisplay";

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
    <th
      scope="row"
      className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
    >
      {label}
    </th>
    <td className="px-6 py-4">{value}</td>
  </tr>
);

const CensusRoundView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new CensusRoundViewViewModel(
        router.query.id as string,
        services.censusRoundService
      )
  );

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <Row label={t("form.label.id", "Id")} value={viewModel.data.id} />
              <Row
                label={t("form.label.code", "Code")}
                value={viewModel.data.code}
              />
              <Row
                label={t("form.label.name", "Name")}
                value={viewModel.data.name}
              />
              <Row
                label={t("form.label.kind", "Kind")}
                value={viewModel.data.kind}
              />
              <Row
                label={t("form.label.mode", "Mode")}
                value={viewModel.data.mode}
              />
              <Row
                label={t("form.label.repeat", "Repeat")}
                value={viewModel.data.repeat}
              />
              <Row
                label={t("form.label.censusPeriodStart", "Census period start")}
                value={viewModel.data.censusPeriodStart}
              />
              <Row
                label={t("form.label.censusPeriodEnd", "Census period end")}
                value={viewModel.data.censusPeriodEnd}
              />
              <Row
                label={t("form.label.roundStartDate", "Submission start")}
                value={viewModel.data.startDate}
              />
              <Row
                label={t("form.label.softFinishDate", "Soft finish (due)")}
                value={viewModel.data.softFinishDate}
              />
              <Row
                label={t("form.label.hardFinishDate", "Hard finish (cutoff)")}
                value={viewModel.data.hardFinishDate}
              />
              <Row
                label={t(
                  "form.label.targetAuthority",
                  "Target authority (optional)"
                )}
                value={
                  viewModel.data.targetAuthorityName ||
                  t("form.label.allVillages", "All villages")
                }
              />
              <Row
                label={t("form.label.enabled", "Enabled")}
                value={
                  viewModel.data.enabled
                    ? t("form.label.yes", "Yes")
                    : t("form.label.no", "No")
                }
              />
            </tbody>
          </table>
        </div>
        <ErrorDisplay message={viewModel.errorMessage} />
        <ViewActionButtons
          editUrl={`/admin/census_rounds/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(CensusRoundView);
