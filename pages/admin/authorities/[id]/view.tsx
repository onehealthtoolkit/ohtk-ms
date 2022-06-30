import { NextPage } from "next";
import AuthorityView from "components/admin/authority/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminAuthorityViewPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Authorities", href: "/admin/authorities" },
            { text: "View" },
          ]}
        />
        <AuthorityView />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityViewPage;
