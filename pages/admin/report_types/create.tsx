import { NextPage } from "next";
import Layout from "components/layout";
import ReportTypeCreate from "components/admin/reportType/create";
import Protect from "components/auth/protect";

const AdminReportTypeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportTypeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeCreatePage;
