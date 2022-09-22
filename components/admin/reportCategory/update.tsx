/* eslint-disable @next/next/no-img-element */
import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
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
import { useTranslation } from "react-i18next";

const ReportCategoryUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new ReportCategoryUpdateViewModel(
        router.query.id as string,
        services.reportCategoryService
      )
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
              placeholder={t("form.placeholder.ordering", "Ordering")}
              onChange={evt => (viewModel.ordering = +evt.target.value)}
              value={viewModel.ordering == 0 ? "" : viewModel.ordering}
              disabled={viewModel.isSubmitting}
              defaultValue={viewModel.ordering}
              required
            />
            <ErrorText>{viewModel.fieldErrors.ordering}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const iconImgField = useMemo(
    () => (
      <Observer>
        {() => (
          <div>
            {viewModel.iconUrl && (
              <div
                className={`flex items-center ${
                  viewModel.iconUrl ? "" : "hidden"
                }`}
              >
                <Field $size="half">
                  <Label>{t("form.label.currentIcon", "Current Icon")}</Label>
                  <img
                    width={"32"}
                    height={"32"}
                    alt={`icon for ${viewModel.name}`}
                    src={viewModel.iconUrl}
                  />
                </Field>
              </div>
            )}
          </div>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const iconInputField = useMemo(
    () => (
      <Observer>
        {() => (
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
              disabled={viewModel.isSubmitting}
            />
            <ErrorText>{viewModel.fieldErrors.icon}</ErrorText>
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
      <Form>
        <FieldGroup>
          {nameField}
          {orderingField}
          {iconImgField}
          {iconInputField}
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
    </MaskingLoader>
  );
};

export default observer(ReportCategoryUpdate);
