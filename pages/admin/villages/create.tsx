import VillageCreate from "components/admin/village/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminVillageCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser || store.isRoleAdmin}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.villages", "Villages"),
              href: "/admin/villages",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <VillageCreate />
      </Layout>
    </Protect>
  );
};

export default AdminVillageCreatePage;
