import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReportCategoryUpdateForm from "components/admin/reportCategory/updateForm";
import Layout from "components/layout";
import { MaskingLoader } from "components/widgets/forms";
import { ReportCategory } from "lib/services/reportCategory";
import useServices from "lib/services/provider";
import Protect from "components/auth/protect";

type FormValues = ReportCategory;

const AdminReportCategoryUpdatePage: NextPage = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      const result = await services.reportCategoryService.getReportCategory(id);
      setFormValues(result.data);
    }

    if (router.query.id) {
      loadData(router.query.id as string);
    }
  }, [router.query, services.reportCategoryService]);

  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Report Category &raquo; update</div>
        <MaskingLoader loading={!formValues}>
          <ReportCategoryUpdateForm data={formValues} />
        </MaskingLoader>
      </Layout>
    </Protect>
  );
};

export default AdminReportCategoryUpdatePage;
