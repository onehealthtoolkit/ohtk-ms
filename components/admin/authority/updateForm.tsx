import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AdminAuthorityFormViewModel } from "./formViewModel";
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
import { Authority } from "lib/services/authority";
import useServices from "lib/services/provider";

type FormValues = Authority;

const AuthorityUpdateForm = ({ data }: { data: FormValues | undefined }) => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AdminAuthorityFormViewModel(services.authorityService)
  );

  useEffect(() => {
    if (data) {
      viewModel.code = data.code;
      viewModel.name = data.name;
    }
  }, [data, viewModel]);

  return (
    <Form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.save(data?.id)) {
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
            disabled={viewModel.isSubmitting}
            value={viewModel.code}
          />
          <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={viewModel.isSubmitting}
            value={viewModel.name}
          />
          <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
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
  );
};

export default observer(AuthorityUpdateForm);
