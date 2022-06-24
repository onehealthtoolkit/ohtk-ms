import { NextPage } from "next";
import ReportCategoryUpdate from "components/admin/reportCategory/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminReportCategoryUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportCategoryUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryUpdatePage;
