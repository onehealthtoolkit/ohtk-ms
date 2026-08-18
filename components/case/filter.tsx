import { observer } from "mobx-react";
import React from "react";
import { Checkbox, Field, Label, TextInput } from "components/widgets/forms";
import useServices from "lib/services/provider";
import AsyncSelect from "react-select/async";
import DateRangeField from "components/widgets/dateRangeField";
import "react-datepicker/dist/react-datepicker.css";
import { CaseListViewModel } from "./listViewModel";
import { Authority } from "lib/services/authority";
import { runInAction } from "mobx";
import ReportTypeSelect from "components/report/reportTypeSelect";
import { styledReactSelect } from "components/widgets/styledReactSelect";
import { useTranslation } from "react-i18next";
import {
  CASE_STATUS_FILTERS,
  CaseStatusFilterValue,
} from "lib/services/case/caseService";

export const defaultOptions: Authority[] = [];

const CaseFilter = ({ viewModel }: { viewModel: CaseListViewModel }) => {
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
          <DateRangeField
            idPrefix="reported"
            label={t("form.label.reportedDate", "Reported date")}
            from={viewModel.fromDate}
            to={viewModel.throughDate}
            onFrom={date => {
              if (date) viewModel.fromDate = date;
            }}
            onTo={date => {
              if (date) viewModel.throughDate = date;
            }}
          />
          <DateRangeField
            idPrefix="incident"
            label={t("form.label.incidentDate", "Incident date")}
            from={viewModel.incidentFromDate}
            to={viewModel.incidentThroughDate}
            onFrom={date => {
              if (date) viewModel.incidentFromDate = date;
            }}
            onTo={date => {
              if (date) viewModel.incidentThroughDate = date;
            }}
          />
        </>
      )}
      <Field $size="full">
        <Label htmlFor="caseSearch">{t("form.label.search", "Search")}</Label>
        <TextInput
          id="caseSearch"
          type="text"
          value={viewModel.filter.q || ""}
          onChange={evt =>
            runInAction(() => {
              viewModel.filter.q = evt.target.value;
            })
          }
          placeholder={t(
            "form.placeholder.reportSearch",
            "Species, disease, AI text"
          )}
        />
      </Field>
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
                "form.label.includeChildAuthority ",
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
        <Label htmlFor="caseStatuses">{t("form.label.status", "Status")}</Label>
        <div id="caseStatuses" className="grid grid-cols-1 gap-2">
          {CASE_STATUS_FILTERS.map(option => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-2 rounded border border-gray-100 px-2 py-1 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600"
                checked={
                  viewModel.filter.caseStatuses?.includes(option.value) || false
                }
                onChange={evt => {
                  runInAction(() => {
                    const current = viewModel.filter.caseStatuses || [];
                    const value = option.value as CaseStatusFilterValue;
                    viewModel.filter.caseStatuses = evt.target.checked
                      ? [...current, value]
                      : current.filter(item => item !== value);
                  });
                }}
              />
              <span className="text-sm">
                {t(`case.statusFilter.${option.value}`, option.label)}
              </span>
            </label>
          ))}
        </div>
      </Field>
    </div>
  );
};

export default observer(CaseFilter);
