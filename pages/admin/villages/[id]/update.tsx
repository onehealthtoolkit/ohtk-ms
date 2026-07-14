import VillageUpdate from "components/admin/village/update";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import Layout from "components/layout";
import Spinner from "components/widgets/spinner";
import { Store } from "lib/store";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const AdminVillageUpdatePage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  if (!router.isReady) {
    return <Spinner />;
  }

  return (
    <Protect
      guard={(store: Store) =>
        store.isSuperUser || store.isRoleAdmin || store.isRoleOfficer
      }
    >
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.villages", "Villages"),
              href: "/admin/villages",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <VillageUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminVillageUpdatePage;
