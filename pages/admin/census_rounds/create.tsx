import { NextPage } from "next";
import Layout from "components/layout";
import CensusRoundCreate from "components/admin/censusRound/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminCensusRoundCreatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.censusRounds", "Census Rounds"),
              href: "/admin/census_rounds",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <CensusRoundCreate />
      </Layout>
    </Protect>
  );
};

export default AdminCensusRoundCreatePage;
