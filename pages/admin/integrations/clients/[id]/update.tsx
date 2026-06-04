import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "components/layout";
import IntegrationClientUpdate from "components/admin/integration/clientUpdate";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";

const AdminIntegrationClientUpdatePage: NextPage = () => {
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
            { text: "Update" },
          ]}
        />
        <IntegrationClientUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminIntegrationClientUpdatePage;
