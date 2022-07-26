import { NextPage } from "next";
import NotificationTemplateView from "components/admin/notificationTemplate/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminNotificationTemplateViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "Notification templates",
              href: "/admin/notification_templates",
            },
            { text: "View" },
          ]}
        />
        <NotificationTemplateView />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateViewPage;
