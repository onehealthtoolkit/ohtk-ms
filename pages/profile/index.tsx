import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import ProfileUpdate from "components/profile/update";
import { NextPage } from "next";

const ProfilePage: NextPage = () => {
  return (
    <Protect>
      <Layout>
        <Breadcrumb crumbs={[{ text: "Profile" }]} />
        <ProfileUpdate />
      </Layout>
    </Protect>
  );
};

export default ProfilePage;
