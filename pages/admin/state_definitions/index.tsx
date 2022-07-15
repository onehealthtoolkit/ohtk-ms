import StateDefinitionList from "components/admin/stateDefinition/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";

const AdminStateDefinitionsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "State Definitions" }]} />
        <StateDefinitionList />
      </Layout>
    </Protect>
  );
};
export default AdminStateDefinitionsPage;
