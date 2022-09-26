import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { StateTransitionCreateViewModel } from "./createViewModel";
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
  Select,
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import Breadcrumb from "components/layout/breadcrumb";
import useStateSteps from "lib/hooks/stateSteps";
import FormBuilder from "components/admin/formBuilder";
import { useTranslation } from "react-i18next";
import FormBuilderDialog from "components/admin/stateDefinition/transition/formBuilderDialog";

const StateTransitionCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new StateTransitionCreateViewModel(
      router.query.id as string,
      services.stateTransitionService
    ).registerDialog("formBuilder")
  );
  const stateSteps = useStateSteps(router.query.id as string);

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
          { text: "Create Transition" },
        ]}
      />

      <Form>
        <FieldGroup>
          <Field $size="half">
            <Label htmlFor="fromStepId">
              {t("form.label.fromStep", "From Step")}
            </Label>
            <Select
              id="fromStepId"
              placeholder={t("form.placeholder.fromStep", "From Step")}
              onChange={evt => {
                viewModel.fromStepId = evt.target.value;
              }}
              disabled={isSubmitting}
              defaultValue=""
            >
              <option disabled value={""}>
                {t("form.label.selectItem", " Select item ...")}
              </option>
              {stateSteps?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{errors.fromStepId}</ErrorText>
          </Field>

          <Field $size="half">
            <Label htmlFor="toStepId">
              {t("form.label.toStep", "To Step")}
            </Label>
            <Select
              id="toStepId"
              placeholder={t("form.placeholder.toStep", "To Step")}
              onChange={evt => {
                viewModel.toStepId = evt.target.value;
              }}
              disabled={isSubmitting}
              defaultValue=""
            >
              <option disabled value={""}>
                {t("form.label.selectItem", "Select item ...")}
              </option>
              {stateSteps?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{errors.toStepId}</ErrorText>
          </Field>
          <Field $size="half">
            <Label
              htmlFor="formDefinition"
              className="flex flex-row justify-between items-end"
            >
              <span>{t("form.label.formDefinition", "Form Definition")}</span>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  const valid = viewModel.parseFormDefinition(
                    viewModel.formDefinition
                  );
                  if (valid) {
                    viewModel.dialog("formBuilder")?.open(null);
                  }
                }}
                className="border
                  text-white
                  bg-[#4C81F1] 
                  border-blue-300
                  hover:border-blue-500
                  rounded
                  p-1
                "
              >
                Form builder
              </button>
            </Label>
            <TextArea
              id="formDefinition"
              placeholder={t(
                "form.placeholder.formDefinition",
                "Form Definition"
              )}
              rows={30}
              onChange={evt => (viewModel.formDefinition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.formDefinition}
            />
            <ErrorText>{errors.formDefinition}</ErrorText>
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
      <FormBuilderDialog
        viewModel={viewModel.dialog("formBuilder")}
        onClose={() => {
          viewModel.formDefinition = viewModel.formViewModel.jsonString;
        }}
      >
        <FormBuilder viewModel={viewModel.formViewModel} />
      </FormBuilderDialog>
    </>
  );
};

export default observer(StateTransitionCreate);
