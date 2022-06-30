import React, { useContext } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { AuthService, IAuthService } from "./auth";
import { AuthorityService, IAuthorityService } from "./authority";
import ProfileService, { IProfileService } from "./profile";
import { InvitationCodeService } from "./invitationCode";
import { IUserService, UserService } from "./user";
import { ReportCategoryService } from "./reportCategory";
import { ReportTypeService } from "./reportType/reportTypeService";
import { ReportService } from "./report";

export interface IServiceProvider {
  get authService(): IAuthService;
  get profileService(): IProfileService;
  get authorityService(): IAuthorityService;
  get userService(): IUserService;
  get invitationCodeService(): InvitationCodeService;
  get reportCategoryService(): ReportCategoryService;
  get reportTypeService(): ReportTypeService;
  get reportService(): ReportService;
}

export class ServicesProvider implements IServiceProvider {
  client: ApolloClient<NormalizedCacheObject>;

  authService: AuthService;
  profileService: ProfileService;
  authorityService: AuthorityService;
  userService: UserService;
  invitationCodeService: InvitationCodeService;
  reportCategoryService: ReportCategoryService;
  reportTypeService: ReportTypeService;
  reportService: ReportService;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
    this.authService = new AuthService(client);
    this.profileService = new ProfileService(client);
    this.authorityService = new AuthorityService(client);
    this.userService = new UserService(client);
    this.invitationCodeService = new InvitationCodeService(client);
    this.reportCategoryService = new ReportCategoryService(client);
    this.reportTypeService = new ReportTypeService(client);
    this.reportService = new ReportService(client);
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
