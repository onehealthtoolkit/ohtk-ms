import { NextPage } from "next";
import Layout from "components/layout";
import UserCreate from "components/admin/user/create";
import Protect from "components/auth/protect";

const AdminUserCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <UserCreate />
      </Layout>
    </Protect>
  );
};

export default AdminUserCreatePage;
