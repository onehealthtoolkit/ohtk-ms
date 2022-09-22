import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
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
import AuthroitySelect from "components/widgets/authoritySelect";
import useStore from "lib/store";

const UserUpdate = () => {
  const router = useRouter();
  const { me } = useStore();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new UserUpdateViewModel(router.query.id as string, services.userService)
  );

  const authorityField = (
    <Observer>
      {() => (
        <Field $size="half">
          <Label htmlFor="authority">
            {t("form.label.authority", "Authority")}
          </Label>
          <AuthroitySelect
            value={viewModel.authorityId}
            onChange={value => (viewModel.authorityId = parseInt(value.id))}
          />
        </Field>
      )}
    </Observer>
  );

  const usernameField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.username}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const firstNameField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.firstName}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const lastNameField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.lastName}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const emailField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.email}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const telephoneField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.telephone}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const roleField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.role}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form>
        <FieldGroup>
          <>{me?.isSuperUser && authorityField}</>
          {usernameField}
          {firstNameField}
          {lastNameField}
          {emailField}
          {telephoneField}
          {roleField}
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton
            type="button"
            disabled={viewModel.isSubmitting}
            onClick={onSubmit}
          >
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
