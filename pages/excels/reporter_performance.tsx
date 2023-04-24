import Excel from "components/excel/reporterPerformance";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ReporterPerformancePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t(
                "breadcrumb.reporterPerformance",
                "Reporter performance"
              )}`,
            },
          ]}
        />
        <Excel />
      </Layout>
    </Protect>
  );
};
export default ReporterPerformancePage;
