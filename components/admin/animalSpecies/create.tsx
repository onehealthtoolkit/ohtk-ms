import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import {
  CancelButton,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  SaveButton,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import { AnimalSpeciesCreateViewModel } from "./createViewModel";
import AnimalSpeciesFormFields from "./formFields";

const AnimalSpeciesCreate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () => new AnimalSpeciesCreateViewModel(services.animalSpeciesService)
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.back();
    }
  }, [router, viewModel]);

  return (
    <Form>
      <FieldGroup>
        <AnimalSpeciesFormFields viewModel={viewModel} />
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
          {viewModel.isSubmitting ? <Spinner /> : t("form.button.save", "Save")}
        </SaveButton>
        <CancelButton type="button" onClick={() => router.back()}>
          {t("form.button.cancel", "Cancel")}
        </CancelButton>
      </FormAction>
    </Form>
  );
};

export default observer(AnimalSpeciesCreate);
