import { NextPage } from "next";
import Report from "components/report/report";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const ReportPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: "Reports", href: "/reports" }, { text: "Detail" }]}
        />
        <Report />
      </Layout>
    </Protect>
  );
};

export default ReportPage;
