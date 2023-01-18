import { NextPage } from "next";
import ObservationSubject from "components/observation/observationSubject";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const ObservationSubjectPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { subjectId } = router.query;
  if (!subjectId) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: `${t("breadcrumb.observations", "Observations")} - ${
                router.query.definitionName
              }`,
              href: `/observations/?definitionId=${router.query.definitionId}&definitionName=${router.query.definitionName}`,
            },
            { text: subjectId as string },
          ]}
        />
        <ObservationSubject id={subjectId as string} />
      </Layout>
    </Protect>
  );
};

export default ObservationSubjectPage;
