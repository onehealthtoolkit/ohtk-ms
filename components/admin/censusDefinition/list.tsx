import ErrorDisplay from "components/widgets/errorDisplay";
import Table from "components/widgets/table";
import TotalItem from "components/widgets/table/totalItem";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCensusKind, formatPublishedAt } from "./format";
import { CensusDefinitionViewViewModel } from "./viewViewModel";

const CensusDefinitionList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new CensusDefinitionViewViewModel(services.censusDefinitionService)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap mb-4 gap-2">
        <TotalItem
          totalCount={viewModel.rows.length}
          onRefresh={() => viewModel.fetch(true)}
        />
        <button
          type="button"
          disabled={viewModel.isSubmitting}
          onClick={() => viewModel.ensureDefaults(false)}
          className="px-4 py-2 border text-white bg-[#4C81F1] border-blue-300 hover:border-blue-500 rounded disabled:opacity-60"
        >
          {t("form.button.ensureDefaults", "Ensure Defaults")}
        </button>
      </div>

      <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
        <div className="font-semibold">
          {t(
            "censusDefinition.publishLifecycleTitle",
            "Published versions are the mobile forms"
          )}
        </div>
        <div className="mt-1">
          {t(
            "censusDefinition.publishLifecycleBody",
            "Open a census definition to edit its JSON, publish a new mobile form version, or activate and deactivate it for reporter mobile apps. Existing village submissions remain readable with the version they used."
          )}
        </div>
      </div>

      <ErrorDisplay message={viewModel.errorMessage || viewModel.submitError} />

      <Table
        columns={[
          {
            label: t("form.label.kind", "Kind"),
            get: record => formatCensusKind(t, record.kind),
          },
          {
            label: t("censusDefinition.mobileAvailability", "Mobile"),
            get: record =>
              record.enabled
                ? t("form.label.active", "Active")
                : t("censusDefinition.inactive", "Inactive"),
          },
          {
            label: t("form.label.version", "Version"),
            get: record =>
              record.activeVersion
                ? t("censusDefinition.versionLabel", "v{{version}}", {
                    version: record.activeVersion.version,
                  })
                : "-",
          },
          {
            label: t("form.label.status", "Status"),
            get: record => record.activeVersion?.status ?? "-",
          },
          {
            label: t("form.label.rows", "Rows"),
            get: record =>
              (
                record.activeVersion?.runtimeSchema.rows?.length ?? 0
              ).toString(),
          },
          {
            label: t("form.label.measures", "Measures"),
            get: record =>
              (
                record.activeVersion?.runtimeSchema.measures?.length ?? 0
              ).toString(),
          },
          {
            label: t("form.label.publishedAt", "Published At"),
            get: record => formatPublishedAt(record.activeVersion?.publishedAt),
          },
        ]}
        data={viewModel.rows}
        onLoading={viewModel.isLoading}
        onEdit={record =>
          router.push(`/admin/census_definitions/${record.kind}/update`)
        }
        onView={record =>
          router.push(`/admin/census_definitions/${record.kind}/view`)
        }
      />
    </div>
  );
};

export default observer(CensusDefinitionList);
