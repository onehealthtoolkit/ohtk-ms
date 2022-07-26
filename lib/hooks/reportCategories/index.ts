import { useEffect, useState } from "react";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";

export default function useReportCategories() {
  const services = useServices();
  const [categories, setCategories] = useState<ReportCategory[]>();
  useEffect(() => {
    async function loadData() {
      const result = await services.reportCategoryService.fetchReportCategories(
        30,
        0,
        ""
      );
      setCategories(result.items);
    }
    loadData();
  }, [services.reportCategoryService]);
  return categories;
}
