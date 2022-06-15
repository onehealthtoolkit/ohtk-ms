import { useEffect, useState } from "react";
import { Observer } from "mobx-react";
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
  MaskingLoader,
  SaveButton,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { Authority } from "lib/services/authority";
import useServices from "lib/services/provider";

type FormValues = Authority;

const Update = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      return services.authorityService.getAuthority(id);
    }

    if (router.query.id) {
      loadData(router.query.id as string).then(result => {
        setFormValues(result.data);
      });
    }
  }, [router.query, services.authorityService]);

  return (
    <Layout>
      <div className="mb-4">&raquo; Authorities &raquo; update</div>
      <MaskingLoader loading={!formValues}>
        <AuthorityForm data={formValues} />
      </MaskingLoader>
    </Layout>
  );
};

const AuthorityForm = ({ data }: { data: FormValues | undefined }) => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AuthorityFormViewModel(services.authorityService)
  );

  useEffect(() => {
    if (data) {
      viewModel.code = data.code;
      viewModel.name = data.name;
    }
  }, [data, viewModel]);

  return (
    <Observer>
      {() => (
        <Form
          onSubmit={evt => {
            viewModel.save(data?.id);
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
            <CancelButton onClick={() => router.back()}>Cancel</CancelButton>
          </FormAction>
        </Form>
      )}
    </Observer>
  );
};

export default Update;
