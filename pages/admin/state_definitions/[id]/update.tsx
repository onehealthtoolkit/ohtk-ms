import { NextPage } from "next";
import StateDefinitionUpdate from "components/admin/stateDefinition/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminStateDefinitionUpdatePage: NextPage = () => {
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
              text: t("breadcrumb.stateDefinitions", "State Definitions"),
              href: "/admin/state_definitions",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <StateDefinitionUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminStateDefinitionUpdatePage;
