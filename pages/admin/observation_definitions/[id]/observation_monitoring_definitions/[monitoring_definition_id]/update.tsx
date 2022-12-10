import { NextPage } from "next";
import ObservationMonitoringDefinitionUpdate from "components/admin/observationDefinition/observationMonitoringDefinition/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminObservationMonitoringDefinitionUpdatePage: NextPage = () => {
  const router = useRouter();
  const { monitoring_definition_id } = router.query;
  if (!monitoring_definition_id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <ObservationMonitoringDefinitionUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminObservationMonitoringDefinitionUpdatePage;
