import { NextPage } from "next";
import NotificationTemplateView from "components/admin/notificationTemplate/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminNotificationTemplateViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
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
              text: t(
                "breadcrumb.notificationTemplates",
                "Notification Templates"
              ),
              href: "/admin/notification_templates",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <NotificationTemplateView />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateViewPage;
