import IntegrationPolicySettings from "components/admin/integration/policySettings";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";

const AdminIntegrationSettingsPage: NextPage = () => (
  <Protect guard={(store: Store) => store.isSuperUser}>
    <Layout>
      <Breadcrumb crumbs={[{ text: "Integration Settings" }]} />
      <IntegrationPolicySettings />
    </Layout>
  </Protect>
);

export default AdminIntegrationSettingsPage;
