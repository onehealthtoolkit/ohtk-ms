import { NextPage } from "next";
import Layout from "components/layout";
import WebhookEndpointCreate from "components/admin/integration/webhookEndpointCreate";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";

const AdminWebhookEndpointCreatePage: NextPage = () => (
  <Protect guard={(store: Store) => store.isSuperUser}>
    <Layout>
      <Breadcrumb
        crumbs={[
          {
            text: "Webhook Endpoints",
            href: "/admin/integrations/webhook_endpoints",
          },
          { text: "Create" },
        ]}
      />
      <WebhookEndpointCreate />
    </Layout>
  </Protect>
);

export default AdminWebhookEndpointCreatePage;
