import NotificationTemplateList from "components/admin/notificationTemplate/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminNotificationTemplatesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Notification Templates" }]} />
        <NotificationTemplateList />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationTemplatesPage;
