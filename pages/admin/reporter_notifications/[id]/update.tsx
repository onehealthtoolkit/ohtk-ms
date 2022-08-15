import { NextPage } from "next";
import ReporterNotificationUpdate from "components/admin/reporterNotification/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminReporterNotificationUpdatePage: NextPage = () => {
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
                "breadcrumb.reporterNotifications",
                "Reporter Notifications"
              ),
              href: "/admin/reporter_notifications",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <ReporterNotificationUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReporterNotificationUpdatePage;
