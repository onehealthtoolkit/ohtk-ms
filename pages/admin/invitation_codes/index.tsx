import InvitaionCodeList from "components/admin/invitationCode/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminInvitationCodesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Invitation codes" }]} />
        <InvitaionCodeList />
      </Layout>
    </Protect>
  );
};
export default AdminInvitationCodesPage;
