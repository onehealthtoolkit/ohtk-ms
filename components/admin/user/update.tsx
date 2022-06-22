import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { UserUpdateViewModel } from "./updateViewModel";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";

const UserUpdate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new UserUpdateViewModel(router.query.id!.toString(), services.userService)
  );
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
            <Label htmlFor="username">User Name</Label>
            <TextInput
              id="username"
              type="text"
              placeholder="User Name"
              onChange={evt => (viewModel.username = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.username}
            />
            <ErrorText>{errors.firstName}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="firstName">First Name</Label>
            <TextInput
              id="firstName"
              type="text"
              placeholder="First Name"
              onChange={evt => (viewModel.firstName = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.firstName}
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
              disabled={viewModel.isSubmitting}
              value={viewModel.lastName}
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
              disabled={viewModel.isSubmitting}
              value={viewModel.email}
            />
            <ErrorText>{errors.userName}</ErrorText>
          </Field>
        </FieldGroup>
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

export default observer(UserUpdate);
