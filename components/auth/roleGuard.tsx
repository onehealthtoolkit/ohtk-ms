import { Observer } from "mobx-react";
import React from "react";
import useStore from "lib/store";

type Props = {
  roles: string[];
  children: React.ReactNode;
};

const RoleGuard = ({ children }: Props) => {
  const store = useStore();

  const content = () => {
    if (!store.isLogin) {
      return <div>Please Login</div>;
    }
    // if (store.me?.role === undefined) {
    //   return <div>Role Not found</div>;
    // }
    // if (roles.includes(store.me?.role)) {
    //   return <>{children}</>;
    // } else {
    //   return null;
    // }
    return <>{children}</>;
  };

  return <Observer>{() => content()}</Observer>;
};

export default RoleGuard;
