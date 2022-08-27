import React, { useState } from "react";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { SignInViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import { ServerIcon } from "@heroicons/react/outline";
import LanguageSelect from "../languageSelect";

const SignIn = () => {
  const store = useStore();
  const [viewModel] = useState(new SignInViewModel(store));

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const { t } = useTranslation();

  return (
    <form
      onSubmit={evt => {
        viewModel.signIn();
        evt.preventDefault();
      }}
    >
      <div className="flex items-center min-h-screen bg-gray-50">
        <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
          <div className="flex flex-col items-center md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2 p-8">
              <img
                className="object-cover h-full"
                src="/logo_black.png"
                alt="img"
              />
            </div>
            <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                  {t("title.login", "Login to Your Account")}
                </h1>

                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    {t("form.label.username", "Username")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={evt => (viewModel.username = evt.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-red-700 text-xs italic">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    {t("form.label.password", "Password")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="password"
                    type="password"
                    placeholder="*********"
                    onChange={evt => (viewModel.password = evt.target.value)}
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-red-700 text-xs italic">
                      {errors.password}
                    </p>
                  )}
                </div>
                {viewModel.submitError.length > 0 && (
                  <div className="text-red-600">{viewModel.submitError}</div>
                )}
                <hr className="my-2" />

                <div className="flex justify-between mb-4">
                  <LanguageSelect />
                  <div className="flex">
                    <label
                      className="inline-flex items-center  text-grey-darker text-sm font-bold"
                      htmlFor="server"
                    >
                      <ServerIcon className="h-5 w-5 text-gray-500" />
                    </label>
                    <select id="server">
                      <option value="default">Default</option>
                      <option value="Thailand">Thailand</option>
                      <option value="Laos">Laos</option>
                      <option value="Cambodia">Cambodia</option>
                    </select>
                  </div>
                </div>

                <button className="block w-full px-4 py-2 mt-4 font-bold leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                  {t("form.button.signin", " Sign In")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default observer(SignIn);
