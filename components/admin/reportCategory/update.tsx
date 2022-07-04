/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportCategoryUpdateViewModel } from "./updateViewModel";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const ReportCategoryUpdate = () => {
  const router = useRouter();
  const services = useServices();
  const [viewModel] = useState(
    new ReportCategoryUpdateViewModel(
      router.query.id as string,
      services.reportCategoryService
    )
  );

  return (
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

          <div>
            {viewModel.iconUrl && (
              <div
                className={`flex items-center ${
                  viewModel.iconUrl ? "" : "hidden"
                }`}
              >
                <Field $size="half">
                  <Label>Current Icon</Label>
                  <img
                    width={"32"}
                    height={"32"}
                    alt={`icon for ${viewModel.name}`}
                    src={`${publicRuntimeConfig.serverUrl}/${viewModel.iconUrl}`}
                  />
                </Field>
              </div>
            )}
          </div>
          <Field $size="half">
            <Label htmlFor="icon">Icon</Label>
            <TextInput
              id="icon"
              type="file"
              accept="image/*"
              placeholder="Icon"
              onChange={evt => {
                if (evt.target.files?.length)
                  viewModel.icon = evt.target.files[0];
              }}
              disabled={viewModel.isSubmitting}
            />
            <ErrorText>{viewModel.fieldErrors.icon}</ErrorText>
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
    </MaskingLoader>
  );
};

export default observer(ReportCategoryUpdate);
