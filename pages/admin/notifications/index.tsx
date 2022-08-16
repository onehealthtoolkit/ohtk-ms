import NotificationUpsert from "components/admin/notification/upsert";
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
        <NotificationUpsert />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationsPage;
