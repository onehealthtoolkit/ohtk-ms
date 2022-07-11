import { useState } from "react";
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
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";

const ReporterNotificationCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReporterNotificationCreateViewModel(
        services.reporterNotificationService
      )
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
        <Field $size="half">
          <Label htmlFor="name">Template</Label>
          <TextArea
            id="template"
            placeholder="Template"
            rows={5}
            onChange={evt => (viewModel.template = evt.target.value)}
            disabled={viewModel.isSubmitting}
          />
          <ErrorText>{viewModel.fieldErrors.template}</ErrorText>
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

export default observer(ReporterNotificationCreate);
