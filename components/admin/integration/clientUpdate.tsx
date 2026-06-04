import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MaskingLoader } from "components/widgets/forms";
import useServices from "lib/services/provider";
import IntegrationClientForm from "./clientForm";
import { IntegrationClientUpdateViewModel } from "./clientFormViewModel";

const IntegrationClientUpdate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new IntegrationClientUpdateViewModel(
        router.query.id as string,
        services.integrationService
      )
  );

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <IntegrationClientForm
        viewModel={viewModel}
        onSaved={() => router.back()}
      />
    </MaskingLoader>
  );
};

export default observer(IntegrationClientUpdate);
