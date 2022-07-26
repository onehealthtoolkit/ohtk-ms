import { useEffect, useState } from "react";
import useServices from "lib/services/provider";
import { StateDefinition } from "lib/services/stateDefinition";

export default function useStateDefinitions() {
  const services = useServices();
  const [stateDefinitions, setStateDefinitions] = useState<StateDefinition[]>();
  useEffect(() => {
    async function loadStateDefinitions() {
      const result =
        await services.stateDefinitionService.fetchStateDefinitions(100, 0, "");
      setStateDefinitions(result.items);
    }
    loadStateDefinitions();
  }, [services.stateDefinitionService]);

  return stateDefinitions;
}
