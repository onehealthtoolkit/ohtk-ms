import { Observer, observer } from "mobx-react";
import {
  CancelButton,
  Checkbox,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  SaveButton,
  Select,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { WebhookEndpointFormViewModel } from "./webhookEndpointFormViewModel";

const WebhookEndpointForm = ({
  viewModel,
  onSaved,
}: {
  viewModel: WebhookEndpointFormViewModel;
  onSaved: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async () => {
    if (await viewModel.save()) onSaved();
  };

  return (
    <Observer>
      {() => (
        <Form data-testid="webhook-endpoint-form">
          <FieldGroup>
            <Field $size="half">
              <Label htmlFor="integrationClientId">Integration Client</Label>
              <Select
                id="integrationClientId"
                data-testid="webhook-endpoint-integration-client"
                value={viewModel.integrationClientId}
                onChange={event =>
                  (viewModel.integrationClientId = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              >
                {viewModel.clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.code} - {client.name}
                  </option>
                ))}
              </Select>
              <ErrorText>{viewModel.fieldErrors.integrationClientId}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
              <TextInput
                id="name"
                data-testid="webhook-endpoint-name"
                type="text"
                value={viewModel.name}
                onChange={event => (viewModel.name = event.target.value)}
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="url">URL</Label>
              <TextInput
                id="url"
                data-testid="webhook-endpoint-url"
                type="url"
                value={viewModel.url}
                onChange={event => (viewModel.url = event.target.value)}
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.url}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="status">{t("form.label.status", "Status")}</Label>
              <Select
                id="status"
                data-testid="webhook-endpoint-status"
                value={viewModel.status}
                onChange={event => (viewModel.status = event.target.value)}
                disabled={viewModel.isSubmitting}
              >
                {viewModel.options.webhookStatuses.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field $size="half">
              <Label>Event Types</Label>
              <div className="grid md:grid-cols-2 gap-x-4">
                {viewModel.options.eventTypes.map(option => (
                  <Checkbox
                    key={option.code}
                    id={`event-type-${option.code}`}
                    data-testid={`webhook-endpoint-event-type-${option.code}`}
                    label={option.label}
                    value={option.code}
                    checked={viewModel.eventTypes.includes(option.code)}
                    disabled={viewModel.isSubmitting}
                    onChange={event =>
                      viewModel.setEventType(option.code, event.target.checked)
                    }
                  />
                ))}
              </div>
              <ErrorText>{viewModel.fieldErrors.eventTypes}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="schemaVersion">Schema Version</Label>
              <TextInput
                id="schemaVersion"
                data-testid="webhook-endpoint-schema-version"
                type="text"
                value={viewModel.schemaVersion}
                onChange={event =>
                  (viewModel.schemaVersion = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.schemaVersion}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="activeSigningSecretRef">
                Active Signing Secret Ref
              </Label>
              <TextInput
                id="activeSigningSecretRef"
                data-testid="webhook-endpoint-active-signing-secret-ref"
                type="text"
                value={viewModel.activeSigningSecretRef}
                onChange={event =>
                  (viewModel.activeSigningSecretRef = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>
                {viewModel.fieldErrors.activeSigningSecretRef}
              </ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="activeSigningSecretVersion">
                Active Signing Secret Version
              </Label>
              <TextInput
                id="activeSigningSecretVersion"
                data-testid="webhook-endpoint-active-signing-secret-version"
                type="number"
                value={viewModel.activeSigningSecretVersionText}
                onChange={event =>
                  (viewModel.activeSigningSecretVersionText =
                    event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>
                {viewModel.fieldErrors.activeSigningSecretVersion}
              </ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="nextSigningSecretRef">
                Next Signing Secret Ref
              </Label>
              <TextInput
                id="nextSigningSecretRef"
                data-testid="webhook-endpoint-next-signing-secret-ref"
                type="text"
                value={viewModel.nextSigningSecretRef}
                onChange={event =>
                  (viewModel.nextSigningSecretRef = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
            </Field>
            <Field $size="half">
              <Label htmlFor="nextSigningSecretVersion">
                Next Signing Secret Version
              </Label>
              <TextInput
                id="nextSigningSecretVersion"
                data-testid="webhook-endpoint-next-signing-secret-version"
                type="number"
                value={viewModel.nextSigningSecretVersionText}
                onChange={event =>
                  (viewModel.nextSigningSecretVersionText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>
                {viewModel.fieldErrors.nextSigningSecretVersion}
              </ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="timeoutSeconds">Timeout Seconds</Label>
              <TextInput
                id="timeoutSeconds"
                data-testid="webhook-endpoint-timeout-seconds"
                type="number"
                value={viewModel.timeoutSecondsText}
                onChange={event =>
                  (viewModel.timeoutSecondsText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.timeoutSeconds}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="maxAttempts">Max Attempts</Label>
              <TextInput
                id="maxAttempts"
                data-testid="webhook-endpoint-max-attempts"
                type="number"
                value={viewModel.maxAttemptsText}
                onChange={event =>
                  (viewModel.maxAttemptsText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.maxAttempts}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="retryPolicy">Retry Policy</Label>
              <TextArea
                id="retryPolicy"
                data-testid="webhook-endpoint-retry-policy"
                rows={8}
                value={viewModel.retryPolicyText}
                onChange={event =>
                  (viewModel.retryPolicyText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.retryPolicy}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="customHeaders">Custom Headers</Label>
              <TextArea
                id="customHeaders"
                data-testid="webhook-endpoint-custom-headers"
                rows={8}
                value={viewModel.customHeadersText}
                onChange={event =>
                  (viewModel.customHeadersText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.customHeaders}</ErrorText>
            </Field>
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton
              type="button"
              data-testid="webhook-endpoint-save"
              disabled={viewModel.isSubmitting}
              onClick={onSubmit}
            >
              {viewModel.isSubmitting ? (
                <Spinner />
              ) : (
                t("form.button.save", "Save")
              )}
            </SaveButton>
            <CancelButton
              type="button"
              data-testid="webhook-endpoint-cancel"
              onClick={() => router.back()}
            >
              {t("form.button.cancel", "Cancel")}
            </CancelButton>
          </FormAction>
        </Form>
      )}
    </Observer>
  );
};

export default observer(WebhookEndpointForm);
