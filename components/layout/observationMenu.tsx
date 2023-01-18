import { Observer } from "mobx-react";
import React, { Fragment, useEffect, useState } from "react";
import useStore from "lib/store";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { ObservationDefinition } from "lib/services/observationDefinition";
import useServices from "lib/services/provider";

const iconClassName = "mr-2 h-5 w-5 text-gray-300";

type ObservationMenuProps = {
  label: string;
  icon?: JSX.Element;
};
const ObservationMenu: React.FC<ObservationMenuProps> = ({ icon, label }) => {
  const store = useStore();
  const { observationDefinitionService } = useServices();

  const [observationDefinitions, setObservationDefinitions] =
    useState<ObservationDefinition[]>();
  useEffect(() => {
    async function loadData() {
      const result =
        await observationDefinitionService.fetchObservationDefinitions(
          30,
          0,
          ""
        );
      setObservationDefinitions(result.items);
    }
    loadData();
  }, [observationDefinitionService]);

  return (
    <Observer>
      {() => (
        <Menu
          as="li"
          className="px-3 py-2 rounded-sm mb-0.5 relative inline-block  w-full text-left"
        >
          <div className="flexitems-center">
            <Menu.Button className="inline-flex  w-full justify-center rounded-md  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {icon}
              <span
                className={`text-white text-sm font-medium ml-3 duration-200 ${
                  store.menu.collapsed ? "hidden" : ""
                }`}
              >
                {label}
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
                store.menu.collapsed ? "left-14 -mt-[48px]" : "right-0"
              } absolute z-10  -mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div className="px-1 py-1 ">
                {observationDefinitions?.map(item => (
                  <Menu.Item key={item.id}>
                    {({ active }) => (
                      <button
                        className={`group flex w-full items-center rounded-md  text-sm`}
                      >
                        <Link
                          href={{
                            pathname: `/observations/`,
                            query: {
                              definitionId: item.id,
                              definitionName: item.name,
                            },
                          }}
                          passHref
                        >
                          <a
                            className={`${
                              active
                                ? "bg-gray-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            href="#"
                          >
                            {<EyeIcon className={iconClassName} />}
                            <span className="text-sm font-medium ml-3 duration-200">
                              {item.name}
                            </span>
                          </a>
                        </Link>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </Observer>
  );
};

export default ObservationMenu;
