import { useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ReportCategoryCreateViewModel } from "./createViewModel";
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
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";

const ReportCategoryCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new ReportCategoryCreateViewModel(services.reportCategoryService)
  );

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

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
          <Label htmlFor="ordering">
            {t("form.label.ordering", "Ordering")}
          </Label>
          <TextInput
            id="ordering"
            type="number"
            placeholder={t("form.placeholder.ordering", "Ordering")}
            onChange={evt => (viewModel.ordering = +evt.target.value)}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.ordering}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="icon">{t("form.label.icon", "Icon")}</Label>
          <TextInput
            id="icon"
            type="file"
            accept="image/*"
            placeholder={t("form.placeholder.icon", "Icon")}
            onChange={evt => {
              if (evt.target.files?.length)
                viewModel.icon = evt.target.files[0];
            }}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.icon}</ErrorText>
        </Field>
      </FieldGroup>
      {viewModel.submitError.length > 0 && (
        <FormMessage>{viewModel.submitError}</FormMessage>
      )}
      <FormAction>
        <SaveButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(ReportCategoryCreate);
