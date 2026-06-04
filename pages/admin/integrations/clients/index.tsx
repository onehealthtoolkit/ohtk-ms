import IntegrationClientList from "components/admin/integration/clientList";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";

const AdminIntegrationClientsPage: NextPage = () => (
  <Protect guard={(store: Store) => store.isSuperUser}>
    <Layout>
      <Breadcrumb crumbs={[{ text: "Integration Clients" }]} />
      <IntegrationClientList />
    </Layout>
  </Protect>
);

export default AdminIntegrationClientsPage;
