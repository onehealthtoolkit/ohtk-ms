import { NextPage } from "next";
import Layout from "components/layout";
import InvitationCodeCreate from "components/admin/invitationCode/create";
import Protect from "components/auth/protect";

const AdminInvitationCodeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Invitation Codes &raquo; create</div>
        <InvitationCodeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeCreatePage;
