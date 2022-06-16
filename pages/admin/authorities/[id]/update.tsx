import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthorityUpdateForm from "components/admin/authority/updateForm";
import Layout from "components/layout";
import { MaskingLoader } from "components/widgets/forms";
import { Authority } from "lib/services/authority";
import useServices from "lib/services/provider";
import Protect from "components/auth/protect";

type FormValues = Authority;

const AdminAuthorityUpdatePage: NextPage = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      const result = await services.authorityService.getAuthority(id);
      setFormValues(result.data);
    }

    if (router.query.id) {
      loadData(router.query.id as string);
    }
  }, [router.query, services.authorityService]);

  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Authorities &raquo; update</div>
        <MaskingLoader loading={!formValues}>
          <AuthorityUpdateForm data={formValues} />
        </MaskingLoader>
      </Layout>
    </Protect>
  );
};

export default AdminAuthorityUpdatePage;
