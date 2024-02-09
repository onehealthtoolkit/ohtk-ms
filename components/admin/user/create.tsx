import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
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
  Select,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { UserCreateViewModel } from "./createViewModel";
import { useTranslation } from "react-i18next";
import { AccountsAuthorityUserRoleChoices } from "lib/generated/graphql";
import useStore from "lib/store";
import AuthroitySelect from "components/widgets/authoritySelect";

const UserCreate = () => {
  const router = useRouter();
  const store = useStore();
  const me = store.me;
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new UserCreateViewModel(services.userService)
  );
  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <Form>
      <FieldGroup>
        <>
          {me?.isSuperUser && (
            <Field $size="half">
              <Label htmlFor="authority">
                {t("form.label.authority", "Authority")}
              </Label>
              <AuthroitySelect
                onChange={value => (viewModel.authorityId = parseInt(value.id))}
              />
            </Field>
          )}
        </>

        <Field $size="half">
          <Label htmlFor="userName">
            {t("form.label.username", "User Name")}
          </Label>
          <TextInput
            id="userName"
            type="text"
            placeholder={t("form.placeholder.username", "User Name")}
            onChange={evt => (viewModel.username = evt.target.value)}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <ErrorText>{errors.telephone}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="address">{t("form.label.address", "Address")}</Label>
          <TextInput
            id="address"
            type="text"
            placeholder={t("form.placeholder.address", "Address")}
            onChange={evt => (viewModel.address = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.address}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="role">{t("form.label.role", "Role")}</Label>
          <Select
            id="role"
            onChange={evt => {
              viewModel.role = evt.target.value;
            }}
            placeholder={t("form.placeholder.role", "Role")}
            disabled={isSubmitting}
            defaultValue=""
            required
          >
            <option value={AccountsAuthorityUserRoleChoices.Rep}>
              Reporter
            </option>
            <option value={AccountsAuthorityUserRoleChoices.Ofc}>
              Officer
            </option>
            {(store.isRoleAdmin || store.isSuperUser) && (
              <option value={AccountsAuthorityUserRoleChoices.Adm}>
                Admin
              </option>
            )}
          </Select>
          <ErrorText>{errors.role}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(UserCreate);
