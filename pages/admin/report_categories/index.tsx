import ReportCategoryList from "components/admin/reportCategory/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminReportCategoriesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Report Category" }]} />
        <ReportCategoryList />
      </Layout>
    </Protect>
  );
};
export default AdminReportCategoriesPage;
