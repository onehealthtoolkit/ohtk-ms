import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { ForgotPasswordViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import useServices from "lib/services/provider";
import ServerSelect from "../serverSelect";
const { publicRuntimeConfig } = getConfig();

const tenantsApiEndpoint = publicRuntimeConfig.tenantsApiEndpoint;

type ForgotPasswordProps = {
  onBack: () => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const services = useServices();
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
  }, [services]);

  if (viewModel === undefined) {
    return null;
  }

  return (
    <form
      onSubmit={async evt => {
        viewModel.resetPasswordRequest();
        evt.preventDefault();
      }}
    >
      <div className="w-full">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
          {t("title.forgotPassword", "Forgot password")}
        </h1>
        <div
          className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
          role="alert"
        >
          <span className="font-medium">
            {t(
              "form.label.forgotPassword",
              'Enter the email address you used to create your account, and click "Reset Password"'
            )}
          </span>
        </div>
        <div className="mb-4">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="email"
          >
            {t("form.label.email", "Email")}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder={t("form.placeholder.email", "Email")}
            onChange={evt => (viewModel.email = evt.target.value)}
            disabled={viewModel.isSubmitting}
          />
          {viewModel.fieldErrors.email && (
            <p className="text-red-700 text-xs italic">
              {viewModel.fieldErrors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            {t("form.label.server", "Server")}
          </label>
          <ServerSelect
            onChange={value => {
              viewModel.changeServer(value);
            }}
            serverOptions={viewModel.serverOptions}
          />
        </div>
        {viewModel.submitError.length > 0 && (
          <div className="text-red-600">{viewModel.submitError}</div>
        )}
        {viewModel.resetPasswordRequestSuccess && (
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">
              {t(
                "message.resetPasswordRequestSuccess",
                "We received a request to reset your password."
              )}
            </span>
          </div>
        )}
        <button className="block w-full px-4 py-2 mt-4 font-bold leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
          {t("form.button.resetPassword", "Reset assword")}
        </button>
        <div className="mt-2 text-sm font-display font-semibold text-gray-700 text-center">
          <a
            onClick={() => onBack()}
            className="cursor-pointer text-indigo-600 hover:text-indigo-800 ml-2"
          >
            {t("form.button.cancel", "Cancel")}
          </a>
        </div>
      </div>
    </form>
  );
};

export default observer(ForgotPassword);
