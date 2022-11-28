import ConfigurationList from "components/admin/configuration/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminConfigurationsPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.configurations", "Configurations") }]}
        />
        <ConfigurationList />
      </Layout>
    </Protect>
  );
};
export default AdminConfigurationsPage;
