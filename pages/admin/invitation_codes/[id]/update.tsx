import { NextPage } from "next";
import InvitationCodeUpdate from "components/admin/invitationCode/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminInvitationCodeUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
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
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <InvitationCodeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeUpdatePage;
