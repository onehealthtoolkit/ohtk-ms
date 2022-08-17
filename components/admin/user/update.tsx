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
  Select,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import { AccountsAuthorityUserRoleChoices } from "lib/generated/graphql";

const UserUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new UserUpdateViewModel(router.query.id as string, services.userService)
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
            <Label htmlFor="username">
              {t("form.label.username", "User Name")}
            </Label>
            <TextInput
              id="username"
              type="text"
              placeholder={t("form.placeholder.username", "User Name")}
              onChange={evt => (viewModel.username = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.username}
              required
            />
            <ErrorText>{errors.username}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="firstName">
              {t("form.label.firstName", "First Name")}
            </Label>
            <TextInput
              id="firstName"
              type="text"
              placeholder={t("form.placeholder.firstName", "First Name")}
              onChange={evt => (viewModel.firstName = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.firstName}
              required
            />
            <ErrorText>{errors.firstName}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="lastName">
              {t("form.label.lastName", "Last Name")}
            </Label>
            <TextInput
              id="lastName"
              type="text"
              placeholder={t("form.placeholder.lastName", "Last Name")}
              onChange={evt => (viewModel.lastName = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.lastName}
              required
            />
            <ErrorText>{errors.lastName}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="email">{t("form.label.email", "Email")}</Label>
            <TextInput
              id="email"
              type="text"
              placeholder={t("form.placeholder.email", "Email")}
              onChange={evt => (viewModel.email = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.email}
              required
            />
            <ErrorText>{errors.email}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="telephone">
              {t("form.label.telephone", "Telephone")}
            </Label>
            <TextInput
              id="telephone"
              type="text"
              placeholder={t("form.placeholder.telephone", "Telephone")}
              onChange={evt => (viewModel.telephone = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.telephone}
            />
            <ErrorText>{errors.telephone}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="role">{t("form.label.role", "Role")}</Label>
            <Select
              id="role"
              onChange={evt => {
                viewModel.role = evt.target.value;
              }}
              placeholder={t("form.placeholder.role", "Role")}
              disabled={viewModel.isSubmitting}
              value={viewModel.role}
              required
            >
              <option value={AccountsAuthorityUserRoleChoices.Rep}>
                Reporter
              </option>
              <option value={AccountsAuthorityUserRoleChoices.Ofc}>
                Officer
              </option>
              <option value={AccountsAuthorityUserRoleChoices.Adm}>
                Admin
              </option>
            </Select>
            <ErrorText>{errors.role}</ErrorText>
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

export default observer(UserUpdate);
