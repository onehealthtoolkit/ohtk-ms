import { NextPage } from "next";
import Layout from "components/layout";
import AuthorityCreate from "components/admin/authority/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminAuthorityCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.authorities", "Authorities"),
              href: "/admin/authorities",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <AuthorityCreate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityCreatePage;
