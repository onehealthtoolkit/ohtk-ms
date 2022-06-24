import { NextPage } from "next";
import Layout from "components/layout";
import AuthorityCreate from "components/admin/authority/create";
import Protect from "components/auth/protect";

const AdminAuthorityCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <AuthorityCreate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityCreatePage;
