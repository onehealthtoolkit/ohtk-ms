import WebhookEndpointList from "components/admin/integration/webhookEndpointList";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";

const AdminWebhookEndpointsPage: NextPage = () => (
  <Protect guard={(store: Store) => store.isSuperUser}>
    <Layout>
      <Breadcrumb crumbs={[{ text: "Webhook Endpoints" }]} />
      <WebhookEndpointList />
    </Layout>
  </Protect>
);

export default AdminWebhookEndpointsPage;
