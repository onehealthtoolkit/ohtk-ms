import { NextPage } from "next";
import ReportCategoryView from "components/admin/reportCategory/view";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminReportCategoryViewPage: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Protect>
      <Layout>
        <Breadcrumb
          crumbs={[
            {
              text: t("breadcrumb.reportCategories", "Report Category"),
              href: "/admin/report_categories",
            },
            { text: t("breadcrumb.view", "View") },
          ]}
        />
        <ReportCategoryView />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryViewPage;
