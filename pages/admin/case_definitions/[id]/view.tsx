import { NextPage } from "next";
import CaseDefinitionView from "components/admin/caseDefinition/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminCaseDefinitionViewPage: NextPage = () => {
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
              text: t("breadcrumb.caseDefinitions", "Case Definitions"),
              href: "/admin/case_definitions",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <CaseDefinitionView />
      </Layout>
    </Protect>
  );
};

export default AdminCaseDefinitionViewPage;
