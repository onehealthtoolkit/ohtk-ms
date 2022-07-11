import { NextPage } from "next";
import Layout from "components/layout";
import CaseDefinitionCreate from "components/admin/caseDefinition/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminCaseDefinitionCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Case Definitions", href: "/admin/case_definitions" },
            { text: "Create" },
          ]}
        />
        <CaseDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminCaseDefinitionCreatePage;
