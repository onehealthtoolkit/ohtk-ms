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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { ReportCategory } from "lib/services/reportCategory";

const ReportTypeCreate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new ReportTypeCreateViewModel(services.reportTypeService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

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
          <Label htmlFor="name">Name</Label>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            onChange={evt => (viewModel.name = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.name}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="name">Definition</Label>
          <TextInput
            id="definition"
            type="text"
            placeholder="Definition"
            onChange={evt => (viewModel.definition = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.definition}</ErrorText>
        </Field>

        <Field $size="half">
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            placeholder="Category"
            onChange={evt => {
              console.log(evt.target.value);
              viewModel.categoryId = +evt.target.value;
            }}
            disabled={isSubmitting}
            defaultValue=""
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
          <Label htmlFor="ordering">Ordering</Label>
          <TextInput
            id="ordering"
            type="number"
            placeholder="Ordering"
            onChange={evt => (viewModel.ordering = +evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.ordering}</ErrorText>
        </Field>
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
  );
};

export default observer(ReportTypeCreate);
