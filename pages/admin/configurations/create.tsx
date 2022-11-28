import { NextPage } from "next";
import Layout from "components/layout";
import ConfigurationCreate from "components/admin/configuration/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminConfigurationCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.configurations", "Configurations"),
              href: "/admin/configurations",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <ConfigurationCreate />
      </Layout>
    </Protect>
  );
};

export default AdminConfigurationCreatePage;
