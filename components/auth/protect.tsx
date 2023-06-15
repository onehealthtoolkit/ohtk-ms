import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react";
import useStore, { Store } from "lib/store";
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
  const loading = (
    <div className="flex flex-col h-screen justify-center items-center">
      <Spinner size={10} />
    </div>
  );
  return !isSSR ? (
    <Observer>
      {() => {
        if (store.initTokenPending) {
          return loading;
        }
        if (!store.isLogin) {
          return loading;
        }
        if (!store.me) {
          return loading;
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
