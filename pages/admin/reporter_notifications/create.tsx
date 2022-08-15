import { NextPage } from "next";
import Layout from "components/layout";
import ReporterNotificationCreate from "components/admin/reporterNotification/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminReporterNotificationCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t(
                "breadcrumb.reporterNotifications",
                "Reporter Notifications"
              ),
              href: "/admin/reporter_notifications",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <ReporterNotificationCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReporterNotificationCreatePage;
