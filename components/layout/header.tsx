import UserMenu from "components/header/UserMenu";
import useStore from "lib/store";
import { observer } from "mobx-react";
import React from "react";

const Header = () => {
  const { menu } = useStore();

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={menu.toggle}
              className="text-4xl text-black focus:outline-none"
            >
              &#8801;
            </button>{" "}
          </div>
          <div className="flex">{/* hamburger menu for mobile */}</div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
