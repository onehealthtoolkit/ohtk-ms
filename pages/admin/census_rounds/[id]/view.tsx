import { NextPage } from "next";
import CensusRoundView from "components/admin/censusRound/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminCensusRoundViewPage: NextPage = () => {
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
              text: t("breadcrumb.censusRounds", "Census Rounds"),
              href: "/admin/census_rounds",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <CensusRoundView />
      </Layout>
    </Protect>
  );
};

export default AdminCensusRoundViewPage;
