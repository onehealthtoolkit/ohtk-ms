import { action, makeObservable, observable, runInAction } from "mobx";
import { createContext, useContext } from "react";
import { CustomApolloClient } from "./client";
import { MeDocument } from "./generated/graphql";

type Me = {
  username: string;
  firstName: string;
  lastName: string;
  id: number;
};

export class Store {
  initTokenPending = true;
  isLogin = false;
  me?: Me = undefined;
  client: CustomApolloClient<Record<string, unknown>>;

  constructor(client: CustomApolloClient<Record<string, unknown>>) {
    this.client = client;
    makeObservable(this, {
      initTokenPending: observable,
      isLogin: observable,
      signIn: action,
      fetchMe: action,
      me: observable,
    });

    void this.bootstrap();
  }

  async bootstrap(): Promise<void> {
    if (typeof window === "undefined") {
      return;
    }

    const success = await this.client.refreshToken();
    if (success) {
      this.fetchMe();
      runInAction(() => {
        this.initTokenPending = false;
        this.isLogin = true;
      });
    } else {
      runInAction(() => {
        this.initTokenPending = false;
        this.isLogin = false;
      });
    }
  }

  async signIn(username: string, password: string): Promise<void> {
    const { tokenAuth } = await this.client.signIn(username, password);
    this.client.setRefreshExpiresIn(tokenAuth.refreshExpiresIn);
    this.isLogin = true;
    this.fetchMe();
  }

  async fetchMe(): Promise<void> {
    var result = await this.client.query({
      query: MeDocument,
      fetchPolicy: "network-only",
    });

    if (!result.errors) {
      this.me = {
        username: result.data.me!.username,
        firstName: result.data.me!.firstName,
        lastName: result.data.me!.lastName,
        id: result.data.me!.id,
      };
    }
  }

  async signOut() {
    await this.client.signOut();
    this.me = undefined;
    this.isLogin = false;
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
