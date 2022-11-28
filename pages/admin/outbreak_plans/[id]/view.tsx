import { NextPage } from "next";
import OutbreakPlanView from "components/admin/outbreakPlan/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminOutbreakPlanViewPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.outbreakPlans", "Outbreak Plans"),
              href: "/admin/outbreak_plans",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <OutbreakPlanView />
      </Layout>
    </Protect>
  );
};

export default AdminOutbreakPlanViewPage;
