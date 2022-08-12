import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { InvitationCodeUpdateViewModel } from "./updateViewModel";
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
import RoleSelect from "./roleSelect";
import { useTranslation } from "react-i18next";

const InvitationCodeUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new InvitationCodeUpdateViewModel(
        router.query.id as string,
        services.invitationCodeService
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
            <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
            <TextInput
              id="code"
              type="text"
              placeholder={t("form.placeholder.code", "Code")}
              onChange={evt => (viewModel.code = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.code}
              required
            />
            <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="fromDate">
              {t("form.label.fromDate", "Form Date")}
            </Label>
            <TextInput
              id="fromDate"
              type="date"
              placeholder={t("form.placeholder.fromDate", "From Date")}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={evt => (viewModel.fromDate = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.fromDate}
              required
            />
            <ErrorText>{viewModel.fieldErrors.fromDate}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="throughDate">
              {t("form.label.throughDate", "Through Date")}
            </Label>
            <TextInput
              id="throughDate"
              type="date"
              placeholder={t("form.placeholder.throughDate", "Through Date")}
              pattern="\d{4}-\d{2}-\d{2}"
              onChange={evt => (viewModel.throughDate = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.throughDate}
              required
            />
            <ErrorText>{viewModel.fieldErrors.throughDate}</ErrorText>
          </Field>

          <Field $size="half">
            <label htmlFor="role">{t("form.label.role", "Role")}</label>
            <RoleSelect viewModel={viewModel} />
            <ErrorText>{viewModel.fieldErrors.role}</ErrorText>
          </Field>
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={viewModel.isSubmitting}>
            {viewModel.isSubmitting ? (
              <Spinner />
            ) : (
              t("form.button.save", "Save")
            )}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            {t("form.button.cancel", "Cancel")}
          </CancelButton>
        </FormAction>
      </Form>
    </MaskingLoader>
  );
};

export default observer(InvitationCodeUpdate);
