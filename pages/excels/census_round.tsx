import CensusRoundExcel from "components/excel/censusRound";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const CensusRoundExcelPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.censusRoundExport", "Census Round Export"),
            },
          ]}
        />
        <CensusRoundExcel />
      </Layout>
    </Protect>
  );
};

export default CensusRoundExcelPage;
