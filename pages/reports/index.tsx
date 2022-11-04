import ReportList from "components/report/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ReportsPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.reports", "Reports") }]} />
        <ReportList />
      </Layout>
    </Protect>
  );
};
export default ReportsPage;
