import { NextPage } from "next";
import CensusRoundUpdate from "components/admin/censusRound/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminCensusRoundUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
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
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <CensusRoundUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminCensusRoundUpdatePage;
