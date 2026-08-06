import { Observer } from "mobx-react";
import ExcelFilter from "components/excel/filter";

/**
 * LAHIS site-specific FAO summarized table export.
 * Backend: GET /excels/lahis_summarized_table
 */
const LahisSummarizedTable: React.FC = () => {
  return (
    <Observer>
      {() => <ExcelFilter action="lahis_summarized_table" reportType={true} />}
    </Observer>
  );
};

export default LahisSummarizedTable;
