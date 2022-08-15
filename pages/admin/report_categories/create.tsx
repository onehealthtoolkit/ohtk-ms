import { NextPage } from "next";
import Layout from "components/layout";
import ReportCategoryCreate from "components/admin/reportCategory/create";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useTranslation } from "react-i18next";

const AdminReportCategoryCreatePage: NextPage = () => {
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
            { text: t("breadcrumb.create", "Create") },
          ]}
        />
        <ReportCategoryCreate />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryCreatePage;
