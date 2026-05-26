import CensusDefinitionList from "components/admin/censusDefinition/list";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminCensusDefinitionsPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.censusDefinition", "Census Definition"),
            },
          ]}
        />
        <CensusDefinitionList />
      </Layout>
    </Protect>
  );
};

export default AdminCensusDefinitionsPage;
