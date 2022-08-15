import InvitaionCodeList from "components/admin/invitationCode/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminInvitationCodesPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.invitationCodes", "Invitation codes") },
          ]}
        />
        <InvitaionCodeList />
      </Layout>
    </Protect>
  );
};
export default AdminInvitationCodesPage;
