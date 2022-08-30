import { useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { CaseDefinitionUpdateViewModel } from "./updateViewModel";
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

const CaseDefinitionUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new CaseDefinitionUpdateViewModel(
        router.query.id as string,
        services.caseDefinitionService
      )
  );
  const reportTypes = useReportTypes();

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

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
            placeholder={t("form.placeholder.reportType", "Report Type")}
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
          <ErrorText>{errors.report_type_id}</ErrorText>
        </Field>
      )}
    </Observer>
  );

  const descriptionField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="description">
              {t("form.label.description", "Description")}
            </Label>
            <TextInput
              id="description"
              type="text"
              placeholder={t("form.placeholder.description", "Description")}
              onChange={evt => (viewModel.description = evt.target.value)}
              disabled={isSubmitting}
              defaultValue={viewModel.description}
              required
            />
            <ErrorText>{errors.description}</ErrorText>
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

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form
        onSubmit={async evt => {
          evt.preventDefault();
          if (await viewModel.save()) {
            router.back();
          }
        }}
      >
        <FieldGroup>
          {reportTypeField}
          {descriptionField}
          {conditionField}
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={viewModel.isSubmitting}>
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

export default observer(CaseDefinitionUpdateForm);
