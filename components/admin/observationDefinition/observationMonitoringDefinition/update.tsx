import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ObservationMonitoringDefinitionUpdateViewModel } from "./updateViewModel";
import {
  CancelButton,
  ErrorText,
  Field,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  Label,
  MaskingLoader,
  SaveButton,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";
import DataTemplateField from "components/admin/reportType/dataTemplateField";
import FormBuilderDialog from "components/admin/reportType/formBuilderDialog";
import FormBuilder from "components/admin/formBuilder";

const ObservationMonitoringDefinitionsUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ObservationMonitoringDefinitionUpdateViewModel(
      router.query.id as string,
      router.query.monitoring_definition_id as string,
      services.observationMonitoringDefinitionService
    ).registerDialog("definitionFormBuilder")
  );

  const nameField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
            <TextInput
              id="name"
              type="text"
              placeholder={t("form.placeholder.name", "Name")}
              onChange={evt => (viewModel.name = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.name}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const descriptionField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="description">
              {t("form.label.description", "Description")}
            </Label>
            <TextInput
              id="description"
              type="text"
              placeholder={t("form.placeholder.description", "Description")}
              onChange={evt => (viewModel.description = evt.target.value)}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.description}
              required
            />
            <ErrorText>{viewModel.fieldErrors.description}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const definitionField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label
              htmlFor="definition"
              className="flex flex-row justify-between items-end"
            >
              <span>{t("form.label.formDefinition", "Form Definition")}</span>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  const valid = viewModel.parseDefinition(
                    viewModel.formDefinition
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
              placeholder={t("form.placeholder.formDefinition", "Definition")}
              rows={30}
              onChange={evt => (viewModel.formDefinition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.formDefinition}
              required
            />
            <ErrorText>{viewModel.fieldErrors.definition}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const titleTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="titleTemplate">
              {t("form.label.titleTemplate", "Title Template")}
            </Label>
            <DataTemplateField
              className="bg-[#fcfbe7]"
              placeholder={t("form.label.titleTemplate", "Title Template")}
              value={viewModel.titleTemplate}
              onChange={value => (viewModel.titleTemplate = value)}
              variableList={viewModel.definitionFormViewModel.variableList}
            />
            <ErrorText>{viewModel.fieldErrors.titleTemplate}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const descriptionTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="descriptionTemplate">
              {t("form.label.descriptionTemplate", "Description Template")}
            </Label>
            <DataTemplateField
              className="bg-[#fcfbe7]"
              placeholder={t(
                "form.label.descriptionTemplate",
                "Description Template"
              )}
              value={viewModel.descriptionTemplate}
              onChange={value => (viewModel.descriptionTemplate = value)}
              variableList={viewModel.definitionFormViewModel.variableList}
            />
            <ErrorText>{viewModel.fieldErrors.descriptionTemplate}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <>
        <Breadcrumb
          crumbs={[
            {
              text: t(
                "breadcrumb.observationDefinitions",
                "Observation Definitions"
              ),
              href: "/admin/observation_definitions",
            },
            {
              text: `${router.query.definition_name}`,
              href: `/admin/observation_definitions/${router.query.id}/update/`,
            },
            { text: "Update Observation Monitoring Definition" },
          ]}
        />
        <Form>
          <FieldGroup>
            {nameField}
            {descriptionField}
            {definitionField}
            {titleTemplateField}
            {descriptionTemplateField}
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton
              type="button"
              disabled={viewModel.isSubmitting}
              onClick={onSubmit}
            >
              {viewModel.isSubmitting ? (
                <Spinner />
              ) : (
                t("form.button.save", "Save")
              )}
            </SaveButton>
            <CancelButton type="button" onClick={() => router.back()}>
              {t("form.button.cancel", "Cancel")}
            </CancelButton>
          </FormAction>
        </Form>

        <FormBuilderDialog
          viewModel={viewModel.dialog("definitionFormBuilder")}
          onClose={() => {
            viewModel.formDefinition =
              viewModel.definitionFormViewModel.jsonString;
          }}
        >
          <FormBuilder viewModel={viewModel.definitionFormViewModel} />
        </FormBuilderDialog>
      </>
    </MaskingLoader>
  );
};

export default observer(ObservationMonitoringDefinitionsUpdateForm);
