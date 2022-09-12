import { NextPage } from "next";
import Followup from "components/report/followup/followup";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const FollowupPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Followup id={id as string} />
      </Layout>
    </Protect>
  );
};

export default FollowupPage;
