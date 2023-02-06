import { NextPage } from "next";
import Layout from "components/layout";
import PlaceCreate from "components/admin/place/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { Store } from "lib/store";
import { useTranslation } from "react-i18next";

const AdminPlaceCreatePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Protect guard={(store: Store) => store.isSuperUser || store.isRoleAdmin}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.places", "Places"),
              href: "/admin/places",
            },
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <PlaceCreate />
      </Layout>
    </Protect>
  );
};

export default AdminPlaceCreatePage;
