import { NextPage } from "next";
import ReporterNotificationUpdate from "components/admin/reporterNotification/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminReporterNotificationUpdatePage: NextPage = () => {
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
            { text: "Update" },
          ]}
        />
        <ReporterNotificationUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReporterNotificationUpdatePage;
