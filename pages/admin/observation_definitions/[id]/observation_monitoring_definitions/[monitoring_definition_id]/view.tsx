import { NextPage } from "next";
import ObservationMonitoringDefinitionView from "components/admin/observationDefinition/observationMonitoringDefinition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const AdminObservationMonitoringDefinitionViewPage: NextPage = () => {
  const router = useRouter();
  const { monitoring_definition_id } = router.query;
  if (!monitoring_definition_id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <ObservationMonitoringDefinitionView />
      </Layout>
    </Protect>
  );
};

export default AdminObservationMonitoringDefinitionViewPage;
