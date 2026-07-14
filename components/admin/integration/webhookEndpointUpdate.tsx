import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import WebhookEndpointForm from "./webhookEndpointForm";
import { WebhookEndpointUpdateViewModel } from "./webhookEndpointFormViewModel";

const WebhookEndpointUpdate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new WebhookEndpointUpdateViewModel(
        router.query.id as string,
        services.integrationService
      )
  );

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <WebhookEndpointForm
        viewModel={viewModel}
        onSaved={() => router.back()}
      />
    </MaskingLoader>
  );
};

export default observer(WebhookEndpointUpdate);
