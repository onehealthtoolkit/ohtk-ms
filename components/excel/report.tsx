import { Observer } from "mobx-react";
import ExcelFilter from "components/excel/filter";

const Report: React.FC = () => {
  return (
    <Observer>
      {() => <ExcelFilter action="incident_report" reportType={true} />}
    </Observer>
  );
};

export default Report;
