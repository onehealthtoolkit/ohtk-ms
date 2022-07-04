import { NextPage } from "next";
import Report from "components/report/report";
import Layout from "components/layout";
import Protect from "components/auth/protect";

const ReportPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Report />
      </Layout>
    </Protect>
  );
};

export default ReportPage;
