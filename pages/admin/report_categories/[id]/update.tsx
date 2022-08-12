import { NextPage } from "next";
import ReportCategoryUpdate from "components/admin/reportCategory/update";
import Layout from "components/layout";
import Protect from "components/auth/protect";
import Breadcrumb from "components/layout/breadcrumb";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import { useTranslation } from "react-i18next";

const AdminReportCategoryUpdatePage: NextPage = () => {
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
              text: t("breadcrumb.reportCategories", "Report Category"),
              href: "/admin/report_categories",
            },
            { text: t("breadcrumb.update", "Update") },
          ]}
        />
        <ReportCategoryUpdate />
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryUpdatePage;
