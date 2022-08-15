import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import ProfileUpdate from "components/admin/profile/update";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ProfilePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: t("breadcrumb.profile", "Profile") }]} />
        <ProfileUpdate />
      </Layout>
    </Protect>
  );
};

export default ProfilePage;
