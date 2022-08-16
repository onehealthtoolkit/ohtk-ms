import { observer } from "mobx-react-lite";
import React, { CSSProperties, useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import useServices from "lib/services/provider";
import { ReportType } from "lib/services/reportType";
import { ReportCategory } from "lib/services/reportCategory";

interface GroupedOption {
  readonly label: string;
  readonly options:
    | readonly ReportCategory[]
    | readonly Pick<ReportType, "id" | "name">[];
}

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: 14,
  fontWeight: "bold",
};
const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data: GroupedOption) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

type ReportTypeSelectProps = {
  value?: Pick<ReportType, "id" | "name">[];
  onChange: (values: MultiValue<Pick<ReportType, "id" | "name">>) => void;
};

const ReportTypeSelect: React.FC<ReportTypeSelectProps> = ({
  value,
  onChange,
}) => {
  const services = useServices();
  const [groupedOptions, setGroupedOptions] = useState<GroupedOption[]>();

  useEffect(() => {
    async function loadReportTypes() {
      const categories = (
        await services.reportCategoryService.fetchReportCategories(30, 0, "")
      ).items;
      const reportTypes = await services.reportTypeService.fetchMyReportTypes();

      const groupedOptions: GroupedOption[] = categories.map(category => {
        return {
          label: category.name,
          options: reportTypes.filter(
            reportType => reportType.categoryId == parseInt(category.id)
          ),
        };
      });
      setGroupedOptions(groupedOptions);
    }
    loadReportTypes();
  }, [services.reportTypeService, services.reportCategoryService]);

  return (
    <Select<
      ReportCategory | Pick<ReportType, "id" | "name">,
      true,
      GroupedOption
    >
      value={value}
      menuPlacement="top"
      isMulti={true}
      options={groupedOptions}
      getOptionValue={item => item.id}
      getOptionLabel={item => item.name}
      formatGroupLabel={formatGroupLabel}
      styles={{
        option: styles => {
          return {
            ...styles,
            paddingLeft: "30px",
          };
        },
      }}
      onChange={values => {
        onChange(values);
      }}
    />
  );
};

export default observer(ReportTypeSelect);
