import { NextPage } from "next";
import Layout from "components/layout";
import ObservationMonitoringDefinitionCreate from "components/admin/observationDefinition/observationMonitoringDefinition/create";
import Protect from "components/auth/protect";

const AdminObservationMonitoringDefinitionCreatePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <ObservationMonitoringDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminObservationMonitoringDefinitionCreatePage;
