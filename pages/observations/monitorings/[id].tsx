import { NextPage } from "next";
import ObservationSubjectMonitoring from "components/observation/monitoring/observationSubjectMonitoring";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const ObservationSubjectMonitoringPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id } = router.query;
  if (!id) {
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
            {
              text: `${t("breadcrumb.observationSubject", "Subject")} - ${
                router.query.subjectId
              }`,
              href: `/observations/${router.query.subjectId}/?definitionId=${router.query.definitionId}&definitionName=${router.query.definitionName}`,
            },
            { text: id as string },
          ]}
        />
        <ObservationSubjectMonitoring id={id as string} />
      </Layout>
    </Protect>
  );
};

export default ObservationSubjectMonitoringPage;
