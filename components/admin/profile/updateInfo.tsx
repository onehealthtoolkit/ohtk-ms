import { useState } from "react";
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
  MaskingLoader,
  SaveButton,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import useStore from "lib/store";
import { UserUpdateViewModel } from "../user/updateViewModel";

const ProfileInfoUpdate = () => {
  const { me } = useStore();
  const router = useRouter();
  const { t } = useTranslation();

  const services = useServices();

  const [viewModel] = useState(() => {
    return new UserUpdateViewModel(
      me ? me.id.toString() : "",
      services.userService
    );
  });

  const errors = viewModel.fieldErrors;
  if (!me) {
    return <Spinner />;
  }

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form
        onSubmit={async evt => {
          evt.preventDefault();
          if (await viewModel.save()) {
            me.firstName = viewModel.firstName;
            me.lastName = viewModel.lastName;
            router.back();
          }
        }}
      >
        <FieldGroup>
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

export default observer(ProfileInfoUpdate);
