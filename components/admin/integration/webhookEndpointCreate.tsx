import { useState } from "react";
import { useRouter } from "next/router";
import useServices from "lib/services/provider";
import WebhookEndpointForm from "./webhookEndpointForm";
import { WebhookEndpointCreateViewModel } from "./webhookEndpointFormViewModel";

const WebhookEndpointCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new WebhookEndpointCreateViewModel(services.integrationService)
  );

  return (
    <WebhookEndpointForm
      viewModel={viewModel}
      onSaved={() => router.push("/admin/integrations/webhook_endpoints")}
    />
  );
};

export default WebhookEndpointCreate;
