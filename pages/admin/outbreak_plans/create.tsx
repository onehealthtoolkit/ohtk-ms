import { NextPage } from "next";
import Layout from "components/layout";
import OutbreakPlanCreate from "components/admin/outbreakPlan/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminOutbreakPlanCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.outbreakPlans", "OutbreakPlans"),
              href: "/admin/outbreak_plans",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <OutbreakPlanCreate />
      </Layout>
    </Protect>
  );
};

export default AdminOutbreakPlanCreatePage;
