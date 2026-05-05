import AuthroitySelect from "components/widgets/authoritySelect";
import dynamic from "next/dynamic";
import {
  Checkbox,
  ErrorText,
  Field,
  Label,
  TextInput,
} from "components/widgets/forms";
import { Observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { optionalCoordinate, roundCoordinate } from "./coordinates";
import { VillageViewModel } from "./villageViewModel";

const VillageLocationMap = dynamic(() => import("../place/placeMap"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const VillageFormFields = ({
  viewModel,
  showLocationMap = false,
}: {
  viewModel: VillageViewModel;
  showLocationMap?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="code">{t("form.label.code", "Code")}</Label>
            <TextInput
              id="code"
              type="text"
              placeholder={t("form.placeholder.code", "Code")}
              onChange={evt => (viewModel.code = evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.code}
              required
            />
            <ErrorText>{viewModel.fieldErrors.code}</ErrorText>
          </Field>
        )}
      </Observer>
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
      {showLocationMap && (
        <Observer>
          {() => (
            <Field $size="half">
              <VillageLocationMap
                lat={viewModel.latitude ?? 0}
                lng={viewModel.longitude ?? 0}
                onMarkerChange={value => {
                  viewModel.latitude = roundCoordinate(value.lat);
                  viewModel.longitude = roundCoordinate(value.lng);
                }}
              />
            </Field>
          )}
        </Observer>
      )}
      <Observer>
        {() => (
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
        )}
      </Observer>
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="latitude">
              {t("form.label.latitude", "Latitude")}
            </Label>
            <TextInput
              id="latitude"
              type="number"
              step="0.000001"
              placeholder={t("form.placeholder.latitude", "Latitude")}
              onChange={evt =>
                (viewModel.latitude = optionalCoordinate(evt.target.value))
              }
              disabled={viewModel.isSubmitting}
              value={viewModel.latitude ?? ""}
            />
            <ErrorText>{viewModel.fieldErrors.latitude}</ErrorText>
          </Field>
        )}
      </Observer>
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="longitude">
              {t("form.label.longitude", "Longitude")}
            </Label>
            <TextInput
              id="longitude"
              type="number"
              step="0.000001"
              placeholder={t("form.placeholder.longitude", "Longitude")}
              onChange={evt =>
                (viewModel.longitude = optionalCoordinate(evt.target.value))
              }
              disabled={viewModel.isSubmitting}
              value={viewModel.longitude ?? ""}
            />
            <ErrorText>{viewModel.fieldErrors.longitude}</ErrorText>
          </Field>
        )}
      </Observer>
      <Observer>
        {() => (
          <Field $size="half">
            <Checkbox
              id="active"
              name="active"
              value="active"
              label={t("form.label.active", "Active")}
              checked={viewModel.active}
              disabled={viewModel.isSubmitting}
              onChange={evt => (viewModel.active = evt.target.checked)}
            />
          </Field>
        )}
      </Observer>
    </>
  );
};

export default VillageFormFields;
