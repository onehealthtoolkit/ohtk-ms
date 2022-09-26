import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateDefinitionCreateViewModel } from "./createViewModel";
import {
  CancelButton,
  Checkbox,
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

const StateDefinitionCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new StateDefinitionCreateViewModel(services.stateDefinitionService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.push(`/admin/state_definitions/${viewModel.resultId}/update`);
    }
  }, [router, viewModel]);

  return (
    <Form>
      <FieldGroup>
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
          <Checkbox
            id="isDefault"
            value="True"
            onChange={evt => (viewModel.isDefault = evt.target.checked)}
            disabled={isSubmitting}
            label={t("form.label.default", "Default")}
          />
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

export default observer(StateDefinitionCreate);
