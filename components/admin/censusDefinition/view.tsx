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
            "Editing JSON here does not change reporter phones until you click Publish. Publishing creates a new version and makes it the active form returned to OHTK Mobile. Existing village submissions remain readable with the version they used."
          )}
        </div>
      </div>

      <ErrorDisplay message={viewModel.errorMessage || viewModel.submitError} />
      {viewModel.publishSuccess && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {t(
            "censusDefinition.publishSuccess",
            "{{kind}} census {{version}} is now the published mobile form. Reporters will receive it the next time the mobile app refreshes this census.",
            {
              kind: formatCensusKind(t, viewModel.publishSuccess.kind),
              version: viewModel.publishSuccess.version
                ? t("censusDefinition.versionLabel", "v{{version}}", {
                    version: viewModel.publishSuccess.version,
                  })
                : t("censusDefinition.newVersionLabel", "the new version"),
            }
          )}
        </div>
      )}

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        {kinds.map(kind => {
          const activeVersion = viewModel.activeVersionFor(kind);
          const kindLabel = formatCensusKind(t, kind);
          return (
            <div
              key={kind}
              className="rounded border border-gray-200 bg-white p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {kindLabel}{" "}
                {t("censusDefinition.mobileActiveLabel", "mobile active")}
              </div>
              {activeVersion ? (
                <div className="mt-2 text-sm text-gray-700">
                  <div className="text-lg font-semibold text-gray-900">
                    v{activeVersion.version}
                  </div>
                  <div>
                    {t("form.label.status", "Status")}: {activeVersion.status}
                  </div>
                  <div>
                    {t("form.label.rows", "Rows")}:{" "}
                    {activeVersion.runtimeSchema.rows?.length ?? 0}
                  </div>
                  <div>
                    {t("form.label.measures", "Measures")}:{" "}
                    {activeVersion.runtimeSchema.measures?.length ?? 0}
                  </div>
                  <div>
                    {t("form.label.publishedAt", "Published At")}:{" "}
                    {formatPublishedAt(activeVersion.publishedAt)}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-amber-700">
                  {t(
                    "censusDefinition.noPublishedVersion",
                    "No published version. Mobile will not show this census."
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {kinds.map(kind => {
          const activeVersion = viewModel.activeVersionFor(kind);
          const hasSchemaEdits = viewModel.hasSchemaEdits(kind);
          const kindLabel = formatCensusKind(t, kind);
          return (
            <div key={kind} className="border border-gray-200 rounded p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-gray-800">
                    {kindLabel}{" "}
                    {t("breadcrumb.censusDefinition", "Census Definition")}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {activeVersion
                      ? t(
                          "censusDefinition.editingVersionHelp",
                          "Currently published mobile form: v{{version}}",
                          { version: activeVersion.version }
                        )
                      : t(
                          "censusDefinition.noVersionHelp",
                          "No version is currently published for mobile."
                        )}
                  </div>
                </div>
                {hasSchemaEdits && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {t(
                      "censusDefinition.unpublishedEditsBadge",
                      "Unpublished edits"
                    )}
                  </span>
                )}
              </div>
              {hasSchemaEdits && (
                <div className="mb-3 rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  {t(
                    "censusDefinition.unpublishedEditsHelp",
                    "These edits are not visible to mobile reporters yet. Click Publish to create the next active mobile version."
                  )}
                </div>
              )}
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
                  {activeVersion
                    ? t(
                        "censusDefinition.publishNextVersion",
                        "Publish next version"
                      )
                    : t("form.button.publish", "Publish")}
                </SaveButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function formatPublishedAt(value?: string | null) {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

function formatCensusKind(
  t: (key: string, fallback: string) => string,
  kind: CensusKind
) {
  return t(`censusDefinition.kind.${kind}`, kind);
}

export default observer(CensusDefinitionView);
