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
  TabBar,
  TabItem,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";
import FormBuilder from "components/admin/formBuilder";

const ReportTypeUpdateForm = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new ReportTypeUpdateViewModel(
      router.query.id as string,
      services.reportTypeService
    )
  );

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
      <TabBar>
        <TabItem
          id="detail"
          active={!viewModel.isFormBuilderMode}
          onTab={() => (viewModel.isFormBuilderMode = false)}
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
                    disabled={viewModel.isSubmitting}
                    value={viewModel.name}
                  />
                  <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
                </Field>
                <Field $size="half">
                  <Label htmlFor="name">Definition</Label>
                  <TextInput
                    id="definition"
                    type="text"
                    placeholder="Definition"
                    onChange={evt => (viewModel.definition = evt.target.value)}
                    disabled={viewModel.isSubmitting}
                    value={viewModel.definition}
                  />
                  <ErrorText>{viewModel.fieldErrors.definition}</ErrorText>
                </Field>

                <Field $size="half">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    placeholder="Category"
                    onChange={evt => (viewModel.categoryId = +evt.target.value)}
                    disabled={viewModel.isSubmitting}
                    value={viewModel.categoryId}
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
                  <Label htmlFor="ordering">Ordering</Label>
                  <TextInput
                    id="ordering"
                    type="number"
                    placeholder="Ordering"
                    onChange={evt => (viewModel.ordering = +evt.target.value)}
                    disabled={viewModel.isSubmitting}
                    value={viewModel.ordering}
                  />
                  <ErrorText>{viewModel.fieldErrors.ordering}</ErrorText>
                </Field>
              </>
            )}
          </FieldGroup>
          {viewModel.submitError.length > 0 && (
            <FormMessage>{viewModel.submitError}</FormMessage>
          )}
          <FormAction>
            <SaveButton type="submit" disabled={viewModel.isSubmitting}>
              {viewModel.isSubmitting ? <Spinner /> : "Save"}
            </SaveButton>
            <CancelButton type="button" onClick={() => router.back()}>
              Cancel
            </CancelButton>
          </FormAction>
        </Form>
      </MaskingLoader>
    </>
  );
};

export default observer(ReportTypeUpdateForm);
