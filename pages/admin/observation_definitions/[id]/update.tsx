import { NextPage } from "next";
import ObservationDefinitionUpdate from "components/admin/observationDefinition/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminObservationDefinitionUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
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
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <ObservationDefinitionUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminObservationDefinitionUpdatePage;
