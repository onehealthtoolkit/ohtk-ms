import AuthorityList from "components/admin/authority/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminAuthoritiesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <AuthorityList />
      </Layout>
    </Protect>
  );
};
export default AdminAuthoritiesPage;
