import { NextPage } from "next";
import Layout from "components/layout";
import ReportTypeCreate from "components/admin/reportType/create";
import Protect from "components/auth/protect";

const AdminReportTypeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Type &raquo; create</div>
        <ReportTypeCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeCreatePage;
