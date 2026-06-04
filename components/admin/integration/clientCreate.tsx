import { useState } from "react";
import { useRouter } from "next/router";
import useServices from "lib/services/provider";
import IntegrationClientForm from "./clientForm";
import { IntegrationClientCreateViewModel } from "./clientFormViewModel";

const IntegrationClientCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new IntegrationClientCreateViewModel(services.integrationService)
  );

  return (
    <IntegrationClientForm
      viewModel={viewModel}
      onSaved={() => router.push("/admin/integrations/clients")}
    />
  );
};

export default IntegrationClientCreate;
