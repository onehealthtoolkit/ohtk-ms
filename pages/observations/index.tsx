import ObservationList from "components/observation/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const ObservationsPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t("breadcrumb.observations", "Observations")} - ${
                router.query.definitionName
              }`,
            },
          ]}
        />
        <ObservationList />
      </Layout>
    </Protect>
  );
};
export default ObservationsPage;
