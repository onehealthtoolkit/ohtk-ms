/* eslint-disable @next/next/no-img-element */
import { PhotographIcon } from "@heroicons/react/solid";
import { ProfileUpdateViewModel } from "components/admin/profile/updateViewModel";
import AlertDialog from "components/widgets/dialogs/alertDialog";
import {
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
import { Observer } from "mobx-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfileInfoUpdate from "components/admin/profile/updateInfo";
import LanguageSelect from "components/auth/languageSelect";

const ProfileUpdate = () => {
  const { t } = useTranslation();
  const store = useStore();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ProfileUpdateViewModel(
      store.me?.avatarUrl || "",
      services.profileService
    ).registerDialog("resultAlert")
  );

  const onSubmit = useCallback(async () => {
    const success = await viewModel.changePassword();
    if (success) {
      viewModel.dialog("resultAlert")?.open(null);
    }
  }, [viewModel]);

  return (
    <Observer>
      {() => (
        <>
          <FieldGroup>
            <Field $size="half" className="flex flex-col items-center">
              <div className="w-48 h-48 sm:w-36 sm:h-36">
                {viewModel.imageUrl ? (
                  <img
                    src={viewModel.imageUrl}
                    alt={`${store.me?.username}'s avatar`}
                    className="shadow-md rounded-full w-full h-full align-middle border-2"
                  />
                ) : (
                  <div className="rounded-full max-w-full h-auto align-middle border-2 flex justify-center items-center bg-gray-200 p-4">
                    <PhotographIcon
                      fill="currentColor"
                      className="w-24 h-24 my-2"
                    />
                  </div>
                )}
              </div>
              <label
                htmlFor="image"
                className="border text-sm p-2 mt-2 rounded bg-blue-100 hover:border-blue-400 cursor-pointer"
              >
                {t("form.label.changePicture", "Change picture")}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Image"
                onChange={async evt => {
                  if (evt.target.files?.length) {
                    viewModel.image = evt.target.files[0];
                    if (await viewModel.uploadAvatar())
                      store.me!.avatarUrl = viewModel.imageUrl;
                  }
                }}
                disabled={viewModel.isSubmitting}
                className="hidden"
              />
              <ErrorText>{viewModel.fieldErrors.image}</ErrorText>
            </Field>
            <p className="pt-4 pb-4 text-lg font-bold text-gray-600">
              {t("form.label.authority", "Authority")} {store.me?.authorityName}
            </p>
            <p className="pb-4 text-lg font-bold text-gray-600">
              {t("form.label.username", "Usernamee")} {store.me?.username}
            </p>
            <LanguageSelect />
          </FieldGroup>
          <ProfileInfoUpdate />
          <Form>
            <FieldGroup>
              <Field $size="half">
                <label className="block border-b border-gray-400 text-gray-600 font-bold my-6 py-2">
                  {t("form.label.changePassword", "Change password")}
                </label>
              </Field>
              <Field $size="half">
                <Label htmlFor="password">
                  {t("form.label.newPassword", "Password")}
                </Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder={t(
                    "form.placeholder.newPassword",
                    "New password"
                  )}
                  onChange={evt => (viewModel.password = evt.target.value)}
                  disabled={viewModel.isSubmitting}
                  value={viewModel.password}
                />
                <ErrorText>{viewModel.fieldErrors.password}</ErrorText>
              </Field>
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
                  onChange={evt =>
                    (viewModel.confirmPassword = evt.target.value)
                  }
                  disabled={viewModel.isSubmitting}
                  value={viewModel.confirmPassword}
                />
                <ErrorText>{viewModel.fieldErrors.confirmPassword}</ErrorText>
              </Field>
            </FieldGroup>
            {viewModel.submitError.length > 0 && (
              <FormMessage>{viewModel.submitError}</FormMessage>
            )}
            <FormAction className="-mt-24">
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
            content="Password updated"
          />
        </>
      )}
    </Observer>
  );
};

export default ProfileUpdate;
