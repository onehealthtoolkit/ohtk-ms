import ReportList from "components/report/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminAuthoritiesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Reports" }]} />
        <ReportList />
      </Layout>
    </Protect>
  );
};
export default AdminAuthoritiesPage;
