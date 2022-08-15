import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AuthorityCreateViewModel } from "./createViewModel";
import {
  AreaFieldNoSSR,
  CancelButton,
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
import AuthorityInherits from "components/admin/authority/authorityInherits";
import { toJS } from "mobx";
import { useTranslation } from "react-i18next";

const AuthorityCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new AuthorityCreateViewModel(services.authorityService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.save()) {
          router.back();
        }
      }}
    >
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
          <TextInput
            id="code"
            type="text"
            placeholder={t("form.placeholder.code", "Code")}
            onChange={evt => (viewModel.code = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.code}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
          <TextInput
            id="name"
            type="text"
            placeholder={t("form.placeholder.name", "Name")}
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="inherits">
            {t("form.label.inherits", "Inherits")}
          </Label>
          <AuthorityInherits
            values={viewModel.authorityInherits.slice()}
            onAdd={authorityId => viewModel.addAuthorityInherits(authorityId)}
            onDelete={authorityId =>
              viewModel.removeAuthorityInherits(authorityId)
            }
          />
          <ErrorText>{viewModel.fieldErrors.inherits}</ErrorText>
        </Field>
        <Field $size="full">
          <Label htmlFor="area">Area</Label>
          <AreaFieldNoSSR
            value={toJS(viewModel.area)}
            onChange={data => (viewModel.area = data)}
          />
          <ErrorText>{viewModel.fieldErrors.area}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(AuthorityCreate);
