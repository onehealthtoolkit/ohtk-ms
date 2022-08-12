import StateDefinitionList from "components/admin/stateDefinition/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminStateDefinitionsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.stateDefinitions", "State Definitions") },
          ]}
        />
        <StateDefinitionList />
      </Layout>
    </Protect>
  );
};
export default AdminStateDefinitionsPage;
