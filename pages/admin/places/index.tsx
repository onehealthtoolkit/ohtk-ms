import PlaceList from "components/admin/place/list";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const AdminPlacesPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect
      guard={(store: Store) =>
        store.isRoleOfficer || store.isRoleAdmin || store.isSuperUser
      }
    >
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.places", "Places") }]} />
        <PlaceList />
      </Layout>
    </Protect>
  );
};
export default AdminPlacesPage;
