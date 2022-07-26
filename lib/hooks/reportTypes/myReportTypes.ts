import useServices from "lib/services/provider";
import { ReportType } from "lib/services/reportType";
import { useEffect, useState } from "react";

export default function useMyReportTypes() {
  const services = useServices();
  const [reportTypes, setReportTypes] = useState<ReportType[]>();
  useEffect(() => {
    async function loadReportTypes() {
      const result = await services.reportTypeService.fetchMyReportTypes();
      setReportTypes(result);
    }
    loadReportTypes();
  }, [services.reportTypeService]);
  return reportTypes;
}
