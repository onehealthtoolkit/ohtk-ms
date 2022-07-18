import Protect from "components/auth/protect";
import Dashboard from "components/dashboard";
import Spinner from "components/widgets/spinner";
import useStore from "lib/store";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const store = useStore();
  if (store.initTokenPending) {
    return <Spinner />;
  }
  return (
    <Protect>
      <Dashboard></Dashboard>
    </Protect>
  );
};

export default Home;
