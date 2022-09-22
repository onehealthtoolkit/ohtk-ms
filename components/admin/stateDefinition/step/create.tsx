import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateStepCreateViewModel } from "./createViewModel";
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
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const StateStepCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new StateStepCreateViewModel(
        router.query.id as string,
        services.stateStepService
      )
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <>
      <Breadcrumb
        crumbs={[
          {
            text: "State Definitions",
            href: "/admin/state_definitions",
          },
          {
            text: `${router.query.definition_name}`,
            href: `/admin/state_definitions/${router.query.id}/update/`,
          },
          { text: "Create Step" },
        ]}
      />

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
            />
            <ErrorText>{errors.name}</ErrorText>
          </Field>
          <Field $size="half">
            <Checkbox
              id="isStartState"
              value="True"
              onChange={evt => (viewModel.isStartState = evt.target.checked)}
              disabled={isSubmitting}
              label={t("form.label.isStartState", "Is Start State")}
            />
          </Field>
          <Field $size="half">
            <Checkbox
              id="isStopState"
              value="True"
              onChange={evt => (viewModel.isStopState = evt.target.checked)}
              disabled={isSubmitting}
              label={t("form.label.isStopState", "Is Stop State")}
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
    </>
  );
};

export default observer(StateStepCreate);
