import Excel from "components/excel/zeroReporter";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ZeroReporterPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t("breadcrumb.zeroReporter", "Zero Reporter")}`,
            },
          ]}
        />
        <Excel />
      </Layout>
    </Protect>
  );
};
export default ZeroReporterPage;
