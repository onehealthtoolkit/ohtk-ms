import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReporterNotificationCreateViewModel } from "./createViewModel";
import {
  CancelButton,
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
import useServices from "lib/services/provider";
import useReportTypes from "lib/hooks/reportTypes";
import { useTranslation } from "react-i18next";
import DataTemplateField from "../reportType/dataTemplateField";

const ReporterNotificationCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReporterNotificationCreateViewModel(
        services.reporterNotificationService,
        services.reportTypeService
      )
  );
  const reportTypes = useReportTypes();

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <Form>
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="description">{t("form.label.name", "Name")}</Label>
          <TextInput
            id="description"
            type="text"
            placeholder={t("form.placeholder.name", "Name")}
            onChange={evt => (viewModel.description = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.description}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="reportType">
            {t("form.label.reportType", "Report Type")}
          </Label>
          <Select
            id="reportType"
            onChange={evt => {
              viewModel.reportTypeId = evt.target.value;
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
        <Field $size="half">
          <Label htmlFor="condition">
            {t("form.label.condition", "Condition")}
          </Label>
          <TextArea
            id="condition"
            placeholder={t("form.placeholder.condition", "Condition")}
            rows={5}
            onChange={evt => (viewModel.condition = evt.target.value)}
            disabled={viewModel.isSubmitting}
            required
          />
          <ErrorText>{viewModel.fieldErrors.condition}</ErrorText>
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
          <Label htmlFor="template">
            {t("form.label.bodyTemplate", "Body Template")}
          </Label>
          <DataTemplateField
            placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
            value={null}
            onChange={value => (viewModel.template = value)}
            variableList={viewModel.formViewModel.variableList}
          />
          <ErrorText>{viewModel.fieldErrors.template}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(ReporterNotificationCreate);
