import CaseList from "components/case/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const CasesPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Cases" }]} />
        <CaseList />
      </Layout>
    </Protect>
  );
};
export default CasesPage;
