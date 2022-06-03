import AuthorityList from "components/admin/authority/list";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminAuthoritiesPage: NextPage = () => {
  return (
    <Layout>
      <AuthorityList />
    </Layout>
  );
};
export default AdminAuthoritiesPage;
