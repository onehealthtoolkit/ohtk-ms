import CensusRoundList from "components/admin/censusRound/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminCensusRoundsPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.censusRounds", "Census Rounds"),
            },
          ]}
        />
        <CensusRoundList />
      </Layout>
    </Protect>
  );
};

export default AdminCensusRoundsPage;
