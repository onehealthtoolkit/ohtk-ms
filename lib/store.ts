import { action, makeObservable, observable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { Me } from "./services/profile/me";
import { IAuthService, SignInResult } from "./services/auth";
import { IProfileService } from "./services/profile";
import { IServiceProvider } from "./services/provider";

type Menu = {
  open: boolean;
  collapsed: boolean;
};
export class Store {
  initTokenPending = true;
  isLogin = false;
  me?: Me = undefined;
  menu: Menu = {
    open: false,
    collapsed: false,
  };
  authService: IAuthService;
  profileService: IProfileService;

  constructor(serviceProvider: IServiceProvider) {
    this.authService = serviceProvider.authService;
    this.profileService = serviceProvider.profileService;
    makeObservable(this, {
      bootstrap: action,
      initTokenPending: observable,
      isLogin: observable,
      signIn: action,
      register: action,
      fetchMe: action,
      toggleOpenMenu: action,
      toggleCollapseMenu: action,
      closeMenu: action,
      me: observable,
      menu: observable,
    });

    void this.bootstrap();
  }

  async bootstrap(): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const success = await this.authService.refreshToken();
      console.log("bootstrap", success);
      if (success) {
        await this.fetchMe();
        runInAction(() => {
          this.initTokenPending = false;
          this.isLogin = true;
        });
        this.authService.startAutoRefreshToken();
      } else {
        runInAction(() => {
          this.initTokenPending = false;
          this.isLogin = false;
        });
      }
    } catch (e) {
      runInAction(() => {
        this.initTokenPending = false;
        this.isLogin = false;
      });
    }
  }

  async signIn(username: string, password: string): Promise<SignInResult> {
    const result = await this.authService.signIn(username, password);

    if (result.success) {
      await this.fetchMe();
      runInAction(() => {
        this.isLogin = true;
      });
    }
    return result;
  }

  async fetchMe(): Promise<void> {
    var me = await this.profileService.fetchMe();
    runInAction(() => {
      this.me = me;
    });
  }

  async register(me: Me): Promise<void> {
    runInAction(() => {
      this.isLogin = true;
      this.me = me;
    });
  }

  async signOut() {
    await this.authService.signOut();
    runInAction(() => {
      this.me = undefined;
      this.isLogin = false;
    });
  }

  toggleOpenMenu() {
    this.menu.open = !this.menu.open;
  }

  toggleCollapseMenu() {
    this.menu.collapsed = !this.menu.collapsed;
  }

  closeMenu() {
    if (this.menu.open) this.menu.open = false;
  }

  isStaff() {
    return this.me?.isStaff || false;
  }

  get isSuperUser() {
    return this.me?.isSuperUser || false;
  }

  get isRoleReporter() {
    return this.me?.role == "REP";
  }

  get isRoleOfficer() {
    return this.me?.role == "OFC";
  }

  get isRoleAdmin() {
    return this.me?.role == "ADM";
  }

  get authorityId() {
    return this.me?.authorityId;
  }
}

export const StoreContext = createContext<Store | null>(null);

const useStore = (): Store => {
  const currentStore = useContext(StoreContext);
  if (!currentStore) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return currentStore;
};

export default useStore;
