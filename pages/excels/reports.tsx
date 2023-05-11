import Excel from "components/excel/report";
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
        <Breadcrumb
          crumbs={[
            {
              text: `${t("breadcrumb.reports", "Reports")}`,
            },
          ]}
        />
        <Excel />
      </Layout>
    </Protect>
  );
};
export default ReportsPage;
