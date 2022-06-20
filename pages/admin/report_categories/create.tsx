import { NextPage } from "next";
import Layout from "components/layout";
import ReportCategoryCreateForm from "components/admin/reportCategory/createForm";
import Protect from "components/auth/protect";

const AdminReportCategoryCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Category &raquo; create</div>
        <ReportCategoryCreateForm />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryCreatePage;
