import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReporterNotificationUpdateViewModel } from "./updateViewModel";
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

const ReporterNotificationsUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReporterNotificationUpdateViewModel(
        router.query.id as string,
        services.reporterNotificationService,
        services.reportTypeService
      )
  );
  const reportTypes = useReportTypes();

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

  const descriptionField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="description">{t("form.label.name", "Name")}</Label>
            <TextArea
              id="description"
              rows={2}
              placeholder={t("form.placeholder.name", "Name")}
              onChange={evt => (viewModel.description = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.description}
              required
            />
            <ErrorText>{viewModel.fieldErrors.description}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
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
              rows={5}
              onChange={evt => (viewModel.condition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.condition}
              required
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

  const templateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="template">
              {t("form.label.bodyTemplate", "Body Template")}
            </Label>
            <DataTemplateField
              placeholder={t("form.placeholder.bodyTemplate", "Body Template")}
              value={viewModel.template}
              onChange={value => (viewModel.template = value)}
              variableList={viewModel.formViewModel.variableList}
            />
            <ErrorText>{viewModel.fieldErrors.template}</ErrorText>
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
          {descriptionField}
          {reportTypeField}
          {conditionField}
          {titleTemplateField}
          {templateField}
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
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

export default observer(ReporterNotificationsUpdateForm);
