import { NextPage } from "next";
import Layout from "components/layout";
import AuthorityCreate from "components/admin/authority/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";

const AdminAuthorityCreatePage: NextPage = () => {
  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Authorities", href: "/admin/authorities" },
            { text: "Create" },
          ]}
        />
        <AuthorityCreate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityCreatePage;
