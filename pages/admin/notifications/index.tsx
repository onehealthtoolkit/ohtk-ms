import Notification from "components/admin/notification/notification";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminNotificationsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Notifications" }]} />
        <Notification />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationsPage;
