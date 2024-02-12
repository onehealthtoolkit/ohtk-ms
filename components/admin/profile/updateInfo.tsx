import { useEffect, useCallback, useState } from "react";
import { observer } from "mobx-react";
import {
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
import AlertDialog from "components/widgets/dialogs/alertDialog";
import { ProfileUpdateInfoViewModel } from "./updateInfoViewModel";

const ProfileInfoUpdate = () => {
  const { me } = useStore();
  const { t } = useTranslation();

  const services = useServices();

  const [viewModel, setViewModel] = useState<ProfileUpdateInfoViewModel>();

  useEffect(() => {
    if (me)
      setViewModel(
        new ProfileUpdateInfoViewModel(
          me,
          services.profileService
        ).registerDialog("resultAlert")
      );
  }, [services.profileService, me]);

  const onSubmit = useCallback(async () => {
    if (viewModel) {
      if (await viewModel.save()) {
        viewModel.me.firstName = viewModel.firstName;
        viewModel.me.lastName = viewModel.lastName;
        viewModel.me.telephone = viewModel.telephone;
        viewModel.dialog("resultAlert")?.open(null);
      }
    }
  }, [viewModel]);

  if (!viewModel || !me) {
    return <Spinner />;
  }

  const errors = viewModel.fieldErrors;

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <Form className="-mt-12">
          <FieldGroup>
            <Field $size="half">
              <label className="block border-b border-gray-400 text-gray-600 font-bold my-6 py-2">
                {t("form.label.changeProfile", "Change Profile")}
              </label>
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
              <Label htmlFor="address">
                {t("form.label.address", "Address")}
              </Label>
              <TextInput
                id="address"
                type="text"
                placeholder={t("form.placeholder.address", "Address")}
                onChange={evt => (viewModel.address = evt.target.value)}
                disabled={viewModel.isSubmitting}
                value={viewModel.address}
              />
              <ErrorText>{errors.address}</ErrorText>
            </Field>
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction className="-mt-16">
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
          </FormAction>
        </Form>
        <AlertDialog
          store={viewModel.dialog("resultAlert")}
          title="Success"
          content="Profile updated"
        />
      </>
    </MaskingLoader>
  );
};

export default observer(ProfileInfoUpdate);
