import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { DownloadButton, MaskingLoader } from "components/widgets/forms";
import ErrorDisplay from "components/widgets/errorDisplay";
import ViewActionButtons from "components/widgets/viewActionButtons";
import useServices from "lib/services/provider";
import { IntegrationClientViewModel } from "./clientViewModel";
import { optionLabel } from "./formUtils";

const Row = ({
  label,
  value,
  testId,
}: {
  label: string;
  value?: string;
  testId: string;
}) => (
  <tr
    className="border-b odd:bg-white even:bg-gray-50"
    data-testid={`integration-client-view-row-${testId}`}
  >
    <th className="w-1/4 px-6 py-4 font-medium text-gray-900">{label}</th>
    <td className="px-6 py-4 break-all">{value || ""}</td>
  </tr>
);

const IntegrationClientView = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new IntegrationClientViewModel(
        router.query.id as string,
        services.integrationService
      )
  );
  const data = viewModel.data;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div data-testid="integration-client-view">
        {viewModel.clientSecret && (
          <div
            className="mb-4 p-4 border border-green-300 bg-green-50 text-sm"
            data-testid="integration-client-rotated-secret-message"
          >
            <p className="font-bold mb-2">Client secret was rotated.</p>
            <p className="mb-2">Copy it now. It will not be shown again.</p>
            <code className="block break-all bg-white border p-2">
              {viewModel.clientSecret}
            </code>
          </div>
        )}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500">
            <tbody>
              <Row label="Code" value={data.code} testId="code" />
              <Row label="Name" value={data.name} testId="name" />
              <Row
                label="Type"
                value={optionLabel(
                  data.integrationType,
                  viewModel.options.integrationTypes
                )}
                testId="type"
              />
              <Row
                label="Status"
                value={optionLabel(data.status, viewModel.options.statuses)}
                testId="status"
              />
              <Row label="Client ID" value={data.clientId} testId="client-id" />
              <Row
                label="Scopes"
                value={data.scopeCodes?.join(", ")}
                testId="scopes"
              />
              <Row
                label="Allowed Callback Domains"
                value={data.allowedCallbackDomains?.join(", ")}
                testId="allowed-callback-domains"
              />
              <Row
                label="Rate Limit Policy"
                value={JSON.stringify(data.rateLimitPolicy || {}, null, 2)}
                testId="rate-limit-policy"
              />
            </tbody>
          </table>
        </div>
        <ErrorDisplay message={viewModel.errorMessage} />
        <div className="mt-6 flex">
          <DownloadButton
            type="button"
            data-testid="integration-client-rotate-secret"
            onClick={() => viewModel.rotateSecret()}
          >
            Rotate Secret
          </DownloadButton>
          <DownloadButton
            type="button"
            data-testid="integration-client-disable"
            onClick={() => viewModel.disable()}
          >
            Disable
          </DownloadButton>
        </div>
        <ViewActionButtons
          testIdPrefix="integration-client-view"
          editUrl={`/admin/integrations/clients/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(IntegrationClientView);
