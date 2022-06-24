import { NextPage } from "next";
import Layout from "components/layout";
import ReportCategoryCreate from "components/admin/reportCategory/create";
import Protect from "components/auth/protect";

const AdminReportCategoryCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportCategoryCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryCreatePage;
