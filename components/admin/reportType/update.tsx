import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportTypeUpdateViewModel } from "./updateViewModel";
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

const ReportTypeUpdateForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(() =>
    new ReportTypeUpdateViewModel(
      router.query.id as string,
      services.reportTypeService
    ).registerDialog("formBuilder")
  );
  const [selectedDefinition, setSelectedDefinition] = useState("");
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

  return (
    <>
      <MaskingLoader loading={viewModel.isLoading}>
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
            <Field $size="half">
              <Label
                htmlFor="definition"
                className="flex flex-row justify-between items-end"
              >
                <span>{t("form.label.definition", "Definition")}</span>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedDefinition("definition");
                    const valid = viewModel.parseDefinition(
                      viewModel.definition
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

            <Field $size="half">
              <Label
                htmlFor="followupDefinition"
                className="flex flex-row justify-between items-end"
              >
                <span>
                  {t("form.label.followupDefinition", "Followup Definition")}
                </span>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setSelectedDefinition("followupDefinition");
                    const valid = viewModel.parseFollowupDefinition(
                      viewModel.followupDefinition
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

            <Field $size="half">
              <Label htmlFor="rendererDataTemplate">Description Template</Label>
              <TextArea
                id="rendererDataTemplate"
                placeholder="description template"
                rows={5}
                onChange={evt =>
                  (viewModel.rendererDataTemplate = evt.target.value)
                }
                disabled={viewModel.isSubmitting}
                value={viewModel.rendererDataTemplate}
              />
              <ErrorText>
                {viewModel.fieldErrors.rendererDataTemplate}
              </ErrorText>
            </Field>

            <Field $size="half">
              <Label htmlFor="rendererFollowupDataTemplate">
                Follow Up Description Template
              </Label>
              <TextArea
                id="rendererFollowupDataTemplate"
                placeholder="follow up description template"
                rows={5}
                onChange={evt =>
                  (viewModel.rendererFollowupDataTemplate = evt.target.value)
                }
                disabled={viewModel.isSubmitting}
                value={viewModel.rendererFollowupDataTemplate}
              />
              <ErrorText>
                {viewModel.fieldErrors.rendererFollowupDataTemplate}
              </ErrorText>
            </Field>

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
                value={viewModel.ordering}
                required
              />
              <ErrorText>{viewModel.fieldErrors.ordering}</ErrorText>
            </Field>
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton type="submit" disabled={viewModel.isSubmitting}>
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
        viewModel={viewModel.dialog("formBuilder")}
        onClose={() => {
          if (selectedDefinition == "followupDefinition")
            viewModel.followupDefinition = viewModel.formViewModel.jsonString;
          else viewModel.definition = viewModel.formViewModel.jsonString;
        }}
      >
        <FormBuilder viewModel={viewModel.formViewModel} />
      </FormBuilderDialog>
    </>
  );
};

export default observer(ReportTypeUpdateForm);
