/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { ReportCategoryViewViewModel } from "./viewViewModel";
import { useTranslation } from "react-i18next";
import ViewActionButtons from "components/widgets/viewActionButtons";

const ReportCategoryView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReportCategoryViewViewModel(
        router.query.id as string,
        services.reportCategoryService
      )
  );

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.id", "Id")}
                </th>
                <td className="px-6 py-4">{viewModel.data.id}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.name", "Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.name}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.icon", "Icon")}
                </th>
                <td className="px-6 py-4">
                  {viewModel.data.icon && (
                    <img
                      width={"32"}
                      height={"32"}
                      alt={`icon for ${viewModel.data.name}`}
                      src={viewModel.data.icon}
                    />
                  )}
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.ordering", "Ordering")}
                </th>
                <td className="px-6 py-4">{viewModel.data.ordering}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ViewActionButtons
          editUrl={`/admin/report_categories/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(ReportCategoryView);
