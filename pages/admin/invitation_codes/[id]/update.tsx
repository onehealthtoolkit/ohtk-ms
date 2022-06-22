import { NextPage } from "next";
import InvitationCodeUpdate from "components/admin/invitationCode/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminInvitationCodeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Invitation Codes &raquo; update</div>
        <InvitationCodeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeUpdatePage;
