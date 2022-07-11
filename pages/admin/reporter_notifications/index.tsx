import ReporterNotificationList from "components/admin/reporterNotification/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminReporterNotificationsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Reporter Notifications" }]} />
        <ReporterNotificationList />
      </Layout>
    </Protect>
  );
};
export default AdminReporterNotificationsPage;
