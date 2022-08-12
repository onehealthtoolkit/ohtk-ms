import AuthorityList from "components/admin/authority/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminAuthoritiesPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.authorities", "Authorities") }]}
        />
        <AuthorityList />
      </Layout>
    </Protect>
  );
};
export default AdminAuthoritiesPage;
