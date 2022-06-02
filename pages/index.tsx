import Protect from "components/auth/protect";
import Dashboard from "components/dashboard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Protect>
      <Dashboard></Dashboard>
    </Protect>
  );
};

export default Home;
