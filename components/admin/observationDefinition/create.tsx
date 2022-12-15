import { useCallback, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ObservationDefinitionCreateViewModel } from "./createViewModel";
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
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import DataTemplateField from "../reportType/dataTemplateField";
import FormBuilder from "../formBuilder";
import FormBuilderDialog from "../reportType/formBuilderDialog";

const ObservationDefinitionCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ObservationDefinitionCreateViewModel(
      services.observationDefinitionService
    ).registerDialog("definitionFormBuilder")
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.push(
        `/admin/observation_definitions/${viewModel.resultId}/update`
      );
    }
  }, [router, viewModel]);

  return (
    <>
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
            <Label htmlFor="description">
              {t("form.label.description", "Description")}
            </Label>
            <TextInput
              id="description"
              type="text"
              placeholder={t("form.placeholder.description", "Description")}
              onChange={evt => (viewModel.description = evt.target.value)}
              disabled={isSubmitting}
            />
            <ErrorText>{errors.description}</ErrorText>
          </Field>
          <Field $size="half">
            <Label
              htmlFor="definition"
              className="flex flex-row justify-between items-end"
            >
              <span>
                {t(
                  "form.label.registerFormDefinition",
                  "RegisterForm Definition"
                )}
              </span>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  const valid = viewModel.parseDefinition(
                    viewModel.registerFormDefinition
                  );
                  if (valid) {
                    viewModel.dialog("definitionFormBuilder")?.open(null);
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
              id="definition"
              rows={30}
              placeholder={t(
                "form.placeholder.registerFormDefinition",
                "RegisterForm Definition"
              )}
              value={viewModel.registerFormDefinition}
              onChange={evt =>
                (viewModel.registerFormDefinition = evt.target.value)
              }
              disabled={isSubmitting}
              required
            />
            <ErrorText>{errors.definition}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="titleTemplate">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <Observer>
              {() => (
                <DataTemplateField
                  placeholder={t(
                    "form.placeholder.titleTemplate",
                    "Title Template"
                  )}
                  className="bg-[#fcfbe7]"
                  value={null}
                  onChange={value => (viewModel.titleTemplate = value)}
                  variableList={viewModel.definitionFormViewModel.variableList}
                />
              )}
            </Observer>
            <ErrorText>{errors.titleTemplate}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="descriptionTemplate">
              {t("form.label.descriptionTemplate", "Description Template")}
            </Label>
            <Observer>
              {() => (
                <DataTemplateField
                  placeholder={t(
                    "form.placeholder.descriptionTemplate",
                    "Description Template"
                  )}
                  className="bg-[#fcfbe7]"
                  value={null}
                  onChange={value => (viewModel.descriptionTemplate = value)}
                  variableList={viewModel.definitionFormViewModel.variableList}
                />
              )}
            </Observer>
            <ErrorText>{errors.descriptionTemplate}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="identityTemplate">
              {t("form.label.identityTemplate", "Identity Template")}
            </Label>
            <Observer>
              {() => (
                <DataTemplateField
                  placeholder={t(
                    "form.placeholder.identityTemplate",
                    "Identity Template"
                  )}
                  value={null}
                  className="bg-[#fcfbe7]"
                  onChange={value => (viewModel.identityTemplate = value)}
                  variableList={viewModel.definitionFormViewModel.variableList}
                />
              )}
            </Observer>
            <ErrorText>{errors.identityTemplate}</ErrorText>
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
        viewModel={viewModel.dialog("definitionFormBuilder")}
        onClose={() => {
          viewModel.registerFormDefinition =
            viewModel.definitionFormViewModel.jsonString;
        }}
      >
        <FormBuilder viewModel={viewModel.definitionFormViewModel} />
      </FormBuilderDialog>
    </>
  );
};

export default observer(ObservationDefinitionCreate);
