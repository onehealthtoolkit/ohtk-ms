import { NextPage } from "next";
import ObservationDefinitionView from "components/admin/observationDefinition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminObservationDefinitionViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
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
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <ObservationDefinitionView />
      </Layout>
    </Protect>
  );
};

export default AdminObservationDefinitionViewPage;
