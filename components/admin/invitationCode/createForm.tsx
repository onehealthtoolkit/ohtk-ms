import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AdminInvitationCodeFormViewModel } from "./formViewModel";
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
import useStore from "lib/store";

const InvitationCodeCreateForm = () => {
  const router = useRouter();
  const services = useServices();
  const { me } = useStore();
  const [viewModel] = useState(
    new AdminInvitationCodeFormViewModel(
      services.invitationCodeService,
      me!.authorityId
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
          <Label htmlFor="fromDate">From Date</Label>
          <TextInput
            id="fromDate"
            type="date"
            placeholder="From Date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={evt => (viewModel.fromDate = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{viewModel.fieldErrors.fromDate}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="throughDate">Through Date</Label>
          <TextInput
            id="throughDate"
            type="date"
            placeholder="Through Date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={evt => (viewModel.throughDate = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{viewModel.fieldErrors.fromDate}</ErrorText>
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

export default observer(InvitationCodeCreateForm);
