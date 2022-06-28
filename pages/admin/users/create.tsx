import { NextPage } from "next";
import Layout from "components/layout";
import UserCreate from "components/admin/user/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminUserCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Users", href: "/admin/users" }, { text: "Create" }]}
        />
        <UserCreate />
      </Layout>
    </Protect>
  );
};

export default AdminUserCreatePage;
