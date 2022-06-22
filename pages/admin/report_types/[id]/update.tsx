import { NextPage } from "next";
import ReportTypeUpdate from "components/admin/reportType/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminReportTypeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Type &raquo; update</div>
        <ReportTypeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeUpdatePage;
