import { NextPage } from "next";
import InvitationCodeUpdate from "components/admin/invitationCode/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminInvitationCodeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <InvitationCodeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeUpdatePage;
