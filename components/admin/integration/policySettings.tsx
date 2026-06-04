import { useState } from "react";
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
  MaskingLoader,
  SaveButton,
  Select,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useServices from "lib/services/provider";
import { IntegrationPolicyViewModel } from "./policyViewModel";

const IntegrationPolicySettings = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new IntegrationPolicyViewModel(services.integrationService)
  );

  return (
    <Observer>
      {() => (
        <MaskingLoader loading={viewModel.isLoading}>
          <Form data-testid="integration-policy-form">
            <FieldGroup>
              <Field $size="half">
                <Checkbox
                  id="integrationEnabled"
                  data-testid="integration-policy-integration-enabled"
                  label="Enable external integrations"
                  value="true"
                  checked={viewModel.integrationEnabled}
                  disabled={viewModel.isSubmitting}
                  onChange={event =>
                    (viewModel.integrationEnabled = event.target.checked)
                  }
                />
              </Field>
              <Field $size="half">
                <Checkbox
                  id="aiEnabled"
                  data-testid="integration-policy-ai-enabled"
                  label="Enable AI for this tenant"
                  value="true"
                  checked={viewModel.aiEnabled}
                  disabled={viewModel.isSubmitting}
                  onChange={event =>
                    (viewModel.aiEnabled = event.target.checked)
                  }
                />
              </Field>
              <Field $size="half">
                <Checkbox
                  id="riskEvaluatorEnabled"
                  data-testid="integration-policy-risk-evaluator-enabled"
                  label="Enable risk evaluator"
                  value="true"
                  checked={viewModel.riskEvaluatorEnabled}
                  disabled={viewModel.isSubmitting}
                  onChange={event =>
                    (viewModel.riskEvaluatorEnabled = event.target.checked)
                  }
                />
              </Field>
              <Field $size="half">
                <Checkbox
                  id="clusterDetectorEnabled"
                  data-testid="integration-policy-cluster-detector-enabled"
                  label="Enable cluster detector"
                  value="true"
                  checked={viewModel.clusterDetectorEnabled}
                  disabled={viewModel.isSubmitting}
                  onChange={event =>
                    (viewModel.clusterDetectorEnabled = event.target.checked)
                  }
                />
              </Field>
              <Field $size="half">
                <Label htmlFor="aiDefaultCommentOwnerUserId">
                  AI Comment Owner
                </Label>
                <Select
                  id="aiDefaultCommentOwnerUserId"
                  data-testid="integration-policy-ai-default-comment-owner"
                  value={viewModel.aiDefaultCommentOwnerUserId}
                  onChange={event =>
                    (viewModel.aiDefaultCommentOwnerUserId = event.target.value)
                  }
                  disabled={viewModel.isSubmitting}
                >
                  <option value="">None</option>
                  {viewModel.adminUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.label}
                    </option>
                  ))}
                </Select>
                <ErrorText>
                  {viewModel.fieldErrors.aiDefaultCommentOwnerUserId}
                </ErrorText>
              </Field>
              <Field $size="half">
                <Label htmlFor="dashboardRiskWindowDays">
                  Dashboard Risk Window Days
                </Label>
                <TextInput
                  id="dashboardRiskWindowDays"
                  data-testid="integration-policy-dashboard-risk-window-days"
                  type="number"
                  value={viewModel.dashboardRiskWindowDaysText}
                  onChange={event =>
                    (viewModel.dashboardRiskWindowDaysText = event.target.value)
                  }
                  disabled={viewModel.isSubmitting}
                />
                <ErrorText>
                  {viewModel.fieldErrors.dashboardRiskWindowDays}
                </ErrorText>
              </Field>
            </FieldGroup>
            {viewModel.submitError.length > 0 && (
              <FormMessage>{viewModel.submitError}</FormMessage>
            )}
            {viewModel.savedMessage.length > 0 && (
              <div
                className="col-span-full mx-4 md:mx-8 p-4 rounded-md bg-green-50 border border-green-300 text-green-800"
                data-testid="integration-policy-saved-message"
              >
                {viewModel.savedMessage}
              </div>
            )}
            <FormAction>
              <SaveButton
                type="button"
                data-testid="integration-policy-save"
                disabled={viewModel.isSubmitting}
                onClick={() => viewModel.save()}
              >
                {viewModel.isSubmitting ? (
                  <Spinner />
                ) : (
                  t("form.button.save", "Save")
                )}
              </SaveButton>
              <CancelButton
                type="button"
                data-testid="integration-policy-cancel"
                onClick={() => router.back()}
              >
                {t("form.button.cancel", "Cancel")}
              </CancelButton>
            </FormAction>
          </Form>
        </MaskingLoader>
      )}
    </Observer>
  );
};

export default observer(IntegrationPolicySettings);
