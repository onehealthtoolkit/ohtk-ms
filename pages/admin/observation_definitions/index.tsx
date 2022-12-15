import ObservationDefinitionList from "components/admin/observationDefinition/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminObservationDefinitionsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t(
                "breadcrumb.observationDefinitions",
                "Observation Definitions"
              ),
            },
          ]}
        />
        <ObservationDefinitionList />
      </Layout>
    </Protect>
  );
};
export default AdminObservationDefinitionsPage;
