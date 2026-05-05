import {
  Checkbox,
  ErrorText,
  Field,
  Label,
  TextInput,
} from "components/widgets/forms";
import { Observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { AnimalSpeciesViewModel } from "./animalSpeciesViewModel";

const AnimalSpeciesFormFields = ({
  viewModel,
}: {
  viewModel: AnimalSpeciesViewModel;
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
      <Observer>
        {() => (
          <Field $size="half">
            <Label htmlFor="sortOrder">
              {t("form.label.sortOrder", "Sort Order")}
            </Label>
            <TextInput
              id="sortOrder"
              type="number"
              placeholder={t("form.placeholder.sortOrder", "Sort Order")}
              onChange={evt => (viewModel.sortOrder = +evt.target.value)}
              disabled={viewModel.isSubmitting}
              value={viewModel.sortOrder}
            />
            <ErrorText>{viewModel.fieldErrors.sortOrder}</ErrorText>
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

export default AnimalSpeciesFormFields;
