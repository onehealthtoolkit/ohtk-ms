import ErrorDisplay from "components/widgets/errorDisplay";
import { TextArea } from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { CensusKind } from "lib/services/census";
import useServices from "lib/services/provider";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatCensusKind, formatPublishedAt } from "./format";
import { CensusDefinitionViewViewModel } from "./viewViewModel";

type Props = {
  kind: CensusKind;
};

const CensusDefinitionUpdate = ({ kind }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new CensusDefinitionViewViewModel(services.censusDefinitionService)
  );

  const activeVersion = viewModel.activeVersionFor(kind);
  const definition = viewModel.definitionFor(kind);
  const isEnabled = viewModel.isKindEnabled(kind);
  const hasSchemaEdits = viewModel.hasSchemaEdits(kind);
  const kindLabel = formatCensusKind(t, kind);

  if (viewModel.isLoading && !definition && !activeVersion) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
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

      {viewModel.statusSuccess && (
        <div className="mb-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {t(
            viewModel.statusSuccess.enabled
              ? "censusDefinition.reactivateSuccess"
              : "censusDefinition.deactivateSuccess",
            viewModel.statusSuccess.enabled
              ? "{{kind}} census is active again. Reporters can open it after the mobile app refreshes."
              : "{{kind}} census is inactive. Reporter mobile apps will hide it, but existing submissions remain available.",
            {
              kind: formatCensusKind(t, viewModel.statusSuccess.kind),
            }
          )}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="xl:col-span-2 rounded border border-gray-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {t("breadcrumb.censusDefinition", "Census Definition")}
              </div>
              <div className="mt-1 text-xl font-semibold text-gray-900">
                {kindLabel}
              </div>
            </div>
            <span
              className={
                isEnabled
                  ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800"
                  : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
              }
            >
              {isEnabled
                ? t("censusDefinition.mobileActiveLabel", "mobile active")
                : t("censusDefinition.mobileInactiveLabel", "mobile inactive")}
            </span>
          </div>

          {activeVersion ? (
            <dl className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <div>
                <dt className="font-semibold text-gray-500">
                  {t("form.label.version", "Version")}
                </dt>
                <dd>
                  {t("censusDefinition.versionLabel", "v{{version}}", {
                    version: activeVersion.version,
                  })}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">
                  {t("form.label.status", "Status")}
                </dt>
                <dd>{activeVersion.status}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">
                  {t("form.label.rows", "Rows")}
                </dt>
                <dd>{activeVersion.runtimeSchema.rows?.length ?? 0}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">
                  {t("form.label.measures", "Measures")}
                </dt>
                <dd>{activeVersion.runtimeSchema.measures?.length ?? 0}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="font-semibold text-gray-500">
                  {t("form.label.publishedAt", "Published At")}
                </dt>
                <dd>{formatPublishedAt(activeVersion.publishedAt)}</dd>
              </div>
            </dl>
          ) : (
            <div className="mt-4 text-sm text-amber-700">
              {t(
                "censusDefinition.noPublishedVersion",
                "No published version. Mobile will not show this census."
              )}
            </div>
          )}
        </div>

        <div className="rounded border border-gray-200 bg-white p-4">
          <div className="text-sm font-semibold text-gray-800">
            {t("censusDefinition.mobileAvailability", "Mobile availability")}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {isEnabled
              ? t(
                  "censusDefinition.deactivateHelp",
                  "Deactivating hides this census from reporter mobile apps. Existing submissions remain available."
                )
              : t(
                  "censusDefinition.reactivateHelp",
                  "Reactivating makes the latest published version available to reporter mobile apps again."
                )}
          </div>
          <button
            type="button"
            disabled={viewModel.isSubmitting}
            onClick={() => viewModel.setEnabled(kind, !isEnabled)}
            className={
              isEnabled
                ? "mt-4 px-3 py-2 rounded border border-red-200 bg-red-50 text-sm font-semibold text-red-700 hover:border-red-300 disabled:opacity-60"
                : "mt-4 px-3 py-2 rounded border border-green-200 bg-green-50 text-sm font-semibold text-green-700 hover:border-green-300 disabled:opacity-60"
            }
          >
            {viewModel.isSubmitting ? (
              <Spinner />
            ) : isEnabled ? (
              t(
                "censusDefinition.deactivateMobileForm",
                "Deactivate mobile form"
              )
            ) : (
              t(
                "censusDefinition.reactivateMobileForm",
                "Reactivate mobile form"
              )
            )}
          </button>
        </div>
      </div>

      <div className="rounded border border-gray-200 bg-white p-4">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="font-semibold text-gray-800">
              {t("censusDefinition.schemaJson", "Schema JSON")}
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
              {t("censusDefinition.unpublishedEditsBadge", "Unpublished edits")}
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

        {!isEnabled && (
          <div className="mb-3 rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            {t(
              "censusDefinition.inactiveHelp",
              "This census is inactive and hidden from reporter mobile apps. Reactivate it before publishing a new version."
            )}
          </div>
        )}

        <TextArea
          rows={18}
          value={viewModel.schemaText[kind]}
          onChange={event => viewModel.setSchemaText(kind, event.target.value)}
        />

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={viewModel.isSubmitting || !isEnabled}
            onClick={() => viewModel.publish(kind)}
            className="px-4 py-2 border text-white bg-[#4C81F1] border-blue-300 hover:border-blue-500 rounded disabled:opacity-60"
          >
            {viewModel.isSubmitting ? (
              <Spinner />
            ) : !isEnabled ? (
              t(
                "censusDefinition.publishDisabledUntilActive",
                "Reactivate before publishing"
              )
            ) : activeVersion ? (
              t("censusDefinition.publishNextVersion", "Publish next version")
            ) : (
              t("form.button.publish", "Publish")
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/census_definitions")}
            className="px-4 py-2 border border-gray-300 bg-gray-100 hover:border-gray-400 rounded"
          >
            {t("form.button.cancel", "Cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(CensusDefinitionUpdate);
