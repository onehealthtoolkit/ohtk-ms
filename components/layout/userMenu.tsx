import { Observer } from "mobx-react";
import React from "react";
import useStore from "lib/store";
import { UserAvatar } from "components/widgets/forms";
import {
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const iconClassName = "mr-2 h-5 w-5 text-gray-300";

const panelClassName =
  "z-[60] w-56 max-h-[min(16rem,calc(100vh-16px))] overflow-y-auto divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0";

type UserMenuProps = {
  className?: string;
};
const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
  const store = useStore();
  const router = useRouter();
  const { t } = useTranslation();

  const signOut = async () => {
    await store.signOut();
    router.push("/");
  };

  if (store.isLogin) {
    return (
      <Observer>
        {() => (
          <Menu as="div" className="relative inline-block w-full text-left">
            <Menu.Button className="inline-flex w-full items-center rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <UserAvatar url={store.me!.avatarUrl} />
              <span
                className={`text-white ${store.menu.collapsed ? "hidden" : ""}`}
              >
                <div className={className}>
                  <div>{store.me?.username}</div>
                  <div className="text-xs text-gray-400">
                    {store.me?.authorityName}
                  </div>
                </div>
              </span>

              <div className="flex-grow"></div>
              <ChevronDownIcon
                className={`${
                  store.menu.collapsed ? "h-0 w-0" : "h-5 w-5 rotate-180"
                } text-violet-200 hover:text-violet-100`}
                aria-hidden="true"
              />
            </Menu.Button>
            <Menu.Items
              transition
              portal
              anchor={{
                to: store.menu.collapsed ? "right end" : "top start",
                gap: 8,
                padding: 8,
              }}
              className={panelClassName}
            >
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`group flex w-full items-center rounded-md text-sm`}
                    >
                      <Link href="/admin/profile/" passHref legacyBehavior>
                        <a
                          className={`${
                            active ? "bg-gray-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          href="#"
                        >
                          {<UserCircleIcon className={iconClassName} />}
                          <span className="text-sm font-medium ml-3 duration-200">
                            {t("breadcrumb.profile", "Profile")}
                          </span>
                        </a>
                      </Link>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`group flex w-full items-center rounded-md text-sm`}
                    >
                      <Link href="/admin/logout/" passHref legacyBehavior>
                        <a
                          className={`${
                            active ? "bg-gray-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            signOut();
                          }}
                        >
                          {
                            <ArrowLeftOnRectangleIcon
                              className={iconClassName}
                            />
                          }
                          <span className="text-sm font-medium ml-3 duration-200">
                            {"Logout"}
                          </span>
                        </a>
                      </Link>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </Observer>
    );
  }

  return null;
};

export default UserMenu;
