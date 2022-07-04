import { NextPage } from "next";
import Report from "components/report/report";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";

const ReportPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Report id={id as string} />
      </Layout>
    </Protect>
  );
};

export default ReportPage;
