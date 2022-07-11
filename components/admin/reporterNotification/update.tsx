import { useState } from "react";
import { observer } from "mobx-react";
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
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";

const ReporterNotificationsUpdateForm = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReporterNotificationUpdateViewModel(
        router.query.id as string,
        services.reporterNotificationService
      )
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

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
          <Field $size="half">
            <Label htmlFor="name">Template</Label>
            <TextArea
              id="template"
              placeholder="Template"
              rows={5}
              onChange={evt => (viewModel.template = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.template}
            />
            <ErrorText>{viewModel.fieldErrors.template}</ErrorText>
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

export default observer(ReporterNotificationsUpdateForm);
