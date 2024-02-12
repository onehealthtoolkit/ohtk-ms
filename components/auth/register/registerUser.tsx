/* eslint-disable @next/next/no-img-element */
import React from "react";
import { observer } from "mobx-react";
import { RegisterViewModel } from "./viewModel";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  ErrorText,
  Field,
  FormMessage,
  Label,
  TextInput,
} from "components/widgets/forms";

type RegisterUserProps = {
  viewModel: RegisterViewModel;
};

const RegisterUser: React.FC<RegisterUserProps> = ({ viewModel }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <form
      noValidate={true}
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.register()) {
          router.push("/");
        }
      }}
    >
      <h1 className="mb-2 text-xl font-bold text-left text-gray-700">
        {viewModel.authorityName}
      </h1>
      <Field $size="full">
        <Label htmlFor="userName">
          {t("form.label.username", "User Name")}
        </Label>
        <TextInput
          id="userName"
          type="text"
          placeholder={t("form.placeholder.username", "User Name")}
          onChange={evt => (viewModel.username = evt.target.value)}
          disabled={isSubmitting}
          required
        />
        <ErrorText>{errors.username}</ErrorText>
      </Field>
      <Field $size="full">
        <Label htmlFor="firstName">
          {t("form.label.firstName", "First Name")}
        </Label>
        <TextInput
          id="firstName"
          type="text"
          placeholder={t("form.placeholder.firstName", "First Name")}
          onChange={evt => (viewModel.firstName = evt.target.value)}
          disabled={isSubmitting}
          required
        />
        <ErrorText>{errors.firstName}</ErrorText>
      </Field>
      <Field $size="full">
        <Label htmlFor="lastName">
          {t("form.label.lastName", "Last Name")}
        </Label>
        <TextInput
          id="lastName"
          type="text"
          placeholder={t("form.placeholder.lastName", "Last Name")}
          onChange={evt => (viewModel.lastName = evt.target.value)}
          disabled={isSubmitting}
          required
        />
        <ErrorText>{errors.lastName}</ErrorText>
      </Field>
      <Field $size="full">
        <Label htmlFor="email">{t("form.label.email", "Email")}</Label>
        <TextInput
          id="email"
          type="text"
          placeholder={t("form.placeholder.email", "Email")}
          onChange={evt => (viewModel.email = evt.target.value)}
          disabled={isSubmitting}
          required
        />
        <ErrorText>{errors.email}</ErrorText>
      </Field>
      <Field $size="full">
        <Label htmlFor="telephone">
          {t("form.label.telephone", "Telephone")}
        </Label>
        <TextInput
          id="telephone"
          type="text"
          placeholder={t("form.placeholder.telephone", "Telephone")}
          onChange={evt => (viewModel.telephone = evt.target.value)}
          disabled={isSubmitting}
        />
        <ErrorText>{errors.telephone}</ErrorText>
      </Field>
      <Field $size="full">
        <Label htmlFor="address">{t("form.label.address", "Address")}</Label>
        <TextInput
          id="address"
          type="text"
          placeholder={t("form.placeholder.address", "Address")}
          onChange={evt => (viewModel.address = evt.target.value)}
          disabled={isSubmitting}
        />
        <ErrorText>{errors.address}</ErrorText>
      </Field>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <button className="block w-full px-4 py-2 mt-4 font-bold leading-5 text-center text-white transition-colors duration-150 bg-blue-500 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
        {t("form.button.signup", " Sign up")}
      </button>
    </form>
  );
};

export default observer(RegisterUser);
