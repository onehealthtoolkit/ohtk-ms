import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react";
import useStore from "lib/store";
import SignIn from "components/auth/signIn";
import Spinner from "components/widgets/spinner";

type Props = {
  children: React.ReactNode;
};
const Protect = ({ children }: Props) => {
  const store = useStore();
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return !isSSR ? (
    <Observer>
      {() => {
        if (store.initTokenPending) {
          return <Spinner />;
        }
        if (!store.isLogin) {
          return <SignIn />;
        }

        return <>{children}</>;
      }}
    </Observer>
  ) : (
    <div></div>
  );
};

export default Protect;
