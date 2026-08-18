import AnimalCensusCreate from "components/admin/animalCensus/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import useStore from "lib/store";
import { observer } from "mobx-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const AdminAnimalCensusCreatePage: NextPage = observer(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const store = useStore();

  return (
    <Protect
      guard={(store: Store) =>
        store.isSuperUser || store.isRoleAdmin || store.isRoleOfficer
      }
    >
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.animalCensus", "Animal Census"),
              href: "/admin/census/animal/",
            },
            {
              text: t("breadcrumb.enterCensus", "Enter census"),
            },
          ]}
        />
        {router.isReady && store.me && <AnimalCensusCreate />}
      </Layout>
    </Protect>
  );
});

export default AdminAnimalCensusCreatePage;
