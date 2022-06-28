import { NextPage } from "next";
import InvitationCodeUpdate from "components/admin/invitationCode/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminInvitationCodeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Invitation codes", href: "/admin/invitation_codes" },
            { text: "Update" },
          ]}
        />
        <InvitationCodeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeUpdatePage;
