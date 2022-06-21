import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AdminReportTypeFormViewModel } from "./formViewModel";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import { ReportType } from "lib/services/reportType";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";

type FormValues = ReportType;

const ReportTypeUpdateForm = ({ data }: { data: FormValues | undefined }) => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new AdminReportTypeFormViewModel(services.reportTypeService)
  );

  useEffect(() => {
    if (data) {
      viewModel.name = data.name;
      viewModel.definition = data.definition;
      viewModel.categoryId = data.categoryId;
      viewModel.ordering = data.ordering;
    }
  }, [data, viewModel]);

  const [categories, setCategories] = useState<ReportCategory[]>();

  useEffect(() => {
    async function loadData() {
      const result = await services.reportCategoryService.fetchReportCategories(
        ""
      );
      setCategories(result.items);
    }
    loadData();
  }, [router.query, services.reportTypeService]);

  return (
    <Form
      onSubmit={async evt => {
        evt.preventDefault();
        if (await viewModel.save(data?.id)) {
          router.back();
        }
      }}
    >
      <FieldGroup>
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
  );
};

export default observer(ReportTypeUpdateForm);
