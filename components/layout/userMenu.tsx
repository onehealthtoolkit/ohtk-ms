import { Observer } from "mobx-react";
import React from "react";
import useStore from "lib/store";

const UserMenu = () => {
  const store = useStore();

  if (store.isLogin) {
    return <Observer>{() => <div>{store.me?.username}</div>}</Observer>;
  }

  return null;
};

export default UserMenu;
