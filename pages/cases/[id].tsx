import { NextPage } from "next";
import Case from "components/case/case";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const CasePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Case id={id as string} />
      </Layout>
    </Protect>
  );
};

export default CasePage;
