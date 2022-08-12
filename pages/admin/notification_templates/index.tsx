import NotificationTemplateList from "components/admin/notificationTemplate/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminNotificationTemplatesPage: NextPage = () => {
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
            },
          ]}
        />
        <NotificationTemplateList />
      </Layout>
    </Protect>
  );
};
export default AdminNotificationTemplatesPage;
