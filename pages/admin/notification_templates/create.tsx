import { NextPage } from "next";
import Layout from "components/layout";
import NotificationTemplateCreate from "components/admin/notificationTemplate/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminNotificationTemplateCreatePage: NextPage = () => {
  const { t } = useTranslation();
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
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <NotificationTemplateCreate />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateCreatePage;
