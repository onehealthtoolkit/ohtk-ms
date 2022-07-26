import { NextPage } from "next";
import Layout from "components/layout";
import NotificationTemplateCreate from "components/admin/notificationTemplate/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminNotificationTemplateCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "Notification templates",
              href: "/admin/notification_templates",
            },
            { text: "Create" },
          ]}
        />
        <NotificationTemplateCreate />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateCreatePage;
