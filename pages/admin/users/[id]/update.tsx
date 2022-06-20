import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UserUpdateForm from "components/admin/user/updateForm";
import Layout from "components/layout";
import { MaskingLoader } from "components/widgets/forms";
import { User } from "lib/services/user";
import useServices from "lib/services/provider";
import Protect from "components/auth/protect";

type FormValues = User;

const AdminUserUpdatePage: NextPage = () => {
  const router = useRouter();
  const services = useServices();
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    async function loadData(id: string) {
      const result = await services.userService.getUser(id);
      setFormValues(result.data);
    }

    if (router.query.id) {
      loadData(router.query.id as string);
    }
  }, [router.query, services.userService]);

  return (
    <Protect>
      <Layout>
        <div className="mb-4">&raquo; Users &raquo; update</div>
        <MaskingLoader loading={!formValues}>
          <UserUpdateForm data={formValues} />
        </MaskingLoader>
      </Layout>
    </Protect>
  );
};

export default AdminUserUpdatePage;
