import ErrorDisplay from "components/widgets/errorDisplay";
import { MaskingLoader, TextArea } from "components/widgets/forms";
import ViewActionButtons from "components/widgets/viewActionButtons";
import { CensusKind } from "lib/services/census";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCensusKind, formatPublishedAt } from "./format";
import {
  CensusDefinitionViewViewModel,
  normalizeAuthoredSchema,
} from "./viewViewModel";

type Props = {
  kind: CensusKind;
};

const CensusDefinitionDetail = ({ kind }: Props) => {
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new CensusDefinitionViewViewModel(services.censusDefinitionService)
  );

  const activeVersion = viewModel.activeVersionFor(kind);
  const isEnabled = viewModel.isKindEnabled(kind);
  const kindLabel = formatCensusKind(t, kind);
  const authoredSchema = activeVersion
    ? normalizeAuthoredSchema(
        activeVersion.definitionSchema,
        activeVersion.runtimeSchema,
        activeVersion.definition.kind
      )
    : {};

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div>
        <ErrorDisplay message={viewModel.errorMessage} />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <DetailRow
                label={t("form.label.kind", "Kind")}
                value={kindLabel}
              />
              <DetailRow
                label={t("censusDefinition.mobileAvailability", "Mobile")}
                value={
                  isEnabled
                    ? t("form.label.active", "Active")
                    : t("censusDefinition.inactive", "Inactive")
                }
              />
              <DetailRow
                label={t("form.label.version", "Version")}
                value={
                  activeVersion
                    ? t("censusDefinition.versionLabel", "v{{version}}", {
                        version: activeVersion.version,
                      })
                    : "-"
                }
              />
              <DetailRow
                label={t("form.label.status", "Status")}
                value={activeVersion?.status ?? "-"}
              />
              <DetailRow
                label={t("form.label.rows", "Rows")}
                value={(
                  activeVersion?.runtimeSchema.rows?.length ?? 0
                ).toString()}
              />
              <DetailRow
                label={t("form.label.measures", "Measures")}
                value={(
                  activeVersion?.runtimeSchema.measures?.length ?? 0
                ).toString()}
              />
              <DetailRow
                label={t("form.label.publishedAt", "Published At")}
                value={formatPublishedAt(activeVersion?.publishedAt) || "-"}
              />
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded border border-gray-200 bg-white p-4">
          <div className="mb-3 font-semibold text-gray-800">
            {t("censusDefinition.authoredSchemaJson", "Authored schema JSON")}
          </div>
          <TextArea
            rows={18}
            value={JSON.stringify(authoredSchema, null, 2)}
            readOnly
          />
        </div>

        <div className="mt-6 rounded border border-gray-200 bg-white p-4">
          <div className="mb-3 font-semibold text-gray-800">
            {t(
              "censusDefinition.runtimeSchemaJson",
              "Generated mobile schema JSON"
            )}
          </div>
          <TextArea
            rows={18}
            value={JSON.stringify(activeVersion?.runtimeSchema ?? {}, null, 2)}
            readOnly
          />
        </div>

        <ViewActionButtons
          editUrl={`/admin/census_definitions/${kind}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
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

export default observer(CensusDefinitionDetail);
