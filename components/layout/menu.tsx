import Link from "next/link";
import { MouseEventHandler } from "react";

type MenuProps = {
  pathname: string;
  label: string;
  href: string;
  icon?: JSX.Element;
  collapsed?: boolean;
  onClick?: MouseEventHandler;
  display?: boolean;
};

const MenuCollapsed: React.FC<MenuProps> = ({
  pathname,
  label,
  icon,
  href,
  onClick,
}) => {
  return (
    <div className="group dropend relative shrink-0">
      <li
        className={`px-2 py-2 rounded-sm mb-0.5 last:mb-0 shrink-0 ${
          pathname === href && "bg-black"
        }`}
        {...(pathname === href ? { "data-sidebar-active": "" } : {})}
      >
        <Link href={href} passHref legacyBehavior>
          <a
            className={`block text-slate-500 hover:text-black truncate transition duration-150 ${
              pathname === href && "hover:text-slate-200"
            }`}
            title={label}
            onClick={e => {
              if (onClick) {
                e.preventDefault();
                onClick(e);
              }
            }}
            href="#"
          >
            <div className="flex items-center justify-center shrink-0">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
                {icon}
              </span>
              <div className="group-hover:block absolute  hidden dropdown-menu w-auto h-auto z-50 top-0 left-12 bg-white shadow px-6 py-2">
                <span className="text-sm font-medium ml-3 duration-200 whitespace-nowrap">
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
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 shrink-0 ${
        pathname === href && "bg-black"
      }`}
      {...(pathname === href ? { "data-sidebar-active": "" } : {})}
    >
      <Link href={href} passHref legacyBehavior>
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
          <div className="flex items-center min-w-0">
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5">
              {icon}
            </span>
            <span className="text-sm font-medium ml-3 duration-200 truncate">
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
  display,
}) => {
  if (display !== undefined) {
    if (!display) {
      return null;
    }
  }
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
