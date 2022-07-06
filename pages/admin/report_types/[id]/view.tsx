import { NextPage } from "next";
import ReportTypeView from "components/admin/reportType/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminReportTypeViewPage: NextPage = () => {
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
            { text: "View" },
          ]}
        />
        <ReportTypeView />
      </Layout>
    </Protect>
  );
};

export default AdminReportTypeViewPage;
