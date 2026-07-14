import VillageList from "components/admin/village/list";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminVillagesPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect
      guard={(store: Store) =>
        store.isSuperUser || store.isRoleAdmin || store.isRoleOfficer
      }
    >
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.villages", "Villages") }]} />
        <VillageList />
      </Layout>
    </Protect>
  );
};

export default AdminVillagesPage;
