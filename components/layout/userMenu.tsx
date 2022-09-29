import { Observer } from "mobx-react";
import React, { Fragment } from "react";
import useStore from "lib/store";
import { UserAvatar } from "components/widgets/forms";
import { LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

const iconClassName = "mr-2 h-5 w-5 text-gray-300";

type UserMenuProps = {
  className?: string;
};
const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
  const store = useStore();
  const router = useRouter();

  const signOut = async () => {
    await store.signOut();
    router.push("/");
  };

  if (store.isLogin) {
    return (
      <Observer>
        {() => (
          <ul className="mt-3 pt-2">
            <Menu as="div" className="relative inline-block  w-full text-left">
              <div className="flexitems-center">
                <Menu.Button className="inline-flex  w-full justify-center rounded-md  py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <UserAvatar url={store.me!.avatarUrl} />
                  <span
                    className={`text-white ${
                      store.menu.collapsed ? "hidden" : ""
                    }`}
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
                      store.menu.collapsed ? "h-0 w-0" : "h-5 w-5"
                    }-mr-1 text-violet-200 hover:text-violet-100`}
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={`${
                    store.menu.collapsed ? "left-14 -mt-16" : "right-0"
                  } absolute z-10  -mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`group flex w-full items-center rounded-md  text-sm`}
                        >
                          <Link href="/admin/profile/" passHref>
                            <a
                              className={`${
                                active
                                  ? "bg-gray-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              href="#"
                            >
                              {<UserCircleIcon className={iconClassName} />}
                              <span className="text-sm font-medium ml-3 duration-200">
                                {"Profile"}
                              </span>
                            </a>
                          </Link>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`group flex w-full items-center rounded-md  text-sm`}
                        >
                          <Link href="/admin/logout/" passHref>
                            <a
                              className={`${
                                active
                                  ? "bg-gray-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                              href="#"
                              onClick={e => {
                                e.preventDefault();
                                signOut();
                              }}
                            >
                              {<LogoutIcon className={iconClassName} />}
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
              </Transition>
            </Menu>
          </ul>
        )}
      </Observer>
    );
  }

  return null;
};

export default UserMenu;
