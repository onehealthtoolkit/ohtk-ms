import { NextPage } from "next";
import ReportTypeView from "components/admin/reportType/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReportTypeViewPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "ReportType", href: "/admin/report_types" },
            { text: "View" },
          ]}
        />
        <ReportTypeView />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeViewPage;
