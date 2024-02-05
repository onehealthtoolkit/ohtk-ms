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

export const defaultOptions: Authority[] = [];

const ReportFilter = ({ viewModel }: { viewModel: ReportListViewModel }) => {
  const { authorityService } = useServices();
  const { t } = useTranslation();

  const loadAuthorityOptions = (inputValue: string) =>
    authorityService
      .lookupAuthorities(100, 0, inputValue)
      .then(result => (result.items ? result.items : []));

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
              onChange={(date: Date) => (viewModel.fromDate = date)}
            />
          </Field>
          <Field $size="full">
            <Label htmlFor="throughDate">
              {t("form.label.throughDate", "Through Date")}
            </Label>
            <DatePicker
              id="throughDate"
              selected={viewModel.throughDate}
              onChange={(date: Date) => (viewModel.throughDate = date)}
            />
          </Field>
        </>
      )}
      <Field $size="full">
        <Label htmlFor="authority">
          {t("form.label.authority", "Authority")}
        </Label>
        <AsyncSelect
          cacheOptions
          value={viewModel.filter.authorities}
          defaultOptions={defaultOptions}
          loadOptions={loadAuthorityOptions}
          placeholder={t("form.placeholder.typeToSelect", "Type to select")}
          isMulti={true}
          getOptionValue={item => item.id}
          getOptionLabel={item => item.name}
          styles={styledReactSelect}
          onChange={values => {
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
