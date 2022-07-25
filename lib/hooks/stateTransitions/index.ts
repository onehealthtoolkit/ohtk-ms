import { useEffect, useState } from "react";
import useServices from "lib/services/provider";
import { StateTransition } from "lib/services/stateTransition";

export default function useStateTransitions(reportTypeId: string) {
  const services = useServices();
  const [stateTransitions, setStateTransitions] = useState<StateTransition[]>();
  const [transitionLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function loadTransitions() {
      setLoading(true);
      const result =
        await services.stateTransitionService.fetchStateTransitionByReportType(
          reportTypeId
        );
      setStateTransitions(result);
      setLoading(false);
    }
    if (reportTypeId) loadTransitions();
    else setStateTransitions([]);
  }, [services.stateTransitionService, reportTypeId]);

  return {
    transitionLoading,
    stateTransitions,
  };
}
