import ReportTypeList from "components/admin/reportType/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import { NextPage } from "next";

const AdminReportTypesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ReportTypeList />
      </Layout>
    </Protect>
  );
};
export default AdminReportTypesPage;
