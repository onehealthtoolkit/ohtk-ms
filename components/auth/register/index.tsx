/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { RegisterState, RegisterViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import CheckCode from "./checkCode";
import useServices from "lib/services/provider";
import RegisterUser from "./registerUser";
import { useRouter } from "next/router";
const { publicRuntimeConfig } = getConfig();

const tenantsApiEndpoint = publicRuntimeConfig.tenantsApiEndpoint;

const Register = () => {
  const store = useStore();
  const router = useRouter();
  const services = useServices();
  const [viewModel, setViewModel] = useState<RegisterViewModel | undefined>();
  const { t } = useTranslation();

  useEffect(() => {
    if (!store.initTokenPending) {
      setViewModel(
        new RegisterViewModel(
          store,
          services.authService,
          services.registerService,
          tenantsApiEndpoint
        )
      );
    }
  }, [store, services, store.initTokenPending]);

  if (viewModel === undefined) {
    return null;
  }

  return (
    <div className="flex items-center min-h-screen bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
        <div className="flex flex-col items-center md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2 p-8">
            <img
              className="object-cover h-full w-full"
              src="/logo_black.png"
              alt="img"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                {t("title.signup", "Sing Up")}
              </h1>
              {viewModel.state == RegisterState.invitation && (
                <CheckCode viewModel={viewModel} />
              )}
              {viewModel.state == RegisterState.detail && (
                <RegisterUser viewModel={viewModel} />
              )}
              <div className="mt-2 text-sm font-display font-semibold text-gray-700 text-center">
                <a
                  onClick={() => router.back()}
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800 ml-2"
                >
                  {t("form.button.cancel", "Cancel")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Register);
