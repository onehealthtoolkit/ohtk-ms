import { useTranslation } from "react-i18next";

const AnimalSpeciesMobileImpactNotice = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
      <div className="font-semibold">
        {t(
          "animalSpecies.mobileImpactTitle",
          "Active species are used in the live animal census form"
        )}
      </div>
      <div className="mt-1">
        {t(
          "animalSpecies.mobileImpactBody",
          "Adding, deactivating, or reactivating a species changes the animal census rows returned to reporter mobile apps. Reporters with an already-open form may need to reload before submitting."
        )}
      </div>
    </div>
  );
};

export const AnimalSpeciesSavedNotice = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-4 rounded border border-green-200 bg-green-50 p-4 text-sm text-green-800">
      {t(
        "animalSpecies.mobileImpactSuccess",
        "Species updated. Reporter mobile apps will use the updated animal census rows after refresh; already-open forms may ask reporters to reload."
      )}
    </div>
  );
};

export default AnimalSpeciesMobileImpactNotice;
