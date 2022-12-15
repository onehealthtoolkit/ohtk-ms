/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import {
  DocumentTextIcon,
  CubeIcon,
  UserIcon,
  TemplateIcon,
  VariableIcon,
  BellIcon,
  DocumentReportIcon,
  AnnotationIcon,
  LightBulbIcon,
  CollectionIcon,
  SpeakerphoneIcon,
  CalendarIcon,
  MapIcon,
  CogIcon,
} from "@heroicons/react/outline";
import useStore from "lib/store";
import CollapsIcon from "components/layout/CollapsIcon";
import { Observer, observer } from "mobx-react";
import { Menu } from "./menu";
import UserMenu from "./userMenu";
import { ColorSwatchIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { useTranslation } from "react-i18next";

const iconClassName = "h-5 w-5 text-gray-300";

const style: Record<string, string | Record<string, string>> = {
  mobilePosition: {
    left: "left-0 ",
    right: "right-0 md:left-0",
  },
  close: `duration-700 ease-out hidden transition-all`,
  default: `flex flex-col absolute z-40 top-0 md:static md:flex md:left-auto md:top-auto h-screen  shrink-0 bg-slate-800 p-4`,
  open: `duration-200 ease-in transition-all`,
  collapsed: `md:w-16 w-16 p-2`,
  expanded: `md:w-[250px] w-64 overflow-y-scroll md:overflow-y-auto no-scrollbar md:translate-x-0 transform transition-all duration-200 ease-in-out translate-x-0`,
};
const Sidebar: FC<{ mobilePosition: string }> = ({ mobilePosition }) => {
  const { t } = useTranslation();
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

  const menuList = useMemo(
    () => (
      <Observer>
        {() => (
          <>
            {/* Links */}
            <div className="space-y-8">
              <div>
                <h3
                  className={`text-xs uppercase text-slate-500 font-semibold pl-3 ${
                    store.menu.collapsed ? "hidden" : ""
                  }`}
                >
                  <span className="md:sidebar-expanded:block 2xl:block">
                    Pages
                  </span>
                </h3>
                <ul className="mt-3">
                  <Menu
                    href="/"
                    pathname={pathname}
                    label={t("breadcrumb.dashboard", "Dashboard")}
                    collapsed={store.menu.collapsed}
                    display={store.isRoleOfficer || store.isRoleAdmin}
                    icon={
                      <TemplateIcon className={`${iconClassName} -rotate-90`} />
                    }
                  />
                  <Menu
                    href="/reports/"
                    pathname={pathname}
                    label={t("breadcrumb.reports", "Reports")}
                    collapsed={store.menu.collapsed}
                    display={store.isRoleOfficer || store.isRoleAdmin}
                    icon={<DocumentReportIcon className={iconClassName} />}
                  />

                  <Menu
                    href="/cases/"
                    pathname={pathname}
                    label={t("breadcrumb.cases", "Cases")}
                    collapsed={store.menu.collapsed}
                    display={store.isRoleOfficer || store.isRoleAdmin}
                    icon={<DocumentTextIcon className={iconClassName} />}
                  />

                  <Menu
                    href="/map/"
                    pathname={pathname}
                    label={t("breadcrumb.map", "Map")}
                    collapsed={store.menu.collapsed}
                    display={store.isRoleOfficer || store.isRoleAdmin}
                    icon={<LocationMarkerIcon className={iconClassName} />}
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
                    label={t("breadcrumb.authorities", "Authorities")}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<CubeIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/users/"
                    pathname={pathname}
                    label={t("breadcrumb.users", "Users")}
                    collapsed={store.menu.collapsed}
                    display={
                      store.isSuperUser ||
                      store.isRoleAdmin ||
                      store.isRoleOfficer
                    }
                    icon={<UserIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/invitation_codes/"
                    pathname={pathname}
                    label={t("breadcrumb.invitationCodes", "Invitation Codes")}
                    collapsed={store.menu.collapsed}
                    display={
                      store.isSuperUser ||
                      store.isRoleAdmin ||
                      store.isRoleOfficer
                    }
                    icon={<AnnotationIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/report_categories/"
                    pathname={pathname}
                    label={t(
                      "breadcrumb.reportCategories",
                      "Report Categories"
                    )}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<CollectionIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/report_types/"
                    pathname={pathname}
                    label={t("breadcrumb.reportTypes", "Report Types")}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<DocumentReportIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/state_definitions/"
                    pathname={pathname}
                    label={t(
                      "breadcrumb.stateDefinitions",
                      "State Definitions"
                    )}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<LightBulbIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/case_definitions/"
                    pathname={pathname}
                    label={t("breadcrumb.caseDefinitions", "Case Definition")}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<VariableIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/reporter_notifications/"
                    pathname={pathname}
                    label={t(
                      "breadcrumb.reporterNotifications",
                      "Reporter Alerts"
                    )}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<SpeakerphoneIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/notification_templates/"
                    pathname={pathname}
                    label={t(
                      "breadcrumb.notificationTemplates",
                      "Notification Types"
                    )}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<TemplateIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/notifications/"
                    pathname={pathname}
                    label={t("breadcrumb.notifications", "Notifications")}
                    collapsed={store.menu.collapsed}
                    display={store.isRoleOfficer || store.isRoleAdmin}
                    icon={<BellIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/outbreak_plans/"
                    pathname={pathname}
                    label={t("breadcrumb.outbreakPlans", "Outbreak Plans")}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<CalendarIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/places/"
                    pathname={pathname}
                    label={t("breadcrumb.places", "Places")}
                    collapsed={store.menu.collapsed}
                    display={
                      store.isSuperUser ||
                      store.isRoleOfficer ||
                      store.isRoleAdmin
                    }
                    icon={<MapIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/configurations/"
                    pathname={pathname}
                    label={t("breadcrumb.configurations", "Configurations")}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<CogIcon className={iconClassName} />}
                  />
                  <Menu
                    href="/admin/observation_definitions/"
                    pathname={pathname}
                    label={t(
                      "breadcrumb.observationDefinitions",
                      "Observation Definitions"
                    )}
                    collapsed={store.menu.collapsed}
                    display={store.isSuperUser}
                    icon={<ColorSwatchIcon className={iconClassName} />}
                  />
                </ul>
              </div>
            </div>
            <div className="flex-grow"></div>
            <div className="divide-y-2 divide-gray-600 mb-16">
              <div></div>
              <UserMenu className="ml-2 text-white text-left" />
            </div>
          </>
        )}
      </Observer>
    ),
    [store, pathname, t]
  );
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
          <div className="flex w-full items-center justify-center sticky mt-8 top-0 z-10">
            {store.menu.collapsed ? (
              <img
                src="/logo_collapse.png"
                width={40}
                height={40}
                alt="Onehealt toolkit logo"
              />
            ) : (
              <img src="/logo.png" width={120} alt="Onehealt toolkit logo" />
            )}
          </div>
        </div>

        {menuList}
      </div>
    </div>
  );
};

export default observer(Sidebar);
