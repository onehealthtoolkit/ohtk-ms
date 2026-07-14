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
import { IntegrationClientFormViewModel } from "./clientFormViewModel";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const SecretMessage = ({ secret }: { secret: string }) => {
  if (!secret) return null;
  return (
    <div
      className="mb-4 p-4 border border-green-300 bg-green-50 text-sm"
      data-testid="integration-client-secret-message"
    >
      <p className="font-bold mb-2">Client secret was generated.</p>
      <p className="mb-2">
        Copy it now. It will not be shown again after leaving this screen.
      </p>
      <code
        className="block break-all bg-white border p-2"
        data-testid="integration-client-secret-value"
      >
        {secret}
      </code>
    </div>
  );
};

const IntegrationClientForm = ({
  viewModel,
  onSaved,
}: {
  viewModel: IntegrationClientFormViewModel;
  onSaved: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async () => {
    if (await viewModel.save()) {
      if (!viewModel.clientSecret) onSaved();
    }
  };

  return (
    <Observer>
      {() => (
        <Form data-testid="integration-client-form">
          <SecretMessage secret={viewModel.clientSecret} />
          <FieldGroup>
            <Field $size="half">
              <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
              <TextInput
                id="name"
                data-testid="integration-client-name"
                type="text"
                value={viewModel.name}
                onChange={event => (viewModel.name = event.target.value)}
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
              <TextInput
                id="code"
                data-testid="integration-client-code"
                type="text"
                value={viewModel.code}
                onChange={event => (viewModel.code = event.target.value)}
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="integrationType">Integration Type</Label>
              <Select
                id="integrationType"
                data-testid="integration-client-integration-type"
                value={viewModel.integrationType}
                onChange={event =>
                  (viewModel.integrationType = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              >
                {viewModel.options.integrationTypes.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field $size="half">
              <Label htmlFor="status">{t("form.label.status", "Status")}</Label>
              <Select
                id="status"
                data-testid="integration-client-status"
                value={viewModel.status}
                onChange={event => (viewModel.status = event.target.value)}
                disabled={viewModel.isSubmitting}
              >
                {viewModel.options.statuses.map(option => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field $size="half">
              <Label>Scopes</Label>
              <div className="grid md:grid-cols-2 gap-x-4">
                {viewModel.options.scopes.map(option => (
                  <Checkbox
                    key={option.code}
                    id={`scope-${option.code}`}
                    data-testid={`integration-client-scope-${option.code}`}
                    label={option.label}
                    value={option.code}
                    checked={viewModel.scopeCodes.includes(option.code)}
                    disabled={viewModel.isSubmitting}
                    onChange={event =>
                      viewModel.setScope(option.code, event.target.checked)
                    }
                  />
                ))}
              </div>
            </Field>
            <Field $size="half">
              <Label htmlFor="allowedCallbackDomains">
                Allowed Callback Domains
              </Label>
              <TextArea
                id="allowedCallbackDomains"
                data-testid="integration-client-allowed-callback-domains"
                rows={6}
                value={viewModel.allowedCallbackDomainsText}
                onChange={event =>
                  (viewModel.allowedCallbackDomainsText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>
                {viewModel.fieldErrors.allowedCallbackDomains}
              </ErrorText>
            </Field>
            <Field $size="half">
              <Label htmlFor="rateLimitPolicy">Rate Limit Policy</Label>
              <TextArea
                id="rateLimitPolicy"
                data-testid="integration-client-rate-limit-policy"
                rows={8}
                value={viewModel.rateLimitPolicyText}
                onChange={event =>
                  (viewModel.rateLimitPolicyText = event.target.value)
                }
                disabled={viewModel.isSubmitting}
              />
              <ErrorText>{viewModel.fieldErrors.rateLimitPolicy}</ErrorText>
            </Field>
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton
              type="button"
              data-testid="integration-client-save"
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
              data-testid="integration-client-cancel"
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

export default observer(IntegrationClientForm);
