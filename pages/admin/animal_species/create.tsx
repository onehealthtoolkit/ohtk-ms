import AnimalSpeciesCreate from "components/admin/animalSpecies/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminAnimalSpeciesCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.animalSpecies", "Animal Species"),
              href: "/admin/animal_species",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <AnimalSpeciesCreate />
      </Layout>
    </Protect>
  );
};

export default AdminAnimalSpeciesCreatePage;
