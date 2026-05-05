import AnimalSpeciesList from "components/admin/animalSpecies/list";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminAnimalSpeciesPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.animalSpecies", "Animal Species") }]}
        />
        <AnimalSpeciesList />
      </Layout>
    </Protect>
  );
};

export default AdminAnimalSpeciesPage;
