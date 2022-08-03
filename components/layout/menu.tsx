import Link from "next/link";
import { MouseEventHandler } from "react";

type MenuProps = {
  pathname: string;
  label: string;
  href: string;
  icon?: JSX.Element;
  collapsed?: boolean;
  onClick?: MouseEventHandler;
};

const MenuCollapsed: React.FC<MenuProps> = ({
  pathname,
  label,
  icon,
  href,
  onClick,
}) => {
  return (
    <div className="group dropend relative">
      <li
        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
          pathname === href && "bg-black"
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
              <div className="group-hover:block absolute  hidden dropdown-menu w-auto h-auto z-50 top-0 left-12 bg-white shadow px-6 py-2">
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
};

const MenuExpaned: React.FC<MenuProps> = ({
  pathname,
  label,
  icon,
  href,
  onClick,
}) => {
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        pathname === href && "bg-black"
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

export const Menu: React.FC<MenuProps> = ({
  pathname,
  label,
  icon,
  href,
  collapsed,
  onClick,
}) => {
  return collapsed ? (
    <MenuCollapsed
      pathname={pathname}
      label={label}
      href={href}
      onClick={onClick}
      icon={icon}
    />
  ) : (
    <MenuExpaned
      pathname={pathname}
      label={label}
      href={href}
      onClick={onClick}
      icon={icon}
    />
  );
};
