import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "components/layout";
import WebhookEndpointView from "components/admin/integration/webhookEndpointView";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";

const AdminWebhookEndpointViewPage: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <Spinner />;

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "Webhook Endpoints",
              href: "/admin/integrations/webhook_endpoints",
            },
            { text: "View" },
          ]}
        />
        <WebhookEndpointView />
      </Layout>
    </Protect>
  );
};

export default AdminWebhookEndpointViewPage;
