import { NextPage } from "next";
import Layout from "components/layout";
import IntegrationClientCreate from "components/admin/integration/clientCreate";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";

const AdminIntegrationClientCreatePage: NextPage = () => (
  <Protect guard={(store: Store) => store.isSuperUser}>
    <Layout>
      <Breadcrumb
        crumbs={[
          { text: "Integration Clients", href: "/admin/integrations/clients" },
          { text: "Create" },
        ]}
      />
      <IntegrationClientCreate />
    </Layout>
  </Protect>
);

export default AdminIntegrationClientCreatePage;
