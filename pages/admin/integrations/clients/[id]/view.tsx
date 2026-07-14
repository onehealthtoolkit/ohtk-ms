import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "components/layout";
import IntegrationClientView from "components/admin/integration/clientView";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";

const AdminIntegrationClientViewPage: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) return <Spinner />;

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: "Integration Clients",
              href: "/admin/integrations/clients",
            },
            { text: "View" },
          ]}
        />
        <IntegrationClientView />
      </Layout>
    </Protect>
  );
};

export default AdminIntegrationClientViewPage;
