import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import {
  AreaFieldNoSSR,
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
import { AuthorityUpdateViewModel } from "./updateViewModel";
import AuthorityInherits from "components/admin/authority/authorityInherits";
import { toJS } from "mobx";

const AuthorityUpdate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new AuthorityUpdateViewModel(
        router.query.id as string,
        services.authorityService
      )
  );

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
            <Label htmlFor="code">Code</Label>
            <TextInput
              id="code"
              type="text"
              placeholder="Code"
              onChange={evt => (viewModel.code = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.code}
              required
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
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
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
          <Field $size="full">
            <Label htmlFor="area">Area</Label>
            <AreaFieldNoSSR
              value={toJS(viewModel.area)}
              onChange={data => (viewModel.area = data)}
            />
            <ErrorText>{viewModel.fieldErrors.area}</ErrorText>
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

export default observer(AuthorityUpdate);
