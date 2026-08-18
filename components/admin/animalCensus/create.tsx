import { Observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { CensusRoundMode } from "lib/services/census";
import {
  DownloadButton,
  Field,
  FieldGroup,
  Label,
  Select,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import ErrorDisplay from "components/widgets/errorDisplay";
import tw from "tailwind-styled-components";
import { AnimalCensusCreateViewModel } from "./createViewModel";
import {
  censusLocalizedText,
  censusRowKey,
  censusRowLabel,
  fieldKeyForRow,
  fieldKeyForSummary,
  measuresForRow,
} from "./formData";

const Card = tw.div`bg-white shadow rounded-md p-6 max-w-5xl`;

const AnimalCensusCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const {
    villageService,
    censusDefinitionService,
    censusRoundService,
    censusSnapshotService,
  } = useServices();

  const [viewModel] = useState(() => {
    const queryMode =
      router.query.mode === "TRAINING" ? "TRAINING" : "PRODUCTION";
    return new AnimalCensusCreateViewModel(
      villageService,
      censusDefinitionService,
      censusRoundService,
      censusSnapshotService,
      {
        authorityId: store.authorityId
          ? parseInt(String(store.authorityId), 10)
          : undefined,
        villageId: queryString(router.query.villageId),
        occurrenceId: queryString(router.query.occurrenceId),
        mode: queryMode,
      }
    );
  });

  useEffect(() => {
    viewModel.init();
  }, [viewModel]);

  const returnHref = `/admin/census/animal/?mode=${viewModel.mode}${
    viewModel.selectedOccurrenceId
      ? `&occurrenceId=${viewModel.selectedOccurrenceId}`
      : ""
  }`;

  return (
    <Observer>
      {() => (
        <div className="flex flex-col gap-4">
          {viewModel.step === "setup" && (
            <Card>
              <h2 className="text-lg font-semibold mb-4">
                {t("census.create.title", "Enter animal census")}
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                {t(
                  "census.create.help",
                  "Officer entry for a village in the selected census round. The table comes from the published animal census definition."
                )}
              </p>
              <FieldGroup>
                <Field $size="half">
                  <Label htmlFor="censusMode">
                    {t("censusCoverage.mode", "Mode")}
                  </Label>
                  <Select
                    id="censusMode"
                    value={viewModel.mode}
                    onChange={e =>
                      viewModel.setMode(e.target.value as CensusRoundMode)
                    }
                  >
                    <option value="PRODUCTION">
                      {t("censusCoverage.mode.PRODUCTION", "Production")}
                    </option>
                    <option value="TRAINING">
                      {t("censusCoverage.mode.TRAINING", "Training")}
                    </option>
                  </Select>
                </Field>
                <Field $size="half">
                  <Label htmlFor="occurrence">
                    {t("censusCoverage.occurrence", "Round")}
                  </Label>
                  <Select
                    id="occurrence"
                    value={viewModel.selectedOccurrenceId}
                    onChange={e => viewModel.selectOccurrence(e.target.value)}
                    required
                  >
                    <option value="">
                      {t("form.label.selectItem", "Select item ...")}
                    </option>
                    {viewModel.occurrences.map(occurrence => (
                      <option key={occurrence.id} value={occurrence.id}>
                        {occurrence.occurrenceKey}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field $size="half">
                  <Label htmlFor="village">
                    {t("form.label.village", "Village")} *
                  </Label>
                  {viewModel.villagesLoading ? (
                    <Spinner />
                  ) : (
                    <Select
                      id="village"
                      value={viewModel.selectedVillageId}
                      onChange={e => viewModel.selectVillage(e.target.value)}
                      required
                    >
                      <option value="">
                        {t("form.label.selectItem", "Select item ...")}
                      </option>
                      {viewModel.villages.map(village => (
                        <option key={village.id} value={village.id}>
                          {village.code
                            ? `${village.code} — ${village.name}`
                            : village.name}
                          {village.authorityName
                            ? ` (${village.authorityName})`
                            : ""}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
                <Field $size="half">
                  <Label htmlFor="censusDate">
                    {t("form.label.censusDate", "Census date")} *
                  </Label>
                  <TextInput
                    id="censusDate"
                    type="date"
                    value={viewModel.censusDate}
                    onChange={e => viewModel.setCensusDate(e.target.value)}
                    required
                  />
                </Field>
              </FieldGroup>

              {viewModel.selectedOccurrence && (
                <p className="mt-3 text-sm text-slate-500">
                  {t("census.create.roundWindow", "Round window")}:{" "}
                  {viewModel.selectedOccurrence.startDate} –{" "}
                  {viewModel.selectedOccurrence.hardFinishDate}
                </p>
              )}

              <ErrorDisplay message={viewModel.loadError} />

              <div className="mt-6 flex gap-3">
                <DownloadButton
                  type="button"
                  disabled={
                    !viewModel.canContinueToForm || viewModel.loadingDefinition
                  }
                  onClick={() => viewModel.continueToForm()}
                >
                  {viewModel.loadingDefinition ? (
                    <Spinner />
                  ) : (
                    t("census.create.continue", "Continue to form")
                  )}
                </DownloadButton>
                <button
                  type="button"
                  className="text-sm text-slate-600 underline"
                  onClick={() => router.push(returnHref)}
                >
                  {t("form.button.cancel", "Cancel")}
                </button>
              </div>
            </Card>
          )}

          {viewModel.step === "form" && viewModel.definition && (
            <Card>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {t("census.create.formTitle", "Animal census")}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {viewModel.selectedVillage
                      ? `${viewModel.selectedVillage.code} — ${viewModel.selectedVillage.name}`
                      : viewModel.selectedVillageId}
                    {viewModel.selectedOccurrence
                      ? ` · ${viewModel.selectedOccurrence.occurrenceKey}`
                      : ""}
                    {` · ${viewModel.censusDate}`}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => viewModel.backToSetup()}
                >
                  {t("census.create.changeSetup", "Change setup")}
                </button>
              </div>

              {viewModel.latestSnapshot && (
                <p className="mb-3 text-sm text-slate-600">
                  {t(
                    "census.create.prefilled",
                    "Values are prefilled from the latest submission when they match the current form."
                  )}
                </p>
              )}
              {viewModel.definitionChanged && (
                <p className="mb-3 text-sm text-amber-700">
                  {t(
                    "census.create.definitionChanged",
                    "The published census definition changed since the last submission. Check every row before submitting."
                  )}
                </p>
              )}

              <div className="mb-6 grid gap-3 md:grid-cols-2">
                {viewModel.summaryFields.map(field => (
                  <label key={field.key} className="text-sm">
                    <span className="mb-1 block font-medium text-gray-700">
                      {censusLocalizedText(field.label, field.key)}
                    </span>
                    <TextInput
                      type="number"
                      min={0}
                      step={1}
                      value={viewModel.values.summary[field.key] ?? ""}
                      onChange={e =>
                        viewModel.setSummaryValue(field.key, e.target.value)
                      }
                    />
                    <FieldError
                      message={
                        viewModel.fieldErrors[fieldKeyForSummary(field.key)]
                      }
                    />
                  </label>
                ))}
              </div>

              {viewModel.isGrouped &&
              (viewModel.runtimeSchema.groups ?? []).length > 0 ? (
                <div className="flex flex-col gap-6">
                  {(viewModel.runtimeSchema.groups ?? []).map(group => {
                    const householdRow = (
                      viewModel.runtimeSchema.rows ?? []
                    ).find(
                      row =>
                        censusRowKey(row) ===
                        (group.household_row_key || `group:${group.key}`)
                    );
                    const speciesRows = (
                      viewModel.runtimeSchema.rows ?? []
                    ).filter(row =>
                      (group.species_row_keys ?? []).includes(censusRowKey(row))
                    );
                    return (
                      <section
                        key={group.key || group.household_row_key}
                        className="rounded border border-gray-200"
                      >
                        <div className="border-b border-gray-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-gray-800">
                          {censusLocalizedText(
                            group.label,
                            String(group.key || "")
                          )}
                        </div>
                        <div className="p-4">
                          {householdRow && (
                            <MeasureInputs
                              rowKey={censusRowKey(householdRow)}
                              label={censusRowLabel(householdRow)}
                              measures={measuresForRow(
                                householdRow,
                                viewModel.runtimeSchema.measures ?? []
                              )}
                              viewModel={viewModel}
                            />
                          )}
                          <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full text-sm">
                              <thead>
                                <tr className="text-left text-xs uppercase text-gray-500">
                                  <th className="pb-2 pr-4">
                                    {t("form.label.species", "Species (heads)")}
                                  </th>
                                  {speciesRows[0] &&
                                    measuresForRow(
                                      speciesRows[0],
                                      viewModel.runtimeSchema.measures ?? []
                                    ).map(measure => (
                                      <th
                                        key={measure.key}
                                        className="pb-2 pr-4"
                                      >
                                        {censusLocalizedText(
                                          measure.label,
                                          measure.key
                                        )}
                                      </th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                {speciesRows.map(row => {
                                  const rowKey = censusRowKey(row);
                                  return (
                                    <tr key={rowKey}>
                                      <td className="py-2 pr-4 align-top">
                                        {censusRowLabel(row)}
                                      </td>
                                      {measuresForRow(
                                        row,
                                        viewModel.runtimeSchema.measures ?? []
                                      ).map(measure => (
                                        <td
                                          key={measure.key}
                                          className="py-2 pr-4 align-top"
                                        >
                                          <TextInput
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={
                                              viewModel.values.rows[rowKey]?.[
                                                measure.key
                                              ] ?? ""
                                            }
                                            onChange={e =>
                                              viewModel.setRowValue(
                                                rowKey,
                                                measure.key,
                                                e.target.value
                                              )
                                            }
                                          />
                                          <FieldError
                                            message={
                                              viewModel.fieldErrors[
                                                fieldKeyForRow(
                                                  rowKey,
                                                  measure.key
                                                )
                                              ]
                                            }
                                          />
                                        </td>
                                      ))}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase text-gray-500">
                        <th className="pb-2 pr-4">
                          {t("form.label.row", "Row")}
                        </th>
                        {(viewModel.runtimeSchema.measures ?? []).map(
                          measure => (
                            <th key={measure.key} className="pb-2 pr-4">
                              {censusLocalizedText(measure.label, measure.key)}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {(viewModel.runtimeSchema.rows ?? []).map(row => {
                        const rowKey = censusRowKey(row);
                        return (
                          <tr key={rowKey}>
                            <td className="py-2 pr-4 align-top">
                              {censusRowLabel(row)}
                            </td>
                            {measuresForRow(
                              row,
                              viewModel.runtimeSchema.measures ?? []
                            ).map(measure => (
                              <td
                                key={measure.key}
                                className="py-2 pr-4 align-top"
                              >
                                <TextInput
                                  type="number"
                                  min={0}
                                  step={1}
                                  value={
                                    viewModel.values.rows[rowKey]?.[
                                      measure.key
                                    ] ?? ""
                                  }
                                  onChange={e =>
                                    viewModel.setRowValue(
                                      rowKey,
                                      measure.key,
                                      e.target.value
                                    )
                                  }
                                />
                                <FieldError
                                  message={
                                    viewModel.fieldErrors[
                                      fieldKeyForRow(rowKey, measure.key)
                                    ]
                                  }
                                />
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              <ErrorDisplay message={viewModel.submitError} />

              <div className="mt-6 flex gap-3">
                <DownloadButton
                  type="button"
                  disabled={viewModel.isSubmitting}
                  onClick={async () => {
                    const created = await viewModel.submit();
                    if (created?.id) {
                      await router.push(returnHref);
                    }
                  }}
                >
                  {viewModel.isSubmitting ? (
                    <Spinner />
                  ) : (
                    t("form.button.submit", "Submit")
                  )}
                </DownloadButton>
                <button
                  type="button"
                  className="text-sm text-slate-600 underline"
                  onClick={() => router.push(returnHref)}
                >
                  {t("form.button.cancel", "Cancel")}
                </button>
              </div>
            </Card>
          )}
        </div>
      )}
    </Observer>
  );
};

const MeasureInputs = ({
  rowKey,
  label,
  measures,
  viewModel,
}: {
  rowKey: string;
  label: string;
  measures: Array<{ key: string; label?: unknown }>;
  viewModel: AnimalCensusCreateViewModel;
}) => {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {measures.map(measure => (
        <label key={measure.key} className="text-sm">
          <span className="mb-1 block font-medium text-gray-700">
            {label}
            {measures.length > 1
              ? ` — ${censusLocalizedText(
                  measure.label as string,
                  measure.key
                )}`
              : ""}
          </span>
          <TextInput
            type="number"
            min={0}
            step={1}
            value={viewModel.values.rows[rowKey]?.[measure.key] ?? ""}
            onChange={e =>
              viewModel.setRowValue(rowKey, measure.key, e.target.value)
            }
          />
          <FieldError
            message={viewModel.fieldErrors[fieldKeyForRow(rowKey, measure.key)]}
          />
        </label>
      ))}
    </div>
  );
};

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

function queryString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default AnimalCensusCreate;
