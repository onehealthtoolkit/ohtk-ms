import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
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
  MaskingLoader,
  SaveButton,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import { UserUpdatePasswordViewModel } from "./updatePasswordViewModel";

const UserUpdatePassword = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();

  const [viewModel] = useState(
    () =>
      new UserUpdatePasswordViewModel(
        router.query.id as string,
        services.userService
      )
  );

  const passwordField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="password">
              {t("form.label.newPassword", "Password")}
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder={t("form.placeholder.newPassword", "New password")}
              onChange={evt => (viewModel.password = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.password}
              required
            />
            <ErrorText>{viewModel.fieldErrors.password}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const confirmPasswordField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="confirmPassword">
              {t("form.label.confirmPassword", "Confirm password")}
            </Label>
            <TextInput
              id="confirmPassword"
              type="password"
              placeholder={t(
                "form.placeholder.confirmPassword",
                "Confirm password"
              )}
              onChange={evt => (viewModel.confirmPassword = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.confirmPassword}
              required
            />
            <ErrorText>{viewModel.fieldErrors.confirmPassword}</ErrorText>
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
          <Field $size="half">
            <label className="block border-b border-gray-400 text-gray-600 font-bold my-6 py-2">
              {t("form.label.username", "User name")} {viewModel.username}
            </label>
          </Field>
          {passwordField}
          {confirmPasswordField}
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

export default observer(UserUpdatePassword);
