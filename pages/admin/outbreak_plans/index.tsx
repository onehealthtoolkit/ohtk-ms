import OutbreakPlanList from "components/admin/outbreakPlan/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminOutbreakPlansPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[{ text: t("breadcrumb.outbreakPlans", "Outbreak Plans") }]}
        />
        <OutbreakPlanList />
      </Layout>
    </Protect>
  );
};
export default AdminOutbreakPlansPage;
