import React, { useContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AuthService, IAuthService } from "./auth";
import { AuthorityService, IAuthorityService } from "./authority";
import ProfileService, { IProfileService } from "./profile";

export interface IServiceProvider {
  get authService(): IAuthService;
  get profileService(): IProfileService;
  get authorityService(): IAuthorityService;
}

export class ServicesProvider implements IServiceProvider {
  client: ApolloClient<NormalizedCacheObject>;

  authService: AuthService;
  profileService: ProfileService;
  authorityService: AuthorityService;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
    this.authService = new AuthService(client);
    this.profileService = new ProfileService(client);
    this.authorityService = new AuthorityService(client);
  }
}

export const ServicesContext = React.createContext<
  ServicesProvider | undefined
>(undefined);

const useServices = (): IServiceProvider => {
  const currentServices = useContext(ServicesContext);
  if (!currentServices) {
    throw new Error("useServices must be used within ServiceContextProvider");
  }

  return currentServices;
};

export default useServices;
