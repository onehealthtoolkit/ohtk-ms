import useStore from "lib/store";
import { observer } from "mobx-react";
import React from "react";

const Header = () => {
  const store = useStore();

  return (
    <header className="sticky top-0">
      <div className="px-2">
        <div className="flex items-center justify-between h-8 md:h-0 -mb-px">
          {/* Header: Left side */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-expanded="false"
              aria-label="Toggle sidenav"
              onClick={() => store.toggleOpenMenu()}
              className="text-4xl text-black focus:outline-none"
            >
              &#8801;
            </button>{" "}
          </div>
          <div className="flex">{/* hamburger menu for mobile */}</div>
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
