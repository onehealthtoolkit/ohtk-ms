import { NextPage } from "next";
import Layout from "components/layout";
import ReportTypeCreate from "components/admin/reportType/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReportTypeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "ReportType", href: "/admin/report_types" },
            { text: "Create" },
          ]}
        />
        <ReportTypeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeCreatePage;
