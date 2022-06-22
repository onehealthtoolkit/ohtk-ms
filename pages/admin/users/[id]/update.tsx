import { NextPage } from "next";
import UserUpdate from "components/admin/user/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminUserUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Users &raquo; update</div>
        <UserUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminUserUpdatePage;
