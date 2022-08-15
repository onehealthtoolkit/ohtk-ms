import CaseDefinitionList from "components/admin/caseDefinition/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminCaseDefinitionsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: t("breadcrumb.caseDefinitions", "Case Definitions") },
          ]}
        />
        <CaseDefinitionList />
      </Layout>
    </Protect>
  );
};
export default AdminCaseDefinitionsPage;
