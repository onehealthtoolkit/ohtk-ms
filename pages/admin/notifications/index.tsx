import NotificationList from "components/admin/reporterNotification/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminNotificationsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Notification Templates" }]} />
        <NotificationList />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationsPage;
