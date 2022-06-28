import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AuthorityCreateViewModel } from "./createViewModel";
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
import AuthorityInherits from "components/admin/authority/authorityInherits";

const AuthorityCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AuthorityCreateViewModel(services.authorityService)
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
          <Label htmlFor="code">Code</Label>
          <TextInput
            id="code"
            type="text"
            placeholder="Code"
            onChange={evt => (viewModel.code = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.code}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="inherits">Inherits</Label>
          <AuthorityInherits
            values={viewModel.authorityInherits.slice()}
            onAdd={authorityId => viewModel.addAuthorityInherits(authorityId)}
            onDelete={authorityId =>
              viewModel.removeAuthorityInherits(authorityId)
            }
          />
          <ErrorText>{viewModel.fieldErrors.inherits}</ErrorText>
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

export default observer(AuthorityCreate);
