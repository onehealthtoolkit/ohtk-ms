import { useEffect, useState } from "react";
import { observer } from "mobx-react";
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
import { ReportType } from "lib/services/reportType";

const CaseDefinitionUpdateForm = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new CaseDefinitionUpdateViewModel(
        router.query.id as string,
        services.caseDefinitionService
      )
  );
  const [reportTypes, setReportTypes] = useState<ReportType[]>();

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  useEffect(() => {
    async function loadReportTypes() {
      const result = await services.reportTypeService.fetchReportTypes(
        100,
        0,
        ""
      );
      setReportTypes(result.items);
    }
    loadReportTypes();
  }, [services.reportTypeService]);

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
          <Field $size="half">
            <Label htmlFor="reportType">Report Type</Label>
            <Select
              id="reportType"
              onChange={evt => {
                viewModel.reportTypeId = evt.target.value;
              }}
              disabled={isSubmitting}
              defaultValue={viewModel.reportTypeId}
            >
              <option disabled value={""}>
                Select item ...
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
            <Label htmlFor="name">Description</Label>
            <TextInput
              id="description"
              type="text"
              placeholder="Description"
              onChange={evt => (viewModel.description = evt.target.value)}
              disabled={isSubmitting}
              defaultValue={viewModel.description}
            />
            <ErrorText>{errors.description}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="name">Condition</Label>
            <TextArea
              id="condition"
              placeholder="Condition"
              rows={5}
              onChange={evt => (viewModel.condition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.condition}
            />
            <ErrorText>{viewModel.fieldErrors.condition}</ErrorText>
          </Field>
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={viewModel.isSubmitting}>
            {viewModel.isSubmitting ? <Spinner /> : "Save"}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            Cancel
          </CancelButton>
        </FormAction>
      </Form>
    </MaskingLoader>
  );
};

export default observer(CaseDefinitionUpdateForm);
