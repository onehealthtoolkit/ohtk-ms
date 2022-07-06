import { NextPage } from "next";
import InvitationCodeView from "components/admin/invitationCode/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminInvitationCodeViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
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
