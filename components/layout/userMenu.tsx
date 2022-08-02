import { Observer } from "mobx-react";
import React from "react";
import useStore from "lib/store";

type UserMenuProps = {
  className?: string;
};
const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
  const store = useStore();

  if (store.isLogin) {
    return (
      <Observer>
        {() => (
          <div className={className}>
            <div>{store.me?.username}</div>
            <div className="text-xs text-gray-400">
              {store.me?.authorityName}
            </div>
          </div>
        )}
      </Observer>
    );
  }

  return null;
};

export default UserMenu;
