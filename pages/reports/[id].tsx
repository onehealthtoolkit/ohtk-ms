import { NextPage } from "next";
import Report from "components/report/report";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import Breadcrumb from "components/layout/breadcrumb";

const ReportPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            { text: "Reports", href: "/reports" },
            { text: id as string },
          ]}
        />
        <Report id={id as string} />
      </Layout>
    </Protect>
  );
};

export default ReportPage;
