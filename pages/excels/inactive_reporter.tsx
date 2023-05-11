import Excel from "components/excel/inactiveReporter";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const InactiveReporterPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t("breadcrumb.inactiveReporter", "Inactive Reporter")}`,
            },
          ]}
        />
        <Excel />
      </Layout>
    </Protect>
  );
};
export default InactiveReporterPage;
