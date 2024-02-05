import { NextPage } from "next";
import Case from "components/case/case";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const CasePage: NextPage = () => {
  const { t } = useTranslation();

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
            { text: t("breadcrumb.cases", "Cases"), href: "/cases" },
            { text: id as string },
          ]}
        />
        <Case id={id as string} />
      </Layout>
    </Protect>
  );
};

export default CasePage;
