import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { CaseDefinitionCreateViewModel } from "./createViewModel";
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
import { ReportType } from "lib/services/reportType";

const CaseDefinitionCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new CaseDefinitionCreateViewModel(services.caseDefinitionService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const [reportTypes, setReportTypes] = useState<ReportType[]>();

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
            defaultValue=""
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
          />
          <ErrorText>{viewModel.fieldErrors.condition}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "บันทึก"}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          Cancel
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(CaseDefinitionCreate);
