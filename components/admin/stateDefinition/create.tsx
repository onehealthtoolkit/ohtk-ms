import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateDefinitionCreateViewModel } from "./createViewModel";
import {
  CancelButton,
  Checkbox,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  SaveButton,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";

const StateDefinitionCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new StateDefinitionCreateViewModel(services.stateDefinitionService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.save()) {
          router.push(`/admin/state_definitions/${viewModel.resultId}/update`);
        }
      }}
    >
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Checkbox
            id="isDefault"
            value="True"
            onChange={evt => (viewModel.isDefault = evt.target.checked)}
            disabled={isSubmitting}
            label="Default"
          />
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

export default observer(StateDefinitionCreate);
