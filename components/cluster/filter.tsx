import DatePicker from "components/widgets/datepicker";
import { Field, Label, TextInput } from "components/widgets/forms";
import RiskBadge, { RISK_LEVEL_OPTIONS } from "components/risk/RiskBadge";
import { ClusterListViewModel } from "./listViewModel";
import { RiskFilterLevel } from "lib/services/report/report";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { useTranslation } from "react-i18next";
import "react-datepicker/dist/react-datepicker.css";

const ClusterFilter = ({ viewModel }: { viewModel: ClusterListViewModel }) => {
  const { t } = useTranslation();

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
      <Field $size="full">
        <Label htmlFor="clusterSearch">
          {t("form.label.search", "Search")}
        </Label>
        <TextInput
          id="clusterSearch"
          value={viewModel.filter.searchText || ""}
          placeholder={t(
            "form.placeholder.searchCluster",
            "Cluster id or explanation"
          )}
          onChange={evt =>
            runInAction(() => {
              viewModel.filter.searchText = evt.target.value;
            })
          }
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="fromDate">
          {t("form.label.fromDate", "From Date")}
        </Label>
        <DatePicker
          id="fromDate"
          selected={viewModel.fromDate}
          onChange={(date: Date | null) => {
            viewModel.fromDate = date || undefined;
            viewModel.filter.fromDate = date || undefined;
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
            viewModel.throughDate = date || undefined;
            viewModel.filter.throughDate = date || undefined;
          }}
        />
      </Field>
      <Field $size="full">
        <Label htmlFor="clusterRiskLevels">
          {t("form.label.risk", "Risk")}
        </Label>
        <div id="clusterRiskLevels" className="grid grid-cols-1 gap-2">
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
    </div>
  );
};

export default observer(ClusterFilter);
