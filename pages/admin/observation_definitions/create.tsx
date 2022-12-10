import { NextPage } from "next";
import Layout from "components/layout";
import ObservationDefinitionCreate from "components/admin/observationDefinition/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminObservationDefinitionCreatePage: NextPage = () => {
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
              href: "/admin/observation_definitions",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <ObservationDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminObservationDefinitionCreatePage;
