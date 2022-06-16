import { useRouter } from "next/router";
import React, { FC, useCallback, useRef, useState } from "react";
import {
  HomeIcon,
  DocumentTextIcon,
  CubeIcon,
  UserIcon,
  TemplateIcon,
  VariableIcon,
  DocumentIcon,
  BellIcon,
  CogIcon,
  LogoutIcon,
  DocumentReportIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";
import useStore from "lib/store";
import CollapsIcon from "components/icons/CollapsIcon";
import { observer } from "mobx-react";
import { Menu } from "./menu";

const iconClassName = "h-5 w-5 text-gray-300";

const style: Record<string, string | Record<string, string>> = {
  mobilePosition: {
    left: "left-0 ",
    right: "right-0 md:left-0",
  },
  close: `duration-700 ease-out hidden transition-all`,
  default: `flex flex-col absolute z-40 top-0 md:static md:block md:left-auto md:top-auto h-screen  shrink-0 bg-slate-800 p-4`,
  open: `duration-200 ease-in transition-all`,
  collapsed: `md:w-16 w-16 p-2`,
  expanded: `md:w-64 w-64 overflow-y-scroll md:overflow-y-auto no-scrollbar md:translate-x-0 transform transition-all duration-200 ease-in-out translate-x-0`,
};
const Sidebar: FC<{ mobilePosition: string }> = ({ mobilePosition }) => {
  const sidebar = useRef(null);
  const router = useRouter();
  const pathname = router.asPath;
  const store = useStore();
  const [isCollapsible, setIsCollapsible] = useState(false);

  const toggleCollapse = useCallback(() => {
    store.toggleCollapseMenu();
  }, [store]);

  const onMouseEnter = () => {
    setIsCollapsible(true);
  };

  const onMouseOver = () => {
    setIsCollapsible(false);
  };

  const onLogout = () => {
    store.signOut();
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`${style.default} ${
          (style.mobilePosition as Record<string, string>)[mobilePosition]
        }
        ${store.menu.open ? style.open : style.close} ${
          store.menu.collapsed ? style.collapsed : style.expanded
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOver}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2 relative">
          {isCollapsible && (
            <button
              className={`p-2 rounded bg-light-lighter absolute -right-2 top-4" ${
                store.menu.collapsed ? "rotate-180" : ""
              } `}
              onClick={toggleCollapse}
            >
              <CollapsIcon />
            </button>
          )}
          <span
            className={`text-white ${store.menu.collapsed ? "hidden" : ""}`}
          >
            Opensurveillance
          </span>
        </div>
        {/* Links */}
        <div className="space-y-8">
          <div>
            <h3
              className={`text-xs uppercase text-slate-500 font-semibold pl-3 ${
                store.menu.collapsed ? "hidden" : ""
              }`}
            >
              <span className="md:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              <Menu
                href="/"
                pathname={pathname}
                label="Dashboard"
                collapsed={store.menu.collapsed}
                icon={<HomeIcon className={iconClassName} />}
              />
              <Menu
                href="/reports/"
                pathname={pathname}
                label="Reports"
                collapsed={store.menu.collapsed}
                icon={<DocumentTextIcon className={iconClassName} />}
              />

              <Menu
                href="/cases"
                pathname={pathname}
                label="Cases"
                collapsed={store.menu.collapsed}
                icon={<DocumentIcon className={iconClassName} />}
              />
            </ul>
          </div>

          <div>
            <h3
              className={`
                text-xs uppercase text-slate-500 font-semibold pl-3 ${
                  store.menu.collapsed ? "hidden" : ""
                }`}
            >
              <span className="md:sidebar-expanded:block 2xl:block">
                Settings
              </span>
            </h3>
            <ul className="mt-3">
              <Menu
                href="/admin/authorities/"
                pathname={pathname}
                label="Authorities"
                collapsed={store.menu.collapsed}
                icon={<CubeIcon className={iconClassName} />}
              />
              <Menu
                href="/admin/users/"
                pathname={pathname}
                label="Users"
                collapsed={store.menu.collapsed}
                icon={<UserIcon className={iconClassName} />}
              />
              <Menu
                href="/admin/report_categories/"
                pathname={pathname}
                label="Category"
                collapsed={store.menu.collapsed}
                icon={<TemplateIcon className={iconClassName} />}
              />
              <Menu
                href="/admin/report_types/"
                pathname={pathname}
                label="Report types"
                collapsed={store.menu.collapsed}
                icon={<DocumentReportIcon className={iconClassName} />}
              />
              <Menu
                href="/admin/invitation_codes/"
                pathname={pathname}
                label="Invitation codes"
                collapsed={store.menu.collapsed}
                icon={<AnnotationIcon className={iconClassName} />}
              />

              <Menu
                href="/settings/case_definitions"
                pathname={pathname}
                label="Case Definition"
                collapsed={store.menu.collapsed}
                icon={<VariableIcon className={iconClassName} />}
              />

              <Menu
                href="/settings/reporter_notification"
                pathname={pathname}
                label="Reporter notification"
                collapsed={store.menu.collapsed}
                icon={<BellIcon className={iconClassName} />}
              />
              <Menu
                href="/settings/profile/"
                pathname={pathname}
                label="Profile"
                collapsed={store.menu.collapsed}
                icon={<CogIcon className={iconClassName} />}
              />
              <Menu
                href="/settings/logout/"
                pathname={pathname}
                label="Logout"
                collapsed={store.menu.collapsed}
                onClick={onLogout}
                icon={<LogoutIcon className={iconClassName} />}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Sidebar);
