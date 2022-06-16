import UserList from "components/admin/user/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminUsersPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <UserList />
      </Layout>
    </Protect>
  );
};
export default AdminUsersPage;
