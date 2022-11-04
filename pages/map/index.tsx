import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import MapView from "components/map/view";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ReportsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.map", "Map") }]} />
        <MapView />
      </Layout>
    </Protect>
  );
};
export default ReportsPage;
