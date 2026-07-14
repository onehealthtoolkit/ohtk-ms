import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import { UserViewViewModel } from "./viewViewModel";
import { useTranslation } from "react-i18next";
import ViewActionButtons from "components/widgets/viewActionButtons";
import Calendar from "react-github-contribution-calendar";
import useStore from "lib/store";
import Link from "next/link";

const UserView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const store = useStore();
  const villageEnabled = store.isFeatureEnable("village");
  const [viewModel] = useState(
    () => new UserViewViewModel(router.query.id as string, services.userService)
  );

  const monthNames = t("months", { joinArrays: "," }).split(",");
  const weekNames = t("days", { joinArrays: "," }).split(",");
  const until = new Date().toISOString().split("T")[0];
  var panelColors = ["#EEEEEE", "#F78A23", "#F87D09", "#AC5808", "#7B3F06"];
  var panelAttributes = {};

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
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
                  {t("form.label.username", "User name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.username}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.firstName", "First Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.firstName}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.lastName", "Last Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.lastName}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.email", "Email")}
                </th>
                <td className="px-6 py-4">{viewModel.data.email}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.telephone", "Telephone")}
                </th>
                <td className="px-6 py-4">{viewModel.data.telephone}</td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.address", "Address")}
                </th>
                <td className="px-6 py-4">{viewModel.data.address}</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {t("form.label.contributions", "Contributions")}
                </th>
                <td className="px-6 py-4">
                  {viewModel.contribution && (
                    <Calendar
                      values={viewModel.contribution}
                      until={until}
                      weekNames={weekNames}
                      monthNames={monthNames}
                      weekLabelAttributes={undefined}
                      monthLabelAttributes={undefined}
                      panelAttributes={panelAttributes}
                      panelColors={panelColors}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {villageEnabled && (
          <div className="mt-4">
            <div className="mb-3 font-semibold text-gray-800">
              {t("breadcrumb.villages", "Villages")}
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.code", "Code")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.name", "Name")}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      {t("form.label.active", "Active")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewModel.data.assignedVillages?.length ? (
                    viewModel.data.assignedVillages.map(village => (
                      <tr
                        key={village.id}
                        className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                      >
                        <td className="px-6 py-4 text-blue-700 underline">
                          <Link href={`/admin/villages/${village.id}/view`}>
                            {village.code}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-blue-700 underline">
                          <Link href={`/admin/villages/${village.id}/view`}>
                            {village.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          {village.active ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                      <td className="px-6 py-4" colSpan={3}>
                        {t("table.notFound", "Data not found.")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <ViewActionButtons
          editUrl={`/admin/users/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(UserView);
