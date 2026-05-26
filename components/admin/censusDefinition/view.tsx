import ErrorDisplay from "components/widgets/errorDisplay";
import { SaveButton, TextArea } from "components/widgets/forms";
import Table from "components/widgets/table";
import useServices from "lib/services/provider";
import { CensusKind } from "lib/services/census";
import { observer } from "mobx-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CensusDefinitionViewViewModel } from "./viewViewModel";

const kinds: CensusKind[] = ["ANIMAL", "HUMAN"];

const CensusDefinitionView = () => {
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new CensusDefinitionViewViewModel(services.censusDefinitionService)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap mb-4 gap-2">
        <button
          type="button"
          disabled={viewModel.isSubmitting}
          onClick={() => viewModel.ensureDefaults(false)}
          className="px-4 py-2 border text-white bg-[#4C81F1] border-blue-300 hover:border-blue-500 rounded"
        >
          {t("form.button.ensureDefaults", "Ensure Defaults")}
        </button>
        <button
          type="button"
          disabled={viewModel.isSubmitting}
          onClick={() => viewModel.fetch(true)}
          className="px-4 py-2 border border-gray-300 bg-gray-100 hover:border-gray-400 rounded"
        >
          {t("form.button.refresh", "Refresh")}
        </button>
      </div>

      <ErrorDisplay message={viewModel.errorMessage || viewModel.submitError} />

      <Table
        columns={[
          {
            label: t("form.label.kind", "Kind"),
            get: record => record.definition.kind,
          },
          {
            label: t("form.label.version", "Version"),
            get: record => record.version.toString(),
          },
          {
            label: t("form.label.status", "Status"),
            get: record => record.status,
          },
          {
            label: t("form.label.rows", "Rows"),
            get: record => (record.runtimeSchema.rows?.length ?? 0).toString(),
          },
          {
            label: t("form.label.measures", "Measures"),
            get: record => (record.schema.measures?.length ?? 0).toString(),
          },
          {
            label: t("form.label.publishedAt", "Published At"),
            get: record => record.publishedAt ?? "",
          },
        ]}
        data={viewModel.versions}
        onLoading={viewModel.isLoading}
        viewOnRowClick={false}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {kinds.map(kind => (
          <div key={kind} className="border border-gray-200 rounded p-4">
            <div className="font-semibold text-gray-800 mb-3">
              {kind} {t("breadcrumb.censusDefinition", "Census Definition")}
            </div>
            <TextArea
              rows={18}
              value={viewModel.schemaText[kind]}
              onChange={event =>
                viewModel.setSchemaText(kind, event.target.value)
              }
            />
            <div className="mt-4 flex">
              <SaveButton
                type="button"
                disabled={viewModel.isSubmitting}
                onClick={() => viewModel.publish(kind)}
              >
                {t("form.button.publish", "Publish")}
              </SaveButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(CensusDefinitionView);
