import ReportCategoryList from "components/admin/reportCategory/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminReportCategoriesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportCategoryList />
      </Layout>
    </Protect>
  );
};
export default AdminReportCategoriesPage;
