import { Observer } from "mobx-react";
import ExcelFilter from "components/excel/filter";

const InactiveReporter: React.FC = () => {
  return (
    <Observer>{() => <ExcelFilter action="inactive_reporter" />}</Observer>
  );
};

export default InactiveReporter;
