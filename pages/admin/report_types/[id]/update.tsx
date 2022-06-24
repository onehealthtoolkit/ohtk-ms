import { NextPage } from "next";
import ReportTypeUpdate from "components/admin/reportType/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const AdminReportTypeUpdatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportTypeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeUpdatePage;
