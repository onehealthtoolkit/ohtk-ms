import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { DownloadButton, MaskingLoader } from "components/widgets/forms";
import ErrorDisplay from "components/widgets/errorDisplay";
import ViewActionButtons from "components/widgets/viewActionButtons";
import useServices from "lib/services/provider";
import { WebhookEndpointViewModel } from "./webhookEndpointViewModel";
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
    data-testid={`webhook-endpoint-view-row-${testId}`}
  >
    <th className="w-1/4 px-6 py-4 font-medium text-gray-900">{label}</th>
    <td className="px-6 py-4 break-all">{value || ""}</td>
  </tr>
);

const WebhookEndpointView = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new WebhookEndpointViewModel(
        router.query.id as string,
        services.integrationService
      )
  );
  const data = viewModel.data;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <div data-testid="webhook-endpoint-view">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-fixed w-full text-sm text-left text-gray-500">
            <tbody>
              <Row label="Name" value={data.name} testId="name" />
              <Row
                label="Integration Client"
                value={
                  data.integrationClient
                    ? `${data.integrationClient.code} - ${data.integrationClient.name}`
                    : ""
                }
                testId="integration-client"
              />
              <Row label="URL" value={data.url} testId="url" />
              <Row
                label="Status"
                value={optionLabel(
                  data.status,
                  viewModel.options.webhookStatuses
                )}
                testId="status"
              />
              <Row
                label="Event Types"
                value={data.eventTypes?.join(", ")}
                testId="event-types"
              />
              <Row
                label="Schema Version"
                value={data.schemaVersion}
                testId="schema-version"
              />
              <Row
                label="Active Signing Secret Ref"
                value={data.activeSigningSecretRef}
                testId="active-signing-secret-ref"
              />
              <Row
                label="Active Signing Secret Version"
                value={String(data.activeSigningSecretVersion || "")}
                testId="active-signing-secret-version"
              />
              <Row
                label="Next Signing Secret Ref"
                value={data.nextSigningSecretRef || ""}
                testId="next-signing-secret-ref"
              />
              <Row
                label="Next Signing Secret Version"
                value={data.nextSigningSecretVersion?.toString()}
                testId="next-signing-secret-version"
              />
              <Row
                label="Timeout Seconds"
                value={String(data.timeoutSeconds || "")}
                testId="timeout-seconds"
              />
              <Row
                label="Max Attempts"
                value={String(data.maxAttempts || "")}
                testId="max-attempts"
              />
              <Row
                label="Retry Policy"
                value={JSON.stringify(data.retryPolicy || {}, null, 2)}
                testId="retry-policy"
              />
              <Row
                label="Custom Headers"
                value={JSON.stringify(data.customHeaders || {}, null, 2)}
                testId="custom-headers"
              />
            </tbody>
          </table>
        </div>
        <ErrorDisplay message={viewModel.errorMessage} />
        <div className="mt-6 flex">
          <DownloadButton
            type="button"
            data-testid="webhook-endpoint-disable"
            onClick={() => viewModel.disable()}
          >
            Disable
          </DownloadButton>
        </div>
        <ViewActionButtons
          testIdPrefix="webhook-endpoint-view"
          editUrl={`/admin/integrations/webhook_endpoints/${viewModel.data.id}/update`}
        />
      </div>
    </MaskingLoader>
  );
};

export default observer(WebhookEndpointView);
