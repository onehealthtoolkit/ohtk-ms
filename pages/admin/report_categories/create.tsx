import { NextPage } from "next";
import Layout from "components/layout";
import ReportCategoryCreate from "components/admin/reportCategory/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReportCategoryCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Report Category", href: "/admin/report_categories" },
            { text: "Create" },
          ]}
        />
        <ReportCategoryCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryCreatePage;
