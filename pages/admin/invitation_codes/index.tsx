import InvitaionCodeList from "components/admin/invitationCode/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminInvitationCodesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <InvitaionCodeList />
      </Layout>
    </Protect>
  );
};
export default AdminInvitationCodesPage;
