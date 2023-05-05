import { Observer } from "mobx-react";
import ExcelFilter from "components/excel/filter";

const ReporterPerformance: React.FC = () => {
  return (
    <Observer>{() => <ExcelFilter action="reporter_performance" />}</Observer>
  );
};

export default ReporterPerformance;
