import { observer } from "mobx-react";
import React from "react";
import { Checkbox, Field, Label } from "components/widgets/forms";
import useServices from "lib/services/provider";
import AsyncSelect from "react-select/async";
import DatePicker from "components/widgets/datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ReportListViewModel } from "./listViewModel";
import { Authority } from "lib/services/authority";
import { runInAction } from "mobx";
import ReportTypeSelect from "./reportTypeSelect";
import { styledReactSelect } from "components/widgets/styledReactSelect";
import { useTranslation } from "react-i18next";
import RiskBadge, { RISK_LEVEL_OPTIONS } from "components/risk/RiskBadge";
import { RiskFilterLevel } from "lib/services/report/report";

export const defaultOptions: Authority[] = [];

const ReportFilter = ({ viewModel }: { viewModel: ReportListViewModel }) => {
  const { authorityService } = useServices();
  const { t } = useTranslation();

  const loadAuthorityOptions = (inputValue: string) =>
    authorityService
      .lookupAuthorities(100, 0, inputValue)
      .then(result => (result.items ? result.items : []));

  const toggleRiskLevel = (level: RiskFilterLevel, checked: boolean) => {
    runInAction(() => {
      const currentValues = viewModel.filter.riskLevels || [];
      viewModel.filter.riskLevels = checked
        ? [...currentValues, level]
        : currentValues.filter(item => item !== level);
    });
  };

  return (
    <div className="w-full">
      {!viewModel.isCalendarView && (
        <>
          <Field $size="full">
            <Label htmlFor="fromDate">
              {t("form.label.fromDate", "Form Date")}
            </Label>
            <DatePicker
              id="fromDate"
              selected={viewModel.fromDate}
              onChange={(date: Date | null) => {
                if (date) viewModel.fromDate = date;
              }}
            />
          </Field>
          <Field $size="full">
            <Label htmlFor="throughDate">
              {t("form.label.throughDate", "Through Date")}
            </Label>
            <DatePicker
              id="throughDate"
              selected={viewModel.throughDate}
              onChange={(date: Date | null) => {
                if (date) viewModel.throughDate = date;
              }}
            />
          </Field>
        </>
      )}
      <Field $size="full">
        <Label htmlFor="authority">
          {t("form.label.authority", "Authority")}
        </Label>
        <AsyncSelect<Authority, true>
          cacheOptions
          value={viewModel.filter.authorities}
          defaultOptions={defaultOptions}
          loadOptions={loadAuthorityOptions}
          placeholder={t("form.placeholder.typeToSelect", "Type to select")}
          isMulti={true}
          getOptionValue={(item: Authority) => item.id}
          getOptionLabel={(item: Authority) => item.name}
          styles={styledReactSelect}
          onChange={(values: readonly Authority[]) => {
            runInAction(() => {
              viewModel.filter.authorities = [...values];
            });
          }}
        />
      </Field>
      {viewModel.filter.authorities &&
        viewModel.filter.authorities?.length == 1 && (
          <Field $size="half">
            <Checkbox
              id="includeChildAuthority"
              value="True"
              checked={viewModel.filter.includeChildAuthorities || false}
              onChange={evt =>
                runInAction(
                  () =>
                    (viewModel.filter.includeChildAuthorities =
                      evt.target.checked)
                )
              }
              label={t(
                "form.label.includeChildAuthority",
                "Include child authority"
              )}
              disabled={false}
            />
          </Field>
        )}
      <Field $size="full">
        <Label htmlFor="throughDate">
          {t("form.label.reportType", "Report Type")}
        </Label>
        <ReportTypeSelect
          value={viewModel.filter.reportTypes}
          onChange={values => {
            runInAction(() => {
              viewModel.filter.reportTypes = [...values];
            });
          }}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="riskLevels">{t("form.label.risk", "Risk")}</Label>
        <div id="riskLevels" className="grid grid-cols-1 gap-2">
          {RISK_LEVEL_OPTIONS.map(level => (
            <label
              key={level}
              className="flex cursor-pointer items-center gap-2 rounded border border-gray-100 px-2 py-1 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={viewModel.filter.riskLevels?.includes(level) || false}
                onChange={evt => toggleRiskLevel(level, evt.target.checked)}
              />
              <RiskBadge level={level} />
            </label>
          ))}
        </div>
      </Field>
      <Field $size="half">
        <Checkbox
          id="testing"
          value="True"
          checked={viewModel.filter.includeTest}
          onChange={evt =>
            runInAction(
              () => (viewModel.filter.includeTest = evt.target.checked || false)
            )
          }
          label={t("form.label.showTestReport", "Show test report")}
          disabled={false}
        />
      </Field>
    </div>
  );
};

export default observer(ReportFilter);
