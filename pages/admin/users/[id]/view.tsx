import { NextPage } from "next";
import UserView from "components/admin/user/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminUserViewPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Users", href: "/admin/users" }, { text: "View" }]}
        />
        <UserView />
      </Layout>
    </Protect>
  );
};

export default AdminUserViewPage;
