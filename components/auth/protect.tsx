import React from "react";
import { Observer } from "mobx-react";
import useStore from "lib/store";
import SignIn from "components/auth/signIn";
import Spinner from "components/widgets/spinner";

type Props = {
  children: React.ReactNode;
};
const Protect = ({ children }: Props) => {
  const store = useStore();

  return (
    <Observer>
      {() => {
        console.log("rerender protect");
        if (store.initTokenPending) {
          return <Spinner />;
        }
        console.log("isLogin", store.isLogin);
        if (!store.isLogin) {
          return <SignIn />;
        }

        return <>{children}</>;
      }}
    </Observer>
  );
};

export default Protect;
