import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { NotificationTemplateUpdateViewModel } from "./updateViewModel";
import {
  CancelButton,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  MaskingLoader,
  Radio,
  SaveButton,
  Select,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useStateTransitions from "lib/hooks/stateTransitions";
import { CasesNotificationTemplateTypeChoices } from "lib/generated/graphql";
import useReportTypes from "lib/hooks/reportTypes";
import { useTranslation } from "react-i18next";
import DataTemplateField from "../reportType/dataTemplateField";

const NotificationTemplateUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new NotificationTemplateUpdateViewModel(
        router.query.id as string,
        services.notificationTemplateService,
        services.reportTypeService
      )
  );

  const reportTypes = useReportTypes();
  const { transitionLoading, stateTransitions } = useStateTransitions(
    viewModel.reportTypeId
  );

  const nameField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
            <TextInput
              id="name"
              type="text"
              placeholder={t("form.placeholder.name", "Name")}
              onChange={evt => (viewModel.name = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.name}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const reportTypeField = (
    <Observer>
      {() => (
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
            disabled={viewModel.isSubmitting}
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
          <ErrorText>{viewModel.fieldErrors.reportTypeId}</ErrorText>
        </Field>
      )}
    </Observer>
  );

  const typeField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.type}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [viewModel]
  );

  const transistionField = (
    <Observer>
      {() => (
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
              disabled={viewModel.isSubmitting || transitionLoading}
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
          <ErrorText>{viewModel.fieldErrors.stateTransitionId}</ErrorText>
        </Field>
      )}
    </Observer>
  );

  const conditionField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="condition">
              {t("form.label.condition", "Condition")}
            </Label>
            <TextArea
              id="condition"
              placeholder={t("form.placeholder.condition", "Condition")}
              rows={2}
              onChange={evt => (viewModel.condition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.condition}
            />
            <ErrorText>{viewModel.fieldErrors.condition}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const titleTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="titleTemplate">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <TextInput
              id="titleTemplate"
              type="text"
              placeholder={t(
                "form.placeholder.titleTemplate",
                "Title Template"
              )}
              onChange={evt => (viewModel.titleTemplate = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.titleTemplate}
              required
            />
            <ErrorText>{viewModel.fieldErrors.titleTemplate}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const bodyField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="bodyTemplate">
              {t("form.label.bodyTemplate", "Body Template")}
            </Label>
            <DataTemplateField
              placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
              value={viewModel.bodyTemplate}
              onChange={value => (viewModel.bodyTemplate = value)}
              variableList={viewModel.formViewModel.variableList}
            />
            <ErrorText>{viewModel.fieldErrors.bodyTemplate}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form>
        <FieldGroup>
          <>
            {nameField}
            {reportTypeField}
            {typeField}
            {viewModel.type == CasesNotificationTemplateTypeChoices.Cas &&
              transistionField}
            {conditionField}
            {titleTemplateField}
            {bodyField}
          </>
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton
            type="button"
            disabled={viewModel.isSubmitting}
            onClick={onSubmit}
          >
            {viewModel.isSubmitting ? (
              <Spinner />
            ) : (
              t("form.button.save", "Save")
            )}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            {t("form.button.cancel", "Cancel")}
          </CancelButton>
        </FormAction>
      </Form>
    </MaskingLoader>
  );
};

export default observer(NotificationTemplateUpdate);
