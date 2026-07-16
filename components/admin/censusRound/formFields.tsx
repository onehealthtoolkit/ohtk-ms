import { Observer } from "mobx-react";
import {
  ErrorText,
  Field,
  Label,
  TextInput,
} from "components/widgets/forms";
import { useTranslation } from "react-i18next";
import { CensusRoundViewModel } from "./censusRoundViewModel";
import AuthroitySelect from "components/widgets/authoritySelect";
import useStore from "lib/store";

type Props = {
  viewModel: CensusRoundViewModel;
};

const MonthDayField = ({
  id,
  label,
  value,
  disabled,
  error,
  onChange,
  help,
}: {
  id: string;
  label: string;
  value: string;
  disabled: boolean;
  error?: string;
  onChange: (value: string) => void;
  help?: string;
}) => (
  <Field $size="half">
    <Label htmlFor={id}>{label}</Label>
    <TextInput
      id={id}
      type="text"
      placeholder="MM-DD"
      pattern="(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])"
      maxLength={5}
      value={value}
      onChange={evt => onChange(evt.target.value)}
      disabled={disabled}
      required
    />
    {help ? <p className="text-xs text-gray-500 mt-1">{help}</p> : <></>}
    <ErrorText>{error}</ErrorText>
  </Field>
);

const CensusRoundFormFields = ({ viewModel }: Props) => {
  const { t } = useTranslation();
  const store = useStore();
  const isSubmitting = viewModel.isSubmitting;

  return (
    <Observer>
      {() => (
        <>
          <Field $size="half">
            <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
            <TextInput
              id="code"
              type="text"
              placeholder={t(
                "form.placeholder.censusRoundCode",
                "e.g. ANIMAL_H1"
              )}
              value={viewModel.code}
              onChange={evt => (viewModel.code = evt.target.value)}
              disabled={isSubmitting}
              required
            />
            <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
            <TextInput
              id="name"
              type="text"
              placeholder={t(
                "form.placeholder.censusRoundName",
                "e.g. H1 Animal Census"
              )}
              value={viewModel.name}
              onChange={evt => (viewModel.name = evt.target.value)}
              disabled={isSubmitting}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="kind">{t("form.label.kind", "Kind")}</Label>
            <select
              id="kind"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={viewModel.kind}
              onChange={evt =>
                (viewModel.kind = evt.target.value as "ANIMAL" | "HUMAN")
              }
              disabled={isSubmitting}
            >
              <option value="ANIMAL">
                {t("censusDefinition.kind.ANIMAL", "Animal census")}
              </option>
            </select>
            <ErrorText>{viewModel.fieldErrors.kind}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="mode">{t("form.label.mode", "Mode")}</Label>
            <select
              id="mode"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={viewModel.mode}
              onChange={evt =>
                (viewModel.mode = evt.target.value as
                  | "PRODUCTION"
                  | "TRAINING")
              }
              disabled={isSubmitting}
            >
              <option value="PRODUCTION">
                {t("form.label.production", "Production")}
              </option>
              <option value="TRAINING">
                {t("form.label.training", "Training")}
              </option>
            </select>
            <ErrorText>{viewModel.fieldErrors.mode}</ErrorText>
          </Field>

          <MonthDayField
            id="censusPeriodStart"
            label={t("form.label.censusPeriodStart", "Census period start")}
            value={viewModel.censusPeriodStart}
            disabled={isSubmitting}
            error={viewModel.fieldErrors.censusPeriodStart}
            onChange={value => (viewModel.censusPeriodStart = value)}
            help={t(
              "form.help.monthDayRule",
              "Annual month-day rule (MM-DD). Leap day 02-29 is not allowed."
            )}
          />
          <MonthDayField
            id="censusPeriodEnd"
            label={t("form.label.censusPeriodEnd", "Census period end")}
            value={viewModel.censusPeriodEnd}
            disabled={isSubmitting}
            error={viewModel.fieldErrors.censusPeriodEnd}
            onChange={value => (viewModel.censusPeriodEnd = value)}
          />
          <MonthDayField
            id="startDate"
            label={t("form.label.roundStartDate", "Submission start")}
            value={viewModel.startDate}
            disabled={isSubmitting}
            error={viewModel.fieldErrors.startDate}
            onChange={value => (viewModel.startDate = value)}
          />
          <MonthDayField
            id="softFinishDate"
            label={t("form.label.softFinishDate", "Soft finish (due)")}
            value={viewModel.softFinishDate}
            disabled={isSubmitting}
            error={viewModel.fieldErrors.softFinishDate}
            onChange={value => (viewModel.softFinishDate = value)}
          />
          <MonthDayField
            id="hardFinishDate"
            label={t("form.label.hardFinishDate", "Hard finish (cutoff)")}
            value={viewModel.hardFinishDate}
            disabled={isSubmitting}
            error={viewModel.fieldErrors.hardFinishDate}
            onChange={value => (viewModel.hardFinishDate = value)}
          />

          {store.isSuperUser && (
            <Field $size="half">
              <Label htmlFor="authority">
                {t(
                  "form.label.targetAuthority",
                  "Target authority (optional)"
                )}
              </Label>
              <AuthroitySelect
                value={viewModel.targetAuthorityId ?? undefined}
                onChange={value => {
                  const id = value?.id ? parseInt(String(value.id), 10) : null;
                  viewModel.targetAuthorityId =
                    id && !Number.isNaN(id) ? id : null;
                }}
              />
              <p className="text-xs text-gray-500 mt-1">
                {t(
                  "form.help.targetAuthority",
                  "Leave empty to target all active villages."
                )}
              </p>
              <ErrorText>{viewModel.fieldErrors.targetAuthorityId}</ErrorText>
            </Field>
          )}

          <Field $size="half">
            <Label htmlFor="enabled">
              {t("form.label.enabled", "Enabled")}
            </Label>
            <label className="inline-flex items-center gap-2 mt-2">
              <input
                id="enabled"
                type="checkbox"
                checked={viewModel.enabled}
                onChange={evt => (viewModel.enabled = evt.target.checked)}
                disabled={isSubmitting}
              />
              <span>
                {viewModel.enabled
                  ? t("form.label.yes", "Yes")
                  : t("form.label.no", "No")}
              </span>
            </label>
            <ErrorText>{viewModel.fieldErrors.enabled}</ErrorText>
          </Field>

          {viewModel.enabled && (
            <>
              <Field $size="half">
                <Label htmlFor="materialize">
                  {t(
                    "form.label.materializeOccurrences",
                    "Materialize yearly occurrences"
                  )}
                </Label>
                <label className="inline-flex items-center gap-2 mt-2">
                  <input
                    id="materialize"
                    type="checkbox"
                    checked={viewModel.materialize}
                    onChange={evt =>
                      (viewModel.materialize = evt.target.checked)
                    }
                    disabled={isSubmitting}
                  />
                  <span>
                    {t(
                      "form.help.materializeOccurrences",
                      "Create or refresh yearly occurrences for the selected range"
                    )}
                  </span>
                </label>
              </Field>

              {viewModel.materialize && (
                <>
                  <Field $size="half">
                    <Label htmlFor="materializeFromYear">
                      {t(
                        "form.label.materializeFromYear",
                        "Materialize from year"
                      )}
                    </Label>
                    <TextInput
                      id="materializeFromYear"
                      type="number"
                      min={2000}
                      max={2100}
                      value={String(viewModel.materializeFromYear)}
                      onChange={evt =>
                        (viewModel.materializeFromYear =
                          parseInt(evt.target.value, 10) ||
                          new Date().getFullYear())
                      }
                      disabled={isSubmitting}
                    />
                    <ErrorText>
                      {viewModel.fieldErrors.materializeFromYear}
                    </ErrorText>
                  </Field>
                  <Field $size="half">
                    <Label htmlFor="materializeYears">
                      {t("form.label.materializeYears", "Number of years")}
                    </Label>
                    <TextInput
                      id="materializeYears"
                      type="number"
                      min={1}
                      max={10}
                      value={String(viewModel.materializeYears)}
                      onChange={evt =>
                        (viewModel.materializeYears =
                          parseInt(evt.target.value, 10) || 2)
                      }
                      disabled={isSubmitting}
                    />
                    <ErrorText>
                      {viewModel.fieldErrors.materializeYears}
                    </ErrorText>
                  </Field>
                </>
              )}
            </>
          )}
        </>
      )}
    </Observer>
  );
};

export default CensusRoundFormFields;
