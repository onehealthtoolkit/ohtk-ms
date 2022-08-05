import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { UserCreateViewModel } from "./createViewModel";

const UserCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new UserCreateViewModel(services.userService)
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
          <Label htmlFor="userName">User Name</Label>
          <TextInput
            id="userName"
            type="text"
            placeholder="User Name"
            onChange={evt => (viewModel.username = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.username}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="firstName">First Name</Label>
          <TextInput
            id="firstName"
            type="text"
            placeholder="First Name"
            onChange={evt => (viewModel.firstName = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.firstName}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="lastName">lastName</Label>
          <TextInput
            id="lastName"
            type="text"
            placeholder="Last Name"
            onChange={evt => (viewModel.lastName = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.lastName}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="email">Email</Label>
          <TextInput
            id="email"
            type="text"
            placeholder="Email"
            onChange={evt => (viewModel.email = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.email}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="telephone">Telephone</Label>
          <TextInput
            id="telephone"
            type="text"
            placeholder="Telephone"
            onChange={evt => (viewModel.telephone = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.telephone}</ErrorText>
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

export default observer(UserCreate);
