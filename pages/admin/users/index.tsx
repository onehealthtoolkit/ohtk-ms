import UserList from "components/admin/user/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminUsersPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Users" }]} />
        <UserList />
      </Layout>
    </Protect>
  );
};
export default AdminUsersPage;
