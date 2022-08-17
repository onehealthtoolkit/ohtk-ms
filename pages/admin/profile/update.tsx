import { NextPage } from "next";
import ProfileInfoUpdate from "components/admin/profile/updateInfo";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const ProfileUpdatePage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.profile", "Profile"),
              href: "/admin/profile",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <ProfileInfoUpdate />
      </Layout>
    </Protect>
  );
};

export default ProfileUpdatePage;
