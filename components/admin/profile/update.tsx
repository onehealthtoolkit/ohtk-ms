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
import getConfig from "next/config";
import { useState } from "react";

const { publicRuntimeConfig } = getConfig();

const ProfileUpdate = () => {
  const store = useStore();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ProfileUpdateViewModel(
      store.me?.avatarUrl || "",
      services.profileService
    ).registerDialog("resultAlert")
  );

  return (
    <Observer>
      {() => (
        <>
          <Form
            onSubmit={async evt => {
              evt.preventDefault();
              const success = await viewModel.changePassword();
              if (success) {
                viewModel.dialog("resultAlert")?.open(null);
              }
            }}
          >
            <FieldGroup>
              <Field $size="half" className="flex flex-col items-center">
                <div className="w-48 h-48 sm:w-36 sm:h-36">
                  {viewModel.imageUrl ? (
                    <img
                      src={`${publicRuntimeConfig.serverUrl}/${viewModel.imageUrl}`}
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
                  Change picture
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  placeholder="Image"
                  onChange={evt => {
                    if (evt.target.files?.length) {
                      viewModel.image = evt.target.files[0];
                      viewModel.uploadAvatar();
                    }
                  }}
                  disabled={viewModel.isSubmitting}
                  className="hidden"
                />
                <ErrorText>{viewModel.fieldErrors.image}</ErrorText>
                <p className="p-4 text-lg font-bold text-gray-600">
                  Name {store.me?.firstName} {store.me?.lastName}
                </p>
                <p className="p-4 text-lg font-bold text-gray-600">
                  Authority {store.me?.authorityName}
                </p>
              </Field>
              <Field $size="half" className="text-lg">
                <Label htmlFor="name">Username</Label>
                <span>{store.me?.username}</span>
              </Field>
              <Field $size="half">
                <label className="block border-b border-gray-400 text-gray-600 font-bold my-6 py-2">
                  Change password
                </label>
              </Field>
              <Field $size="half">
                <Label htmlFor="password">Password</Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="New password"
                  onChange={evt => (viewModel.password = evt.target.value)}
                  disabled={viewModel.isSubmitting}
                  value={viewModel.password}
                />
                <ErrorText>{viewModel.fieldErrors.password}</ErrorText>
              </Field>
              <Field $size="half">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
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
            <FormAction>
              <SaveButton type="submit" disabled={viewModel.isSubmitting}>
                {viewModel.isSubmitting ? <Spinner /> : "Save"}
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
