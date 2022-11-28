import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ConfigurationCreateViewModel } from "./createViewModel";
import {
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
import { useTranslation } from "react-i18next";

const ConfigurationCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ConfigurationCreateViewModel(
        services.configurationService,
        services.reportTypeService
      )
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form>
      <FieldGroup>
        <Field $size="half">
          <Label htmlFor="key">{t("form.label.key", "Key")}</Label>
          <TextInput
            id="key"
            type="text"
            placeholder={t("form.placeholder.key", "Key")}
            onChange={evt => (viewModel.key = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.key}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="value">{t("form.label.value", "Value")}</Label>
          <TextInput
            id="value"
            type="text"
            placeholder={t("form.placeholder.value", "Value")}
            onChange={evt => (viewModel.value = evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.value}</ErrorText>
        </Field>
      </FieldGroup>

      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="button" disabled={isSubmitting} onClick={onSubmit}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(ConfigurationCreate);
