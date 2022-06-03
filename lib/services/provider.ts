import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React from "react";
import { AuthService, IAuthService } from "./auth";
import ProfileService, { IProfileService } from "./profile";

export interface IServiceProvider {
  get authService(): IAuthService;
  get profileService(): IProfileService;
}

export class ServicesProvider implements IServiceProvider {
  client: ApolloClient<NormalizedCacheObject>;

  authService: AuthService;
  profileService: ProfileService;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
    this.authService = new AuthService(client);
    this.profileService = new ProfileService(client);
  }
}

export const ServicesContext = React.createContext<
  ServicesProvider | undefined
>(undefined);
