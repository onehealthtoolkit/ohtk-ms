import { Observer, observer } from "mobx-react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useServices from "lib/services/provider";
import useStore from "lib/store";
import { CensusRoundMode, CensusSchemaMeasure } from "lib/services/census";
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
  ANIMAL_HOUSEHOLD_KEY,
  VILLAGE_HOUSEHOLD_KEY,
  censusLocalizedText,
  censusRowKey,
  censusRowLabel,
  fieldKeyForRow,
  fieldKeyForSummary,
  measuresForRow,
} from "./formData";

const Card = tw.div`bg-white shadow rounded-md p-6 max-w-5xl`;

type AnimalCensusCreateProps = {
  viewModel?: AnimalCensusCreateViewModel;
};

const AnimalCensusCreate = ({
  viewModel: injectedViewModel,
}: AnimalCensusCreateProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const store = useStore();
  const {
    villageService,
    censusDefinitionService,
    censusRoundService,
    censusSnapshotService,
  } = useServices();

  const [localViewModel] = useState(() => {
    if (injectedViewModel) {
      return injectedViewModel;
    }
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
  const viewModel = injectedViewModel ?? localViewModel;

  useEffect(() => {
    if (injectedViewModel) {
      return;
    }
    viewModel.init();
  }, [injectedViewModel, viewModel]);

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
                  <FieldError
                    message={
                      viewModel.fieldErrors.occurrence
                        ? t(
                            "census.create.roundRequired",
                            "Select a census round"
                          )
                        : undefined
                    }
                  />
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
                      aria-invalid={Boolean(viewModel.fieldErrors.village)}
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
                  <FieldError
                    message={
                      viewModel.fieldErrors.village
                        ? t(
                            "census.create.villageRequired",
                            "Select a village to continue"
                          )
                        : undefined
                    }
                  />
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
                  <FieldError
                    message={
                      viewModel.fieldErrors.censusDate
                        ? t(
                            "census.create.censusDateRequired",
                            "Select a census date"
                          )
                        : undefined
                    }
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
                  disabled={viewModel.loadingDefinition}
                  onClick={() => {
                    viewModel.continueToForm();
                    if (viewModel.fieldErrors.village) {
                      document.getElementById("village")?.focus();
                    }
                  }}
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

              <div className="flex flex-col gap-6">
                {viewModel.summaryFields.length > 0 && (
                  <section className="overflow-hidden rounded-md border border-gray-200">
                    <header className="border-b border-gray-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {t("census.create.villageLevel", "Village")}
                      </p>
                      <h3 className="text-base font-semibold text-gray-900">
                        {t(
                          "census.create.householdSummary",
                          "Village household summary"
                        )}
                      </h3>
                    </header>
                    <DefinitionMeasureCard nested>
                      {viewModel.summaryFields.map(field => (
                        <DefinitionMeasureInput
                          key={field.key}
                          id={`census-summary-${field.key}`}
                          label={summaryFieldLabel(field, t, i18n.language)}
                          value={viewModel.values.summary[field.key] ?? ""}
                          error={
                            viewModel.fieldErrors[fieldKeyForSummary(field.key)]
                          }
                          onChange={value =>
                            viewModel.setSummaryValue(field.key, value)
                          }
                        />
                      ))}
                    </DefinitionMeasureCard>
                  </section>
                )}

                {viewModel.isGrouped &&
                (viewModel.runtimeSchema.groups ?? []).length > 0 ? (
                  (viewModel.runtimeSchema.groups ?? []).map(group => {
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
                    const householdMeasures = householdRow
                      ? measuresForRow(
                          householdRow,
                          viewModel.runtimeSchema.measures ?? []
                        )
                      : [];
                    return (
                      <section
                        key={group.key || group.household_row_key}
                        className="overflow-hidden rounded-md border border-gray-200"
                      >
                        <header className="border-b border-gray-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            {t("census.create.animalGroup", "Animal group")}
                          </p>
                          <h3 className="text-base font-semibold text-gray-900">
                            {censusLocalizedText(
                              group.label,
                              String(group.key || ""),
                              i18n.language
                            )}
                          </h3>
                        </header>
                        <div className="flex flex-col gap-4 p-4">
                          {householdRow && (
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {t(
                                  "census.create.groupHouseholds",
                                  "Households in this group"
                                )}
                              </p>
                              <DefinitionRowFields
                                rowKey={censusRowKey(householdRow)}
                                measures={householdMeasures}
                                viewModel={viewModel}
                                locale={i18n.language}
                              />
                            </div>
                          )}
                          {speciesRows.length > 0 && (
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {t("form.label.species", "Species (heads)")}
                              </p>
                              <DefinitionMeasureCard>
                                {speciesRows.map(row => {
                                  const rowKey = censusRowKey(row);
                                  return measuresForRow(
                                    row,
                                    viewModel.runtimeSchema.measures ?? []
                                  ).map(measure => (
                                    <DefinitionMeasureInput
                                      key={`${rowKey}:${measure.key}`}
                                      id={`census-${rowKey}-${measure.key}`}
                                      label={censusRowLabel(row, i18n.language)}
                                      value={
                                        viewModel.values.rows[rowKey]?.[
                                          measure.key
                                        ] ?? ""
                                      }
                                      error={
                                        viewModel.fieldErrors[
                                          fieldKeyForRow(rowKey, measure.key)
                                        ]
                                      }
                                      onChange={value =>
                                        viewModel.setRowValue(
                                          rowKey,
                                          measure.key,
                                          value
                                        )
                                      }
                                    />
                                  ));
                                })}
                              </DefinitionMeasureCard>
                            </div>
                          )}
                        </div>
                      </section>
                    );
                  })
                ) : (
                  <section className="overflow-hidden rounded-md border border-gray-200">
                    <header className="border-b border-gray-200 bg-slate-50 px-4 py-3">
                      <h3 className="text-base font-semibold text-gray-900">
                        {t("census.create.formTitle", "Animal census")}
                      </h3>
                    </header>
                    <div className="flex flex-col gap-4 p-4">
                      {(viewModel.runtimeSchema.rows ?? []).map(row => (
                        <DefinitionRowFields
                          key={censusRowKey(row)}
                          title={censusRowLabel(row, i18n.language)}
                          rowKey={censusRowKey(row)}
                          measures={measuresForRow(
                            row,
                            viewModel.runtimeSchema.measures ?? []
                          )}
                          viewModel={viewModel}
                          locale={i18n.language}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>

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

const DefinitionRowFields = observer(
  ({
    title,
    rowKey,
    measures,
    viewModel,
    locale,
  }: {
    title?: string;
    rowKey: string;
    measures: CensusSchemaMeasure[];
    viewModel: AnimalCensusCreateViewModel;
    locale: string;
  }) => {
    return (
      <div>
        {title ? (
          <h4 className="mb-1.5 text-sm font-semibold text-gray-900">
            {title}
          </h4>
        ) : null}
        <DefinitionMeasureCard>
          {measures.map(measure => (
            <DefinitionMeasureInput
              key={measure.key}
              id={`census-${rowKey}-${measure.key}`}
              label={censusLocalizedText(measure.label, measure.key, locale)}
              value={viewModel.values.rows[rowKey]?.[measure.key] ?? ""}
              error={viewModel.fieldErrors[fieldKeyForRow(rowKey, measure.key)]}
              onChange={value =>
                viewModel.setRowValue(rowKey, measure.key, value)
              }
            />
          ))}
        </DefinitionMeasureCard>
      </div>
    );
  }
);

const DefinitionMeasureCard = ({
  children,
  nested = false,
}: {
  children: ReactNode;
  nested?: boolean;
}) => (
  <div
    className={
      nested
        ? "divide-y divide-gray-200 bg-white"
        : "divide-y divide-gray-200 overflow-hidden rounded-md border border-gray-200 bg-white"
    }
  >
    {children}
  </div>
);

const DefinitionMeasureInput = observer(
  ({
    id,
    label,
    value,
    error,
    onChange,
  }: {
    id: string;
    label: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
  }) => (
    <label
      htmlFor={id}
      className="flex items-start justify-between gap-3 px-4 py-3"
    >
      <span className="pt-2 text-sm font-medium text-gray-700">{label}</span>
      <div className="w-28 shrink-0">
        <TextInput
          id={id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={value}
          onChange={e => onChange(digitsOnly(e.target.value))}
        />
        <FieldError message={error} />
      </div>
    </label>
  )
);

function digitsOnly(value: string): string {
  return value.replace(/[^\d]/g, "");
}

function summaryFieldLabel(
  field: CensusSchemaMeasure,
  t: (key: string, fallback: string) => string,
  locale: string
): string {
  if (field.key === VILLAGE_HOUSEHOLD_KEY) {
    return t("form.label.villageHouseholdQuantity", "Village households");
  }
  if (field.key === ANIMAL_HOUSEHOLD_KEY) {
    return t("form.label.animalHouseholdQuantity", "Households with animals");
  }
  return censusLocalizedText(field.label, field.key, locale);
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

function queryString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default AnimalCensusCreate;
