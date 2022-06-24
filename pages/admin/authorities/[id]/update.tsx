import { NextPage } from "next";
import AuthorityUpdate from "components/admin/authority/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminAuthorityUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <AuthorityUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityUpdatePage;
