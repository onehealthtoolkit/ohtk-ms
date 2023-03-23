import { useEffect, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportTypeUpdateViewModel } from "./updateViewModel";
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
  MaskingLoader,
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

const ReportTypeUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ReportTypeUpdateViewModel(
      router.query.id as string,
      services.reportTypeService
    )
      .registerDialog("definitionFormBuilder")
      .registerDialog("followupDefinitionFormBuilder")
  );
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
  }, [router.query, services.reportCategoryService]);

  const categoryField = (
    <Observer>
      {() => (
        <Field $size="half">
          <Label htmlFor="category">
            {t("form.label.category", "Category")}
          </Label>
          <Select
            id="category"
            placeholder={t("form.placeholder.category", "Category")}
            onChange={evt => (viewModel.categoryId = +evt.target.value)}
            disabled={viewModel.isSubmitting}
            value={viewModel.categoryId}
            required
          >
            <option value={""} disabled>
              Select item ...
            </option>
            {categories?.map(item => (
              <option key={`option-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <ErrorText>{viewModel.fieldErrors.categoryId}</ErrorText>
        </Field>
      )}
    </Observer>
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
              value={viewModel.name}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
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
              placeholder={t("form.placeholder.definition", "Definition")}
              rows={30}
              onChange={evt => (viewModel.definition = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.definition}
              required
            />
            <ErrorText>{viewModel.fieldErrors.definition}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const isFollowableField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Checkbox
              id="isDefault"
              value="True"
              checked={viewModel.isFollowable}
              onChange={evt => (viewModel.isFollowable = evt.target.checked)}
              disabled={viewModel.isSubmitting}
              label={t("form.label.isFollowable", "Followable")}
            />
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const followupDefinitionField = useMemo(
    () => (
      <Observer>
        {() => (
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
            <ErrorText>{viewModel.fieldErrors.followupDefinition}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const rendererDataTemplateField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="rendererDataTemplate">
              {t("form.label.descriptionTemplate", "Description Template")}
            </Label>
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
              {t(
                "form.label.descriptionFollowupTemplate",
                "Follow Up Description Template"
              )}
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

  const stateDefinitionIdField = (
    <Observer>
      {() => (
        <Field $size="half">
          <Label htmlFor="stateDefinitionId">State definition</Label>
          <Select
            id="stateDefinitionId"
            placeholder={t(
              "form.placeholder.stateDefinition",
              "State definition"
            )}
            onChange={evt => (viewModel.stateDefinitionId = +evt.target.value)}
            disabled={viewModel.isSubmitting}
            value={viewModel.stateDefinitionId}
          >
            <option value={0}>Select item ...</option>
            {stateDefinitions?.map(item => (
              <option key={`option-${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <ErrorText>{viewModel.fieldErrors.stateDefinitionId}</ErrorText>
        </Field>
      )}
    </Observer>
  );

  const orderingField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="ordering">
              {t("form.label.ordering", "Ordering")}
            </Label>
            <TextInput
              id="ordering"
              type="number"
              placeholder="Ordering"
              onChange={evt =>
                (viewModel.ordering = parseInt(evt.target.value))
              }
              disabled={viewModel.isSubmitting}
              value={viewModel.ordering == 0 ? "" : viewModel.ordering}
              required
            />
            <ErrorText>{viewModel.fieldErrors.ordering}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  return (
    <>
      <MaskingLoader loading={viewModel.isLoading}>
        <Form>
          <FieldGroup>
            {categoryField}
            {nameField}
            {definitionField}
            {isFollowableField}
            <>{viewModel.isFollowable && followupDefinitionField}</>
            {rendererDataTemplateField}
            <>{viewModel.isFollowable && rendererFollowupDataTemplateField}</>
            {stateDefinitionIdField}
            {orderingField}
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton
              type="button"
              disabled={viewModel.isSubmitting}
              onClick={async () => {
                if (await viewModel.save()) {
                  router.back();
                }
              }}
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
      </MaskingLoader>
      <FormBuilderDialog
        viewModel={viewModel.dialog("definitionFormBuilder")}
        onClose={() => {
          viewModel.definition = viewModel.definitionFormViewModel.jsonString;
        }}
      >
        <FormBuilder viewModel={viewModel.definitionFormViewModel} />
      </FormBuilderDialog>
      <FormBuilderDialog
        viewModel={viewModel.dialog("followupDefinitionFormBuilder")}
        onClose={() => {
          viewModel.followupDefinition =
            viewModel.followupDefinitionFormViewModel.jsonString;
        }}
      >
        <FormBuilder viewModel={viewModel.followupDefinitionFormViewModel} />
      </FormBuilderDialog>
    </>
  );
};

export default observer(ReportTypeUpdateForm);
