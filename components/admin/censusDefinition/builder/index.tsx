import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { TextArea } from "components/widgets/forms";
import { resources } from "i18n";
import {
  CensusDefinitionAuthoredSchema,
  CensusDefinitionSchemaDimension,
  CensusDefinitionSchemaValue,
  CensusKind,
  CensusSchemaMeasure,
  LocalizedLabel,
} from "lib/services/census";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  kind: CensusKind;
  value: CensusDefinitionAuthoredSchema;
  onChange: (schema: CensusDefinitionAuthoredSchema) => void;
  onValidationChange?: (valid: boolean) => void;
};

type BuilderMode = "builder" | "json";
type DeleteTarget =
  | { type: "dimension"; index: number; label: string }
  | {
      type: "dimensionValue";
      dimensionIndex: number;
      valueIndex: number;
      label: string;
    }
  | { type: "measure"; index: number; label: string };

const keyPattern = /^[a-z0-9_]+$/;
const supportedLabelLocales = Object.keys(resources).filter(
  locale => locale !== "en"
);
const localeLabels: Record<string, string> = {
  en: "English",
  th: "Thai",
  km: "Khmer",
  la: "Lao",
  fr: "French",
  es: "Spanish",
  mm: "Burmese",
};

const CensusDefinitionBuilder = ({
  kind,
  value,
  onChange,
  onValidationChange,
}: Props) => {
  const { t } = useTranslation();
  const schema = normalizeSchema(value, kind);
  const [mode, setMode] = useState<BuilderMode>("builder");
  const [rawText, setRawText] = useState(formatJson(schema));
  const [rawError, setRawError] = useState<string>();
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>();
  const errors = useMemo(() => validateSchema(schema), [schema]);
  const valid = errors.length === 0 && !rawError;

  useEffect(() => {
    if (mode === "builder") {
      setRawText(formatJson(schema));
      setRawError(undefined);
    }
  }, [mode, schema]);

  useEffect(() => {
    onValidationChange?.(valid);
  }, [onValidationChange, valid]);

  const errorFor = (path: string) => {
    const error = errors.find(item => item.path === path);
    return error
      ? t(`censusDefinition.builder.validation.${error.key}`, error.fallback)
      : undefined;
  };

  const update = (nextSchema: CensusDefinitionAuthoredSchema) => {
    onChange(normalizeSchema(nextSchema, kind));
  };

  const switchMode = (nextMode: BuilderMode) => {
    if (nextMode === mode) return;
    if (nextMode === "json") {
      setRawText(formatJson(schema));
      setRawError(undefined);
      setMode("json");
      return;
    }
    const parsed = parseRawJson(rawText);
    if (!parsed.ok) {
      setRawError(parsed.message);
      return;
    }
    update(parsed.value);
    setRawError(undefined);
    setMode("builder");
  };

  const applyRawText = (text: string) => {
    setRawText(text);
    const parsed = parseRawJson(text);
    if (!parsed.ok) {
      setRawError(parsed.message);
      return;
    }
    setRawError(undefined);
    onChange(parsed.value);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "dimension") {
      update(removeDimension(schema, deleteTarget.index));
    } else if (deleteTarget.type === "dimensionValue") {
      update(
        removeDimensionValue(
          schema,
          deleteTarget.dimensionIndex,
          deleteTarget.valueIndex
        )
      );
    } else {
      update(removeMeasure(schema, deleteTarget.index));
    }
    setDeleteTarget(undefined);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-gray-800">
            {t("censusDefinition.builder.title", "Census form builder")}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {t(
              "censusDefinition.builder.help",
              "Define breakdowns and numeric measures. Rows are generated for mobile when this definition is published."
            )}
            {kind === "ANIMAL" && isGroupedAnimalSchema(schema) && (
              <div className="mt-2 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-blue-800">
                {t(
                  "censusDefinition.builder.groupedHelp",
                  "Grouped animal form (Option A): each group has one household count; each species has headcount only (including Pig HH on group:PIG). Prefer JSON mode to edit groups."
                )}
              </div>
            )}
          </div>
        </div>
        <div className="inline-flex overflow-hidden rounded border border-gray-300">
          <ModeButton
            active={mode === "builder"}
            onClick={() => switchMode("builder")}
          >
            {t("censusDefinition.builder.builderMode", "Builder")}
          </ModeButton>
          <ModeButton
            active={mode === "json"}
            onClick={() => switchMode("json")}
          >
            {t("censusDefinition.builder.jsonMode", "Raw JSON")}
          </ModeButton>
        </div>
      </div>

      {mode === "json" ? (
        <div>
          <TextArea
            rows={22}
            value={rawText}
            onChange={event => applyRawText(event.target.value)}
          />
          {rawError && <FieldError message={rawError} />}
        </div>
      ) : (
        <div className="space-y-4">
          <DisplayPanel schema={schema} onChange={update} />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <BreakdownsPanel
              schema={schema}
              errorFor={errorFor}
              onChange={update}
              onDelete={setDeleteTarget}
            />
            <MeasuresPanel
              schema={schema}
              errorFor={errorFor}
              onChange={update}
              onDelete={setDeleteTarget}
            />
          </div>
          <PreviewPanel schema={schema} />
        </div>
      )}

      {deleteTarget && (
        <DeleteConfirm
          target={deleteTarget}
          onCancel={() => setDeleteTarget(undefined)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

const ModeButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={
      active
        ? "bg-[#4C81F1] px-3 py-2 text-sm font-semibold text-white"
        : "bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
    }
  >
    {children}
  </button>
);

const DisplayPanel = ({
  schema,
  onChange,
}: {
  schema: CensusDefinitionAuthoredSchema;
  onChange: (schema: CensusDefinitionAuthoredSchema) => void;
}) => {
  const { t } = useTranslation();
  const dimensions = schema.dimensions ?? [];
  const disabled = dimensions.length > 0;
  return (
    <section
      className={`relative overflow-hidden rounded border border-gray-200 p-4 ${
        disabled ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className={disabled ? "pointer-events-none opacity-30" : ""}>
        <div className="mb-3">
          <div className="font-semibold text-gray-800">
            {t("censusDefinition.builder.displayTitle", "Definition display")}
          </div>
          <div className="mt-1 text-xs text-gray-500">
            {disabled
              ? t(
                  "censusDefinition.builder.displayWithBreakdownsHelp",
                  "Mobile row labels are generated from breakdown values."
                )
              : t(
                  "censusDefinition.builder.displayHelp",
                  "Used as the row label when this census has no breakdown."
                )}
          </div>
        </div>
        <LocalizedLabelInputs
          label={t(
            "censusDefinition.builder.singleRowLabel",
            "Single row label"
          )}
          value={schema.display?.single_row_label}
          disabled={disabled}
          onChange={singleRowLabel =>
            onChange({
              ...schema,
              display: {
                ...(schema.display ?? {}),
                single_row_label: singleRowLabel,
              },
            })
          }
        />
      </div>
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 px-4">
          <div className="max-w-2xl rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950 shadow-sm">
            {t(
              "censusDefinition.builder.displayDisabledOverlay",
              "This section is not used while breakdowns are defined. Mobile row labels come from the breakdown values below."
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const BreakdownsPanel = ({
  schema,
  errorFor,
  onChange,
  onDelete,
}: {
  schema: CensusDefinitionAuthoredSchema;
  errorFor: (path: string) => string | undefined;
  onChange: (schema: CensusDefinitionAuthoredSchema) => void;
  onDelete: (target: DeleteTarget) => void;
}) => {
  const { t } = useTranslation();
  const dimensions = schema.dimensions ?? [];
  return (
    <section className="rounded border border-gray-200 bg-white p-4">
      <div className="mb-4">
        <div className="font-semibold text-gray-800">
          {t("censusDefinition.builder.breakdownsTitle", "Breakdowns")}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {t(
            "censusDefinition.builder.breakdownsHelp",
            "Breakdowns repeat the same measures over categories such as gender or species."
          )}
        </div>
      </div>

      {dimensions.length === 0 ? (
        <div className="mb-3 rounded border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
          <div className="font-semibold text-gray-800">
            {t("censusDefinition.builder.noBreakdown", "No breakdown")}
          </div>
          <div className="mt-1 text-xs">
            {t(
              "censusDefinition.builder.noBreakdownHelp",
              "Mobile will show one total row."
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {dimensions.map((dimension, index) => (
            <BreakdownCard
              key={`${dimension.key}-${index}`}
              dimension={dimension}
              index={index}
              errorFor={errorFor}
              onChange={nextDimension =>
                onChange(updateDimension(schema, index, nextDimension))
              }
              onDelete={() =>
                onDelete({
                  type: "dimension",
                  index,
                  label: labelText(dimension.label, dimension.key),
                })
              }
              onDeleteValue={(valueIndex, label) =>
                onDelete({
                  type: "dimensionValue",
                  dimensionIndex: index,
                  valueIndex,
                  label,
                })
              }
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center rounded border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
        onClick={() => onChange(addDimension(schema))}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        {t("censusDefinition.builder.addBreakdown", "Add breakdown")}
      </button>
    </section>
  );
};

const BreakdownCard = ({
  dimension,
  index,
  errorFor,
  onChange,
  onDelete,
  onDeleteValue,
}: {
  dimension: CensusDefinitionSchemaDimension;
  index: number;
  errorFor: (path: string) => string | undefined;
  onChange: (dimension: CensusDefinitionSchemaDimension) => void;
  onDelete: () => void;
  onDeleteValue: (valueIndex: number, label: string) => void;
}) => {
  const { t } = useTranslation();
  const values = dimension.values ?? [];
  return (
    <div className="rounded border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-3">
          <LocalizedLabelInputs
            label={t(
              "censusDefinition.builder.breakdownLabel",
              "Breakdown label"
            )}
            value={dimension.label}
            onChange={label => onChange({ ...dimension, label })}
          />
          <ReadOnlyReference
            label={t("form.label.key", "Key")}
            value={dimension.key}
            help={t(
              "censusDefinition.builder.keyReadOnlyHelp",
              "Generated when added. Use Raw JSON mode to override."
            )}
          />
          {errorFor(`dimensions.${index}.key`) && (
            <FieldError message={errorFor(`dimensions.${index}.key`)!} />
          )}
        </div>
        <IconButton
          label={t("form.button.delete", "Delete")}
          onClick={onDelete}
        />
      </div>

      <div className="mt-4 border-t border-gray-200 pt-3">
        <div className="mb-2 text-sm font-semibold text-gray-800">
          {t("censusDefinition.builder.valuesTitle", "Values")}
        </div>
        <div className="space-y-2">
          {values.map((value, valueIndex) => (
            <div
              key={`${value.key}-${valueIndex}`}
              className="rounded border border-gray-200 bg-white p-2"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <LocalizedLabelInputs
                    label={t(
                      "censusDefinition.builder.valueLabel",
                      "Value label"
                    )}
                    value={value.label}
                    onChange={label =>
                      onChange(
                        updateDimensionValue(dimension, valueIndex, {
                          ...value,
                          label,
                        })
                      )
                    }
                  />
                  <ReadOnlyReference
                    label={t("form.label.key", "Key")}
                    value={value.key}
                  />
                  {errorFor(`dimensions.${index}.values.${valueIndex}.key`) && (
                    <FieldError
                      message={
                        errorFor(
                          `dimensions.${index}.values.${valueIndex}.key`
                        )!
                      }
                    />
                  )}
                </div>
                <IconButton
                  label={t("form.button.delete", "Delete")}
                  onClick={() =>
                    onDeleteValue(valueIndex, labelText(value.label, value.key))
                  }
                />
              </div>
            </div>
          ))}
        </div>
        {errorFor(`dimensions.${index}.values`) && (
          <FieldError message={errorFor(`dimensions.${index}.values`)!} />
        )}
        <button
          type="button"
          className="mt-2 inline-flex items-center rounded border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
          onClick={() => onChange(addDimensionValue(dimension))}
        >
          <PlusIcon className="mr-1 h-3 w-3" />
          {t("censusDefinition.builder.addValue", "Add value")}
        </button>
      </div>
    </div>
  );
};

const MeasuresPanel = ({
  schema,
  errorFor,
  onChange,
  onDelete,
}: {
  schema: CensusDefinitionAuthoredSchema;
  errorFor: (path: string) => string | undefined;
  onChange: (schema: CensusDefinitionAuthoredSchema) => void;
  onDelete: (target: DeleteTarget) => void;
}) => {
  const { t } = useTranslation();
  const measures = schema.measures ?? [];
  return (
    <section className="rounded border border-gray-200 bg-white p-4">
      <div className="mb-4">
        <div className="font-semibold text-gray-800">
          {t("censusDefinition.builder.measuresTitle", "Measures")}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {t(
            "censusDefinition.builder.measuresHelp",
            "Numeric fields collected for each generated row."
          )}
        </div>
      </div>
      <div className="space-y-3">
        {measures.map((measure, index) => (
          <MeasureCard
            key={`${measure.key}-${index}`}
            measure={measure}
            index={index}
            errorFor={errorFor}
            onChange={nextMeasure =>
              onChange(updateMeasure(schema, index, nextMeasure))
            }
            onDelete={() =>
              onDelete({
                type: "measure",
                index,
                label: labelText(measure.label, measure.key),
              })
            }
          />
        ))}
        {errorFor("measures") && <FieldError message={errorFor("measures")!} />}
        <button
          type="button"
          className="flex w-full items-center justify-center rounded border border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-blue-300 hover:text-blue-700"
          onClick={() => onChange(addMeasure(schema))}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          {t("censusDefinition.builder.addMeasure", "Add measure")}
        </button>
      </div>
    </section>
  );
};

const MeasureCard = ({
  measure,
  index,
  errorFor,
  onChange,
  onDelete,
}: {
  measure: CensusSchemaMeasure;
  index: number;
  errorFor: (path: string) => string | undefined;
  onChange: (measure: CensusSchemaMeasure) => void;
  onDelete: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="rounded border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-start gap-3">
        <div className="flex-1 space-y-3">
          <LocalizedLabelInputs
            label={t("censusDefinition.builder.measureLabel", "Measure label")}
            value={measure.label}
            error={errorFor(`measures.${index}.label`)}
            onChange={label =>
              onChange({ ...measure, label, type: "integer", required: true })
            }
          />
          <ReadOnlyReference
            label={t("form.label.key", "Key")}
            value={measure.key}
            help={t(
              "censusDefinition.builder.measureKeyReadOnlyHelp",
              "Generated when added. Use Raw JSON mode to override."
            )}
          />
          {errorFor(`measures.${index}.key`) && (
            <FieldError message={errorFor(`measures.${index}.key`)!} />
          )}
        </div>
        <IconButton
          label={t("form.button.delete", "Delete")}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

const PreviewPanel = ({
  schema,
}: {
  schema: CensusDefinitionAuthoredSchema;
}) => {
  const { t } = useTranslation();
  const rows = generateRows(schema);
  const measures = schema.measures ?? [];
  return (
    <section className="rounded border border-gray-200 bg-white p-4">
      <div className="mb-3">
        <div className="font-semibold text-gray-800">
          {t(
            "censusDefinition.builder.previewTitle",
            "Generated mobile form preview"
          )}
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {t(
            "censusDefinition.builder.previewHelp",
            "Read-only preview of the runtime rows mobile will receive after publish."
          )}
        </div>
      </div>
      <div className="mx-auto w-full max-w-[390px] rounded border border-gray-200 bg-[#f8f4ed] p-4">
        <div className="space-y-4">
          {rows.map(row => (
            <div key={row.key}>
              <div className="mb-2 text-base font-semibold text-gray-900">
                {row.label}
              </div>
              <div className="divide-y divide-gray-200 rounded bg-white shadow-sm ring-1 ring-gray-200">
                {measures.map(measure => (
                  <div
                    key={measure.key}
                    className="flex min-h-[64px] items-center justify-between gap-3 px-4 py-3"
                  >
                    <span className="min-w-0 text-sm font-medium text-gray-700">
                      {labelText(measure.label, measure.key)}
                    </span>
                    <span className="h-10 w-24 shrink-0 rounded border border-gray-300 bg-gray-50" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LocalizedLabelInputs = ({
  label,
  value,
  error,
  disabled,
  onChange,
}: {
  label: string;
  value?: LocalizedLabel;
  error?: string;
  disabled?: boolean;
  onChange: (value: LocalizedLabel) => void;
}) => {
  const { t } = useTranslation();
  const labels = localizedLabel(value);
  const translationLocales = Object.keys(labels).filter(
    locale => locale !== "default"
  );
  const availableLocales = supportedLabelLocales.filter(
    locale => !translationLocales.includes(locale)
  );
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </div>
      <LabeledInput
        label={t("form.label.default", "Default")}
        value={labels.default ?? ""}
        disabled={disabled}
        error={error}
        onChange={nextValue => onChange({ ...labels, default: nextValue })}
      />
      {translationLocales.length > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {t("censusDefinition.builder.translationsTitle", "Translations")}
          </div>
          {translationLocales.map(locale => (
            <div
              key={locale}
              className="grid grid-cols-1 items-end gap-2 md:grid-cols-[10rem_minmax(0,1fr)_2.5rem]"
            >
              <div>
                <div className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {t("form.label.language", "Language")}
                </div>
                <div className="flex min-h-[42px] items-center rounded border border-gray-200 bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-600">
                  {formatLocaleLabel(locale)}
                </div>
              </div>
              <LabeledInput
                label={formatLocaleCode(locale)}
                value={labels[locale] ?? ""}
                disabled={disabled}
                onChange={nextValue =>
                  onChange({ ...labels, [locale]: nextValue })
                }
              />
              <button
                type="button"
                disabled={disabled}
                className="flex h-[42px] w-[42px] items-center justify-center rounded text-gray-500 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                onClick={() => onChange(removeLabelLocale(labels, locale))}
                title={t(
                  "censusDefinition.builder.removeTranslation",
                  "Remove translation"
                )}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
      {availableLocales.length > 0 && !disabled && (
        <div className="mt-2">
          <select
            value=""
            onChange={event => {
              const locale = event.target.value;
              if (locale) {
                onChange({ ...labels, [locale]: "" });
              }
            }}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
          >
            <option value="">
              {t("censusDefinition.builder.addTranslation", "Add translation")}
            </option>
            {availableLocales.map(locale => (
              <option key={locale} value={locale}>
                {formatLocaleLabel(locale)}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-1 text-xs text-gray-400">
        {t(
          "censusDefinition.builder.translationHelp",
          "Default is the fallback label. Add only the languages this form needs."
        )}
      </div>
    </div>
  );
};

const LabeledInput = ({
  label,
  value,
  error,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) => (
  <label className="block">
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <input
      value={value}
      disabled={disabled}
      onChange={event => onChange(event.target.value)}
      className={[
        "w-full rounded border bg-white px-3 py-2 text-sm shadow-sm disabled:bg-gray-100 disabled:text-gray-400",
        error ? "border-red-400" : "border-gray-300",
      ].join(" ")}
    />
    {error && <FieldError message={error} />}
  </label>
);

const ReadOnlyReference = ({
  label,
  value,
  help,
}: {
  label: string;
  value: string;
  help?: string;
}) => (
  <div>
    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
      {label}
    </span>
    <div className="rounded border border-gray-200 bg-gray-100 px-3 py-2 font-mono text-xs text-gray-500">
      {value || "-"}
    </div>
    {help && <div className="mt-1 text-xs text-gray-400">{help}</div>}
  </div>
);

const IconButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    className="rounded p-2 text-gray-500 hover:bg-red-50 hover:text-red-700"
    onClick={onClick}
    title={label}
  >
    <TrashIcon className="h-5 w-5" />
  </button>
);

const FieldError = ({ message }: { message: string }) => (
  <div className="mt-1 text-xs text-red-700">{message}</div>
);

const DeleteConfirm = ({
  target,
  onCancel,
  onConfirm,
}: {
  target: DeleteTarget;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#848A97] opacity-90" />
      <div className="relative w-[90vw] max-w-md rounded bg-white p-6 shadow-lg">
        <div className="text-base font-semibold text-gray-900">
          {t("censusDefinition.builder.deleteTitle", "Delete item?")}
        </div>
        <div className="mt-3 text-sm text-gray-600">
          {t(
            "censusDefinition.builder.deleteHelp",
            "This change affects the next published mobile form. Existing submissions remain readable with the version they used."
          )}
        </div>
        {target.label && (
          <div className="mt-2 rounded bg-gray-50 p-2 text-sm text-gray-700">
            {target.label}
          </div>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded border border-gray-300 bg-gray-100 px-4 py-2 text-sm hover:border-gray-400"
            onClick={onCancel}
          >
            {t("form.button.cancel", "Cancel")}
          </button>
          <button
            type="button"
            className="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:border-red-400"
            onClick={onConfirm}
          >
            {t("form.button.delete", "Delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

type ValidationError = {
  path: string;
  key: string;
  fallback: string;
};

function isGroupedAnimalSchema(schema: CensusDefinitionAuthoredSchema) {
  return (
    schema.schema_version === 2 ||
    (Array.isArray(schema.groups) && schema.groups.length > 0)
  );
}

function normalizeSchema(
  schema: CensusDefinitionAuthoredSchema,
  kind: CensusKind
): CensusDefinitionAuthoredSchema {
  // Option A: preserve group HH + species heads schema end-to-end
  if (kind === "ANIMAL" && isGroupedAnimalSchema(schema)) {
    return {
      ...schema,
      schema_version: schema.schema_version ?? 2,
      groups: Array.isArray(schema.groups) ? schema.groups : [],
      group_measures: Array.isArray(schema.group_measures)
        ? schema.group_measures
        : [measure("household_quantity", "Households")],
      species_measures: Array.isArray(schema.species_measures)
        ? schema.species_measures
        : Array.isArray(schema.measures) && schema.measures.length
          ? schema.measures.filter(m => m.key === "animal_quantity")
          : [measure("animal_quantity", "Animal quantity")],
      summary_fields: Array.isArray(schema.summary_fields)
        ? schema.summary_fields
        : [
            measure("village_household_quantity", "HH No."),
            measure("animal_household_quantity", "Animal HH No."),
          ],
    };
  }

  const normalized: CensusDefinitionAuthoredSchema = {
    schema_version: schema.schema_version ?? 1,
    display: schema.display ?? {
      single_row_label: { default: "Total" },
    },
    dimensions: Array.isArray(schema.dimensions) ? schema.dimensions : [],
    measures: Array.isArray(schema.measures) ? schema.measures : [],
  };
  if (!normalized.measures || normalized.measures.length === 0) {
    normalized.measures =
      kind === "ANIMAL"
        ? [
            measure("animal_quantity", "Animal quantity"),
            measure("household_quantity", "Households"),
          ]
        : [measure("population", "Population")];
  }
  return normalized;
}

function measure(
  key: string,
  defaultLabel: string,
  translatedLabel?: { locale: string; value: string }
): CensusSchemaMeasure {
  return {
    key,
    label: translatedLabel
      ? {
          default: defaultLabel,
          [translatedLabel.locale]: translatedLabel.value,
        }
      : { default: defaultLabel },
    type: "integer",
    required: true,
  };
}

function addDimension(schema: CensusDefinitionAuthoredSchema) {
  const dimensions = schema.dimensions ?? [];
  const key = nextKey(
    "breakdown",
    dimensions.map(dimension => dimension.key)
  );
  return {
    ...schema,
    dimensions: [
      ...dimensions,
      {
        key,
        label: { default: "Breakdown" },
        values: [
          {
            key: "value_001",
            label: { default: "Value" },
          },
        ],
      },
    ],
  };
}

function updateDimension(
  schema: CensusDefinitionAuthoredSchema,
  index: number,
  dimension: CensusDefinitionSchemaDimension
) {
  return {
    ...schema,
    dimensions: (schema.dimensions ?? []).map((item, itemIndex) =>
      itemIndex === index ? dimension : item
    ),
  };
}

function removeDimension(
  schema: CensusDefinitionAuthoredSchema,
  index: number
) {
  return {
    ...schema,
    dimensions: (schema.dimensions ?? []).filter(
      (_item, itemIndex) => itemIndex !== index
    ),
  };
}

function addDimensionValue(dimension: CensusDefinitionSchemaDimension) {
  const values = dimension.values ?? [];
  return {
    ...dimension,
    values: [
      ...values,
      {
        key: nextKey(
          "value",
          values.map(value => value.key)
        ),
        label: { default: "Value" },
      },
    ],
  };
}

function updateDimensionValue(
  dimension: CensusDefinitionSchemaDimension,
  index: number,
  value: CensusDefinitionSchemaValue
) {
  return {
    ...dimension,
    values: (dimension.values ?? []).map((item, itemIndex) =>
      itemIndex === index ? value : item
    ),
  };
}

function removeDimensionValue(
  schema: CensusDefinitionAuthoredSchema,
  dimensionIndex: number,
  valueIndex: number
) {
  const dimension = schema.dimensions?.[dimensionIndex];
  if (!dimension) return schema;
  return updateDimension(schema, dimensionIndex, {
    ...dimension,
    values: (dimension.values ?? []).filter(
      (_item, index) => index !== valueIndex
    ),
  });
}

function addMeasure(schema: CensusDefinitionAuthoredSchema) {
  const measures = schema.measures ?? [];
  return {
    ...schema,
    measures: [
      ...measures,
      {
        key: nextKey(
          "measure",
          measures.map(measure => measure.key)
        ),
        label: { default: "Measure" },
        type: "integer",
        required: true,
      },
    ],
  };
}

function updateMeasure(
  schema: CensusDefinitionAuthoredSchema,
  index: number,
  measure: CensusSchemaMeasure
) {
  return {
    ...schema,
    measures: (schema.measures ?? []).map((item, itemIndex) =>
      itemIndex === index ? measure : item
    ),
  };
}

function removeMeasure(schema: CensusDefinitionAuthoredSchema, index: number) {
  return {
    ...schema,
    measures: (schema.measures ?? []).filter(
      (_item, itemIndex) => itemIndex !== index
    ),
  };
}

function validateSchema(
  schema: CensusDefinitionAuthoredSchema
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Option A grouped animal schema (edit primarily via JSON mode for now)
  if (isGroupedAnimalSchema(schema)) {
    const groups = schema.groups ?? [];
    if (groups.length === 0) {
      errors.push({
        path: "groups",
        key: "groupsRequired",
        fallback: "At least one group is required.",
      });
    }
    validateUniqueKeys(groups, "groups", errors);
    const seenSpecies = new Set<string>();
    groups.forEach((group, index) => {
      if (!labelText(group.label, "").trim()) {
        errors.push({
          path: `groups.${index}.label`,
          key: "labelRequired",
          fallback: "Label is required.",
        });
      }
      if (!group.species?.length) {
        errors.push({
          path: `groups.${index}.species`,
          key: "valuesRequired",
          fallback: "At least one species is required.",
        });
      }
      (group.species ?? []).forEach((species, speciesIndex) => {
        if (!species.key) {
          errors.push({
            path: `groups.${index}.species.${speciesIndex}.key`,
            key: "keyRequired",
            fallback: "Key is required.",
          });
        } else if (seenSpecies.has(species.key)) {
          errors.push({
            path: `groups.${index}.species.${speciesIndex}.key`,
            key: "keyUnique",
            fallback: "Species key must be unique.",
          });
        }
        seenSpecies.add(species.key);
        if (!labelText(species.label, "").trim()) {
          errors.push({
            path: `groups.${index}.species.${speciesIndex}.label`,
            key: "labelRequired",
            fallback: "Label is required.",
          });
        }
      });
    });
    return errors;
  }

  const dimensions = schema.dimensions ?? [];
  const measures = schema.measures ?? [];
  validateUniqueKeys(dimensions, "dimensions", errors);
  dimensions.forEach((dimension, index) => {
    if (!keyPattern.test(dimension.key)) {
      errors.push({
        path: `dimensions.${index}.key`,
        key: "keyPattern",
        fallback: "Use lowercase letters, numbers, and underscores only.",
      });
    }
    if ((dimension.values ?? []).length === 0) {
      errors.push({
        path: `dimensions.${index}.values`,
        key: "valuesRequired",
        fallback: "At least one value is required.",
      });
    }
    validateUniqueKeys(
      dimension.values ?? [],
      `dimensions.${index}.values`,
      errors
    );
  });

  if (measures.length === 0) {
    errors.push({
      path: "measures",
      key: "measuresRequired",
      fallback: "At least one measure is required.",
    });
  }
  validateUniqueKeys(measures, "measures", errors);
  measures.forEach((measure, index) => {
    if (!labelText(measure.label, "").trim()) {
      errors.push({
        path: `measures.${index}.label`,
        key: "labelRequired",
        fallback: "Label is required.",
      });
    }
    if ((measure.type ?? "integer") !== "integer") {
      errors.push({
        path: `measures.${index}.key`,
        key: "integerOnly",
        fallback: "Only integer measures are supported.",
      });
    }
  });
  return errors;
}

function validateUniqueKeys(
  items: Array<{ key?: string }>,
  path: string,
  errors: ValidationError[]
) {
  const keys = new Set<string>();
  items.forEach((item, index) => {
    const key = item.key ?? "";
    if (!key.trim()) {
      errors.push({
        path: `${path}.${index}.key`,
        key: "keyRequired",
        fallback: "Key is required.",
      });
    } else if (keys.has(key)) {
      errors.push({
        path: `${path}.${index}.key`,
        key: "keyUnique",
        fallback: "Keys must be unique.",
      });
    }
    keys.add(key);
  });
}

function generateRows(schema: CensusDefinitionAuthoredSchema) {
  const dimensions = schema.dimensions ?? [];
  if (dimensions.length === 0) {
    return [
      {
        key: "row_001",
        label: labelText(schema.display?.single_row_label, "Total"),
      },
    ];
  }
  return cartesianProduct(
    dimensions.map(dimension => dimension.values ?? [])
  ).map(values => ({
    key: values.map(value => value.key).join("|"),
    label: values.map(value => labelText(value.label, value.key)).join(" / "),
  }));
}

function cartesianProduct<T>(sets: T[][]): T[][] {
  return sets.reduce<T[][]>(
    (accumulator, set) =>
      accumulator.flatMap(items => set.map(item => [...items, item])),
    [[]]
  );
}

function nextKey(prefix: string, existingKeys: string[]) {
  const existing = new Set(existingKeys);
  for (let number = 1; number < 10000; number += 1) {
    const key = `${prefix}_${number.toString().padStart(3, "0")}`;
    if (!existing.has(key)) return key;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

function localizedLabel(value?: LocalizedLabel): {
  default?: string;
  [locale: string]: string | undefined;
} {
  if (typeof value === "string") {
    return { default: value };
  }
  if (value && typeof value === "object") {
    return { ...value };
  }
  return {};
}

function removeLabelLocale(
  labels: { default?: string; [locale: string]: string | undefined },
  locale: string
) {
  const nextLabels = { ...labels };
  delete nextLabels[locale];
  return nextLabels;
}

function formatLocaleLabel(locale: string) {
  return `${localeLabels[locale] ?? locale.toUpperCase()} (${formatLocaleCode(
    locale
  )})`;
}

function formatLocaleCode(locale: string) {
  return locale.toUpperCase();
}

function labelText(value: LocalizedLabel | undefined, fallback: string) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    return value.default || Object.values(value).find(Boolean) || fallback;
  }
  return fallback;
}

function parseRawJson(
  value: string
):
  | { ok: true; value: CensusDefinitionAuthoredSchema }
  | { ok: false; message: string } {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, message: "Schema must be a JSON object." };
    }
    return { ok: true, value: parsed };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Invalid JSON.",
    };
  }
}

function formatJson(value: CensusDefinitionAuthoredSchema) {
  return JSON.stringify(value ?? {}, null, 2);
}

export default CensusDefinitionBuilder;
