import { NextPage } from "next";
import AuthorityUpdate from "components/admin/authority/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminAuthorityUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Authorities &raquo; update</div>
        <AuthorityUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityUpdatePage;
