import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { NotificationTemplateCreateViewModel } from "./createViewModel";
import {
  CancelButton,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  Radio,
  SaveButton,
  Select,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useMyReportTypes from "lib/hooks/reportTypes/myReportTypes";
import useStateTransitions from "lib/hooks/stateTransitions";
import { CasesNotificationTemplateTypeChoices } from "lib/generated/graphql";
import { useTranslation } from "react-i18next";

const NotificationTemplateCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new NotificationTemplateCreateViewModel(
        services.notificationTemplateService
      )
  );

  const reportTypes = useMyReportTypes();
  const { transitionLoading, stateTransitions } = useStateTransitions(
    viewModel.reportTypeId
  );
  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.save()) {
          router.back();
        }
      }}
    >
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
          <TextInput
            id="name"
            type="text"
            placeholder={t("form.placeholder.name", "Name")}
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="reportType">
            {t("form.label.reportType", "Report Type")}
          </Label>
          <Select
            id="reportType"
            onChange={evt => {
              viewModel.reportTypeId = evt.target.value;
              viewModel.stateTransitionId = 0;
            }}
            disabled={isSubmitting}
            value={viewModel.reportTypeId}
            required
          >
            <option disabled value={""}>
              {t("form.label.selectItem", "Select item ...")}
            </option>
            {reportTypes?.map(item => (
              <option key={`option-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <ErrorText>{errors.reportTypeId}</ErrorText>
        </Field>
        <Field $size="half" className="flex space-x-8">
          <Radio
            id="type-1"
            label={"report"}
            name="type"
            checked={
              viewModel.type === CasesNotificationTemplateTypeChoices.Rep
            }
            value={CasesNotificationTemplateTypeChoices.Rep}
            disabled={false}
            onChange={evt => (viewModel.type = evt.target.value)}
          />
          <Radio
            id="type-2"
            name="type"
            label={"promote to case"}
            checked={
              viewModel.type === CasesNotificationTemplateTypeChoices.Ptc
            }
            value={CasesNotificationTemplateTypeChoices.Ptc}
            disabled={false}
            onChange={evt => (viewModel.type = evt.target.value)}
          />
          <Radio
            id="type-3"
            name="type"
            label={"case transistion"}
            checked={
              viewModel.type === CasesNotificationTemplateTypeChoices.Cas
            }
            value={CasesNotificationTemplateTypeChoices.Cas}
            disabled={false}
            onChange={evt => (viewModel.type = evt.target.value)}
          />
          <ErrorText>{errors.type}</ErrorText>
        </Field>
        <>
          {viewModel.type == CasesNotificationTemplateTypeChoices.Cas && (
            <Field $size="half">
              <Label htmlFor="transistion">
                {t("form.label.transistion", "Transistion")}
              </Label>
              <div className="relative">
                {transitionLoading && (
                  <div className="flex absolute inset-y-0 right-5 items-center pl-3 pointer-events-none">
                    <Spinner />
                  </div>
                )}
                <Select
                  id="transistion"
                  onChange={evt => {
                    viewModel.stateTransitionId = +evt.target.value;
                  }}
                  disabled={isSubmitting || transitionLoading}
                  value={viewModel.stateTransitionId}
                >
                  <option disabled value={0}>
                    {t("form.label.selectItem", "Select item ...")}
                  </option>
                  {stateTransitions?.map(item => (
                    <option key={`option-${item.id}`} value={item.id}>
                      {item.fromStep.name} to {item.toStep.name}
                    </option>
                  ))}
                </Select>
              </div>
              <ErrorText>{errors.stateTransitionId}</ErrorText>
            </Field>
          )}
        </>

        <Field $size="half">
          <Label htmlFor="condition">
            {t("form.label.condition", "Condition")}
          </Label>
          <TextArea
            id="condition"
            placeholder={t("form.placeholder.condition", "Condition")}
            rows={5}
            onChange={evt => (viewModel.condition = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.condition}</ErrorText>
        </Field>

        <Field $size="half">
          <Label htmlFor="titleTemplate">
            {t("form.label.titleTemplate", "Title Template")}
          </Label>
          <TextInput
            id="titleTemplate"
            type="text"
            placeholder={t("form.placeholder.titleTemplate", "Title Template")}
            onChange={evt => (viewModel.titleTemplate = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.titleTemplate}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="bodyTemplate">
            {t("form.label.bodyTemplate", "Body Template")}
          </Label>
          <TextArea
            id="bodyTemplate"
            placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
            rows={5}
            onChange={evt => (viewModel.bodyTemplate = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.bodyTemplate}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(NotificationTemplateCreate);
