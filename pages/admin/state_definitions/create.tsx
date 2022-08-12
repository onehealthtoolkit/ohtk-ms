import { NextPage } from "next";
import Layout from "components/layout";
import StateDefinitionCreate from "components/admin/stateDefinition/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminStateDefinitionCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.stateDefinitions", "State Definitions"),
              href: "/admin/state_definitions",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <StateDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminStateDefinitionCreatePage;
