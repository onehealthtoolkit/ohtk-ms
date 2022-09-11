import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import MapView from "components/map/view";
import { NextPage } from "next";

const ReportsPage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Map" }]} />
        <MapView />
      </Layout>
    </Protect>
  );
};
export default ReportsPage;
