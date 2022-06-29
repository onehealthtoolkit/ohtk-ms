import { NextPage } from "next";
import Layout from "components/layout";
import AuthorityCreate from "components/admin/authority/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminAuthorityCreatePage: NextPage = () => {
  return (
    <Protect>
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
