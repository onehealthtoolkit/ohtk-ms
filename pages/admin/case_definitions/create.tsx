import { NextPage } from "next";
import Layout from "components/layout";
import CaseDefinitionCreate from "components/admin/caseDefinition/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminCaseDefinitionCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.caseDefinitions", "Case Definitions"),
              href: "/admin/case_definitions",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <CaseDefinitionCreate />
      </Layout>
    </Protect>
  );
};

export default AdminCaseDefinitionCreatePage;
