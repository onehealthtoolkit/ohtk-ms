import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ObservationMonitoringDefinitionViewViewModel } from "./viewViewModel";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";
import ViewActionButtons from "components/widgets/viewActionButtons";

const ObservationMonitoringDefinitionView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ObservationMonitoringDefinitionViewViewModel(
        router.query.monitoring_definition_id as string,
        services.observationMonitoringDefinitionService
      )
  );
  const observationId = router.query.id as string;
  const observationName = router.query.definition_name as string;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <Breadcrumb
          crumbs={[
            {
              text: t(
                "breadcrumb.observationDefinitions",
                "Observation Definitions"
              ),
              href: "/admin/observation_definitions",
            },
            {
              text: `${router.query.definition_name}`,
              href: `/admin/observation_definitions/${router.query.id}/update/`,
            },
            { text: "View Observation Monitoring Definition" },
          ]}
        />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.id", "Id")}
                </th>
                <td className="px-6 py-4">{viewModel.data.id}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.name", "Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.name}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.description", "Description")}
                </th>
                <td className="px-6 py-4">{viewModel.data.description}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.titleTemplate", "Title Template")}
                </th>
                <td className="px-6 py-4">{viewModel.data.titleTemplate}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.descriptionTemplate", "Description Template")}
                </th>
                <td className="px-6 py-4">
                  {viewModel.data.descriptionTemplate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ViewActionButtons
          editUrl={`/admin/observation_definitions/${observationId}/observation_monitoring_definitions/${viewModel.data.id}/update?definition_name=${observationName}`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(ObservationMonitoringDefinitionView);
