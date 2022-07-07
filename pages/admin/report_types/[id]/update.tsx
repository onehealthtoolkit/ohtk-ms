import { NextPage } from "next";
import ReportTypeUpdate from "components/admin/reportType/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminReportTypeUpdatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "ReportType", href: "/admin/report_types" },
            { text: "Update" },
          ]}
        />
        <ReportTypeUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeUpdatePage;
