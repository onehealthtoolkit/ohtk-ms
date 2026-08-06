import ReportCreate from "components/report/create";
import Protect from "components/auth/protect";
import Layout from "components/layout";
import Breadcrumb from "components/layout/breadcrumb";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import useStore from "lib/store";

const ReportCreatePage: NextPage = () => {
  const { t } = useTranslation();
  const store = useStore();

  return (
    <Protect guard={s => !!(s.isRoleOfficer || s.isRoleAdmin || s.isSuperUser)}>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.reports", "Reports"),
              href: "/reports/",
            },
            {
              text: t("breadcrumb.newReport", "New report"),
            },
          ]}
        />
        {/* store used so guard re-renders with me loaded */}
        {store.me && <ReportCreate />}
      </Layout>
    </Protect>
  );
};

export default ReportCreatePage;
