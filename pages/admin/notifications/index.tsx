import Notification from "components/admin/notification/notification";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminNotificationsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.notifications", "Notifications") }]}
        />
        <Notification />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationsPage;
