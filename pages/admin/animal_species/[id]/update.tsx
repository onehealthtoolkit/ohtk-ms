import AnimalSpeciesUpdate from "components/admin/animalSpecies/update";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const AdminAnimalSpeciesUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
    return <Spinner />;
  }

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.animalSpecies", "Animal Species"),
              href: "/admin/animal_species",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <AnimalSpeciesUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminAnimalSpeciesUpdatePage;
