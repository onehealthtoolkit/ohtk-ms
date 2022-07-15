import { NextPage } from "next";
import Layout from "components/layout";
import StateDefinitionCreate from "components/admin/stateDefinition/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";

const AdminStateDefinitionCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "State Definition",
              href: "/admin/state_definitions",
            },
            { text: "Create" },
          ]}
        />
        <StateDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminStateDefinitionCreatePage;
