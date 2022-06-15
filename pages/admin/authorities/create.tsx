import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AuthorityFormViewModel } from "components/admin/authority/formViewModel";
import Layout from "components/layout";
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

const Create = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AuthorityFormViewModel(services.authorityService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Layout>
      <div className="mb-4">&raquo; Authorities &raquo; create</div>
      <Form
        onSubmit={evt => {
          viewModel.save();
          evt.preventDefault();
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
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "บันทึก"}
          </SaveButton>
          <CancelButton onClick={() => router.back()}>Cancel</CancelButton>
        </FormAction>
      </Form>
    </Layout>
  );
};

export default observer(Create);
