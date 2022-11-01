import CaseList from "components/case/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const CasesPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.cases", "Cases") }]} />
        <CaseList />
      </Layout>
    </Protect>
  );
};
export default CasesPage;
