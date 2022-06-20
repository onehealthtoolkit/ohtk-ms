import { NextPage } from "next";
import Layout from "components/layout";
import UserCreateForm from "components/admin/user/createForm";
import Protect from "components/auth/protect";

const AdminUserCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Users &raquo; create</div>
        <UserCreateForm />
      </Layout>
    </Protect>
  );
};

export default AdminUserCreatePage;
