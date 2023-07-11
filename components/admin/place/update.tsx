import { useCallback, useMemo, useState } from "react";
import { Observer, observer } from "mobx-react";
import { useRouter } from "next/router";
import { PlaceUpdateViewModel } from "./updateViewModel";
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
  TextArea,
  TextInput,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import AuthroitySelect from "components/widgets/authoritySelect";
import useStore from "lib/store";
import dynamic from "next/dynamic";

const PlaceMap = dynamic(() => import("./placeMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const PlaceUpdate = () => {
  const router = useRouter();
  const store = useStore();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new PlaceUpdateViewModel(
        parseInt(router.query.id as string),
        services.placeService,
        services.reportTypeService
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
              defaultValue={viewModel.name}
              required
            />
            <ErrorText>{viewModel.fieldErrors.name}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const latitudeField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="latitude">
              {t("form.label.latitude", "Latitude")}
            </Label>
            <TextInput
              id="latitude"
              type="number"
              placeholder={t("form.placeholder.latitude", "Latitude")}
              onChange={evt => (viewModel.latitude = +evt.target.value)}
              value={viewModel.latitude == 0 ? "" : viewModel.latitude}
              disabled={viewModel.isSubmitting}
              required
            />
            <ErrorText>{viewModel.fieldErrors.latitude}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const longitudeField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="longitude">
              {t("form.label.longitude", "Longitude")}
            </Label>
            <TextInput
              id="longitude"
              type="number"
              placeholder={t("form.placeholder.longitude", "Longitude")}
              onChange={evt => (viewModel.longitude = +evt.target.value)}
              value={viewModel.longitude == 0 ? "" : viewModel.longitude}
              disabled={viewModel.isSubmitting}
              required
            />
            <ErrorText>{viewModel.fieldErrors.longitude}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const placeMap = useMemo(
    () => (
      <Observer>
        {() => (
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
        )}
      </Observer>
    ),
    [viewModel]
  );

  const notificationToField = useMemo(
    () => (
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="notificationTo">
              {t("form.label.notificationTo", "Contact")}
            </Label>
            <TextArea
              id="notificationTo"
              rows={3}
              placeholder={t("form.placeholder.notificationTo", "Contact")}
              onChange={evt => (viewModel.notificationTo = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.notificationTo}
            />
            <ErrorText>{viewModel.fieldErrors.notificationTo}</ErrorText>
          </Field>
        )}
      </Observer>
    ),
    [t, viewModel]
  );

  const authorityField = useMemo(
    () => (
      <Observer>
        {() => {
          if (!store.isSuperUser && store.isRoleOfficer) {
            return null;
          }
          return (
            <Field $size="half">
              <Label htmlFor="authority">
                {t("form.label.authority", "Authority")}
              </Label>
              <AuthroitySelect
                roleRequired={true}
                value={viewModel.authorityId}
                onChange={value => (viewModel.authorityId = parseInt(value.id))}
              />
              <ErrorText>{viewModel.fieldErrors.authorityId}</ErrorText>
            </Field>
          );
        }}
      </Observer>
    ),
    [t, viewModel, store]
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
          {latitudeField}
          {longitudeField}
          {placeMap}
          {notificationToField}
          {authorityField}
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

export default observer(PlaceUpdate);
