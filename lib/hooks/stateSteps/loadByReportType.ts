import { useEffect, useState } from "react";
import { StateStep } from "lib/services/stateStep";
import useServices from "lib/services/provider";

export default function useStateStepsByReportType(reportTypeId: string) {
  const services = useServices();
  const [stateSteps, setStateSteps] = useState<StateStep[]>();
  const [stateStepLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadStateSteps() {
      setLoading(true);
      const result =
        await services.stateStepService.fetchStateStepsByReportType(
          reportTypeId
        );
      setStateSteps(result);
      setLoading(false);
    }
    if (reportTypeId) loadStateSteps();
  }, [services.stateStepService, reportTypeId]);

  return {
    stateStepLoading,
    stateSteps,
  };
}
