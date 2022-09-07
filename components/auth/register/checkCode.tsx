/* eslint-disable @next/next/no-img-element */
import React from "react";
import { observer } from "mobx-react";
import { RegisterViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import { ServerIcon } from "@heroicons/react/outline";
import LanguageSelect from "../languageSelect";

type CheckCodeProps = {
  viewModel: RegisterViewModel;
};

const CheckCode: React.FC<CheckCodeProps> = ({ viewModel }) => {
  const { t } = useTranslation();

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <form
      onSubmit={evt => {
        viewModel.checkInvitationCode();
        evt.preventDefault();
      }}
    >
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="invitationCode"
        >
          {t("form.label.invitationCode", "Invitation code")}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="invitationCode"
          type="text"
          placeholder="Invitation code"
          onChange={evt => (viewModel.invitationCode = evt.target.value)}
          disabled={isSubmitting}
        />
        {errors.invitationCode && (
          <p className="text-red-700 text-xs italic">{errors.invitationCode}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          {t("form.label.language", "Language")}
        </label>
        <LanguageSelect />
      </div>
      <div className="mb-4">
        <label className="block text-grey-darker text-sm font-bold mb-2">
          {t("form.label.server", "Server")}
        </label>
        <div className="flex">
          <label
            className="inline-flex items-center  text-grey-darker text-sm font-bold"
            htmlFor="server"
          >
            <ServerIcon className="h-5 w-5 text-gray-500" />
          </label>
          <select
            id="server"
            onChange={e => {
              viewModel.changeServer(e.target.value);
            }}
          >
            <option value="">---</option>
            {viewModel.serverOptions.map(option => (
              <option key={option.domain} value={option.domain}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {viewModel.submitError.length > 0 && (
        <div className="text-red-600">{viewModel.submitError}</div>
      )}

      <button className="block w-full px-4 py-2 mt-4 font-bold leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
        {t("form.button.next", " Next")}
      </button>
    </form>
  );
};

export default observer(CheckCode);
