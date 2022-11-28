import { NextPage } from "next";
import PlaceView from "components/admin/place/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminPlaceViewPage: NextPage = () => {
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
              text: t("breadcrumb.places", "Outbreak Plans"),
              href: "/admin/places",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <PlaceView />
      </Layout>
    </Protect>
  );
};

export default AdminPlaceViewPage;
