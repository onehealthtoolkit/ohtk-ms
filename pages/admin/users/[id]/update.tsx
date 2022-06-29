import { NextPage } from "next";
import UserUpdate from "components/admin/user/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminUserUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Users", href: "/admin/users" }, { text: "Update" }]}
        />
        <UserUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminUserUpdatePage;
