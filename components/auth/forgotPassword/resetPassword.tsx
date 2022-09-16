/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ForgotPasswordViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import useServices from "lib/services/provider";
import {
  ErrorText,
  Field,
  FieldGroup,
  Label,
  TextInput,
} from "components/widgets/forms";
import { useRouter } from "next/router";
import { setBackendSubDomain } from "lib/client";
const { publicRuntimeConfig } = getConfig();

const tenantsApiEndpoint = publicRuntimeConfig.tenantsApiEndpoint;

type ResetPasswordProps = {
  token: string;
  domain?: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ token, domain }) => {
  const services = useServices();
  const router = useRouter();
  const [viewModel, setViewModel] = useState<
    ForgotPasswordViewModel | undefined
  >();
  const { t } = useTranslation();

  useEffect(() => {
    setViewModel(
      new ForgotPasswordViewModel(
        services.forgotPasswordService,
        tenantsApiEndpoint
      )
    );
    if (domain) setBackendSubDomain(domain);
  }, [services, domain]);

  if (viewModel === undefined) {
    return null;
  }

  return (
    <form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.resetPassword(token)) {
          router.push("/");
        }
      }}
    >
      <div className="flex items-center min-h-screen bg-gray-50">
        <div className="flex-1 h-full w-full max-w-md mx-auto bg-white rounded-xl shadow-xl">
          <div className="flex flex-col items-center md:flex-row">
            <div className="w-full p-6">
              <div className="h-32 md:h-auto md:w-1/2 p-8">
                <img
                  className="h-full w-full"
                  src="/logo_black.png"
                  alt="img"
                />
              </div>
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                {t("title.changePassword", "Change password")}
              </h1>
              <FieldGroup>
                <Field $size="full">
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
                <Field $size="full">
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
                <div className="text-red-600">{viewModel.submitError}</div>
              )}
              <button className="block w-full px-4 py-2 mt-4 font-bold leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                {t("form.button.changePassword", "Change password")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default observer(ResetPassword);
