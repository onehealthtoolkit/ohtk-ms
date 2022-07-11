import { NextPage } from "next";
import Layout from "components/layout";
import ReporterNotificationCreate from "components/admin/reporterNotification/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReporterNotificationCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "Reporter Notification",
              href: "/admin/reporter_notifications",
            },
            { text: "Create" },
          ]}
        />
        <ReporterNotificationCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReporterNotificationCreatePage;
