import { NextPage } from "next";
import ReportTypeUpdate from "components/admin/reportType/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReportTypeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "ReportType", href: "/admin/report_types" },
            { text: "Update" },
          ]}
        />
        <ReportTypeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeUpdatePage;
