import { NextPage } from "next";
import { useRouter } from "next/router";
import Spinner from "components/widgets/spinner";
import ResetPassword from "components/auth/forgotPassword/resetPassword";

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query;
  if (!token) {
    return <Spinner />;
  }
  return (
    <div>
      <ResetPassword token={token as string} />
    </div>
  );
};

export default ResetPasswordPage;
