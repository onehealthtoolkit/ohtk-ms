import { NextPage } from "next";
import AuthorityUpdate from "components/admin/authority/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminAuthorityUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Authorities", href: "/admin/authorities" },
            { text: "Update" },
          ]}
        />
        <AuthorityUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityUpdatePage;
