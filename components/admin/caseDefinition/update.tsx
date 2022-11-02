import { useCallback, useMemo, useState } from "react";
import { observer, Observer } from "mobx-react";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import useReportTypes from "lib/hooks/reportTypes";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { toJS } from "mobx";

export const ConditionField = dynamic(
  () => import("./conditionTemplateEditor"),
  {
    loading: () => <p>A condition field is loading</p>,
    ssr: false,
  }
);

const CaseDefinitionUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new CaseDefinitionUpdateViewModel(
        router.query.id as string,
        services.caseDefinitionService,
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
            placeholder={t("form.placeholder.reportType", "Report Type")}
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
          <ErrorText>{viewModel.fieldErrors.report_type_id}</ErrorText>
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
            <ConditionField
              value={viewModel.condition}
              onChange={value => (viewModel.condition = value)}
              placeholder={t("form.placeholder.condition", "Condition")}
              variableList={toJS(viewModel.conditionVariables)}
            />
            <ErrorText>{viewModel.fieldErrors.condition}</ErrorText>
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

export default observer(CaseDefinitionUpdateForm);
