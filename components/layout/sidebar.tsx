import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  FC,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
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
} from "@heroicons/react/solid";
import useStore from "lib/store";
import CollapsIcon from "components/icons/CollapsIcon";

type MenuProps = {
  pathname: string;
  label: string;
  href: string;
  icon?: JSX.Element;
  collapsed?: boolean;
  onClick?: MouseEventHandler;
};
const Menu: React.FC<MenuProps> = ({
  pathname,
  label,
  icon,
  href,
  collapsed,
  onClick,
}) => {
  if (collapsed) {
    return (
      <div className="group dropend relative">
        <li
          className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
            pathname === href && "bg-slate-900"
          }`}
        >
          <Link href={href} passHref>
            <a
              className={`block text-slate-500 hover:text-black truncate transition duration-150 ${
                pathname === href && "hover:text-slate-200"
              }`}
              onClick={e => {
                if (onClick) {
                  e.preventDefault();
                  onClick(e);
                }
              }}
              href="#"
            >
              <div className="flex items-center">
                {icon}
                <div className="group-hover:block absolute  hidden dropdown-menu w-32 h-auto z-50 top-0 left-12 bg-white shadow px-2 py-2">
                  <span className="text-sm font-medium ml-3 duration-200">
                    {label}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </li>
      </div>
    );
  }
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname === href && "bg-slate-900"
      }`}
    >
      <Link href={href} passHref>
        <a
          className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
            pathname === href && "hover:text-slate-200"
          }`}
          onClick={e => {
            if (onClick) {
              e.preventDefault();
              onClick(e);
            }
          }}
          href="#"
        >
          <div className="flex items-center">
            {icon}
            <span className="text-sm font-medium ml-3 duration-200">
              {label}
            </span>
          </div>
        </a>
      </Link>
    </li>
  );
};

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
  const { menu } = useStore();
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [collapsed, setCollapse] = useState(menu.collapsed);

  const toggleCollapse = useCallback(() => {
    setCollapse(prevState => {
      menu.collapsed = !prevState;
      return menu.collapsed;
    });
  }, [menu]);

  const onMouseEnter = () => {
    setIsCollapsible(true);
  };

  const onMouseOver = () => {
    setIsCollapsible(false);
  };

  const store = useStore();
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
        ${menu.open ? style.open : style.close} ${
          collapsed ? style.collapsed : style.expanded
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOver}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2 relative">
          {isCollapsible && (
            <button
              className={`p-2 rounded bg-light-lighter absolute -right-2 top-4" ${
                collapsed ? "rotate-180" : ""
              } `}
              onClick={toggleCollapse}
            >
              <CollapsIcon />
            </button>
          )}
          <span className={`text-white ${collapsed ? "hidden" : ""}`}>
            Opensurveillance
          </span>
        </div>
        {/* Links */}
        <div className="space-y-8">
          <div>
            <h3
              className={`text-xs uppercase text-slate-500 font-semibold pl-3 ${
                collapsed ? "hidden" : ""
              }`}
            >
              <span className="md:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              <Menu
                href="/"
                pathname={pathname}
                label="Dashboard"
                collapsed={collapsed}
                icon={<HomeIcon className={iconClassName} />}
              />
              <Menu
                href="/reports/"
                pathname={pathname}
                label="Reports"
                collapsed={collapsed}
                icon={<DocumentTextIcon className={iconClassName} />}
              />

              <Menu
                href="/cases"
                pathname={pathname}
                label="Cases"
                collapsed={collapsed}
                icon={<DocumentIcon className={iconClassName} />}
              />
            </ul>
          </div>

          <div>
            <h3
              className={`
                text-xs uppercase text-slate-500 font-semibold pl-3 ${
                  collapsed ? "hidden" : ""
                }`}
            >
              <span className="md:sidebar-expanded:block 2xl:block">
                Settings
              </span>
            </h3>
            <ul className="mt-3">
              <Menu
                href="/admin/authorities"
                pathname={pathname}
                label="Authorities"
                collapsed={collapsed}
                icon={<CubeIcon className={iconClassName} />}
              />
              <Menu
                href="/settings/users"
                pathname={pathname}
                label="Users"
                collapsed={collapsed}
                icon={<UserIcon className={iconClassName} />}
              />
              <Menu
                href="/reports/category"
                pathname={pathname}
                label="Category"
                collapsed={collapsed}
                icon={<TemplateIcon className={iconClassName} />}
              />
              <Menu
                href="/reports/report_types"
                pathname={pathname}
                label="Report types"
                collapsed={collapsed}
                icon={<TemplateIcon className={iconClassName} />}
              />

              <Menu
                href="/settings/case_definitions"
                pathname={pathname}
                label="Case Definition"
                collapsed={collapsed}
                icon={<VariableIcon className={iconClassName} />}
              />

              <Menu
                href="/settings/reporter_notification"
                pathname={pathname}
                label="Reporter notification"
                collapsed={collapsed}
                icon={<BellIcon className={iconClassName} />}
              />
              <Menu
                href="/settings/profile/"
                pathname={pathname}
                label="Profile"
                collapsed={collapsed}
                icon={<CogIcon className={iconClassName} />}
              />
              <Menu
                href="/settings/logout/"
                pathname={pathname}
                label="Logout"
                collapsed={collapsed}
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

export default Sidebar;
