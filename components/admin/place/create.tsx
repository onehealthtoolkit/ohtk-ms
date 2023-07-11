import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { PlaceCreateViewModel } from "./createViewModel";
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
  TextArea,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import AuthroitySelect from "components/widgets/authoritySelect";

import dynamic from "next/dynamic";

const PlaceMap = dynamic(() => import("./placeMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const PlaceCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new PlaceCreateViewModel(
        services.placeService,
        services.reportTypeService
      )
  );

  useEffect(() => {
    // center map to Thailand
    if (!viewModel.latitude) viewModel.latitude = 15.87;
    if (!viewModel.longitude) viewModel.longitude = 100.9925;
  }, [viewModel]);

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  const isSubmitting = viewModel.isSubmitting;
  const errors = viewModel.fieldErrors;

  return (
    <Form>
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
          <Label htmlFor="latitude">
            {t("form.label.latitude", "Latitude")}
          </Label>
          <TextInput
            id="latitude"
            type="number"
            placeholder={t("form.placeholder.latitude", "Latitude")}
            onChange={evt => (viewModel.latitude = +evt.target.value)}
            value={viewModel.latitude}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.latitude}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="longitude">
            {t("form.label.longitude", "Longitude")}
          </Label>
          <TextInput
            id="longitude"
            type="number"
            placeholder={t("form.placeholder.longitude", "Longitude")}
            onChange={evt => (viewModel.longitude = +evt.target.value)}
            value={viewModel.longitude}
            disabled={isSubmitting}
            required
          />
          <ErrorText>{errors.longitude}</ErrorText>
        </Field>
        <Field $size="half">
          <PlaceMap
            lat={viewModel.latitude}
            lng={viewModel.longitude}
            onMarkerChange={value => {
              viewModel.latitude = value.lat;
              viewModel.longitude = value.lng;
            }}
          />
        </Field>
        <Field $size="half">
          <Label htmlFor="notificationTo">
            {t("form.label.notificationTo", "Contact")}
          </Label>
          <TextArea
            id="notificationTo"
            rows={3}
            placeholder={t("form.placeholder.notificationTo", "Contact")}
            onChange={evt => (viewModel.notificationTo = evt.target.value)}
            disabled={isSubmitting}
          />
          <ErrorText>{errors.notificationTo}</ErrorText>
        </Field>
        <Field $size="half">
          <Label htmlFor="authority">
            {t("form.label.authority", "Authority")}
          </Label>
          <AuthroitySelect
            roleRequired={true}
            onChange={value => (viewModel.authorityId = parseInt(value.id))}
          />
          <ErrorText>{errors.authorityId}</ErrorText>
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
  );
};

export default observer(PlaceCreate);
