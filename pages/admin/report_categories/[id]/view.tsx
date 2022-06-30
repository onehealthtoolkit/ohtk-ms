import { NextPage } from "next";
import ReportCategoryView from "components/admin/authority/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminReportCategoryViewPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Report Category", href: "/admin/report_categories" },
            { text: "View" },
          ]}
        />
        <ReportCategoryView />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryViewPage;
