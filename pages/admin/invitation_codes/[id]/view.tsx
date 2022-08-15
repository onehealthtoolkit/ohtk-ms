import { NextPage } from "next";
import InvitationCodeView from "components/admin/invitationCode/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminInvitationCodeViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.invitationCodes", "Invitation codes"),
              href: "/admin/invitation_codes",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <InvitationCodeView />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeViewPage;
