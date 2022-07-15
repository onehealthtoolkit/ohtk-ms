import { useEffect, useState } from "react";
import { ReportType } from "lib/services/reportType";
import useServices from "lib/services/provider";

export default function useReportTypes() {
  const services = useServices();
  const [reportTypes, setReportTypes] = useState<ReportType[]>();
  useEffect(() => {
    async function loadReportTypes() {
      const result = await services.reportTypeService.fetchReportTypes(
        100,
        0,
        ""
      );
      setReportTypes(result.items);
    }
    loadReportTypes();
  }, [services.reportTypeService]);

  return reportTypes;
}
