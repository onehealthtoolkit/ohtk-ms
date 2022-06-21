import { useEffect, useState } from "react";
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
import { InvitationCode } from "lib/services/invitationCode";
import useServices from "lib/services/provider";

type FormValues = InvitationCode;

const InvitationCodeUpdateForm = ({
  data,
}: {
  data: FormValues | undefined;
}) => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AdminInvitationCodeFormViewModel(services.invitationCodeService)
  );

  useEffect(() => {
    if (data) {
      viewModel.code = data.code;
      if (data.fromDate)
        viewModel.fromDate = new Date(data.fromDate)
          .toISOString()
          .split("T")[0];
      if (data.throughDate)
        viewModel.throughDate = new Date(data.throughDate)
          .toISOString()
          .split("T")[0];
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
          <Label htmlFor="fromDate">From Date</Label>
          <TextInput
            id="fromDate"
            type="date"
            placeholder="From Date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={evt => (viewModel.fromDate = evt.target.value)}
            disabled={viewModel.isSubmitting}
            value={viewModel.fromDate}
          />
          <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="throughDate">Through Date</Label>
          <TextInput
            id="throughDate"
            type="date"
            placeholder="Through Date"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={evt => (viewModel.throughDate = evt.target.value)}
            disabled={viewModel.isSubmitting}
            value={viewModel.throughDate}
          />
          <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
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

export default observer(InvitationCodeUpdateForm);
