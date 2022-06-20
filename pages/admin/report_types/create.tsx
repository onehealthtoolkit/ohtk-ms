import { NextPage } from "next";
import Layout from "components/layout";
import ReportTypeCreateForm from "components/admin/reportType/createForm";
import Protect from "components/auth/protect";

const AdminReportTypeCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Type &raquo; create</div>
        <ReportTypeCreateForm />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeCreatePage;
