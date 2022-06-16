import { NextPage } from "next";
import Layout from "components/layout";
import AuthorityCreateForm from "components/admin/authority/createForm";
import Protect from "components/auth/protect";

const AdminAuthorityCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Authorities &raquo; create</div>
        <AuthorityCreateForm />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityCreatePage;
