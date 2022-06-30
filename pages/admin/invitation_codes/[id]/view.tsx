import { NextPage } from "next";
import InvitationCodeView from "components/admin/invitationCode/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminInvitationCodeViewPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Invitation codes", href: "/admin/invitation_codes" },
            { text: "View" },
          ]}
        />
        <InvitationCodeView />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeViewPage;
