import { useCallback, useEffect, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportTypeCreateViewModel } from "./createViewModel";
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
  Select,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";
import FormBuilder from "components/admin/formBuilder";
import useStateDefinitions from "lib/hooks/stateDefinitions";
import { useTranslation } from "react-i18next";
import FormBuilderDialog from "components/admin/reportType/formBuilderDialog";
import DataTemplateField from "components/admin/reportType/dataTemplateField";

const ReportTypeCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ReportTypeCreateViewModel(services.reportTypeService)
      .registerDialog("definitionFormBuilder")
      .registerDialog("followupDefinitionFormBuilder")
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  const stateDefinitions = useStateDefinitions();
  const [categories, setCategories] = useState<ReportCategory[]>();

  useEffect(() => {
    async function loadData() {
      const result = await services.reportCategoryService.fetchReportCategories(
        30,
        0,
        ""
      );
      setCategories(result.items);
    }
    loadData();
  }, [services.reportCategoryService]);

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  const rendererDataTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="name">Description Template</Label>
            <DataTemplateField
              placeholder={t(
                "form.placeholder.descriptionTemplate",
                "Description Template"
              )}
              value={viewModel.rendererDataTemplate}
              onChange={value => (viewModel.rendererDataTemplate = value)}
              variableList={viewModel.definitionFormViewModel.variableList}
            />
            <ErrorText>{viewModel.fieldErrors.rendererDataTemplate}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const rendererFollowupDataTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="rendererFollowupDataTemplate">
              Follow Up Description Template
            </Label>
            <DataTemplateField
              placeholder={t(
                "form.label.descriptionFollowupTemplate",
                "Follow Up Description Template"
              )}
              value={viewModel.rendererFollowupDataTemplate}
              onChange={value =>
                (viewModel.rendererFollowupDataTemplate = value)
              }
              variableList={
                viewModel.followupDefinitionFormViewModel.variableList
              }
            />
            <ErrorText>
              {viewModel.fieldErrors.rendererFollowupDataTemplate}
            </ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  return (
    <>
      <Form>
        <FieldGroup>
          <Field $size="half">
            <Label htmlFor="category">
              {t("form.label.category", "Category")}
            </Label>
            <Select
              id="category"
              placeholder="Category"
              value={viewModel.categoryId}
              onChange={evt => {
                if (evt.target.value) {
                  viewModel.categoryId = parseInt(evt.target.value);
                } else {
                  viewModel.categoryId = undefined;
                }
              }}
              disabled={isSubmitting}
              defaultValue={viewModel.categoryId || ""}
              required
            >
              <option disabled value={""}>
                Select item ...
              </option>
              {categories?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{errors.categoryId}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="name">{t("form.label.name", "Name")}</Label>
            <TextInput
              id="name"
              type="text"
              placeholder={t("form.placeholder.name", "Name")}
              onChange={evt => (viewModel.name = evt.target.value)}
              value={viewModel.name}
              disabled={isSubmitting}
              required
            />
            <ErrorText>{errors.name}</ErrorText>
          </Field>
          <Field $size="half">
            <Label
              htmlFor="definition"
              className="flex flex-row justify-between items-end"
            >
              <span>{t("form.label.definition", "Definition")}</span>
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  const valid = viewModel.parseDefinition(viewModel.definition);
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
              placeholder="Definition"
              value={viewModel.definition}
              onChange={evt => (viewModel.definition = evt.target.value)}
              disabled={isSubmitting}
              required
            />
            <ErrorText>{errors.definition}</ErrorText>
          </Field>
          <Field $size="half">
            <Checkbox
              id="isDefault"
              value="True"
              onChange={evt => (viewModel.isFollowable = evt.target.checked)}
              disabled={isSubmitting}
              label={t("form.label.isFollowable", "Followable")}
            />
          </Field>
          <>
            {viewModel.isFollowable && (
              <Field $size="half">
                <Label
                  htmlFor="followupDefinition"
                  className="flex flex-row justify-between items-end"
                >
                  <span>
                    {t("form.label.followupDefinition", "Followup Definition")}
                  </span>
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      const valid = viewModel.parseFollowupDefinition(
                        viewModel.followupDefinition
                      );
                      if (valid) {
                        viewModel
                          .dialog("followupDefinitionFormBuilder")
                          ?.open(null);
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
                  id="followupDefinition"
                  placeholder={t(
                    "form.placeholder.followupDefinition",
                    "Followup Definition"
                  )}
                  rows={30}
                  onChange={evt =>
                    (viewModel.followupDefinition = evt.target.value)
                  }
                  disabled={viewModel.isSubmitting}
                  value={viewModel.followupDefinition}
                  required
                />
                <ErrorText>
                  {viewModel.fieldErrors.followupDefinition}
                </ErrorText>
              </Field>
            )}
          </>
          {rendererDataTemplateField}
          <>{viewModel.isFollowable && rendererFollowupDataTemplateField}</>
          <Field $size="half">
            <Label htmlFor="stateDefinitionId">State definition</Label>
            <Select
              id="stateDefinitionId"
              placeholder={t(
                "form.placeholder.stateDefinition",
                "State definition"
              )}
              onChange={evt =>
                (viewModel.stateDefinitionId = +evt.target.value)
              }
              value={viewModel.stateDefinitionId}
              disabled={viewModel.isSubmitting}
            >
              <option value={0}>
                {t("form.label.selectItem", "Select item ...")}
              </option>
              {stateDefinitions?.map(item => (
                <option key={`option-${item.id}`} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>
            <ErrorText>{viewModel.fieldErrors.stateDefinitionId}</ErrorText>
          </Field>
          <Field $size="half">
            <Label htmlFor="ordering">
              {t("form.label.ordering", "Ordering")}
            </Label>
            <TextInput
              id="ordering"
              type="number"
              placeholder={t("form.placeholder.ordering", "Ordering")}
              onChange={evt => (viewModel.ordering = +evt.target.value)}
              disabled={isSubmitting}
              value={viewModel.ordering == 0 ? "" : viewModel.ordering}
              required
            />
            <ErrorText>{errors.ordering}</ErrorText>
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
          viewModel.definition = viewModel.definitionFormViewModel.jsonString;
        }}
      >
        <FormBuilder
          viewModel={viewModel.definitionFormViewModel}
          rendererDataTemplate={viewModel.rendererDataTemplate}
        />
      </FormBuilderDialog>
      <FormBuilderDialog
        viewModel={viewModel.dialog("followupDefinitionFormBuilder")}
        onClose={() => {
          viewModel.followupDefinition =
            viewModel.followupDefinitionFormViewModel.jsonString;
        }}
      >
        <FormBuilder
          viewModel={viewModel.followupDefinitionFormViewModel}
          rendererDataTemplate={viewModel.rendererFollowupDataTemplate}
        />
      </FormBuilderDialog>
    </>
  );
};

export default observer(ReportTypeCreate);
