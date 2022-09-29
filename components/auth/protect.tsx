import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react";
import useStore, { Store } from "lib/store";
import SignIn from "components/auth/signin";
import Spinner from "components/widgets/spinner";
import NotAllow from "./notAllow";

type Props = {
  children: React.ReactNode;
  guard?: (store: Store) => boolean;
};
const Protect = ({ children, guard }: Props) => {
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
        if (!store.me) {
          return <Spinner />;
        }

        if (guard != undefined) {
          if (!guard(store)) {
            return <div>Not Allow</div>;
          }
        }

        if (store.me.isReporter) {
          return <NotAllow />;
        }

        return <>{children}</>;
      }}
    </Observer>
  ) : (
    <div></div>
  );
};

export default Protect;
