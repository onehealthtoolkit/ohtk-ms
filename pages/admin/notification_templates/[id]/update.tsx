import { NextPage } from "next";
import NotificationTemplateUpdate from "components/admin/notificationTemplate/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminNotificationTemplateUpdatePage: NextPage = () => {
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
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <NotificationTemplateUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminNotificationTemplateUpdatePage;
