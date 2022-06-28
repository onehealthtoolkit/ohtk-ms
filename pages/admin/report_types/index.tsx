import ReportTypeList from "components/admin/reportType/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminReportTypesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Report Type" }]} />
        <ReportTypeList />
      </Layout>
    </Protect>
  );
};
export default AdminReportTypesPage;
