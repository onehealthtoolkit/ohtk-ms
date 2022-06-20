import { NextPage } from "next";
import Layout from "components/layout";
import InvitationCodeCreateForm from "components/admin/invitationCode/createForm";
import Protect from "components/auth/protect";

const AdminInvitationCodeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Invitation Codes &raquo; create</div>
        <InvitationCodeCreateForm />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeCreatePage;
