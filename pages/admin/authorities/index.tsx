import AuthorityList from "components/admin/authority/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminAuthoritiesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Authorities" }]} />
        <AuthorityList />
      </Layout>
    </Protect>
  );
};
export default AdminAuthoritiesPage;
