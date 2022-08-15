import { NextPage } from "next";
import StateDefinitionView from "components/admin/stateDefinition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminStateDefinitionViewPage: NextPage = () => {
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
              text: t("breadcrumb.stateDefinitions", "State Definitions"),
              href: "/admin/state_definitions",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <StateDefinitionView />
      </Layout>
    </Protect>
  );
};

export default AdminStateDefinitionViewPage;
