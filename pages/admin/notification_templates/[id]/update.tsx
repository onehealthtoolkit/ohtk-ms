import { NextPage } from "next";
import NotificationTemplateUpdate from "components/admin/notificationTemplate/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminNotificationTemplateUpdatePage: NextPage = () => {
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
            { text: "Update" },
          ]}
        />
        <NotificationTemplateUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateUpdatePage;
