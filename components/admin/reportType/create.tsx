import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportTypeCreateViewModel } from "./createViewModel";
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
  TabBar,
  TabItem,
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";
import FormBuilder from "components/admin/formBuilder";
import useStateDefinitions from "lib/hooks/stateDefinitions";

const ReportTypeCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    () => new ReportTypeCreateViewModel(services.reportTypeService)
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

  return (
    <>
      <TabBar>
        <TabItem
          id="detail"
          active={!viewModel.isFormBuilderMode}
          onTab={() => {
            viewModel.definition = viewModel.formViewModel.jsonString;
            viewModel.isFormBuilderMode = false;
          }}
        >
          {({ activeCss }) => (
            <>
              <svg
                className={`mr-2 w-5 h-5 ${activeCss}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <span>Detail</span>
            </>
          )}
        </TabItem>
        <TabItem
          id="formBuilder"
          active={viewModel.isFormBuilderMode}
          onTab={() => (viewModel.isFormBuilderMode = true)}
        >
          {({ activeCss }) => (
            <>
              <svg
                className={`mr-2 w-5 h-5 ${activeCss}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Form Builder</span>
            </>
          )}
        </TabItem>
      </TabBar>
      <Form
        onSubmit={async evt => {
          evt.preventDefault();
          if (await viewModel.save()) {
            router.back();
          }
        }}
      >
        <FieldGroup>
          {viewModel.isFormBuilderMode ? (
            <FormBuilder viewModel={viewModel.formViewModel} />
          ) : (
            <>
              <Field $size="half">
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Name"
                  onChange={evt => (viewModel.name = evt.target.value)}
                  value={viewModel.name}
                  disabled={isSubmitting}
                  required
                />
                <ErrorText>{errors.name}</ErrorText>
              </Field>
              <Field $size="half">
                <Label htmlFor="name">Definition</Label>
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
                <Label htmlFor="category">Category</Label>
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
                  required
                >
                  <option value={undefined}>Select item ...</option>
                  {categories?.map(item => (
                    <option key={`option-${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                <ErrorText>{errors.categoryId}</ErrorText>
              </Field>
              <Field $size="half">
                <Label htmlFor="name">Description Template</Label>
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
                <Label htmlFor="stateDefinitionId">State definition</Label>
                <Select
                  id="stateDefinitionId"
                  placeholder="State definition"
                  onChange={evt =>
                    (viewModel.stateDefinitionId = +evt.target.value)
                  }
                  value={viewModel.stateDefinitionId}
                  disabled={viewModel.isSubmitting}
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
                <Label htmlFor="ordering">Ordering</Label>
                <TextInput
                  id="ordering"
                  type="number"
                  placeholder="Ordering"
                  onChange={evt => (viewModel.ordering = +evt.target.value)}
                  disabled={isSubmitting}
                  value={viewModel.ordering}
                  required
                />
                <ErrorText>{errors.ordering}</ErrorText>
              </Field>
            </>
          )}
        </FieldGroup>
        {viewModel.submitError.length > 0 && (
          <FormMessage>{viewModel.submitError}</FormMessage>
        )}
        <FormAction>
          <SaveButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "บันทึก"}
          </SaveButton>
          <CancelButton type="button" onClick={() => router.back()}>
            Cancel
          </CancelButton>
        </FormAction>
      </Form>
    </>
  );
};

export default observer(ReportTypeCreate);
