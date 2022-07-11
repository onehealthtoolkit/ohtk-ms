import CaseDefinitionList from "components/admin/caseDefinition/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminCaseDefinitionsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Case Definitions" }]} />
        <CaseDefinitionList />
      </Layout>
    </Protect>
  );
};
export default AdminCaseDefinitionsPage;
