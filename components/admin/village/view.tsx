import { MaskingLoader } from "components/widgets/forms";
import Table from "components/widgets/table";
import ViewActionButtons from "components/widgets/viewActionButtons";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { roundCoordinate } from "./coordinates";
import { VillageViewViewModel } from "./viewViewModel";

const VillageLocationMap = dynamic(() => import("../place/placeMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const rowClass =
  "border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700";
const labelClass =
  "w-1/4 px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap";

const VillageView = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new VillageViewViewModel(
        parseInt(router.query.id as string),
        services.villageService
      )
  );
  const hasLocation =
    typeof viewModel.data.latitude === "number" &&
    typeof viewModel.data.longitude === "number";

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-8">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.code", "Code")}
                </th>
                <td className="px-6 py-4">{viewModel.data.code}</td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.name", "Name")}
                </th>
                <td className="px-6 py-4">{viewModel.data.name}</td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.authority", "Authority")}
                </th>
                <td className="px-6 py-4">{viewModel.data.authorityName}</td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.latitude", "Latitude")}
                </th>
                <td className="px-6 py-4">
                  {typeof viewModel.data.latitude === "number"
                    ? roundCoordinate(viewModel.data.latitude)
                    : ""}
                </td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.longitude", "Longitude")}
                </th>
                <td className="px-6 py-4">
                  {typeof viewModel.data.longitude === "number"
                    ? roundCoordinate(viewModel.data.longitude)
                    : ""}
                </td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.map", "Map")}
                </th>
                <td className="px-6 py-4">
                  {hasLocation ? (
                    <VillageLocationMap
                      lat={viewModel.data.latitude ?? 0}
                      lng={viewModel.data.longitude ?? 0}
                      draggable={false}
                    />
                  ) : (
                    t("table.notFound", "Not found")
                  )}
                </td>
              </tr>
              <tr className={rowClass}>
                <th scope="row" className={labelClass}>
                  {t("form.label.active", "Active")}
                </th>
                <td className="px-6 py-4">
                  {viewModel.data.active ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4 font-semibold text-gray-800">
          {t("breadcrumb.latestVillageCensus", "Latest Village Census")}
        </div>
        {viewModel.latestCensus ? (
          <div>
            <div className="mb-3 text-sm text-gray-600">
              {viewModel.latestCensus.censusDate}
            </div>
            <Table
              columns={[
                {
                  label: t("form.label.species", "Species"),
                  get: record =>
                    `${record.speciesCode} - ${record.speciesName}`,
                },
                {
                  label: t("form.label.animals", "Animals"),
                  get: record => record.animalQuantity.toString(),
                },
                {
                  label: t("form.label.households", "Households"),
                  get: record => record.householdQuantity.toString(),
                },
              ]}
              data={viewModel.latestCensus.facts.map(fact => ({
                id: fact.speciesId,
                ...fact,
              }))}
              viewOnRowClick={false}
            />
          </div>
        ) : (
          <div className="mb-8 text-sm text-gray-500">
            {t("table.notFound", "Not found")}
          </div>
        )}

        <ViewActionButtons
          editUrl={`/admin/villages/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(VillageView);
