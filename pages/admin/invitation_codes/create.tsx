import { NextPage } from "next";
import Layout from "components/layout";
import InvitationCodeCreate from "components/admin/invitationCode/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminInvitationCodeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Invitation codes", href: "/admin/invitation_codes" },
            { text: "Create" },
          ]}
        />
        <InvitationCodeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeCreatePage;
