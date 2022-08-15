import ReporterNotificationList from "components/admin/reporterNotification/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminReporterNotificationsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t(
                "breadcrumb.reporterNotifications",
                "Reporter Notifications"
              ),
            },
          ]}
        />
        <ReporterNotificationList />
      </Layout>
    </Protect>
  );
};
export default AdminReporterNotificationsPage;
