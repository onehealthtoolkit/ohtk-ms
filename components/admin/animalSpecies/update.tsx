import { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import {
  CancelButton,
  FieldGroup,
  Form,
  FormAction,
  FormMessage,
  MaskingLoader,
  SaveButton,
} from "components/widgets/forms";
import Spinner from "components/widgets/spinner";
import useServices from "lib/services/provider";
import { useTranslation } from "react-i18next";
import AnimalSpeciesFormFields from "./formFields";
import AnimalSpeciesMobileImpactNotice from "./mobileImpactNotice";
import { AnimalSpeciesUpdateViewModel } from "./updateViewModel";

const AnimalSpeciesUpdate = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const services = useServices();
  const [viewModel] = useState(
    () =>
      new AnimalSpeciesUpdateViewModel(
        parseInt(router.query.id as string),
        services.animalSpeciesService
      )
  );

  const onSubmit = useCallback(async () => {
    if (await viewModel.save()) {
      router.push({
        pathname: "/admin/animal_species",
        query: { speciesSaved: "1" },
      });
    }
  }, [router, viewModel]);

  return (
    <MaskingLoader loading={viewModel.isLoading}>
      <Form>
        <AnimalSpeciesMobileImpactNotice />
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

export default observer(AnimalSpeciesUpdate);
