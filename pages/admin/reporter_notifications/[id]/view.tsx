import { NextPage } from "next";
import ReporterNotificationView from "components/admin/reporterNotification/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminReporterNotificationViewPage: NextPage = () => {
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
              text: "Reporter Notification",
              href: "/admin/reporter_notifications",
            },
            { text: "View" },
          ]}
        />
        <ReporterNotificationView />
      </Layout>
    </Protect>
  );
};

export default AdminReporterNotificationViewPage;
