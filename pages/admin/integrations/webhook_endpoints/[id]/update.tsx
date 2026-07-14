import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "components/layout";
import WebhookEndpointUpdate from "components/admin/integration/webhookEndpointUpdate";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";

const AdminWebhookEndpointUpdatePage: NextPage = () => {
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
            { text: "Update" },
          ]}
        />
        <WebhookEndpointUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminWebhookEndpointUpdatePage;
