import { NextPage } from "next";
import Layout from "components/layout";
import InvitationCodeCreate from "components/admin/invitationCode/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminInvitationCodeCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.invitationCodes", "Invitation codes"),
              href: "/admin/invitation_codes",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <InvitationCodeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminInvitationCodeCreatePage;
