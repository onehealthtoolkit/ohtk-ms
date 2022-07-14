import { useEffect, useState } from "react";
import { StateStep } from "lib/services/stateStep";
import useServices from "lib/services/provider";

export default function useStateSteps(stateDefinitionId: string) {
  const services = useServices();
  const [stateSteps, setStateSteps] = useState<StateStep[]>();
  useEffect(() => {
    async function loadStateSteps() {
      const result = await services.stateStepService.fetchStateSteps(
        stateDefinitionId
      );
      setStateSteps(result);
    }
    loadStateSteps();
  }, [services.stateStepService, stateDefinitionId]);

  return stateSteps;
}
